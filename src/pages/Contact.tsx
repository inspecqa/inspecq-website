import React, { useState, useEffect, useRef } from "react";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import {
  Mail,
  Phone,
  CalendarCheck,
  ArrowRight,
  MessageCircle,
  Send,
} from "lucide-react";

// 🔹 Supabase client import
import { supabase } from "../lib/supabaseClient"; // adjust path if needed

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });

  const [searchParams] = useSearchParams();
  const location = useLocation();
  const firstInputRef = useRef<HTMLInputElement | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const slug = (searchParams.get("service") || "").toLowerCase();
    const validSlugs = new Set([
      "functional-testing",
      "test-automation",
      "performance-testing",
      "mobile-testing",
      "security-testing",
      "api-testing",
    ]);
    if (validSlugs.has(slug)) {
      setFormData((prev) => ({ ...prev, service: slug }));
    }
    if (firstInputRef.current) firstInputRef.current.focus();
  }, [searchParams]);

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace("#", "");
      const el = document.getElementById(targetId);
      if (el) {
        requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    }
  }, [location.hash]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // simple email validator (optional but useful)
  const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 🔹 basic validation (table e NOT NULL constraints ache)
    if (!formData.name.trim()) {
      alert("Please enter your full name.");
      return;
    }
    if (!formData.email.trim()) {
      alert("Please enter your email address.");
      return;
    }
    if (!emailOk(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
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

      // 🔹 UX feedback
      alert(
        "Thank you for your interest! We'll get back to you within 24 hours."
      );
      setFormData({
        name: "",
        email: "",
        company: "",
        service: "",
        message: "",
      });
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak with our experts directly",
      action: "Call Now",
      color: "bg-teal-500",
      link: "",
    },
    {
      icon: Mail,
      title: "Email Us",
      description: "We will get back within 24 hours",
      action: " Email Now",
      color: "bg-teal-500",
    },
    {
      icon: CalendarCheck,
      title: "Live Consultation",
      description: "Schedule a 30-minute strategy session.",
      action: "Book Now",
      color: "bg-teal-500",
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-20 overflow-visible">
        <img
          src="src/assets/cu-header-bg.svg"
          alt=""
          className="absolute inset-x-0 bottom-0 w-full max-w-none pointer-events-none z-0 opacity-90 object-contain"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 md:grid-cols-2">
            {/* Left: copy + CTAs */}
            <div className="text-center md:text-left">
              <h1 className="!m-0 text-teal-900">
                Ready for bug-free releases?
              </h1>
              <p className="body-regular text-black-700 mt-4 max-w-xl mx-auto md:mx-0">
                Let’s design your QA strategy together. Book a free 30-min
                consultation or send us your query, we’ll get back within 24
                hours.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 md:justify-start justify-center mt-8">
                <button
                  onClick={() =>
                    document
                      .getElementById("trial-form")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  aria-label="Start your free 7-day QA trial"
                  className="bg-teal-500 text-white px-8 py-4 rounded-xl btn-text flex items-center justify-center space-x-2"
                >
                  <span>Start Free Trial</span>
                  <ArrowRight className="h-5 w-5" />
                </button>

                {/* Optional secondary action */}
                <a
                  href="#contact"
                  className="px-8 py-4 rounded-xl btn-text border border-buttonBorder
                           text-black-500 bg-white transition-colors duration-200 flex items-center justify-center space-x-2"
                  aria-label="Send your query"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Send Your Query</span>
                </a>
              </div>
            </div>

            {/* Right: illustration */}
            <div className="relative md:justify-self-end">
              <img
                src="src/assets/contact-us-illustration.svg"
                alt=""
                aria-hidden="true"
                className="w-full max-w-lg md:max-w-xl mx-auto md:mx-0 opacity-95"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="relative py-16 overflow-hidden">
        <img
          src="src/assets/sft-bg-3.svg"
          alt=""
          className="absolute inset-x-0 bottom-0 w-full max-w-none pointer-events-none z-0 opacity-90 object-contain"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2>Talk to a Real QA Expert Today</h2>
            <p className="body-md mt-4">
              Direct communication, no delays — connect with our team in just a
              click.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="text-center p-8 bg-white rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 group"
              >
                <div
                  className={`${method.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <method.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {method.title}
                </h3>
                <p className="text-gray-600 mb-6">{method.description}</p>
                {method.link ? (
                  <Link
                    to={method.link}
                    className="bg-teal-600 text-white px-6 py-2 rounded-md font-medium hover:bg-teal-700 transition-colors duration-200"
                  >
                    {method.action}
                  </Link>
                ) : (
                  <button className="bg-teal-600 text-white px-6 py-2 rounded-full btn-text hover:bg-teal-700 transition-colors duration-200">
                    {method.action}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section id="contact" className="relative py-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/sft-bg-4.svg"
            alt="background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* LEFT SIDE */}
            <div>
              <div className="body-semi inline-flex items-center bg-white/80 text-teal-800 px-4 py-2 rounded-full mb-6 shadow-sm backdrop-blur">
                + Contact Us
              </div>

              <h2>Get Started Today</h2>

              <p className="body-regular max-w-md mb-10 mt-4">
                Ready to elevate your software quality? Let’s discuss your
                testing needs and craft a tailored QA solution for your
                business.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-60">
                {/* Call Card */}
                <div className="bg-white p-8 rounded-3xl border border-gray-100 flex flex-col items-start space-y-4">
                  <div className="p-2 rounded-full bg-black-50">
                    <Phone className="h-5 w-5 text-gray-900" />
                  </div>
                  <div>
                    <p className="body-semi text-black-300">Call Us</p>
                    <p className="body-md text-black-500">+1 (555) 123-4567</p>
                  </div>
                </div>

                {/* Email Card */}
                <div className="bg-white p-8 rounded-3xl border border-gray-100 flex flex-col items-start space-y-4">
                  <div className="p-2 rounded-full bg-black-50">
                    <Mail className="h-5 w-5 text-gray-900" />
                  </div>
                  <div>
                    <p className="body-semi text-black-300">Email Us</p>
                    <p className="body-md text-black-500">
                      helloinspecq@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT FORM */}
            <div
              id="contact-form"
              className="bg-white/90 p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.05)] backdrop-blur scroll-mt-28"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name + Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="body-md">Full Name</label>
                    <input
                      ref={firstInputRef}
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="mt-2 w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="body-md">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      className="mt-2 w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label className="body-md">Company Name</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your Company"
                    className="mt-2 w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>

                {/* Service */}
                <div>
                  <label className="body-md">Service Interest</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="mt-2 w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  >
                    <option value="">Select a Service</option>
                    <option value="functional-testing">
                      Functional Testing
                    </option>
                    <option value="test-automation">Test Automation</option>
                    <option value="performance-testing">
                      Performance Testing
                    </option>
                    <option value="mobile-testing">Mobile Testing</option>
                    <option value="security-testing">Security Testing</option>
                    <option value="api-testing">API Testing</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="body-md">Leave us a Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about your project..."
                    className="mt-2 w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-teal-500 hover:bg-teal-800 text-white btn-text py-3 px-6 rounded-full transition-all duration-200 flex justify-center items-center gap-2 disabled:opacity-50"
                >
                  <Send className="h-5 w-5" />
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
