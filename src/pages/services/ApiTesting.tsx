import React from "react";
import { Link } from "react-router-dom";
import {
  Cog,
  CheckCircle,
  ArrowRight,
  Database,
  Globe,
  Zap,
  Code,
} from "lucide-react";

const ApiTesting = () => {
  const benefits = [
    {
      icon: Zap,
      title: "Faster Integration",
      description:
        "Ensure seamless integration between different systems and services.",
    },
    {
      icon: Database,
      title: "Data Integrity",
      description:
        "Validate data accuracy and consistency across API endpoints.",
    },
    {
      icon: Globe,
      title: "Scalability Assurance",
      description:
        "Test API performance under various load conditions and usage patterns.",
    },
    {
      icon: Code,
      title: "Contract Validation",
      description:
        "Ensure APIs meet specifications and maintain backward compatibility.",
    },
  ];

  const testingTypes = [
    {
      title: "Functional Testing",
      description: "Validate API functionality and business logic",
      icon: CheckCircle,
      features: [
        "Request/response validation",
        "Data format verification",
        "Error handling testing",
        "Business logic validation",
      ],
    },
    {
      title: "Performance Testing",
      description: "Test API performance and scalability",
      icon: Zap,
      features: [
        "Load testing",
        "Stress testing",
        "Throughput analysis",
        "Response time optimization",
      ],
    },
    {
      title: "Security Testing",
      description: "Ensure API security and data protection",
      icon: Database,
      features: [
        "Authentication testing",
        "Authorization validation",
        "Input validation",
        "SQL injection prevention",
      ],
    },
    {
      title: "Contract Testing",
      description: "Validate API contracts and specifications",
      icon: Code,
      features: [
        "Schema validation",
        "Version compatibility",
        "Breaking change detection",
        "Documentation accuracy",
      ],
    },
  ];

  const apiTypes = [
    {
      type: "REST APIs",
      description: "Comprehensive testing for RESTful web services",
      features: [
        "HTTP methods testing",
        "Status code validation",
        "JSON/XML response testing",
        "CRUD operations",
      ],
      tools: ["Postman", "REST Assured", "Newman", "Insomnia"],
    },
    {
      type: "GraphQL APIs",
      description: "Specialized testing for GraphQL endpoints",
      features: [
        "Query validation",
        "Mutation testing",
        "Schema introspection",
        "Subscription testing",
      ],
      tools: ["GraphQL Playground", "Apollo Studio", "Altair", "GraphiQL"],
    },
    {
      type: "SOAP APIs",
      description: "Testing for SOAP-based web services",
      features: [
        "WSDL validation",
        "XML message testing",
        "Fault handling",
        "WS-Security testing",
      ],
      tools: ["SoapUI", "Postman", "XMLSpy", "Oxygen XML"],
    },
    {
      type: "Microservices",
      description: "Testing for microservice architectures",
      features: [
        "Service mesh testing",
        "Inter-service communication",
        "Circuit breaker testing",
        "Service discovery",
      ],
      tools: ["Pact", "WireMock", "Testcontainers", "Spring Cloud Contract"],
    },
  ];

  const process = [
    {
      step: "1",
      title: "API Analysis",
      description:
        "Analyze API documentation, specifications, and requirements.",
    },
    {
      step: "2",
      title: "Test Strategy",
      description: "Define comprehensive testing strategy and test scenarios.",
    },
    {
      step: "3",
      title: "Test Implementation",
      description: "Create automated test suites and validation scripts.",
    },
    {
      step: "4",
      title: "Execution & Monitoring",
      description:
        "Execute tests and provide continuous monitoring and reporting.",
    },
  ];

  const tools = [
    {
      name: "Postman",
      category: "Testing Platform",
      description: "Comprehensive API testing and collaboration",
    },
    {
      name: "REST Assured",
      category: "Java Library",
      description: "Java-based REST API testing framework",
    },
    {
      name: "Newman",
      category: "CLI Tool",
      description: "Command-line collection runner for Postman",
    },
    {
      name: "SoapUI",
      category: "SOAP Testing",
      description: "Comprehensive SOAP and REST API testing",
    },
    {
      name: "Pact",
      category: "Contract Testing",
      description: "Consumer-driven contract testing",
    },
    {
      name: "WireMock",
      category: "Mock Server",
      description: "HTTP service virtualization and mocking",
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Cog className="h-4 w-4 mr-2" />
              API Testing
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Comprehensive API Testing Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Ensure your APIs are reliable, secure, and performant with our
              comprehensive testing approach covering functionality,
              performance, and security.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-teal-600 text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-teal-700 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <span>Test Your APIs</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/demo"
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-md font-semibold text-lg hover:bg-gray-50 transition-colors duration-200"
              >
                See Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why API Testing is Critical
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              APIs are the backbone of modern applications. Ensure they work
              flawlessly with comprehensive testing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="text-center p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 group"
              >
                <div className="bg-teal-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testing Types */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              API Testing Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive testing approaches to ensure your APIs are robust,
              secure, and performant.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testingTypes.map((type, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-teal-600 p-3 rounded-lg mr-4">
                    <type.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {type.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-6">{type.description}</p>
                <ul className="space-y-3">
                  {type.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-gray-700"
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              API Types We Test
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We have expertise in testing all types of APIs and web services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {apiTypes.map((api, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-8 hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {api.type}
                </h3>
                <p className="text-gray-600 mb-6">{api.description}</p>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Testing Features:
                  </h4>
                  <ul className="space-y-2">
                    {api.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center text-gray-700 text-sm"
                      >
                        <CheckCircle className="h-4 w-4 text-teal-600 mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Tools Used:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {api.tools.map((tool, toolIndex) => (
                      <span
                        key={toolIndex}
                        className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm"
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
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              API Testing Tools
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We use industry-leading tools to ensure comprehensive API testing
              coverage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    {tool.name}
                  </h3>
                  <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-xs">
                    {tool.category}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{tool.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our API Testing Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A systematic approach to ensure comprehensive API testing
              coverage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-teal-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
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
              API Testing Results
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Measurable improvements in API quality and reliability.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-600 mb-2">99.9%</div>
              <div className="text-gray-600">API Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-600 mb-2">50ms</div>
              <div className="text-gray-600">Avg Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-600 mb-2">95%</div>
              <div className="text-gray-600">Test Coverage</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-600 mb-2">1000+</div>
              <div className="text-gray-600">APIs Tested</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Test Your APIs?
          </h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Let our API testing experts ensure your services are reliable,
            secure, and performant.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-teal-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Start API Testing
            </Link>
            <Link
              to="/free-trial"
              className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-teal-600 transition-colors duration-200"
            >
              Try Free Trial
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ApiTesting;
