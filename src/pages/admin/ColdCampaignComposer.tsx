import { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Users, FileText, Send, RefreshCw, AlertCircle } from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
    getLeads, getColdTemplates, createColdCampaign,
    Lead, ColdEmailTemplate
} from "../../lib/adminService";

const ColdCampaignComposer = () => {
    const navigate = useNavigate();

    const [leads, setLeads] = useState<Lead[]>([]);
    const [templates, setTemplates] = useState<ColdEmailTemplate[]>([]);
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form State
    const [campaignName, setCampaignName] = useState("");
    const [selectedTemplateId, setSelectedTemplateId] = useState("");

    // Audience Filters
    const [filterIndustry, setFilterIndustry] = useState<string>("All");
    const [filterStatus, setFilterStatus] = useState<string>("New");
    const [filterPriority, setFilterPriority] = useState<string>("All");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [l, t] = await Promise.all([getLeads(), getColdTemplates()]);
                setLeads(l);
                setTemplates(t);
            } catch (err) {
                setError("Failed to load leads or templates.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Filter Logic
    const targetAudience = useMemo(() => {
        return leads.filter(l => {
            if (filterIndustry !== "All" && l.industry !== filterIndustry) return false;
            if (filterStatus !== "All" && l.status !== filterStatus) return false;
            if (filterPriority !== "All" && l.priority !== filterPriority) return false;
            if (!l.email) return false; // Must have email
            return true;
        });
    }, [leads, filterIndustry, filterStatus, filterPriority]);

    const handleSend = async () => {
        if (!campaignName) return setError("Campaign name is required.");
        if (!selectedTemplateId) return setError("Please select a template.");
        if (targetAudience.length === 0) return setError("Audience cannot be empty. Adjust filters.");

        if (!confirm(`Are you sure you want to send this to ${targetAudience.length} leads?`)) return;

        setSending(true);
        setError(null);
        try {
            // 1. Create the campaign draft in DB
            const campaign = await createColdCampaign({
                name: campaignName,
                template_id: selectedTemplateId,
                target_filters: { industry: filterIndustry, status: filterStatus, priority: filterPriority }
            });

            // 2. Trigger the Vercel Edge Function
            const response = await fetch('/api/send-cold-campaign', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    campaign_id: campaign.id,
                    template_id: selectedTemplateId,
                    lead_ids: targetAudience.map(l => l.id)
                })
            });

            if (!response.ok) {
                throw new Error("Failed to dispatch emails via edge function.");
            }

            // 3. Redirect back to list
            navigate("/admin/cold-emails");
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Failed to dispatch campaign.");
            setSending(false);
        }
    };

    if (loading) {
        return <AdminLayout><div className="flex justify-center p-20"><RefreshCw className="h-8 w-8 animate-spin text-teal-600" /></div></AdminLayout>;
    }

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto pb-20">
                <div className="mb-6 flex justify-between items-center">
                    <Link to="/admin/cold-emails" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 transition">
                        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Campaigns
                    </Link>
                </div>

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Compose Campaign</h1>
                    <p className="text-gray-600">Select your audience segment and dispatch targeted emails.</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center">
                        <AlertCircle className="h-5 w-5 mr-2" /> {error}
                    </div>
                )}

                <div className="space-y-8">
                    {/* Basic Info */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">1. Campaign Details</h2>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Internal Campaign Name</label>
                            <input
                                type="text"
                                value={campaignName}
                                onChange={e => setCampaignName(e.target.value)}
                                placeholder="e.g. Q3 SaaS Target List"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none max-w-md"
                            />
                        </div>
                    </div>

                    {/* Audience Segmenting */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center"><Users className="h-5 w-5 mr-2 text-teal-600" /> 2. Target Audience</h2>
                            <div className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-sm font-bold flex items-center border border-teal-100">
                                {targetAudience.length} Leads Matching
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Industry</label>
                                <select value={filterIndustry} onChange={e => setFilterIndustry(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white outline-none">
                                    <option value="All">All Industries</option>
                                    <option value="SaaS">SaaS</option>
                                    <option value="Ecommerce">Ecommerce</option>
                                    <option value="Fintech">Fintech</option>
                                    <option value="Healthcare">Healthcare</option>
                                    <option value="General">General</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Lead Status</label>
                                <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white outline-none">
                                    <option value="All">All Statuses</option>
                                    <option value="New">New</option>
                                    <option value="Contacted">Contacted</option>
                                    <option value="Negotiating">Negotiating</option>
                                    <option value="Won">Won</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Priority</label>
                                <select value={filterPriority} onChange={e => setFilterPriority(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white outline-none">
                                    <option value="All">All Priorities</option>
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>
                            </div>
                        </div>

                        {/* Preview Audience List inline */}
                        {targetAudience.length > 0 && (
                            <div className="border border-gray-100 rounded-lg overflow-hidden max-h-48 overflow-y-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <tbody className="bg-white divide-y divide-gray-100">
                                        {targetAudience.slice(0, 10).map((l, i) => (
                                            <tr key={l.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                                <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{l.name}</td>
                                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{l.email}</td>
                                                <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-400">{l.company}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {targetAudience.length > 10 && <div className="text-center py-2 bg-gray-50 text-xs text-gray-500 italic border-t border-gray-100">+ {targetAudience.length - 10} more leads in segment</div>}
                            </div>
                        )}
                    </div>

                    {/* Template Selection */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center"><FileText className="h-5 w-5 mr-2 text-teal-600" /> 3. Select Content</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {templates.map(t => (
                                <div
                                    key={t.id}
                                    onClick={() => setSelectedTemplateId(t.id)}
                                    className={`border-2 rounded-xl p-4 cursor-pointer transition ${selectedTemplateId === t.id ? "border-teal-500 bg-teal-50" : "border-gray-200 hover:border-teal-300 hover:bg-gray-50"}`}
                                >
                                    <h3 className="font-bold text-gray-900 mb-1">{t.name}</h3>
                                    <p className="text-sm text-gray-600 truncate">Subj: {t.subject}</p>
                                </div>
                            ))}
                            {templates.length === 0 && (
                                <div className="col-span-2 text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-gray-200 border-dashed">
                                    No templates available. <Link to="/admin/cold-emails/templates/new" className="text-teal-600 hover:underline">Create a template first</Link>.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Dispatch Action */}
                    <div className="bg-slate-900 rounded-xl shadow-lg border border-slate-700 p-8 text-center">
                        <h2 className="text-2xl font-bold text-white mb-2">Ready to dispatch?</h2>
                        <p className="text-slate-300 mb-6">This will instantly start routing emails through the bulk SMTP server to {targetAudience.length} leads.</p>

                        <button
                            onClick={handleSend}
                            disabled={sending || targetAudience.length === 0 || !campaignName || !selectedTemplateId}
                            className="inline-flex items-center px-8 py-4 bg-teal-500 text-white text-lg font-bold rounded-xl hover:bg-teal-400 transition-colors shadow-lg shadow-teal-500/30 disabled:opacity-50 disabled:shadow-none"
                        >
                            {sending ? <RefreshCw className="h-5 w-5 mr-3 animate-spin" /> : <Send className="h-5 w-5 mr-3" />}
                            {sending ? "Dispatching Batch..." : "Blast Campaign Now"}
                        </button>
                    </div>

                </div>
            </div>
        </AdminLayout>
    );
};

export default ColdCampaignComposer;
