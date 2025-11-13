import { Link } from "react-router-dom";
import SmoothScrollLink from "../../components/SmoothScrollLink";
import { BiSupport } from "react-icons/bi";
import { SiSelenium } from "react-icons/si";
import { TbBrandCypress } from "react-icons/tb";
import { SiAppium } from "react-icons/si";
import type { ComponentType } from "react";
import { CheckCircle } from "lucide-react";

import {
  ArrowRight,
  Clock,
  Target,
  GitBranch,
  Code,
  Wrench,
  Compass,
  Drama,
  Globe2,
} from "lucide-react";

const BENEFITS = [
  {
    icon: Clock,
    title: "Faster Execution",
    description:
      "Run thousands of tests automatically, even overnight and deliver builds faster.",
  },
  {
    icon: Target,
    title: "Higher Accuracy",
    description: "Reduce human error with consistent, repeatable test runs.",
  },
  {
    icon: Globe2,
    title: "Better Coverage",
    description:
      "Validate multiple browsers, devices, and APIs simultaneously.",
  },
  {
    icon: GitBranch,
    title: "CI/CD Integration",
    description:
      "Connect your automation suite with Jenkins, GitHub Actions, or GitLab for continuous delivery.",
  },
];

  const FRAMEWORKS = [
    {
      icon: SiSelenium,
      name: "Selenium WebDriver",
      description: "The industry’s go-to for robust web automation.",
      technologies: ["Java", "Python", "C#", "JavaScript"],
      useCases: [
        "Web applications",
        "Cross-browser testing",
        "Regression testing",
      ],
    },
    {
      icon: TbBrandCypress,
      name: "Cypress",
      description: "Lightning-fast and developer-friendly for modern web apps.",
      technologies: ["JavaScript", "TypeScript"],
      useCases: [
        "Single-page applications",
        "API testing",
        "Component testing",
      ],
    },
    {
      icon: Drama,
      name: "Playwright",
      description: "Scalable testing across browsers and devices.",
      technologies: ["JavaScript", "Python", "Java", "C#"],
      useCases: ["Modern web apps", "Mobile testing", "API automation"],
    },
    {
      icon: SiAppium,
      name: "Appium",
      description:
        "Reliable mobile automation for Android, iOS, and hybrid apps.",
      technologies: ["Java", "Python", "JavaScript"],
      useCases: ["iOS apps", "Android apps", "Hybrid applications"],
    },
  ];

const PROCESS_STEPS = [
  {
    icon: Compass,
    step: "1",
    title: "Assessment & Strategy",
    description:
      "Identify automation opportunities, select tools, and define KPIs.",
  },
  {
    icon: Wrench,
    step: "2",
    title: "Framework Setup",
    description:
      "Build a maintainable structure using design patterns like POM and reusable components.",
  },
  {
    icon: Code,
    step: "3",
    title: "Script Development",
    description:
      "Create data-driven, modular test scripts ensuring full coverage.",
  },
  {
    icon: GitBranch,
    step: "4",
    title: "CI/CD Integration",
    description:
      "Enable continuous testing with Jenkins, GitHub Actions, or GitLab pipelines.",
  },
  {
    icon: BiSupport,
    step: "5",
    title: "Maintenance & Support",
    description:
      "Keep your automation suite optimized and up-to-date with evolving releases.",
  },
];


// Reusable Components
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


const FrameworkCard = ({
  icon: Icon,
  name,
  description,
  technologies,
  useCases,
}: {
  icon: ComponentType<any>;
  name: string;
  description: string;
  technologies: string[];
  useCases: string[];
}) => (
  <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300">
    {/* Header */}
    <div className="flex items-center mb-3">
      <div className="bg-teal-600 w-10 h-10 rounded-lg flex items-center justify-center mr-4">
        <Icon className="h-5 w-5 text-white" />
      </div>
      <h4 className="text-gray-900">{name}</h4>
    </div>

    {/* Description */}
    <p className="text-gray-600 mb-6">{description}</p>

    {/* Technologies */}
    <div className="mb-4">
      <h6 className="font-medium text-gray-800 mb-2">Technologies:</h6>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech, index) => (
          <span
            key={index}
            className="bg-teal-50 text-teal-700 px-3 py-1 text-sm rounded-full"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>

    {/* Use Cases */}
    <div className="bg-gray-50 rounded-xl border border-gray-100 p-4">
      <h6 className="font-medium text-gray-800 mb-3">Use Cases:</h6>
      <ul className="space-y-2">
        {useCases.map((usecase, index) => (
          <li key={index} className="flex items-center text-gray-700">
            <CheckCircle className="h-4 w-4 text-teal-600 mr-3" />
            {usecase}
          </li>
        ))}
      </ul>
    </div>
  </div>
);


