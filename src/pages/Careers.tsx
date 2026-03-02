import React, { useState, useEffect } from "react";
import SEO from "../components/SEO";
import { Link } from "react-router-dom";
import {
  Users, MapPin, Clock, DollarSign, CheckCircle, ArrowRight,
  Heart, Zap, Award, Loader, X, Send, AlertCircle,
} from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import { createApplication } from "../lib/adminService";

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string; // newline-separated
  posted_at: string;
}

const BLANK_FORM = { full_name: "", email: "", phone: "", linkedin_url: "", cover_letter: "" };

const Careers = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [applyJob, setApplyJob] = useState<Job | null>(null);
  const [form, setForm] = useState(BLANK_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoadingJobs(true);
      try {
        if (supabase) {
          const { data } = await supabase
            .from("job_postings")
            .select("id, title, department, location, type, salary, description, requirements, posted_at")
            .eq("status", "Active")
            .order("posted_at", { ascending: false });
          if (data) { setJobs(data); return; }
        }
      } catch { /* fall through to static */ }
      // Fallback static jobs shown if Supabase isn't configured yet
      setJobs([
        { id: "1", title: "Founding QA Engineer", department: "Engineering", location: "San Francisco, CA", type: "Full-time", salary: "$90k – $130k + Equity", description: "Join our founding team as we build InspecQ from the ground up.", requirements: "3+ years QA experience\nTest automation skills\nStartup mindset", posted_at: new Date().toISOString() },
        { id: "2", title: "Junior QA Engineer", department: "Engineering", location: "Remote", type: "Full-time", salary: "$60k – $80k + Equity", description: "Start your QA career with a growing startup.", requirements: "1+ years QA experience\nBasic automation knowledge\nEagerness to learn", posted_at: new Date().toISOString() },
      ]);
      setLoadingJobs(false);
    };
    fetchJobs().finally(() => setLoadingJobs(false));
  }, []);

  const departments = [
    { id: "all", name: "All Departments", count: jobs.length },
    ...Array.from(new Set(jobs.map(j => j.department))).map(dept => ({
      id: dept, name: dept, count: jobs.filter(j => j.department === dept).length,
    })),
  ];

  const filteredJobs = selectedDepartment === "all" ? jobs : jobs.filter(j => j.department === selectedDepartment);

  const openApply = (job: Job) => { setApplyJob(job); setForm(BLANK_FORM); setSubmitSuccess(false); setSubmitError(null); };

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyJob) return;
    setSubmitting(true); setSubmitError(null);
    try {
      await createApplication({ job_id: applyJob.id, ...form, status: "New" });
      setSubmitSuccess(true);
    } catch { setSubmitError("Failed to submit application. Please try again or email us directly."); }
    finally { setSubmitting(false); }
  };

  const benefits = [
    { icon: Heart, title: "Health & Wellness", description: "Comprehensive health insurance, dental, vision, and wellness programs" },
    { icon: Clock, title: "Work-Life Balance", description: "Flexible hours, remote work options, and generous PTO policy" },
    { icon: Zap, title: "Growth & Learning", description: "Professional development budget, conferences, and certification support" },
    { icon: Award, title: "Recognition", description: "Performance bonuses, equity options, and peer recognition programs" },
  ];

  const culture = [
    { title: "Innovation First", description: "We encourage creative problem-solving and embrace new technologies.", image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { title: "Collaborative Environment", description: "Work with talented professionals in a supportive environment.", image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { title: "Continuous Learning", description: "Grow your skills with access to training, conferences, and certifications.", image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400" },
  ];

  const formatPosted = (iso: string) => {
    const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    return `${Math.floor(days / 7)} week${Math.floor(days / 7) > 1 ? "s" : ""} ago`;
  };

  return (
    <div className="pt-16">
      <SEO title="Careers" description="Join the InspecQ team. Explore open positions in QA engineering, automation, and client success." canonical="/careers" />

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-medium mb-6"><Users className="h-4 w-4 mr-2" />Join Our Team</div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Build Your Career in Quality Assurance</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">Join a team of passionate QA professionals dedicated to delivering exceptional software quality.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => document.getElementById("open-positions")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-teal-600 text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-teal-700 transition-colors flex items-center justify-center space-x-2">
                <span>View Open Positions</span><ArrowRight className="h-5 w-5" />
              </button>
              <Link to="/contact" className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-md font-semibold text-lg hover:bg-gray-50 transition-colors">Contact HR</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Work at InspecQ?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Competitive benefits and a culture that supports your professional growth.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((b, i) => (
              <div key={i} className="text-center p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 group">
                <div className="bg-teal-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"><b.icon className="h-6 w-6 text-white" /></div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{b.title}</h3>
                <p className="text-gray-600 text-sm">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Culture</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">A workplace that values innovation, collaboration, and continuous growth.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {culture.map((item, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} />
                <div className="p-6"><h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3><p className="text-gray-600">{item.description}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="open-positions" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Open Positions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Find your next opportunity and join our growing team.</p>
          </div>

          {/* Department filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {departments.map(dept => (
              <button key={dept.id} onClick={() => setSelectedDepartment(dept.id)}
                className={`px-6 py-3 rounded-full font-medium transition-colors ${selectedDepartment === dept.id ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                {dept.name} ({dept.count})
              </button>
            ))}
          </div>

          {loadingJobs ? (
            <div className="flex items-center justify-center py-16"><Loader className="h-8 w-8 text-teal-600 animate-spin" /></div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No positions available in this department at the moment.</p>
              <p className="text-gray-600 mt-2">Check back soon or contact us about future opportunities.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredJobs.map(job => (
                <div key={job.id} className="bg-gray-50 rounded-xl p-8 hover:bg-white hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                        <span className="flex items-center"><MapPin className="h-4 w-4 mr-1" />{job.location}</span>
                        <span className="flex items-center"><Clock className="h-4 w-4 mr-1" />{job.type}</span>
                        {job.salary && <span className="flex items-center"><DollarSign className="h-4 w-4 mr-1" />{job.salary}</span>}
                      </div>
                    </div>
                    <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium shrink-0">{job.department}</span>
                  </div>
                  <p className="text-gray-600 mb-6">{job.description}</p>
                  {job.requirements && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Requirements:</h4>
                      <ul className="space-y-2">
                        {job.requirements.split("\n").filter(Boolean).map((req, i) => (
                          <li key={i} className="flex items-center text-gray-700 text-sm"><CheckCircle className="h-4 w-4 text-teal-600 mr-3 shrink-0" />{req}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Posted {formatPosted(job.posted_at)}</span>
                    <button onClick={() => openApply(job)} className="bg-teal-600 text-white px-6 py-2 rounded-md font-medium hover:bg-teal-700 transition-colors">Apply Now</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Join Our Team?</h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">Take the next step in your QA career and help us deliver exceptional software quality.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => document.getElementById("open-positions")?.scrollIntoView({ behavior: "smooth" })} className="bg-white text-teal-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">Browse Open Positions</button>
            <Link to="/contact" className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-teal-600 transition-colors">Contact HR Team</Link>
          </div>
        </div>
      </section>

      {/* Apply Modal */}
      {applyJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Apply for {applyJob.title}</h3>
                <p className="text-sm text-gray-500">{applyJob.department} · {applyJob.location}</p>
              </div>
              <button onClick={() => setApplyJob(null)} className="text-gray-400 hover:text-gray-600"><X className="h-5 w-5" /></button>
            </div>

            {submitSuccess ? (
              <div className="p-8 text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Application Submitted!</h4>
                <p className="text-gray-600 text-sm mb-4">Thank you for applying! We'll review your application and be in touch within 5–7 business days.</p>
                <button onClick={() => setApplyJob(null)} className="bg-teal-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-teal-700">Close</button>
              </div>
            ) : (
              <form onSubmit={handleApply} className="p-6 space-y-4">
                {submitError && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center space-x-2 text-sm"><AlertCircle className="h-4 w-4 shrink-0" /><p>{submitError}</p></div>}
                {[["full_name", "Full Name", true, "text"], ["email", "Email Address", true, "email"], ["phone", "Phone Number", false, "tel"], ["linkedin_url", "LinkedIn URL", false, "url"]].map(([k, l, req, t]) => (
                  <div key={k as string}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{l as string} {req && <span className="text-red-500">*</span>}</label>
                    <input type={t as string} required={req as boolean} value={form[k as keyof typeof form]} onChange={e => setForm(p => ({ ...p, [k as string]: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 text-sm" />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cover Letter</label>
                  <textarea value={form.cover_letter} onChange={e => setForm(p => ({ ...p, cover_letter: e.target.value }))} rows={5} placeholder="Tell us why you'd be a great fit…" className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 text-sm resize-none" />
                </div>
                <div className="flex space-x-3 pt-2">
                  <button type="button" onClick={() => setApplyJob(null)} className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50">Cancel</button>
                  <button type="submit" disabled={submitting} className="flex-1 flex items-center justify-center space-x-2 bg-teal-600 text-white px-4 py-2.5 rounded-md text-sm font-semibold hover:bg-teal-700 disabled:opacity-60">
                    {submitting ? <><Loader className="h-4 w-4 animate-spin" /><span>Submitting…</span></> : <><Send className="h-4 w-4" /><span>Submit Application</span></>}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Careers;
