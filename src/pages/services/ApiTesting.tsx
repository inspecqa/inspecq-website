import { Link } from "react-router-dom";
import consultationBg from "../../assets/consultation-bg.svg";
import consultationIllustration from "../../assets/consultation-illustration.svg";
import serviceBg from "../../assets/service/service-hero-bg.svg";
import SmoothScrollLink from "../../components/SmoothScrollLink";
import {
  CheckCircle,
  ArrowRight,
  Database,
  Globe,
  Zap,
  Code,
} from "lucide-react";

/* -------------------- Static Config -------------------- */

const BENEFITS = [
  {
    icon: Zap,
    title: "Faster Integrations",
    description:
      "Prevent broken flows between services and third-party systems.",
  },
  {
    icon: Database,
    title: "Data Accuracy",
    description:
      "Validate data consistency, formats, and edge cases across endpoints.",
  },
  {
    icon: Globe,
    title: "Scalable Performance",
    description:
      "See how your APIs behave under real-world load and peak traffic.",
  },
  {
    icon: Code,
    title: "Stable Contracts",
    description:
      "Catch breaking changes early and keep consumers aligned with specs.",
  },
];

const TESTING_TYPES = [
  {
    title: "Functional Testing",
    description: "Ensure your APIs behave exactly as your product expects.",
    icon: CheckCircle,
    features: [
      "Request/response validation",
      "Data format and schema checks",
      "Error and edge case handling",
      "Business logic verification",
    ],
  },
  {
    title: "Performance Testing",
    description:
      "Measure and optimize API performance under realistic conditions.",
    icon: Zap,
    features: [
      "Load and stress testing",
      "Throughput and latency analysis",
      "Bottleneck identification",
      "Response time optimization",
    ],
  },
  {
    title: "Security Testing",
    description: "Reduce risk by hardening your API security posture.",
    icon: Database,
    features: [
      "Authentication & token checks",
      "Authorization validation",
      "Input and payload validation",
      "Injection & common attack prevention",
    ],
  },
  {
    title: "Contract Testing",
    description:
      "Keep microservices, partners, and clients in sync with your APIs.",
    icon: Code,
    features: [
      "Schema and contract validation",
      "Version and backward compatibility",
      "Breaking change detection",
      "Documentation and spec alignment",
    ],
  },
];

const API_TYPES = [
  {
    icon: Globe,
    type: "REST APIs",
    description: "End-to-end testing for RESTful web and mobile backends.",
    features: [
      "HTTP method and route validation",
      "Status code and error mapping",
      "JSON/XML response verification",
      "CRUD operations and workflows",
    ],
    tools: ["Postman", "REST Assured", "Newman", "Insomnia"],
  },
  {
    icon: Globe,
    type: "GraphQL APIs",
    description: "Specialized coverage for modern GraphQL backends.",
    features: [
      "Query and mutation validation",
      "Schema introspection checks",
      "Subscription behaviour testing",
      "Complex, nested response validation",
    ],
    tools: ["GraphQL Playground", "Apollo Studio", "Altair", "GraphiQL"],
  },
  {
    icon: Globe,
    type: "SOAP APIs",
    description: "Robust testing for legacy and enterprise SOAP services.",
    features: [
      "WSDL and contract validation",
      "XML request/response testing",
      "Fault and error handling",
      "WS-Security behaviour checks",
    ],
    tools: ["SoapUI", "Postman", "XMLSpy", "Oxygen XML"],
  },
  {
    icon: Globe,
    type: "Microservices",
    description: "API testing designed for distributed, microservice systems.",
    features: [
      "Inter-service communication flows",
      "Service mesh and routing behaviour",
      "Circuit breaker and retry patterns",
      "Service discovery and dependencies",
    ],
    tools: ["Pact", "WireMock", "Testcontainers", "Spring Cloud Contract"],
  },
];

const PROCESS = [
  {
    step: "1",
    title: "API Analysis",
    description:
      "Review API documentation, contracts, and real usage scenarios.",
  },
  {
    step: "2",
    title: "Test Strategy",
    description:
      "Define coverage, environments, test data, and automation scope.",
  },
  {
    step: "3",
    title: "Test Implementation",
    description:
      "Build automated suites and targeted manual checks where needed.",
  },
  {
    step: "4",
    title: "Execution & Reporting",
    description:
      "Run tests, monitor behaviour, and share clear, actionable reports.",
  },
];

