import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Save, AlertCircle } from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import { createLead } from "../../lib/adminService";

const CHANNELS = ["Facebook", "LinkedIn", "Referral", "Website", "Cold Email", "Event", "Other"];
const INDUSTRIES = ["SaaS", "Ecommerce", "Fintech", "Healthcare", "General", "Other"];
const STATUSES = ["New", "Contacted", "Proposal Sent", "Negotiating", "Won", "Lost"];
const PRIORITIES = ["High", "Medium", "Low"];

const LeadForm = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        phone: "",
        channel: "Website",
        referrer: "",
        industry: "General",
        status: "New",
        priority: "Medium",
        notes: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await createLead({
                ...formData,
                source: "manual",
                channel: formData.channel as any,
                industry: formData.industry as any,
                status: formData.status as any,
                priority: formData.priority as any
            });
            navigate("/admin/leads");
        } catch (err: any) {
            setError(err.message || "Failed to create lead");
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-3xl mx-auto pb-12">
                <div className="mb-6">
                    <Link to="/admin/leads" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors">
                        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Leads
                    </Link>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Add New Lead</h2>
                            <p className="text-sm text-gray-500 mt-1">Manually enter a new contact into the CRM.</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center space-x-2">
                                <AlertCircle className="h-5 w-5" />
                                <span className="text-sm">{error}</span>
                            </div>
                        )}

                        {/* Contact Info */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider border-b pb-2">Contact Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                                    <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-shadow" placeholder="Jane Doe" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-shadow" placeholder="jane@example.com" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                                    <input type="text" name="company" value={formData.company} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-shadow" placeholder="Acme Corp" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-shadow" placeholder="+1 (555) 000-0000" />
                                </div>
                            </div>
                        </div>

                        {/* Deal Info */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider border-b pb-2 mt-6">Deal Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select name="status" value={formData.status} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-white">
                                        {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                                    <select name="priority" value={formData.priority} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-white">
                                        {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                                    <select name="industry" value={formData.industry} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-white">
                                        {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Acquisition Channel</label>
                                    <select name="channel" value={formData.channel} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-white">
                                        {CHANNELS.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                {formData.channel === "Referral" && (
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Referred By</label>
                                        <input type="text" name="referrer" value={formData.referrer} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none" placeholder="Name of the person who referred this lead" />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Notes */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider border-b pb-2 mt-6">Additional Notes</h3>
                            <div>
                                <textarea name="notes" value={formData.notes} onChange={handleChange} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none resize-y" placeholder="Any context, background info, or specific requirements..." />
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="pt-4 border-t flex items-center justify-end space-x-3 text-sm font-medium">
                            <Link to="/admin/leads" className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                Cancel
                            </Link>
                            <button type="submit" disabled={loading} className="px-4 py-2 text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition flex items-center disabled:opacity-50">
                                {loading ? (
                                    <span className="animate-pulse">Saving...</span>
                                ) : (
                                    <>
                                        <Save className="h-4 w-4 mr-2" /> Save Lead
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
};

export default LeadForm;
