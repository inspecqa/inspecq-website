import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Users, Mail, FileText, TrendingUp,
  MessageSquare, RefreshCw, AlertCircle, Briefcase, BookOpen, FlaskConical,
} from "lucide-react";
import {
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area,
} from "recharts";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  getDashboardStats, getFormSubmissionsChart, getSubscriberGrowthChart,
  DashboardStats, ChartPoint,
} from "../../lib/adminService";

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [formChart, setFormChart] = useState<ChartPoint[]>([]);
  const [subChart, setSubChart] = useState<ChartPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = async () => {
    setLoading(true); setError(null);
    try {
      const [s, fc, sc] = await Promise.all([
        getDashboardStats(),
        getFormSubmissionsChart(),
        getSubscriberGrowthChart(),
      ]);
      setStats(s); setFormChart(fc); setSubChart(sc);
    } catch { setError("Failed to load dashboard data. Check your Supabase connection."); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchAll(); }, []);

  // Trim chart labels to last 14 points for readability
  const trim = (data: ChartPoint[]) => data.slice(-14).map(p => ({ ...p, date: p.date.slice(5) }));

  const statCards = stats ? [
    { title: "Form Submissions", value: stats.formSubmissions, change: "All time", icon: FileText, color: "bg-green-500", to: "/admin/forms" },
    { title: "Newsletter Subscribers", value: stats.newsletterSubscribers, change: "Active", icon: Mail, color: "bg-teal-500", to: "/admin/newsletter" },
    { title: "Open Positions", value: stats.openPositions, change: `of ${stats.jobPostings} total`, icon: Users, color: "bg-blue-500", to: "/admin/careers" },
    { title: "Trial Requests", value: stats.trialRequests, change: "All time", icon: FlaskConical, color: "bg-purple-500", to: "/admin/trials" },
    { title: "Published Posts", value: stats.blogPosts, change: "On live site", icon: BookOpen, color: "bg-orange-500", to: "/admin/blog" },
  ] : [];

  const quickActions = [
    { to: "/admin/careers/new", icon: Users, label: "Add Job", color: "bg-teal-50 border-teal-200 text-teal-900", iconColor: "text-teal-600" },
    { to: "/admin/forms", icon: MessageSquare, label: "View Forms", color: "bg-green-50 border-green-200 text-green-900", iconColor: "text-green-600" },
    { to: "/admin/newsletter/compose", icon: Mail, label: "Send Newsletter", color: "bg-blue-50 border-blue-200 text-blue-900", iconColor: "text-blue-600" },
    { to: "/admin/blog/new", icon: BookOpen, label: "New Blog Post", color: "bg-orange-50 border-orange-200 text-orange-900", iconColor: "text-orange-600" },
    { to: "/admin/trials", icon: FlaskConical, label: "Trial Requests", color: "bg-purple-50 border-purple-200 text-purple-900", iconColor: "text-purple-600" },
    { to: "/admin/applications", icon: Briefcase, label: "Applications", color: "bg-pink-50 border-pink-200 text-pink-900", iconColor: "text-pink-600" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Dashboard</h1>
            <p className="text-gray-600">Overview of all activity across your admin panel</p>
          </div>
          <button onClick={fetchAll} disabled={loading} className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /><span>Refresh</span>
          </button>
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center space-x-2"><AlertCircle className="h-5 w-5" /><p className="text-sm">{error}</p></div>}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {loading ? Array.from({ length: 5 }).map((_, i) => <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 animate-pulse"><div className="h-12 w-12 bg-gray-200 rounded-lg mb-4" /><div className="h-7 w-16 bg-gray-200 rounded mb-2" /><div className="h-4 w-24 bg-gray-100 rounded" /></div>)
            : statCards.map((s, i) => (
              <Link key={i} to={s.to} className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 group">
                <div className="flex items-center justify-between mb-3">
                  <div className={`${s.color} w-10 h-10 rounded-lg flex items-center justify-center`}><s.icon className="h-5 w-5 text-white" /></div>
                  <TrendingUp className="h-4 w-4 text-gray-300 group-hover:text-teal-400 transition-colors" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-0.5">{s.value}</h3>
                <p className="text-xs text-gray-600 mb-0.5">{s.title}</p>
                <p className="text-xs text-teal-600 font-medium">{s.change}</p>
              </Link>
            ))}
        </div>

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Form Submissions (Last 14 Days)</h2>
            {loading ? <div className="h-48 bg-gray-100 rounded animate-pulse" /> : (
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={trim(formChart)}>
                  <defs><linearGradient id="formGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#0d9488" stopOpacity={0.2} /><stop offset="95%" stopColor="#0d9488" stopOpacity={0} /></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: 12 }} />
                  <Area type="monotone" dataKey="count" stroke="#0d9488" strokeWidth={2} fill="url(#formGrad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Newsletter Growth (Last 14 Days)</h2>
            {loading ? <div className="h-48 bg-gray-100 rounded animate-pulse" /> : (
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={trim(subChart)}>
                  <defs><linearGradient id="subGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} /><stop offset="95%" stopColor="#3b82f6" stopOpacity={0} /></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: 12 }} />
                  <Area type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} fill="url(#subGrad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {quickActions.map((a, i) => (
              <Link key={i} to={a.to} className={`${a.color} border rounded-xl p-4 text-center transition-colors hover:opacity-80`}>
                <a.icon className={`h-6 w-6 ${a.iconColor} mx-auto mb-2`} />
                <p className="text-xs font-medium">{a.label}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900">Recent Activity</h2>
            <Link to="/admin/activity" className="text-sm text-teal-600 hover:underline">View all →</Link>
          </div>
          {loading ? <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-14 bg-gray-100 rounded-lg animate-pulse" />)}</div>
            : !stats?.recentActivity.length ? <p className="text-sm text-gray-400 text-center py-8">No recent activity yet.</p>
              : (
                <div className="space-y-3">
                  {stats.recentActivity.map((a, i) => (
                    <div key={i} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${a.type === "form" ? "bg-green-500" : a.type === "newsletter" ? "bg-blue-500" : a.type === "job" ? "bg-teal-500" : "bg-purple-500"}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{a.action}</p>
                        <p className="text-xs text-gray-500 truncate">{a.details}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
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
