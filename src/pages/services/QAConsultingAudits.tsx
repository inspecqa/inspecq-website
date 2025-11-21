import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

import consultationIllustration from "../../assets/consultation-illustration.svg";
import consultationBg from "../../assets/consultation-bg.svg";
import serviceBg from "../../assets/service/service-hero-bg.svg";
import serviceBg2 from "../../assets/service/service-bg-2.svg";

import {
  Compass,
  Settings,
  GraduationCap,
  Target,
  Workflow,
  Users,
  ArrowRight,
  CheckCircle,
  BadgeCheck,
  ListChecks,
  Layers,
  Puzzle,
} from "lucide-react";

/* -------------------- Types -------------------- */

interface ConsultingServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  points: string[];
}

/* -------------------- Config -------------------- */

const CONSULTING_SERVICES: ConsultingServiceCardProps[] = [
  {
    icon: Compass,
    title: "QA Strategy Development",
    description:
      "We design a QA strategy aligned with your product goals, team structure, and release cadence.",
    points: [
      "Test coverage and risk-based prioritization.",
      "QA ownership model across teams and roles.",
      "Release gates, sign-off criteria, and readiness checks.",
      "Test data and environment strategy.",
      "Balance between manual, automation, and performance.",
    ],
  },
  {
    icon: Workflow,
    title: "Process Audit & Gap Analysis",
    description:
      "We map your current workflows end-to-end to understand how QA fits into your SDLC.",
    points: [
      "Test planning, execution, and reporting flows.",
      "Defect lifecycle, root-cause trends, and rework.",
      "CI/CD integration and release readiness checks.",
      "Collaboration between QA, Dev, Product, and Ops.",
      "Gaps between expected vs. actual coverage.",
    ],
  },
  {
    icon: Settings,
    title: "Tooling Recommendation",
    description:
      "We evaluate your current tools and recommend a stack that fits your needs today and scales tomorrow.",
    points: [
      "Test management and documentation tools.",
      "Automation frameworks for Web, API, and Mobile.",
      "Performance testing and monitoring options.",
      "CI/CD, reporting, and analytics integrations.",
      "Cost-effective choices that avoid tool sprawl.",
    ],
  },
  {
    icon: GraduationCap,
    title: "Team Training & Mentoring",
    description:
      "We help your team adopt new practices, tools, and ways of working with confidence.",
    points: [
      "Test design techniques and test case quality.",
      "API testing, automation, and performance fundamentals.",
      "CI/CD for QA engineers and shift-left testing.",
      "Mentoring for QA leads and individual contributors.",
      "Playbooks and templates your team can reuse.",
    ],
  },
];

const WORKFLOW = [
  {
    title: "Discovery & Context",
    description:
      "We learn about your product, tech stack, team structure, and current testing approach.",
    detail:
      "Stakeholder interviews, documentation review, and a baseline understanding of your goals and constraints.",
  },
  {
    title: "Deep-Dive Audit",
    description:
      "We analyze your processes, tools, coverage, and collaboration patterns end-to-end.",
    detail:
      "We look at test plans, CI/CD workflows, defect trends, test data, environments, and ownership across teams.",
  },
  {
    title: "Findings & Roadmap",
    description:
      "You receive a structured report with quick wins and a prioritized improvement roadmap.",
    detail:
      "Clear recommendations mapped to effort/impact, with suggested sequencing and ownership.",
  },
  {
    title: "Implementation Support",
    description:
      "We guide your team to adopt new practices, tools, and workflows with minimal disruption.",
    detail:
      "Playbooks, templates, training sessions, and ongoing mentorship to make the change stick.",
  },
];

const IDEAL_FOR = [
  "Teams scaling from ad-hoc testing to a structured QA function.",
  "Startups preparing for investor demos, key launches, or enterprise clients.",
  "Engineering teams struggling with production bugs or unstable releases.",
  "Companies adopting or expanding test automation and performance testing.",
  "Leaders who want visibility into QA effectiveness and ROI.",
];

