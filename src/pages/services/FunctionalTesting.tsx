import { Link } from "react-router-dom";
import SmoothScrollLink from "../../components/SmoothScrollLink";
import consultationIllustration from "../../assets/consultation-illustration.svg";
import consultationBg from "../../assets/consultation-bg.svg";
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

// Constants - Move outside component to prevent recreation
const BENEFITS = [
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

const PROCESS_STEPS = [
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
      "Our QA engineers run manual and automated test suites across browsers, devices, and integrations, ensuring flawless performance..",
  },
  {
    icon: BarChart3,
    step: "4",
    title: "Reporting & Analysis",
    description:
      "Receive detailed bug reports and actionable insights that help your team fix issues faster and make data-driven improvements.",
  },
];

const TESTING_TYPES = [
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

// Reusable Components
const BackgroundImage = ({ src, overlay = "bg-white/40" }: { src: string; overlay?: string }) => (
  <div className="absolute inset-0 z-0">
    <img src={src} alt="" className="w-full h-full object-cover opacity-90" />
    <div className={`absolute inset-0 ${overlay} backdrop-blur-sm`} />
  </div>
);

const BenefitCard = ({ icon: Icon, title, description }: { icon: LucideIcon, title: string, description: string }) => (
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

const TestingTypeCard = ({ icon: Icon, title, description, features }: { icon: LucideIcon, title: string, description: string, features: string[] }) => (
  <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300">
    <div className="flex items-center mb-4">
      <div className="bg-teal-600 w-10 h-10 rounded-lg flex items-center justify-center mr-4">
        <Icon className="h-5 w-5 text-white" />
      </div>
      <h5 className="text-gray-900">{title}</h5>
    </div>
    <p className="body-regular text-gray-600 mb-6">{description}</p>
    <div className="bg-gray-50 rounded-xl border border-gray-100 p-4">
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-black-700">
            <CheckCircle className="h-4 w-4 text-teal-600 mr-3" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const FunctionalTesting = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-28 md:py-36 overflow-visible">
        <BackgroundImage src="/src/assets/service/service-hero-bg.svg" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 mt-16">
            <h1 className="text-teal-900 mb-6">
              Functional Testing that Scales with You
            </h1>
            <p className="body-regular text-black-700 max-w-3xl mx-auto mb-8">
              We test every feature and flow to ensure your product runs
              smoothly and delivers a flawless experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact?service=functional-testing#contact-form"
                className="btn-text bg-teal-500 text-white w-[244px] h-[56px] rounded-[48px] flex items-center justify-center gap-2 hover:bg-teal-600 transition-all duration-200"
              >
                <span>Get Started</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <SmoothScrollLink
                to="#ft-process"
                offset={110}
                className="btn-text bg-white text-black-500 w-[229px] h-[56px] rounded-[48px] border flex items-center justify-center gap-2 hover:bg-lightGray transition-all duration-200"
              >
                See How It Works
              </SmoothScrollLink>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative z-10">
            <h2 className="text-teal-900 mb-4">
              Why Choose Our Functional Testing?
            </h2>
            <p className="body-regular text-gray-600 mb-10 max-w-md">
              Our end-to-end testing approach ensures your application functions
              flawlessly across real-world scenarios.
            </p>
            <ul className="space-y-5">
              {BENEFITS.map((benefit, index) => (
                <BenefitCard key={index} {...benefit} />
              ))}
            </ul>
          </div>
          {/* Right illustration */}
          <div className="relative h-[420px] md:h-[520px] lg:h-[560px]">
            <img
              src="/src/assets/service/service-illustration.svg"
              alt=""
              className="absolute top-1/2 right-[-54%] -translate-y-1/2 w-[748px] md:w-[920px] lg:w-[1040px] max-w-none object-contain pointer-events-none select-none drop-shadow-[0_24px_48px_rgba(2,6,23,0.10)]"
            />
          </div>
        </div>
      </section>

      {/* Testing Types Grid */}
      <section className="relative py-20 overflow-hidden">
        <BackgroundImage
          src="/src/assets/service/service-bg-2.svg"
          overlay="opacity-40"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-gray-900 mb-4">Types of Functional Testing</h2>
            <p className="body-regular text-gray-600 max-w-3xl mx-auto">
              We cover all aspects of functional testing to ensure comprehensive
              quality assurance.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TESTING_TYPES.map((type, index) => (
              <TestingTypeCard key={index} {...type} />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="ft-process" className="relative py-20 overflow-hidden">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/service/service-bg-2.svg"
            alt="background"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-gray-900 mb-4">Functional Testing Process</h2>
            <p className="body-regular text-gray-600 max-w-3xl mx-auto">
              A systematic approach that ensures thorough testing and reliable
              results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROCESS_STEPS.map((step, index) => (
              <div
                key={index}
                className={`relative rounded-2xl p-8 shadow-sm transition-all duration-300 ${
                  index === 0
                    ? "bg-teal-700 text-white"
                    : "bg-white text-gray-900 border border-gray-200"
                }`}
              >
                <div
                  className={`absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                    index === 0
                      ? "bg-white/20 text-white"
                      : "bg-teal-700 text-white"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="flex items-center mb-4">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${
                      index === 0 ? "bg-white/20" : "bg-emerald-100"
                    }`}
                  >
                    <step.icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Divider line */}
                <div
                  className={`h-px mb-4 ${
                    index === 0 ? "bg-white/30" : "bg-gray-200"
                  }`}
                ></div>

                <h6
                  className={`${index === 0 ? "text-white" : "text-gray-900"}`}
                >
                  {step.title}
                </h6>

                <p
                  className={`mt-2 ${
                    index === 0 ? "text-emerald-50" : "text-gray-600"
                  } leading-relaxed`}
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
                <h1>
                  30 Minute Free QA
                  <br /> Consultation to clear
                  <br /> your doubts.
                </h1>

                <p className="body-regular mt-6 text-white/90 text-lg max-w-2xl">
                  Book a 30-minute consultation to discuss your testing needs
                  and get expert recommendations.
                </p>

                <a
                  href="https://calendly.com/mail-inspecq/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-text mt-10 inline-flex items-center rounded-full bg-white border border-buttonBorder text-slate-900 px-6 sm:px-8 py-3 sm:py-4 text-base font-medium shadow-md hover:shadow-lg transition"
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