function AutomationTesting() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-28 md:py-36 overflow-visible">
        <BackgroundImage src="/src/assets/service/service-hero-bg.svg" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 mt-16">
            <h1 className="text-teal-900 mb-6">
              Accelerate Your Testing with Automation
            </h1>
            <p className="body-regular text-black-700 max-w-3xl mx-auto mb-8">
              Tired of manual bottlenecks? Our test automation services help you
              release 80% faster, boost test coverage, and eliminate repetitive
              QA work , so your team can focus on other priorities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact?service=test-automation#contact-form"
                className="btn-text bg-teal-500 text-white w-[244px] h-[56px] rounded-[48px] flex items-center justify-center gap-2 hover:bg-teal-600 transition-all duration-200"
              >
                <span>Start Automation</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <SmoothScrollLink
                to="#ta-process"
                offset={110}
                className="border-1 border-teal-500 bg-white btn-text text-black px-8 py-3 rounded-[48px] hover:bg-white hover:text-teal-600 transition-colors duration-200"
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
            <h2 className="text-teal-900 mb-4">Why Automate Your Testing?</h2>
            <p className="body-regular text-gray-600 mb-10 max-w-md">
              Manual testing can’t keep up with rapid releases. Automation
              ensures faster delivery, higher accuracy, and reduced costs
              without compromising quality.
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
              className="absolute top-1/2 right-[-54%] -translate-y-1/2 w-[748px] md:w-[920px] lg:w-[1040px] max-w-none object-contain pointer-events-none select-none drop-shadow-[0_24px_48px_rgba(2,6,23,0.10)]" />
          </div>
        </div>
      </section>

      {/*  Framework Grid */}
      <section className="relative py-20 overflow-hidden">
        <BackgroundImage
          src="/src/assets/service/service-bg-2.svg"
          overlay="opacity-40" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Automation Frameworks We Use
            </h2>
            <p className="body-regular text-gray-600 max-w-3xl mx-auto">
              We specialize in modern automation frameworks trusted by global QA
              teams. Whether it’s web, API, or mobile testing, we pick the right
              tool for your tech stack.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {FRAMEWORKS.map((framework, index) => (
              <FrameworkCard key={index} {...framework} />
            ))}
          </div>
          <p className="text-center text-sm text-gray-400 mt-10">
            Not sure which framework suits your project? Our experts will help
            you choose the right one based on your product and team structure.
          </p>
        </div>
      </section>

      {/* Process Section */}
      <section id="ta-process" className="relative py-20 overflow-hidden">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/service/service-bg-2.svg"
            alt="background"
            className="w-full h-full object-cover opacity-90" />
          <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-gray-900 mb-4">Automation Testing Process</h2>
            <p className="body-regular text-gray-600 max-w-3xl mx-auto">
              Our proven 5-step automation process ensures your framework is
              scalable, maintainable, and fully integrated into your development
              lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROCESS_STEPS.map((step, index) => (
              <div
                key={index}
                className={`relative rounded-2xl p-8 shadow-sm transition-all duration-300 ${index === 0
                    ? "bg-teal-700 text-white"
                    : "bg-white text-gray-900 border border-gray-200"}`}
              >
                <div
                  className={`absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${index === 0
                      ? "bg-white/20 text-white"
                      : "bg-teal-700 text-white"}`}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="flex items-center mb-4">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${index === 0 ? "bg-white/20" : "bg-emerald-100"}`}
                  >
                    <step.icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Divider line */}
                <div
                  className={`h-px mb-4 ${index === 0 ? "bg-white/30" : "bg-gray-200"}`}
                ></div>

                <h6
                  className={`${index === 0 ? "text-white" : "text-gray-900"}`}
                >
                  {step.title}
                </h6>

                <p
                  className={`mt-2 ${index === 0 ? "text-emerald-50" : "text-gray-600"} leading-relaxed`}
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Global Automation Impact
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Industry research shows that automation testing significantly
              improves delivery speed, accuracy, and overall quality. Here’s
              what top engineering teams experience after adopting automation:
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-600 mb-2">80%</div>
              <div className="text-gray-600">Faster Testing</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-600 mb-2">95%</div>
              <div className="text-gray-600">Test Coverage</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-600 mb-2">60%</div>
              <div className="text-gray-600">Cost Reduction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-600 mb-2">99%</div>
              <div className="text-gray-600">Reliability</div>
            </div>
          </div>
        </div>
        <div className="text-center text-sm text-gray-300 mt-12">
          *Benchmarked from global QA research and automation success metrics
          across top software teams.
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[28px]">
            <img
              src="/src/assets/consultation-bg.svg"
              alt=""
              className="absolute inset-0 w-full h-full object-cover" />

            <div className="absolute inset-0 mix-blend-multiply" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center px-6 sm:px-10 lg:px-14 py-12 lg:py-16">
              {/* Left copy */}
              <div className="text-white">
                <h1>Ready to Automate Your Testing?</h1>

                <p className="body-regular mt-6 text-white/90 text-lg max-w-2xl">
                  Book a free 30-minute consultation with our automation
                  specialists. We’ll analyze your current QA setup and recommend
                  the right strategy to scale quality faster.
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
                  src="/src/assets/consultation-illustration.svg"
                  alt="Consultation illustration"
                  className="w-full h-auto object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AutomationTesting;