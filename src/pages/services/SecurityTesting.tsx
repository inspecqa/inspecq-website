import { Link } from "react-router-dom";
import SmoothScrollLink from "../../components/SmoothScrollLink";
import type { ComponentType } from "react";
import consultationIllustration from "../../assets/consultation-illustration.svg";
import consultationBg from "../../assets/consultation-bg.svg";
import serviceHBg from "../../assets/service/service-hero-bg.svg";
import {
  ShieldAlert,
  CheckCircle,
  ArrowRight,
  FileCheck,
  Scale,
  ServerCog,
  Bug,
  ShieldCheck,
  Activity,
} from "lucide-react";

const SecurityTesting = () => {
  const benefits = [
    {
      icon: ShieldAlert,
      title: "Data Protection",
      description:
        "Safeguard PII, financial records, and intellectual property from security breaches.",
    },
    {
      icon: Scale,
      title: "Compliance Assurance",
      description:
        "Seamless readiness for SOC 2, ISO 27001, HIPAA, and GDPR regulations.",
    },
    {
      icon: Activity,
      title: "Risk Mitigation",
      description:
        "Identify critical vulnerabilities (CVEs) before hackers can exploit them.",
    },
    {
      icon: ShieldCheck,
      title: "Brand Trust",
      description:
        "Prove to your enterprise clients that their data is safe with robust security certifications.",
    },
  ];

  // Restructured into the 3 Core Pillars
  const testingService = [
    {
      title: "Application Penetration Testing",
      description:
        "We simulate real-world attacks to find gaps in your specific platform.",
      icon: Bug,
      features: [
        "Web App Pentesting (OWASP Top 10)",
        "Mobile App Pentesting (iOS & Android)",
        "Source Code Review",
        "Social Engineering Simulation",
      ],
    },
    {
      title: "API & Infrastructure Security",
      description:
        "Securing the invisible connections that power your business.",
      icon: ServerCog,
      features: [
        "RESTful & GraphQL API Testing",
        "Cloud Config Review (AWS/Azure)",
        "Network Vulnerability Scanning",
        "Broken Auth & Injection Checks",
      ],
    },
    {
      title: "GRC Advisory",
      description:
        "We don't just find bugs; we prepare your business for enterprise deals.",
      icon: FileCheck,
      features: [
        "SOC 2 (Type I & II) Gap Analysis",
        "ISO 27001:2022 Readiness",
        "Compliance Pre-Audits (HIPAA/PCI)",
        "Security Policy Creation",
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
        "Breach notification",
      ],
    },
    {
      standard: "HIPAA",
      description: "Health Insurance Portability & Accountability",
      requirements: [
        "PHI protection",
        "Access controls",
        "Audit logs",
        "Encryption standards",
      ],
    },
    {
      standard: "PCI-DSS",
      description: "Payment Card Industry Data Security",
      requirements: [
        "Cardholder data protection",
        "Secure networks",
        "Access controls",
        "Regular monitoring",
      ],
    },
    {
      standard: "SOC 2 & ISO",
      description: "Enterprise Security Standards",
      requirements: [
        "Operational readiness",
        "Change management",
        "Risk assessment",
        "Security controls",
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
    <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 h-full">
      <div className="flex items-center mb-4">
        <div className="bg-teal-600 w-10 h-10 rounded-lg flex items-center justify-center mr-4 shrink-0">
          <Icon className="h-5 w-5 text-white" />
        </div>
        <h5 className="text-gray-900 font-bold">{title}</h5>
      </div>
      <p className="body-regular text-gray-600 mb-6 h-12">{description}</p>
      <div className="bg-gray-50 rounded-xl border border-gray-100 p-4">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-center text-black-700 text-sm"
            >
              <CheckCircle className="h-4 w-4 text-teal-600 mr-3 shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-24 lg:py-32 overflow-visible">
        <BackgroundImage src={serviceHBg} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 mt-10 sm:mt-16">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-teal-900 mb-4">
              Application Security Services You Can Trust
            </h1>
            <p className="body-regular text-black-700 max-w-3xl mx-auto mb-8 text-sm sm:text-base">
              From specialized penetration testing to SOC 2 compliance—we secure
              your web, mobile, and API architecture against modern threats.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact?service=security-testing&scroll=form"
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
                View Service Map
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
              Why Security Testing is Non-Negotiable
            </h2>
            <p className="body-regular text-gray-600 mb-10 max-w-md">
              A single vulnerability can cost millions in lost data and
              reputation. We move beyond simple checkboxes to provide active,
              frontline defense.
            </p>
            <ul className="space-y-5">
              {benefits.map((benefit, index) => (
                <BenefitCard key={index} {...benefit} />
              ))}
            </ul>
          </div>
          {/* Right illustration */}
          <div className="relative h-[420px] md:h-[520px] lg:h-[560px]">
            {/* Note: Ideally, use an image related to Security/Shields here 

[Image of Network Security Diagram]
 */}
            <img
              src="/src/assets/service/service-illustration.svg"
              alt=""
              className="absolute top-1/2 right-[-54%] -translate-y-1/2 w-[748px] md:w-[920px] lg:w-[1040px] max-w-none object-contain pointer-events-none select-none drop-shadow-[0_24px_48px_rgba(2,6,23,0.10)]"
            />
          </div>
        </div>
      </section>

      {/* Testing Services (The 3 Pillars) */}
      <section id="st-services" className="relative py-20 overflow-hidden">
        <BackgroundImage
          src="/src/assets/service/service-bg-2.svg"
          overlay="opacity-40"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-gray-900 mb-4">
              Our Security Testing Portfolio
            </h2>
            <p className="body-regular text-gray-600 max-w-3xl mx-auto">
              Comprehensive coverage from code to cloud.
            </p>
          </div>
          {/* Changed to 3 columns for the 3 pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testingService.map((service, index) => (
              <TestingServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Supported Standards
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We ensure your applications meet the world's strictest
              regulations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {compliance.map((standard, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-slate-100"
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
                      <div className="w-1.5 h-1.5 bg-teal-600 rounded-full mr-3"></div>
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
              Security Impact
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Measurable reduction in risk and liability.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-600 mb-2">99%</div>
              <div className="text-gray-600 font-medium">
                Critical Vulns Found
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-600 mb-2">85%</div>
              <div className="text-gray-600 font-medium">Risk Reduction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-600 mb-2">100%</div>
              <div className="text-gray-600 font-medium">Audit Readiness</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-600 mb-2">24/7</div>
              <div className="text-gray-600 font-medium">
                Continuous Monitoring
              </div>
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

            <div className="absolute inset-0 bg-teal-900/90" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center px-6 sm:px-10 lg:px-14 py-12 lg:py-16">
              {/* Left copy */}
              <div className="text-white">
                <h1>Not sure where your security gaps are?</h1>

                <p className="body-regular mt-6 text-white/90 text-lg max-w-2xl">
                  Book a free 30-minute discovery call with our experts to
                  identify vulnerabilities and plan your path to compliance (SOC
                  2, ISO, HIPAA).
                </p>

                <a
                  href="https://calendly.com/mail-inspecq/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-text mt-10 inline-flex items-center rounded-full bg-white border border-buttonBorder text-slate-900 px-6 sm:px-8 py-3 sm:py-4 text-base font-medium shadow-md hover:shadow-lg transition"
                >
                  Schedule Security Audit
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

export default SecurityTesting;