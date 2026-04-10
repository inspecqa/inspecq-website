/**
 * adminService.ts
 * Centralised Supabase data access layer for the admin panel.
 * All reads require an authenticated Supabase session (enforced by RLS).
 */

import { supabase } from "./supabaseClient";

// ──────────────────────────────────────────────
// Core Types
// ──────────────────────────────────────────────
export interface ContactSubmission {
    id: string;
    full_name: string;
    email: string;
    company_name?: string;
    message?: string;
    service_interest?: string;
    source_page?: string;
    type?: string;
    status: string;
    created_at: string;
}

export interface JobPosting {
    id: string;
    title: string;
    department: string;
    location: string;
    type: string;
    salary: string;
    status: string;
    description: string;
    requirements: string;
    benefits: string;
    applications: number;
    posted_at: string;
    updated_at: string;
}

export interface NewsletterSubscriber {
    id: string;
    email: string;
    name?: string;
    status: string;
    created_at: string;
}

export interface NewsletterCampaign {
    id: string;
    subject: string;
    preview_text?: string;
    body: string;
    status: string;
    send_to: string;
    schedule_date?: string;
    schedule_time?: string;
    recipients: number;
    opens: number;
    clicks: number;
    sent_at?: string;
    created_at: string;
}

export interface SiteSetting {
    key: string;
    value: string;
}

export interface JobApplication {
    id: string;
    job_id: string;
    full_name: string;
    email: string;
    phone?: string;
    cover_letter?: string;
    resume_url?: string;
    linkedin_url?: string;
    status: string;
    notes?: string;
    created_at: string;
    job_postings?: { title: string; department: string };
}

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt?: string;
    body: string;
    cover_image?: string;
    tags?: string[];
    status: string;
    author: string;
    published_at?: string;
    created_at: string;
    updated_at: string;
}

export interface ActivityLogEntry {
    id: string;
    action: string;
    entity_type: string;
    entity_id?: string;
    details?: string;
    user_email?: string;
    created_at: string;
}

export interface AdminRole {
    id: string;
    user_id: string;
    role: string;
    created_at: string;
}

export interface TrialRequest {
    id: string;
    full_name?: string;
    name?: string;
    email: string;
    company_name?: string;
    company?: string;
    phone?: string;
    message?: string;
    status: string;
    source_page?: string;
    created_at: string;
}

export interface DashboardStats {
    jobPostings: number;
    formSubmissions: number;
    newsletterSubscribers: number;
    openPositions: number;
    trialRequests: number;
    blogPosts: number;
    recentActivity: RecentActivity[];
}

export interface RecentActivity {
    action: string;
    details: string;
    time: string;
    type: string;
}

export interface ChartPoint {
    date: string;
    count: number;
}

