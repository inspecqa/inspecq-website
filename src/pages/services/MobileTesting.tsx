import { Link } from "react-router-dom";
import type { ComponentType } from "react";
import SmoothScrollLink from "../../components/SmoothScrollLink";

import consultationIllustration from "../../assets/consultation-illustration.svg";
import consultationBg from "../../assets/consultation-bg.svg";
import serviceHeroBg from "../../assets/service/service-hero-bg.svg";
import serviceIllustration from "../../assets/service/service-illustration.svg";
import serviceBg2 from "../../assets/service/service-bg-2.svg";

import {
  Smartphone,
  CheckCircle,
  ArrowRight,
  Monitor,
  Tablet,
  Globe,
  Zap,
  Target,
} from "lucide-react";

/* -------------------- Static Config -------------------- */

const BENEFITS: {
  icon: ComponentType<any>;
  title: string;
  description: string;
}[] = [
  {
    icon: Globe,
    title: "Cross-Platform Coverage",
    description:
      "Test across iOS, Android, and hybrid platforms to ensure universal compatibility.",
  },
  {
    icon: Monitor,
    title: "Device Fragmentation",
    description:
      "Test on real devices with different screen sizes, OS versions, and hardware profiles.",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description:
      "Optimize battery usage, memory consumption, and app responsiveness.",
  },
  {
    icon: CheckCircle,
    title: "App Store Approval",
    description:
      "Ensure your app meets all store guidelines and approval requirements.",
  },
];

const TESTING_TYPES: {
  icon: ComponentType<any>;
  title: string;
  description: string;
  features: string[];
}[] = [
  {
    icon: CheckCircle,
    title: "Functional Testing",
    description:
      "Validate every feature and workflow to ensure your app works exactly as intended on any device.",
    features: [
      "User interface testing",
      "Navigation testing",
      "Input validation",
      "Feature functionality",
    ],
  },
  {
    icon: Smartphone,
    title: "Compatibility Testing",
    description:
      "Verify your app performs seamlessly across devices, screen sizes, and OS versions.",
    features: [
      "Device compatibility",
      "OS version testing",
      "Screen resolution testing",
      "Hardware compatibility",
    ],
  },
  {
    icon: Zap,
    title: "Performance Testing",
    description:
      "Identify and eliminate performance bottlenecks before your users feel them.",
    features: [
      "Load time optimization",
      "Memory usage testing",
      "Battery consumption",
      "Network performance",
    ],
  },
  {
    icon: Monitor,
    title: "Usability Testing",
    description:
      "Ensure your app feels intuitive, accessible, and enjoyable for every user.",
    features: [
      "User experience testing",
      "Accessibility compliance",
      "Gesture testing",
      "Orientation testing",
    ],
  },
];

const PLATFORMS: {
  name: string;
  icon: ComponentType<any>;
  description: string;
  features: string[];
  devices: string[];
}[] = [
  {
    name: "iOS Testing",
    icon: Tablet,
    description:
      "Guarantee your iPhone and iPad apps meet Apple’s quality benchmarks.",
    features: [
      "iPhone compatibility",
      "iPad optimization",
      "iOS version testing",
      "App Store guidelines",
    ],
    devices: [
      "iPhone 15 Pro",
      "iPhone 14",
      "iPhone SE",
      "iPad Pro",
      "iPad Air",
      "iPad Mini",
    ],
  },
  {
    name: "Android Testing",
    icon: Smartphone,
    description:
      "Ensure consistent experiences across the diverse Android ecosystem.",
    features: [
      "Multiple manufacturers",
      "Android version testing",
      "Google Play compliance",
      "Custom ROM testing",
    ],
    devices: [
      "Samsung Galaxy",
      "Google Pixel",
      "OnePlus",
      "Xiaomi",
      "Huawei",
      "LG",
    ],
  },
  {
    name: "Hybrid App Testing",
    icon: Globe,
    description: "Validate cross-platform apps for both speed and consistency.",
    features: [
      "Cross-platform validation",
      "Native feature testing",
      "Performance optimization",
      "Platform-specific UI",
    ],
    devices: ["iOS & Android", "Web views", "Native modules", "Platform APIs"],
  },
];

