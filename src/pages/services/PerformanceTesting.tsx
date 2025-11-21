import { Link } from "react-router-dom";
import type { ComponentType } from "react";

import SmoothScrollLink from "../../components/SmoothScrollLink";

import consultationIllustration from "../../assets/consultation-illustration.svg";
import consultationBg from "../../assets/consultation-bg.svg";
import serviceHeroBg from "../../assets/service/service-hero-bg.svg";
import serviceIllustration from "../../assets/service/service-illustration.svg";
import serviceBg2 from "../../assets/service/service-bg-2.svg";

import { SiBlazemeter, SiK6, SiApachejmeter } from "react-icons/si";
import { FaLocust } from "react-icons/fa6";

import {
  BarChart3,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Monitor,
  Target,
  Gauge,
  Code2,
  ClipboardList,
  Activity,
  Zap,
  Cpu,
  Database,
  Users,
  Timer,
  AlertTriangle,
  Server,
} from "lucide-react";

/* -------------------- Config Arrays -------------------- */

const BENEFITS: {
  icon: ComponentType<any>;
  title: string;
  description: string;
}[] = [
  {
    icon: Zap,
    title: "Optimal Performance",
    description:
      "Validate how your system performs under normal, peak, and extreme load conditions.",
  },
  {
    icon: Users,
    title: "User Experience",
    description:
      "Ensure every user interaction feels smooth, responsive, and frustration-free.",
  },
  {
    icon: TrendingUp,
    title: "Scalability Planning",
    description:
      "Discover your system’s true capacity and plan for sustainable growth.",
  },
  {
    icon: Activity,
    title: "Issue Prevention",
    description:
      "Detect and eliminate bottlenecks before they cause downtime or slowdowns.",
  },
];

const TESTING_TYPES: {
  icon: ComponentType<any>;
  title: string;
  description: string;
  features: string[];
}[] = [
  {
    icon: Users,
    title: "Load Testing",
    description:
      "Measure how your application behaves under expected user traffic.",
    features: [
      "Simulate real-world user load",
      "Response time analysis",
      "Throughput measurement",
      "Monitor resource utilization",
    ],
  },
  {
    icon: Activity,
    title: "Stress Testing",
    description:
      "Push your system to its limits to ensure it can recover gracefully.",
    features: [
      "Simulate peak and beyond-peak loads",
      "System stability testing",
      "Recovery testing",
      "Error handling validation",
    ],
  },
  {
    icon: BarChart3,
    title: "Volume Testing",
    description: "Check performance when handling large data sets.",
    features: [
      "Database performance",
      "Data processing speed",
      "Storage capacity testing",
      "Memory usage analysis",
    ],
  },
  {
    icon: TrendingUp,
    title: "Spike Testing",
    description: "Assess how your system handles sudden traffic surges.",
    features: [
      "Traffic spike simulation",
      "Auto-scaling validation",
      "Performance degradation analysis",
      "Recovery time measurement",
    ],
  },
];

const TOOLS: {
  icon: ComponentType<any>;
  name: string;
  description: string;
  capabilities: string[];
}[] = [
  {
    icon: SiApachejmeter,
    name: "JMeter",
    description: "Open-source performance testing tool.",
    capabilities: ["Web applications", "APIs", "Databases", "FTP servers"],
  },
  {
    icon: FaLocust,
    name: "Locust",
    description:
      "Python-based open-source load testing framework for custom user scenarios.",
    capabilities: [
      "Human-readable Python scripts",
      "Distributed and scalable load simulation",
      "Custom user behavior modeling",
      "Excellent for microservice and API testing",
    ],
  },
  {
    icon: SiK6,
    name: "k6",
    description: "Modern, developer-friendly load testing tool.",
    capabilities: [
      "JavaScript scripting",
      "CI/CD integration",
      "Cloud execution",
      "APM and monitoring integrations",
    ],
  },
  {
    icon: SiBlazemeter,
    name: "BlazeMeter",
    description:
      "Cloud-based performance testing platform built on top of JMeter and Taurus.",
    capabilities: [
      "Massive cloud load testing",
      "CI/CD tool integrations",
      "Comprehensive performance dashboards",
      "Collaborative team reporting",
    ],
  },
];

const METRICS: {
  icon: ComponentType<any>;
  name: string;
  description: string;
  target: string;
}[] = [
  {
    icon: Timer,
    name: "Response Time",
    description: "Time to complete a request.",
    target: "< 2 seconds",
  },
  {
    icon: Activity,
    name: "Throughput",
    description: "Requests handled per second.",
    target: "Sized to SLA",
  },
  {
    icon: Zap,
    name: "Latency (p95)",
    description: "95th percentile response time on key flows.",
    target: "< 2s",
  },
  {
    icon: AlertTriangle,
    name: "Error Rate",
    description: "Percentage of failed requests.",
    target: "< 1%",
  },
  {
    icon: Cpu,
    name: "CPU Usage",
    description: "Server CPU utilization.",
    target: "< 80%",
  },
  {
    icon: Server,
    name: "Memory Usage",
    description: "RAM consumption.",
    target: "< 85%",
  },
  {
    icon: Database,
    name: "DB Query Time",
    description: "p95 query execution time.",
    target: "< 200 ms",
  },
  {
    icon: Users,
    name: "Concurrent Users",
    description: "Simultaneous active users.",
    target: "10,000+",
  },
];

