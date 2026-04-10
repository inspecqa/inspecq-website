import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  getAppointments,
  getServiceTypes,
  getAppointmentStats,
  updateAppointmentStatus,
  deleteAppointment,
  downloadCSV,
  logActivity,
  type Appointment,
  type ServiceType,
} from "../../lib/adminService";
import {
  Calendar,
  Clock,
  User,
  Building2,
  Mail,
  Phone,
  Filter,
  Download,
  Trash2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Search,
  BarChart3,
  CalendarPlus,
  Eye,
} from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  confirmed: "bg-emerald-100 text-emerald-800",
  rescheduled: "bg-blue-100 text-blue-800",
  completed: "bg-gray-100 text-gray-700",
  cancelled: "bg-red-100 text-red-700",
  no_show: "bg-yellow-100 text-yellow-800",
};

const STATUS_ICONS: Record<string, React.ReactNode> = {
  confirmed: <CheckCircle2 className="w-3.5 h-3.5" />,
  rescheduled: <RefreshCw className="w-3.5 h-3.5" />,
  completed: <CheckCircle2 className="w-3.5 h-3.5" />,
  cancelled: <XCircle className="w-3.5 h-3.5" />,
  no_show: <AlertTriangle className="w-3.5 h-3.5" />,
};

export default function SchedulingDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
  const [stats, setStats] = useState({ total: 0, confirmed: 0, completed: 0, cancelled: 0, noShow: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const filters: { status?: string; serviceTypeId?: string } = {};
      if (statusFilter !== "all") filters.status = statusFilter;
      if (serviceFilter !== "all") filters.serviceTypeId = serviceFilter;
      const [appts, svcs, st] = await Promise.all([
        getAppointments(filters),
        getServiceTypes(),
        getAppointmentStats(),
      ]);
      setAppointments(appts);
      setServiceTypes(svcs);
      setStats(st);
    } catch (err) {
      console.error("Failed to load scheduling data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [statusFilter, serviceFilter]);

  const filtered = appointments.filter((a) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      a.client_name.toLowerCase().includes(q) ||
      a.client_email.toLowerCase().includes(q) ||
      (a.client_company || "").toLowerCase().includes(q)
    );
  });

  const handleStatusChange = async (id: string, newStatus: string) => {
    setActionLoading(id);
    try {
      await updateAppointmentStatus(id, newStatus);
      await logActivity(`Appointment marked as ${newStatus}`, "appointment", id);
      await fetchData();
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this appointment permanently?")) return;
    setActionLoading(id);
    try {
      await deleteAppointment(id);
      await logActivity("Appointment deleted", "appointment", id);
      await fetchData();
    } catch (err) {
      console.error("Failed to delete:", err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleExportCSV = () => {
    downloadCSV(
      filtered.map((a) => ({
        Client: a.client_name,
        Email: a.client_email,
        Company: a.client_company || "",
        Phone: a.client_phone || "",
        Service: a.service_types?.name || "",
        Date: new Date(a.start_time).toLocaleDateString(),
        Time: new Date(a.start_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        Status: a.status,
        Timezone: a.client_timezone,
        Created: new Date(a.created_at).toLocaleDateString(),
      })),
      "appointments.csv"
    );
  };

  const formatDateTime = (iso: string, tz?: string) => {
    const d = new Date(iso);
    const timezone = tz || "America/New_York";
    return {
      date: d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", timeZone: timezone }),
      time: d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", timeZone: timezone }),
    };
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Scheduling</h1>
            <p className="text-sm text-gray-500 mt-1">Manage appointments, services, and availability</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download className="w-4 h-4" /> Export
            </button>
            <button
              onClick={fetchData}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className="w-4 h-4" /> Refresh
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
          {[
            { label: "Total", value: stats.total, color: "text-gray-900", bg: "bg-gray-50" },
            { label: "Confirmed", value: stats.confirmed, color: "text-emerald-700", bg: "bg-emerald-50" },
            { label: "Completed", value: stats.completed, color: "text-blue-700", bg: "bg-blue-50" },
            { label: "Cancelled", value: stats.cancelled, color: "text-red-700", bg: "bg-red-50" },
            { label: "No-Show", value: stats.noShow, color: "text-yellow-700", bg: "bg-yellow-50" },
          ].map((s) => (
            <div key={s.label} className={`${s.bg} rounded-xl p-4 border border-gray-100`}>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{s.label}</p>
              <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400 shrink-0" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="rescheduled">Rescheduled</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="no_show">No-Show</option>
            </select>
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="all">All Services</option>
              {serviceTypes.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Appointments list */}
        {loading ? (
          <div className="text-center py-20">
            <RefreshCw className="w-6 h-6 text-teal-500 animate-spin mx-auto mb-3" />
            <p className="text-sm text-gray-500">Loading appointments...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
            <CalendarPlus className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No appointments found</p>
            <p className="text-sm text-gray-400 mt-1">Appointments booked from your public booking page will appear here.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="divide-y divide-gray-100">
              {filtered.map((appt) => {
                const { date, time } = formatDateTime(appt.start_time, appt.client_timezone);
                const endFormatted = formatDateTime(appt.end_time, appt.client_timezone);
                const isExpanded = expandedId === appt.id;
                const svcColor = appt.service_types?.color || "#0d9488";
                const isPast = new Date(appt.end_time) < new Date();

                return (
                  <div key={appt.id} className="hover:bg-gray-50/50 transition-colors">
                    {/* Main row */}
                    <div
                      className="flex items-center gap-4 px-5 py-4 cursor-pointer"
                      onClick={() => setExpandedId(isExpanded ? null : appt.id)}
                    >
                      {/* Service color dot */}
                      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: svcColor }} />

                      {/* Client info */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900 text-sm truncate">{appt.client_name}</span>
                          {appt.client_company && (
                            <span className="text-xs text-gray-400 truncate hidden sm:inline">• {appt.client_company}</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 truncate">{appt.service_types?.name || "Service"}</p>
                      </div>

                      {/* Date/Time */}
                      <div className="text-right shrink-0 hidden sm:block">
                        <p className="text-sm font-medium text-gray-800">{date}</p>
                        <p className="text-xs text-gray-500">{time} – {endFormatted.time}</p>
                      </div>

                      {/* Status badge */}
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium shrink-0 ${STATUS_COLORS[appt.status] || "bg-gray-100 text-gray-700"}`}>
                        {STATUS_ICONS[appt.status]}
                        {appt.status.replace("_", " ")}
                      </span>

                      {/* Expand toggle */}
                      <div className="shrink-0 text-gray-400">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>

                    {/* Expanded detail */}
                    {isExpanded && (
                      <div className="px-5 pb-5 pt-1 border-t border-gray-50 bg-gray-50/30">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Mail className="w-3.5 h-3.5 text-gray-400" />
                              <a href={`mailto:${appt.client_email}`} className="text-teal-600 hover:underline">{appt.client_email}</a>
                            </div>
                            {appt.client_phone && (
                              <div className="flex items-center gap-2 text-gray-600">
                                <Phone className="w-3.5 h-3.5 text-gray-400" />
                                <span>{appt.client_phone}</span>
                              </div>
                            )}
                            {appt.client_company && (
                              <div className="flex items-center gap-2 text-gray-600">
                                <Building2 className="w-3.5 h-3.5 text-gray-400" />
                                <span>{appt.client_company}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-2 text-gray-600">
                              <Clock className="w-3.5 h-3.5 text-gray-400" />
                              <span>{appt.service_types?.duration_minutes || 30} minutes • {appt.client_timezone}</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Calendar className="w-3.5 h-3.5 text-gray-400" />
                              <span className="sm:hidden">{date} at {time}</span>
                              <span className="hidden sm:inline">Booked {new Date(appt.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                            </div>
                            {appt.client_message && (
                              <div className="bg-white border border-gray-150 rounded-lg p-3 text-gray-600 text-xs leading-relaxed">
                                <p className="font-medium text-gray-700 mb-1">Message:</p>
                                {appt.client_message}
                              </div>
                            )}
                            {appt.cancellation_reason && (
                              <div className="bg-red-50 border border-red-100 rounded-lg p-3 text-red-700 text-xs leading-relaxed">
                                <p className="font-medium mb-1">Cancellation Reason:</p>
                                {appt.cancellation_reason}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-gray-100">
                          {appt.status === "confirmed" && (
                            <>
                              <button
                                onClick={() => handleStatusChange(appt.id, "completed")}
                                disabled={actionLoading === appt.id}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors disabled:opacity-50"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" /> Mark Completed
                              </button>
                              <button
                                onClick={() => handleStatusChange(appt.id, "no_show")}
                                disabled={actionLoading === appt.id}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-yellow-700 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors disabled:opacity-50"
                              >
                                <AlertTriangle className="w-3.5 h-3.5" /> No-Show
                              </button>
                              <button
                                onClick={() => handleStatusChange(appt.id, "cancelled")}
                                disabled={actionLoading === appt.id}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50"
                              >
                                <XCircle className="w-3.5 h-3.5" /> Cancel
                              </button>
                            </>
                          )}
                          {appt.status === "rescheduled" && (
                            <>
                              <button
                                onClick={() => handleStatusChange(appt.id, "completed")}
                                disabled={actionLoading === appt.id}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors disabled:opacity-50"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" /> Mark Completed
                              </button>
                              <button
                                onClick={() => handleStatusChange(appt.id, "no_show")}
                                disabled={actionLoading === appt.id}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-yellow-700 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors disabled:opacity-50"
                              >
                                <AlertTriangle className="w-3.5 h-3.5" /> No-Show
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => handleDelete(appt.id)}
                            disabled={actionLoading === appt.id}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-500 bg-gray-50 rounded-lg hover:bg-gray-100 hover:text-red-600 transition-colors disabled:opacity-50 ml-auto"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
