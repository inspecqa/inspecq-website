import { CheckCircle, Users, Award, Target, Clock } from "lucide-react";
import aboutUsBg from "../assets/about-us-bg.svg";

const stats = [
  {
    icon: Users,
    value: "10+",
    label: "Expert QA Engineers",
    color: "text-teal-300",
  },
  {
    icon: Award,
    value: "10+",
    label: "Years Combined Experience",
    color: "text-blue-300",
  },
  {
    icon: Clock,
    value: "24/7",
    label: "Dedicated Support",
    color: "text-purple-300",
  },
  {
    icon: Target,
    value: "100%",
    label: "Quality Commitment",
    color: "text-orange-300",
  },
];

const approachSteps = [
  "Discover → Understand your goals and challenges.",
  "Strategize → Build a tailored QA roadmap.",
  "Test → Execute functional, automation, and performance tests.",
  "Report → Clear insights with actionable fixes.",
  "Support → Stay with you through release and beyond.",
];

const partnerReasons = [
  "Agile-Ready → We adapt to your sprint cycles.",
  "End-to-End Coverage → From login flows to API stress tests.",
  "Transparent Reporting → No fluff, only actionable insights.",
  "Flexible Engagement → On-demand, part-time, or full-time QA support.",
];

const AboutUs = () => {
  return (
    <section
      id="about-us"
      className="relative overflow-hidden py-16 sm:py-20 md:py-24"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src={aboutUsBg}
          alt=""
          className="absolute inset-x-0 bottom-0 w-full h-full object-cover opacity-90 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B8A86] via-[#1B8A86]/75 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center bg-white/90 text-teal-600 px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-4 backdrop-blur shadow-sm">
            <CheckCircle className="h-4 w-4 mr-2" />
            About InspecQ
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
            Built to Inspect. Powered by Quality.
          </h2>

          <p className="mt-4 text-sm sm:text-base md:text-lg text-white/90">
            Founded by experienced QA professionals, InspecQ helps teams ship
            reliable, high-quality products with confidence—through hands-on
            manual testing, automation, API testing, and performance testing.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-white text-teal-700 px-6 py-2.5 text-sm sm:text-base font-semibold shadow-md hover:bg-teal-50 transition-colors"
            >
              Book a QA Consultation
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center rounded-full border border-white/70 text-white px-6 py-2.5 text-sm sm:text-base font-medium hover:bg-white/20 transition-colors"
            >
              Explore Our Services
            </a>
          </div>
        </div>

        {/* White card with extra spacing */}
        <div className="relative z-20 mt-16 sm:mt-20 md:mt-24 lg:mt-28">
          <div className="mx-auto max-w-6xl rounded-3xl bg-white ring-1 ring-black/5 shadow-[0_20px_60px_rgba(0,0,0,0.18)] p-4 sm:p-6 md:p-8 lg:p-10">
            {/* Approach + Partner Reasons */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
              <div className="rounded-2xl p-5 sm:p-6 md:p-7 bg-gradient-to-br from-slate-100/60 to-teal-100">
                <p className="text-base sm:text-lg font-semibold text-gray-900 mb-5">
                  Our Approach
                </p>
                <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base">
                  {approachSteps.map((step, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl p-5 sm:p-6 md:p-7 bg-gradient-to-br from-teal-100 to-slate-100/60">
                <p className="text-base sm:text-lg font-semibold text-gray-900 mb-5">
                  Why Partner with InspecQ?
                </p>
                <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base">
                  {partnerReasons.map((reason, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Spacer */}
            <div className="h-5 sm:h-6 md:h-8" />

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-4 sm:p-5 md:p-6 flex items-center gap-4 bg-teal-800/95"
                >
                  <div
                    className={`rounded-xl p-3 grid place-items-center bg-white/10 ${stat.color}`}
                  >
                    <stat.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div className="text-left">
                    <div className="text-lg sm:text-xl font-semibold text-white leading-none">
                      <strong>{stat.value}</strong>
                    </div>
                    <div className="mt-1 text-xs sm:text-sm text-white/90">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
