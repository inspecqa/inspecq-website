import consultationIllustration from "../../assets/consultation-illustration.svg";
import consultationBg from "../assets/consultation-bg.svg";
import {
  Award,
  Clock,
  Target,
  CheckCircle,
  Linkedin,
  Twitter,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Users,
} from "lucide-react";

const About = () => {
  const teamMembers = [
    {
      name: "Sadia Islam",
      role: "Chief Technology Officer",
      experience: "12+ years",
      specialties: ["Test Strategy", "Quality Leadership", "DevOps"],
      image:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      certifications: ["ISTQB Expert", "AWS Solutions Architect"],
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Rifat Ara Nawshin",
      role: "Head of Automation",
      experience: "10+ years",
      specialties: ["Test Automation", "Framework Design", "CI/CD"],
      image:
        "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400",
      certifications: ["Selenium Expert", "Docker Certified"],
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Humayra Himi",
      role: "Security Testing Lead",
      experience: "8+ years",
      specialties: ["Security Testing", "Penetration Testing", "Compliance"],
      image:
        "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400",
      certifications: ["CISSP", "CEH", "OSCP"],
      linkedin: "#",
      twitter: "#",
    },
  ];

  const stats = [
    {
      icon: Users,
      value: "20+",
      label: "Testing Experts",
      color: "bg-teal-500",
    },
    {
      icon: Award,
      value: "10+",
      label: "Years Experience",
      color: "bg-blue-500",
    },
    {
      icon: Clock,
      value: "24/7",
      label: "Global Support",
      color: "bg-purple-500",
    },
    {
      icon: Target,
      value: "99%",
      label: "Client Satisfaction",
      color: "bg-orange-500",
    },
  ];

  const values = [
    {
      title: "Quality First",
      description:
        "We never compromise on quality. Every test, every process, every deliverable meets our highest standards.",
      icon: ShieldCheck,
    },
    {
      title: "Innovation Driven",
      description:
        "We stay ahead of the curve with cutting-edge testing tools and methodologies.",
      icon: Cpu,
    },
    {
      title: "Client Success",
      description:
        "Your success is our success. We partner with you to achieve your quality goals.",
      icon: Users,
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section
        aria-label="Our Story section"
        className="relative isolate overflow-hidden py-20 md:py-28 bg-gradient-to-br from-slate-50 to-white z-0"
      >
        {/* Background grid texture */}
        <img
          src="/src/assets/about-hero-bg.svg"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30
               [mask-image:radial-gradient(70%_70%_at_50%_50%,#000_60%,transparent_100%)] z-0"
        />

        {/* Right-side illustration (decorative) */}
        <img
          src="/src/assets/about-us-illustration.svg"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="pointer-events-none select-none absolute -right-8 bottom-0 h-[36vh] max-h-[520px] w-auto opacity-95
               sm:h-[42vh] md:-right-6 md:h-[48vh] lg:-right-2 lg:h-[56vh] z-0"
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 max-w-3xl text-center md:text-left">
            <div className="mb-6 inline-flex items-center rounded-full bg-teal-100 px-4 py-2 text-sm font-medium text-teal-800">
              <CheckCircle className="mr-2 h-4 w-4" />
              Our Story
            </div>

            <h1 className="mb-6 text-[clamp(2rem,5vw,3.25rem)] font-bold leading-tight text-gray-900">
              Built to Inspect. Powered by Quality.
            </h1>

            <p className="body-regular text-gray-600">
              Founded by experienced QA professionals from leading tech
              companies, we’re launching InspecQ to bring enterprise-level
              testing expertise to startups and growing businesses.
            </p>
          </div>

          {/* Stats strip */}
          <div className="mx-auto max-w-5xl pt-8">
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 rounded-2xl border border-gray-200
                   bg-white/85 p-6 md:p-8 shadow-sm backdrop-blur-sm md:divide-x md:divide-gray-200"
            >
              {[
                { stat: "20+", label: "Testing Experts" },
                { stat: "10+", label: "Years Experience" },
                { stat: "24/7", label: "Global Support" },
                { stat: "99%", label: "Client Satisfaction" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center md:items-start md:text-left md:px-6 lg:px-8"
                >
                  <div className="text-3xl font-extrabold tracking-tight text-teal-700">
                    {item.stat}
                  </div>
                  <div className="mt-1 text-sm text-gray-600">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section
        aria-label="Our Core Values section"
        className="relative isolate overflow-hidden py-20 md:py-28 bg-gradient-to-r from-teal-50 to-white"
      >
        {/* Background grid */}
        <img
          src="/src/assets/about-values-bg.svg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center">
          {/* Left text block */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-md">
              The principles that guide everything we do and drive our
              commitment to excellence.
            </p>
          </div>

          {/* Right vertical timeline */}
          <div className="relative border-l-2 border-dashed border-teal-300 pl-8 space-y-10">
            {values.map((value, i) => (
              <div key={i} className="relative flex items-start gap-6">
                <div className="absolute -left-[2.1rem] flex items-center justify-center bg-teal-600 text-white rounded-lg h-10 w-10">
                  <value.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-gray-900 ml-4">{value.title}</h3>
                  <p className="text-gray-600 mt-2">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}

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

export default About;
