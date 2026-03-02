import React, { useEffect, useState } from "react";
import {
    Globe,
    Mail,
    Bell,
    Save,
    AlertCircle,
    CheckCircle,
    RefreshCw,
    Shield,
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import { getSiteSettings, setSiteSetting } from "../../lib/adminService";

interface Settings {
    site_name: string;
    site_url: string;
    support_email: string;
    maintenance_mode: string;
    notify_new_form: string;
    notify_new_job: string;
    notify_subscriber: string;
    notify_weekly: string;
}

const DEFAULTS: Settings = {
    site_name: "InspecQ",
    site_url: "https://inspecq.com",
    support_email: "support@inspecq.com",
    maintenance_mode: "false",
    notify_new_form: "true",
    notify_new_job: "true",
    notify_subscriber: "false",
    notify_weekly: "true",
};

const SettingsPage = () => {
    const [settings, setSettings] = useState<Settings>(DEFAULTS);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [saved, setSaved] = useState(false);

    const fetchSettings = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getSiteSettings();
            setSettings({ ...DEFAULTS, ...(data as Settings) });
        } catch {
            setError("Failed to load settings. Showing defaults.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchSettings(); }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSettings((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleToggle = (key: keyof Settings) => {
        setSettings((prev) => ({
            ...prev,
            [key]: prev[key] === "true" ? "false" : "true",
        }));
    };

    const handleSave = async () => {
        setSaving(true);
        setError(null);
        try {
            await Promise.all(
                Object.entries(settings).map(([key, value]) => setSiteSetting(key, value))
            );
            setSaved(true);
            setTimeout(() => setSaved(false), 2500);
        } catch {
            setError("Failed to save settings. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    const Toggle = ({
        label, desc, settingKey,
    }: {
        label: string; desc?: string; settingKey: keyof Settings;
    }) => (
        <div className="flex items-center justify-between py-3">
            <div>
                <p className="text-sm font-medium text-gray-900">{label}</p>
                {desc && <p className="text-xs text-gray-500 mt-0.5">{desc}</p>}
            </div>
            <button
                type="button"
                role="switch"
                aria-checked={settings[settingKey] === "true"}
                onClick={() => handleToggle(settingKey)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none ${settings[settingKey] === "true" ? "bg-teal-600" : "bg-gray-200"
                    }`}
            >
                <span
                    className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition-transform ${settings[settingKey] === "true" ? "translate-x-5" : "translate-x-0"
                        }`}
                />
            </button>
        </div>
    );

    return (
        <AdminLayout>
            <div className="max-w-2xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
                        <p className="text-gray-600">Manage your admin panel configuration</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button onClick={fetchSettings} disabled={loading} className="p-2 text-gray-500 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">
                            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={saving || loading}
                            className="flex items-center space-x-2 bg-teal-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-teal-700 transition-colors disabled:opacity-50"
                        >
                            {saved ? (
                                <><CheckCircle className="h-5 w-5" /><span>Saved!</span></>
                            ) : (
                                <><Save className="h-5 w-5" /><span>{saving ? "Saving…" : "Save Changes"}</span></>
                            )}
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center space-x-2">
                        <AlertCircle className="h-5 w-5 shrink-0" />
                        <p className="text-sm">{error}</p>
                    </div>
                )}

                {/* Site Configuration */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                        <Globe className="h-5 w-5 text-teal-600" />
                        <h2 className="text-lg font-semibold text-gray-900">Site Configuration</h2>
                    </div>
                    {loading
                        ? Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="h-10 bg-gray-100 rounded animate-pulse" />
                        ))
                        : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        { label: "Site Name", key: "site_name" },
                                        { label: "Site URL", key: "site_url" },
                                    ].map(({ label, key }) => (
                                        <div key={key}>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                                            <input
                                                name={key}
                                                value={settings[key as keyof Settings]}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
                                    <input
                                        name="support_email"
                                        type="email"
                                        value={settings.support_email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                    />
                                </div>
                                <div className={`flex items-center justify-between p-4 rounded-lg border ${settings.maintenance_mode === "true" ? "bg-red-50 border-red-200" : "bg-gray-50 border-gray-200"}`}>
                                    <div>
                                        <p className={`text-sm font-medium ${settings.maintenance_mode === "true" ? "text-red-900" : "text-gray-900"}`}>
                                            {settings.maintenance_mode === "true" ? "⚠️ Maintenance Mode Active" : "Maintenance Mode"}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-0.5">When enabled, visitors see a maintenance page</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleToggle("maintenance_mode")}
                                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${settings.maintenance_mode === "true" ? "bg-red-500" : "bg-gray-200"
                                            }`}
                                    >
                                        <span className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${settings.maintenance_mode === "true" ? "translate-x-5" : "translate-x-0"}`} />
                                    </button>
                                </div>
                            </>
                        )}
                </div>

                {/* Notification Preferences */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center space-x-2 mb-4">
                        <Bell className="h-5 w-5 text-teal-600" />
                        <h2 className="text-lg font-semibold text-gray-900">Notification Preferences</h2>
                    </div>
                    <div className="divide-y divide-gray-100">
                        <Toggle label="New Form Submission" desc="Email alert when someone fills out a contact form" settingKey="notify_new_form" />
                        <Toggle label="New Job Application" desc="Email alert for career form submissions" settingKey="notify_new_job" />
                        <Toggle label="New Subscriber" desc="Email alert for each newsletter signup" settingKey="notify_subscriber" />
                        <Toggle label="Weekly Summary" desc="Weekly digest of all activity" settingKey="notify_weekly" />
                    </div>
                </div>

                {/* Credentials Info */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center space-x-2 mb-4">
                        <Shield className="h-5 w-5 text-teal-600" />
                        <h2 className="text-lg font-semibold text-gray-900">Admin Access</h2>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                        <div className="flex items-start space-x-2">
                            <Mail className="h-4 w-4 mt-0.5 shrink-0" />
                            <div>
                                <p className="font-medium">Authentication managed via Supabase Auth</p>
                                <p className="mt-1 text-xs text-blue-600">
                                    To change admin credentials, visit the Supabase Dashboard → Authentication → Users.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default SettingsPage;
