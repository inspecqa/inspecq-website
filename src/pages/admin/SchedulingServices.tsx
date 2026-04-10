import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  getServiceTypes,
  createServiceType,
  updateServiceType,
  deleteServiceType,
  logActivity,
  type ServiceType,
} from "../../lib/adminService";
import {
  Plus,
  Pencil,
  Trash2,
  Clock,
  GripVertical,
  Save,
  X,
  ToggleLeft,
  ToggleRight,
  ArrowLeft,
  RefreshCw,
  Palette,
  Link as LinkIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

const DEFAULT_COLORS = ["#0d9488", "#7c3aed", "#2563eb", "#dc2626", "#ea580c", "#ca8a04", "#16a34a", "#db2777"];

interface ServiceFormState {
  name: string;
  description: string;
  duration_minutes: number;
  color: string;
  is_active: boolean;
  sort_order: number;
}

const EMPTY_FORM: ServiceFormState = {
  name: "",
  description: "",
  duration_minutes: 30,
  color: "#0d9488",
  is_active: true,
  sort_order: 0,
};

export default function SchedulingServices() {
  const [services, setServices] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<ServiceFormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const data = await getServiceTypes();
      setServices(data);
    } catch (err) {
      console.error("Failed to load services:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchServices(); }, []);

  const openNewForm = () => {
    setForm({ ...EMPTY_FORM, sort_order: services.length });
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (svc: ServiceType) => {
    setForm({
      name: svc.name,
      description: svc.description || "",
      duration_minutes: svc.duration_minutes,
      color: svc.color,
      is_active: svc.is_active,
      sort_order: svc.sort_order,
    });
    setEditingId(svc.id);
    setShowForm(true);
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  const handleSave = async () => {
    if (!form.name.trim()) return;
    setSaving(true);
    try {
      if (editingId) {
        await updateServiceType(editingId, form);
        await logActivity("Service type updated", "service_type", editingId, form.name);
      } else {
        const created = await createServiceType(form);
        await logActivity("Service type created", "service_type", created.id, form.name);
      }
      cancelForm();
      await fetchServices();
    } catch (err) {
      console.error("Failed to save service:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (svc: ServiceType) => {
    if (!confirm(`Delete "${svc.name}"? Existing appointments using this service will NOT be deleted.`)) return;
    try {
      await deleteServiceType(svc.id);
      await logActivity("Service type deleted", "service_type", svc.id, svc.name);
      await fetchServices();
    } catch (err) {
      console.error("Failed to delete service:", err);
    }
  };

  const handleToggleActive = async (svc: ServiceType) => {
    try {
      await updateServiceType(svc.id, { is_active: !svc.is_active });
      await logActivity(svc.is_active ? "Service type deactivated" : "Service type activated", "service_type", svc.id, svc.name);
      await fetchServices();
    } catch (err) {
      console.error("Failed to toggle active:", err);
    }
  };

  const copyServiceLink = (svc: ServiceType) => {
    const url = `${window.location.origin}/book?service=${encodeURIComponent(svc.name)}`;
    navigator.clipboard.writeText(url);
    alert(`Link copied to clipboard!\n\n${url}`);
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link to="/admin/scheduling" className="text-gray-400 hover:text-gray-600 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">Service Types</h1>
            <p className="text-sm text-gray-500 mt-0.5">Configure the types of appointments clients can book</p>
          </div>
          <button
            onClick={openNewForm}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" /> Add Service
          </button>
        </div>

        {/* Form modal */}
        {showForm && (
          <div className="bg-white border border-gray-200 rounded-xl shadow-lg mb-6 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-lg font-semibold text-gray-900">{editingId ? "Edit Service" : "New Service"}</h2>
            </div>
            <div className="p-6 space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. 30 Minutes Meeting"
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows={4}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Describe what this service includes..."
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                />
              </div>

              {/* Duration + Sort Order */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
                  <input
                    type="number"
                    min={15}
                    max={240}
                    step={15}
                    value={form.duration_minutes}
                    onChange={(e) => setForm({ ...form, duration_minutes: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
                  <input
                    type="number"
                    min={0}
                    value={form.sort_order}
                    onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              {/* Color picker */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                <div className="flex items-center gap-2 flex-wrap">
                  {DEFAULT_COLORS.map((c) => (
                    <button
                      key={c}
                      onClick={() => setForm({ ...form, color: c })}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${form.color === c ? "border-gray-800 scale-110 shadow-md" : "border-transparent hover:border-gray-300"}`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                  <div className="flex items-center gap-1.5 ml-2">
                    <Palette className="w-4 h-4 text-gray-400" />
                    <input
                      type="color"
                      value={form.color}
                      onChange={(e) => setForm({ ...form, color: e.target.value })}
                      className="w-8 h-8 border-0 cursor-pointer rounded"
                    />
                  </div>
                </div>
              </div>

              {/* Active toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">Active</p>
                  <p className="text-xs text-gray-500">Visible to clients on booking page</p>
                </div>
                <button
                  onClick={() => setForm({ ...form, is_active: !form.is_active })}
                  className={`transition-colors ${form.is_active ? "text-teal-600" : "text-gray-300"}`}
                >
                  {form.is_active ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-gray-100 bg-gray-50/30">
              <button
                onClick={cancelForm}
                className="px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.name.trim()}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 shadow-sm"
              >
                <Save className="w-4 h-4" /> {saving ? "Saving..." : editingId ? "Update" : "Create"}
              </button>
            </div>
          </div>
        )}

        {/* List */}
        {loading ? (
          <div className="text-center py-16">
            <RefreshCw className="w-5 h-5 text-teal-500 animate-spin mx-auto mb-2" />
            <p className="text-sm text-gray-500">Loading services...</p>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
            <Clock className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No service types yet</p>
            <p className="text-sm text-gray-400 mt-1">Create your first service to start accepting appointments.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm divide-y divide-gray-100">
            {services.map((svc) => (
              <div key={svc.id} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50/50 transition-colors">
                {/* Color + drag handle */}
                <div className="flex items-center gap-2 shrink-0">
                  <GripVertical className="w-4 h-4 text-gray-300" />
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: svc.color }} />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-gray-900">{svc.name}</span>
                    {!svc.is_active && (
                      <span className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded">Inactive</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">
                    {svc.duration_minutes} min • Order {svc.sort_order}
                    {svc.description && ` • ${svc.description.substring(0, 60)}...`}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => handleToggleActive(svc)}
                    className={`p-1.5 rounded-lg transition-colors ${svc.is_active ? "text-teal-600 hover:bg-teal-50" : "text-gray-400 hover:bg-gray-100"}`}
                    title={svc.is_active ? "Deactivate" : "Activate"}
                  >
                    {svc.is_active ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={() => openEditForm(svc)}
                    className="p-1.5 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                    title="Edit Service"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => copyServiceLink(svc)}
                    className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Copy Private Link"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(svc)}
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
