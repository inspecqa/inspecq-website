import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  Zap,
  Sparkles,
  Building2,
  GitBranch,
  GaugeCircle,
  Lock,
  Rocket,
  ChevronDown,
  X,
  MessageCircle,
  HelpCircle,
  Clock, // Added Clock icon for Hourly
} from "lucide-react";

import consultationIllustration from "../assets/consultation-illustration.svg";
import consultationBg from "../assets/consultation-bg.svg";
import pricingHeaderBg from "../assets/pricing-header-bg.svg";

type PlanId = "starter" | "professional" | "enterprise";

type Plan = {
  id: PlanId;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number; // The calculated yearly amount (20% off)
  displayMonthly: string;
  displayYearlyPerMonth: string;
  periodLabel: string;
  description: string;
  features: { name: string; included: boolean }[];
  popular?: boolean;
  icon: React.ComponentType<any>;
  cta: string;
  ctaLink: string; // Added explicit link handling
};

type OnDemandService = {
  name: string;
  price: string;
  description: string;
  cta: string;
  icon?: React.ComponentType<any>;
};

const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    monthlyPrice: 100,
    yearlyPrice: 960, // 20% discount logic
    displayMonthly: "$100",
    displayYearlyPerMonth: "$80",
    periodLabel: "/month",
    description: "Manual maintenance for early-stage startups.",
    features: [
      { name: "5 QA Hours / Month Included", included: true },
      { name: "Manual Smoke Testing", included: true },
      { name: "Basic Bug Reporting", included: true },
      { name: "Email Support", included: true },
      { name: "Monthly Status Report", included: true },
      { name: "Automation Maintenance", included: false },
      { name: "Priority Support", included: false },
    ],
    icon: Sparkles,
    cta: "Start 7-Day Trial",
    ctaLink: "/free-trial",
  },
  {
    id: "professional",
    name: "Professional",
    monthlyPrice: 200,
    yearlyPrice: 1920, // 20% discount logic
    displayMonthly: "$200",
    displayYearlyPerMonth: "$160",
    periodLabel: "/month",
    description: "Regular testing for active development cycles.",
    features: [
      { name: "10 QA Hours / Month Included", included: true },
      { name: "Manual Feature Testing", included: true },
      { name: "Detailed Bug Tracking", included: true },
      { name: "Priority Email Support", included: true },
      { name: "Bi-Weekly Reports", included: true },
      { name: "Basic Automation Runs", included: true },
      { name: "Jira/Slack Integration", included: true },
    ],
    popular: true,
    icon: Zap,
    cta: "Start 7-Day Trial",
    ctaLink: "/free-trial",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    monthlyPrice: 0,
    yearlyPrice: 0,
    displayMonthly: "Custom",
    displayYearlyPerMonth: "Custom",
    periodLabel: "",
    description: "Full-scale QA operations and dedicated resources.",
    features: [
      { name: "Unlimited Scale (Custom Hours)", included: true },
      { name: "Full Automation Suite", included: true },
      { name: "Custom Test Strategy", included: true },
      { name: "Dedicated Support Team", included: true },
      { name: "Performance & Security", included: true },
      { name: "Senior QA Manager", included: true },
      { name: "SLA Guarantees", included: true },
    ],
    icon: Building2,
    cta: "Contact Sales",
    ctaLink: "/contact",
  },
];

const ON_DEMAND_SERVICES: OnDemandService[] = [
  {
    name: "Automation Setup",
    price: "Starting at $1,000",
    description:
      "We build your custom test framework (Selenium, Cypress, Playwright) tailored to your stack. Handed over with documentation.",
    cta: "Get a Quote",
    icon: Rocket,
  },
  {
    name: "CI/CD Integration",
    price: "$500 (one-time)",
    description:
      "Seamless integration with GitHub Actions, GitLab, or Jenkins to block bugs before deployment.",
    cta: "Add Integration",
    icon: GitBranch,
  },
  {
    name: "Security Testing",
    price: "Starting at $850",
    description:
      "OWASP-aligned security scans and vulnerability assessment. Includes remediation report.",
    cta: "Book Scan",
    icon: Lock,
  },
  {
    name: "Performance Testing",
    price: "Starting at $500",
    description:
      "Load and stress testing using JMeter or k6 to ensure stability under traffic.",
    cta: "Start Testing",
    icon: GaugeCircle,
  },
  {
    name: "Additional QA Hours",
    price: "$20 / hour",
    description:
      "Need more coverage? Purchase blocks of manual or automation execution hours on demand.",
    cta: "Buy Hours",
    icon: Clock,
  },
];

