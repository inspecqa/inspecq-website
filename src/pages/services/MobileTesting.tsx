import { Link } from "react-router-dom";
import SmoothScrollLink from "../../components/SmoothScrollLink";
import type { ComponentType } from "react";
import consultationIllustration from "../assets/consultation-illustration.svg";
import consultationBg from "../assets/consultation-bg.svg";
import {
  Smartphone,
  CheckCircle,
  ArrowRight,
  Monitor,
  Tablet,
  Globe,
  Zap,
  Target,
  Cpu,
  ShieldCheck,
  Clock,
} from "lucide-react";

const MobileTesting = () => {
  const benefits = [
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
        "Test on hundreds of real devices with different screen sizes, OS versions, and hardware.",
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

  const testingTypes = [
    {
      title: "Functional Testing",
      description:
        "Validate every feature and workflow to ensure your app works exactly as intended on any device.",
      icon: CheckCircle,
      features: [
        "User interface testing",
        "Navigation testing",
        "Input validation",
        "Feature functionality",
      ],
    },
    {
      title: "Compatibility Testing",
      description:
        "Verify your app performs seamlessly across devices, screen sizes, and OS versions.",
      icon: Smartphone,
      features: [
        "Device compatibility",
        "OS version testing",
        "Screen resolution testing",
        "Hardware compatibility",
      ],
    },
    {
      title: "Performance Testing",
      description:
        "Identify and eliminate performance bottlenecks before your users feel them.",
      icon: Zap,
      features: [
        "Load time optimization",
        "Memory usage testing",
        "Battery consumption",
        "Network performance",
      ],
    },
    {
      title: "Usability Testing",
      description:
        "Ensure your app feels intuitive, accessible, and enjoyable for every user.",
      icon: Monitor,
      features: [
        "User experience testing",
        "Accessibility compliance",
        "Gesture testing",
        "Orientation testing",
      ],
    },
  ];

  const platforms = [
    {
      name: "iOS Testing",
      icon: Tablet,
      description: "Guarantee your iPhone and iPad apps meet Apple’s quality benchmarks.",
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
      description: "Ensure consistent experiences across the diverse Android ecosystem.",
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
      devices: [
        "iOS & Android",
        "Web views",
        "Native modules",
        "Platform APIs",
      ],
    },
  ];

  const process = [
    {
      icon: Target,
      step: "1",
      title: "Device Strategy",
      description:
        "Define test devices and coverage based on user demographics.",
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

  const metrics = [
    {
      icon: Smartphone,
      value: "500+",
      label: "Real Devices",
      desc: "Test across a wide range of iOS and Android devices for real-world accuracy.",
    },
    {
      icon: Cpu,
      value: "50+",
      label: "OS Versions",
      desc: "Comprehensive coverage from legacy to the latest operating systems.",
    },
    {
      icon: ShieldCheck,
      value: "100%",
      label: "Store Approval Rate",
      desc: "We ensure every app meets Apple and Google Play standards before submission.",
    },
    {
      icon: Clock,
      value: "24/7",
      label: "Device Lab Access",
      desc: "Continuous access for regression, performance, and release cycle testing.",
    },
  ];

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
  

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-28 md:py-36 overflow-visible">
        <BackgroundImage src="/src/assets/service/service-hero-bg.svg" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 mt-16">
            <h1 className="text-teal-900 mb-6">
              Optimize Your App’s Performance and Reliability Across Every
              Device
            </h1>
            <p className="body-regular text-black-700 max-w-3xl mx-auto mb-8">
              Deliver faster load times, flawless functionality, and consistent
              user experiences through expert mobile testing for iOS, Android,
              and hybrid platforms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact?service=mobile-testing#contact-form"
                className="btn-text bg-teal-500 text-white w-[244px] h-[56px] rounded-[48px] flex items-center justify-center gap-2 hover:bg-teal-600 transition-all duration-200"
              >
                <span>Start Testing</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <SmoothScrollLink
                to="#mt-process"
                offset={110}
                className="border-1 border-teal-500 bg-white btn-text text-black px-8 py-3 rounded-[48px] hover:bg-white hover:text-teal-600 transition-colors duration-200"
              >
                See How It Works
              </SmoothScrollLink>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative z-10">
            <h2 className="text-teal-900 mb-4">
              Why Mobile Testing is Critical
            </h2>
            <p className="body-regular text-gray-600 mb-10 max-w-md">
              Users won’t tolerate slow or buggy apps. With thousands of devices
              and OS versions in the market, mobile testing is essential to keep
              your app performing perfectly.
            </p>
            <ul className="space-y-5">
              {benefits.map((benefit, index) => (
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

      {/* Testing Types */}
      <section className="relative py-20 overflow-hidden">
        <BackgroundImage
          src="/src/assets/service/service-bg-2.svg"
          overlay="opacity-40"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-gray-900 mb-4">Types of Mobile Testing</h2>
            <p className="body-regular text-gray-600 max-w-3xl mx-auto">
              From functionality to performance, we cover every layer of your
              mobile app to ensure quality, stability, and scalability.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testingTypes.map((type, index) => (
              <TestingTypeCard key={index} {...type} />
            ))}
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="relative py-20 overflow-hidden">
        {/* Background image placed inside the section for proper layering */}
        <div className="absolute inset-0 -z-10">
          <BackgroundImage
            src="/src/assets/service/service-bg-2.svg"
            overlay="opacity-30"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Platform Coverage
            </h2>
            <p className="body-regular text-gray-600 max-w-3xl mx-auto">
              We test across all major mobile ecosystems using real devices —
              ensuring reliable results that mirror real-world user behavior.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {platforms.map((platform, index) => {
              const Icon = platform.icon;
              return (
                <article
                  key={index}
                  className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  {/* Header with optional icon */}
                  <div className="flex items-center mb-4">
                    {Icon && (
                      <div className="bg-teal-600 w-10 h-10 rounded-lg flex items-center justify-center mr-3 shrink-0">
                        <Icon
                          className="h-5 w-5 text-white"
                          aria-hidden="true"
                        />
                      </div>
                    )}
                    <h5 className="text-gray-900">{platform.name}</h5>
                  </div>

                  <p className="body-md  text-gray-600 mb-6">
                    {platform.description}
                  </p>

                  {/* Key Features box */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
                    <p className="body-md text-gray-900 mb-3">Key Features:</p>
                    <ul className="space-y-2 leading-relaxed body-md text-gray-700">
                      {platform.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle
                            className="h-5 w-5 text-emerald-600 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Supported Devices pills */}
                  <div>
                    <p className="body-md text-gray-900 mb-3">
                      Supported Devices:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {platform.devices.map((device, deviceIndex) => (
                        <span
                          key={deviceIndex}
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
      <section id="mt-process" className="relative py-20 overflow-hidden">
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
            <h2 className="text-gray-900 mb-4">Mobile Testing Process</h2>
            <p className="body-regular text-gray-600 max-w-3xl mx-auto">
              A proven, structured approach to help your app perform flawlessly
              in the real world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {process.map((step, index) => (
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

      {/* Stats
      {/* <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Mobile Testing Coverage
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive testing across the mobile ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">
                500+
              </div>
              <div className="text-gray-600">Real Devices</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">50+</div>
              <div className="text-gray-600">OS Versions</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">
                100%
              </div>
              <div className="text-gray-600">Store Approval</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">
                24/7
              </div>
              <div className="text-gray-600">Device Access</div>
            </div>
          </div>
        </div>
      </section> */}

      {/* <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="/src/assets/service/service-bg-2.svg"
            alt=""
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Mobile Testing Coverage
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive testing infrastructure that ensures your app
              performs seamlessly—no matter the device, OS, or region.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-md transition-all duration-300 text-center"
              >
                <div className="mx-auto mb-4 w-12 h-12 rounded-xl bg-teal-600 flex items-center justify-center">
                  <metric.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1">
                  {metric.value}
                </h3>
                <p className="text-teal-700 font-semibold mb-2">
                  {metric.label}
                </p>
                <p className="text-gray-600 text-sm">{metric.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

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
                <h1>Ready to Elevate Your Mobile App?</h1>

                <p className="body-regular mt-6 text-white/90 text-lg max-w-2xl">
                  Book a free 30-minute consultation with our experts to ensure
                  your app delivers top performance, flawless functionality, and
                  complete store compliance before launch.
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

export default MobileTesting;
