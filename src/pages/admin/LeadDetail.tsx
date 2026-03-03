import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Save, Edit3, Mail, RefreshCw, Send } from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import { getLead, updateLead, Lead, getProposals, Proposal, getColdTemplates, ColdEmailTemplate } from "../../lib/adminService";

const CHANNELS = ["Facebook", "LinkedIn", "Referral", "Website", "Cold Email", "Event", "Other"];
const INDUSTRIES = ["SaaS", "Ecommerce", "Fintech", "Healthcare", "General", "Other"];
const STATUSES = ["New", "Contacted", "Proposal Sent", "Negotiating", "Won", "Lost"];
const PRIORITIES = ["High", "Medium", "Low"];

const LeadDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [lead, setLead] = useState<Lead | null>(null);
    const [proposals, setProposals] = useState<Proposal[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Edit mode
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<Partial<Lead>>({});

    // Cold Outreach Modal
    const [coldTemplates, setColdTemplates] = useState<ColdEmailTemplate[]>([]);
    const [showOutreachModal, setShowOutreachModal] = useState(false);
    const [selectedColdTemplateId, setSelectedColdTemplateId] = useState("");
    const [customSubject, setCustomSubject] = useState("");
    const [customBody, setCustomBody] = useState("");
    const [previewMode, setPreviewMode] = useState(false);
    const [sendingOutreach, setSendingOutreach] = useState(false);

    useEffect(() => {
        const fetchAll = async () => {
            if (!id) return;
            try {
                const [l, p, ct] = await Promise.all([
                    getLead(id),
                    getProposals(id),
                    getColdTemplates()
                ]);
                if (!l) {
                    navigate("/admin/leads");
                    return;
                }
                setLead(l);
                setFormData(l);
                setProposals(p);
                setColdTemplates(ct);
            } catch (err) {
                console.error("Failed to load details", err);
            } finally {
                setLoading(false);
            }
        };
        fetchAll();
    }, [id, navigate]);

    const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedColdTemplateId(value);
        if (value === "custom") {
            setCustomSubject("");
            setCustomBody("");
        } else {
            const tmpl = coldTemplates.find(t => t.id === value);
            if (tmpl) {
                setCustomSubject(tmpl.subject);
                setCustomBody(tmpl.body);
            }
        }
    };

    const processPreview = (text: string) => {
        if (!text) return "";
        const vars: Record<string, string> = {
            name: lead?.name?.split(' ')[0] || 'there',
            company: lead?.company || 'your company'
        };
        return text.replace(/\{\{\s*([\w]+)\s*\}\}/g, (_match, key) => vars[key] || '');
    };

    const handleSendOutreach = async () => {
        if (!customSubject || !customBody) return alert("Please enter a subject and body.");
        setSendingOutreach(true);
        try {
            const response = await fetch('/api/send-single-cold-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    lead_id: id,
                    template_id: selectedColdTemplateId === "custom" ? undefined : selectedColdTemplateId,
                    subject: customSubject,
                    body: customBody
                })
            });

            if (!response.ok) {
                throw new Error("Failed to dispatch email via edge function.");
            }
            alert("Outreach sent successfully!");
            setShowOutreachModal(false);
            setSelectedColdTemplateId("");
            setCustomSubject("");
            setCustomBody("");
        } catch (err: any) {
            console.error(err);
            alert("Failed to send outreach: " + err.message);
        } finally {
            setSendingOutreach(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSave = async () => {
        if (!id) return;
        setSaving(true);
        try {
            await updateLead(id, formData);
            setLead({ ...lead, ...formData } as Lead);
            setIsEditing(false);
        } catch (err) {
            alert("Failed to update lead.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex justify-center py-20"><RefreshCw className="h-8 w-8 animate-spin text-teal-600" /></div>
            </AdminLayout>
        );
    }

    if (!lead) return null;

    return (
        <AdminLayout>
            <div className="max-w-5xl mx-auto space-y-6 pb-12">
                <div className="flex items-center justify-between">
                    <Link to="/admin/leads" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 transition">
                        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Leads
                    </Link>
                    <div className="flex items-center space-x-3">
                        <button onClick={() => setShowOutreachModal(true)} className="flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition shadow-sm">
                            <Mail className="h-4 w-4 mr-2" /> Direct Outreach
                        </button>
                        <Link to={`/admin/proposals/new?lead_id=${lead.id}`} className="flex items-center px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition shadow-sm">
                            <Send className="h-4 w-4 mr-2" /> Send Proposal
                        </Link>
                    </div>
                </div>

                {/* Profile Header */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-start justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{lead.name}</h1>
                        <p className="text-gray-500 flex items-center mt-1">
                            <Mail className="h-4 w-4 mr-1.5" /> {lead.email}
                            {lead.company && <span className="ml-3 border-l pl-3 border-gray-300">🏢 {lead.company}</span>}
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold border
                            ${lead.status === "Won" ? "bg-green-100 text-green-800 border-green-200"
                                : lead.status === "Lost" ? "bg-gray-100 text-gray-800 border-gray-200"
                                    : "bg-teal-100 text-teal-800 border-teal-200"}`}>
                            {lead.status}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Col: Details */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                                <h3 className="font-semibold text-gray-900">Lead Profile</h3>
                                {!isEditing ? (
                                    <button onClick={() => setIsEditing(true)} className="text-sm font-medium text-teal-600 flex items-center hover:text-teal-700">
                                        <Edit3 className="h-4 w-4 mr-1" /> Edit Profile
                                    </button>
                                ) : (
                                    <div className="flex space-x-2">
                                        <button onClick={() => { setIsEditing(false); setFormData(lead); }} className="text-sm font-medium text-gray-500 hover:text-gray-700">Cancel</button>
                                        <button onClick={handleSave} disabled={saving} className="text-sm font-medium text-teal-600 flex items-center hover:text-teal-700 disabled:opacity-50">
                                            {saving ? "Saving..." : <><Save className="h-4 w-4 mr-1" /> Save</>}
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="p-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                                    {(["name", "email", "company", "phone"] as const).map(field => (
                                        <div key={field}>
                                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{field}</label>
                                            {isEditing ? (
                                                <input name={field} value={formData[field]} onChange={handleChange} className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-teal-500 outline-none" />
                                            ) : (
                                                <p className="text-sm font-medium text-gray-900">{lead[field] || "—"}</p>
                                            )}
                                        </div>
                                    ))}

                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Status</label>
                                        {isEditing ? (
                                            <select name="status" value={formData.status} onChange={handleChange} className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-teal-500 outline-none">
                                                {STATUSES.map(s => <option key={s}>{s}</option>)}
                                            </select>
                                        ) : <p className="text-sm font-medium text-gray-900">{lead.status}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Priority</label>
                                        {isEditing ? (
                                            <select name="priority" value={formData.priority} onChange={handleChange} className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-teal-500 outline-none">
                                                {PRIORITIES.map(s => <option key={s}>{s}</option>)}
                                            </select>
                                        ) : <p className="text-sm font-medium text-gray-900">{lead.priority}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Industry</label>
                                        {isEditing ? (
                                            <select name="industry" value={formData.industry} onChange={handleChange} className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-teal-500 outline-none">
                                                {INDUSTRIES.map(s => <option key={s}>{s}</option>)}
                                            </select>
                                        ) : <p className="text-sm font-medium text-gray-900">{lead.industry}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Channel (Source)</label>
                                        {isEditing ? (
                                            <select name="channel" value={formData.channel} onChange={handleChange} className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-teal-500 outline-none">
                                                {CHANNELS.map(s => <option key={s}>{s}</option>)}
                                            </select>
                                        ) : (
                                            <p className="text-sm font-medium text-gray-900">
                                                {lead.channel} <span className="text-gray-400 text-xs ml-1">({lead.source})</span>
                                            </p>
                                        )}
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Notes</label>
                                        {isEditing ? (
                                            <textarea name="notes" value={formData.notes || ""} onChange={handleChange} rows={3} className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-teal-500 outline-none resize-y" />
                                        ) : (
                                            <p className="text-sm font-medium text-gray-900 bg-gray-50 p-3 rounded-lg border border-gray-100 whitespace-pre-wrap">{lead.notes || "No notes added."}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Col: Timeline */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                                <h3 className="font-semibold text-gray-900">Proposals Timeline</h3>
                            </div>
                            <div className="p-6">
                                {proposals.length === 0 ? (
                                    <div className="text-center py-8">
                                        <Send className="h-8 w-8 text-gray-300 mx-auto mb-3" />
                                        <p className="text-sm font-medium text-gray-900">No proposals yet</p>
                                        <p className="text-xs text-gray-500 mt-1">Send a proposal to start tracking engagement.</p>
                                    </div>
                                ) : (
                                    <div className="relative border-l-2 border-gray-200 ml-3 space-y-6 pb-2">
                                        {proposals.map((p) => (
                                            <div key={p.id} className="relative pl-6">
                                                <div className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-white
                                                    ${p.status === "Opened" || p.status === "Clicked" ? "bg-teal-500" :
                                                        p.status === "Sent" ? "bg-blue-500" : "bg-gray-300"}`} />
                                                <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                                                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{new Date(p.created_at).toLocaleDateString()}</span>
                                                    <h4 className="text-sm font-semibold text-gray-900 mt-0.5">{p.subject}</h4>
                                                    <div className="flex items-center mt-2 justify-between">
                                                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold
                                                            ${p.status === "Opened" ? "bg-teal-100 text-teal-800" :
                                                                p.status === "Clicked" ? "bg-purple-100 text-purple-800" :
                                                                    "bg-gray-200 text-gray-800"}`}>
                                                            {p.status}
                                                        </span>
                                                        <Link to={`/admin/proposals/${p.id}`} className="text-xs font-medium text-teal-600 hover:text-teal-800">View Details</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Outreach Modal */}
            {showOutreachModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-gray-900">Direct Outreach</h3>
                            <button onClick={() => setShowOutreachModal(false)} className="text-gray-400 hover:text-gray-600">×</button>
                        </div>
                        <div className="p-6 space-y-4">
                            <p className="text-sm text-gray-600">
                                Instantly send a cold email template to <strong>{lead.name}</strong>.
                            </p>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Select Template</label>
                                <select
                                    value={selectedColdTemplateId}
                                    onChange={handleTemplateChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                                >
                                    <option value="" disabled>Choose a template...</option>
                                    <option value="custom">-- Write from scratch --</option>
                                    {coldTemplates.map(t => (
                                        <option key={t.id} value={t.id}>{t.name} (Subj: {t.subject})</option>
                                    ))}
                                </select>
                            </div>

                            {(selectedColdTemplateId || customSubject || customBody) && (
                                <div className="space-y-4 border-t border-gray-100 pt-4 mt-4">
                                    <div className="flex bg-gray-100 p-1 rounded-lg w-full max-w-[200px] mb-2">
                                        <button
                                            onClick={() => setPreviewMode(false)}
                                            className={`flex-1 text-xs font-semibold py-1.5 rounded-md transition-shadow ${!previewMode ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => setPreviewMode(true)}
                                            className={`flex-1 text-xs font-semibold py-1.5 rounded-md transition-shadow ${previewMode ? 'bg-white shadow-sm text-teal-600' : 'text-gray-500 hover:text-gray-700'}`}
                                        >
                                            Preview
                                        </button>
                                    </div>

                                    {!previewMode ? (
                                        <>
                                            <div>
                                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Subject</label>
                                                <input
                                                    type="text"
                                                    value={customSubject}
                                                    onChange={e => setCustomSubject(e.target.value)}
                                                    placeholder="Email subject..."
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Body (HTML allowed)</label>
                                                <textarea
                                                    value={customBody}
                                                    onChange={e => setCustomBody(e.target.value)}
                                                    rows={6}
                                                    placeholder="Write your email body..."
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-500 text-sm font-mono"
                                                />
                                                <p className="text-xs text-gray-500 mt-1">Variables available: {`{{name}}`}, {`{{company}}`}</p>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
                                            <div className="pb-3 border-b border-gray-200">
                                                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Subject</p>
                                                <p className="text-sm font-medium text-gray-900">{processPreview(customSubject) || <span className="text-gray-400 italic">No subject</span>}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2">Body</p>
                                                <div
                                                    className="text-sm text-gray-800 prose prose-sm max-w-none break-words"
                                                    dangerouslySetInnerHTML={{ __html: processPreview(customBody) || '<span class="text-gray-400 italic">No body</span>' }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end space-x-3">
                            <button onClick={() => setShowOutreachModal(false)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800">Cancel</button>
                            <button
                                onClick={handleSendOutreach}
                                disabled={sendingOutreach || !customSubject || !customBody}
                                className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition shadow-sm disabled:opacity-50 flex items-center"
                            >
                                {sendingOutreach ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Send className="h-4 w-4 mr-2" />}
                                {sendingOutreach ? "Sending..." : "Send Now"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default LeadDetail;