const PROCESS_STEPS: {
  icon: ComponentType<any>;
  step: string;
  title: string;
  description: string;
}[] = [
  {
    icon: Target,
    step: "1",
    title: "Device Strategy",
    description:
      "Define test devices and coverage based on your target users and markets.",
  },
  {
    icon: Target,
    step: "2",
    title: "Test Planning",
    description: "Design test cases for real-world usage and edge scenarios.",
  },
  {
    icon: Target,
    step: "3",
    title: "Execution",
    description:
      "Run manual and automated tests on real devices for maximum accuracy.",
  },
  {
    icon: Target,
    step: "4",
    title: "Reporting",
    description:
      "Deliver actionable reports with clear fixes and recommendations.",
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

/* -------------------- Page Component -------------------- */

const MobileTesting = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-24 lg:py-32 overflow-visible">
        <BackgroundImage src={serviceHeroBg} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 mt-10 sm:mt-16">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Optimize Your App’s Performance{" "}
              <span className="block text-teal-700">
                {" "}
                and Reliability Across Every Device
              </span>
            </h1>
            <p className="body-regular text-black-700 max-w-3xl mx-auto mb-8 text-sm sm:text-base">
              Deliver faster load times, flawless functionality, and consistent
              user experiences through expert mobile testing for iOS, Android,
              and hybrid platforms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
              <Link
                to="/contact?service=mobile-testing&scroll=form"
                className="btn-text bg-teal-500 text-white w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full flex items-center justify-center gap-2 hover:bg-teal-600 transition-all duration-200 text-sm sm:text-base"
              >
                <span>Start Testing</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <SmoothScrollLink
                to="#mt-process"
                offset={110}
                className="btn-text border border-teal-500 bg-white text-black-500 w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full flex items-center justify-center gap-2 hover:bg-slate-100 hover:text-teal-600 transition-colors duration-200 text-sm sm:text-base"
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
          {/* Left copy */}
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-teal-900 mb-4">
              Why Mobile Testing is Critical
            </h2>
            <p className="body-regular text-gray-600 mb-8 sm:mb-10 max-w-md text-sm sm:text-base">
              Users will not tolerate slow or buggy apps. With thousands of
              devices and OS versions in the market, mobile testing is essential
              to keep your app performing perfectly.
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
              alt="Mobile testing illustration"
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
              Types of Mobile Testing
            </h2>
            <p className="body-regular text-gray-600 max-w-3xl mx-auto text-sm sm:text-base">
              From functionality to performance, we cover every layer of your
              mobile app to ensure quality, stability, and scalability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {TESTING_TYPES.map((type) => (
              <TestingTypeCard key={type.title} {...type} />
            ))}
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
        <BackgroundImage src={serviceBg2} overlay="bg-white/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Platform Coverage
            </h2>
            <p className="body-regular text-gray-600 max-w-3xl mx-auto text-sm sm:text-base">
              We test across all major mobile ecosystems using real devices —
              ensuring reliable results that mirror real-world user behavior.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {PLATFORMS.map((platform) => {
              const Icon = platform.icon;
              return (
                <article
                  key={platform.name}
                  className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-teal-600 w-10 h-10 rounded-lg flex items-center justify-center mr-3 shrink-0">
                      <Icon className="h-5 w-5 text-white" aria-hidden="true" />
                    </div>
                    <h5 className="text-gray-900 text-lg font-semibold">
                      {platform.name}
                    </h5>
                  </div>

                  <p className="body-regular text-gray-600 mb-6 text-sm sm:text-base">
                    {platform.description}
                  </p>

                  <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
                    <p className="body-regular text-gray-900 mb-3 text-sm sm:text-base">
                      Key Features:
                    </p>
                    <ul className="space-y-2 leading-relaxed body-regular text-gray-700 text-sm sm:text-base">
                      {platform.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <CheckCircle
                            className="h-5 w-5 text-emerald-600 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="body-regular text-gray-900 mb-3 text-sm sm:text-base">
                      Supported Devices:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {platform.devices.map((device) => (
                        <span
                          key={device}
                          className="bg-teal-50 text-teal-800 px-3 py-1 rounded-full text-xs border border-teal-100"
                        >
                          {device}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section
        id="mt-process"
        className="relative py-12 sm:py-16 lg:py-20 overflow-hidden"
      >
        <BackgroundImage src={serviceBg2} overlay="bg-white/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Mobile Testing Process
            </h2>
            <p className="body-regular text-gray-600 max-w-3xl mx-auto text-sm sm:text-base">
              A proven, structured approach to help your app perform flawlessly
              in the real world.
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
                  Ready to Elevate Your Mobile App?
                </h2>

                <p className="body-regular mt-4 sm:mt-6 text-white/90 text-base sm:text-lg max-w-2xl">
                  Book a free 30-minute consultation with our experts to ensure
                  your app delivers top performance, flawless functionality, and
                  complete store compliance before launch.
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

export default MobileTesting;