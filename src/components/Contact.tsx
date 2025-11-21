import React, { useState, useEffect } from "react";
import { Mail, Send } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useFormSubmission } from "../hooks/useFormSubmission";
import contactUsBg from "../assets/contact-us-bg.svg";

/* -------------------------
   Modal (for success)
-------------------------- */

const Modal: React.FC<{
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}> = ({ open, onClose, title, children }) => {
  if (!open) return null;

  return (
    <div
      aria-modal="true"
      role="dialog"
      className="fixed inset-0 z-[999] flex items-center justify-center px-4 sm:px-6"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md sm:max-w-lg p-5 sm:p-7 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-base sm:text-xl font-semibold text-gray-900">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="ml-2 rounded-full p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
            aria-label="Close"
          >
            <span className="block h-4 w-4 text-lg leading-none">×</span>
          </button>
        </div>

        {/* Body */}
        <div className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-700">
          {children}
        </div>

        {/* Footer */}
        <div className="mt-5 sm:mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center px-4 py-2 text-sm sm:text-base rounded-full bg-teal-500 text-white hover:bg-teal-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

/* -------------------------
   Types
-------------------------- */

type ContactFormData = {
  name: string;
  email: string;
  company: string;
  message: string;
  service: string;
};

type ContactErrors = {
  name: string;
  email: string;
};

/* -------------------------
   Component
-------------------------- */

const Contact: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { submitForm, isSubmitting } = useFormSubmission();

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    message: "",
    service: "",
  });

  const [errors, setErrors] = useState<ContactErrors>({
    name: "",
    email: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);

  // Lock body scroll when success modal is open
  useEffect(() => {
    if (showSuccess) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
    document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showSuccess]);

  // Auto-select service from ?service=
  useEffect(() => {
    const selectedService = searchParams.get("service");
    if (selectedService && !formData.service) {
      setFormData((prev) => ({ ...prev, service: selectedService }));
    }
  }, [searchParams, formData.service]);

  const validate = () => {
    const newErrors: ContactErrors = { name: "", email: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    setErrors(newErrors);

    return !newErrors.name && !newErrors.email;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const result = await submitForm(
        formData,
        "Contact Form",
        "Contact Section"
      );

      if (result?.success) {
        setShowSuccess(true);

        setFormData({
          name: "",
          email: "",
          company: "",
          message: "",
          service: "",
        });

        setErrors({ name: "", email: "" });
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
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof ContactErrors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      {/* Success Modal */}
      <Modal
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="We’ve got your message!"
      >
        <p className="text-gray-700">
          Thank you for reaching out to InspecQ.{" "}
          <span className="font-semibold">
            We’ve received your message and will get back to you within 24
            hours.
          </span>
        </p>
      </Modal>

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
          <div className="flex flex-col h-full">
            <p className="h2">Get Started Today</p>

            <p className="body-regular max-w-md mb-10 mt-4">
              Ready to elevate your software quality? Let’s discuss your testing
              needs and craft a tailored QA solution for your business.
            </p>

            {/* Email Card (aligned with form bottom) */}
            <div className="mt-auto max-w-sm">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 flex flex-col items-start space-y-4">
                <div className="p-2 rounded-full bg-black-50">
                  <Mail className="h-5 w-5 text-gray-900" />
                </div>

                <div>
                  <p className="body-semi text-black-300">Email Us</p>

                  <p className="body-md text-black-500 break-all">
                    contact@inspecq.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: FORM */}
          <div className="bg-white/90 p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.05)] backdrop-blur">
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Name + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="body-md">
                    Full Name{" "}
                    <span className="text-rose-500" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={`mt-2 w-full px-4 py-3 border rounded-lg focus:ring-2 ${
                      errors.name
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-200 focus:ring-teal-500"
                    }`}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && (
                    <p className="text-red-600 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="body-md">
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
                    placeholder="you@company.com"
                    className={`mt-2 w-full px-4 py-3 border rounded-lg focus:ring-2 ${
                      errors.email
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-200 focus:ring-teal-500"
                    }`}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                  )}
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
                  className="mt-2 w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Service */}
              <div>
                <label className="body-md">Service Interest</label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="mt-2 w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Select a Service</option>
                  <option value="functional-testing">Functional Testing</option>
                  <option value="automation-testing">Test Automation</option>
                  <option value="performance-testing">
                    Performance Testing
                  </option>
                  <option value="mobile-testing">Mobile Testing</option>
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
                  className="mt-2 w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Submit Button */}
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