import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2, XCircle, CheckCircle, CalendarX } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";

export default function CancelAppointment() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [appointment, setAppointment] = useState<any>(null);
  const [reason, setReason] = useState("");
  const [cancelling, setCancelling] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!token) return;
    supabase!
      .from("appointments")
      .select("*, service_types(name)")
      .eq("cancel_token", token)
      .single()
      .then(({ data, error }) => {
        if (error || !data) {
          setErrorMsg("Appointment not found or invalid token.");
        } else if (data.status === "cancelled") {
          setErrorMsg("This appointment has already been cancelled.");
        } else if (data.status === "completed") {
          setErrorMsg("This appointment has already been completed.");
        } else {
          setAppointment(data);
        }
        setLoading(false);
      });
  }, [token]);

  const handleCancel = async () => {
    if (!token) return;
    setCancelling(true);
    try {
      const res = await fetch("/api/appointments/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, reason }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
      } else {
        setErrorMsg(data.error || "Failed to cancel appointment");
      }
    } catch (err) {
      setErrorMsg("An unexpected error occurred.");
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 bg-gray-50">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
          <XCircle className="w-8 h-8 text-red-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Appointment Cancelled</h1>
        <p className="text-gray-600 mb-8 max-w-sm text-center">Your appointment has been successfully cancelled. You will receive an email confirmation shortly.</p>
        <button onClick={() => navigate("/book")} className="px-6 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition">
          Book a New Appointment
        </button>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 bg-gray-50">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-6">
          <CalendarX className="w-8 h-8 text-gray-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Notice</h1>
        <p className="text-gray-600 mb-8 text-center">{errorMsg}</p>
        <button onClick={() => navigate("/book")} className="px-6 py-2.5 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition">
          Book a New Appointment
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6 bg-gray-50">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-md w-full">
        <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-4 mx-auto">
          <XCircle className="w-6 h-6 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">Cancel Appointment?</h1>
        <p className="text-center text-gray-600 mb-6">Are you sure you want to cancel your <strong className="text-gray-900">{appointment?.service_types?.name}</strong>?</p>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Reason for cancellation</label>
          <textarea
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
            placeholder="Let us know why you're cancelling..."
          ></textarea>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleCancel}
            disabled={cancelling}
            className="w-full py-3 px-4 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition disabled:opacity-50 flex items-center justify-center"
          >
            {cancelling ? <Loader2 className="w-5 h-5 animate-spin" /> : "Confirm Cancellation"}
          </button>
          <button
            onClick={() => navigate(-1)}
            disabled={cancelling}
            className="w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition"
          >
            Keep Appointment
          </button>
        </div>
      </div>
    </div>
  );
}