const ALL_INCLUDED = [
  {
    title: "Onboarding & Setup",
    desc: "Fast start with best-practice templates.",
  },
  {
    title: "Test Artefacts",
    desc: "Test plans, cases, and detailed QA reports.",
  },
  {
    title: "Issue Tracking",
    desc: "Integrated with Jira or your preferred tool.",
  },
  {
    title: "NDA & Confidentiality",
    desc: "We sign NDAs and follow strict access controls.",
  },
];

const FAQ = [
  {
    q: "Do I need a credit card to start the trial?",
    a: "No. You can start a 7-day free trial without any payment details.",
  },
  {
    q: "How does the 'Hours Included' work?",
    a: "Each plan comes with a set number of execution hours per month (5 for Starter, 10 for Professional). If you need more coverage for a specific release, you can simply purchase Additional QA Hours at $20/hr.",
  },
  {
    q: "Can I switch plans later?",
    a: "Absolutely. You can upgrade or downgrade anytime, changes are automatically prorated for the next billing cycle.",
  },
  {
    q: "What happens when my trial ends?",
    a: "You can select a paid plan or reach out to our team for a custom engagement. We’ll send you a reminder before your trial expires.",
  },
  {
    q: "Do you offer invoices and procurement support?",
    a: "Yes, for Enterprise and qualified Professional customers. We support vendor onboarding and security reviews.",
  },
  {
    q: "How quickly can you start after sign-up?",
    a: "Typically within 2–3 business days after onboarding. We’ll align on scope, access, and project priorities immediately.",
  },
];

