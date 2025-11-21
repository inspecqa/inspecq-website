import { Link } from "react-router-dom";
import pricingHeaderBg from "../assets/pricing-header-bg.svg";
import consultationBg from "../assets/consultation-bg.svg";
import consultationIllustration from "../assets/consultation-illustration.svg";
import {
  Bug,
  Gauge,
  Smartphone,
  Users,
  Radio,
  CheckCircle,
  ArrowRight,
  Code2,
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Bug,
      title: "Manual Testing",
      description:
        "Our QA engineers perform thorough manual testing to uncover usability issues, edge cases, and functional defects that automated tests may overlook.",
      features: [
        "Functional & Exploratory Testing",
        "UI/UX Validation",
        "Cross-Browser Testing",
        "User Acceptance Testing",
      ],
      color: "bg-blue-500",
      path: "/services/functional-testing",
    },
    {
      icon: Code2,
      title: "Test Automation",
      description:
        "We build reliable, scalable automation frameworks that accelerate release cycles and seamlessly integrate with your CI/CD pipeline.",
      features: [
        "UI & API Automation",
        "Regression Suite Automation",
        "CI/CD Pipeline Integration",
        "Custom Framework Development",
      ],
      color: "bg-teal-500",
      path: "/services/test-automation",
    },
    {
      icon: Radio,
      title: "API Testing",
      description:
        "End-to-end API testing to ensure your backend services are accurate, resilient, secure, and optimized for performance.",
      features: [
        "REST & GraphQL Testing",
        "Integration Testing",
        "Contract Validation",
        "Authentication & Authorization Checks",
      ],
      color: "bg-teal-500",
      path: "/services/api-testing",
    },
    {
      icon: Gauge,
      title: "Performance Testing",
      description:
        "Identify performance bottlenecks and validate that your application can handle peak load without affecting stability or user experience.",
      features: [
        "Load & Stress Testing",
        "Spike & Volume Testing",
        "Scalability Benchmarking",
        "Performance Monitoring Insights",
      ],
      color: "bg-purple-500",
      path: "/services/performance-testing",
    },
    {
      icon: Smartphone,
      title: "Mobile Testing",
      description:
        "Comprehensive testing for iOS and Android apps across real devices and simulators to ensure smooth, high-quality mobile experiences.",
      features: [
        "Cross-Platform Functional Testing",
        "Device & OS Compatibility",
        "Mobile Performance Checks",
        "Real Device Cloud Testing",
      ],
      color: "bg-orange-500",
      path: "/services/mobile-testing",
    },
    {
      icon: Users,
      title: "QA Consulting & Audits",
      description:
        "We evaluate your QA processes, tools, and workflows to identify gaps and deliver actionable recommendations for improving quality and efficiency.",
      features: [
        "QA Strategy Development",
        "Process Audit & Gap Analysis",
        "Tooling Recommendation",
        "Team Training & Mentoring",
        "Best Practices Implementation",
      ],
      color: "bg-red-500",
      path: "/services/qa-consulting-audits",
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-20 overflow-visible">
        <img
          src={pricingHeaderBg}
          alt=""
          className="absolute inset-x-0 bottom-0 w-full max-w-none pointer-events-none z-0 opacity-90 object-contain"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <CheckCircle className="h-4 w-4 mr-2" />
              Built to Inspect. Powered by Quality.
            </div>
            <p className="h1 text-teal-900">
              Comprehensive QA Testing Services
            </p>
            <p className="body-regular text-gray-600 mt-6">
              From manual exploratory testing to automation and performance
              testing, we deliver complete QA coverage that helps your product
              ship faster, break less, and deliver a consistently high-quality
              user experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center">
              <Link
                to="/contact?scroll=form"
                className="bg-teal-600 text-white px-8 py-4 rounded-md button-txt hover:bg-teal-700 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <span>Request a Quote</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gradient-to-br from-white via-teal-50 to-teal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="h2 text-gray-900">Our QA Services</p>
            <p className="body-regular text-gray-600 max-w-3xl mx-auto mt-4">
              Explore the solutions we offer to help you deliver faster, reduce
              defects, and maintain a high-quality user experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-8 hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100 group flex flex-col"
              >
                <div className="mb-6">
                  <div
                    className={`${service.color} p-3 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <service.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {service.title}
                  </h3>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-3 mb-6 bg-teal-50 rounded-xl p-2">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-gray-700"
                    >
                      <CheckCircle className="h-4 w-4 text-teal-600 mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Push "Learn More" to the bottom */}
                <div className="mt-auto pt-6 border-t border-gray-200">
                  <Link
                    to={service.path}
                    className="text-teal-600 font-medium hover:text-teal-700 transition-colors duration-200 flex items-center"
                  >
                    Learn More <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-white via-teal-50 to-teal-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="h2 text-slate-900 mb-4">
              Why Choose{" "}
              <span className="relative inline-block px-1">
                <span className="absolute inset-0 bg-white rounded-md blur-sm"></span>
                <span className="relative text-teal-700 font-semibold tracking-tight">
                  InspecQ
                </span>
              </span>
            </p>
            <p className="body-regular text-slate-600">
              We're not just testers , we're your dedicated quality partners.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-lg shadow-teal-200/40">
                <span className="text-2xl font-bold text-white">10+</span>
              </div>
              <p className="h4 text-slate-900 mb-2">Years of QA Expertise</p>
              <p className="text-slate-600 xs-regular">
                Hands-on experience across SaaS, fintech, and enterprise etc.
                systems.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-lg shadow-teal-200/40">
                <span className="text-2xl font-bold text-white">50+</span>
              </div>

              <p className="h4 text-slate-900 mb-2">Projects Supported</p>
              <p className="text-slate-600 xs-regular">
                Trusted for manual, automation, API, and performance testing.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-lg shadow-teal-200/40">
                <span className="text-2xl font-bold text-white">High</span>
              </div>

              <p className="h4 text-slate-900 mb-2">Defect Detection Rate</p>
              <p className="text-slate-600 xs-regular">
                A structured approach that uncovers critical issues early.
              </p>
            </div>
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

export default Services;