// ──────────────────────────────────────────────
// Utility
// ──────────────────────────────────────────────
export function formatTimeAgo(isoString: string): string {
    const diff = Date.now() - new Date(isoString).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins} minute${mins !== 1 ? "s" : ""} ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs} hour${hrs !== 1 ? "s" : ""} ago`;
    const days = Math.floor(hrs / 24);
    return `${days} day${days !== 1 ? "s" : ""} ago`;
}

export function downloadCSV(rows: Record<string, unknown>[], filename: string) {
    if (!rows.length) return;
    const headers = Object.keys(rows[0]);
    const csv = [
        headers.join(","),
        ...rows.map((row) =>
            headers
                .map((h) => {
                    const val = row[h] ?? "";
                    const str = String(val).replace(/"/g, '""');
                    return `"${str}"`;
                })
                .join(",")
        ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

// ──────────────────────────────────────────────
// Dashboard
// ──────────────────────────────────────────────
export async function getDashboardStats(): Promise<DashboardStats> {
    if (!supabase) throw new Error("Supabase not configured");

    const [jobsRes, formsRes, subsRes, trialsRes, blogRes, recentActivityRes] =
        await Promise.all([
            supabase.from("job_postings").select("*", { count: "exact", head: true }),
            supabase.from("contact_submissions").select("*", { count: "exact", head: true }),
            supabase.from("newsletter_subscribers").select("*", { count: "exact", head: true }).eq("status", "Active"),
            supabase.from("trial_requests").select("*", { count: "exact", head: true }),
            supabase.from("blog_posts").select("*", { count: "exact", head: true }).eq("status", "Published"),
            supabase.from("activity_log").select("*").order("created_at", { ascending: false }).limit(6),
        ]);

    const openPositions = (await supabase.from("job_postings").select("*", { count: "exact", head: true }).eq("status", "Active")).count ?? 0;

    const activity: RecentActivity[] = [];
    (recentActivityRes.data ?? []).forEach((r) => {
        activity.push({
            action: r.action,
            details: r.details || '',
            time: formatTimeAgo(r.created_at),
            type: r.entity_type
        });
    });

    return {
        jobPostings: jobsRes.count ?? 0,
        formSubmissions: formsRes.count ?? 0,
        newsletterSubscribers: subsRes.count ?? 0,
        trialRequests: trialsRes.count ?? 0,
        blogPosts: blogRes.count ?? 0,
        openPositions,
        recentActivity: activity.slice(0, 5),
    };
}

// ──────────────────────────────────────────────
// Analytics Charts
// ──────────────────────────────────────────────
async function getDailyCount(table: string, days = 30): Promise<ChartPoint[]> {
    if (!supabase) return [];
    const from = new Date();
    from.setDate(from.getDate() - days);
    const { data } = await supabase.from(table).select("created_at").gte("created_at", from.toISOString());
    if (!data) return [];
    const counts: Record<string, number> = {};
    for (let i = days; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        counts[d.toISOString().split("T")[0]] = 0;
    }
    data.forEach((row) => {
        const day = row.created_at.split("T")[0];
        counts[day] = (counts[day] ?? 0) + 1;
    });
    return Object.entries(counts).map(([date, count]) => ({ date, count }));
}

export async function getFormSubmissionsChart(): Promise<ChartPoint[]> { return getDailyCount("contact_submissions", 30); }
export async function getSubscriberGrowthChart(): Promise<ChartPoint[]> { return getDailyCount("newsletter_subscribers", 30); }
export async function getApplicationsChart(): Promise<ChartPoint[]> { return getDailyCount("job_applications", 30); }

// ──────────────────────────────────────────────
// Contact Submissions (Forms page)
// ──────────────────────────────────────────────
export async function getSubmissions(): Promise<ContactSubmission[]> {
    if (!supabase) throw new Error("Supabase not configured");
    const { data, error } = await supabase.from("contact_submissions").select("*").order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
}

export async function updateSubmissionStatus(id: string, status: string): Promise<void> {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase.from("contact_submissions").update({ status }).eq("id", id);
    if (error) throw error;
}

export async function deleteSubmission(id: string): Promise<void> {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase.from("contact_submissions").delete().eq("id", id);
    if (error) throw error;
}

export async function bulkDeleteSubmissions(ids: string[]): Promise<void> {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase.from("contact_submissions").delete().in("id", ids);
    if (error) throw error;
}

export async function bulkUpdateSubmissionStatus(ids: string[], status: string): Promise<void> {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase.from("contact_submissions").update({ status }).in("id", ids);
    if (error) throw error;
}

// ──────────────────────────────────────────────
// Job Postings
// ──────────────────────────────────────────────
export async function getJobPostings(activeOnly = false): Promise<JobPosting[]> {
    if (!supabase) throw new Error("Supabase not configured");
    let q = supabase.from("job_postings").select("*").order("posted_at", { ascending: false });
    if (activeOnly) q = q.eq("status", "Active");
    const { data, error } = await q;
    if (error) throw error;
    return data ?? [];
}

export async function getJobPosting(id: string): Promise<JobPosting | null> {
    if (!supabase) throw new Error("Supabase not configured");
    const { data, error } = await supabase.from("job_postings").select("*").eq("id", id).single();
    if (error) throw error;
    return data;
}

export async function createJobPosting(job: Omit<JobPosting, "id" | "applications" | "posted_at" | "updated_at">): Promise<JobPosting> {
    if (!supabase) throw new Error("Supabase not configured");
    const { data, error } = await supabase.from("job_postings").insert([job]).select().single();
    if (error) throw error;
    return data;
}

export async function updateJobPosting(id: string, updates: Partial<JobPosting>): Promise<void> {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase.from("job_postings").update(updates).eq("id", id);
    if (error) throw error;
}

export async function deleteJobPosting(id: string): Promise<void> {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase.from("job_postings").delete().eq("id", id);
    if (error) throw error;
}

// ──────────────────────────────────────────────
// Job Applications
// ──────────────────────────────────────────────
export async function getApplications(jobId?: string): Promise<JobApplication[]> {
    if (!supabase) throw new Error("Supabase not configured");
    let q = supabase.from("job_applications").select("*, job_postings(title, department)").order("created_at", { ascending: false });
    if (jobId) q = q.eq("job_id", jobId);
    const { data, error } = await q;
    if (error) throw error;
    return data ?? [];
}

export async function createApplication(app: Omit<JobApplication, "id" | "created_at" | "job_postings">): Promise<JobApplication> {
    if (!supabase) throw new Error("Supabase not configured");
    const { data, error } = await supabase.from("job_applications").insert([app]).select().single();
    if (error) throw error;
    return data;
}

export async function updateApplicationStatus(id: string, status: string): Promise<void> {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase.from("job_applications").update({ status }).eq("id", id);
    if (error) throw error;
}

export async function updateApplicationNotes(id: string, notes: string): Promise<void> {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase.from("job_applications").update({ notes }).eq("id", id);
    if (error) throw error;
}

export async function deleteApplication(id: string): Promise<void> {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase.from("job_applications").delete().eq("id", id);
    if (error) throw error;
}

// ──────────────────────────────────────────────
// Newsletter Subscribers
// ──────────────────────────────────────────────
export async function getSubscribers(): Promise<NewsletterSubscriber[]> {
    if (!supabase) throw new Error("Supabase not configured");
    const { data, error } = await supabase.from("newsletter_subscribers").select("*").order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
}

export async function deleteSubscriber(id: string): Promise<void> {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase.from("newsletter_subscribers").delete().eq("id", id);
    if (error) throw error;
}

export async function updateSubscriberStatus(id: string, status: string): Promise<void> {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase.from("newsletter_subscribers").update({ status }).eq("id", id);
    if (error) throw error;
}

// ──────────────────────────────────────────────
// Newsletter Campaigns
// ──────────────────────────────────────────────
export async function getCampaigns(): Promise<NewsletterCampaign[]> {
    if (!supabase) throw new Error("Supabase not configured");
    const { data, error } = await supabase.from("newsletter_campaigns").select("*").order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
}

export async function createCampaign(campaign: Omit<NewsletterCampaign, "id" | "opens" | "clicks" | "created_at">): Promise<NewsletterCampaign> {
    if (!supabase) throw new Error("Supabase not configured");
    const { data, error } = await supabase.from("newsletter_campaigns").insert([campaign]).select().single();
    if (error) throw error;
    return data;
}

export async function deleteCampaign(id: string): Promise<void> {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase.from("newsletter_campaigns").delete().eq("id", id);
    if (error) throw error;
}

// ──────────────────────────────────────────────
// Site Settings
// ──────────────────────────────────────────────
export async function getSiteSettings(): Promise<Record<string, string>> {
    if (!supabase) throw new Error("Supabase not configured");
    const { data, error } = await supabase.from("site_settings").select("*");
    if (error) throw error;
    const map: Record<string, string> = {};
    (data ?? []).forEach((row: SiteSetting) => { map[row.key] = row.value; });
    return map;
}

export async function setSiteSetting(key: string, value: string): Promise<void> {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase.from("site_settings").upsert({ key, value, updated_at: new Date().toISOString() });
    if (error) throw error;
}

// ──────────────────────────────────────────────
// Blog Posts
// ──────────────────────────────────────────────
export async function getBlogPosts(publishedOnly = false): Promise<BlogPost[]> {
    if (!supabase) throw new Error("Supabase not configured");
    let q = supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
    if (publishedOnly) q = q.eq("status", "Published");
    const { data, error } = await q;
    if (error) throw error;
    return data ?? [];
}

export async function getBlogPost(id: string): Promise<BlogPost | null> {
    if (!supabase) throw new Error("Supabase not configured");
    const { data, error } = await supabase.from("blog_posts").select("*").eq("id", id).single();
    if (error) throw error;
    return data;
}

export async function createBlogPost(post: Omit<BlogPost, "id" | "created_at" | "updated_at">): Promise<BlogPost> {
    if (!supabase) throw new Error("Supabase not configured");
    const { data, error } = await supabase.from("blog_posts").insert([post]).select().single();
    if (error) throw error;
    return data;
}

export async function updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<void> {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase.from("blog_posts").update(updates).eq("id", id);
    if (error) throw error;
}

export async function deleteBlogPost(id: string): Promise<void> {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) throw error;
}

// ──────────────────────────────────────────────
// Activity Log
// ──────────────────────────────────────────────
export async function getActivityLog(limit = 100): Promise<ActivityLogEntry[]> {
    if (!supabase) throw new Error("Supabase not configured");
    const { data, error } = await supabase.from("activity_log").select("*").order("created_at", { ascending: false }).limit(limit);
    if (error) throw error;
    return data ?? [];
}

export async function logActivity(action: string, entityType: string, entityId?: string, details?: string): Promise<void> {
    if (!supabase) return;
    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from("activity_log").insert([{ action, entity_type: entityType, entity_id: entityId, details, user_email: user?.email }]);
}

// ──────────────────────────────────────────────
// Admin Roles
// ──────────────────────────────────────────────
export async function getCurrentUserRole(): Promise<string> {
    if (!supabase) return "admin";
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return "viewer";
    const { data } = await supabase.from("admin_roles").select("role").eq("user_id", user.id).single();
    return data?.role ?? "admin";
}

// ──────────────────────────────────────────────
// Trial Requests
// ──────────────────────────────────────────────
export async function getTrialRequests(): Promise<TrialRequest[]> {
    if (!supabase) throw new Error("Supabase not configured");
    const { data, error } = await supabase.from("trial_requests").select("*").order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
}

export async function updateTrialStatus(id: string, status: string): Promise<void> {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase.from("trial_requests").update({ status }).eq("id", id);
    if (error) throw error;
}

export async function deleteTrial(id: string): Promise<void> {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase.from("trial_requests").delete().eq("id", id);
    if (error) throw error;
}

// ──────────────────────────────────────────────
// Lead Tracking — Types
// ──────────────────────────────────────────────
export type LeadStatus = "New" | "Contacted" | "Proposal Sent" | "Negotiating" | "Won" | "Lost";
export type LeadPriority = "High" | "Medium" | "Low";
export type LeadChannel = "Facebook" | "LinkedIn" | "Referral" | "Website" | "Cold Email" | "Event" | "Other";
export type LeadIndustry = "SaaS" | "Ecommerce" | "Fintech" | "Healthcare" | "General" | "Other";
export type ProposalStatus = "Draft" | "Sent" | "Opened" | "Clicked" | "Replied" | "Accepted" | "Declined" | "Expired";

export interface Lead {
    id: string;
    name: string;
    email: string;
    company?: string;
    phone?: string;
    source: string;
    channel: LeadChannel;
    referrer?: string;
    industry: LeadIndustry;
    status: LeadStatus;
    priority: LeadPriority;
    assigned_to?: string;
    notes?: string;
    follow_up_at?: string;
    tags?: string[];
    created_at: string;
    updated_at: string;
}

export interface ProposalTemplate {
    id: string;
    name: string;
    category: string;
    subject: string;
    body: string;
    is_default: boolean;
    created_at: string;
    updated_at: string;
}

export interface Proposal {
    id: string;
    lead_id: string;
    template_id?: string;
    subject: string;
    body: string;
    status: ProposalStatus;
    tracking_token: string;
    sent_at?: string;
    opened_at?: string;
    clicked_at?: string;
    created_at: string;
    leads?: { name: string; email: string; company?: string };
}

export interface EmailEvent {
    id: string;
    proposal_id: string;
    event_type: string;
    ip_address?: string;
    user_agent?: string;
    metadata?: Record<string, unknown>;
    created_at: string;
}

// ──────────────────────────────────────────────
// Leads CRUD
// ──────────────────────────────────────────────
export async function getLeads(): Promise<Lead[]> {
    if (!supabase) throw new Error("Supabase not configured");
    const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
}

export async function getLead(id: string): Promise<Lead | null> {
    if (!supabase) throw new Error("Supabase not configured");
    const { data, error } = await supabase.from("leads").select("*").eq("id", id).single();
    if (error) throw error;
    return data;
}

export async function createLead(lead: Omit<Lead, "id" | "created_at" | "updated_at">): Promise<Lead> {
    if (!supabase) throw new Error("Supabase not configured");
    const { data, error } = await supabase.from("leads").insert([lead]).select().single();
    if (error) throw error;
    return data;
}

export async function updateLead(id: string, updates: Partial<Lead>): Promise<void> {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase.from("leads").update(updates).eq("id", id);
    if (error) throw error;
}

export async function deleteLead(id: string): Promise<void> {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase.from("leads").delete().eq("id", id);
    if (error) throw error;
}

export async function bulkDeleteLeads(ids: string[]): Promise<void> {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase.from("leads").delete().in("id", ids);
    if (error) throw error;
}

export async function importLeadsFromForms(): Promise<number> {
    if (!supabase) throw new Error("Supabase not configured");
    const { data: forms } = await supabase.from("contact_submissions").select("*");
    const { data: existing } = await supabase.from("leads").select("email");
    const existingEmails = new Set((existing ?? []).map((l: { email: string }) => l.email.toLowerCase()));
    const toInsert = (forms ?? [])
        .filter((f: { email: string }) => !existingEmails.has(f.email.toLowerCase()))
        .map((f: { full_name?: string; email: string; company_name?: string }) => ({
            name: f.full_name ?? "Unknown", email: f.email, company: f.company_name,
            source: "contact_form", channel: "Website" as LeadChannel,
            industry: "General" as LeadIndustry, status: "New" as LeadStatus,
            priority: "Warm" as LeadPriority,
        }));
    if (!toInsert.length) return 0;
    const { data, error } = await supabase.from("leads").insert(toInsert).select();
    if (error) throw error;
    return (data ?? []).length;
}

export async function importLeadsFromTrials(): Promise<number> {
    if (!supabase) throw new Error("Supabase not configured");
    const { data: trials } = await supabase.from("trial_requests").select("*");
    const { data: existing } = await supabase.from("leads").select("email");
    const existingEmails = new Set((existing ?? []).map((l: { email: string }) => l.email.toLowerCase()));
    const toInsert = (trials ?? [])
        .filter((t: { email: string }) => !existingEmails.has(t.email.toLowerCase()))
        .map((t: { full_name?: string; name?: string; email: string; company_name?: string; company?: string }) => ({
            name: t.full_name ?? t.name ?? "Unknown", email: t.email,
            company: t.company_name ?? t.company, source: "trial",
            channel: "Website" as LeadChannel, industry: "General" as LeadIndustry,
            status: "New" as LeadStatus, priority: "High" as LeadPriority,
        }));
    if (!toInsert.length) return 0;
    const { data, error } = await supabase.from("leads").insert(toInsert).select();
    if (error) throw error;
    return (data ?? []).length;
}

// ──────────────────────────────────────────────
// Proposal Templates CRUD
// ──────────────────────────────────────────────
export async function getTemplates(): Promise<ProposalTemplate[]> {
    if (!supabase) throw new Error("Supabase not configured");
    const { data, error } = await supabase.from("proposal_templates").select("*").order("is_default", { ascending: false });
    if (error) throw error;
    return data ?? [];
}

export async function getTemplate(id: string): Promise<ProposalTemplate | null> {
    if (!supabase) throw new Error("Supabase not configured");
    const { data, error } = await supabase.from("proposal_templates").select("*").eq("id", id).single();
    if (error) throw error;
    return data;
}

export async function createTemplate(t: Omit<ProposalTemplate, "id" | "created_at" | "updated_at">): Promise<ProposalTemplate> {
    if (!supabase) throw new Error("Supabase not configured");
    const { data, error } = await supabase.from("proposal_templates").insert([t]).select().single();
    if (error) throw error;
    return data;
}

export async function updateTemplate(id: string, updates: Partial<ProposalTemplate>): Promise<void> {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase.from("proposal_templates").update(updates).eq("id", id);
    if (error) throw error;
}

export async function deleteTemplate(id: string): Promise<void> {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase.from("proposal_templates").delete().eq("id", id);
    if (error) throw error;
}

export function renderTemplate(body: string, vars: Record<string, string>): string {
    return body.replace(/\{\{(\w+)\}\}/g, (_, key) => vars[key] ?? `{{${key}}}`);
}

// ──────────────────────────────────────────────
// Proposals CRUD
// ──────────────────────────────────────────────
export async function getProposals(leadId?: string): Promise<Proposal[]> {
    if (!supabase) throw new Error("Supabase not configured");
    let q = supabase.from("proposals").select("*, leads(name, email, company)").order("created_at", { ascending: false });
    if (leadId) q = q.eq("lead_id", leadId);
    const { data, error } = await q;
    if (error) throw error;
    return data ?? [];
}

export async function getProposal(id: string): Promise<Proposal | null> {
    if (!supabase) throw new Error("Supabase not configured");
    const { data, error } = await supabase.from("proposals").select("*, leads(name, email, company)").eq("id", id).single();
    if (error) throw error;
    return data;
}

export async function createProposal(p: Omit<Proposal, "id" | "tracking_token" | "created_at" | "leads">): Promise<Proposal> {
    if (!supabase) throw new Error("Supabase not configured");
    const { data, error } = await supabase.from("proposals").insert([p]).select().single();
    if (error) throw error;

    try {
        const { data: lead } = await supabase.from("leads").select("email, status").eq("id", p.lead_id).single();
        if (lead?.email) {
            await fetch('/api/send-proposal', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    proposal_id: data.id,
                    to_email: lead.email,
                    subject: data.subject,
                    body: data.body,
                    tracking_token: data.tracking_token
                })
            });
        }

        // Auto-advance the lead status if it's currently New or Contacted
        if (lead && (lead.status === "New" || lead.status === "Contacted")) {
            await supabase.from("leads").update({ status: "Proposal Sent", updated_at: new Date().toISOString() }).eq("id", p.lead_id);
        }
    } catch (err) {
        console.error("Error calling send-proposal endpoint or updating lead", err);
    }

    return data;
}

export async function updateProposalStatus(id: string, status: ProposalStatus): Promise<void> {
    if (!supabase) throw new Error("Supabase not configured");
    const updates: Record<string, unknown> = { status };
    if (status === "Sent") updates.sent_at = new Date().toISOString();
    if (status === "Opened") updates.opened_at = new Date().toISOString();
    if (status === "Clicked") updates.clicked_at = new Date().toISOString();
    const { error } = await supabase.from("proposals").update(updates).eq("id", id);
    if (error) throw error;
}

export async function deleteProposal(id: string): Promise<void> {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase.from("proposals").delete().eq("id", id);
    if (error) throw error;
}

export async function getEmailEvents(proposalId: string): Promise<EmailEvent[]> {
    if (!supabase) throw new Error("Supabase not configured");
    const { data, error } = await supabase.from("email_events").select("*").eq("proposal_id", proposalId).order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
}

// ──────────────────────────────────────────────
// Cold Email Campaigns — Types
// ──────────────────────────────────────────────
export interface ColdEmailTemplate {
    id: string;
    name: string;
    subject: string;
    body: string;
    created_at: string;
    updated_at: string;
}

export interface ColdEmailCampaign {
    id: string;
    name: string;
    template_id?: string;
    status: "Draft" | "Sending" | "Completed";
    sent_count: number;
    open_count: number;
    click_count: number;
    target_filters?: Record<string, any>;
    created_at: string;
    updated_at: string;
    cold_email_templates?: { name: string; subject: string };
}

export interface ColdEmail {
    id: string;
    campaign_id: string;
    lead_id: string;
    subject: string;
    body: string;
    status: "Sent" | "Opened" | "Clicked" | "Bounced";
    tracking_token: string;
    sent_at: string;
    opened_at?: string;
    clicked_at?: string;
    leads?: { name: string; email: string; company?: string };
}

// ──────────────────────────────────────────────
// Cold Email Templates CRUD
// ──────────────────────────────────────────────
export async function getColdTemplates(): Promise<ColdEmailTemplate[]> {
    if (!supabase) throw new Error("Supabase not configured");
    const { data, error } = await supabase.from("cold_email_templates").select("*").order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
}

export async function getColdTemplate(id: string): Promise<ColdEmailTemplate | null> {
    if (!supabase) throw new Error("Supabase not configured");
    const { data, error } = await supabase.from("cold_email_templates").select("*").eq("id", id).single();
    if (error) throw error;
    return data;
}

export async function createColdTemplate(t: Omit<ColdEmailTemplate, "id" | "created_at" | "updated_at">): Promise<ColdEmailTemplate> {
    if (!supabase) throw new Error("Supabase not configured");
    const { data, error } = await supabase.from("cold_email_templates").insert([t]).select().single();
    if (error) throw error;
    return data;
}

export async function updateColdTemplate(id: string, updates: Partial<ColdEmailTemplate>): Promise<void> {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase.from("cold_email_templates").update(updates).eq("id", id);
    if (error) throw error;
}

export async function deleteColdTemplate(id: string): Promise<void> {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase.from("cold_email_templates").delete().eq("id", id);
    if (error) throw error;
}

// ──────────────────────────────────────────────
// Cold Email Campaigns CRUD
// ──────────────────────────────────────────────
export async function getColdCampaigns(): Promise<ColdEmailCampaign[]> {
    if (!supabase) throw new Error("Supabase not configured");
    const { data, error } = await supabase.from("cold_email_campaigns")
        .select("*, cold_email_templates(name, subject)")
        .order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
}

export async function getColdCampaign(id: string): Promise<ColdEmailCampaign | null> {
    if (!supabase) throw new Error("Supabase not configured");
    const { data, error } = await supabase.from("cold_email_campaigns")
        .select("*, cold_email_templates(*)")
        .eq("id", id)
        .single();
    if (error) throw error;
    return data;
}

export async function createColdCampaign(c: Omit<ColdEmailCampaign, "id" | "status" | "sent_count" | "open_count" | "click_count" | "created_at" | "updated_at" | "cold_email_templates">): Promise<ColdEmailCampaign> {
    if (!supabase) throw new Error("Supabase not configured");
    const { data, error } = await supabase.from("cold_email_campaigns").insert([c]).select().single();
    if (error) throw error;
    return data;
}

export async function updateColdCampaign(id: string, updates: Partial<ColdEmailCampaign>): Promise<void> {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase.from("cold_email_campaigns").update(updates).eq("id", id);
    if (error) throw error;
}

export async function deleteColdCampaign(id: string): Promise<void> {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase.from("cold_email_campaigns").delete().eq("id", id);
    if (error) throw error;
}

export async function getColdEmails(campaignId: string): Promise<ColdEmail[]> {
    if (!supabase) throw new Error("Supabase not configured");
    const { data, error } = await supabase.from("cold_emails")
        .select("*, leads(name, email, company)")
        .eq("campaign_id", campaignId)
        .order("sent_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
}

// ──────────────────────────────────────────────
// Scheduling — Types
// ──────────────────────────────────────────────
export interface ServiceType {
    id: string;
    name: string;
    description?: string;
    duration_minutes: number;
    color: string;
    is_active: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

export interface AvailabilityRule {
    id: string;
    service_type_id?: string;
    day_of_week: number;
    start_time: string;
    end_time: string;
    is_active: boolean;
    created_at: string;
}

export interface AvailabilityOverride {
    id: string;
    override_date: string;
    is_blocked: boolean;
    start_time?: string;
    end_time?: string;
    reason?: string;
    created_at: string;
}

export interface Appointment {
    id: string;
    service_type_id: string;
    client_name: string;
    client_email: string;
    client_company?: string;
    client_phone?: string;
    client_message?: string;
    start_time: string;
    end_time: string;
    client_timezone: string;
    status: string;
    reschedule_token: string;
    cancel_token: string;
    cancellation_reason?: string;
    lead_id?: string;
    created_at: string;
    updated_at: string;
    service_types?: ServiceType;
}

export interface SchedulingSettings {
    id: string;
    buffer_minutes: number;
    max_advance_days: number;
    min_advance_hours: number;
    admin_timezone: string;
    auto_confirm: boolean;
    notification_prefs: Record<string, boolean>;
    updated_at: string;
}

// ──────────────────────────────────────────────
// Service Types CRUD
// ──────────────────────────────────────────────
export async function getServiceTypes(activeOnly = false): Promise<ServiceType[]> {
    if (!supabase) throw new Error("Supabase not configured");
    let q = supabase.from("service_types").select("*").order("sort_order", { ascending: true });
    if (activeOnly) q = q.eq("is_active", true);
    const { data, error } = await q;
    if (error) throw error;
    return data ?? [];
}

export async function getServiceType(id: string): Promise<ServiceType | null> {
    if (!supabase) throw new Error("Supabase not configured");
    const { data, error } = await supabase.from("service_types").select("*").eq("id", id).single();
    if (error) throw error;
    return data;
}

export async function createServiceType(svc: Omit<ServiceType, "id" | "created_at" | "updated_at">): Promise<ServiceType> {
    if (!supabase) throw new Error("Supabase not configured");
    const { data, error } = await supabase.from("service_types").insert([svc]).select().single();
    if (error) throw error;
    return data;
}

export async function updateServiceType(id: string, updates: Partial<ServiceType>): Promise<void> {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase.from("service_types").update(updates).eq("id", id);
    if (error) throw error;
}

export async function deleteServiceType(id: string): Promise<void> {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase.from("service_types").delete().eq("id", id);
    if (error) throw error;
}

// ──────────────────────────────────────────────
// Availability Rules CRUD
// ──────────────────────────────────────────────
export async function getAvailabilityRules(): Promise<AvailabilityRule[]> {
    if (!supabase) throw new Error("Supabase not configured");
    const { data, error } = await supabase.from("availability_rules").select("*").order("day_of_week", { ascending: true });
    if (error) throw error;
    return data ?? [];
}

export async function upsertAvailabilityRules(rules: Omit<AvailabilityRule, "id" | "created_at">[]): Promise<void> {
    if (!supabase) throw new Error("Supabase not configured");
    // Delete all existing rules and replace
    await supabase.from("availability_rules").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    if (rules.length > 0) {
        const { error } = await supabase.from("availability_rules").insert(rules);
        if (error) throw error;
    }
}

// ──────────────────────────────────────────────
// Availability Overrides CRUD
// ──────────────────────────────────────────────
export async function getAvailabilityOverrides(): Promise<AvailabilityOverride[]> {
    if (!supabase) throw new Error("Supabase not configured");
    const { data, error } = await supabase.from("availability_overrides").select("*").order("override_date", { ascending: true });
    if (error) throw error;
    return data ?? [];
}

export async function createAvailabilityOverride(override: Omit<AvailabilityOverride, "id" | "created_at">): Promise<AvailabilityOverride> {
    if (!supabase) throw new Error("Supabase not configured");
    const { data, error } = await supabase.from("availability_overrides").insert([override]).select().single();
    if (error) throw error;
    return data;
}

export async function deleteAvailabilityOverride(id: string): Promise<void> {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase.from("availability_overrides").delete().eq("id", id);
    if (error) throw error;
}

// ──────────────────────────────────────────────
// Appointments CRUD
// ──────────────────────────────────────────────
export async function getAppointments(filters?: {
    status?: string;
    startDate?: string;
    endDate?: string;
    serviceTypeId?: string;
}): Promise<Appointment[]> {
    if (!supabase) throw new Error("Supabase not configured");
    let q = supabase.from("appointments").select("*, service_types(*)").order("start_time", { ascending: false });
    if (filters?.status) q = q.eq("status", filters.status);
    if (filters?.startDate) q = q.gte("start_time", filters.startDate);
    if (filters?.endDate) q = q.lte("start_time", filters.endDate);
    if (filters?.serviceTypeId) q = q.eq("service_type_id", filters.serviceTypeId);
    const { data, error } = await q;
    if (error) throw error;
    return data ?? [];
}

export async function getAppointment(id: string): Promise<Appointment | null> {
    if (!supabase) throw new Error("Supabase not configured");
    const { data, error } = await supabase.from("appointments").select("*, service_types(*)").eq("id", id).single();
    if (error) throw error;
    return data;
}

export async function updateAppointmentStatus(id: string, status: string, cancellationReason?: string): Promise<void> {
    if (!supabase) throw new Error("Supabase not configured");
    const updates: Record<string, unknown> = { status };
    if (cancellationReason) updates.cancellation_reason = cancellationReason;
    const { error } = await supabase.from("appointments").update(updates).eq("id", id);
    if (error) throw error;
}

export async function deleteAppointment(id: string): Promise<void> {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase.from("appointments").delete().eq("id", id);
    if (error) throw error;
}

export async function getAppointmentsByDateRange(start: string, end: string): Promise<Appointment[]> {
    if (!supabase) throw new Error("Supabase not configured");
    const { data, error } = await supabase.from("appointments")
        .select("*, service_types(*)")
        .gte("start_time", start)
        .lte("start_time", end)
        .order("start_time", { ascending: true });
    if (error) throw error;
    return data ?? [];
}

// ──────────────────────────────────────────────
// Scheduling Settings
// ──────────────────────────────────────────────
export async function getSchedulingSettings(): Promise<SchedulingSettings | null> {
    if (!supabase) throw new Error("Supabase not configured");
    const { data, error } = await supabase.from("scheduling_settings").select("*").limit(1).single();
    if (error) throw error;
    return data;
}

export async function updateSchedulingSettings(updates: Partial<SchedulingSettings>): Promise<void> {
    if (!supabase) throw new Error("Supabase not configured");
    const { data: existing } = await supabase.from("scheduling_settings").select("id").limit(1).single();
    if (existing) {
        const { error } = await supabase.from("scheduling_settings").update(updates).eq("id", existing.id);
        if (error) throw error;
    }
}

// ──────────────────────────────────────────────
// Scheduling Analytics
// ──────────────────────────────────────────────
export async function getAppointmentStats(): Promise<{
    total: number;
    confirmed: number;
    completed: number;
    cancelled: number;
    noShow: number;
}> {
    if (!supabase) throw new Error("Supabase not configured");
    const { data } = await supabase.from("appointments").select("status");
    const all = data ?? [];
    return {
        total: all.length,
        confirmed: all.filter(a => a.status === "confirmed").length,
        completed: all.filter(a => a.status === "completed").length,
        cancelled: all.filter(a => a.status === "cancelled").length,
        noShow: all.filter(a => a.status === "no_show").length,
    };
}
