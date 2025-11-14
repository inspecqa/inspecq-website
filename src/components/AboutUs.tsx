import { CheckCircle, Users, Award, Target, Clock } from "lucide-react";
import aboutUsBg from "../assets/about-us-bg.svg";
import globeBg from "../assets/globe-bg.svg";

const AboutUs = () => {
  const stats = [
    {
      icon: Users,
      value: "10+",
      label: "Expert QA Engineers",
      color: "text-teal-600",
    },
    {
      icon: Award,
      value: "10+",
      label: "Years Combined Experience",
      color: "text-blue-600",
    },
    {
      icon: Clock,
      value: "24/7",
      label: "Dedicated Support",
      color: "text-purple-600",
    },
    {
      icon: Target,
      value: "100%",
      label: "Quality Commitment",
      color: "text-orange-600",
    },
  ];

  return (
    <section id="about-us" className="relative overflow-hidden py-20 md:py-28">
      {/* Section background (your SVG) + soft upward fade */}
      <div className="absolute inset-0 -z-10">
        <img
          src={aboutUsBg}
          alt=""
          className="absolute inset-x-0 bottom-0 w-full h-full object-cover opacity-90 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B8A86] via-[#1B8A86]/70 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1) Badge + headline + subheadline (ABOVE the globe) */}
        <div className="text-center">
          <div className="inline-flex items-center bg-white text-teal-500 px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur">
            <CheckCircle className="h-4 w-4 mr-2 text-teal-500" />
            About InspecQ
          </div>
          <p className="h1 text-white leading-tight tracking-tight">
            Built to Inspect. Powered by Quality.
          </p>
          <p className="body-regular mt-4 text-white max-w-3xl mx-auto">
            Founded by experienced QA professionals from leading tech companies,
            We’re launching InspecQ to support businesses in building reliable,
            high-quality products.
          </p>
        </div>

        {/* 2) Globe block (sits behind the overlapping card) */}
        <div className="relative mt-8 md:mt-10">
          <div className="relative h-56 md:h-72 lg:h-[420px]">
            {/* swap this path to your globe artwork */}
            <img
              src={globeBg}
              alt=""
              className="absolute left-1/2 -translate-x-1/2 bottom-0 max-h-full object-contain opacity-95 select-none pointer-events-none"
            />
          </div>
        </div>

        {/* 3) Single big white card overlapping the middle of the globe */}
        <div className="relative z-20 -mt-24 md:-mt-32 lg:-mt-40">
          <div className="mx-auto max-w-6xl rounded-3xl bg-white ring-1 ring-black/5 shadow-[0_20px_60px_rgba(0,0,0,0.18)] p-4 sm:p-6 md:p-8 lg:p-10">
            {/* top two panels */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              <div className="rounded-2xl p-6 md:p-7 bg-gradient-to-br from-teal-50 to-teal-50">
                <p className="h5 text-gray-900 mb-5">Our Approach</p>
                <ul className="space-y-4 body-regular">
                  {[
                    "Discover → Understand your goals and challenges",
                    "Strategize → Build a tailored QA roadmap",
                    "Test → Execute functional, automation, and performance tests",
                    "Report → Clear insights with actionable fixes",
                    "Support → Stay with you through release and beyond",
                  ].map((t, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-teal-600 mr-3 mt-0.5" />
                      <span className="text-gray-700">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl p-6 md:p-7 bg-gradient-to-br from-teal-50 to-teal-50">
                <h4 className="h5 text-gray-900 mb-5">
                  Why Partner with a Startup QA Agency?
                </h4>
                <ul className="space-y-4 body-regular">
                  {[
                    "Agile-Ready → We adapt to your sprint cycles.",
                    "End-to-End Coverage → From login flows to API stress tests.",
                    "Transparent Reporting → No fluff, only actionable insights.",
                    "Flexible Engagement → On-demand, part-time, or full-time QA support.",
                  ].map((t, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-teal-600 mr-3 mt-0.5" />
                      <span className="text-gray-700">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* spacing */}
            <div className="h-6 md:h-8" />

            {/* stats row (inside the same card) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-5 md:p-6 flex items-center gap-4  bg-teal-800"
                >
                  <div
                    className={`${stat.color} bg-opacity-10 rounded-xl p-3 grid place-items-center`}
                  >
                    <stat.icon className="h-5 w-5 rounded-full" />
                  </div>
                  <div className="text-left">
                    <div className="body-regular text-white leading-none">
                      {stat.value}
                    </div>
                    <div className="body-regular text-white mt-3">
                      {stat.label}</div>
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
