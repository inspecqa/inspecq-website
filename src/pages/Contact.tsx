import React, { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Mail,
  Phone,
  CalendarCheck,
  ArrowRight,
  MessageCircle,
  Send,
  Sparkle,
} from "lucide-react";
import sftBg3 from "../assets/sft-bg-3.svg";
import cuheaderBg from "../assets/cu-header-bg.svg";
import sftBg4 from "../assets/sft-bg-4.svg";
import { useNavigate } from "react-router-dom";
import { useSmoothScroll } from "../hooks/useSmoothScroll";

// 🔹 Supabase client import
import { supabase } from "../lib/supabaseClient"; // adjust path if needed

/** ---------- Simple Modal ---------- **/
const Modal = ({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) => {
  if (!open) return null;
  return (
    <div
      aria-modal="true"
      role="dialog"
      className="fixed inset-0 z-[999] flex items-center justify-center"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full mx-4 p-6 sm:p-7">
        <div className="flex items-start justify-between">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
            {title}
          </h3>
        </div>
        <div className="mt-4 text-sm sm:text-base text-gray-700">
          {children}
        </div>
      </div>
    </div>
  );
};

// simple email validator
const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });

  const navigate = useNavigate();
  const scrollTo = useSmoothScroll(120); // offset for sticky header, tweak if needed

  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof formData, string>>
  >({});
  const [searchParams] = useSearchParams();
  const firstInputRef = useRef<HTMLInputElement | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Lock body scroll when modal open
  useEffect(() => {
    if (showSuccess) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showSuccess]);

  useEffect(() => {
    // 🔹 1. Service prefill
    const slug = (searchParams.get("service") || "").toLowerCase();
    const validSlugs = new Set([
      "functional-testing",
      "test-automation",
      "performance-testing",
      "mobile-testing",
      "qa-consulting-audits",
      "api-testing",
    ]);

    if (validSlugs.has(slug)) {
      setFormData((prev) => ({ ...prev, service: slug }));
    }

    // 🔹 2. Scroll behavior based on query param
    const scrollParam = searchParams.get("scroll");

    if (scrollParam === "form") {
      const el = document.getElementById("contact-form");
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 200); // small delay so layout ready thake
      }
    } else {
      // Navbar theke sudhu /contact e ashle top e niye jawar jonno
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // 🔹 3. Focus first input
    if (firstInputRef.current) firstInputRef.current.focus();
  }, [searchParams]);

  /** ---------- Validation ---------- **/
  const validate = (data = formData) => {
    const next: typeof errors = {};

    if (!data.name.trim()) next.name = "Please enter your full name.";
    if (!data.email.trim()) next.email = "Please enter your email address.";
    else if (!emailOk(data.email))
      next.email = "Please enter a valid email address.";

    // company / message optional

    return next;
  };

  /** ---------- Handlers ---------- **/
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name } = e.target;
    const single = validate({ ...formData });
    if (single[name as keyof typeof single]) {
      setErrors((prev) => ({
        ...prev,
        [name]: single[name as keyof typeof single],
      }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 🔹 structured validation
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      // Focus first invalid field
      if (errs.name && firstInputRef.current) {
        firstInputRef.current.focus();
      }
      return;
    }

    setIsSubmitting(true);

    try {
      if (!supabase) {
        console.error("Supabase client not initialized");
        alert("Service temporarily unavailable. Please try again later.");
        return;
      }

      // 🔹 Insert into Supabase: contact_submissions
      const { error } = await supabase.from("contact_submissions").insert([
        {
          full_name: formData.name.trim(),
          email: formData.email.trim(),
          company_name: formData.company.trim() || null,
          service_interest: formData.service || null,
          message: formData.message.trim() || null,
          source_page: window.location.pathname,
        },
      ]);

      if (error) {
        console.error("Supabase contact insert error:", error);
        alert(
          "Something went wrong submitting your message. Please try again or email us directly."
        );
        return;
      }

      // 🔹 Success UI – use modal instead of alert
      setShowSuccess(true);
      setFormData({
        name: "",
        email: "",
        company: "",
        service: "",
        message: "",
      });
      setErrors({});
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      description: "We’ll review your message and respond within 24 hours.",
      action: "Email Now",
      color: "bg-teal-500",
      link: "mailto:contact@inspecq.com",
    },
    {
      icon: CalendarCheck,
      title: "Live Consultation",
      description:
        "Schedule a 30-minute strategy session with our QA specialists.",
      action: "Book Now",
      color: "bg-teal-500",
      link: "https://calendly.com/inspecq/30min",
    },
  ];

  return (
    <div className="pt-16">
      {/* Success Modal */}
      <Modal
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="We’ve got your message!"
      >
        <p className="text-gray-700">
          Thanks for reaching out!{" "}
          <span className="font-semibold">
            Our team has received your message and will follow up shortly.
          </span>
        </p>
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={() => setShowSuccess(false)}
            className="inline-flex items-center justify-center rounded-lg px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 w-full sm:w-auto"
          >
            Close
          </button>
        </div>
      </Modal>

      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 overflow-visible">
        <img
          src={cuheaderBg}
          alt=""
          className="pointer-events-none absolute inset-x-0 bottom-0 w-full max-w-none z-0 opacity-90 object-contain"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center gap-6 sm:gap-8">
            <div className="max-w-3xl text-center mt-8">
              <p className="h1 text-teal-900">Ready for bug-free releases?</p>
              <p className="body-regular text-gray-600 mt-4">
                Let’s design your QA strategy together. Book a free 30-min
                consultation or send us your query. We’ll get back within 24
                hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                {/* Smooth scroll to trial form using hook */}
                <button
                  onClick={() => scrollTo("#trial-form")}
                  aria-label="Open the trial request form"
                  className="bg-teal-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl btn-text flex items-center justify-center space-x-2 w-full sm:w-auto"
                >
                  <span>Start Free Trial</span>
                  <ArrowRight className="h-5 w-5" />
                </button>

                {/* Go to Contact page and then smooth scroll to contact form */}
                <button
                  onClick={() => {
                    navigate("/contact");
                    setTimeout(() => scrollTo("#contact-form"), 200);
                  }}
                  className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl btn-text border border-buttonBorder text-black-500 bg-white transition-colors duration-200 flex items-center justify-center space-x-2 w-full sm:w-auto"
                  aria-label="Send your query"
                >
                  <span>Send Your Query</span>
                  <MessageCircle className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="relative py-12 sm:py-16 overflow-hidden">
        <img
          src={sftBg3}
          alt=""
          className="absolute inset-x-0 bottom-0 w-full max-w-none pointer-events-none z-0 opacity-90 object-contain"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="text-center mb-10 sm:mb-16 max-w-2xl">
            <p className="h2 text-2xl sm:text-3xl lg:text-4xl">
              Talk to a Real QA Expert Today
            </p>
            <p className="body-md mt-4 text-gray-700 text-sm sm:text-base">
              Direct communication, no delays — connect with our team in just a
              click.
            </p>
          </div>

          {/* centered cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-10 sm:mb-16 max-w-3xl mx-auto">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="text-center p-6 sm:p-8 bg-white rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 group"
              >
                <div
                  className={`${method.color} w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <method.icon className="h-5 w-5 text-white" />
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                  {method.title}
                </h3>
                <p className="text-gray-600 mb-5 sm:mb-6 text-sm sm:text-base">
                  {method.description}
                </p>

                {method.link ? (
                  <Link
                    to={method.link}
                    className="inline-flex items-center justify-center bg-teal-600 text-white px-5 sm:px-6 py-2 rounded-md font-medium hover:bg-teal-700 transition-colors duration-200 text-sm sm:text-base"
                  >
                    {method.action}
                  </Link>
                ) : (
                  <button className="inline-flex items-center justify-center bg-teal-600 text-white px-5 sm:px-6 py-2 rounded-full btn-text hover:bg-teal-700 transition-colors duration-200 text-sm sm:text-base">
                    {method.action}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section
        id="contactForm"
        className="relative py-16 sm:py-20 lg:py-24 overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={sftBg4}
            alt="background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* LEFT SIDE (info) */}
            <div className="order-2 lg:order-1 flex flex-col h-full justify-between">
              <div>
                <div className="body-semi inline-flex items-center bg-teal-900 text-white px-4 py-2 rounded-full mb-4 sm:mb-6 shadow-sm backdrop-blur text-sm sm:text-base">
                  <Sparkle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Contact Us
                </div>

                <p className="h2 text-2xl sm:text-3xl lg:text-4xl">
                  Get Started Today
                </p>

                <p className="body-regular max-w-md mt-3 sm:mt-4 text-sm sm:text-base text-black-700">
                  Ready to elevate your software quality? Let’s discuss your
                  testing needs and craft a tailored QA solution for your
                  business.
                </p>
              </div>

              {/* Email Card pinned to bottom */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-10 sm:mt-12 mb-2">
                <div className="bg-white p-5 sm:p-6 rounded-3xl border border-gray-100 flex flex-col items-start space-y-3 sm:space-y-4 mt-auto">
                  <div className="p-2 rounded-full bg-teal-100">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-teal-900" />
                  </div>
                  <div>
                    <p className="body-semi text-xs sm:text-sm text-black-300">
                      Email Us
                    </p>
                    <p className="body-md text-sm sm:text-base text-black-500 break-all">
                      contact@inspecq.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT FORM */}
            <div
              id="contact-form"
              className="order-1 lg:order-2 bg-white/95 p-6 sm:p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.05)] backdrop-blur scroll-mt-28"
            >
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Name + Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="body-md text-sm sm:text-base">
                      Full Name{" "}
                      <span className="text-rose-500" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <input
                      ref={firstInputRef}
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter your full name"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "err-name" : undefined}
                      className={`mt-2 w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                        errors.name ? "border-rose-400" : "border-gray-200"
                      }`}
                    />
                    {errors.name && (
                      <p
                        id="err-name"
                        className="mt-1 text-xs sm:text-sm text-rose-600"
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="body-md text-sm sm:text-base">
                      Email Address{" "}
                      <span className="text-rose-500" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="you@company.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "err-email" : undefined}
                      className={`mt-2 w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                        errors.email ? "border-rose-400" : "border-gray-200"
                      }`}
                    />
                    {errors.email && (
                      <p
                        id="err-email"
                        className="mt-1 text-xs sm:text-sm text-rose-600"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label className="body-md text-sm sm:text-base">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Your Company"
                    className="mt-2 w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>

                {/* Service */}
                <div>
                  <label className="body-md text-sm sm:text-base">
                    Service Interest
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="mt-2 w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  >
                    <option value="">Select Service</option>
                    <option value="web-testing">Web Application Testing</option>
                    <option value="mobile-testing">Mobile App Testing</option>
                    <option value="api-testing">API Testing</option>
                    <option value="automation">Test Automation</option>
                    <option value="performance">Performance Testing</option>
                    <option value="consulting">
                      QA Consulting &amp; Audits
                    </option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="body-md text-sm sm:text-base">
                    Leave us a Message or Query
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={4}
                    placeholder="Share your message or query here…"
                    className="mt-2 w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-y"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-teal-500 hover:bg-teal-800 text-white btn-text py-2.5 sm:py-3 px-4 sm:px-6 rounded-full transition-all duration-200 flex justify-center items-center gap-2 disabled:opacity-50 text-sm sm:text-base"
                >
                  <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>{isSubmitting ? "Sending..." : "Submit"}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
