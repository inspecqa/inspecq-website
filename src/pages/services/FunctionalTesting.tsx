import { Link } from "react-router-dom";
import SmoothScrollLink from "../../components/SmoothScrollLink";
import consultationIllustration from "../../assets/consultation-illustration.svg";
import consultationBg from "../../assets/consultation-bg.svg";
import serviceBg from "../../assets/service/service-hero-bg.svg";
import serviceIllustration from "../../assets/service/service-illustration.svg";
import serviceBg2 from "../../assets/service/service-bg-2.svg";

import {
  CheckCircle,
  ArrowRight,
  Code2,
  Workflow,
  Layers,
  UserCheck,
  FileSearch,
  ClipboardList,
  PlayCircle,
  BarChart3,
  ShieldCheck,
  Users,
  BadgeCheck,
  BrainCircuit,
  LucideIcon,
} from "lucide-react";

/* -------------------- Static Config -------------------- */

const BENEFITS: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: ShieldCheck,
    title: "Comprehensive Coverage",
    description:
      "We cover every feature, flow, and edge case to guarantee functional consistency across your entire system.",
  },
  {
    icon: Users,
    title: "User-Centric Approach",
    description:
      "We test like real users to validate every journey, not just every click.",
  },
  {
    icon: BadgeCheck,
    title: "Quality Assurance",
    description:
      "Catch and fix issues early to protect your cost, performance, and user trust.",
  },
  {
    icon: BrainCircuit,
    title: "Business Logic Validation",
    description:
      "We verify that your workflows align perfectly with business rules, ensuring accurate data and smooth operations.",
  },
];

const PROCESS_STEPS: {
  icon: LucideIcon;
  step: string;
  title: string;
  description: string;
}[] = [
  {
    icon: FileSearch,
    step: "1",
    title: "Requirements Analysis",
    description:
      "We collaborate with your team to understand product goals, user journeys, and edge cases.",
  },
  {
    icon: ClipboardList,
    step: "2",
    title: "Test Planning",
    description:
      "We design a clear roadmap detailing coverage areas, priorities, and automation scope.",
  },
  {
    icon: PlayCircle,
    step: "3",
    title: "Test Execution",
    description:
      "Our QA engineers run manual and automated test suites across browsers, devices, and integrations, ensuring flawless performance.",
  },
  {
    icon: BarChart3,
    step: "4",
    title: "Reporting & Analysis",
    description:
      "Receive detailed bug reports and actionable insights that help your team fix issues faster and make data-driven improvements.",
  },
];

const TESTING_TYPES: {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
}[] = [
  {
    icon: Code2,
    title: "Unit Testing",
    description:
      "Validate the smallest building blocks to ensure stable foundations.",
    features: [
      "Code coverage analysis",
      "Automated test execution",
      "Continuous integration",
    ],
  },
  {
    icon: Workflow,
    title: "Integration Testing",
    description:
      "We ensure seamless communication between modules, APIs, and services.",
    features: ["API testing", "Database integration", "Third-party services"],
  },
  {
    icon: Layers,
    title: "System Testing",
    description:
      "Simulate full user journeys to guarantee your app performs as expected in real conditions.",
    features: ["User workflows", "Business scenarios", "Cross-browser testing"],
  },
  {
    icon: UserCheck,
    title: "User Acceptance Testing",
    description:
      "Empower stakeholders to validate the product before launch and sign off with confidence.",
    features: [
      "Stakeholder involvement",
      "Real-world scenarios",
      "Sign-off criteria",
    ],
  },
];

/* -------------------- Reusable Components -------------------- */

const BackgroundImage = ({
  src,
  overlay = "bg-white/40",
}: {
  src: string;
  overlay?: string;
}) => (
  <div className="absolute inset-0 z-0">
    <img src={src} alt="" className="w-full h-full object-cover opacity-90" />
    <div className={`absolute inset-0 ${overlay} backdrop-blur-sm`} />
  </div>
);

const BenefitCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) => (
  <li className="flex items-start">
    <div className="bg-teal-600 w-10 h-10 rounded-lg flex items-center justify-center mr-4 shrink-0">
      <Icon className="h-5 w-5 text-white" />
    </div>
    <div>
      <h3 className="body-regular font-bold text-gray-900 mb-1">{title}</h3>
      <p className="text-gray-600 body-regular leading-relaxed">
        {description}
      </p>
    </div>
  </li>
);

