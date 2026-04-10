import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  getAvailabilityRules,
  upsertAvailabilityRules,
  getAvailabilityOverrides,
  createAvailabilityOverride,
  deleteAvailabilityOverride,
  getSchedulingSettings,
  updateSchedulingSettings,
  logActivity,
  type AvailabilityRule,
  type AvailabilityOverride,
  type SchedulingSettings,
} from "../../lib/adminService";
import { Save, Calendar, Clock, Trash2, Plus, CalendarOff, Settings, AlertCircle, RefreshCw, X, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function SchedulingAvailability() {
  const [rules, setRules] = useState<AvailabilityRule[]>([]);
  const [overrides, setOverrides] = useState<AvailabilityOverride[]>([]);
  const [settings, setSettings] = useState<SchedulingSettings | null>(null);
  
  const [loading, setLoading] = useState(true);
  const [savingRules, setSavingRules] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);
  
  const [newOverride, setNewOverride] = useState({ date: "", reason: "" });
  const [savingOverride, setSavingOverride] = useState(false);

  // Local state for editing rules
  const [editedRules, setEditedRules] = useState<Record<number, { is_active: boolean; start_time: string; end_time: string }>>({});
  
  const fetchData = async () => {
    setLoading(true);
    try {
      const [r, o, s] = await Promise.all([
        getAvailabilityRules(),
        getAvailabilityOverrides(),
        getSchedulingSettings(),
      ]);
      setRules(r);
      setOverrides(o);
      setSettings(s);
      
      const newEditedRules: Record<number, any> = {};
      DAYS.forEach((_, i) => {
        const existing = r.find(rule => rule.day_of_week === i);
        newEditedRules[i] = {
          is_active: existing ? existing.is_active : false,
          start_time: existing ? existing.start_time.slice(0, 5) : "09:00",
          end_time: existing ? existing.end_time.slice(0, 5) : "17:00",
        };
      });
      setEditedRules(newEditedRules);
    } catch (err) {
      console.error("Failed to load availability:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSaveRules = async () => {
    setSavingRules(true);
    try {
      const rulesToSave: any[] = [];
      Object.entries(editedRules).forEach(([day, config]) => {
        rulesToSave.push({
          day_of_week: parseInt(day),
          start_time: `${config.start_time}:00`,
          end_time: `${config.end_time}:00`,
          is_active: config.is_active,
        });
      });
      await upsertAvailabilityRules(rulesToSave);
      await logActivity("Availability rules updated", "availability_rules", undefined);
      alert("Weekly hours saved successfully.");
      await fetchData();
    } catch (err) {
      console.error("Failed to save rules:", err);
      alert("Failed to save hours.");
    } finally {
      setSavingRules(false);
    }
  };

  const handleSaveSettings = async () => {
    if (!settings) return;
    setSavingSettings(true);
    try {
      await updateSchedulingSettings({
        buffer_minutes: settings.buffer_minutes,
        max_advance_days: settings.max_advance_days,
        min_advance_hours: settings.min_advance_hours,
        admin_timezone: settings.admin_timezone,
      });
      await logActivity("Scheduling settings updated", "scheduling_settings", undefined);
      alert("General settings saved successfully.");
    } catch (err) {
      console.error("Failed to save settings:", err);
      alert("Failed to save settings.");
    } finally {
      setSavingSettings(false);
    }
  };

  const handleAddOverride = async () => {
    if (!newOverride.date) return;
    setSavingOverride(true);
    try {
      await createAvailabilityOverride({
        override_date: newOverride.date,
        is_blocked: true,
        reason: newOverride.reason || "Blocked time",
      });
      await logActivity("Block date added", "availability_overrides", undefined, newOverride.date);
      setNewOverride({ date: "", reason: "" });
      const o = await getAvailabilityOverrides();
      setOverrides(o);
    } catch (err) {
      console.error("Failed to add override:", err);
    } finally {
      setSavingOverride(false);
    }
  };

  const handleDeleteOverride = async (id: string, date: string) => {
    try {
      await deleteAvailabilityOverride(id);
      await logActivity("Block date removed", "availability_overrides", id, date);
      const o = await getAvailabilityOverrides();
      setOverrides(o);
    } catch (err) {
      console.error("Failed to delete override:", err);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Link to="/admin/scheduling" className="text-gray-400 hover:text-gray-600 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Availability & Settings</h1>
            <p className="text-sm text-gray-500 mt-0.5">Manage when clients can book appointments with you</p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <RefreshCw className="w-6 h-6 text-teal-500 animate-spin mx-auto mb-3" />
            <p className="text-sm text-gray-500">Loading availability...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Rules & Overrides */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Weekly Hours */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-teal-600" />
                    <h2 className="text-lg font-semibold text-gray-900">Weekly Hours</h2>
                  </div>
                  <button
                    onClick={handleSaveRules}
                    disabled={savingRules}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" /> {savingRules ? "Saving..." : "Save Hours"}
                  </button>
                </div>
                <div className="p-6 divide-y divide-gray-100">
                  {DAYS.map((dayName, index) => {
                    const config = editedRules[index];
                    if (!config) return null;
                    return (
                      <div key={index} className="py-4 flex items-center justify-between first:pt-0 last:pb-0">
                        <div className="flex items-center gap-3 w-40">
                          <input
                            type="checkbox"
                            checked={config.is_active}
                            onChange={(e) => setEditedRules({ ...editedRules, [index]: { ...config, is_active: e.target.checked } })}
                            className="w-4 h-4 text-teal-600 rounded border-gray-300 focus:ring-teal-500"
                          />
                          <span className={`font-medium ${config.is_active ? "text-gray-900" : "text-gray-400"}`}>{dayName}</span>
                        </div>
                        
                        {config.is_active ? (
                          <div className="flex items-center gap-3">
                            <input
                              type="time"
                              value={config.start_time}
                              onChange={(e) => setEditedRules({ ...editedRules, [index]: { ...config, start_time: e.target.value } })}
                              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                            <span className="text-gray-400">to</span>
                            <input
                              type="time"
                              value={config.end_time}
                              onChange={(e) => setEditedRules({ ...editedRules, [index]: { ...config, end_time: e.target.value } })}
                              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400 italic">Unavailable</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Date Overrides / Blocked Dates */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
                  <CalendarOff className="w-5 h-5 text-red-500" />
                  <h2 className="text-lg font-semibold text-gray-900">Blocked Dates</h2>
                </div>
                <div className="p-6">
                  <div className="flex items-end gap-3 mb-6">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date to Block</label>
                      <input
                        type="date"
                        value={newOverride.date}
                        onChange={(e) => setNewOverride({ ...newOverride, date: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    <div className="flex-[2]">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Reason (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. Holiday, Out of office"
                        value={newOverride.reason}
                        onChange={(e) => setNewOverride({ ...newOverride, reason: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    <button
                      onClick={handleAddOverride}
                      disabled={savingOverride || !newOverride.date}
                      className="px-4 py-2 bg-red-50 text-red-700 font-medium rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50 text-sm h-10 flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" /> Block Date
                    </button>
                  </div>

                  {overrides.length > 0 ? (
                    <div className="space-y-2">
                      {overrides.map(o => (
                        <div key={o.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-red-500 rounded-full" />
                            <span className="font-medium text-sm text-gray-900">{new Date(o.override_date).toLocaleDateString()}</span>
                            {o.reason && <span className="text-xs text-gray-500 ml-2">— {o.reason}</span>}
                          </div>
                          <button
                            onClick={() => handleDeleteOverride(o.id, o.override_date)}
                            className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 text-center py-4 bg-gray-50 rounded-lg border border-dashed border-gray-200">No blocked dates.</p>
                  )}
                </div>
              </div>

            </div>

            {/* Right Column: Settings */}
            <div className="space-y-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-gray-600" />
                    <h2 className="text-lg font-semibold text-gray-900">General Settings</h2>
                  </div>
                  <button
                    onClick={handleSaveSettings}
                    disabled={savingSettings || !settings}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
                  >
                    <Save className="w-3.5 h-3.5" /> Save
                  </button>
                </div>
                
                {settings && (
                  <div className="p-6 space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                      <select
                        value={settings.admin_timezone}
                        onChange={(e) => setSettings({ ...settings, admin_timezone: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="America/New_York">Eastern Time (US & Canada)</option>
                        <option value="America/Chicago">Central Time (US & Canada)</option>
                        <option value="America/Denver">Mountain Time (US & Canada)</option>
                        <option value="America/Los_Angeles">Pacific Time (US & Canada)</option>
                        {/* Expand as needed */}
                      </select>
                      <p className="text-xs text-gray-400 mt-1">Your core operating timezone.</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Advance Notice</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min={0}
                          value={settings.min_advance_hours}
                          onChange={(e) => setSettings({ ...settings, min_advance_hours: Number(e.target.value) })}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                        <span className="text-sm text-gray-500 whitespace-nowrap">hours</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">How soon can someone book?</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Lookahead</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min={1}
                          value={settings.max_advance_days}
                          onChange={(e) => setSettings({ ...settings, max_advance_days: Number(e.target.value) })}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                        <span className="text-sm text-gray-500 whitespace-nowrap">days</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">How far into the future can they book?</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Buffer Time</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min={0}
                          step={5}
                          value={settings.buffer_minutes}
                          onChange={(e) => setSettings({ ...settings, buffer_minutes: Number(e.target.value) })}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                        <span className="text-sm text-gray-500 whitespace-nowrap">min</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Padding between appointments.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        )}
      </div>
    </AdminLayout>
  );
}
