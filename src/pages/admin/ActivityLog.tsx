import React, { useEffect, useState } from "react";
import { RefreshCw, AlertCircle, Activity, Search } from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import { getActivityLog, ActivityLogEntry } from "../../lib/adminService";

const entityColors: Record<string, string> = {
    job: "bg-blue-100 text-blue-700",
    application: "bg-purple-100 text-purple-700",
    submission: "bg-green-100 text-green-700",
    campaign: "bg-orange-100 text-orange-700",
    subscriber: "bg-teal-100 text-teal-700",
    blog: "bg-yellow-100 text-yellow-700",
    settings: "bg-gray-100 text-gray-700",
    trial: "bg-pink-100 text-pink-700",
};

const ActivityLog = () => {
    const [log, setLog] = useState<ActivityLogEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState("all");

    const fetchData = async () => {
        setLoading(true); setError(null);
        try { setLog(await getActivityLog(200)); }
        catch { setError("Failed to load activity log."); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchData(); }, []);

    const entityTypes = ["all", ...Array.from(new Set(log.map(e => e.entity_type)))];

    const filtered = log.filter(e => {
        const matchType = filterType === "all" || e.entity_type === filterType;
        const matchQ = !search || e.action.toLowerCase().includes(search.toLowerCase()) || (e.details ?? "").toLowerCase().includes(search.toLowerCase());
        return matchType && matchQ;
    });

    const formatTime = (iso: string) => {
        const d = new Date(iso);
        return d.toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
    };

    return (
        <AdminLayout>
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Activity Log</h1>
                        <p className="text-gray-600">Audit trail of all admin actions</p>
                    </div>
                    <button onClick={fetchData} disabled={loading} className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">
                        <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                    </button>
                </div>

                {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center space-x-2"><AlertCircle className="h-5 w-5" /><p className="text-sm">{error}</p></div>}

                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex flex-col md:flex-row gap-3">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search actions…" className="pl-9 w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-teal-500" />
                    </div>
                    <select value={filterType} onChange={e => setFilterType(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-teal-500">
                        {entityTypes.map(t => <option key={t} value={t}>{t === "all" ? "All Types" : t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                    </select>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">Events {!loading && <span className="text-sm font-normal text-gray-500">({filtered.length})</span>}</h2>
                    </div>

                    {loading ? (
                        <div className="p-6 space-y-3">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-12 bg-gray-100 rounded animate-pulse" />)}</div>
                    ) : filtered.length === 0 ? (
                        <div className="p-12 text-center">
                            <Activity className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 text-sm">No activity recorded yet.</p>
                            <p className="text-gray-400 text-xs mt-1">Actions like creating jobs or changing statuses will be logged here.</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {filtered.map(entry => (
                                <div key={entry.id} className="px-6 py-4 flex items-start space-x-4 hover:bg-gray-50">
                                    <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center space-x-2 flex-wrap">
                                            <p className="text-sm font-medium text-gray-900">{entry.action}</p>
                                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${entityColors[entry.entity_type] ?? "bg-gray-100 text-gray-600"}`}>{entry.entity_type}</span>
                                        </div>
                                        {entry.details && <p className="text-sm text-gray-500 truncate mt-0.5">{entry.details}</p>}
                                        <div className="flex items-center space-x-3 mt-1 text-xs text-gray-400">
                                            <span>{formatTime(entry.created_at)}</span>
                                            {entry.user_email && <span>by {entry.user_email}</span>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default ActivityLog;
