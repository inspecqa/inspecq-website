import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Loader2, Calendar as CalendarIcon, Info, CheckCircle, RefreshCw } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import { format as formatTZ, toZonedTime } from "date-fns-tz";

interface Slot {
  date: string;
  time: string;
  startTime: string;
  endTime: string;
}

const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

export default function RescheduleAppointment() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [appointment, setAppointment] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // Calendar state
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [slotsRaw, setSlotsRaw] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [userTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!token) return;
    supabase!
      .from("appointments")
      .select("*, service_types(*)")
      .eq("reschedule_token", token)
      .single()
      .then(({ data, error }) => {
        if (error || !data) {
          setErrorMsg("Appointment not found or invalid token.");
          setLoading(false);
        } else if (["cancelled", "completed"].includes(data.status)) {
          setErrorMsg(`This appointment has already been ${data.status}.`);
          setLoading(false);
        } else {
          setAppointment(data);
          loadSlots(data.service_type_id);
        }
      });
  }, [token]);

  const loadSlots = async (serviceTypeId: string) => {
    setLoadingSlots(true);
    try {
      const start = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
      const end = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 2, 0); // 2 months
      
      const res = await fetch("/api/appointments/available-slots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceTypeId, startDate: start.toISOString(), endDate: end.toISOString() })
      });
      const data = await res.json();
      if (data.success) {
        setSlotsRaw(data.slots || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSlots(false);
      setLoading(false);
    }
  };

  const handleReschedule = async () => {
    if (!token || !selectedSlot) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/appointments/reschedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          newStartTime: selectedSlot.startTime,
          newEndTime: selectedSlot.endTime,
          clientTimezone: userTimezone,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
      } else {
        alert(data.error || "Failed to reschedule.");
      }
    } catch (err) {
      alert("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const availableDates = new Set(slotsRaw.map(s => {
    const d = toZonedTime(new Date(s.startTime), userTimezone);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }));

  const getSlotsForSelectedDate = () => {
    if (!selectedDate) return [];
    const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;
    return slotsRaw.filter(s => {
      const d = toZonedTime(new Date(s.startTime), userTimezone);
      const sStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      return sStr === dateStr;
    });
  };

  const currentSlots = getSlotsForSelectedDate();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 bg-gray-50">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Appointment Rescheduled!</h1>
        <p className="text-gray-600 max-w-md text-center mb-8">
          Your appointment has been successfully moved to the new time. We've sent an updated calendar invitation.
        </p>
        <Link to="/" className="px-6 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition">
          Return to Home
        </Link>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 bg-gray-50">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-6">
          <Info className="w-8 h-8 text-gray-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Notice</h1>
        <p className="text-gray-600 mb-8 text-center">{errorMsg}</p>
        <Link to="/book" className="px-6 py-2.5 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition">
          Book a New Appointment
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-[80vh] py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <RefreshCw className="w-6 h-6 text-blue-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reschedule Appointment</h1>
          <p className="text-gray-600">Select a new time for your <strong className="text-gray-900">{appointment?.service_types?.name}</strong>.</p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
          {loadingSlots ? (
            <div className="flex flex-col items-center justify-center py-20 text-teal-600">
              <Loader2 className="w-8 h-8 animate-spin mb-4" />
              <p className="text-gray-500 text-sm">Finding available times...</p>
            </div>
          ) : selectedSlot ? (
            <div className="max-w-md mx-auto text-center animate-in fade-in duration-300">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Confirm New Time</h2>
              <div className="bg-teal-50 rounded-xl p-6 mb-8 border border-teal-100">
                <p className="text-lg font-bold text-teal-900 mb-1">
                  {formatTZ(toZonedTime(new Date(selectedSlot.startTime), userTimezone), "EEEE, MMMM d, yyyy")}
                </p>
                <p className="text-teal-700 font-medium">
                  {formatTZ(toZonedTime(new Date(selectedSlot.startTime), userTimezone), "h:mm a")} - {formatTZ(toZonedTime(new Date(selectedSlot.endTime), userTimezone), "h:mm a")} ({userTimezone.replace("_", " ")})
                </p>
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => setSelectedSlot(null)}
                  className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
                >
                  Change Time
                </button>
                <button 
                  onClick={handleReschedule}
                  disabled={isSubmitting}
                  className="flex-1 py-3 px-4 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition flex items-center justify-center"
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Confirm"}
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-300">
              {/* Calendar Widget */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <button 
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                    className="p-1 hover:bg-gray-100 rounded-full text-gray-600"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <h3 className="font-semibold text-gray-900">
                    {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                  </h3>
                  <button 
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                    className="p-1 hover:bg-gray-100 rounded-full text-gray-600"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
                
                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
                    <div key={d} className="text-xs font-medium text-gray-400 py-1">{d}</div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-1 text-center">
                  {Array.from({ length: getFirstDayOfMonth(currentMonth.getFullYear(), currentMonth.getMonth()) }).map((_, i) => (
                    <div key={`empty-${i}`} className="p-2"></div>
                  ))}
                  {Array.from({ length: getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth()) }).map((_, i) => {
                    const day = i + 1;
                    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                    const hasSlots = availableDates.has(dateStr);
                    const isSelected = selectedDate?.getDate() === day && selectedDate?.getMonth() === currentMonth.getMonth();
                    
                    return (
                      <button
                        key={day}
                        disabled={!hasSlots}
                        onClick={() => { if(hasSlots) setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)); setSelectedSlot(null); }}
                        className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                          isSelected ? "bg-teal-600 text-white shadow-md transform scale-105" 
                          : hasSlots ? "bg-teal-50 text-teal-800 hover:bg-teal-100 cursor-pointer" 
                          : "text-gray-300 cursor-not-allowed"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots */}
              <div>
                {selectedDate ? (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">
                      {selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                    </h4>
                    {currentSlots.length > 0 ? (
                      <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                        {currentSlots.map(slot => {
                          const timeString = formatTZ(toZonedTime(new Date(slot.startTime), userTimezone), "h:mm a");
                          return (
                            <button
                              key={slot.startTime}
                              onClick={() => setSelectedSlot(slot)}
                              className="py-2.5 px-3 border border-teal-200 text-teal-700 font-medium rounded-lg hover:border-teal-600 hover:bg-teal-50 hover:text-teal-800 transition-colors bg-white focus:ring-2 focus:ring-teal-500"
                            >
                              {timeString}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="py-8 text-center text-gray-500 bg-gray-50 rounded-xl border border-gray-100">
                        No slots available on this date.
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-gray-200 rounded-xl">
                    <CalendarIcon className="w-10 h-10 text-gray-300 mb-3" />
                    <p className="text-gray-500 font-medium">Select a date to view<br/>available times</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
