import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, RefreshCw, Eye, HelpCircle } from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import { getColdTemplate, createColdTemplate, updateColdTemplate, renderTemplate, ColdEmailTemplate } from "../../lib/adminService";

const AVAILABLE_VARS = [
    { key: "name", desc: "First name of the lead (or generic 'there' if missing)" },
    { key: "company", desc: "Lead's company name" },
    { key: "sender_name", desc: "Your name or the admin's name sending the blast" },
];

// Provide some default fake data for the live preview
const previewData = {
    name: "Alex",
    company: "Acme Corp",
    sender_name: "The InspecQ Team",
};

const ColdTemplateEditor = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const isEditing = Boolean(id);

    const [loading, setLoading] = useState(isEditing);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [form, setForm] = useState<Partial<ColdEmailTemplate>>({
        name: "",
        subject: "",
        body: ""
    });

    useEffect(() => {
        if (!isEditing || !id) return;
        const fetchTemplate = async () => {
            try {
                const data = await getColdTemplate(id);
                if (data) setForm(data);
                else setError("Template not found.");
            } catch (err) {
                setError("Failed to load template.");
            } finally {
                setLoading(false);
            }
        };
        fetchTemplate();
    }, [id, isEditing]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSave = async () => {
        if (!form.name || !form.subject || !form.body) {
            setError("Name, subject, and body are required.");
            return;
        }

        setSaving(true);
        setError(null);
        try {
            if (isEditing && id) {
                await updateColdTemplate(id, {
                    name: form.name,
                    subject: form.subject,
                    body: form.body
                });
            } else {
                await createColdTemplate({
                    name: form.name as string,
                    subject: form.subject as string,
                    body: form.body as string
                });
            }
            navigate("/admin/cold-emails/templates");
        } catch (err: any) {
            setError(err.message || "Failed to save template.");
            setSaving(false);
        }
    };

    // Derived values for the live preview
    const renderedSubject = useMemo(() => {
        return renderTemplate(form.subject || "", previewData);
    }, [form.subject]);

    const renderedBody = useMemo(() => {
        return renderTemplate(form.body || "", previewData);
    }, [form.body]);

    if (loading) {
        return <AdminLayout><div className="flex justify-center p-20"><RefreshCw className="h-8 w-8 animate-spin text-teal-600" /></div></AdminLayout>;
    }

    return (
        <AdminLayout>
            <div className="max-w-6xl mx-auto pb-16">
                <div className="mb-6 flex justify-between items-center">
                    <Link to="/admin/cold-emails/templates" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 transition">
                        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Outreach Templates
                    </Link>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="px-4 py-2 bg-teal-600 text-white rounded-lg font-medium flex items-center hover:bg-teal-700 disabled:opacity-50 transition-colors shadow-sm"
                    >
                        {saving ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                        {isEditing ? "Save Changes" : "Create Template"}
                    </button>
                </div>

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{isEditing ? "Edit Outreach Template" : "New Outreach Template"}</h1>
                    <p className="text-gray-600">Design automated outreach emails with dynamic variables.</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Left Column: Form Editor */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Internal Template Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Q3 SaaS Quality Pain Point Outreach"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={form.subject}
                                    onChange={handleChange}
                                    placeholder="e.g. QA bottlenecks at {{company}}?"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                                />
                                <p className="text-xs text-gray-500 mt-1">Variables supported, e.g. `{"{{company}}"}`</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Body (HTML/Text)</label>
                                <div className="border border-gray-300 rounded-lg overflow-hidden flex flex-col h-80 focus-within:ring-2 focus-within:ring-teal-500 transition-all">
                                    <textarea
                                        name="body"
                                        value={form.body}
                                        onChange={handleChange}
                                        placeholder="<p>Hi {{name}},</p>..."
                                        className="w-full p-4 flex-1 outline-none resize-none font-mono text-sm leading-relaxed"
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Variables Guide */}
                        <div className="bg-blue-50/50 rounded-xl border border-blue-100 p-5">
                            <h3 className="font-semibold text-blue-900 mb-3 flex items-center text-sm">
                                <HelpCircle className="h-4 w-4 mr-1.5 text-blue-600" /> Available Header Variables
                            </h3>
                            <div className="space-y-2">
                                {AVAILABLE_VARS.map(v => (
                                    <div key={v.key} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 text-sm">
                                        <code className="text-blue-700 bg-blue-100/50 px-1.5 py-0.5 rounded font-bold w-max">{`{{${v.key}}}`}</code>
                                        <span className="text-gray-600 text-xs">{v.desc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Live Data Preview */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-6 flex flex-col h-[calc(100vh-140px)] min-h-[600px] max-h-[800px]">

                            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between shrink-0">
                                <h3 className="font-semibold text-gray-900 flex items-center">
                                    <Eye className="h-4 w-4 mr-2" /> Live Preview
                                </h3>
                                <span className="text-xs font-medium text-teal-600 bg-teal-50 px-2 py-1 rounded">Using mock data</span>
                            </div>

                            <div className="p-6 flex-1 overflow-y-auto">
                                {!form.subject && !form.body ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
                                        <Eye className="h-10 w-10 mb-3 opacity-20" />
                                        <p>Start typing to see the live preview.</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="mb-6">
                                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Subject:</span>
                                            <div className="text-lg font-bold text-gray-900 mt-1 pb-2 border-b">
                                                {renderedSubject || <span className="text-gray-300 italic">Target subject...</span>}
                                            </div>
                                        </div>

                                        <div>
                                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 block">Email Outline:</span>
                                            <div
                                                className="prose prose-sm max-w-none prose-teal text-gray-800"
                                                dangerouslySetInnerHTML={{ __html: renderedBody || "<p class='text-gray-300 italic'>Target body...</p>" }}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AdminLayout>
    );
};

export default ColdTemplateEditor;
