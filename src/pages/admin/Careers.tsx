import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  MapPin,
  Clock,
  DollarSign,
  Users,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  getJobPostings,
  deleteJobPosting,
  updateJobPosting,
  JobPosting,
} from "../../lib/adminService";

const Careers = () => {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      setJobs(await getJobPostings());
    } catch (err) {
      setError("Failed to load job postings.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchJobs(); }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this job posting permanently?")) return;
    setJobs((prev) => prev.filter((j) => j.id !== id));
    try {
      await deleteJobPosting(id);
    } catch (err) {
      console.error("Delete failed:", err);
      fetchJobs();
    }
  };

  const handleStatusToggle = async (job: JobPosting) => {
    const newStatus = job.status === "Active" ? "Inactive" : "Active";
    setJobs((prev) => prev.map((j) => j.id === job.id ? { ...j, status: newStatus } : j));
    try {
      await updateJobPosting(job.id, { status: newStatus });
    } catch (err) {
      console.error("Status update failed:", err);
      fetchJobs();
    }
  };

  const statCards = [
    { label: "Total Jobs", value: jobs.length, color: "bg-teal-500", icon: Users },
    { label: "Active", value: jobs.filter((j) => j.status === "Active").length, color: "bg-blue-500", icon: Eye },
    { label: "Total Applications", value: jobs.reduce((sum, j) => sum + (j.applications ?? 0), 0), color: "bg-purple-500", icon: Users },
    { label: "Draft", value: jobs.filter((j) => j.status === "Draft").length, color: "bg-orange-500", icon: Clock },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Career Management</h1>
            <p className="text-gray-600">Manage job postings and applications</p>
          </div>
          <div className="flex items-center space-x-3">
            <button onClick={fetchJobs} disabled={loading} className="p-2 text-gray-500 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            <Link
              to="/admin/careers/new"
              className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors duration-200 flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Add New Job</span>
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
          {statCards.map((s, i) => (
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

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Job Postings
              {!loading && <span className="ml-2 text-sm text-gray-500 font-normal">({jobs.length})</span>}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {["Job Details", "Location & Type", "Salary", "Status", "Applications", "Actions"].map((h) => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading
                  ? Array.from({ length: 3 }).map((_, i) => (
                    <tr key={i}>
                      {Array.from({ length: 6 }).map((__, j) => (
                        <td key={j} className="px-6 py-4">
                          <div className="h-4 bg-gray-100 rounded animate-pulse" />
                        </td>
                      ))}
                    </tr>
                  ))
                  : jobs.length === 0
                    ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center">
                          <p className="text-gray-500 text-sm mb-4">No job postings yet.</p>
                          <Link to="/admin/careers/new" className="inline-flex items-center space-x-2 bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-700">
                            <Plus className="h-4 w-4" />
                            <span>Create your first job posting</span>
                          </Link>
                        </td>
                      </tr>
                    )
                    : jobs.map((job) => (
                      <tr key={job.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{job.title}</div>
                          <div className="text-sm text-gray-500">{job.department}</div>
                          <div className="text-xs text-gray-400">
                            Posted: {new Date(job.posted_at).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-900">
                            <MapPin className="h-4 w-4 mr-1 text-gray-400" /> {job.location}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-1 text-gray-400" /> {job.type}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-900">
                            <DollarSign className="h-4 w-4 mr-1 text-gray-400" /> {job.salary}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleStatusToggle(job)}
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${job.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : job.status === "Draft"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                          >
                            {job.status}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1 text-gray-400" />
                            {job.applications ?? 0}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <Link to={`/admin/careers/${job.id}/edit`} className="text-blue-600 hover:text-blue-900 p-1" title="Edit">
                              <Edit className="h-4 w-4" />
                            </Link>
                            <button onClick={() => handleDelete(job.id)} className="text-red-600 hover:text-red-900 p-1" title="Delete">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Careers;
