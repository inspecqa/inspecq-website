import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Eye, MousePointerClick, Send, User } from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import { getProposal, Proposal } from "../../lib/adminService";

const statusColors: Record<string, string> = {
    "Sent": "bg-blue-100 text-blue-800",
    "Opened": "bg-teal-100 text-teal-800",
    "Clicked": "bg-purple-100 text-purple-800",
    "Replied": "bg-green-100 text-green-800",
    "Expired": "bg-gray-100 text-gray-800"
};

const ProposalDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [proposal, setProposal] = useState<Proposal | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        getProposal(id).then(setProposal).catch(console.error).finally(() => setLoading(false));
    }, [id]);

    const formatTime = (ts?: string) => ts ? new Date(ts).toLocaleString() : "—";

    if (loading) return <AdminLayout><div className="flex justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div></div></AdminLayout>;

    if (!proposal) return <AdminLayout><div className="text-center py-20 text-gray-500">Proposal not found.</div></AdminLayout>;

    // Type casting because we augmented it in the query
    const leadInfo = proposal.leads as any;

    return (
        <AdminLayout>
            <div className="space-y-6 max-w-4xl mx-auto pb-12">
                <div className="flex items-center space-x-4 mb-4">
                    <Link to="/admin/proposals" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <ArrowLeft className="h-5 w-5 text-gray-600" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 line-clamp-1">{proposal.subject}</h1>
                        <p className="text-sm text-gray-500 flex items-center mt-1">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium mr-3 ${statusColors[proposal.status] || "bg-gray-100"}`}>
                                {proposal.status}
                            </span>
                            Sent on {formatTime(proposal.created_at)}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Left Column: Metrics & Lead Info */}
                    <div className="md:col-span-1 space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
                                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Recipient</h3>
                            </div>
                            <div className="p-5 space-y-4">
                                <div>
                                    <p className="text-xs text-gray-500 font-medium mb-1">Lead Name</p>
                                    <div className="flex items-center">
                                        <User className="h-4 w-4 text-gray-400 mr-2" />
                                        <p className="text-sm text-gray-900 font-medium">{leadInfo?.name || "Unknown Lead"}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-medium mb-1">Company</p>
                                    <p className="text-sm text-gray-900">{leadInfo?.company || "—"}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-medium mb-1">Sent to Email</p>
                                    <a href={`mailto:${leadInfo?.email}`} className="text-sm text-teal-600 hover:text-teal-700">{leadInfo?.email || "—"}</a>
                                </div>
                                <div className="pt-2 border-t border-gray-100">
                                    <Link to={`/admin/leads/${proposal.lead_id}`} className="text-xs font-semibold text-teal-600 hover:text-teal-700">View Lead Profile &rarr;</Link>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
                                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Tracking Timeline</h3>
                            </div>
                            <div className="p-5 space-y-5">
                                <div className="flex items-start">
                                    <div className="bg-blue-100 rounded-full p-1.5 mr-3 mt-0.5">
                                        <Send className="h-3.5 w-3.5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Email Dispatched</p>
                                        <p className="text-xs text-gray-500 mt-0.5 flex items-center"><Clock className="h-3 w-3 mr-1" /> {formatTime(proposal.created_at)}</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className={`rounded-full p-1.5 mr-3 mt-0.5 ${proposal.opened_at ? "bg-teal-100" : "bg-gray-100"}`}>
                                        <Eye className={`h-3.5 w-3.5 ${proposal.opened_at ? "text-teal-600" : "text-gray-400"}`} />
                                    </div>
                                    <div>
                                        <p className={`text-sm font-medium ${proposal.opened_at ? "text-gray-900" : "text-gray-500"}`}>Email Opened</p>
                                        <p className="text-xs text-gray-500 mt-0.5">{proposal.opened_at ? <span className="flex items-center"><Clock className="h-3 w-3 mr-1" /> {formatTime(proposal.opened_at)}</span> : "Not opened yet"}</p>
                                    </div>
                                </div>
                                <div className="flex items-start relative">
                                    <div className={`rounded-full p-1.5 mr-3 mt-0.5 ${proposal.clicked_at ? "bg-purple-100" : "bg-gray-100"}`}>
                                        <MousePointerClick className={`h-3.5 w-3.5 ${proposal.clicked_at ? "text-purple-600" : "text-gray-400"}`} />
                                    </div>
                                    <div>
                                        <p className={`text-sm font-medium ${proposal.clicked_at ? "text-gray-900" : "text-gray-500"}`}>Link Clicked</p>
                                        <p className="text-xs text-gray-500 mt-0.5">{proposal.clicked_at ? <span className="flex items-center"><Clock className="h-3 w-3 mr-1" /> {formatTime(proposal.clicked_at)}</span> : "No links clicked"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Email Content preview */}
                    <div className="md:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-full flex flex-col">
                            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Exact Sent Copy</h3>
                            </div>
                            <div className="p-6 flex-1 overflow-y-auto bg-white">
                                <div
                                    className="prose prose-sm max-w-none text-gray-800 break-words"
                                    dangerouslySetInnerHTML={{ __html: proposal.body }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default ProposalDetail;
