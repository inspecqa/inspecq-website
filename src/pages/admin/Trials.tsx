import React, { useEffect, useState } from "react";
import {
    FileCheck, RefreshCw, AlertCircle, Eye, Trash2, Clock,
    CheckCircle, Search, Download, X,
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
    getTrialRequests, updateTrialStatus, deleteTrial, TrialRequest, downloadCSV,
} from "../../lib/adminService";

const statusColors: Record<string, string> = {
    New: "bg-blue-100 text-blue-800",
    Contacted: "bg-yellow-100 text-yellow-800",
    "Under Review": "bg-purple-100 text-purple-800",
    Converted: "bg-green-100 text-green-800",
    Closed: "bg-gray-100 text-gray-600",
};
const STATUSES = ["New", "Contacted", "Under Review", "Converted", "Closed"];

const Trials = () => {
    const [trials, setTrials] = useState<TrialRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [selected, setSelected] = useState<TrialRequest | null>(null);

    const fetchData = async () => {
        setLoading(true); setError(null);
        try { setTrials(await getTrialRequests()); }
        catch { setError("Failed to load trial requests."); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchData(); }, []);

    const handleStatusChange = async (id: string, status: string) => {
        setTrials(prev => prev.map(t => t.id === id ? { ...t, status } : t));
        try { await updateTrialStatus(id, status); } catch { fetchData(); }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this trial request?")) return;
        setTrials(prev => prev.filter(t => t.id !== id));
        try { await deleteTrial(id); } catch { fetchData(); }
    };

    const filtered = trials.filter(t => {
        const name = t.full_name ?? t.name ?? "";
        const matchQ = !search || name.toLowerCase().includes(search.toLowerCase()) || t.email.toLowerCase().includes(search.toLowerCase());
        const matchS = filterStatus === "all" || t.status === filterStatus;
        return matchQ && matchS;
    });

    const stats = [
        { label: "Total Requests", value: trials.length, color: "bg-teal-500" },
        { label: "New", value: trials.filter(t => t.status === "New").length, color: "bg-blue-500" },
        { label: "Converted", value: trials.filter(t => t.status === "Converted").length, color: "bg-green-500" },
        { label: "Conversion Rate", value: trials.length ? `${Math.round(trials.filter(t => t.status === "Converted").length / trials.length * 100)}%` : "0%", color: "bg-purple-500" },
    ];

    return (
        <AdminLayout>
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Free Trial Requests</h1>
                        <p className="text-gray-600">Manage all trial signup requests</p>
                    </div>
                    <div className="flex space-x-3">
                        <button onClick={() => downloadCSV(trials as unknown as Record<string, unknown>[], "trial_requests.csv")} className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                            <Download className="h-4 w-4" /><span>Export CSV</span>
                        </button>
                        <button onClick={fetchData} disabled={loading} className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">
                            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                        </button>
                    </div>
                </div>

                {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center space-x-2"><AlertCircle className="h-5 w-5" /><p className="text-sm">{error}</p></div>}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((s, i) => (
                        <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                            <div className={`${s.color} w-10 h-10 rounded-lg flex items-center justify-center mb-3`}><FileCheck className="h-5 w-5 text-white" /></div>
                            <p className="text-2xl font-bold text-gray-900">{loading ? "—" : s.value}</p>
                            <p className="text-sm text-gray-500">{s.label}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex flex-col md:flex-row gap-3">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name or email…" className="pl-9 w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-teal-500" />
                    </div>
                    <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-teal-500">
                        <option value="all">All Statuses</option>
                        {STATUSES.map(s => <option key={s}>{s}</option>)}
                    </select>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">Requests {!loading && <span className="text-sm font-normal text-gray-500">({filtered.length})</span>}</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>{["Name", "Contact", "Company", "Status", "Submitted", "Actions"].map(h => <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>)}</tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {loading ? Array.from({ length: 3 }).map((_, i) => <tr key={i}>{Array.from({ length: 6 }).map((__, j) => <td key={j} className="px-6 py-4"><div className="h-4 bg-gray-100 rounded animate-pulse" /></td>)}</tr>)
                                    : filtered.length === 0 ? <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-500 text-sm">No trial requests yet. When visitors sign up at /free-trial they'll appear here.</td></tr>
                                        : filtered.map(t => (
                                            <tr key={t.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 text-sm font-medium text-gray-900">{t.full_name ?? t.name ?? "—"}</td>
                                                <td className="px-6 py-4 text-sm text-gray-600">{t.email}</td>
                                                <td className="px-6 py-4 text-sm text-gray-600">{t.company_name ?? t.company ?? "—"}</td>
                                                <td className="px-6 py-4">
                                                    <select value={t.status} onChange={e => handleStatusChange(t.id, e.target.value)} className={`text-xs font-semibold rounded-full px-2 py-1 border-0 cursor-pointer ${statusColors[t.status] ?? "bg-gray-100"}`}>
                                                        {STATUSES.map(s => <option key={s}>{s}</option>)}
                                                    </select>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500"><div className="flex items-center"><Clock className="h-3 w-3 mr-1" />{new Date(t.created_at).toLocaleDateString()}</div></td>
                                                <td className="px-6 py-4">
                                                    <div className="flex space-x-2">
                                                        <button onClick={() => setSelected(t)} className="text-teal-600 hover:text-teal-900 p-1"><Eye className="h-4 w-4" /></button>
                                                        <button onClick={() => handleDelete(t.id)} className="text-red-600 hover:text-red-900 p-1"><Trash2 className="h-4 w-4" /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {selected && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-lg w-full shadow-2xl">
                        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">Trial Request Details</h3>
                            <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600"><X className="h-5 w-5" /></button>
                        </div>
                        <div className="p-6 grid grid-cols-2 gap-4 text-sm">
                            {[["Name", selected.full_name ?? selected.name], ["Email", selected.email], ["Company", selected.company_name ?? selected.company], ["Phone", selected.phone], ["Status", selected.status], ["Source", selected.source_page], ["Submitted", new Date(selected.created_at).toLocaleString()]].filter(([, v]) => v).map(([l, v]) => (
                                <div key={l as string}><label className="font-medium text-gray-600">{l}</label><p className="text-gray-900 mt-0.5">{v}</p></div>
                            ))}
                            {selected.message && <div className="col-span-2"><label className="font-medium text-gray-600">Message</label><p className="text-gray-800 bg-gray-50 p-3 rounded mt-1">{selected.message}</p></div>}
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default Trials;
