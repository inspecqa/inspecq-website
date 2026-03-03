import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Send, RefreshCw, Eye, Trash2, User } from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import { getProposals, deleteProposal, getLeads, Proposal, Lead } from "../../lib/adminService";

const STATUSES = ["Sent", "Opened", "Clicked", "Replied", "Expired"];

const statusColors: Record<string, string> = {
    "Sent": "bg-blue-100 text-blue-800",
    "Opened": "bg-teal-100 text-teal-800",
    "Clicked": "bg-purple-100 text-purple-800",
    "Replied": "bg-green-100 text-green-800",
    "Expired": "bg-gray-100 text-gray-800"
};

const ProposalsList = () => {
    const [proposals, setProposals] = useState<Proposal[]>([]);
    const [leadsMap, setLeadsMap] = useState<Record<string, Lead>>({});
    const [loading, setLoading] = useState(true);

    const [filterStatus, setFilterStatus] = useState("all");

    const fetchProposalsAndLeads = async () => {
        setLoading(true);
        try {
            const [pData, lData] = await Promise.all([
                getProposals(),
                getLeads()
            ]);
            setProposals(pData);

            const lMap: Record<string, Lead> = {};
            lData.forEach(l => { lMap[l.id] = l; });
            setLeadsMap(lMap);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProposalsAndLeads();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this proposal record? The email has already been sent.")) return;
        const original = [...proposals];
        setProposals(prev => prev.filter(p => p.id !== id));
        try {
            await deleteProposal(id);
        } catch {
            setProposals(original);
            alert("Failed to delete proposal record.");
        }
    };

    const filteredProposals = filterStatus === "all"
        ? proposals
        : proposals.filter(p => p.status === filterStatus);

    return (
        <AdminLayout>
            <div className="space-y-6 pb-12">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Proposals Sent</h1>
                        <p className="text-gray-600">Track sent emails, opens, and clicks.</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <Link to="/admin/proposals/new" className="flex items-center space-x-2 px-4 py-2 bg-teal-600 rounded-lg text-sm font-medium text-white hover:bg-teal-700 transition shadow-sm">
                            <Plus className="h-4 w-4" /><span>New Proposal</span>
                        </Link>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                    <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none">
                        <option value="all">All Statuses</option>
                        {STATUSES.map(s => <option key={s}>{s}</option>)}
                    </select>
                </div>

                {loading ? (
                    <div className="text-center py-20"><RefreshCw className="h-8 w-8 animate-spin mx-auto text-teal-600" /></div>
                ) : filteredProposals.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 py-20 text-center">
                        <Send className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">No proposals sent yet</h3>
                        <p className="text-gray-500 mt-1 max-w-md mx-auto">Draft and send your first proposal using a template.</p>
                        <Link to="/admin/proposals/new" className="mt-6 inline-flex items-center text-teal-600 hover:text-teal-700 font-medium">
                            <Plus className="h-4 w-4 mr-1" /> Send Proposal
                        </Link>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <th className="px-6 py-4">Subject</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Lead</th>
                                        <th className="px-6 py-4">Sent At</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredProposals.map(p => (
                                        <tr key={p.id} className="hover:bg-gray-50 group transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-semibold text-gray-900 line-clamp-1">{p.subject}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[p.status] || "bg-gray-100"}`}>
                                                    {p.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center text-sm text-gray-700">
                                                    <User className="h-4 w-4 mr-1.5 text-gray-400" />
                                                    {leadsMap[p.lead_id]?.name || "Unknown Lead"}
                                                </div>
                                                <div className="text-xs text-gray-400 mt-0.5 ml-5.5">{leadsMap[p.lead_id]?.company}</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {new Date(p.created_at).toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Link to={`/admin/proposals/${p.id}`} className="p-1.5 text-gray-400 hover:text-teal-600 rounded bg-white hover:bg-teal-50 shadow-sm border border-gray-200"><Eye className="h-4 w-4" /></Link>
                                                    <button onClick={() => handleDelete(p.id)} className="p-1.5 text-gray-400 hover:text-red-600 rounded bg-white hover:bg-red-50 shadow-sm border border-gray-200"><Trash2 className="h-4 w-4" /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default ProposalsList;
