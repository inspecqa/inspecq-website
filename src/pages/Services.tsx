import React from "react";
import { Link } from "react-router-dom";
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
        "Our expert QA engineers perform comprehensive manual testing to catch edge cases and usability issues that automated tests might miss.",
      features: [
        "Manual Testing",
        "UI/UX Validation",
        "Exploratory Testing",
        "User Acceptance Testing",
      ],
      color: "bg-blue-500",
      path: "/services/functional-testing",
    },
    {
      icon: Code2,
      title: "Test Automation",
      description:
        "Build robust, scalable test automation frameworks that integrate seamlessly with your CI/CD pipeline for faster releases.",
      features: [
        "Automated Testing",
        "Regression Testing",
        "CI/CD Integration",
        "Custom Frameworks",
      ],
      color: "bg-teal-500",
      path: "/services/test-automation",
    },
    {
      icon: Radio,
      title: "API Testing",
      description:
        "Comprehensive API testing to ensure your backend services are reliable, secure, and performant across all endpoints.",
      features: [
        "REST API Testing",
        "GraphQL Testing",
        "Integration Testing",
        "Contract Validation",
      ],
      color: "bg-teal-500",
      path: "/services/api-testing",
    },
    {
      icon: Gauge,
      title: "Performance Testing",
      description:
        "Identify bottlenecks and ensure your application can handle peak traffic without compromising user experience.",
      features: [
        "Load Testing",
        "Stress Testing",
        "Volume Testing",
        "Scalability Analysis",
      ],
      color: "bg-purple-500",
      path: "/services/performance-testing",
    },
    {
      icon: Smartphone,
      title: "Mobile Testing",
      description:
        "End-to-end testing for iOS and Android apps across real devices and simulators to ensure flawless mobile experiences.",
      features: [
        "Cross-Platform Testing",
        "Device Compatibility",
        "App Store Optimization",
        "Mobile Performance",
      ],
      color: "bg-orange-500",
      path: "/services/mobile-testing",
    },
    {
      icon: Users,
      title: "QA Consulting & Audits",
      description:
        "Get expert guidance on your QA strategy, processes, and tooling. We audit your current setup and provide actionable recommendations.",
      features: [
        "QA Strategy Consulting",
        "Process Audit & Review",
        "Tool Selection & Setup",
        "Team Training & Mentoring",
        "Best Practices Implementation",
      ],
      color: "bg-red-500",
      path: "/services/security-testing",
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <CheckCircle className="h-4 w-4 mr-2" />
              Built to Inspect. Powered by Quality.
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Comprehensive QA Testing Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              From manual exploratory testing to advanced automation and
              performance testing, we provide end-to-end quality assurance for
              modern software teams.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/free-trial"
                className="bg-teal-600 text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-teal-700 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <span>Request a Quote</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-8 hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100 group"
              >
                <div className="mb-6">
                  <div
                    className={`${service.color} p-3 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {service.title}
                  </h3>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-3 mb-6">
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

                <div className="mt-6 pt-6 border-t border-gray-200">
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
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-slate-900 mb-4">
              Why Choose InspecQ?
            </h2>
            <p className="text-lg text-slate-600">
              We're not just testers—we're your quality partners
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl text-teal-600 mb-2">10+</div>
              <h3 className="text-slate-900 mb-2">Years Experience</h3>
              <p className="text-slate-600 text-sm">
                Battle-tested expertise across industries
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl text-teal-600 mb-2">500+</div>
              <h3 className="text-slate-900 mb-2">Projects Delivered</h3>
              <p className="text-slate-600 text-sm">
                From startups to Fortune 500 companies
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl text-teal-600 mb-2">99.9%</div>
              <h3 className="text-slate-900 mb-2">Bug Detection</h3>
              <p className="text-slate-600 text-sm">
                Industry-leading quality standards
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Testing Process?
          </h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Let our experts help you choose the right testing strategy for your
            needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-teal-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Get Expert Consultation
            </Link>
            <Link
              to="/case-studies"
              className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-teal-600 transition-colors duration-200"
            >
              View Case Studies
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
