import { Link } from "react-router-dom";
import consultationIllustration from "../assets/consultation-illustration.svg";
import consultationBg from "../assets/consultation-bg.svg";
import solutionBg from "../assets/solution-bg.svg";
import solBg2 from "../assets/sol-bg-2.svg";
import solBg3 from "../assets/sol-bg-3.svg";

import {
  Building2,
  Smartphone,
  Globe,
  ShoppingCart,
  Heart,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Users,
  Grid,
  Target,
} from "lucide-react";

const INDUSTRIES = [
  {
    icon: ShoppingCart,
    title: "E-commerce & Retail",
    description:
      "Deliver fast, secure, and high converting shopping experiences with QA that covers checkout flows, payment gateways, mobile performance, and inventory accuracy.",
    challenges: [
      "High traffic volumes",
      "Payment security",
      "Mobile optimization",
      "Inventory sync",
    ],
    solutions: [
      "Load testing for peak seasons",
      "PCI compliance testing",
      "Cross-device compatibility",
      "Real-time data validation",
    ],
    color: "bg-blue-500",
  },
  {
    icon: Heart,
    title: "Healthcare & Life Sciences",
    description:
      "Ensure patient-safe, compliant, and reliable healthcare systems with QA focused on HIPAA readiness, secure data handling, clinical workflow validation, and seamless integrations.",
    challenges: [
      "HIPAA compliance",
      "Patient data security",
      "Integration complexity",
      "Regulatory requirements",
    ],
    solutions: [
      "Security testing",
      "Compliance validation",
      "API testing",
      "Audit trail verification",
    ],
    color: "bg-red-500",
  },
  {
    icon: DollarSign,
    title: "Financial Services",
    description:
      "Build trust with accurate, secure, and high-performance financial platforms through QA that validates transactions, APIs, compliance workflows, and real-time processing.",
    challenges: [
      "Transaction accuracy",
      "Real-time processing",
      "Regulatory compliance",
      "Fraud prevention",
    ],
    solutions: [
      "Precision testing",
      "Performance optimization",
      "Security audits",
      "Compliance testing",
    ],
    color: "bg-green-500",
  },
  {
    icon: Building2,
    title: "Enterprise Software",
    description:
      "Improve stability and scalability across complex ERP, CRM, and business-critical systems with QA that validates integrations, data flows, role-based access, and performance.",
    challenges: [
      "Complex integrations",
      "Scalability requirements",
      "Legacy system compatibility",
      "User adoption",
    ],
    solutions: [
      "Integration testing",
      "Performance testing",
      "Migration testing",
      "Usability testing",
    ],
    color: "bg-purple-500",
  },
  {
    icon: Smartphone,
    title: "Mobile & Gaming",
    description:
      "Deliver smooth, crash-free mobile and gaming experiences with QA that covers device fragmentation, performance profiling, gameplay interactions, and store compliance.",
    challenges: [
      "Device fragmentation",
      "Performance optimization",
      "User engagement",
      "App store approval",
    ],
    solutions: [
      "Device testing",
      "Performance profiling",
      "UX testing",
      "Store compliance",
    ],
    color: "bg-orange-500",
  },
  {
    icon: Globe,
    title: "SaaS & Cloud",
    description:
      "Increase reliability and uptime for cloud-native apps with QA that validates multi-tenancy, scalability, API stability, and real-world performance under dynamic workloads.",
    challenges: [
      "Multi-tenancy",
      "Auto-scaling",
      "Data isolation",
      "Service reliability",
    ],
    solutions: [
      "Cloud testing",
      "Scalability testing",
      "Security testing",
      "Monitoring setup",
    ],
    color: "bg-teal-900",
  },
];

const COMPANY_SIZE = [
  {
    title: "Startups",
    description:
      "Fast, flexible QA designed to help early-stage teams ship quickly and confidently.",
    features: [
      "Rapid onboarding",
      "Budget-friendly testing plans",
      "Scalable processes as you grow",
      "Agile and sprint-aligned execution",
    ],
    icon: Target,
  },
  {
    title: "Mid-Market",
    description:
      "Structured, end-to-end testing strategies that support expanding teams and products.",
    features: [
      "Process and workflow optimization",
      "Team enablement and training",
      "Test automation & tool integration",
      "Quality metrics and reporting dashboards",
    ],
    icon: Users,
  },
  {
    title: "Enterprise",
    description:
      "Enterprise-grade QA programs built for large, complex, and regulated environments.",
    features: [
      "Custom test frameworks and architecture",
      "Dedicated, long-term QA teams",
      "Governance, compliance, and audit support",
      "24/7 testing coverage and support",
    ],
    icon: Building2,
  },
];

