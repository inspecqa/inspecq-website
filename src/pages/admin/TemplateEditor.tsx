import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Save, AlertCircle, Eye, Columns } from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import { getTemplate, createTemplate, updateTemplate, ProposalTemplate } from "../../lib/adminService";

const CATEGORIES = ["SaaS", "Ecommerce", "Fintech", "Healthcare", "General"];

const AVAILABLE_VARIABLES = [
    { tag: "{{name}}", description: "Recipient's full name" },
    { tag: "{{company}}", description: "Recipient's company name" },
    { tag: "{{industry}}", description: "Lead's industry" },
    { tag: "{{service}}", description: "Details of proposed service" },
    { tag: "{{price}}", description: "Proposed price/investment" },
    { tag: "{{date}}", description: "Current date of sending" },
    { tag: "{{validity}}", description: "Proposal expiration (e.g., '14 days')" },
    { tag: "{{sender_name}}", description: "Your admin name" },
];

const TemplateEditor = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const isEditing = !!id;

    const [loading, setLoading] = useState(isEditing);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState<Partial<ProposalTemplate>>({
        name: "",
        category: "General",
        subject: "",
        body: "<p>Dear {{name}},</p>\n\n<p>Thank you for considering InspecQ for <strong>{{company}}</strong>.</p>\n\n<h3>Our Proposed Engagement</h3>\n<p>{{service}}</p>\n\n<h3>Investment</h3>\n<p>The total investment is <strong>{{price}}</strong>. This proposal is valid until {{validity}}.</p>\n\n<p>Best regards,<br>{{sender_name}}</p>"
    });

    const [showPreview, setShowPreview] = useState(false);

    useEffect(() => {
        const fetchTemplate = async () => {
            if (!id) return;
            try {
                const t = await getTemplate(id);
                if (t) setFormData(t);
                else navigate("/admin/templates");
            } catch (err) {
                setError("Failed to load template");
            } finally {
                setLoading(false);
            }
        };
        fetchTemplate();
    }, [id, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError(null);

        try {
            if (isEditing && id) {
                await updateTemplate(id, formData);
            } else {
                await createTemplate(formData as any);
            }
            navigate("/admin/templates");
        } catch (err: any) {
            setError(err.message || "Failed to save template");
            setSaving(false);
        }
    };

    if (loading) {
        return <AdminLayout><div className="flex justify-center p-20">Loading...</div></AdminLayout>;
    }

    return (
        <AdminLayout>
            <div className="max-w-6xl mx-auto pb-12">
                <div className="mb-6 flex justify-between items-center">
                    <Link to="/admin/templates" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 transition">
                        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Templates
                    </Link>
                    <button onClick={() => setShowPreview(!showPreview)} className={`px-4 py-2 border rounded-lg text-sm font-medium flex items-center transition ${showPreview ? "bg-teal-50 border-teal-200 text-teal-700" : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"}`}>
                        {showPreview ? <Columns className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                        {showPreview ? "Editor Mode" : "Preview Mode"}
                    </button>
                </div>

                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
                        <AlertCircle className="h-5 w-5 mr-2" /> <span className="text-sm">{error}</span>
                    </div>
                )}

                <div className={`grid grid-cols-1 ${showPreview ? "lg:grid-cols-2 gap-6" : ""}`}>
                    {/* Editor Split */}
                    <div className={`space-y-6 ${showPreview ? "" : "max-w-4xl mx-auto"}`}>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                                <h1 className="text-lg font-bold text-gray-900">{isEditing ? "Edit Template" : "New Proposal Template"}</h1>
                            </div>
                            <form onSubmit={handleSubmit} className="p-6 space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Template Name</label>
                                        <input required name="name" value={formData.name || ""} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none" placeholder="e.g. Standard Mobile QA" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                        <select required name="category" value={formData.category || ""} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-white">
                                            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Subject</label>
                                    <input required name="subject" value={formData.subject || ""} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none" placeholder="QA Proposal for {{company}}" />
                                    <p className="text-xs text-gray-500 mt-1">Variables like {"{{name}}"} and {"{{company}}"} will be replaced automatically.</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 flex justify-between">
                                        Email Body (HTML format)
                                        <span className="text-xs text-teal-600">Dynamic variables supported</span>
                                    </label>
                                    <div className="border border-gray-300 rounded-lg p-1 bg-gray-50">
                                        <textarea required name="body" value={formData.body || ""} onChange={handleChange} rows={15} className="w-full p-3 bg-white border-0 rounded text-sm focus:ring-0 outline-none resize-y font-mono" placeholder="Write HTML here..." />
                                    </div>
                                </div>

                                <div className="pt-4 border-t flex justify-end space-x-3">
                                    <Link to="/admin/templates" className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</Link>
                                    <button type="submit" disabled={saving} className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium flex items-center hover:bg-teal-700 disabled:opacity-50">
                                        {saving ? "Saving..." : <><Save className="h-4 w-4 mr-2" /> Save Template</>}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Preview Split */}
                    {showPreview && (
                        <div className="space-y-6">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-6">
                                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                                    <h3 className="font-semibold text-gray-900">Live Preview</h3>
                                </div>
                                <div className="p-6">
                                    <div className="mb-4">
                                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Subject</span>
                                        <div className="text-sm font-medium text-gray-900 mt-1">{formData.subject || "No subject"}</div>
                                    </div>
                                    <div>
                                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Body</span>
                                        <div
                                            className="prose prose-sm max-w-none border rounded-lg p-4 bg-gray-50 min-h-[300px]"
                                            dangerouslySetInnerHTML={{ __html: formData.body || "" }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Variable Cheat Sheet */}
                <div className={`mt-8 ${showPreview ? "" : "max-w-4xl mx-auto"}`}>
                    <h3 className="text-sm font-bold text-gray-900 mb-3 ml-1">Available Variables</h3>
                    <div className="bg-white border text-sm rounded-lg overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                                <tr>
                                    <th className="px-4 py-3 font-medium">Variable Tag</th>
                                    <th className="px-4 py-3 font-medium">Description</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {AVAILABLE_VARIABLES.map(v => (
                                    <tr key={v.tag} className="hover:bg-gray-50">
                                        <td className="px-4 py-3"><code className="bg-teal-50 text-teal-700 px-2 py-1 rounded font-mono font-bold text-xs">{v.tag}</code></td>
                                        <td className="px-4 py-3 text-gray-600">{v.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default TemplateEditor;
