import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Mail,
  FileText,
  BarChart3,
  Calendar,
  TrendingUp,
  MessageSquare,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import { getDashboardStats, DashboardStats } from "../../lib/adminService";

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (err) {
      setError("Failed to load dashboard data. Check your Supabase connection.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStats(); }, []);

  const statCards = stats
    ? [
      {
        title: "Job Postings",
        value: stats.jobPostings.toString(),
        change: `${stats.openPositions} active`,
        icon: Users,
        color: "bg-blue-500",
      },
      {
        title: "Form Submissions",
        value: stats.formSubmissions.toString(),
        change: "All time",
        icon: FileText,
        color: "bg-green-500",
      },
      {
        title: "Newsletter Subscribers",
        value: stats.newsletterSubscribers.toLocaleString(),
        change: "Active subscribers",
        icon: Mail,
        color: "bg-teal-500",
      },
      {
        title: "Open Positions",
        value: stats.openPositions.toString(),
        change: "Currently active",
        icon: Calendar,
        color: "bg-orange-500",
      },
    ]
    : [];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">
              Welcome back! Here's what's happening with your admin panel.
            </p>
          </div>
          <button
            onClick={fetchStats}
            disabled={loading}
            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Error state */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 animate-pulse"
              >
                <div className="h-12 w-12 bg-gray-200 rounded-lg mb-4" />
                <div className="h-7 w-16 bg-gray-200 rounded mb-2" />
                <div className="h-4 w-24 bg-gray-100 rounded" />
              </div>
            ))
            : statCards.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <TrendingUp className="h-5 w-5 text-teal-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-xs text-teal-600 font-medium">{stat.change}</p>
              </div>
            ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/admin/careers/new" className="bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg p-4 text-center transition-colors duration-200">
              <Users className="h-8 w-8 text-teal-600 mx-auto mb-2" />
              <p className="font-medium text-teal-900">Add New Job</p>
            </Link>
            <Link to="/admin/forms" className="bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg p-4 text-center transition-colors duration-200">
              <MessageSquare className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="font-medium text-green-900">View Forms</p>
            </Link>
            <Link to="/admin/newsletter/compose" className="bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-4 text-center transition-colors duration-200">
              <Mail className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="font-medium text-blue-900">Send Newsletter</p>
            </Link>
            <Link to="/admin/newsletter" className="bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-lg p-4 text-center transition-colors duration-200">
              <BarChart3 className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <p className="font-medium text-orange-900">Newsletter Stats</p>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : stats?.recentActivity.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-8">No recent activity yet.</p>
          ) : (
            <div className="space-y-4">
              {(stats?.recentActivity ?? []).map((activity, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 shrink-0 ${activity.type === "application"
                        ? "bg-teal-500"
                        : activity.type === "newsletter"
                          ? "bg-blue-500"
                          : activity.type === "form"
                            ? "bg-green-500"
                            : "bg-purple-500"
                      }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600 truncate">{activity.details}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
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

export default Dashboard;
