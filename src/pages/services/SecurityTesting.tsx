import { Link } from "react-router-dom";
import SmoothScrollLink from "../../components/SmoothScrollLink";
import type { ComponentType } from "react";
import {
  Shield,
  CheckCircle,
  ArrowRight,
  Lock,
  AlertTriangle,
  Eye,
  FileCheck,
  Globe,
  KeyRound,
  Smartphone,
  Network,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const SecurityTesting = () => {
  const benefits = [
    {
      icon: Shield,
      title: "Data Protection",
      description:
        "Safeguard sensitive user data and business information from security breaches.",
    },
    {
      icon: Lock,
      title: "Compliance Assurance",
      description:
        "Meet regulatory requirements like GDPR, HIPAA, PCI-DSS, and SOX.",
    },
    {
      icon: AlertTriangle,
      title: "Risk Mitigation",
      description:
        "Identify and address security vulnerabilities before they can be exploited.",
    },
    {
      icon: FileCheck,
      title: "Trust Building",
      description:
        "Build customer confidence with robust security measures and certifications.",
    },
  ];

  const testingService = [
    {
      title: "Penetration Testing",
      description: "Simulate real-world attacks to identify vulnerabilities",
      icon: AlertTriangle,
      features: [
        "Network penetration testing",
        "Web application testing",
        "Social engineering tests",
        "Physical security testing",
      ],
    },
    {
      title: "Vulnerability Assessment",
      description: "Systematic identification of security weaknesses",
      icon: Eye,
      features: [
        "Automated vulnerability scanning",
        "Manual security testing",
        "Code review",
        "Configuration analysis",
      ],
    },
    {
      title: "Security Audits",
      description: "Comprehensive security posture evaluation",
      icon: FileCheck,
      features: [
        "Security policy review",
        "Access control testing",
        "Audit trail analysis",
        "Compliance validation",
      ],
    },
    {
      title: "Authentication Testing",
      description: "Validate identity and access management systems",
      icon: Lock,
      features: [
        "Multi-factor authentication",
        "Session management",
        "Password policy testing",
        "Authorization controls",
      ],
    },
  ];

  const securityAreas = [
    {
      icon: Globe,
      area: "Web Application Security",
      threats: [
        "SQL Injection",
        "Cross-Site Scripting (XSS)",
        "CSRF Attacks",
        "Authentication Bypass",
      ],
      solutions: [
        "Input validation",
        "Output encoding",
        "Secure authentication",
        "Session management",
      ],
    },
    {
      icon: KeyRound,
      area: "API Security",
      threats: [
        "Broken authentication",
        "Excessive data exposure",
        "Rate limiting issues",
        "Injection attacks",
      ],
      solutions: [
        "OAuth implementation",
        "Rate limiting",
        "Input validation",
        "Encryption",
      ],
    },
    {
      icon: Smartphone,
      area: "Mobile App Security",
      threats: [
        "Insecure data storage",
        "Weak cryptography",
        "Insecure communication",
        "Code tampering",
      ],
      solutions: [
        "Secure storage",
        "Strong encryption",
        "Certificate pinning",
        "Code obfuscation",
      ],
    },
    {
      icon: Network,
      area: "Network Security",
      threats: [
        "Man-in-the-middle attacks",
        "Network sniffing",
        "DDoS attacks",
        "Unauthorized access",
      ],
      solutions: [
        "SSL/TLS encryption",
        "Network segmentation",
        "Intrusion detection",
        "Access controls",
      ],
    },
  ];

  const compliance = [
    {
      standard: "GDPR",
      description: "General Data Protection Regulation",
      requirements: [
        "Data privacy",
        "Consent management",
        "Right to be forgotten",
        "Data breach notification",
      ],
    },
    {
      standard: "HIPAA",
      description: "Health Insurance Portability and Accountability Act",
      requirements: [
        "PHI protection",
        "Access controls",
        "Audit logs",
        "Encryption requirements",
      ],
    },
    {
      standard: "PCI-DSS",
      description: "Payment Card Industry Data Security Standard",
      requirements: [
        "Cardholder data protection",
        "Secure networks",
        "Access controls",
        "Regular monitoring",
      ],
    },
    {
      standard: "SOX",
      description: "Sarbanes-Oxley Act",
      requirements: [
        "Financial data integrity",
        "Access controls",
        "Change management",
        "Audit trails",
      ],
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
  
    const TestingServiceCard = ({
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
              Application Security Testing Services You Can Trust
            </h1>
            <p className="body-regular text-black-700 max-w-3xl mx-auto mb-8">
              From penetration testing to compliance audits — secure your web,
              mobile, and API applications with our expert team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact?service=security-testing#contact-form"
                className="btn-text bg-teal-500 text-white w-[244px] h-[56px] rounded-[48px] flex items-center justify-center gap-2 hover:bg-teal-600 transition-all duration-200"
              >
                <span>Secure Your App</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <SmoothScrollLink
                to="#st-services"
                offset={110}
                className="border-1 border-teal-500 bg-white btn-text text-black px-8 py-3 rounded-[48px] hover:bg-white hover:text-teal-600 transition-colors duration-200"
              >
                See Our Services
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
              Why Security Testing is Essential
            </h2>
            <p className="body-regular text-gray-600 mb-10 max-w-md">
              In today’s digital world, a single vulnerability can cost millions
              in lost data and reputation. Security testing isn’t a checkbox,
              it’s your frontline defense.
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

      {/* Testing Services */}
      <section id="st-services" className="relative py-20 overflow-hidden">
        <BackgroundImage
          src="/src/assets/service/service-bg-2.svg"
          overlay="opacity-40"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-gray-900 mb-4">Security Testing Services</h2>
            <p className="body-regular text-gray-600 max-w-3xl mx-auto">
              We provide end-to-end security testing tailored to your business
              needs, from network and application layers to authentication and
              compliance.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testingService.map((service, index) => (
              <TestingServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Security Areas */}
  

      {/* Compliance */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Compliance & Standards
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ensure your applications meet industry regulations and security
              standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {compliance.map((standard, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-medium inline-block mb-4">
                  {standard.standard}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {standard.description}
                </h3>
                <ul className="space-y-2">
                  {standard.requirements.map((requirement, reqIndex) => (
                    <li
                      key={reqIndex}
                      className="flex items-center text-gray-700 text-sm"
                    >
                      <div className="w-2 h-2 bg-teal-600 rounded-full mr-3"></div>
                      {requirement}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Security Testing Impact
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The measurable benefits of comprehensive security testing.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">99%</div>
              <div className="text-gray-600">Vulnerabilities Found</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">85%</div>
              <div className="text-gray-600">Risk Reduction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">100%</div>
              <div className="text-gray-600">Compliance Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">24/7</div>
              <div className="text-gray-600">Monitoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[28px]">
            <img
              src="/src/assets/consultation-bg.svg"
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
                  src="/src/assets/consultation-illustration.svg"
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

export default SecurityTesting;