const STEPS: {
  icon: ComponentType<any>;
  title: string;
  description: string;
}[] = [
  {
    icon: Target,
    title: "Define & Instrument",
    description:
      "Clarify performance goals, SLAs, and set up monitoring visibility.",
  },
  {
    icon: ClipboardList,
    title: "Design & Prepare",
    description:
      "Build realistic test data, environments, and success criteria.",
  },
  {
    icon: Code2,
    title: "Script & Baseline",
    description:
      "Develop, parameterize, and validate scripts for accurate results.",
  },
  {
    icon: Gauge,
    title: "Execute & Observe",
    description:
      "Run load, stress, and spike tests with real-time observability.",
  },
  {
    icon: TrendingUp,
    title: "Analyze & Optimize",
    description:
      "Identify bottlenecks, implement fixes, and validate improvements.",
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
  <div className="absolute inset-0 -z-10">
    <img
      src={src}
      alt=""
      className="w-full h-full object-cover opacity-90 select-none pointer-events-none"
      aria-hidden="true"
      loading="lazy"
    />
    <div className={`absolute inset-0 ${overlay} backdrop-blur-sm`} />
  </div>
);

const BenefitCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: ComponentType<any>;
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
  icon: ComponentType<any>;
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

/* -------------------- Main Component -------------------- */

const PerformanceTesting = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-24 lg:py-32 overflow-visible">
        <BackgroundImage src={serviceHeroBg} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 mt-10 sm:mt-16">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Optimize Your Application’s{" "}
              <span className="block text-teal-700">Speed and Stability</span>
            </h1>
            <p className="body-regular text-black-700 max-w-3xl mx-auto mb-8 text-sm sm:text-base">
              Deliver fast, reliable, and scalable digital experiences. Our
              performance testing services ensure your web or mobile
              applications stay responsive — even under extreme load.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
              <Link
                to="/contact?service=performance-testing&scroll=form"
                className="btn-text bg-teal-500 text-white w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full flex items-center justify-center gap-2 hover:bg-teal-600 transition-all duration-200 text-sm sm:text-base"
              >
                <span>Start Testing</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <SmoothScrollLink
                to="#pt-process"
                offset={110}
                className="btn-text border border-teal-500 bg-white text-black w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full flex items-center justify-center gap-2 hover:bg-slate-100 hover:text-teal-600 transition-colors duration-200 text-sm sm:text-base"
              >
                See How It Works
              </SmoothScrollLink>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-teal-900 mb-4">
              Why Performance Testing Matters
            </h2>
            <p className="body-regular text-gray-600 mb-8 sm:mb-10 max-w-md text-sm sm:text-base">
              Even a few seconds of delay can cost users, sales, and brand
              trust. Proactive performance testing helps you uncover and fix
              issues before they impact real users.
            </p>
            <ul className="space-y-5">
              {BENEFITS.map((benefit) => (
                <BenefitCard key={benefit.title} {...benefit} />
              ))}
            </ul>
          </div>

          {/* Illustration */}
          <div className="relative max-w-xl w-full mx-auto">
            <img
              src={serviceIllustration}
              alt="Performance testing illustration"
              className="w-full h-auto object-contain pointer-events-none select-none drop-shadow-[0_24px_48px_rgba(2,6,23,0.10)]"
            />
          </div>
        </div>
      </section>

      {/* Testing Types */}
      <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
        <BackgroundImage src={serviceBg2} overlay="bg-white/60" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Types of Performance Testing
            </h2>
            <p className="body-regular text-gray-600 max-w-3xl mx-auto text-sm sm:text-base">
              We use multiple testing strategies to uncover weaknesses and
              optimize your system’s end-to-end performance.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {TESTING_TYPES.map((type) => (
              <TestingTypeCard key={type.title} {...type} />
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
        <BackgroundImage src={serviceBg2} overlay="bg-white/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Performance Testing Tools
            </h2>
            <p className="body-regular text-gray-600 max-w-3xl mx-auto text-sm sm:text-base">
              We combine the best tools in the industry to give you accurate
              insights and actionable recommendations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {TOOLS.map((tool, index) => {
              const featured = index === 0;
              const Icon = tool.icon;
              return (
                <article
                  key={tool.name}
                  className={[
                    "relative rounded-2xl p-6 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:ring-1 hover:ring-teal-200/60",
                    featured
                      ? "bg-teal-700 text-white"
                      : "bg-white text-gray-900 border border-gray-200",
                  ].join(" ")}
                >
                  {/* Number badge */}
                  <div
                    className={[
                      "absolute top-5 sm:top-6 right-5 sm:right-6 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold",
                      featured
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
                        featured ? "bg-white/20" : "bg-teal-100",
                      ].join(" ")}
                      aria-hidden="true"
                    >
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Divider */}
                  <div
                    className={[
                      "h-px mb-4",
                      featured ? "bg-white/30" : "bg-gray-200",
                    ].join(" ")}
                  />

                  {/* Title + description */}
                  <h6 className={featured ? "text-white" : "text-gray-900"}>
                    {tool.name}
                  </h6>
                  <p
                    className={[
                      "mt-2 text-sm sm:text-base leading-relaxed",
                      featured ? "text-emerald-50" : "text-gray-600",
                    ].join(" ")}
                  >
                    {tool.description}
                  </p>

                  {/* Capabilities */}
                  <ul
                    className={[
                      "space-y-2 mt-4",
                      featured ? "text-white" : "text-gray-700",
                    ].join(" ")}
                    role="list"
                  >
                    {tool.capabilities.map((capability) => (
                      <li
                        key={capability}
                        className="flex items-center text-sm sm:text-base"
                        role="listitem"
                      >
                        <CheckCircle
                          className={[
                            "w-5 h-5 mr-3",
                            featured ? "text-white" : "text-teal-700",
                          ].join(" ")}
                          aria-hidden="true"
                        />
                        {capability}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reporting & Monitoring */}
      <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Report & Monitoring Stack
            </h2>
            <p className="body-regular text-gray-600 max-w-3xl mx-auto text-sm sm:text-base">
              We pair every load test with deep observability insights —
              explaining{" "}
              <span className="font-semibold text-slate-800">why</span> issues
              happen, not just{" "}
              <span className="font-semibold text-slate-800">where</span>.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-teal-500 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition">
              <div className="flex items-center mb-4">
                <div className="bg-white w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                  <BarChart3 className="h-5 w-5 text-teal-500" />
                </div>
                <h6 className="text-white text-lg font-semibold">
                  Built-in Reports
                </h6>
              </div>
              <ul className="space-y-2 text-white body-regular text-sm sm:text-base">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-white mr-2 mt-0.5" />
                  JMeter HTML Reports
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-white mr-2 mt-0.5" />
                  k6 Cloud Dashboard
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-white mr-2 mt-0.5" />
                  LoadRunner Analysis
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-white mr-2 mt-0.5" />
                  BlazeMeter Insights
                </li>
              </ul>
            </div>

            <div className="bg-teal-500 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition">
              <div className="flex items-center mb-4">
                <div className="bg-white w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                  <Monitor className="h-5 w-5 text-teal-500" />
                </div>
                <h6 className="text-white text-lg font-semibold">
                  Cloud & Observability Tools
                </h6>
              </div>
              <ul className="space-y-2 text-white body-regular text-sm sm:text-base">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-white mr-2 mt-0.5" />
                  Grafana + Prometheus
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-white mr-2 mt-0.5" />
                  OpenSearch
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-white mr-2 mt-0.5" />
                  Datadog
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-white mr-2 mt-0.5" />
                  Azure Monitor
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
        <BackgroundImage src={serviceBg2} overlay="bg-white/60" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Key Performance Metrics
            </h2>
            <p className="body-regular text-gray-600 max-w-3xl mx-auto text-sm sm:text-base">
              We focus on the numbers that truly define performance quality and
              user experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {METRICS.map((metric) => {
              const Icon = metric.icon;
              return (
                <div
                  key={metric.name}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-teal-100 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                      <Icon
                        className="h-5 w-5 text-teal-700"
                        aria-hidden="true"
                      />
                    </div>
                    <h6 className="font-semibold text-gray-900 text-base">
                      {metric.name}
                    </h6>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    {metric.description}
                  </p>
                  <div className="bg-teal-50 text-teal-700 xs-regular font-medium px-3 py-1 rounded-xl inline-block">
                    Target: {metric.target}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testing Process */}
      <section
        id="pt-process"
        className="relative py-12 sm:py-16 lg:py-20 overflow-hidden"
      >
        <BackgroundImage src={serviceBg2} overlay="bg-white/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Performance Testing Process
            </h2>
            <p className="body-regular text-gray-600 max-w-3xl mx-auto text-sm sm:text-base">
              A structured and transparent process to ensure accurate results
              and clear insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {STEPS.map((step, index) => {
              const isPrimary = index === 0;
              const Icon = step.icon;
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
                  {/* Badge */}
                  <div
                    className={[
                      "absolute top-5 right-5 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold",
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
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Divider */}
                  <div
                    className={`h-px mb-4 ${
                      isPrimary ? "bg-white/30" : "bg-gray-200"
                    }`}
                  />

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
                  Ready to Optimize Your Application’s Performance?
                </h2>

                <p className="body-regular mt-4 sm:mt-6 text-white/90 text-base sm:text-lg max-w-2xl">
                  Book a free 30-minute consultation with our experts. We’ll
                  review your system, identify bottlenecks, and outline a
                  strategy to deliver faster, more reliable user experiences.
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

export default PerformanceTesting;