const Solutions = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 overflow-visible">
        <img
          src={solutionBg}
          alt=""
          className="absolute inset-x-0 bottom-0 w-full max-w-none pointer-events-none z-0 opacity-90 object-contain"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center gap-8 sm:gap-10">
            <div className="max-w-3xl mt-8">
              <p className="h1 text-teal-900">
                Tailored Testing Solutions for Every Industry
              </p>
              <p className="body-regular text-gray-600 mt-4">
                We understand that every industry has unique challenges. Our
                specialized testing solutions are designed to meet the specific
                needs of your sector.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
              <Link
                to="/contact?scroll=form"
                className="bg-teal-600 text-white w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base hover:bg-teal-700 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <span>Get Custom Solution</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Solutions */}
      <section className="relative py-12 sm:py-16 overflow-hidden">
        <img
          src={solBg2}
          alt=""
          className="absolute inset-x-0 bottom-0 w-full max-w-none pointer-events-none z-0 opacity-90 object-contain"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="mb-12 sm:mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 md:gap-x-28 items-start">
              <div>
                <div className="inline-flex items-center bg-teal-100 text-gray-800 px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                  <Grid className="h-4 w-4 mr-2 text-gray-600" />
                  Industry-Focused QA Solutions
                </div>

                <p className="h2">Expert Testing Tailored to Your Industry</p>
              </div>

              <div className="md:self-start pt-4 sm:pt-8">
                <p className="body-md text-gray-600 max-w-md text-sm sm:text-base">
                  We align our QA strategy with your industry’s workflows,
                  risks, and user expectations to deliver reliable, scalable,
                  and high-performing software across every touchpoint.
                </p>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {INDUSTRIES.map((industry) => (
              <div
                key={industry.title}
                className="group relative flex flex-col h-full rounded-2xl bg-white/95 border border-teal-50 shadow-sm 
                           hover:shadow-xl hover:border-teal-200 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="p-6 md:p-7 flex flex-col h-full">
                  {/* Icon + Title */}
                  <div className="mb-4 md:mb-5">
                    <div
                      className={`inline-flex items-center justify-center rounded-xl p-3 mb-4 ${
                        industry.color ?? "bg-teal-200"
                      } text-white`}
                    >
                      <industry.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                      {industry.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm md:text-[15px] text-gray-600 leading-relaxed mb-6">
                    {industry.description}
                  </p>

                  {/* Spacer */}
                  <div className="flex-1" />

                  {/* CTA */}
                  <div className="pt-2">
                    <Link
                      to="/services"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full 
                                 bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white 
                                 shadow-sm hover:bg-teal-800 focus-visible:outline-none 
                                 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2
                                 focus-visible:ring-offset-white transition-colors"
                      aria-label={`Explore QA solutions for ${industry.title}`}
                    >
                      <span>Explore Solutions</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-10 sm:mt-12 flex justify-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-full bg-teal-800 px-6 py-3 
                         text-sm md:text-base font-semibold text-white shadow-sm
                         hover:bg-teal-900 focus-visible:outline-none 
                         focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2
                         focus-visible:ring-offset-white transition-colors"
            >
              <span>See All QA Services</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Company Size Solutions */}
      <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
        <img
          src={solBg3}
          alt=""
          className="absolute inset-x-0 bottom-0 w-full max-w-none pointer-events-none z-0 opacity-90 object-contain"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading */}
          <div className="text-center mb-12 sm:mb-16">
            <p className="h2 text-gray-900 mb-4">
              Solutions for Every Company Size
            </p>
            <p className="body-regular text-gray-600 max-w-3xl mx-auto text-sm sm:text-base">
              Whether you&apos;re a startup, mid-market business, or enterprise,
              our QA solutions scale with your product, team, and budget.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
            {COMPANY_SIZE.map((size) => (
              <div
                key={size.title}
                className="flex flex-col h-full rounded-2xl bg-gradient-to-br from-teal-50/40 to-white 
                           border border-teal-100/50 p-6 sm:p-8 text-left relative 
                           hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Icon */}
                <div className="bg-teal-600 backdrop-blur-sm w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-5 sm:mb-6">
                  <size.icon className="h-5 w-5 text-white" />
                </div>

                {/* Title */}
                <p className="h5 text-gray-900 mb-2">{size.title}</p>

                {/* Description */}
                <p className="text-gray-600 text-sm md:text-[15px] mb-5 sm:mb-6">
                  {size.description}
                </p>

                {/* Feature List */}
                <div className="bg-white rounded-xl border border-gray-100 p-5 md:p-6 mb-5 sm:mb-6 flex-1">
                  <ul className="space-y-3">
                    {size.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center text-gray-700 text-sm"
                      >
                        <CheckCircle className="h-4 w-4 text-teal-600 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="mt-auto pt-1">
                  <Link
                    to="/contact"
                    className={[
                      "inline-flex w-full md:w-auto items-center justify-center md:justify-start",
                      "px-6 py-2.5 rounded-full font-medium text-white shadow-sm text-sm sm:text-base",
                      "transition-colors duration-200",
                      size.title === "Enterprise"
                        ? "bg-teal-800 hover:bg-teal-900"
                        : "bg-teal-700 hover:bg-teal-800",
                    ].join(" ")}
                  >
                    Get Started
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
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

export default Solutions;