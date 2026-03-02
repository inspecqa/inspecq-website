import React, { useEffect, useState } from "react";
import {
    Users, Mail, Briefcase, Phone, Eye, Trash2, RefreshCw,
    AlertCircle, CheckCircle, Clock, ChevronDown, X, Search,
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
    getApplications, updateApplicationStatus, updateApplicationNotes,
    deleteApplication, JobApplication, downloadCSV,
} from "../../lib/adminService";

const statusColors: Record<string, string> = {
    New: "bg-blue-100 text-blue-800",
    Reviewing: "bg-yellow-100 text-yellow-800",
    Interview: "bg-purple-100 text-purple-800",
    Offered: "bg-green-100 text-green-800",
    Rejected: "bg-red-100 text-red-800",
};
const STATUSES = ["New", "Reviewing", "Interview", "Offered", "Rejected"];

const Applications = () => {
    const [apps, setApps] = useState<JobApplication[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [selected, setSelected] = useState<JobApplication | null>(null);
    const [notes, setNotes] = useState("");
    const [savingNotes, setSavingNotes] = useState(false);

    const fetchData = async () => {
        setLoading(true); setError(null);
        try { setApps(await getApplications()); }
        catch { setError("Failed to load applications."); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchData(); }, []);

    const handleStatusChange = async (id: string, status: string) => {
        setApps(prev => prev.map(a => a.id === id ? { ...a, status } : a));
        try { await updateApplicationStatus(id, status); } catch { fetchData(); }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this application?")) return;
        setApps(prev => prev.filter(a => a.id !== id));
        try { await deleteApplication(id); } catch { fetchData(); }
    };

    const handleSaveNotes = async () => {
        if (!selected) return;
        setSavingNotes(true);
        try {
            await updateApplicationNotes(selected.id, notes);
            setApps(prev => prev.map(a => a.id === selected.id ? { ...a, notes } : a));
            setSelected(prev => prev ? { ...prev, notes } : null);
        } catch { /* ignore */ } finally { setSavingNotes(false); }
    };

    const openDetail = (app: JobApplication) => { setSelected(app); setNotes(app.notes ?? ""); };

    const filtered = apps.filter(a => {
        const matchS = filterStatus === "all" || a.status === filterStatus;
        const matchQ = !search || a.full_name.toLowerCase().includes(search.toLowerCase()) || a.email.toLowerCase().includes(search.toLowerCase());
        return matchS && matchQ;
    });

    const statCards = [
        { label: "Total Applications", value: apps.length, color: "bg-teal-500", icon: Users },
        { label: "New", value: apps.filter(a => a.status === "New").length, color: "bg-blue-500", icon: Users },
        { label: "Interviews", value: apps.filter(a => a.status === "Interview").length, color: "bg-purple-500", icon: Briefcase },
        { label: "Offers Extended", value: apps.filter(a => a.status === "Offered").length, color: "bg-green-500", icon: CheckCircle },
    ];

    return (
        <AdminLayout>
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Applications</h1>
                        <p className="text-gray-600">Review and manage all candidate applications</p>
                    </div>
                    <div className="flex space-x-3">
                        <button onClick={() => downloadCSV(apps as unknown as Record<string, unknown>[], "applications.csv")} className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                            <span>Export CSV</span>
                        </button>
                        <button onClick={fetchData} disabled={loading} className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">
                            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                        </button>
                    </div>
                </div>

                {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center space-x-2"><AlertCircle className="h-5 w-5 shrink-0" /><p className="text-sm">{error}</p></div>}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {statCards.map((s, i) => (
                        <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                            <div className={`${s.color} w-10 h-10 rounded-lg flex items-center justify-center mb-3`}><s.icon className="h-5 w-5 text-white" /></div>
                            <p className="text-2xl font-bold text-gray-900">{loading ? "—" : s.value}</p>
                            <p className="text-sm text-gray-500">{s.label}</p>
                        </div>
                    ))}
                </div>

                {/* Filters */}
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

                {/* Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">Applications {!loading && <span className="text-sm font-normal text-gray-500">({filtered.length})</span>}</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>{["Applicant", "Contact", "Job", "Status", "Applied", "Actions"].map(h => <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>)}</tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {loading ? Array.from({ length: 3 }).map((_, i) => <tr key={i}>{Array.from({ length: 6 }).map((__, j) => <td key={j} className="px-6 py-4"><div className="h-4 bg-gray-100 rounded animate-pulse" /></td>)}</tr>)
                                    : filtered.length === 0 ? <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-500 text-sm">No applications found.</td></tr>
                                        : filtered.map(app => (
                                            <tr key={app.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => openDetail(app)}>
                                                <td className="px-6 py-4"><p className="text-sm font-medium text-gray-900">{app.full_name}</p></td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center text-sm text-gray-600"><Mail className="h-3 w-3 mr-1" />{app.email}</div>
                                                    {app.phone && <div className="flex items-center text-sm text-gray-400 mt-0.5"><Phone className="h-3 w-3 mr-1" />{app.phone}</div>}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-sm font-medium text-gray-900">{app.job_postings?.title ?? "—"}</p>
                                                    <p className="text-xs text-gray-500">{app.job_postings?.department}</p>
                                                </td>
                                                <td className="px-6 py-4" onClick={e => e.stopPropagation()}>
                                                    <select value={app.status} onChange={e => handleStatusChange(app.id, e.target.value)} className={`text-xs font-semibold rounded-full px-2 py-1 border-0 cursor-pointer ${statusColors[app.status] ?? "bg-gray-100"}`}>
                                                        {STATUSES.map(s => <option key={s}>{s}</option>)}
                                                    </select>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500"><div className="flex items-center"><Clock className="h-3 w-3 mr-1" />{new Date(app.created_at).toLocaleDateString()}</div></td>
                                                <td className="px-6 py-4" onClick={e => e.stopPropagation()}>
                                                    <div className="flex space-x-2">
                                                        <button onClick={() => openDetail(app)} className="text-teal-600 hover:text-teal-900 p-1"><Eye className="h-4 w-4" /></button>
                                                        <button onClick={() => handleDelete(app.id)} className="text-red-600 hover:text-red-900 p-1"><Trash2 className="h-4 w-4" /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Detail Modal */}
            {selected && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">Application — {selected.full_name}</h3>
                            <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600"><X className="h-5 w-5" /></button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                {[["Email", selected.email], ["Phone", selected.phone], ["Job", selected.job_postings?.title], ["LinkedIn", selected.linkedin_url], ["Applied", new Date(selected.created_at).toLocaleString()]].filter(([, v]) => v).map(([l, v]) => (
                                    <div key={l as string}><label className="font-medium text-gray-600">{l}</label><p className="text-gray-900">{v}</p></div>
                                ))}
                            </div>
                            {selected.cover_letter && <div><label className="text-sm font-medium text-gray-600">Cover Letter</label><p className="text-sm text-gray-800 bg-gray-50 p-3 rounded mt-1 whitespace-pre-wrap">{selected.cover_letter}</p></div>}
                            <div>
                                <label className="text-sm font-medium text-gray-600">Internal Notes</label>
                                <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={4} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-teal-500" placeholder="Add notes…" />
                                <button onClick={handleSaveNotes} disabled={savingNotes} className="mt-2 px-4 py-2 bg-teal-600 text-white text-sm rounded-md hover:bg-teal-700 disabled:opacity-50">
                                    {savingNotes ? "Saving…" : "Save Notes"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default Applications;