const PricingPage: React.FC = () => {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  const getPriceDisplay = (plan: Plan) => {
    if (plan.id === "enterprise") return "Custom";
    return billing === "monthly"
      ? plan.displayMonthly
      : plan.displayYearlyPerMonth;
  };

  const billingNote =
    billing === "yearly" ? "Billed yearly • Save up to 20%" : "Billed monthly";

  return (
    <div id="pricing-page" className="pt-16">
      {/* ======================= HERO ======================= */}
      <section
        aria-label="Pricing Hero Section"
        className="relative py-16 sm:py-20 lg:py-24 overflow-visible"
      >
        <img
          src={pricingHeaderBg}
          alt=""
          className="absolute inset-x-0 bottom-0 w-full max-w-none pointer-events-none z-0 opacity-90 object-contain"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center gap-6 sm:gap-8">
            {/* Added: 7-Day Trial Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-100 shadow-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
              </span>
              <span className="text-sm font-semibold text-teal-800">
                7-Day Risk-Free Pilot Available
              </span>
            </div>

            <div className="max-w-3xl mt-2 sm:mt-4">
              <p className="h1 text-teal-900">
                Flexible QA Pricing for Every Stage
              </p>
              <p className="body-regular text-gray-600 mt-4 sm:mt-6">
                Get the expertise of a senior QA team at rates that fit your
                budget. Scale up or down anytime.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-4 sm:mt-6 w-full sm:w-auto justify-center">
              <Link
                to="/contact?scroll=form"
                className="bg-teal-600 text-white w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-teal-700 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <span>Get Custom Quote</span>
                <ArrowRight className="h-5 w-5" />
              </Link>

              <a
                href="https://calendly.com/mail-inspecq/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-medium border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 transition flex items-center justify-center gap-2"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Schedule Consultation</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =================== BILLING TOGGLE & PLANS ================== */}
      <section id="billing-toggle" className="relative py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Toggle */}
          <div className="text-center mb-12">
            <h2>How Do You Want to Be Billed?</h2>
            <p className="body-md mt-4">
              Go monthly to stay flexible, or save 20% with a yearly plan –
              it&apos;s your call.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8">
              <span
                className={`text-sm ${
                  billing === "monthly"
                    ? "text-gray-900 font-semibold"
                    : "text-gray-500"
                }`}
              >
                Monthly
              </span>
              <button
                type="button"
                aria-label="Toggle billing period"
                onClick={() =>
                  setBilling((prev) =>
                    prev === "monthly" ? "yearly" : "monthly"
                  )
                }
                className="relative inline-flex h-9 w-16 items-center rounded-full bg-gray-200 transition"
              >
                <span
                  className={`inline-block h-7 w-7 transform rounded-full bg-white shadow transition ${
                    billing === "yearly" ? "translate-x-8" : "translate-x-1"
                  }`}
                />
              </button>
              <span
                className={`text-sm ${
                  billing === "yearly"
                    ? "text-gray-900 font-semibold"
                    : "text-gray-500"
                }`}
              >
                Yearly
              </span>
              <span className="text-xs sm:text-sm text-teal-600">
                {billingNote}
              </span>
            </div>
          </div>

          {/* PLANS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {PLANS.map((plan) => {
              const isPopular = !!plan.popular;
              const Icon = plan.icon;

              return (
                <div
                  key={plan.id}
                  className={`relative rounded-3xl transition-all duration-300 border-2 h-full flex flex-col ${
                    isPopular
                      ? "hover:shadow-lg"
                      : "bg-white border-gray-200 hover:shadow-lg"
                  }`}
                  style={
                    isPopular
                      ? {
                          background:
                            "linear-gradient(180deg, #BDF1DF 0%, #DEF8EF 100%)",
                        }
                      : undefined
                  }
                >
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-teal-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="p-6 sm:p-8 flex-1 flex flex-col">
                    {/* Header */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/70 rounded-xl flex items-center justify-center border border-white/50">
                        <Icon className="w-5 h-5 text-teal-600" />
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                          {plan.name}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {plan.description}
                        </p>
                      </div>
                    </div>

                    {/* Price + CTA */}
                    <div
                      className={`rounded-2xl mt-6 p-5 sm:p-6 ${
                        isPopular ? "bg-white" : "bg-transparent"
                      }`}
                    >
                      <div className="mb-5 sm:mb-6">
                        <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">
                          {getPriceDisplay(plan)}
                        </span>
                        <span className="ml-1 text-gray-500 text-base sm:text-lg align-baseline">
                          {plan.periodLabel}
                        </span>
                      </div>

                      <a
                        href={plan.ctaLink}
                        className={`w-full py-3 px-6 rounded-full font-semibold text-sm sm:text-base transition-colors duration-200 flex items-center justify-center gap-2 ${
                          isPopular
                            ? "bg-teal-500 text-white hover:bg-teal-600"
                            : "bg-gray-900 text-white hover:bg-gray-800"
                        }`}
                      >
                        {plan.cta}
                      </a>

                      <hr className="my-5 sm:my-6 border-t border-gray-200" />

                      <ul className="space-y-3 text-gray-800 text-sm">
                        {plan.features.map((f, idx) => (
                          <li key={idx} className="flex items-center">
                            {f.included ? (
                              <CheckCircle className="w-5 h-5 text-teal-600 mr-3 flex-shrink-0" />
                            ) : (
                              <X className="w-5 h-5 text-gray-300 mr-3 flex-shrink-0" />
                            )}
                            <span
                              className={
                                f.included ? "text-gray-700" : "text-gray-400"
                              }
                            >
                              {f.name}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex-1" />
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-center text-xs sm:text-sm text-gray-400 mt-8">
            You can switch between monthly and yearly anytime. Your billing
            updates instantly.
          </p>
        </div>
      </section>

      {/* ========= INCLUDED IN ALL PLANS ========= */}
      <section
        id="all-included"
        className="py-12 sm:py-16 bg-white border-t border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-teal-500">Included in All Plans</h2>
            <p className="body-regular text-gray-600 max-w-2xl mx-auto mt-3">
              Essentials you need to test confidently from day one.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ALL_INCLUDED.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl p-6 bg-teal-100 hover:shadow-md transition"
              >
                <h3 className="body-regular font-bold text-gray-900">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== ON-DEMAND SERVICES ===================== */}
      <section id="on-demand-services" className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              + On-Demand Services
            </div>
            <h2>Need a Specific Solution?</h2>
            <p className="body-regular text-slate-600 max-w-2xl mx-auto mt-2">
              Book standalone projects without a monthly subscription.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {ON_DEMAND_SERVICES.map((service) => {
              const Icon = service.icon ?? HelpCircle;
              return (
                <div
                  key={service.name}
                  className="p-6 bg-white border border-slate-200 rounded-2xl hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-teal-600" />
                        </span>
                        <h3 className="text-lg sm:text-xl font-semibold text-slate-900">
                          {service.name}
                        </h3>
                      </div>
                    </div>
                    <div className="mb-4">
                      <span className="text-teal-600 font-semibold text-base sm:text-lg">
                        {service.price}
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>
                  <Link
                    to="/contact"
                    className="mt-auto w-full border border-teal-200 text-teal-700 hover:bg-teal-50 py-2 rounded-lg text-sm font-semibold flex items-center justify-center transition-colors"
                  >
                    {service.cta}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ WHY CHOOSE OUR PRICING ============ */}
      <section id="why-pricing" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Why Choose Our Pricing?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Transparent, value-driven, and built to grow with you — pricing
              that reflects a real QA partnership.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "No Hidden Costs",
                desc: "Clear monthly billing. Cancel anytime. No setup charges.",
              },
              {
                title: "Expert Execution",
                desc: "We don't just run software; we provide hands-on human insight.",
              },
              {
                title: "Flexible Scaling",
                desc: "Start small with maintenance and scale up hours as your roadmap grows.",
              },
              {
                title: "Outcome-Focused",
                desc: "Reduce defect leakage and ship with higher confidence.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-200 p-6 bg-white hover:shadow-md transition text-center"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="text-gray-600 mt-2 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================= FAQ ======================= */}
      <section id="faq" className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Pricing & Trial FAQs
            </h2>
            <p className="text-gray-600 mt-3">
              If you have other questions,{" "}
              <Link
                className="text-teal-600 font-medium hover:underline"
                to="/contact"
              >
                contact us
              </Link>
              .
            </p>
          </div>

          <div className="space-y-4">
            {FAQ.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-gray-200 p-5 sm:p-6"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-gray-900">
                  <span className="pr-4">{item.q}</span>
                  <ChevronDown className="w-5 h-5 text-gray-500 transition group-open:rotate-180 shrink-0" />
                </summary>
                <p className="mt-3 text-gray-600 text-sm sm:text-base">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ====================== FINAL CTA ====================== */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[28px]">
            <img
              src={consultationBg}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 mix-blend-multiply" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center px-6 sm:px-10 lg:px-14 py-12 lg:py-16">
              {/* Left copy */}
              <div className="text-white">
                <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
                  30 Minute Free QA
                  <br />
                  Consultation to clear
                  <br />
                  your doubts.
                </h2>

                <p className="body-regular mt-6 text-white/90 text-base sm:text-lg max-w-2xl">
                  Book a 30-minute consultation to discuss your testing needs
                  and get expert recommendations.
                </p>

                <a
                  href="https://calendly.com/mail-inspecq/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-text mt-8 sm:mt-10 inline-flex items-center rounded-full bg-white border border-buttonBorder text-slate-900 px-6 sm:px-8 py-3 sm:py-4 text-base font-medium shadow-md hover:shadow-lg transition"
                >
                  Schedule Consultation
                </a>
              </div>

              {/* Right illustration */}
              <div className="relative">
                <img
                  src={consultationIllustration}
                  alt="Consultation illustration"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;