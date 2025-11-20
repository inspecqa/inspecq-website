import React, { useMemo, useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSmoothScroll } from "../hooks/useSmoothScroll";
import {
  CheckCircle,
  ArrowRight,
  Users,
  Clock,
  MessageCircle,
  Zap,
  Star,
  HandCoins,
  Sparkle,
} from "lucide-react";

import { supabase } from "../lib/supabaseClient";
import sftBg3 from "../assets/sft-bg-3.svg";
import sftHeroBg from "../assets/sft-hero-bg.svg";
import sftFormBg from "../assets/sft-form-bg.svg";

/** ---------- Modal Component ---------- **/
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
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-lg px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 w-full sm:w-auto"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

/** ---------- Email validator ---------- **/
const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

/** ---------- Page ---------- **/
const FreeTrial = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    teamSize: "",
    testingFocus: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof formData, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [termsError, setTermsError] = useState<string | null>(null);
  const termsRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();
  const scrollTo = useSmoothScroll(120); // adjust offset if your header height differs

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

  // for focusing first invalid field
  const refs = {
    name: useRef<HTMLInputElement | null>(null),
    email: useRef<HTMLInputElement | null>(null),
    company: useRef<HTMLInputElement | null>(null),
    teamSize: useRef<HTMLSelectElement | null>(null),
    testingFocus: useRef<HTMLSelectElement | null>(null),
  };

  const features = useMemo(
    () => [
      {
        icon: CheckCircle,
        title: "Expert-Led QA Guidance",
        description:
          "Get hands on guidance from our experts to assess and elevate your testing process.",
      },
      {
        icon: Users,
        title: "Team Collaboration Support",
        description:
          "Involve up to 5 teammates to collaborate, align, and share actionable feedback.",
      },
      {
        icon: Clock,
        title: "7 Day Trial Period",
        description:
          "Explore how InspecQ transforms your QA workflow, with no feature limits for 7 days.",
      },
      {
        icon: HandCoins,
        title: "No Cost Required",
        description: "Start instantly – no payment, no contract, just value.",
      },
      {
        icon: Zap,
        title: "Quick Kickoff",
        description:
          "Get onboarded in minutes with a setup customized to your testing goals.",
      },
      {
        icon: Star,
        title: "Dedicated QA Support",
        description:
          "Enjoy personalized assistance from our QA specialists throughout your trial.",
      },
    ],
    []
  );

  const steps = useMemo(
    () => [
      {
        step: "01",
        title: "Get in Touch",
        description: "Fill out a short form to request your free 7-day trial.",
      },
      {
        step: "02",
        title: "Kickoff Call",
        description:
          "We’ll schedule a quick session to understand your testing needs.",
      },
      {
        step: "03",
        title: "Hands-On Support",
        description:
          "Our experts will work with your team to apply tailored QA strategies.",
      },
      {
        step: "04",
        title: "See the Results",
        description:
          "Get bug reports, quality insights, and process recommendations.",
      },
    ],
    []
  );

  /** ---------- Validation ---------- **/
  const validate = (data = formData) => {
    const next: typeof errors = {};
    if (!data.name.trim()) next.name = "Please enter your full name.";
    if (!data.email.trim()) next.email = "Please enter your work email.";
    else if (!emailOk(data.email)) next.email = "Enter a valid email address.";
    if (!data.company.trim()) next.company = "Please enter your company name.";
    if (!data.testingFocus) next.testingFocus = "Select a testing focus.";

    return next;
  };

  const focusFirstError = (errs: typeof errors) => {
    const order: (keyof typeof formData)[] = [
      "name",
      "email",
      "company",
      "teamSize",
      "testingFocus",
    ];
    for (const key of order) {
      if (errs[key]) {
        refs[key].current?.focus();
        break;
      }
    }
  };

  /** ---------- Handlers ---------- **/
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
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

    if (!supabase) {
      console.error("Supabase client not initialized. Form data not saved.");
      return;
    }

    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      focusFirstError(errs);
      return;
    }

    if (!agreeToTerms) {
      setTermsError("Please agree to the Free Trial Terms before submitting.");
      termsRef.current?.focus();
      return;
    } else {
      setTermsError(null);
    }

    // Honeypot (spam guard): if filled, silently abort
    const honeypot =
      (
        document.querySelector(
          'input[name="company_site"]'
        ) as HTMLInputElement | null
      )?.value || "";
    if (honeypot) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Optional: send welcome email via Netlify function
      try {
        await fetch("/.netlify/functions/sendTrialEmail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            calendlyLink:
              "https://calendly.com/mail-inspecq/inspecq-free-trial-kickoff-call",
          }),
        });
      } catch (err) {
        console.error("Error sending welcome email:", err);
      }

      // 🔹 Insert into Supabase (trial_requests table)
      const { error } = await supabase.from("trial_requests").insert([
        {
          full_name: formData.name.trim(),
          email: formData.email.trim(),
          company_name: formData.company.trim(),
          team_size: formData.teamSize || null,
          testing_focus: formData.testingFocus || null,
          source_page: window.location.pathname,
        },
      ]);

      if (error) {
        console.error("Supabase insert error:", error);
        alert(
          "Something went wrong saving your request. Please try again or contact us."
        );
        return;
      }

      // Success UI
      setShowSuccess(true);
      setFormData({
        name: "",
        email: "",
        company: "",
        teamSize: "",
        testingFocus: "",
      });
      setErrors({});
      setAgreeToTerms(false);
    } catch (err) {
      console.error(err);
      alert("Something went wrong submitting your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-16">
      {/* Success Modal */}
      <Modal
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Your trial request has been received!"
      >
        <p className="text-gray-700">
          Thanks for requesting trial access. We’ll send a{" "}
          <span className="font-semibold">welcome email</span> with setup
          instructions and a link to book your quick kickoff call.
        </p>
      </Modal>

      {/* Hero */}
      <section className="relative py-20 overflow-visible">
        <img
          src={sftHeroBg}
          alt=""
          className="absolute inset-x-0 bottom-0 w-full max-w-none pointer-events-none z-0 opacity-90 object-contain"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center gap-6 sm:gap-8">
            <div className="max-w-xl mt-2 sm:mt-4">
              <p className="h1 text-teal-900">
                Start Your 7-Day Free Trial Today
              </p>
              <p className="body-regular text-gray-600 mt-4">
                Kickstart your QA journey with InspecQ. Enjoy a 7-day free trial
                with no payment details needed. Discover the quality difference
                before you commit.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 w-full">
                <button
                  onClick={() => scrollTo("#trial-form")}
                  aria-label="Open the trial request form"
                  className="bg-teal-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl btn-text flex items-center justify-center space-x-2 w-full sm:w-auto"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="h-5 w-5" />
                </button>

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

      {/* Features */}
      <section className="relative py-12 sm:py-16 overflow-hidden">
        <img
          src={sftBg3}
          alt=""
          className="absolute inset-x-0 bottom-0 w-full max-w-none pointer-events-none z-0 opacity-90 object-contain"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <p
              className="h2 text-2xl sm:text-3xl lg:text-4xl"
              id="free-trial-includes-heading"
            >
              What’s Included in Your Free Trial
            </p>
            <p className="body-regular max-w-3xl mx-auto mt-4 text-lightGray text-sm sm:text-base">
              Experience the full power of InspecQ, every feature unlocked, no
              restrictions for 7 days.
            </p>
          </div>
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            aria-label="Free trial features"
          >
            {features.map((f, i) => (
              <div
                key={i}
                className="relative text-center p-6 sm:p-8 bg-white rounded-2xl border border-gray-100 hover:border-teal-200 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="bg-teal-500 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <f.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="body-lg text-base sm:text-lg">{f.title}</h3>
                <p className="xs-regular mt-2 text-sm text-gray-600">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        className="relative py-16 sm:py-20 lg:py-24 overflow-hidden"
        aria-labelledby="how-it-works-heading"
      >
        <img
          src={sftBg3}
          alt=""
          className="absolute inset-x-0 bottom-0 w-full max-w-none pointer-events-none z-0 opacity-90 object-contain"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <h2
                id="how-it-works-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900"
              >
                How It Works
              </h2>
              <p className="body-regular text-black-300 max-w-md mt-3 text-sm sm:text-base">
                Get started with InspecQ in just a few simple steps.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
              {steps.map((s, i) => {
                const isHighlight = i === 0;
                return (
                  <div
                    key={s.step}
                    className={`w-full p-5 sm:p-6 rounded-2xl border transition-all duration-300 ${
                      isHighlight
                        ? "bg-teal-500 text-white border-transparent"
                        : "bg-white text-gray-900 border-gray-100 hover:shadow-md"
                    }`}
                  >
                    <div className="flex flex-col gap-5 sm:gap-6">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                          isHighlight
                            ? "bg-white text-teal-500"
                            : "bg-teal-500 text-white"
                        }`}
                      >
                        {s.step}
                      </div>
                      <div>
                        <h6
                          className={`text-base sm:text-lg font-semibold mb-2 ${
                            isHighlight ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {s.title}
                        </h6>
                        <p
                          className={`text-sm leading-relaxed ${
                            isHighlight ? "text-teal-50" : "text-gray-600"
                          }`}
                        >
                          {s.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Trial Form */}
      <section
        id="trial-form"
        className="relative py-16 sm:py-20 lg:py-24 overflow-visible"
        aria-labelledby="trial-heading"
      >
        <img
          src={sftFormBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0 opacity-90"
        />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <div className="inline-flex items-center bg-teal-200 text-teal-800 px-4 py-2 rounded-full xs-regular mb-4 sm:mb-6 text-sm">
              <Sparkle className="h-4 w-4 sm:h-5 sm:w-5 text-teal-500 mr-2" />
              Trial Request
            </div>
            <p
              id="trial-heading"
              className="h2 text-black-500 text-2xl sm:text-3xl lg:text-4xl"
            >
              Get Started Today
            </p>
            <p className="body-regular mt-2 md:text-lg text-black-300 max-w-2xl mx-auto text-sm sm:text-base">
              Ready to elevate your software quality? Request your 7-day trial
              and experience expert-led QA in action.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-sm ring-1 ring-gray-100">
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Honeypot (spam guard) */}
              <input
                type="text"
                name="company_site"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block body-text-mreg text-black-500 mb-2 text-sm sm:text-base"
                  >
                    Full Name{" "}
                    <span aria-hidden="true" className="text-rose-500">
                      *
                    </span>
                  </label>
                  <input
                    ref={refs.name}
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "err-name" : undefined}
                    autoComplete="name"
                    placeholder="Your Name"
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors text-sm sm:text-base ${
                      errors.name ? "border-rose-400" : "border-gray"
                    }`}
                    required
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
                  <label
                    htmlFor="email"
                    className="block body-text-mreg text-black-500 mb-2 text-sm sm:text-base"
                  >
                    Work Email{" "}
                    <span aria-hidden="true" className="text-rose-500">
                      *
                    </span>
                  </label>
                  <input
                    ref={refs.email}
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "err-email" : undefined}
                    autoComplete="email"
                    placeholder="mail@company.com"
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors text-sm sm:text-base ${
                      errors.email ? "border-rose-400" : "border-gray"
                    }`}
                    required
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

              {/* Company & Team Size */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="mt-2">
                  <label
                    htmlFor="company"
                    className="block body-text-mreg text-black-500 mb-2 text-sm sm:text-base"
                  >
                    Company Name{" "}
                    <span aria-hidden="true" className="text-rose-500">
                      *
                    </span>
                  </label>
                  <input
                    ref={refs.company}
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!errors.company}
                    aria-describedby={
                      errors.company ? "err-company" : undefined
                    }
                    autoComplete="organization"
                    placeholder="Your company"
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors text-sm sm:text-base ${
                      errors.company ? "border-rose-400" : "border-gray"
                    }`}
                    required
                  />
                  {errors.company && (
                    <p
                      id="err-company"
                      className="mt-1 text-xs sm:text-sm text-rose-600"
                    >
                      {errors.company}
                    </p>
                  )}
                </div>

                <div className="mt-2">
                  <label
                    htmlFor="teamSize"
                    className="block body-text-mreg text-black-500 mb-2 text-sm sm:text-base"
                  >
                    Team Size
                  </label>
                  <select
                    ref={refs.teamSize}
                    id="teamSize"
                    name="teamSize"
                    value={formData.teamSize}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!errors.teamSize}
                    aria-describedby={
                      errors.teamSize ? "err-teamSize" : undefined
                    }
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors text-sm sm:text-base ${
                      errors.teamSize ? "border-rose-400" : "border-gray"
                    }`}
                  >
                    <option value="">Select team size</option>
                    <option value="1-5">1–5 people</option>
                    <option value="6-20">6–20 people</option>
                    <option value="21-50">21–50 people</option>
                    <option value="51-200">51–200 people</option>
                    <option value="200+">200+ people</option>
                  </select>
                  {errors.teamSize && (
                    <p
                      id="err-teamSize"
                      className="mt-1 text-xs sm:text-sm text-rose-600"
                    >
                      {errors.teamSize}
                    </p>
                  )}
                </div>
              </div>

              {/* Testing Focus */}
              <div>
                <label
                  htmlFor="testingFocus"
                  className="block body-text-mreg text-black-500 mb-2 mt-2 text-sm sm:text-base"
                >
                  Testing Focus
                </label>
                <select
                  ref={refs.testingFocus}
                  id="testingFocus"
                  name="testingFocus"
                  value={formData.testingFocus}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.testingFocus}
                  aria-describedby={
                    errors.testingFocus ? "err-testingFocus" : undefined
                  }
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors text-sm sm:text-base ${
                    errors.testingFocus ? "border-rose-400" : "border-gray"
                  }`}
                >
                  <option value="">Select Testing Focus</option>
                  <option value="web-testing">Web Application Testing</option>
                  <option value="mobile-testing">Mobile App Testing</option>
                  <option value="api-testing">API Testing</option>
                  <option value="test-automation">Test Automation</option>
                  <option value="performance-testing">Performance Testing</option>
                  <option value="qa-consulting-audits">
                    QA Consulting & Audits
                  </option>
                  <option value="other">Other</option>
                </select>
                {errors.testingFocus && (
                  <p
                    id="err-testingFocus"
                    className="mt-1 text-xs sm:text-sm text-rose-600"
                  >
                    {errors.testingFocus}
                  </p>
                )}
              </div>

              <div className="bg-teal-50/80 p-4 sm:p-6 rounded-xl">
                <p className="h5 text-gray-900 mb-3 text-base sm:text-lg">
                  What happens next?
                </p>
                <ul className="space-y-3 sm:space-y-4 text-gray-700">
                  <li className="flex items-start body-regular text-sm sm:text-base">
                    <span className="mt-2 mr-3 inline-block w-2 h-2 bg-teal-600" />
                    You’ll receive a welcome email with your onboarding details.
                  </li>
                  <li className="flex items-start body-regular text-sm sm:text-base">
                    <span className="mt-2 mr-3 inline-block w-2 h-2 bg-teal-600" />
                    You’ll schedule a short discovery call to walk us through
                    your product and priorities.
                  </li>
                  <li className="flex items-start body-regular text-sm sm:text-base">
                    <span className="mt-2 mr-3 inline-block w-2 h-2 bg-teal-600" />
                    Our team will start preparing a tailored testing plan for
                    your product.
                  </li>
                </ul>
              </div>

              {/* Agree to terms */}
              <div className="pt-2">
                <div className="flex justify-center gap-2 items-start">
                  <input
                    ref={termsRef}
                    id="agreeToTerms"
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={(e) => {
                      setAgreeToTerms(e.target.checked);
                      if (e.target.checked) setTermsError(null);
                    }}
                    className="mt-0.5 h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                  />
                  <label
                    htmlFor="agreeToTerms"
                    className="text-sm text-gray-700 text-left"
                  >
                    I have read and agree to the{" "}
                    <Link
                      to="/legal/free-trial-terms"
                      className="text-teal-600 font-semibold hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      InspecQ Free Trial Terms
                    </Link>
                    .
                  </label>
                </div>
                {termsError && (
                  <p className="mt-1 text-xs sm:text-sm text-rose-600">
                    {termsError}
                  </p>
                )}
              </div>

              <div aria-live="polite">
                <button
                  type="submit"
                  disabled={isSubmitting || !agreeToTerms}
                  className={`w-full px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-colors duration-200 ${
                    isSubmitting || !agreeToTerms
                      ? "bg-teal-600/60 text-white cursor-not-allowed"
                      : "bg-teal-600 text-white hover:bg-teal-700"
                  }`}
                >
                  <span>
                    {isSubmitting ? "Submitting..." : "Submit Trial Request"}
                  </span>
                </button>
              </div>

              <p className="xs-regular text-gray-500 text-center text-xs sm:text-sm">
                No credit card required • 7-day free trial • Cancel anytime
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FreeTrial;