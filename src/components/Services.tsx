import { Link } from "react-router-dom";
import { Bug, Zap, Cog, Shield, Sparkles } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Bug,
      title: "Functional Testing",
      description:
        "Comprehensive manual and automated testing to ensure your application works exactly as intended.",
      color: "bg-teal-600",
    },
    {
      icon: Zap,
      title: "Test Automation",
      description:
        "Accelerate your development cycle with intelligent automation frameworks and CI/CD integration.",
      color: "bg-teal-600",
    },
    {
      icon: Cog,
      title: "API Testing",
      description:
        "Validate API functionality, performance, and security to ensure seamless integrations.",
      color: "bg-teal-600",
    },
    {
      icon: Shield,
      title: "QA Consulting & Audits",
      description:
        "Get expert guidance on your QA strategy, processes, and tooling.",
      color: "bg-teal-600",
    },
  ];

  return (
    <section
      id="services"
      className="py-20 bg-gradient-to-br from-white via-blue-50 to-purple-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 md:gap-x-28 items-start">
            {/* Left Title */}
            <div>
              <div className="inline-flex items-center bg-teal-100 text-gray-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4 mr-2 text-gray-600" />
                Comprehensive QA Services
              </div>

              <p className="h2">Everything You Need for Quality Assurance</p>
            </div>

            {/* Right Description */}
            <div className="md:self-start pt-2">
              <p className="body-md text-gray-600 max-w-md leading-relaxed">
                From manual to API testing, we deliver QA solutions that
                accelerate delivery, improve reliability, and ensure every
                release meets your quality goals.
              </p>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <div
              key={i}
              className="relative rounded-2xl p-8 transition-all duration-300 border bg-white border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1"
            >
              {/* Icon + Title */}
              <div className="mb-6">
                <div
                  className={`p-3 rounded-lg w-fit mb-4 ${service.color} text-white`}
                >
                  <service.icon className="h-8 w-8" />
                </div>

                <h3 className="text-xl font-bold text-gray-900">
                  {service.title}
                </h3>
              </div>

              {/* Description */}
              <p className="leading-relaxed text-gray-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            to="/services"
            className="inline-block bg-teal-600 text-white font-medium px-8 py-3 rounded-full hover:bg-teal-700 transition-all duration-300"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
