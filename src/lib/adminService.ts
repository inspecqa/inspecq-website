/**
 * adminService.ts
 * Centralised Supabase data access layer for the admin panel.
 * All reads require an authenticated Supabase session (enforced by RLS).
 */

import { supabase } from "./supabaseClient";

// ──────────────────────────────────────────────
// Types
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

export interface DashboardStats {
    jobPostings: number;
    formSubmissions: number;
    newsletterSubscribers: number;
    openPositions: number;
    recentActivity: RecentActivity[];
}

export interface RecentActivity {
    action: string;
    details: string;
    time: string;
    type: "form" | "application" | "newsletter" | "job";
}

// ──────────────────────────────────────────────
// Dashboard
// ──────────────────────────────────────────────
export async function getDashboardStats(): Promise<DashboardStats> {
    if (!supabase) throw new Error("Supabase not configured");

    const [jobsRes, formsRes, subsRes, recentFormsRes, recentSubsRes] =
        await Promise.all([
            supabase
                .from("job_postings")
                .select("*", { count: "exact", head: true }),
            supabase
                .from("contact_submissions")
                .select("*", { count: "exact", head: true }),
            supabase
                .from("newsletter_subscribers")
                .select("*", { count: "exact", head: true })
                .eq("status", "Active"),
            supabase
                .from("contact_submissions")
                .select("full_name, email, source_page, type, created_at")
                .order("created_at", { ascending: false })
                .limit(3),
            supabase
                .from("newsletter_subscribers")
                .select("email, created_at")
                .order("created_at", { ascending: false })
                .limit(2),
        ]);

    const openPositions =
        (
            await supabase
                .from("job_postings")
                .select("*", { count: "exact", head: true })
                .eq("status", "Active")
        ).count ?? 0;

    // Build recent activity feed
    const activity: RecentActivity[] = [];

    (recentFormsRes.data ?? []).forEach((r) => {
        activity.push({
            action: `New ${r.type ?? "form"} submission received`,
            details: `${r.source_page ?? "Website"} — ${r.email}`,
            time: formatTimeAgo(r.created_at),
            type: "form",
        });
    });

    (recentSubsRes.data ?? []).forEach((r) => {
        activity.push({
            action: "Newsletter subscriber added",
            details: r.email,
            time: formatTimeAgo(r.created_at),
            type: "newsletter",
        });
    });

    activity.sort((a, b) => 0); // already chronological from DB

    return {
        jobPostings: jobsRes.count ?? 0,
        formSubmissions: formsRes.count ?? 0,
        newsletterSubscribers: subsRes.count ?? 0,
        openPositions,
        recentActivity: activity.slice(0, 5),
    };
}

// ──────────────────────────────────────────────
// Contact Submissions (Forms page)
// ──────────────────────────────────────────────
export async function getSubmissions(): Promise<ContactSubmission[]> {
    if (!supabase) throw new Error("Supabase not configured");
    const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
}

export async function updateSubmissionStatus(
    id: string,
    status: string
): Promise<void> {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase
        .from("contact_submissions")
        .update({ status })
        .eq("id", id);
    if (error) throw error;
}

export async function deleteSubmission(id: string): Promise<void> {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase
        .from("contact_submissions")
        .delete()
        .eq("id", id);
    if (error) throw error;
}

// ──────────────────────────────────────────────
// Job Postings (Careers page)
// ──────────────────────────────────────────────
export async function getJobPostings(): Promise<JobPosting[]> {
    if (!supabase) throw new Error("Supabase not configured");
    const { data, error } = await supabase
        .from("job_postings")
        .select("*")
        .order("posted_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
}

export async function getJobPosting(id: string): Promise<JobPosting | null> {
    if (!supabase) throw new Error("Supabase not configured");
    const { data, error } = await supabase
        .from("job_postings")
        .select("*")
        .eq("id", id)
        .single();
    if (error) throw error;
    return data;
}

export async function createJobPosting(
    job: Omit<JobPosting, "id" | "applications" | "posted_at" | "updated_at">
): Promise<JobPosting> {
    if (!supabase) throw new Error("Supabase not configured");
    const { data, error } = await supabase
        .from("job_postings")
        .insert([job])
        .select()
        .single();
    if (error) throw error;
    return data;
}

export async function updateJobPosting(
    id: string,
    updates: Partial<JobPosting>
): Promise<void> {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase
        .from("job_postings")
        .update(updates)
        .eq("id", id);
    if (error) throw error;
}

export async function deleteJobPosting(id: string): Promise<void> {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase
        .from("job_postings")
        .delete()
        .eq("id", id);
    if (error) throw error;
}

// ──────────────────────────────────────────────
// Newsletter Subscribers
// ──────────────────────────────────────────────
export async function getSubscribers(): Promise<NewsletterSubscriber[]> {
    if (!supabase) throw new Error("Supabase not configured");
    const { data, error } = await supabase
        .from("newsletter_subscribers")
        .select("*")
        .order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
}

export async function deleteSubscriber(id: string): Promise<void> {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase
        .from("newsletter_subscribers")
        .delete()
        .eq("id", id);
    if (error) throw error;
}

export async function updateSubscriberStatus(
    id: string,
    status: string
): Promise<void> {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase
        .from("newsletter_subscribers")
        .update({ status })
        .eq("id", id);
    if (error) throw error;
}

// ──────────────────────────────────────────────
// Newsletter Campaigns
// ──────────────────────────────────────────────
export async function getCampaigns(): Promise<NewsletterCampaign[]> {
    if (!supabase) throw new Error("Supabase not configured");
    const { data, error } = await supabase
        .from("newsletter_campaigns")
        .select("*")
        .order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
}

export async function createCampaign(
    campaign: Omit<NewsletterCampaign, "id" | "opens" | "clicks" | "created_at">
): Promise<NewsletterCampaign> {
    if (!supabase) throw new Error("Supabase not configured");
    const { data, error } = await supabase
        .from("newsletter_campaigns")
        .insert([campaign])
        .select()
        .single();
    if (error) throw error;
    return data;
}

export async function deleteCampaign(id: string): Promise<void> {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase
        .from("newsletter_campaigns")
        .delete()
        .eq("id", id);
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
    (data ?? []).forEach((row: SiteSetting) => {
        map[row.key] = row.value;
    });
    return map;
}

export async function setSiteSetting(
    key: string,
    value: string
): Promise<void> {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase
        .from("site_settings")
        .upsert({ key, value, updated_at: new Date().toISOString() });
    if (error) throw error;
}

// ──────────────────────────────────────────────
// Utility
// ──────────────────────────────────────────────
function formatTimeAgo(isoString: string): string {
    const diff = Date.now() - new Date(isoString).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins} minute${mins !== 1 ? "s" : ""} ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs} hour${hrs !== 1 ? "s" : ""} ago`;
    const days = Math.floor(hrs / 24);
    return `${days} day${days !== 1 ? "s" : ""} ago`;
}
