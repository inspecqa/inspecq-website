import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Megaphone, Trash2 } from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import { getColdCampaigns, deleteColdCampaign, ColdEmailCampaign } from "../../lib/adminService";

const ColdCampaignsList = () => {
    const [campaigns, setCampaigns] = useState<ColdEmailCampaign[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchCampaigns = async () => {
        setLoading(true);
        try {
            const data = await getColdCampaigns();
            setCampaigns(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCampaigns();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this campaign? This will also delete all associated email tracking data.")) return;
        const original = [...campaigns];
        setCampaigns(prev => prev.filter(c => c.id !== id));
        try {
            await deleteColdCampaign(id);
        } catch (err) {
            console.error(err);
            setCampaigns(original);
            alert("Failed to delete campaign.");
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-6 pb-12">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Cold Email Campaigns</h1>
                        <p className="text-gray-600">Blast automated outreach emails to specific lead segments.</p>
                    </div>
                    <div className="flex space-x-3">
                        <Link to="/admin/cold-emails/templates" className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition shadow-sm">
                            <span>Manage Templates</span>
                        </Link>
                        <Link to="/admin/cold-emails/new" className="flex items-center space-x-2 px-4 py-2 bg-teal-600 rounded-lg text-sm font-medium text-white hover:bg-teal-700 transition shadow-sm">
                            <Plus className="h-4 w-4" /><span>New Campaign</span>
                        </Link>
                    </div>
                </div>

                {loading ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-64 animate-pulse"></div>
                ) : campaigns.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 py-24 text-center">
                        <Megaphone className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-900">No campaigns yet</h3>
                        <p className="text-gray-500 mt-2 max-w-sm mx-auto">Create a campaign to send mass emails using your outreach templates.</p>
                        <Link to="/admin/cold-emails/new" className="mt-6 inline-flex items-center px-4 py-2 bg-teal-600 rounded-lg text-sm font-medium text-white hover:bg-teal-700 transition shadow-sm">
                            <Plus className="h-4 w-4 mr-1" /> Create Campaign
                        </Link>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Campaign Name</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Template</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Sent</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Opens</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Created</th>
                                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {campaigns.map(campaign => (
                                        <tr key={campaign.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-medium text-gray-900">{campaign.name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {campaign.cold_email_templates?.name || <span className="text-gray-400 italic">Deleted Template</span>}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                    ${campaign.status === "Completed" ? "bg-green-100 text-green-800"
                                                        : campaign.status === "Sending" ? "bg-blue-100 text-blue-800"
                                                            : "bg-gray-100 text-gray-800"}`}>
                                                    {campaign.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">
                                                {campaign.sent_count}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                {campaign.sent_count > 0 ? (
                                                    <div className="flex items-center">
                                                        <span className="font-medium text-gray-900 mr-2">{campaign.open_count}</span>
                                                        <span className="text-xs text-gray-400">({Math.round((campaign.open_count / campaign.sent_count) * 100)}%)</span>
                                                    </div>
                                                ) : <span className="text-gray-400">0</span>}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(campaign.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                {campaign.status === "Draft" && (
                                                    <Link to={`/admin/cold-emails/${campaign.id}/edit`} className="text-teal-600 hover:text-teal-900 mr-4">
                                                        Edit
                                                    </Link>
                                                )}
                                                <button onClick={() => handleDelete(campaign.id)} className="text-red-500 hover:text-red-700 transition">
                                                    <Trash2 className="h-4 w-4 inline" />
                                                </button>
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

export default ColdCampaignsList;
