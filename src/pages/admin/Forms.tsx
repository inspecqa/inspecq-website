import React, { useEffect, useState } from "react";
import {
  Mail,
  User,
  Calendar,
  Eye,
  Trash2,
  CheckCircle,
  AlertCircle,
  Clock,
  RefreshCw,
  X,
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  getSubmissions,
  updateSubmissionStatus,
  deleteSubmission,
  ContactSubmission,
} from "../../lib/adminService";
import { ElementType } from "react";

const statusColors: Record<string, string> = {
  New: "bg-blue-100 text-blue-800",
  Contacted: "bg-yellow-100 text-yellow-800",
  "Under Review": "bg-purple-100 text-purple-800",
  Converted: "bg-green-100 text-green-800",
  Subscribed: "bg-teal-100 text-teal-800",
  Closed: "bg-gray-100 text-gray-800",
};

const typeIcons: Record<string, ElementType> = {
  "Contact Form": User,
  "Demo Request": Calendar,
  "Free Trial": CheckCircle,
  "Newsletter Signup": Mail,
  "Career Application": User,
};

const formTypes = ["all", "Contact Form", "Demo Request", "Free Trial", "Newsletter Signup", "Career Application"];
const statusTypes = ["all", "New", "Contacted", "Under Review", "Converted", "Subscribed", "Closed"];

const Forms = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      setSubmissions(await getSubmissions());
    } catch (err) {
      setError("Failed to load submissions.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
    );
    try {
      await updateSubmissionStatus(id, newStatus);
    } catch (err) {
      console.error("Status update failed:", err);
      fetchData(); // revert on failure
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this submission permanently?")) return;
    setSubmissions((prev) => prev.filter((s) => s.id !== id));
    try {
      await deleteSubmission(id);
    } catch (err) {
      console.error("Delete failed:", err);
      fetchData();
    }
  };

  const filtered = submissions.filter((s) => {
    const matchStatus = filterStatus === "all" || s.status === filterStatus;
    const matchType = filterType === "all" || (s.type ?? "Contact Form") === filterType;
    return matchStatus && matchType;
  });

  const statCards = [
    {
      title: "Total Submissions",
      value: submissions.length,
      icon: Mail,
      color: "bg-blue-500",
      sub: "All time",
    },
    {
      title: "New",
      value: submissions.filter((s) => s.status === "New").length,
      icon: AlertCircle,
      color: "bg-orange-500",
      sub: "Pending review",
    },
    {
      title: "Contact Forms",
      value: submissions.filter((s) => !s.type || s.type === "Contact Form").length,
      icon: User,
      color: "bg-teal-500",
      sub: "Inquiries",
    },
    {
      title: "Demo Requests",
      value: submissions.filter((s) => s.type === "Demo Request").length,
      icon: Calendar,
      color: "bg-purple-500",
      sub: "Scheduled",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Form Management</h1>
            <p className="text-gray-600">Manage all form submissions and inquiries</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg flex items-center space-x-2 text-sm">
              <CheckCircle className="h-4 w-4" />
              <span className="font-medium">Live from Supabase</span>
            </div>
            <button onClick={fetchData} disabled={loading} className="p-2 text-gray-500 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </button>
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
          {statCards.map((s, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className={`${s.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                <s.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {loading ? <span className="inline-block w-8 h-6 bg-gray-200 rounded animate-pulse" /> : s.value}
              </h3>
              <p className="text-sm text-gray-600 mb-1">{s.title}</p>
              <p className="text-xs text-teal-600 font-medium">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Type</label>
              <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                {formTypes.map((t) => <option key={t} value={t}>{t === "all" ? "All Types" : t}</option>)}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                {statusTypes.map((s) => <option key={s} value={s}>{s === "all" ? "All Statuses" : s}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Form Submissions
              {!loading && <span className="ml-2 text-sm text-gray-500 font-normal">({filtered.length} results)</span>}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {["Submission Details", "Contact Info", "Type", "Status", "Source", "Actions"].map((h) => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading
                  ? Array.from({ length: 4 }).map((_, i) => (
                    <tr key={i}>
                      {Array.from({ length: 6 }).map((__, j) => (
                        <td key={j} className="px-6 py-4">
                          <div className="h-4 bg-gray-100 rounded animate-pulse" />
                        </td>
                      ))}
                    </tr>
                  ))
                  : filtered.length === 0
                    ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-gray-500 text-sm">
                          No submissions match your filters.
                        </td>
                      </tr>
                    )
                    : filtered.map((s) => {
                      const TypeIcon = typeIcons[s.type ?? "Contact Form"] ?? Mail;
                      return (
                        <tr key={s.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{s.full_name}</div>
                            <div className="text-sm text-gray-500">{s.company_name ?? "—"}</div>
                            <div className="text-xs text-gray-400 flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {new Date(s.created_at).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{s.email}</div>
                            {s.service_interest && (
                              <div className="text-sm text-gray-500">Interest: {s.service_interest}</div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <TypeIcon className="h-4 w-4 text-gray-400 mr-2" />
                              <span className="text-sm text-gray-900">{s.type ?? "Contact Form"}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <select
                              value={s.status}
                              onChange={(e) => handleStatusChange(s.id, e.target.value)}
                              className={`text-xs font-semibold rounded-full px-2 py-1 border-0 cursor-pointer ${statusColors[s.status] ?? "bg-gray-100 text-gray-800"}`}
                            >
                              {statusTypes.filter((x) => x !== "all").map((st) => (
                                <option key={st} value={st}>{st}</option>
                              ))}
                            </select>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.source_page ?? "—"}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button onClick={() => setSelectedSubmission(s)} className="text-teal-600 hover:text-teal-900 p-1" title="View">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button onClick={() => handleDelete(s.id)} className="text-red-600 hover:text-red-900 p-1" title="Delete">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail Modal */}
        {selectedSubmission && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Submission Details</h3>
                <button onClick={() => setSelectedSubmission(null)} className="text-gray-400 hover:text-gray-600 p-1">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Name", value: selectedSubmission.full_name },
                    { label: "Email", value: selectedSubmission.email },
                    { label: "Type", value: selectedSubmission.type ?? "Contact Form" },
                    { label: "Status", value: selectedSubmission.status },
                    { label: "Company", value: selectedSubmission.company_name },
                    { label: "Source", value: selectedSubmission.source_page },
                    { label: "Submitted", value: new Date(selectedSubmission.created_at).toLocaleString() },
                    { label: "Service Interest", value: selectedSubmission.service_interest },
                  ].filter((f) => f.value).map((field) => (
                    <div key={field.label}>
                      <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                      <p className="text-sm text-gray-900 mt-1">{field.value}</p>
                    </div>
                  ))}
                </div>
                {selectedSubmission.message && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Message</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md mt-1">{selectedSubmission.message}</p>
                  </div>
                )}
              </div>
              <div className="p-6 border-t border-gray-200 flex justify-end">
                <button onClick={() => setSelectedSubmission(null)} className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Forms;