const TestingTypeCard = ({
  icon: Icon,
  title,
  description,
  features,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
}) => (
  <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-300">
    <div className="flex items-center mb-4">
      <div className="bg-teal-600 w-10 h-10 rounded-lg flex items-center justify-center mr-4">
        <Icon className="h-5 w-5 text-white" />
      </div>
      <h5 className="text-gray-900 text-lg font-semibold">{title}</h5>
    </div>
    <p className="body-regular text-gray-600 mb-5 sm:mb-6">{description}</p>
    <div className="bg-gray-50 rounded-xl border border-gray-100 p-4 sm:p-5">
      <ul className="space-y-3">
        {features.map((feature) => (
          <li
            key={feature}
            className="flex items-center text-black-700 text-sm sm:text-base"
          >
            <CheckCircle className="h-4 w-4 text-teal-600 mr-3" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

/* -------------------- Page Component -------------------- */

const FunctionalTesting = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-24 lg:py-32 overflow-visible">
        <BackgroundImage src={serviceBg} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 mt-10 sm:mt-16">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Functional Testing{" "}
              <span className="block text-teal-700">that Scales with You</span>
            </h1>
            <p className="body-regular text-black-700 max-w-3xl mx-auto mb-8 text-sm sm:text-base">
              We test every feature and flow to ensure your product runs
              smoothly and delivers a flawless experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
              <Link
                to="/contact?service=functional-testing&scroll=form"
                className="btn-text bg-teal-500 text-white w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full flex items-center justify-center gap-2 hover:bg-teal-600 transition-all duration-200 text-sm sm:text-base"
              >
                <span>Get Started</span>
                <ArrowRight className="h-5 w-5" />
              </Link>

              <SmoothScrollLink
                to="#ft-process"
                offset={110}
                className="btn-text bg-white text-black-500 w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full border flex items-center justify-center gap-2 hover:bg-slate-100 transition-all duration-200 text-sm sm:text-base"
              >
                See How It Works
              </SmoothScrollLink>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left copy */}
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-teal-900 mb-4">
              Why Choose Our Functional Testing?
            </h2>
            <p className="body-regular text-gray-600 mb-8 sm:mb-10 max-w-md text-sm sm:text-base">
              Our end-to-end testing approach ensures your application functions
              flawlessly across real-world scenarios.
            </p>
            <ul className="space-y-5">
              {BENEFITS.map((benefit) => (
                <BenefitCard key={benefit.title} {...benefit} />
              ))}
            </ul>
          </div>

          {/* Right illustration */}
          <div className="relative max-w-xl w-full mx-auto">
            <img
              src={serviceIllustration}
              alt="Functional testing illustration"
              className="w-full h-auto object-contain pointer-events-none select-none drop-shadow-[0_24px_48px_rgba(2,6,23,0.10)]"
            />
          </div>
        </div>
      </section>

      {/* Testing Types Grid */}
      <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
        <BackgroundImage src={serviceBg2} overlay="bg-white/60" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Types of Functional Testing
            </h2>
            <p className="body-regular text-gray-600 max-w-3xl mx-auto text-sm sm:text-base">
              We cover all aspects of functional testing to ensure comprehensive
              quality assurance.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {TESTING_TYPES.map((type) => (
              <TestingTypeCard key={type.title} {...type} />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section
        id="ft-process"
        className="relative py-12 sm:py-16 lg:py-20 overflow-hidden"
      >
        <BackgroundImage src={serviceBg2} overlay="bg-white/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Functional Testing Process
            </h2>
            <p className="body-regular text-gray-600 max-w-3xl mx-auto text-sm sm:text-base">
              A systematic approach that ensures thorough testing and reliable
              results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {PROCESS_STEPS.map((step, index) => {
              const isPrimary = index === 0;
              return (
                <div
                  key={step.title}
                  className={[
                    "relative rounded-2xl p-6 sm:p-8 shadow-sm transition-all duration-300",
                    isPrimary
                      ? "bg-teal-700 text-white"
                      : "bg-white text-gray-900 border border-gray-200",
                  ].join(" ")}
                >
                  {/* Step badge */}
                  <div
                    className={[
                      "absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold",
                      isPrimary
                        ? "bg-white/20 text-white"
                        : "bg-teal-700 text-white",
                    ].join(" ")}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* Icon */}
                  <div className="flex items-center mb-4">
                    <div
                      className={[
                        "w-10 h-10 rounded-lg flex items-center justify-center mr-4",
                        isPrimary ? "bg-white/20" : "bg-emerald-100",
                      ].join(" ")}
                    >
                      <step.icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Divider */}
                  <div
                    className={`h-px mb-4 ${
                      isPrimary ? "bg-white/30" : "bg-gray-200"
                    }`}
                  />

                  {/* Title + Description */}
                  <h6
                    className={`text-base sm:text-lg font-semibold ${
                      isPrimary ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {step.title}
                  </h6>

                  <p
                    className={[
                      "mt-2 text-sm sm:text-base leading-relaxed",
                      isPrimary ? "text-emerald-50" : "text-gray-600",
                    ].join(" ")}
                  >
                    {step.description}
                  </p>
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
                  30 Minute Free QA Consultation to Clear Your Doubts
                </h2>

                <p className="body-regular mt-4 sm:mt-6 text-white/90 text-base sm:text-lg max-w-2xl">
                  Book a 30-minute consultation to discuss your testing needs
                  and get expert recommendations.
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

export default FunctionalTesting;