const TOOLS = [
  {
    icon: Globe,
    name: "Postman",
    category: "Testing Platform",
    description: "Design, run, and collaborate on REST and SOAP test suites.",
  },
  {
    icon: Globe,
    name: "REST Assured",
    category: "Java Library",
    description: "Powerful Java DSL for automated REST API testing.",
  },
  {
    icon: Globe,
    name: "Newman",
    category: "CLI Tool",
    description: "CI-friendly CLI runner for Postman collections.",
  },
  {
    icon: Globe,
    name: "SoapUI",
    category: "SOAP Testing",
    description: "Functional and load testing for SOAP and REST services.",
  },
  {
    icon: Globe,
    name: "Pact",
    category: "Contract Testing",
    description: "Consumer-driven contracts for microservices and APIs.",
  },
  {
    icon: Globe,
    name: "WireMock",
    category: "Mock Server",
    description: "HTTP stubs and service virtualization for dependent APIs.",
  },
];

/* -------------------- Background Component -------------------- */

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

/* -------------------- Page Component -------------------- */

const ApiTesting = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-24 lg:py-32 overflow-visible">
        <BackgroundImage src={serviceBg} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 mt-10 sm:mt-16">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Scalable API Testing{" "}
              <span className="block text-teal-700">
                Built for Evolving Systems.
              </span>
            </h1>
            <p className="body-regular text-black-700 max-w-3xl mx-auto mb-8 text-sm sm:text-base">
              Ensure your APIs work flawlessly—fast, secure, and scalable. We
              validate functionality, performance, and integrations so your team
              can ship with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
              <Link
                to="/contact?service=api-testing&scroll=form"
                className="btn-text bg-teal-500 text-white w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full flex items-center justify-center gap-2 hover:bg-teal-600 transition-all duration-200 text-sm sm:text-base"
              >
                <span>Get Started</span>
                <ArrowRight className="h-5 w-5" />
              </Link>

              <SmoothScrollLink
                to="#api-process"
                offset={110}
                className="btn-text bg-white text-black-500 w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full border flex items-center justify-center gap-2 hover:bg-slate-100 transition-all duration-200 text-sm sm:text-base"
              >
                See How It Works
              </SmoothScrollLink>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Why API Testing Matters
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              APIs power every modern application. Our testing keeps them
              reliable as you add features, users, and integrations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {BENEFITS.map((benefit) => (
              <div
                key={benefit.title}
                className="text-center p-6 sm:p-7 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 group"
              >
                <div className="bg-teal-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testing Types */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Our API Testing Services
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Focused, comprehensive coverage without the overhead of building
              everything in-house.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {TESTING_TYPES.map((type) => (
              <div
                key={type.title}
                className="bg-white rounded-xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-teal-600 p-3 rounded-lg mr-4">
                    <type.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                    {type.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-5 sm:mb-6 text-sm sm:text-base">
                  {type.description}
                </p>
                <ul className="space-y-2 sm:space-y-3">
                  {type.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center text-gray-700 text-sm sm:text-base"
                    >
                      <CheckCircle className="h-4 w-4 text-teal-600 mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Types */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              API Types We Test
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              From REST and GraphQL to SOAP and microservices, we test the APIs
              your product depends on every day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {API_TYPES.map((api) => (
              <div
                key={api.type}
                className="bg-gray-50 rounded-xl p-6 sm:p-8 hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-teal-600 p-3 rounded-lg">
                    <api.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                    {api.type}
                  </h3>
                </div>

                <p className="text-gray-600 mb-5 sm:mb-6 text-sm sm:text-base">
                  {api.description}
                </p>

                <div className="mb-5 sm:mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">
                    Testing Focus:
                  </h4>
                  <ul className="space-y-2">
                    {api.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center text-gray-700 text-sm"
                      >
                        <CheckCircle className="h-4 w-4 text-teal-600 mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">
                    Tools We Use:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {api.tools.map((tool) => (
                      <span
                        key={tool}
                        className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-xs sm:text-sm"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              API Testing Stack
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              We combine proven tools and frameworks to deliver stable,
              repeatable API testing at scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {TOOLS.map((tool) => (
              <div
                key={tool.name}
                className="bg-white rounded-xl p-6 sm:p-7 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-teal-600 p-2.5 rounded-lg">
                      <tool.icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {tool.name}
                    </h3>
                  </div>
                  <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-xs">
                    {tool.category}
                  </span>
                </div>
                <p className="text-gray-600 text-sm sm:text-base">
                  {tool.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="api-process" className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Our API Testing Process
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              A structured, repeatable approach that keeps your APIs stable as
              your product and traffic grow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
            {PROCESS.map((step) => (
              <div key={step.step} className="text-center">
                <div className="bg-teal-600 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-white text-xl sm:text-2xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  {step.description}
                </p>
              </div>
            ))}
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
                  Book a 30-Minute API Testing Consultation
                </h2>

                <p className="body-regular mt-4 sm:mt-6 text-white/90 text-base sm:text-lg max-w-2xl">
                  Get a quick review of your current API landscape, discuss pain
                  points, and leave with clear next steps to improve reliability
                  and performance.
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

export default ApiTesting;