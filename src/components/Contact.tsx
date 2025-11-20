import React, { useState, useEffect } from "react";
import { Mail, Phone, Send } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useFormSubmission } from "../hooks/useFormSubmission";
import contactUsBg from "../assets/contact-us-bg.svg"

declare global {
  interface Window {
    Calendly: {
      initPopupWidget: (options: { url: string }) => void;
      closePopupWidget?: () => void;
    };
  }
}

const Contact = () => {
  const [searchParams] = useSearchParams();
  const { submitForm, isSubmitting } = useFormSubmission();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    service: "",
  });

  // ✅ Auto-select service if URL contains "?service=functional-testing"
  useEffect(() => {
    const selectedService = searchParams.get("service");
    if (selectedService && !formData.service) {
      setFormData((prev) => ({
        ...prev,
        service: selectedService,
      }));
    }
  }, [searchParams, formData.service]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await submitForm(formData, "Contact Form", "Contact Page");
      if (result?.success) {
        alert(
          "Thank you for your message! We'll get back to you within 24 hours."
        );
        setFormData({
          name: "",
          email: "",
          company: "",
          message: "",
          service: "",
        });
      } else {
        alert("There was an error submitting your form. Please try again.");
      }
    } catch (error) {
      alert("Something went wrong. Please try again later.");
      console.error(error);
    }
  };

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

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={contactUsBg}
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

            <p className="h2">Get Started Today</p>
            <p className="body-regular max-w-md mb-10 mt-4">
              Ready to elevate your software quality? Let’s discuss your testing
              needs and craft a tailored QA solution for your business.
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
                  <p className="body-md text-black-500">contact@inspecq.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="bg-white/90 p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.05)] backdrop-blur">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="body-md">Full Name</label>
                  <input
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
                  <option value="functional-testing">Functional Testing</option>
                  <option value="automation-testing">Test Automation</option>
                  <option value="performance-testing">
                    Performance Testing
                  </option>
                  <option value="mobile-testing">Mobile Testing</option>
                  {/* <option value="security-testing">Security Testing</option> */}
                  <option value="consulting-audits">
                    QA Consulting & Audits
                  </option>
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
  );
};

export default Contact;