const DIFFERENTIATORS = [
  "Hands-on QA and engineering experience across SaaS, fintech, and B2B platforms.",
  "Practical, step-by-step recommendations—not generic theory or slideware.",
  "Balanced approach across manual testing, automation, API, and performance.",
  "Right-sized solutions for your team, tech stack, and budget.",
];

const DIFFERENTIATOR_ICONS: LucideIcon[] = [
  BadgeCheck,
  ListChecks,
  Layers,
  Puzzle,
];

/* -------------------- Reusable Components -------------------- */

const BackgroundImage = ({
  src,
  overlay = "bg-white/40",
}: {
  src: string;
  overlay?: string;
}) => (
  <div className="absolute inset-0 -z-10">
    <img
      src={src}
      alt=""
      className="w-full h-full object-cover opacity-90 select-none pointer-events-none"
      loading="lazy"
    />
    <div className={`absolute inset-0 ${overlay} backdrop-blur-sm`} />
  </div>
);

const ConsultingServiceCard = ({
  icon: Icon,
  title,
  description,
  points,
}: ConsultingServiceCardProps) => {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-300">
      {/* Icon + Title */}
      <div className="flex items-center mb-4">
        <div className="bg-teal-600 w-10 h-10 rounded-lg flex items-center justify-center mr-4">
          <Icon className="h-5 w-5 text-white" />
        </div>
        <h5 className="text-gray-900 text-lg font-semibold">{title}</h5>
      </div>

      {/* Description */}
      <p className="body-regular text-gray-600 mb-5 sm:mb-6 text-sm sm:text-base">
        {description}
      </p>

      {/* Points */}
      <div className="bg-gray-50 rounded-xl border border-gray-100 p-4 sm:p-5">
        <ul className="space-y-3">
          {points.map((point) => (
            <li
              key={point}
              className="flex items-center text-black-700 text-sm sm:text-base"
            >
              <CheckCircle className="h-4 w-4 text-teal-600 mr-3" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

/* -------------------- Page Component -------------------- */

const QAConsultingAudits = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-24 lg:py-32 overflow-visible">
        <BackgroundImage src={serviceBg} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 mt-10 sm:mt-16">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              QA Consulting & Audits{" "}
              <span className="block text-teal-700">
                that scale with your team.
              </span>
            </h1>

            <p className="body-regular text-black-700 max-w-3xl mx-auto mb-8 text-sm sm:text-base">
              We evaluate your QA processes, tools, and workflows to identify
              gaps—and deliver a clear, actionable roadmap to improve quality,
              speed, and confidence in every release.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
              <a
                href="https://calendly.com/mail-inspecq/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full sm:w-auto rounded-full bg-teal-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold shadow-sm hover:bg-teal-700 transition-colors"
              >
                <span>Book a QA Consulting Call</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>

              <Link
                to="/services"
                className="inline-flex items-center justify-center w-full sm:w-auto rounded-full border border-slate-200 bg-white px-5 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-medium text-slate-800 hover:border-teal-500 hover:text-teal-700 transition-colors"
              >
                View All QA Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
        <BackgroundImage src={serviceBg2} overlay="bg-white/60" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-4 font-semibold">
              What we cover in your QA Consulting & Audit engagement
            </h2>
            <p className="body-regular text-gray-600 max-w-3xl mx-auto text-sm sm:text-base">
              We take a 360° view of your QA ecosystem—people, process, and
              tooling—to uncover what is working, what is not, and how to fix
              it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {CONSULTING_SERVICES.map((service) => (
              <ConsultingServiceCard
                key={service.title}
                icon={service.icon}
                title={service.title}
                description={service.description}
                points={service.points}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-teal-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center gap-4 sm:gap-6 mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl text-white mb-3 font-semibold">
                How our QA consulting engagement works
              </h2>
              <p className="body-regular text-gray-200 max-w-2xl mx-auto text-sm sm:text-base">
                A focused, time-boxed engagement that gives you clarity,
                confidence, and a concrete action plan.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WORKFLOW.map((step, index) => (
              <div
                key={step.title}
                className="relative rounded-2xl bg-white border border-teal-600 p-5 sm:p-6 flex flex-col h-full"
              >
                <div className="inline-flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wide text-teal-600">
                    Step {index + 1}
                  </span>
                </div>
                <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-xs md:text-sm text-slate-600 mb-2">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="xs-regular flex justify-center items-center mt-10 sm:mt-12 text-gray-200 text-center text-xs sm:text-sm">
            Typical engagement: 2–6 weeks depending on scope and team size.
          </div>
        </div>
      </section>

      {/* Ideal For */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-teal-50 border border-teal-100 px-4 py-1.5 mb-4">
              <Target className="h-4 w-4 text-teal-700" />
              <span className="text-xs font-semibold uppercase tracking-wide text-teal-700">
                Who benefits most
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-3">
              Is QA Consulting &amp; Audits right for you?
            </h2>
            <p className="text-sm md:text-base text-slate-600">
              This service is built for teams who want QA to be a strategic
              advantage—not just a checkbox at the end of a sprint.
            </p>
          </div>

          {/* Card */}
          <div className="max-w-3xl mx-auto">
            <div className="relative rounded-3xl bg-white border border-slate-100 shadow-sm px-6 py-7 md:px-8 md:py-8">
              {/* Accent bar */}
              <div className="absolute -top-1 left-8 right-8 h-1 rounded-full bg-gradient-to-r from-teal-500 via-teal-400 to-emerald-400" />

              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-900">
                    Best for product &amp; engineering teams who:
                  </p>
                  <span className="inline-flex items-center rounded-full bg-slate-50 border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600">
                    Scaling QA • Preparing for bigger releases
                  </span>
                </div>

                <ul className="mt-2 space-y-3 text-sm md:text-base text-slate-700">
                  {IDEAL_FOR.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-teal-50">
                        <Target className="h-3.5 w-3.5 text-teal-700" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why InspecQ */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-14">
            <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-100 px-4 py-1.5 rounded-full mb-4">
              <BadgeCheck className="h-4 w-4 text-teal-700" />
              <span className="text-xs font-semibold text-teal-700 tracking-wide uppercase">
                Why InspecQ
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-4">
              Why partner with InspecQ for QA consulting?
            </h2>

            <p className="text-sm md:text-base text-slate-600">
              We combine hands-on QA delivery experience with structured
              consulting to give you recommendations that are realistic and
              executable with your current team.
            </p>
          </div>

          {/* Differentiators Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DIFFERENTIATORS.map((text, idx) => {
              const Icon = DIFFERENTIATOR_ICONS[idx];
              return (
                <div
                  key={text}
                  className="group relative p-6 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md hover:border-teal-200 transition-all duration-300"
                >
                  {/* Icon */}
                  <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-teal-600 mb-4 shadow-sm">
                    <Icon className="h-5 w-5 text-white" />
                  </div>

                  {/* Text */}
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {text}
                  </p>

                  {/* Hover Accent Line */}
                  <span className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full transition-all duration-300 group-hover:w-full" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20">
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
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight">
                  Ready to get a clear picture of your QA maturity?
                </h2>

                <p className="body-regular mt-4 sm:mt-6 text-white/90 max-w-2xl text-sm sm:text-base">
                  Share a few details about your product and team, and we will
                  review your current QA setup and suggest the best next steps.
                </p>

                <a
                  href="https://calendly.com/mail-inspecq/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-text mt-8 sm:mt-10 inline-flex items-center rounded-full bg-white border border-buttonBorder text-slate-900 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium shadow-md hover:shadow-lg transition"
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

export default QAConsultingAudits;
