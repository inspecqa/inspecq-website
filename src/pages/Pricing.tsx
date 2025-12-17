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
  Rocket,
  ChevronDown,
  X,
  MessageCircle,
  HelpCircle,
  Clock,
  ShieldAlert,
} from "lucide-react";

import consultationIllustration from "../assets/consultation-illustration.svg"
import consultationBg from "../assets/consultation-bg.svg";
import pricingHeaderBg from "../assets/service/service-hero-bg.svg";

type PlanId = "starter" | "professional" | "enterprise";

type Plan = {
  id: PlanId;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  displayMonthly: string;
  displayYearlyPerMonth: string;
  periodLabel: string;
  description: string;
  features: { name: string; included: boolean }[];
  popular?: boolean;
  icon: React.ComponentType<any>;
  cta: string;
  ctaLink: string;
};

type OnDemandService = {
  name: string;
  price: string;
  description: string;
  cta: string;
  ctaLink: string; // Updated to include specific query params
  icon?: React.ComponentType<any>;
};

const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    monthlyPrice: 100,
    yearlyPrice: 960,
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
    yearlyPrice: 1920,
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
    ctaLink: "/contact?plan=enterprise",
  },
];

// UPDATED: More specific descriptions and "Safe" naming for Security
const ON_DEMAND_SERVICES: OnDemandService[] = [
  {
    name: "Automation Framework",
    price: "Starting at $1,000",
    description:
      "We build your custom test framework (Cypress, Playwright) tailored to your stack. Handed over with documentation.",
    cta: "Get a Quote",
    ctaLink: "/contact?service=automation",
    icon: Rocket,
  },
  {
    name: "Vulnerability Assessment", // Renamed from "Security Testing"
    price: "Starting at $850",
    description:
      "OWASP-aligned automated scans plus manual verification to find critical flaws. Includes remediation report.",
    cta: "Book Scan",
    ctaLink: "/contact?service=security-scan",
    icon: ShieldAlert, // Changed icon to ShieldAlert
  },
  {
    name: "Performance Scan",
    price: "Starting at $500",
    description:
      "Load and stress testing using k6/JMeter to identify bottlenecks before your next big launch.",
    cta: "Start Testing",
    ctaLink: "/contact?service=performance",
    icon: GaugeCircle,
  },
  {
    name: "CI/CD Integration",
    price: "$500 (one-time)",
    description:
      "Seamless integration with GitHub Actions, GitLab, or Jenkins to block bugs before deployment.",
    cta: "Add Integration",
    ctaLink: "/contact?service=cicd",
    icon: GitBranch,
  },
  {
    name: "Additional QA Hours",
    price: "$20 / hour",
    description:
      "Need more coverage? Purchase blocks of manual or automation execution hours on demand.",
    cta: "Buy Hours",
    ctaLink: "/contact?service=extra-hours",
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
            {/* 7-Day Trial Badge */}
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
              <h1 className="h1 text-teal-900">
                Flexible QA Pricing for Every Stage
              </h1>
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              How Do You Want to Be Billed?
            </h2>
            <p className="body-md mt-4 text-gray-600">
              Go monthly to stay flexible, or save 20% with a yearly plan.
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
                className="relative inline-flex h-9 w-16 items-center rounded-full bg-gray-200 transition focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
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
              <span className="text-xs sm:text-sm text-teal-600 font-medium">
                {billingNote}
              </span>
            </div>
          </div>

          {/* PLANS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {PLANS.map((plan) => {
              const isPopular = !!plan.popular;
              const isEnterprise = plan.id === "enterprise";
              const Icon = plan.icon;

              return (
                <div
                  key={plan.id}
                  className={`relative rounded-3xl transition-all duration-300 border-2 h-full flex flex-col ${
                    isPopular
                      ? "hover:shadow-xl border-teal-100"
                      : isEnterprise
                      ? "bg-slate-50 border-slate-200 hover:shadow-lg hover:border-slate-300"
                      : "bg-white border-gray-200 hover:shadow-lg"
                  }`}
                  style={
                    isPopular
                      ? {
                          background:
                            "linear-gradient(180deg, #F0FDFA 0%, #FFFFFF 100%)",
                        }
                      : undefined
                  }
                >
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-teal-600 text-white px-4 py-1 rounded-full text-xs font-bold tracking-wide uppercase shadow-sm">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="p-6 sm:p-8 flex-1 flex flex-col">
                    {/* Header */}
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${
                          isPopular
                            ? "bg-white border-teal-100 shadow-sm"
                            : "bg-white border-gray-100"
                        }`}
                      >
                        <Icon className="w-6 h-6 text-teal-600" />
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                          {plan.name}
                        </h3>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mt-4 leading-relaxed">
                      {plan.description}
                    </p>

                    {/* Price */}
                    <div className="mt-6 mb-6">
                      <div className="flex items-baseline">
                        <span className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
                          {getPriceDisplay(plan)}
                        </span>
                        <span className="ml-2 text-gray-500 text-base font-medium">
                          {plan.periodLabel}
                        </span>
                      </div>
                    </div>

                    {/* CTA */}
                    <a
                      href={plan.ctaLink}
                      className={`w-full py-4 px-6 rounded-xl font-bold text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2 mb-8 ${
                        isPopular
                          ? "bg-teal-600 text-white hover:bg-teal-700 shadow-md hover:shadow-lg"
                          : "bg-slate-900 text-white hover:bg-slate-800"
                      }`}
                    >
                      {plan.cta}
                    </a>

                    {/* Features Divider */}
                    <div className="border-t border-gray-200 w-full mb-6"></div>

                    {/* Features List */}
                    <ul className="space-y-4 text-sm">
                      {plan.features.map((f, idx) => (
                        <li key={idx} className="flex items-start">
                          {f.included ? (
                            <CheckCircle className="w-5 h-5 text-teal-600 mr-3 flex-shrink-0 mt-0.5" />
                          ) : (
                            <X className="w-5 h-5 text-gray-300 mr-3 flex-shrink-0 mt-0.5" />
                          )}
                          <span
                            className={
                              f.included
                                ? "text-gray-700 font-medium"
                                : "text-gray-400"
                            }
                          >
                            {f.name}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex-1" />
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-center text-xs sm:text-sm text-gray-400 mt-10">
            Prices in USD. You can switch between monthly and yearly anytime.
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
            <h2 className="text-sm font-bold text-teal-600 tracking-wide uppercase">
              Included in All Plans
            </h2>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              Essentials you need to test confidently.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ALL_INCLUDED.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl p-6 bg-teal-50/50 border border-teal-100 hover:shadow-md transition duration-300"
              >
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== ON-DEMAND SERVICES ===================== */}
      <section id="on-demand-services" className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center bg-white border border-teal-200 text-teal-800 px-4 py-1.5 rounded-full text-sm font-medium mb-5 shadow-sm">
              <Sparkles className="w-4 h-4 mr-2 text-teal-500" />
              Project-Based & On-Demand
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Need a Specific Solution?
            </h2>
            <p className="body-regular text-slate-600 max-w-2xl mx-auto mt-4">
              Book standalone projects or add-ons without a monthly
              subscription.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {ON_DEMAND_SERVICES.map((service) => {
              const Icon = service.icon ?? HelpCircle;
              return (
                <div
                  key={service.name}
                  className="p-8 bg-white border border-slate-200 rounded-3xl hover:shadow-xl hover:border-teal-200 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center group-hover:bg-teal-100 transition-colors">
                        <Icon className="w-6 h-6 text-teal-600" />
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {service.name}
                    </h3>
                    <div className="mb-4">
                      <span className="text-teal-700 font-semibold bg-teal-50 px-3 py-1 rounded-lg text-sm">
                        {service.price}
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed mb-8">
                      {service.description}
                    </p>
                  </div>
                  <Link
                    to={service.ctaLink}
                    className="mt-auto w-full border border-slate-300 text-slate-700 hover:border-teal-600 hover:text-teal-700 hover:bg-teal-50 py-3 rounded-xl text-sm font-bold flex items-center justify-center transition-all duration-200"
                  >
                    {service.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Pricing?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Transparent, value-driven, and built to grow with you.
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
                className="rounded-2xl border border-teal-100 p-8 bg-white shadow-sm hover:shadow-md transition text-center"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================= FAQ ======================= */}
      <section id="faq" className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Pricing & Trial FAQs
            </h2>
            <p className="text-gray-600 mt-3">
              If you have other questions,{" "}
              <Link
                className="text-teal-600 font-bold hover:underline"
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
                className="group rounded-2xl bg-white border border-gray-200 p-6 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-gray-900 text-lg">
                  <span className="pr-4">{item.q}</span>
                  <span className="transition group-open:rotate-180">
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </span>
                </summary>
                <p className="mt-4 text-gray-600 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ====================== FINAL CTA ====================== */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[32px] shadow-2xl">
            <img
              src={consultationBg}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-teal-900/90" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-8 sm:px-12 py-16 lg:py-20">
              {/* Left copy */}
              <div className="text-white">
                <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
                  Still unsure?
                  <br />
                  <span className="text-teal-200">Let's talk strategy.</span>
                </h2>

                <p className="text-white/80 text-lg max-w-xl leading-relaxed mb-8">
                  Book a free 30-minute consultation. We’ll look at your current
                  setup and tell you exactly which plan fits your roadmap.
                </p>

                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://calendly.com/mail-inspecq/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-full bg-white text-teal-900 px-8 py-4 text-base font-bold shadow-lg hover:bg-teal-50 transition transform hover:-translate-y-1"
                  >
                    Schedule Consultation
                  </a>
                  <Link
                    to="/contact"
                    className="inline-flex items-center rounded-full border border-white/30 text-white px-8 py-4 text-base font-bold hover:bg-white/10 transition"
                  >
                    Contact Sales
                  </Link>
                </div>
              </div>

              {/* Right illustration */}
              <div className="relative hidden lg:block">
                <img
                  src={consultationIllustration}
                  alt="Consultation illustration"
                  className="w-full max-w-md mx-auto drop-shadow-2xl"
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