import React from "react";
import {
  CheckCircle,
  TrendingUp,
  Users,
  Zap,
  Star,
  Code,
  Shield,
  Smartphone,
} from "lucide-react";

const Portfolio = () => {
  const expertise = [
    {
      title: "Web Application Testing",
      description: "Comprehensive testing for modern web applications",
      icon: Code,
      technologies: ["React", "Angular", "Vue.js", "Node.js", "Django"],
      color: "bg-blue-500",
    },
    {
      title: "Mobile App Testing",
      description: "Cross-platform mobile testing expertise",
      icon: Smartphone,
      technologies: ["iOS", "Android", "React Native", "Flutter"],
      color: "bg-green-500",
    },
    {
      title: "API & Backend Testing",
      description: "Robust API and microservices testing",
      icon: Shield,
      technologies: ["REST APIs", "GraphQL", "Microservices", "Databases"],
      color: "bg-purple-500",
    },
  ];

  const teamStats = [
    {
      icon: TrendingUp,
      value: "10+",
      label: "Years Combined Experience",
      color: "text-teal-600",
    },
    {
      icon: Users,
      value: "10",
      label: "Expert QA Engineers",
      color: "text-blue-600",
    },
    {
      icon: Zap,
      value: "50+",
      label: "Technologies Mastered",
      color: "text-purple-600",
    },
    {
      icon: Star,
      value: "100%",
      label: "Quality Commitment",
      color: "text-orange-600",
    },
  ];

  const methodologies = [
    {
      title: "Agile Testing",
      description: "Seamless integration with agile development processes",
      features: [
        "Sprint planning",
        "Continuous testing",
        "Fast feedback loops",
      ],
    },
    {
      title: "Test Automation",
      description: "Modern automation frameworks for efficient testing",
      features: [
        "CI/CD integration",
        "Regression testing",
        "Cross-browser testing",
      ],
    },
    {
      title: "Performance Testing",
      description: "Ensure your application scales under load",
      features: ["Load testing", "Stress testing", "Performance optimization"],
    },
  ];

  const industries = [
    {
      name: "E-commerce",
      icon: "🛒",
      description: "Online stores and marketplaces",
    },
    {
      name: "FinTech",
      icon: "💰",
      description: "Financial applications and platforms",
    },
    {
      name: "HealthTech",
      icon: "🏥",
      description: "Healthcare and medical software",
    },
    {
      name: "EdTech",
      icon: "🎓",
      description: "Educational platforms and tools",
    },
    {
      name: "SaaS",
      icon: "☁️",
      description: "Software as a Service platforms",
    },
    {
      name: "Startups",
      icon: "🚀",
      description: "Early-stage and growing companies",
    },
  ];

  return (
    <section
      id="portfolio"
      className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Expertise & Approach
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We bring deep technical expertise and proven methodologies to
            deliver exceptional quality assurance for your projects.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {teamStats.map((stat, index) => (
            <div key={index} className="text-center">
              <div
                className={`${stat.color} w-12 h-12 mx-auto mb-4 flex items-center justify-center`}
              >
                <stat.icon className="h-8 w-8" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {expertise.map((area, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
            >
              <div className="p-8">
                <div
                  className={`${area.color} w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <area.icon className="h-6 w-6 text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors duration-200">
                  {area.title}
                </h3>
                <p className="text-gray-600 mb-6">{area.description}</p>

                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 text-sm">
                    Technologies:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {area.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Our Testing Methodologies
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We follow industry best practices and modern methodologies to
              ensure comprehensive quality assurance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {methodologies.map((method, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 hover:shadow-lg transition-all duration-300"
              >
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  {method.title}
                </h4>
                <p className="text-gray-600 mb-6">{method.description}</p>
                <ul className="space-y-2">
                  {method.features.map((feature, featureIndex) => (
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

        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Industries We Serve
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ready to work with companies across various industries and
              verticals.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 group"
              >
                <div className="text-3xl mb-3">{industry.icon}</div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  {industry.name}
                </h4>
                <p className="text-gray-600 text-sm">{industry.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-teal-600 to-teal-600 rounded-2xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">
            Ready to Be Our First Success Story?
          </h3>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Join us as we launch our QA agency. Get premium testing services at
            startup-friendly rates and help us build our portfolio of success
            stories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-teal-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors duration-200">
              Start Your Project
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-teal-600 transition-colors duration-200">
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
