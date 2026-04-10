import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ChevronLeft,
    Send,
    Eye,
    EyeOff,
    Calendar,
    Users,
    Mail,
    AlertCircle,
    CheckCircle,
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
    createCampaign,
    getSubscribers,
} from "../../lib/adminService";

const NewsletterCompose = () => {
    const navigate = useNavigate();
    const [showPreview, setShowPreview] = useState(false);
    const [totalActive, setTotalActive] = useState<number | null>(null);
    const [totalAll, setTotalAll] = useState<number | null>(null);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [form, setForm] = useState({
        subject: "",
        preview_text: "",
        body: "",
        send_to: "active",
        schedule_type: "now",
        schedule_date: "",
        schedule_time: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        getSubscribers()
            .then((subs) => {
                setTotalAll(subs.length);
                setTotalActive(subs.filter((s) => s.status === "Active").length);
            })
            .catch(console.error);
    }, []);

    const recipients =
        form.send_to === "active" ? (totalActive ?? 0) : (totalAll ?? 0);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!form.subject.trim()) newErrors.subject = "Subject is required.";
        if (!form.body.trim()) newErrors.body = "Body is required.";
        if (form.schedule_type === "schedule") {
            if (!form.schedule_date) newErrors.schedule_date = "Date is required.";
            if (!form.schedule_time) newErrors.schedule_time = "Time is required.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;
        setSaving(true);
        setError(null);
        try {
            const now = new Date().toISOString();
            await createCampaign({
                subject: form.subject,
                preview_text: form.preview_text,
                body: form.body,
                send_to: form.send_to,
                status: form.schedule_type === "now" ? "Sent" : "Scheduled",
                schedule_date: form.schedule_type === "schedule" ? form.schedule_date : undefined,
                schedule_time: form.schedule_type === "schedule" ? form.schedule_time : undefined,
                recipients,
                sent_at: form.schedule_type === "now" ? now : undefined,
            });
            setSuccess(true);
            setTimeout(() => navigate("/admin/newsletter"), 1500);
        } catch (err) {
            setError("Failed to save campaign. Please try again.");
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <AdminLayout>
            <div className={`${showPreview ? "grid grid-cols-1 lg:grid-cols-2 gap-6" : "max-w-3xl mx-auto"}`}>
                {/* Compose Panel */}
                <div className="space-y-6">
                    {/* Header */}
                    <div>
                        <button
                            onClick={() => navigate("/admin/newsletter")}
                            className="flex items-center text-gray-600 hover:text-gray-900 mb-4 text-sm"
                        >
                            <ChevronLeft className="h-4 w-4 mr-1" /> Back to Newsletter
                        </button>
                        <div className="flex items-center justify-between">
                            <h1 className="text-3xl font-bold text-gray-900">Compose Newsletter</h1>
                            <button
                                onClick={() => setShowPreview(!showPreview)}
                                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
                            >
                                {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                <span>{showPreview ? "Hide Preview" : "Show Preview"}</span>
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center space-x-2">
                            <AlertCircle className="h-5 w-5 shrink-0" />
                            <p className="text-sm">{error}</p>
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center space-x-2">
                            <CheckCircle className="h-5 w-5 shrink-0" />
                            <p className="text-sm">Campaign saved! Redirecting...</p>
                        </div>
                    )}

                    {/* Email Content */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 space-y-4">
                        <h2 className="text-lg font-semibold text-gray-900">Email Content</h2>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Subject <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="subject"
                                value={form.subject}
                                onChange={handleChange}
                                placeholder="Your email subject line…"
                                className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-teal-500 ${errors.subject ? "border-red-300" : "border-gray-300"}`}
                            />
                            {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Preview Text</label>
                            <input
                                type="text"
                                name="preview_text"
                                value={form.preview_text}
                                onChange={handleChange}
                                placeholder="Short teaser shown in inbox…"
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Body <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="body"
                                value={form.body}
                                onChange={handleChange}
                                rows={10}
                                placeholder="Write your email body here…"
                                className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-teal-500 resize-y ${errors.body ? "border-red-300" : "border-gray-300"}`}
                            />
                            {errors.body && <p className="mt-1 text-xs text-red-500">{errors.body}</p>}
                        </div>
                    </div>

                    {/* Recipients & Schedule */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 space-y-4">
                        <h2 className="text-lg font-semibold text-gray-900">Send Options</h2>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Users className="h-4 w-4 inline mr-1" />
                                Send To
                            </label>
                            <div className="space-y-2">
                                {[
                                    { value: "active", label: `Active subscribers only (${totalActive ?? "…"})` },
                                    { value: "all", label: `All subscribers (${totalAll ?? "…"})` },
                                ].map((opt) => (
                                    <label key={opt.value} className="flex items-center space-x-3 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="send_to"
                                            value={opt.value}
                                            checked={form.send_to === opt.value}
                                            onChange={handleChange}
                                            className="text-teal-600"
                                        />
                                        <span className="text-sm text-gray-700">{opt.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Calendar className="h-4 w-4 inline mr-1" />
                                When to Send
                            </label>
                            <div className="space-y-2">
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input type="radio" name="schedule_type" value="now" checked={form.schedule_type === "now"} onChange={handleChange} className="text-teal-600" />
                                    <span className="text-sm text-gray-700">Send immediately</span>
                                </label>
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input type="radio" name="schedule_type" value="schedule" checked={form.schedule_type === "schedule"} onChange={handleChange} className="text-teal-600" />
                                    <span className="text-sm text-gray-700">Schedule for later</span>
                                </label>
                            </div>
                            {form.schedule_type === "schedule" && (
                                <div className="mt-3 grid grid-cols-2 gap-3">
                                    <div>
                                        <input
                                            type="date"
                                            name="schedule_date"
                                            value={form.schedule_date}
                                            onChange={handleChange}
                                            min={new Date().toISOString().split("T")[0]}
                                            className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-teal-500 ${errors.schedule_date ? "border-red-300" : "border-gray-300"}`}
                                        />
                                        {errors.schedule_date && <p className="mt-1 text-xs text-red-500">{errors.schedule_date}</p>}
                                    </div>
                                    <div>
                                        <input
                                            type="time"
                                            name="schedule_time"
                                            value={form.schedule_time}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-teal-500 ${errors.schedule_time ? "border-red-300" : "border-gray-300"}`}
                                        />
                                        {errors.schedule_time && <p className="mt-1 text-xs text-red-500">{errors.schedule_time}</p>}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="flex items-center justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => navigate("/admin/newsletter")}
                            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={saving || success}
                            className="flex items-center space-x-2 bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors disabled:opacity-50"
                        >
                            {form.schedule_type === "now"
                                ? <><Send className="h-5 w-5" /><span>{saving ? "Sending…" : `Send to ${recipients} Subscribers`}</span></>
                                : <><Calendar className="h-5 w-5" /><span>{saving ? "Scheduling…" : "Schedule Campaign"}</span></>
                            }
                        </button>
                    </div>
                </div>

                {/* Live Preview Panel */}
                {showPreview && (
                    <div className="hidden lg:block">
                        <div className="sticky top-6">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                <div className="bg-gray-100 px-6 py-4 border-b border-gray-200">
                                    <div className="flex items-center space-x-2 mb-3">
                                        {["bg-red-400", "bg-yellow-400", "bg-green-400"].map((c) => (
                                            <div key={c} className={`w-3 h-3 rounded-full ${c}`} />
                                        ))}
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex">
                                            <span className="text-xs text-gray-500 w-14">From:</span>
                                            <span className="text-xs text-gray-900">InspecQ &lt;welcome@inspecq.com&gt;</span>
                                        </div>
                                        <div className="flex">
                                            <span className="text-xs text-gray-500 w-14">Subject:</span>
                                            <span className="text-xs font-medium text-gray-900">{form.subject || "Your subject here…"}</span>
                                        </div>
                                        {form.preview_text && (
                                            <div className="flex">
                                                <span className="text-xs text-gray-500 w-14">Preview:</span>
                                                <span className="text-xs text-gray-500 italic">{form.preview_text}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="text-center mb-6">
                                        <div className="flex items-center justify-center space-x-2 mb-2">
                                            <Mail className="h-5 w-5 text-teal-600" />
                                            <span className="text-sm font-bold text-teal-600">InspecQ</span>
                                        </div>
                                    </div>
                                    {form.subject && (
                                        <h3 className="text-lg font-bold text-gray-900 mb-4">{form.subject}</h3>
                                    )}
                                    <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                                        {form.body || <span className="text-gray-400 italic">Your email body will appear here…</span>}
                                    </div>
                                    <div className="mt-8 pt-6 border-t border-gray-200 text-center text-xs text-gray-400">
                                        <p>© 2026 InspecQ. All rights reserved.</p>
                                        <p className="mt-1">
                                            <a href="#" className="text-teal-600 hover:underline">Unsubscribe</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default NewsletterCompose;
