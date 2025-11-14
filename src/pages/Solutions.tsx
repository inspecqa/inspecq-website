import { Link } from "react-router-dom";
import consultationIllustration from "../../assets/consultation-illustration.svg";
import consultationBg from "../assets/consultation-bg.svg";
import {
  Building2,
  Smartphone,
  Globe,
  ShoppingCart,
  Heart,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Users,
  Clock,
  Target,
} from "lucide-react";

const Solutions = () => {
  const industries = [
    {
      icon: ShoppingCart,
      title: "E-commerce & Retail",
      description:
        "Ensure seamless shopping experiences with comprehensive testing for online stores, payment systems, and inventory management.",
      challenges: [
        "High traffic volumes",
        "Payment security",
        "Mobile optimization",
        "Inventory sync",
      ],
      solutions: [
        "Load testing for peak seasons",
        "PCI compliance testing",
        "Cross-device compatibility",
        "Real-time data validation",
      ],
      color: "bg-blue-500",
    },
    {
      icon: Heart,
      title: "Healthcare & Life Sciences",
      description:
        "HIPAA-compliant testing solutions for healthcare applications, ensuring patient data security and regulatory compliance.",
      challenges: [
        "HIPAA compliance",
        "Patient data security",
        "Integration complexity",
        "Regulatory requirements",
      ],
      solutions: [
        "Security testing",
        "Compliance validation",
        "API testing",
        "Audit trail verification",
      ],
      color: "bg-red-500",
    },
    {
      icon: DollarSign,
      title: "Financial Services",
      description:
        "Rigorous testing for banking, fintech, and trading platforms with focus on security, accuracy, and performance.",
      challenges: [
        "Transaction accuracy",
        "Real-time processing",
        "Regulatory compliance",
        "Fraud prevention",
      ],
      solutions: [
        "Precision testing",
        "Performance optimization",
        "Security audits",
        "Compliance testing",
      ],
      color: "bg-green-500",
    },
    {
      icon: Building2,
      title: "Enterprise Software",
      description:
        "Scalable testing solutions for large enterprise applications, ERP systems, and business-critical software.",
      challenges: [
        "Complex integrations",
        "Scalability requirements",
        "Legacy system compatibility",
        "User adoption",
      ],
      solutions: [
        "Integration testing",
        "Performance testing",
        "Migration testing",
        "Usability testing",
      ],
      color: "bg-purple-500",
    },
    {
      icon: Smartphone,
      title: "Mobile & Gaming",
      description:
        "Specialized testing for mobile apps, games, and entertainment platforms across all devices and platforms.",
      challenges: [
        "Device fragmentation",
        "Performance optimization",
        "User engagement",
        "App store approval",
      ],
      solutions: [
        "Device testing",
        "Performance profiling",
        "UX testing",
        "Store compliance",
      ],
      color: "bg-orange-500",
    },
    {
      icon: Globe,
      title: "SaaS & Cloud",
      description:
        "Cloud-native testing approaches for SaaS applications, ensuring reliability, scalability, and multi-tenancy.",
      challenges: [
        "Multi-tenancy",
        "Auto-scaling",
        "Data isolation",
        "Service reliability",
      ],
      solutions: [
        "Cloud testing",
        "Scalability testing",
        "Security testing",
        "Monitoring setup",
      ],
      color: "bg-teal-500",
    },
  ];

  const companySize = [
    {
      title: "Startups",
      description:
        "Fast, flexible testing solutions that grow with your business",
      features: [
        "Quick setup",
        "Cost-effective",
        "Scalable approach",
        "Agile methodology",
      ],
      icon: Target,
    },
    {
      title: "Mid-Market",
      description: "Comprehensive testing strategies for growing companies",
      features: [
        "Process optimization",
        "Team training",
        "Tool integration",
        "Quality metrics",
      ],
      icon: Users,
    },
    {
      title: "Enterprise",
      description:
        "Enterprise-grade testing solutions for complex environments",
      features: [
        "Custom frameworks",
        "Dedicated teams",
        "Compliance support",
        "24/7 support",
      ],
      icon: Building2,
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section
        className="py-24 rom-slate-50 to-white relative overflow-visible"
        style={{
          backgroundImage: "url('/src/assets/solution-bg.svg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 items-center gap-12">
            {/* Left Content */}
            <div className="text-center md:text-left">
              <div className="inline-flex items-center bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <CheckCircle className="h-4 w-4 mr-2" />
                Built to Inspect. Powered by Quality.
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Tailored Testing Solutions for Every Industry
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl md:max-w-md mx-auto md:mx-0 mb-10">
                We understand that every industry has unique challenges. Our
                specialized testing solutions are designed to meet the specific
                needs of your sector.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link
                  to="/contact"
                  className="bg-teal-600 text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-teal-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Get Custom Solution</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="flex justify-center md:justify-end">
              <img
                src="/src/assets/solution-illustration.svg"
                alt="Industry Testing Illustration"
                className="w-full max-w-md md:max-w-lg h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Industry Solutions */}
      <section
        className="py-24 relative overflow-hidden"
        style={{
          backgroundImage: "url('/src/assets/sol-bg-2.svg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Industry-Specific Expertise
            </h2>
            <p className="text-lg md:text-base text-gray-600">
              Deep domain knowledge and specialized testing approaches for your
              industry's unique requirements.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="rounded-2xl p-6 md:p-8 bg-gradient-to-br from-teal-50/50 to-white border border-teal-100/40 shadow-[0_1px_0_0_rgba(16,24,40,.04),0_1px_2px_0_rgba(16,24,40,.06)]"
              >
                {/* Icon + Title */}
                <div className="mb-4 md:mb-6">
                  <div
                    className={`${
                      industry.color ?? "bg-teal-600"
                    }/90 text-white rounded-xl p-3 w-fit mb-4`}
                  >
                    <industry.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {industry.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-6">
                  {industry.description}
                </p>

                {/* Inner white info panels */}
                <div className="grid md:grid-cols-2 gap-4 md:gap-5">
                  {/* Key Challenges */}
                  <div className="bg-white rounded-xl border border-gray-100 p-4">
                    <h4 className="font-semibold text-gray-900 mb-3 text-sm">
                      Key Challenges:
                    </h4>
                    <ul className="space-y-2">
                      {industry.challenges.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start text-gray-600 text-sm"
                        >
                          <span className="mt-1 mr-2 inline-block h-2 w-2 rounded-full bg-gray-300" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Our Solutions */}
                  <div className="bg-white rounded-xl border border-gray-100 p-4">
                    <h4 className="font-semibold text-gray-900 mb-3 text-sm">
                      Our Solutions:
                    </h4>
                    <ul className="space-y-2">
                      {industry.solutions.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start text-gray-600 text-sm"
                        >
                          <CheckCircle className="h-4 w-4 text-teal-600 mt-0.5 mr-2" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Learn More */}
                <div className="mt-6">
                  <Link
                    to="/contact"
                    className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition"
                  >
                    Learn More <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-10 flex justify-center">
            <Link
              to="/services"
              className="inline-flex items-center px-5 py-3 rounded-full bg-teal-700 text-white font-medium hover:bg-teal-800 transition"
            >
              Explore Solutions <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Company Size Solutions */}
      <section
        className="py-24 relative overflow-hidden"
        style={{
          backgroundImage: "url('/src/assets/sol-bg-3.svg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Solutions for Every Company Size
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Whether you're a startup or an enterprise, we have the right
              testing approach for your scale and budget.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {companySize.map((size, index) => (
              <div
                key={index}
                className="rounded-2xl bg-gradient-to-br from-teal-50/40 to-white border border-teal-100/50 p-8 hover:shadow-xl transition-all duration-300 text-left relative"
              >
                {/* Icon */}
                <div className="bg-white/70 backdrop-blur-sm w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                  <size.icon className="h-6 w-6 text-teal-700" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {size.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-6">{size.description}</p>

                {/* Feature List */}
                <div className="bg-white rounded-xl border border-gray-100 p-4 mb-8">
                  <ul className="space-y-3">
                    {size.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center text-gray-700 text-sm"
                      >
                        <CheckCircle className="h-4 w-4 text-teal-600 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <Link
                  to="/contact"
                  className={`inline-flex items-center px-6 py-2 rounded-full font-medium text-white bg-teal-700 hover:bg-teal-800 transition-colors duration-200 ${
                    size.title === "Enterprise"
                      ? "bg-teal-800 hover:bg-teal-900"
                      : ""
                  }`}
                >
                  Get Started
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

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

export default Solutions;
