import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Users,
  Send,
  Plus,
  Trash2,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  getSubscribers,
  getCampaigns,
  deleteSubscriber,
  deleteCampaign,
  updateSubscriberStatus,
  NewsletterSubscriber,
  NewsletterCampaign,
} from "../../lib/adminService";

const Newsletter = () => {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [campaigns, setCampaigns] = useState<NewsletterCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"subscribers" | "campaigns">("subscribers");

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [subs, camps] = await Promise.all([getSubscribers(), getCampaigns()]);
      setSubscribers(subs);
      setCampaigns(camps);
    } catch (err) {
      setError("Failed to load newsletter data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleDeleteSubscriber = async (id: string) => {
    if (!window.confirm("Remove this subscriber?")) return;
    setSubscribers((prev) => prev.filter((s) => s.id !== id));
    try { await deleteSubscriber(id); } catch { fetchData(); }
  };

  const handleToggleSubscriber = async (sub: NewsletterSubscriber) => {
    const newStatus = sub.status === "Active" ? "Unsubscribed" : "Active";
    setSubscribers((prev) => prev.map((s) => s.id === sub.id ? { ...s, status: newStatus } : s));
    try { await updateSubscriberStatus(sub.id, newStatus); } catch { fetchData(); }
  };

  const handleDeleteCampaign = async (id: string) => {
    if (!window.confirm("Delete this campaign?")) return;
    setCampaigns((prev) => prev.filter((c) => c.id !== id));
    try { await deleteCampaign(id); } catch { fetchData(); }
  };

  const active = subscribers.filter((s) => s.status === "Active").length;
  const total = subscribers.length;
  const sentCampaigns = campaigns.filter((c) => c.status === "Sent").length;
  const totalOpens = campaigns.reduce((sum, c) => sum + (c.opens ?? 0), 0);
  const totalClicks = campaigns.reduce((sum, c) => sum + (c.clicks ?? 0), 0);

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Newsletter</h1>
            <p className="text-gray-600">Manage subscribers and email campaigns</p>
          </div>
          <div className="flex items-center space-x-3">
            <button onClick={fetchData} disabled={loading} className="p-2 text-gray-500 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            <Link to="/admin/newsletter/compose" className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>Compose Newsletter</span>
            </Link>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: "Total Subscribers", value: total, icon: Users, color: "bg-teal-500" },
            { label: "Active Subscribers", value: active, icon: CheckCircle, color: "bg-green-500" },
            { label: "Sent Campaigns", value: sentCampaigns, icon: Send, color: "bg-blue-500" },
            { label: "Total Opens", value: totalOpens, icon: TrendingUp, color: "bg-purple-500" },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className={`${s.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                <s.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {loading ? <span className="inline-block w-8 h-6 bg-gray-200 rounded animate-pulse" /> : s.value}
              </h3>
              <p className="text-sm text-gray-600">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200 flex">
            {(["subscribers", "campaigns"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 text-sm font-medium capitalize transition-colors ${activeTab === tab
                    ? "text-teal-600 border-b-2 border-teal-600 bg-teal-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
              >
                {tab === "subscribers" ? `Subscribers (${total})` : `Campaigns (${campaigns.length})`}
              </button>
            ))}
          </div>

          {/* Subscribers table */}
          {activeTab === "subscribers" && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {["Email", "Name", "Status", "Joined", "Actions"].map((h) => (
                      <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {loading
                    ? Array.from({ length: 4 }).map((_, i) => (
                      <tr key={i}>
                        {Array.from({ length: 5 }).map((__, j) => (
                          <td key={j} className="px-6 py-4">
                            <div className="h-4 bg-gray-100 rounded animate-pulse" />
                          </td>
                        ))}
                      </tr>
                    ))
                    : subscribers.length === 0
                      ? (
                        <tr>
                          <td colSpan={5} className="px-6 py-12 text-center text-gray-500 text-sm">
                            No subscribers yet.
                          </td>
                        </tr>
                      )
                      : subscribers.map((sub) => (
                        <tr key={sub.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{sub.email}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">{sub.name ?? "—"}</td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => handleToggleSubscriber(sub)}
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${sub.status === "Active"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-600"
                                }`}
                            >
                              {sub.status}
                            </button>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {new Date(sub.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4">
                            <button onClick={() => handleDeleteSubscriber(sub.id)} className="text-red-500 hover:text-red-700 p-1">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Campaigns table */}
          {activeTab === "campaigns" && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {["Subject", "Status", "Recipients", "Opens", "Clicks", "Sent At", "Actions"].map((h) => (
                      <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {loading
                    ? Array.from({ length: 3 }).map((_, i) => (
                      <tr key={i}>
                        {Array.from({ length: 7 }).map((__, j) => (
                          <td key={j} className="px-6 py-4">
                            <div className="h-4 bg-gray-100 rounded animate-pulse" />
                          </td>
                        ))}
                      </tr>
                    ))
                    : campaigns.length === 0
                      ? (
                        <tr>
                          <td colSpan={7} className="px-6 py-12 text-center">
                            <p className="text-gray-500 text-sm mb-4">No campaigns yet.</p>
                            <Link to="/admin/newsletter/compose" className="inline-flex items-center space-x-2 bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-700">
                              <Mail className="h-4 w-4" />
                              <span>Create your first campaign</span>
                            </Link>
                          </td>
                        </tr>
                      )
                      : campaigns.map((c) => (
                        <tr key={c.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900 max-w-xs truncate">{c.subject}</div>
                            {c.preview_text && <div className="text-xs text-gray-400 truncate">{c.preview_text}</div>}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${c.status === "Sent" ? "bg-green-100 text-green-800"
                                : c.status === "Scheduled" ? "bg-blue-100 text-blue-800"
                                  : "bg-gray-100 text-gray-600"
                              }`}>
                              {c.status === "Scheduled" && <Clock className="h-3 w-3 mr-1" />}
                              {c.status === "Sent" && <CheckCircle className="h-3 w-3 mr-1" />}
                              {c.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">{c.recipients}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{c.opens}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{c.clicks}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {c.sent_at ? new Date(c.sent_at).toLocaleDateString() : c.schedule_date ?? "—"}
                          </td>
                          <td className="px-6 py-4">
                            <button onClick={() => handleDeleteCampaign(c.id)} className="text-red-500 hover:text-red-700 p-1">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Newsletter;
