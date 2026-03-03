import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Users, Plus, Download, RefreshCw, Search, UploadCloud,
    LayoutGrid, List, AlertCircle, Eye, Trash2, Clock, Check
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
    getLeads, updateLead, deleteLead, downloadCSV, Lead, importLeadsFromForms, importLeadsFromTrials
} from "../../lib/adminService";

const STATUSES = ["New", "Contacted", "Proposal Sent", "Negotiating", "Won", "Lost"];
const PRIORITIES = ["High", "Medium", "Low"];

const statusColors: Record<string, string> = {
    "New": "bg-blue-100 text-blue-800",
    "Contacted": "bg-yellow-100 text-yellow-800",
    "Proposal Sent": "bg-purple-100 text-purple-800",
    "Negotiating": "bg-orange-100 text-orange-800",
    "Won": "bg-green-100 text-green-800",
    "Lost": "bg-gray-100 text-gray-800"
};

const priorityColors: Record<string, string> = {
    "High": "bg-red-100 text-red-800 border-red-200",
    "Medium": "bg-orange-100 text-orange-800 border-orange-200",
    "Low": "bg-blue-100 text-blue-800 border-blue-200"
};

const LeadsList = () => {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<"table" | "kanban">("table");
    const [showImport, setShowImport] = useState(false);
    const [importing, setImporting] = useState(false);

    // Filters
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [filterPriority, setFilterPriority] = useState("all");

    const fetchData = async () => {
        setLoading(true); setError(null);
        try {
            setLeads(await getLeads());
        } catch (err: any) {
            setError(err.message || "Failed to load leads.");
        } finally {
            setLoading(false);
        }
    };

    const handleAutoImport = async (type: "forms" | "trials") => {
        setImporting(true);
        setError(null);
        try {
            const count = type === "forms" ? await importLeadsFromForms() : await importLeadsFromTrials();
            alert(`Successfully imported ${count} leads!`);
            setShowImport(false);
            fetchData();
        } catch (err: any) {
            setError(err.message || "Failed to import leads.");
        } finally {
            setImporting(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleStatusChange = async (id: string, status: string) => {
        const original = [...leads];
        setLeads(prev => prev.map(l => l.id === id ? { ...l, status: status as any } : l));
        try {
            await updateLead(id, { status: status as any });
        } catch {
            setLeads(original);
            alert("Failed to update status");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this lead?")) return;
        setLeads(prev => prev.filter(l => l.id !== id));
        try {
            await deleteLead(id);
        } catch {
            fetchData();
        }
    };

    // Filter Logic
    const filteredLeads = leads.filter(l => {
        const matchQ = !search ||
            l.name.toLowerCase().includes(search.toLowerCase()) ||
            l.email.toLowerCase().includes(search.toLowerCase()) ||
            (l.company && l.company.toLowerCase().includes(search.toLowerCase()));

        const matchS = filterStatus === "all" || l.status === filterStatus;
        const matchP = filterPriority === "all" || l.priority === filterPriority;

        return matchQ && matchS && matchP;
    });

    // Drag and Drop Handlers for Kanban
    const handleDragStart = (e: React.DragEvent, id: string) => {
        e.dataTransfer.setData("leadId", id);
        // Optional: change appearance while dragging
        requestAnimationFrame(() => {
            (e.target as HTMLElement).style.opacity = '0.5';
        });
    };

    const handleDragEnd = (e: React.DragEvent) => {
        (e.target as HTMLElement).style.opacity = '1';
    };

    const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); };

    const handleDrop = (e: React.DragEvent, newStatus: string) => {
        e.preventDefault();
        const leadId = e.dataTransfer.getData("leadId");
        if (leadId) {
            handleStatusChange(leadId, newStatus);
        }
    };

    const stats = [
        { label: "Total Leads", value: leads.length, color: "bg-teal-500" },
        { label: "New", value: leads.filter(l => l.status === "New").length, color: "bg-blue-500" },
        { label: "Negotiating", value: leads.filter(l => l.status === "Negotiating").length, color: "bg-orange-500" },
        { label: "Won", value: leads.filter(l => l.status === "Won").length, color: "bg-green-500" },
    ];

    return (
        <AdminLayout>
            <div className="space-y-8 pb-12">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Leads Pipeline</h1>
                        <p className="text-gray-600">Manage contacts, track proposals, and close deals</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex bg-gray-100 rounded-lg p-1 border border-gray-200">
                            <button onClick={() => setViewMode("table")} className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center space-x-2 transition-colors ${viewMode === "table" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                                <List className="h-4 w-4" /><span>Table</span>
                            </button>
                            <button onClick={() => setViewMode("kanban")} className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center space-x-2 transition-colors ${viewMode === "kanban" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                                <LayoutGrid className="h-4 w-4" /><span>Kanban</span>
                            </button>
                        </div>
                        <button onClick={() => setShowImport(true)} className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                            <UploadCloud className="h-4 w-4" /><span>Import</span>
                        </button>
                        <button onClick={() => downloadCSV(filteredLeads as any, "leads_export.csv")} className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                            <Download className="h-4 w-4" /><span>Export</span>
                        </button>
                        <Link to="/admin/leads/new" className="flex items-center space-x-2 px-4 py-2 bg-teal-600 rounded-lg text-sm font-medium text-white hover:bg-teal-700 transition">
                            <Plus className="h-4 w-4" /><span>New Lead</span>
                        </Link>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center justify-between">
                        <div className="flex items-center space-x-2"><AlertCircle className="h-5 w-5" /><p className="text-sm">{error}</p></div>
                        <button onClick={fetchData} className="text-sm font-medium underline">Retry</button>
                    </div>
                )}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((s, i) => (
                        <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 flex items-center space-x-4">
                            <div className={`${s.color} w-12 h-12 rounded-lg flex items-center justify-center shrink-0`}>
                                <Users className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">{s.label}</p>
                                <p className="text-2xl font-bold text-gray-900">{loading ? "—" : s.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Filters Bar */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex flex-col md:flex-row gap-3">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name, email, or company…" className="pl-9 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                    </div>
                    <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none">
                        <option value="all">All Statuses</option>
                        {STATUSES.map(s => <option key={s}>{s}</option>)}
                    </select>
                    <select value={filterPriority} onChange={e => setFilterPriority(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none">
                        <option value="all">All Priorities</option>
                        {PRIORITIES.map(p => <option key={p}>{p}</option>)}
                    </select>
                </div>

                {/* View Render */}
                {loading ? (
                    <div className="text-center py-20"><RefreshCw className="h-8 w-8 animate-spin mx-auto text-teal-600" /></div>
                ) : filteredLeads.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 py-16 text-center">
                        <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">No leads found</h3>
                        <p className="text-gray-500 mt-1">Adjust your filters or add a new lead to get started.</p>
                        <Link to="/admin/leads/new" className="inline-flex items-center space-x-2 mt-4 text-teal-600 hover:text-teal-700 font-medium">
                            <Plus className="h-4 w-4" /><span>Add First Lead</span>
                        </Link>
                    </div>
                ) : viewMode === "table" ? (
                    /* Table View */
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <th className="px-6 py-4">Lead Info</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Priority</th>
                                        <th className="px-6 py-4">Channel / Industry</th>
                                        <th className="px-6 py-4">Added</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredLeads.map(l => (
                                        <tr key={l.id} className="hover:bg-gray-50 group">
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-gray-900">{l.name}</span>
                                                    <span className="text-sm text-gray-500">{l.email}</span>
                                                    {l.company && <span className="text-xs text-gray-400 mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]">🏢 {l.company}</span>}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <select value={l.status} onChange={e => handleStatusChange(l.id, e.target.value)} className={`text-xs font-semibold rounded-full px-2.5 py-1 cursor-pointer border-0 outline-none ${statusColors[l.status] || "bg-gray-100"}`}>
                                                    {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                                                </select>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`text-xs font-semibold px-2 py-1 rounded-md border ${priorityColors[l.priority] || "bg-gray-100"}`}>
                                                    {l.priority}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col text-sm text-gray-600">
                                                    <span>{l.channel}</span>
                                                    <span className="text-xs text-gray-400">{l.industry}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {new Date(l.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end space-x-2">
                                                    <Link to={`/admin/leads/${l.id}`} className="p-1.5 text-gray-400 hover:text-teal-600 rounded bg-white hover:bg-teal-50"><Eye className="h-4 w-4" /></Link>
                                                    <button onClick={() => handleDelete(l.id)} className="p-1.5 text-gray-400 hover:text-red-600 rounded bg-white hover:bg-red-50"><Trash2 className="h-4 w-4" /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    /* Kanban View */
                    <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
                        {STATUSES.map(statusCol => {
                            const columnLeads = filteredLeads.filter(l => l.status === statusCol);
                            return (
                                <div
                                    key={statusCol}
                                    className="flex-shrink-0 w-80 bg-gray-50/50 rounded-xl rounded-t-lg border border-gray-200 flex flex-col h-[calc(100vh-280px)] min-h-[500px] snap-center"
                                    onDragOver={handleDragOver}
                                    onDrop={(e) => handleDrop(e, statusCol)}
                                >
                                    {/* Column Header */}
                                    <div className={`p-3 border-b-2 bg-white rounded-t-xl shrink-0 flex items-center justify-between shadow-sm
                                        ${statusCol === "Won" ? "border-green-400" : statusCol === "Lost" ? "border-gray-400" : "border-teal-400"}`}>
                                        <h3 className="font-semibold text-gray-800">{statusCol}</h3>
                                        <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded-full">{columnLeads.length}</span>
                                    </div>

                                    {/* Column Body */}
                                    <div className="p-3 flex-1 overflow-y-auto space-y-3">
                                        {columnLeads.map(l => (
                                            <div
                                                key={l.id}
                                                draggable
                                                onDragStart={(e) => handleDragStart(e, l.id)}
                                                onDragEnd={handleDragEnd}
                                                className="bg-white p-3.5 rounded-lg shadow-sm border border-gray-200 cursor-grab active:cursor-grabbing hover:border-teal-300 hover:shadow-md transition-all group"
                                            >
                                                <div className="flex justify-between items-start mb-2">
                                                    <Link to={`/admin/leads/${l.id}`} className="font-semibold text-gray-900 leading-tight group-hover:text-teal-700">
                                                        {l.name}
                                                    </Link>
                                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider border ${priorityColors[l.priority] || "bg-gray-100"}`}>
                                                        {l.priority}
                                                    </span>
                                                </div>
                                                {l.company && <p className="text-xs text-gray-500 mb-2 truncate">🏢 {l.company}</p>}
                                                <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-gray-100 mt-2">
                                                    <span className="flex items-center"><Clock className="h-3 w-3 mr-1" /> {new Date(l.created_at).toLocaleDateString()}</span>
                                                    <span>{l.channel}</span>
                                                </div>
                                            </div>
                                        ))}
                                        {columnLeads.length === 0 && (
                                            <div className="h-full flex items-center justify-center p-4 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50/50">
                                                <span className="text-sm text-gray-400 text-center">Drop leads here</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Import Modal */}
            {showImport && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-lg w-full shadow-2xl overflow-hidden text-left">
                        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center"><UploadCloud className="h-5 w-5 mr-2 text-teal-600" /> Import Leads</h3>
                            <button onClick={() => setShowImport(false)} className="text-gray-400 hover:text-gray-600 font-bold">&times;</button>
                        </div>
                        <div className="p-6 space-y-6">

                            <div>
                                <h4 className="font-semibold text-gray-900 mb-2 border-b pb-1">1. Auto-Import from Existing Data</h4>
                                <p className="text-sm text-gray-500 mb-3">Sync submissions from your public website directly into the CRM.</p>
                                <div className="space-y-2">
                                    <button
                                        onClick={() => handleAutoImport("forms")}
                                        disabled={importing}
                                        className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition text-sm font-medium disabled:opacity-50 text-gray-700"
                                    >
                                        <span className="flex items-center"><Check className="h-4 w-4 mr-2 text-teal-600" /> Import Contact Submissions</span>
                                        <span className="text-teal-600">Run sync &rarr;</span>
                                    </button>
                                    <button
                                        onClick={() => handleAutoImport("trials")}
                                        disabled={importing}
                                        className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition text-sm font-medium disabled:opacity-50 text-gray-700"
                                    >
                                        <span className="flex items-center"><Check className="h-4 w-4 mr-2 text-teal-600" /> Import Trial Requests</span>
                                        <span className="text-teal-600">Run sync &rarr;</span>
                                    </button>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-semibold text-gray-900 mb-2 border-b pb-1">2. Upload CSV</h4>
                                <p className="text-sm text-gray-500 mb-3">Upload a standard CSV file. Ensure columns include <code className="bg-gray-100 px-1 rounded">name</code>, <code className="bg-gray-100 px-1 rounded">email</code>, and <code className="bg-gray-100 px-1 rounded">company</code>.</p>
                                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
                                    <UploadCloud className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                    <p className="text-sm font-medium text-gray-700">Click to upload CSV</p>
                                    <p className="text-xs text-gray-500 mt-1">Coming soon...</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default LeadsList;
