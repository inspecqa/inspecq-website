import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Send, Eye, RefreshCw, User, LayoutTemplate, AlertCircle } from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import { getLeads, getTemplates, createProposal, renderTemplate, Lead, ProposalTemplate } from "../../lib/adminService";

const ProposalComposer = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [leads, setLeads] = useState<Lead[]>([]);
    const [templates, setTemplates] = useState<ProposalTemplate[]>([]);
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form state
    const [leadId, setLeadId] = useState<string>(searchParams.get("lead_id") || "");
    const [templateId, setTemplateId] = useState<string>(searchParams.get("template_id") || "");

    // Custom variables state
    const [vars, setVars] = useState({
        service: "Phase 1: Security Audit & Penetration Testing",
        price: "$5,000",
        validity: "14 days",
        sender_name: "The InspecQ Team"
    });

    useEffect(() => {
        const fetchAll = async () => {
            setLoading(true);
            try {
                const [lData, tData] = await Promise.all([getLeads(), getTemplates()]);
                setLeads(lData);
                setTemplates(tData);

                // Auto-select first template if none selected and some exist
                if (!searchParams.get("template_id") && tData.length > 0) {
                    setTemplateId(tData[0].id);
                }
            } catch (err) {
                setError("Failed to load options.");
            } finally {
                setLoading(false);
            }
        };
        fetchAll();
    }, [searchParams]);

    const handleVarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVars(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // Derived Preview State
    const selectedLead = useMemo(() => leads.find(l => l.id === leadId), [leads, leadId]);
    const selectedTemplate = useMemo(() => templates.find(t => t.id === templateId), [templates, templateId]);

    const { renderedSubject, renderedBody } = useMemo(() => {
        if (!selectedTemplate) return { renderedSubject: "", renderedBody: "" };

        const templateVars = {
            name: selectedLead?.name || "[Lead Name]",
            company: selectedLead?.company || "[Company]",
            industry: selectedLead?.industry || "[Industry]",
            date: new Date().toLocaleDateString(),
            ...vars
        };

        return {
            renderedSubject: renderTemplate(selectedTemplate.subject, templateVars),
            renderedBody: renderTemplate(selectedTemplate.body, templateVars)
        };
    }, [selectedLead, selectedTemplate, vars]);

    const handleSend = async () => {
        if (!selectedLead || !selectedTemplate) {
            setError("Please select both a lead and a template.");
            return;
        }

        setSending(true);
        setError(null);

        try {
            await createProposal({
                lead_id: selectedLead.id,
                template_id: selectedTemplate.id,
                subject: renderedSubject,
                body: renderedBody,
                status: "Sent"
            });
            // Redirect to proposals list
            navigate("/admin/proposals");
        } catch (err: any) {
            setError(err.message || "Failed to send proposal.");
            setSending(false);
        }
    };

    if (loading) {
        return <AdminLayout><div className="flex justify-center p-20"><RefreshCw className="h-8 w-8 animate-spin text-teal-600" /></div></AdminLayout>;
    }

    return (
        <AdminLayout>
            <div className="max-w-6xl mx-auto pb-12">
                <div className="mb-6 flex justify-between items-center">
                    <Link to="/admin/proposals" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 transition">
                        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Proposals
                    </Link>
                </div>

                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Compose Proposal</h1>
                    <p className="text-gray-600">Combine a lead with a template, tweak custom variables, and send.</p>
                </div>

                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
                        <AlertCircle className="h-5 w-5 mr-2" /> <span className="text-sm">{error}</span>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column: Controls */}
                    <div className="space-y-6">

                        {/* 1. Selection */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
                            <h3 className="font-semibold text-gray-900 border-b pb-2">1. Select Target & Template</h3>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                    <User className="h-4 w-4 mr-1 text-gray-400" /> Target Lead
                                </label>
                                <select value={leadId} onChange={e => setLeadId(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-white">
                                    <option value="" disabled>Select a lead...</option>
                                    {leads.map(l => (
                                        <option key={l.id} value={l.id}>{l.name} {l.company ? `(${l.company})` : ""}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                    <LayoutTemplate className="h-4 w-4 mr-1 text-gray-400" /> Proposal Template
                                </label>
                                <select value={templateId} onChange={e => setTemplateId(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-white">
                                    <option value="" disabled>Select a template...</option>
                                    {templates.map(t => (
                                        <option key={t.id} value={t.id}>{t.name} — {t.category}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* 2. Custom Variables */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
                            <h3 className="font-semibold text-gray-900 border-b pb-2">2. Customize Variables</h3>
                            <p className="text-xs text-gray-500">The lead's name and company are automatically injected.</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Service</label>
                                    <input type="text" name="service" value={vars.service} onChange={handleVarChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Price / Investment</label>
                                    <input type="text" name="price" value={vars.price} onChange={handleVarChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Validity</label>
                                    <input type="text" name="validity" value={vars.validity} onChange={handleVarChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Sender Name</label>
                                    <input type="text" name="sender_name" value={vars.sender_name} onChange={handleVarChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Preview & Action */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-6 flex flex-col h-[calc(100vh-140px)] max-h-[800px]">
                            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between shrink-0">
                                <h3 className="font-semibold text-gray-900 flex items-center"><Eye className="h-4 w-4 mr-2" /> Live Preview</h3>
                            </div>

                            <div className="p-6 flex-1 overflow-y-auto">
                                {!selectedLead || !selectedTemplate ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
                                        <Eye className="h-10 w-10 mb-3 opacity-20" />
                                        <p>Select a lead and template to see the preview.</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="mb-6">
                                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">To:</span>
                                            <div className="text-sm font-medium text-gray-900 mt-0.5">{selectedLead.name} ({selectedLead.email})</div>
                                        </div>
                                        <div className="mb-6">
                                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Subject:</span>
                                            <div className="text-base font-bold text-gray-900 mt-1 pb-2 border-b">{renderedSubject || "No subject"}</div>
                                        </div>
                                        <div>
                                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 block">Email Body:</span>
                                            <div
                                                className="prose prose-sm max-w-none prose-teal text-gray-800"
                                                dangerouslySetInnerHTML={{ __html: renderedBody || "" }}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="p-4 bg-gray-50 border-t border-gray-200 shrink-0 flex justify-end">
                                <button
                                    onClick={handleSend}
                                    disabled={sending || !selectedLead || !selectedTemplate}
                                    className="px-6 py-2.5 bg-teal-600 text-white rounded-lg font-medium flex items-center hover:bg-teal-700 disabled:opacity-50 transition-colors shadow-sm"
                                >
                                    {sending ? "Sending..." : <><Send className="h-4 w-4 mr-2" /> Send Proposal</>}
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AdminLayout>
    );
};

export default ProposalComposer;
