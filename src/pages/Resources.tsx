import React from "react";
import { Link } from "react-router-dom";
import {
  Download,
  ExternalLink,
  BookOpen,
  Video,
  FileText,
  CheckCircle,
  ArrowRight,
  Users,
  Calendar,
} from "lucide-react";

const Resources = () => {
  const resources = [
    {
      id: 1,
      title: "Complete Guide to Test Automation",
      type: "eBook",
      description:
        "Comprehensive 50-page guide covering test automation strategies, frameworks, and best practices.",
      format: "PDF",
      size: "2.5 MB",
      downloads: "12,500+",
      icon: BookOpen,
      category: "Automation",
      featured: true,
    },
    {
      id: 2,
      title: "Mobile Testing Checklist",
      type: "Checklist",
      description:
        "Essential checklist for mobile app testing covering iOS, Android, and cross-platform considerations.",
      format: "PDF",
      size: "850 KB",
      downloads: "8,200+",
      icon: FileText,
      category: "Mobile Testing",
      featured: false,
    },
    {
      id: 3,
      title: "API Testing Masterclass",
      type: "Video Course",
      description:
        "3-hour comprehensive video course on API testing with hands-on examples and real-world scenarios.",
      format: "Video",
      size: "1.2 GB",
      downloads: "5,600+",
      icon: Video,
      category: "API Testing",
      featured: true,
    },
    {
      id: 4,
      title: "Security Testing Framework",
      type: "Template",
      description:
        "Ready-to-use security testing framework with test cases, checklists, and reporting templates.",
      format: "ZIP",
      size: "3.1 MB",
      downloads: "4,800+",
      icon: FileText,
      category: "Security",
      featured: false,
    },
    {
      id: 5,
      title: "Performance Testing Toolkit",
      type: "Toolkit",
      description:
        "Collection of performance testing scripts, tools, and monitoring dashboards for various scenarios.",
      format: "ZIP",
      size: "5.2 MB",
      downloads: "7,300+",
      icon: Download,
      category: "Performance",
      featured: true,
    },
    {
      id: 6,
      title: "QA Metrics Dashboard Template",
      type: "Template",
      description:
        "Excel template for tracking and visualizing key QA metrics and KPIs across projects.",
      format: "XLSX",
      size: "1.8 MB",
      downloads: "9,100+",
      icon: FileText,
      category: "Management",
      featured: false,
    },
  ];

  const webinars = [
    {
      id: 1,
      title: "AI in Test Automation: Future Trends",
      date: "2025-02-15",
      time: "2:00 PM PST",
      duration: "60 minutes",
      speaker: "Sarah Chen, CTO",
      description:
        "Explore how AI and machine learning are transforming test automation and what to expect in the coming years.",
      registrations: "1,200+",
      status: "upcoming",
    },
    {
      id: 2,
      title: "Mobile Testing Best Practices",
      date: "2025-01-20",
      time: "1:00 PM PST",
      duration: "45 minutes",
      speaker: "Michael Rodriguez, Head of Automation",
      description:
        "Learn proven strategies for effective mobile testing across different devices and platforms.",
      registrations: "850+",
      status: "recorded",
    },
    {
      id: 3,
      title: "Security Testing in DevOps",
      date: "2025-01-10",
      time: "3:00 PM PST",
      duration: "50 minutes",
      speaker: "Emily Johnson, Security Lead",
      description:
        "Integrate security testing into your DevOps pipeline for continuous security validation.",
      registrations: "950+",
      status: "recorded",
    },
  ];

  const tools = [
    {
      name: "Test Case Template Generator",
      description:
        "Generate comprehensive test case templates for different testing types",
      type: "Online Tool",
      link: "#",
    },
    {
      name: "Bug Report Template",
      description:
        "Standardized bug report template for consistent issue documentation",
      type: "Template",
      link: "#",
    },
    {
      name: "Test Estimation Calculator",
      description:
        "Calculate testing effort and timeline based on project parameters",
      type: "Calculator",
      link: "#",
    },
    {
      name: "QA Process Maturity Assessment",
      description:
        "Evaluate your QA process maturity and get improvement recommendations",
      type: "Assessment",
      link: "#",
    },
  ];

  const featuredResources = resources.filter((resource) => resource.featured);
  const regularResources = resources.filter((resource) => !resource.featured);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BookOpen className="h-4 w-4 mr-2" />
              Free QA Resources
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              QA Resources & Tools
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Access our comprehensive collection of testing resources,
              templates, guides, and tools to enhance your QA processes and
              skills.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() =>
                  document
                    .getElementById("featured-resources")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-teal-600 text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-teal-700 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <Download className="h-5 w-5" />
                <span>Browse Resources</span>
              </button>
              <Link
                to="/contact"
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-md font-semibold text-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Request Custom Resource
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section id="featured-resources" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Resources
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our most popular and comprehensive resources to accelerate your QA
              journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredResources.map((resource) => (
              <div
                key={resource.id}
                className="bg-gradient-to-br from-teal-50 to-teal-50 rounded-xl p-8 hover:shadow-lg transition-all duration-300 border border-teal-100"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-teal-600 p-3 rounded-lg mr-4">
                    <resource.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <span className="bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {resource.type}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {resource.title}
                </h3>
                <p className="text-gray-600 mb-6">{resource.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                  <span>
                    {resource.format} • {resource.size}
                  </span>
                  <span>{resource.downloads} downloads</span>
                </div>

                <button className="w-full bg-teal-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-teal-700 transition-colors duration-200 flex items-center justify-center space-x-2">
                  <Download className="h-5 w-5" />
                  <span>Download Free</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Resources */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              All Resources
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive collection of testing resources for every aspect of
              QA.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {regularResources.map((resource) => (
              <div
                key={resource.id}
                className="bg-white rounded-xl p-8 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="bg-gray-600 p-3 rounded-lg mr-4">
                      <resource.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {resource.title}
                      </h3>
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {resource.type}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-6">{resource.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                  <span>
                    {resource.format} • {resource.size}
                  </span>
                  <span>{resource.downloads} downloads</span>
                </div>

                <button className="bg-teal-600 text-white px-6 py-2 rounded-md font-medium hover:bg-teal-700 transition-colors duration-200 flex items-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Webinars */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Webinars & Training
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our expert-led webinars and training sessions to stay updated
              with the latest QA trends.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {webinars.map((webinar) => (
              <div
                key={webinar.id}
                className="bg-gray-50 rounded-xl p-8 hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      webinar.status === "upcoming"
                        ? "bg-teal-100 text-teal-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {webinar.status === "upcoming" ? "Upcoming" : "Recorded"}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Users className="h-4 w-4 mr-1" />
                    {webinar.registrations}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {webinar.title}
                </h3>
                <p className="text-gray-600 mb-6">{webinar.description}</p>

                <div className="space-y-2 text-sm text-gray-500 mb-6">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(webinar.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    at {webinar.time}
                  </div>
                  <div>Duration: {webinar.duration}</div>
                  <div>Speaker: {webinar.speaker}</div>
                </div>

                <button
                  className={`w-full px-6 py-3 rounded-md font-semibold transition-colors duration-200 flex items-center justify-center space-x-2 ${
                    webinar.status === "upcoming"
                      ? "bg-teal-600 text-white hover:bg-teal-700"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  <Video className="h-5 w-5" />
                  <span>
                    {webinar.status === "upcoming"
                      ? "Register Now"
                      : "Watch Recording"}
                  </span>
                </button>
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
              Free QA Tools
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Practical tools and calculators to streamline your testing
              processes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tools.map((tool, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {tool.name}
                    </h3>
                    <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm">
                      {tool.type}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 mb-6">{tool.description}</p>

                <button className="text-teal-600 hover:text-teal-700 font-medium flex items-center transition-colors duration-200">
                  Access Tool <ExternalLink className="h-4 w-4 ml-1" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Need Custom Resources?
          </h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Can't find what you're looking for? We can create custom resources,
            templates, and training materials for your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-teal-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <span>Request Custom Resource</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/demo"
              className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-teal-600 transition-colors duration-200"
            >
              Schedule Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;
