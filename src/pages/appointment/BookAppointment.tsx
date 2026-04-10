import React, { useState, useEffect, useMemo } from "react";
import { supabase } from "../../lib/supabaseClient";
import { Clock, Calendar as CalendarIcon, Info, CheckCircle, Loader2, ChevronLeft, ChevronRight, User, Hash, Mail, FileText, Briefcase, Globe, ChevronDown } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { format as formatTZ, toZonedTime } from "date-fns-tz";
import logo from "../../assets/logo.png";
import { Link, useSearchParams } from "react-router-dom";
import SEO from "../../components/SEO";
interface ServiceType {
  id: string;
  name: string;
  description: string;
  duration_minutes: number;
  color: string;
}

interface Slot {
  date: string;
  time: string;
  startTime: string;
  endTime: string;
}

const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

export default function BookAppointment() {
  const [services, setServices] = useState<ServiceType[]>([]);
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [slotsRaw, setSlotsRaw] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [userTimezone, setUserTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);

  // Memoize the expensive timezone list generation (400+ records) to prevent lag on every keypress or state update
  const timezoneOptions = useMemo(() => {
    const list: string[] = (Intl as any).supportedValuesOf ? (Intl as any).supportedValuesOf('timeZone') : [userTimezone];
    const initialDate = new Date();
    return list.map(tz => {
      let timeStr = "";
      try {
        timeStr = new Intl.DateTimeFormat('en-US', { timeZone: tz, hour: 'numeric', minute: '2-digit', hour12: true }).format(initialDate);
      } catch (e) {}
      return { value: tz, label: `${tz.replace(/_/g, ' ')} (${timeStr.toLowerCase()})` };
    });
  }, [userTimezone]);

  const [formData, setFormData] = useState({ name: "", email: "", company: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showOverview, setShowOverview] = useState(false);
  
  const [searchParams] = useSearchParams();
  const searchService = searchParams.get("service")?.toLowerCase();

  useEffect(() => {
    supabase!
      .from("service_types")
      .select("*")
      .eq("is_active", true)
      .order("sort_order")
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          let availableServices = data;
          
          // If a specific service is requested via query param, isolate it
          if (searchService) {
            const match = data.filter(s => s.name.toLowerCase() === searchService || s.name.toLowerCase().replace(/\s+/g, '-') === searchService);
            if (match.length > 0) availableServices = match;
          } else {
            // Otherwise, filter out the hidden/private services natively
            availableServices = data.filter(s => s.name.toLowerCase() !== "free trial kickoff call");
          }
          
          setServices(availableServices);
          if (availableServices.length > 0) {
            setSelectedService(availableServices[0]);
          }
        }
      });
  }, [searchService]);

  useEffect(() => {
    if (!selectedService) return;
    
    // Reset selections on service change
    setSlotsRaw([]);
    setSelectedDate(null);
    setSelectedSlot(null);

    const fetchSlots = async () => {
      setLoadingSlots(true);
      try {
        const start = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
        const end = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 2, 0); // 2 months lookahead
        
        const res = await fetch("/api/appointments/available-slots", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            serviceTypeId: selectedService.id,
            startDate: start.toISOString(),
            endDate: end.toISOString()
          })
        });
        const data = await res.json();
        if (data.success && data.slots) {
          setSlotsRaw(data.slots);
        }
      } catch (err) {
        console.error("Failed to load slots:", err);
      } finally {
        setLoadingSlots(false);
      }
    };
    
    fetchSlots();
  }, [selectedService, currentMonth.getFullYear(), currentMonth.getMonth()]); // Fixed dependencies

  // Convert raw slots into local timezone dates
  const availableDates = new Set(
    slotsRaw.map(s => {
      const d = toZonedTime(new Date(s.startTime), userTimezone);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    })
  );

  const handleDateClick = (dayStr: string, hasSlots: boolean) => {
    if (!hasSlots) return;
    const [y, m, d] = dayStr.split("-").map(Number);
    setSelectedDate(new Date(y, m - 1, d));
    setSelectedSlot(null);
  };

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

  const handleContinueToReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !selectedSlot) return;
    setShowOverview(true);
  };

  const handleFinalSubmit = async () => {
    if (!selectedService || !selectedSlot) return;
    setIsSubmitting(true);
    
    try {
      const res = await fetch("/api/appointments/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceTypeId: selectedService.id,
          clientName: formData.name,
          clientEmail: formData.email,
          clientCompany: formData.company,
          clientPhone: formData.phone,
          clientMessage: formData.message,
          startTime: selectedSlot.startTime,
          endTime: selectedSlot.endTime,
          clientTimezone: userTimezone
        })
      });
      const data = await res.json();
      
      if (res.ok && data.success) {
        setSuccess(true);
      } else {
        alert(data.error || "Failed to book appointment");
      }
    } catch (err) {
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6">
        <SEO title="Booking Confirmed" description="Your appointment has been successfully booked." noIndex={true} />
        <div className="bg-white p-10 rounded-2xl shadow-xl max-w-lg w-full text-center border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-teal-600"></div>
          <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-teal-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Booking Confirmed!</h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Thank you, <strong>{formData.name.split(" ")[0]}</strong>. We've sent a calendar invitation and confirmation details to <strong>{formData.email}</strong>.
          </p>
          <a 
            href="/"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-teal-600 text-white rounded-full font-medium hover:bg-teal-700 hover:shadow-lg transition-all duration-200"
          >
            Return to InspecQ.com
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <SEO title="Book Appointment" description="Schedule your QA consultation or service appointment with our expert team." canonical="/book" />
      {/* Standalone Header */}
      <header className="bg-white border-b border-gray-100 shadow-sm px-6 py-4 flex items-center justify-between z-10 w-full">
        <Link to="/" className="flex items-center outline-none">
          <img src={logo} alt="InspecQ Logo" className="h-8 md:h-10 w-auto" />
        </Link>
        <div className="hidden sm:flex text-sm text-gray-500 items-center gap-2 font-medium">
          <Info className="w-4 h-4" /> Secure Booking Portal
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 py-8 sm:py-12 px-4 sm:px-8 flex justify-center w-full">
        <div className="w-full max-w-[1400px]">
          
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-slate-900 mb-3">Schedule Your Session</h1>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">Please find an available time that works best for you. You will be able to review your details before confirming.</p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-gray-100 overflow-hidden flex flex-col md:flex-row min-h-[700px] w-full">
            
            {/* Left panel: Service Info (Dark Theme) */}
            <div className="md:w-[35%] lg:w-[30%] bg-slate-900 text-white p-6 sm:p-10 flex flex-col relative overflow-hidden shrink-0">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl -ml-10 -mb-10"></div>
              
              {services.length === 0 ? (
                <div className="animate-pulse space-y-6 relative z-10">
                  <div className="h-6 bg-slate-800 rounded w-1/3"></div>
                  <div className="h-16 bg-slate-800 rounded-xl"></div>
                  <div className="h-16 bg-slate-800 rounded-xl"></div>
                </div>
              ) : (
                <div className="relative z-10 flex-1 flex flex-col">
                  <h3 className="text-teal-400 font-semibold mb-6 flex items-center gap-2 uppercase tracking-widest text-xs">
                    1. Service
                  </h3>
                  
                  <div className="space-y-3 mb-6">
                    {services.map(svc => (
                      <button
                        key={svc.id}
                        onClick={() => setSelectedService(svc)}
                        className={`w-full text-left p-4 rounded-xl border transition-all duration-200 group ${selectedService?.id === svc.id ? 'border-teal-500 bg-teal-500/10' : 'border-slate-800 bg-slate-800/50 hover:bg-slate-800 hover:border-slate-700'}`}
                      >
                        <div className="flex items-center gap-3 mb-1">
                          <div className={`w-3 h-3 rounded-full shadow-lg ${selectedService?.id === svc.id ? 'animate-pulse' : ''}`} style={{ backgroundColor: svc.color }} />
                          <span className={`font-semibold  ${selectedService?.id === svc.id ? 'text-white' : 'text-slate-300 group-hover:text-white transition-colors'}`}>{svc.name}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-slate-400 mt-2 pl-6">
                          <Clock className="w-4 h-4" /> {svc.duration_minutes} min consultation
                        </div>
                      </button>
                    ))}
                  </div>

                  {selectedService && (
                    <div className="bg-slate-800/40 p-5 rounded-xl border border-slate-700/50 backdrop-blur-sm">
                      <h3 className="font-medium text-white mb-3 text-sm">About this consultation</h3>
                      <div className="text-sm leading-relaxed">
                        <ReactMarkdown
                          components={{
                            p: ({ node, ...props }) => <p className="mb-4 last:mb-0 text-slate-300 whitespace-pre-line" {...props} />,
                            ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-4 space-y-1.5 text-slate-300" {...props} />,
                            li: ({ node, ...props }) => <li className="text-slate-300" {...props} />,
                            a: ({ node, ...props }) => <a className="text-teal-400 hover:text-teal-300 underline" {...props} />
                          }}
                        >
                          {selectedService.description || "Discuss your QA needs."}
                        </ReactMarkdown>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right panel: Calendar, Form, or Overview */}
            <div className="md:w-[65%] lg:w-[70%] p-6 sm:p-12 lg:p-16 bg-white flex flex-col min-w-0 relative">
              <h3 className="text-gray-400 font-semibold mb-6 flex items-center gap-2 uppercase tracking-widest text-xs">
                 {showOverview ? '4. Review & Confirm' : selectedSlot ? '3. Your Details' : '2. Date & Time'}
              </h3>

              {loadingSlots && !slotsRaw.length ? (
                <div className="flex-1 flex flex-col items-center justify-center text-teal-600">
                  <Loader2 className="w-10 h-10 animate-spin mb-4" />
                  <p className="text-gray-500 font-medium">Checking availability...</p>
                </div>
              ) : showOverview ? (
                /* OVERVIEW STEP */
                <div className="animate-in fade-in slide-in-from-right-4 duration-300 flex-1 flex flex-col">
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8 flex-1">
                    <h4 className="font-bold text-slate-900 text-lg mb-6 border-b border-slate-200 pb-3">Booking Summary</h4>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Service & Time</p>
                        <p className="text-slate-900 font-semibold">{selectedService?.name}</p>
                        <p className="text-slate-600">
                          {formatTZ(toZonedTime(new Date(selectedSlot!.startTime), userTimezone), "EEEE, MMMM d, yyyy")}
                        </p>
                        <p className="text-slate-600">
                          {formatTZ(toZonedTime(new Date(selectedSlot!.startTime), userTimezone), "h:mm a")} - {formatTZ(toZonedTime(new Date(selectedSlot!.endTime), userTimezone), "h:mm a")}
                        </p>
                      </div>
                      
                      <div className="pt-2">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Your Information</p>
                        <p className="text-slate-900 font-semibold">{formData.name}</p>
                        <p className="text-slate-600">{formData.email}</p>
                        {formData.phone && <p className="text-slate-600">{formData.phone}</p>}
                        {formData.company && <p className="text-slate-600 border-t border-slate-100 mt-2 pt-2"><span className="text-slate-500 mr-2">Company:</span> {formData.company}</p>}
                        {formData.message && <p className="text-slate-600 border-t border-slate-100 mt-2 pt-2"><span className="text-slate-500 mr-2">Notes:</span> {formData.message}</p>}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pt-2">
                    <button 
                      onClick={() => setShowOverview(false)}
                      disabled={isSubmitting}
                      className="w-1/3 py-4 px-6 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all text-center disabled:opacity-50"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={handleFinalSubmit}
                      disabled={isSubmitting} 
                      className="w-2/3 py-4 px-6 bg-teal-600 text-white rounded-xl font-bold text-lg shadow-md hover:bg-teal-700 hover:shadow-lg transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : <>Confirm Booking <CheckCircle className="w-5 h-5 group-hover:scale-110 transition-transform" /></>}
                    </button>
                  </div>
                </div>
              ) : selectedSlot ? (
                /* FORM STEP */
                <div className="animate-in fade-in slide-in-from-right-4 duration-300 flex-1 flex flex-col">
                  
                  <div className="bg-slate-50 rounded-2xl p-5 mb-8 border border-slate-100 flex items-start sm:items-center justify-between sm:flex-row flex-col gap-4">
                    <div>
                      <p className="text-sm text-teal-600 font-bold mb-1 flex items-center gap-1.5 uppercase tracking-wide">
                        <CalendarIcon className="w-4 h-4" /> {selectedService?.name}
                      </p>
                      <p className="text-xl font-bold text-slate-900">
                        {formatTZ(toZonedTime(new Date(selectedSlot.startTime), userTimezone), "EEEE, MMMM d, yyyy")}
                      </p>
                      <p className="text-slate-600 font-medium mt-0.5 flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {formatTZ(toZonedTime(new Date(selectedSlot.startTime), userTimezone), "h:mm a")} - {formatTZ(toZonedTime(new Date(selectedSlot.endTime), userTimezone), "h:mm a")} 
                        <span className="text-slate-400 font-normal text-sm ml-1">({userTimezone.replace("_", " ")})</span>
                      </p>
                    </div>
                    <button 
                      onClick={() => setSelectedSlot(null)}
                      className="text-sm font-semibold text-slate-500 hover:text-teal-600 transition-colors px-4 py-2 bg-white rounded-full border border-slate-200 hover:border-teal-200 shadow-sm whitespace-nowrap"
                    >
                      Change Time
                    </button>
                  </div>

                  <form onSubmit={handleContinueToReview} className="space-y-5 flex-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="relative">
                        <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Full Name *</label>
                        <div className="relative">
                           <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                             <User className="w-4 h-4" />
                           </div>
                          <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all outline-none text-slate-900 font-medium placeholder:font-normal placeholder:text-slate-400" placeholder="Your Name" />
                        </div>
                      </div>
                      <div className="relative">
                        <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Email Address *</label>
                        <div className="relative">
                           <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                             <Mail className="w-4 h-4" />
                           </div>
                          <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all outline-none text-slate-900 font-medium placeholder:font-normal placeholder:text-slate-400" placeholder="mail@domain.com" />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="relative">
                        <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Company Name</label>
                        <div className="relative">
                           <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                             <Briefcase className="w-4 h-4" />
                           </div>
                          <input type="text" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all outline-none text-slate-900 font-medium placeholder:font-normal placeholder:text-slate-400" placeholder="Your Company" />
                        </div>
                      </div>
                      <div className="relative">
                        <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Phone Number</label>
                        <div className="relative">
                           <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                             <Hash className="w-4 h-4" />
                           </div>
                          <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all outline-none text-slate-900 font-medium placeholder:font-normal placeholder:text-slate-400" placeholder="Your Phone Number" />
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Additional Context</label>
                      <div className="relative">
                           <div className="absolute top-3.5 left-0 pl-3.5 flex items-start pointer-events-none text-slate-400">
                             <FileText className="w-4 h-4" />
                           </div>
                        <textarea rows={3} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all outline-none text-slate-900 font-medium resize-none placeholder:font-normal placeholder:text-slate-400" placeholder="Anything specific you'd like to discuss?"></textarea>
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <button type="submit" className="w-full py-4 px-6 bg-teal-600 text-white rounded-xl font-bold text-lg shadow-md hover:bg-teal-700 hover:shadow-lg transition-all flex items-center justify-center gap-2 group">
                        Continue to Review <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                /* CALENDAR STEP */
                <div className="animate-in fade-in duration-300 flex-1 flex flex-col border-[0px] border-red-500">
                  <div className="flex sm:items-center justify-between mb-8 pb-4 border-b border-gray-100 sm:flex-row flex-col gap-4">
                    <h2 className="text-2xl font-bold text-slate-900">Select Date & Time</h2>
                    
                    <div className="flex flex-col">
                      <label className="text-sm font-bold text-slate-900 mb-1 ml-3">Time Zone</label>
                      <div className="relative inline-flex items-center w-full sm:w-auto">
                        <div className="absolute left-3 text-slate-800 pointer-events-none text-lg">
                          🌍
                        </div>
                        <select
                          value={userTimezone}
                          onChange={(e) => {
                            setUserTimezone(e.target.value);
                            setSelectedSlot(null); // Reset slot since time boundaries change
                            setSelectedDate(null); // Reset date to ensure slots refresh correctly
                          }}
                          className="appearance-none bg-transparent hover:bg-slate-50 rounded-lg text-base text-slate-700 py-1.5 pl-10 pr-6 focus:ring-0 focus:outline-none transition-colors cursor-pointer w-full text-ellipsis max-w-[280px]"
                        >
                          {timezoneOptions.map(tz => (
                            <option key={tz.value} value={tz.value}>
                              {tz.label}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-0 text-slate-800 pointer-events-none pr-1">
                          <ChevronDown className="w-4 h-4 text-slate-900" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10">
                    {/* Calendar Widget */}
                    <div className="select-none max-w-sm mx-auto w-full">
                      <div className="flex items-center justify-between mb-6 px-1">
                        <button 
                          onClick={() => {
                            const nm = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
                            setCurrentMonth(nm);
                            setSelectedDate(null);
                          }}
                          className="p-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <h3 className="font-bold text-slate-800 text-lg">
                          {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                        </h3>
                        <button 
                          onClick={() => {
                            const nm = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
                            setCurrentMonth(nm);
                            setSelectedDate(null);
                          }}
                          className="p-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-7 gap-y-2 text-center mb-4">
                        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
                          <div key={d} className="text-xs font-bold text-slate-400 uppercase tracking-widest">{d}</div>
                        ))}
                      </div>
                      
                      <div className="grid grid-cols-7 gap-y-3 gap-x-2 text-center">
                        {Array.from({ length: getFirstDayOfMonth(currentMonth.getFullYear(), currentMonth.getMonth()) }).map((_, i) => (
                          <div key={`empty-${i}`} className="p-2"></div>
                        ))}
                        {Array.from({ length: getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth()) }).map((_, i) => {
                          const day = i + 1;
                          const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                          const hasSlots = availableDates.has(dateStr);
                          const isSelected = selectedDate?.getDate() === day && selectedDate?.getMonth() === currentMonth.getMonth() && selectedDate?.getFullYear() === currentMonth.getFullYear();
                          
                          return (
                            <button
                              key={day}
                              disabled={!hasSlots}
                              onClick={() => handleDateClick(dateStr, hasSlots)}
                              className={`w-9 h-9 sm:w-10 sm:h-10 mx-auto rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200 outline-none
                                ${isSelected ? "bg-teal-600 text-white shadow-md ring-4 ring-teal-50" 
                                : hasSlots ? "bg-teal-50 text-teal-800 hover:bg-teal-100 cursor-pointer" 
                                : "text-slate-300 cursor-not-allowed"}`}
                            >
                              {day}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Time Slots */}
                    <div className="flex flex-col h-full border-t lg:border-t-0 lg:border-l border-gray-100 pt-8 lg:pt-0 lg:pl-12">
                      {selectedDate ? (
                        <div className="h-full flex flex-col max-h-[350px]">
                          <h4 className="font-bold text-slate-800 mb-6 text-center lg:text-left">
                            {selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                          </h4>
                          {currentSlots.length > 0 ? (
                            <div className="grid grid-cols-1 gap-3 overflow-y-auto pr-3 custom-scrollbar flex-1 pb-4">
                              {currentSlots.map(slot => {
                                const timeString = formatTZ(toZonedTime(new Date(slot.startTime), userTimezone), "h:mm a");
                                const endString = formatTZ(toZonedTime(new Date(slot.endTime), userTimezone), "h:mm a");
                                return (
                                  <button
                                    key={slot.startTime}
                                    onClick={() => setSelectedSlot(slot)}
                                    className="py-3 px-4 border-2 border-teal-100 text-teal-800 font-bold rounded-xl hover:border-teal-500 hover:bg-teal-50 transition-all outline-none focus:ring-4 focus:ring-teal-50 flex items-center justify-center gap-2"
                                  >
                                    {timeString} - {endString}
                                  </button>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-slate-50 rounded-2xl border border-slate-100">
                              <CalendarIcon className="w-8 h-8 text-slate-300 mb-3" />
                              <p className="text-slate-500 font-medium">No slots available on this date.</p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                          <CalendarIcon className="w-12 h-12 text-slate-300 mb-4" />
                          <p className="text-slate-500 font-medium">Select a highlighted date<br/>to view available times</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
}
