import { useEffect, useState } from "react";
import { Target, CheckCircle, ShieldCheck, Cpu, Users } from "lucide-react";

import consultationIllustration from "../assets/consultation-illustration.svg";
import consultationBg from "../assets/consultation-bg.svg";
import aboutValuesBg from "../assets/about-values-bg.svg";
import aboutHeroBg from "../assets/about-hero-bg.svg";
import aboutUsIllus from "../assets/about-us-illustration.svg";

/* -------------------------
   Hook: Count up animation
-------------------------- */
const useCountUp = (endValue: number, duration = 1200) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let current = 0;
    const step = endValue / (duration / 16);

    const counter = setInterval(() => {
      current += step;
      if (current >= endValue) {
        setValue(endValue);
        clearInterval(counter);
      } else {
        setValue(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [endValue, duration]);

  return value;
};

/* -------------------------
   Stat item component
-------------------------- */
type StatItemProps = {
  stat: string;
  label: string;
};

const StatItem: React.FC<StatItemProps> = ({ stat, label }) => {
  const hasPlus = stat.includes("+");
  const hasPercent = stat.includes("%");
  const hasSlash = stat.includes("/7");

  const numeric = parseInt(stat.split(/[^0-9]/)[0] || "0", 10);
  const count = useCountUp(numeric, 1200);

  return (
    <div className="flex flex-col items-center text-center md:px-6 lg:px-8">
      <div className="text-2xl md:text-3xl font-extrabold tracking-tight">
        <span className="text-gray-900">{count}</span>
        {hasPlus && <span className="text-teal-600">+</span>}
        {hasPercent && <span className="text-teal-600">%</span>}
        {hasSlash && <span className="text-teal-600">/7</span>}
      </div>
      <div className="mt-2 text-sm text-gray-600">{label}</div>
    </div>
  );
};

/* -------------------------
   Values data
-------------------------- */
const values = [
  {
    title: "Quality First",
    description:
      "Every test, scenario, and report is designed to protect your users and product reputation.",
    icon: ShieldCheck,
  },
  {
    title: "Innovation Driven",
    description:
      "We use modern QA tools, automation frameworks, and performance testing to keep you ahead.",
    icon: Cpu,
  },
  {
    title: "Client Success",
    description:
      "We plug into your team, align with your roadmap, and focus on outcomes, not just bug counts.",
    icon: Users,
  },
  {
    title: "Integrity & Transparency",
    description:
      "Clear communication, honest reporting, and full visibility into what we test and why.",
    icon: CheckCircle,
  },
];

const About: React.FC = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section
        aria-label="Our Story section"
        className="relative overflow-visible py-16 sm:py-20 lg:py-24"
      >
        <img
          src={aboutHeroBg}
          alt=""
          className="absolute inset-x-0 bottom-0 w-full max-w-none pointer-events-none z-0 opacity-90 object-contain"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center gap-10 sm:gap-8">
            {/* Text block */}
            <div className="max-w-3xl mt-8">
              <p className="h1 text-teal-900">
                Built to Inspect. Powered by Quality.
              </p>

              <p className="body-regular text-gray-600 mt-4">
                InspecQ is a modern QA agency helping SaaS, fintech, and digital
                products ship reliable, high-performing releases. We blend
                manual testing, automation, API testing, and performance checks
                so your team can launch faster—with fewer bugs and more
                confidence.
              </p>
            </div>

            {/* Stats strip */}
            <div className="w-full max-w-5xl mt-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 rounded-3xl border border-teal-200 bg-white/85 p-6 md:p-8 shadow-sm backdrop-blur-sm md:divide-x md:divide-gray-200">
                {[
                  { stat: "10+", label: "Skilled QA Experts" },
                  { stat: "10+", label: "Years in QA & Testing" },
                  { stat: "24/7", label: "Support Across Time Zones" },
                  { stat: "99%", label: "Client Satisfaction" },
                ].map((item) => (
                  <StatItem
                    key={item.label}
                    stat={item.stat}
                    label={item.label}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-2 items-center">
          {/* Text side */}
          <div className="space-y-4">
            <p className="h2 text-teal-900">Who we are</p>
            <p className="body-regular text-gray-600 md:text-base mb-3">
              We’re a dedicated QA team that treats your product like our own.
              Our engineers bring deep expertise across every layer of your
              product’s quality lifecycle, ensuring every release is stable,
              fast, and user-friendly.
            </p>
            <p className="body-regular text-gray-600 md:text-base">
              We integrate seamlessly into your workflow and deliver sharp,
              actionable insights that improve quality without slowing down your
              delivery.
            </p>
          </div>

          {/* Image side */}
          <div className="relative mt-6 lg:mt-0">
            <div className="overflow-hidden rounded-3xl bg-teal-50">
              <img
                src={aboutUsIllus}
                alt="QA discussion"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 left-6 right-6 md:right-auto md:w-72 rounded-2xl bg-white shadow-lg p-4">
              <p className="text-xs uppercase tracking-[0.15em] text-teal-600 mb-1">
                Our Perspective
              </p>
              <p className="text-sm text-gray-700">
                “Products evolve with features, but they succeed with reliable
                releases.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Started */}
      <section className="py-16 md:py-20 bg-teal-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="h2 text-black-900 mb-6">
            Why we started{" "}
            <span className="relative inline-block px-1">
              <span className="absolute inset-0 bg-teal-500/20 rounded-md blur-sm" />
              <span className="relative text-teal-700 font-semibold tracking-tight">
                InspecQ
              </span>
            </span>
          </p>
          <p className="body-regular leading-relaxed text-gray-700">
            Too many great products struggle because testing happens late, under
            pressure, or without the right strategy. We built{" "}
            <strong>InspecQ</strong> to fix that by bringing structured QA
            processes, automation discipline, and deep product understanding to
            teams that need reliable testing support.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative isolate overflow-hidden py-20 md:py-28">
        <img
          src={aboutValuesBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <p className="h2 text-gray-900 mb-4">Our Core Values</p>
            <p className="body-regular text-gray-600 max-w-md">
              Four principles guide everything we do — how we work, communicate,
              and collaborate.
            </p>
          </div>

          {/* Right vertical timeline */}
          <div className="relative pl-8">
            <div className="space-y-16">
              {values.map((value, i) => (
                <div key={value.title} className="relative">
                  {/* Vertical dotted line for all except last */}
                  {i < values.length - 1 && (
                    <div
                      className="absolute left-5 top-5 border-l-2 border-dashed border-teal-300"
                      style={{ height: "calc(100% + 4rem)" }}
                    />
                  )}

                  {/* Icon on the line */}
                  <div
                    className="absolute left-5 top-0 flex h-10 w-10 items-center justify-center 
                     rounded-full bg-teal-700 text-white shadow-lg"
                    style={{ transform: "translateX(-50%)" }}
                  >
                    <value.icon className="h-5 w-5" />
                  </div>

                  {/* Text block */}
                  <div className="ml-16">
                    <p className="h6 text-gray-900">{value.title}</p>
                    <p className="mt-2 text-sm md:text-base text-gray-600">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <p className="h2 text-gray-900">
              Purpose-driven testing, every time
            </p>
            <p className="body-regular mt-3 text-gray-600 md:text-base">
              Our mission, vision, and approach are all centered around one
              thing: <strong>Helping you ship better software, faster.</strong>
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-white bg-teal-100 p-6 flex flex-col gap-3">
              <div className="h-10 w-10 rounded-2xl bg-white flex items-center justify-center">
                <Users className="h-5 w-5 text-teal-700" />
              </div>
              <p className="h6 text-gray-900">Our Mission</p>
              <p className="xs-regular text-gray-700">
                To help businesses ship faster and with confidence by delivering
                consistent, reliable, and high-quality releases—backed by modern
                QA practices and smart testing.
              </p>
            </div>

            <div className="rounded-3xl border border-white bg-teal-100 p-6 flex flex-col gap-3">
              <div className="h-10 w-10 rounded-2xl bg-white flex items-center justify-center">
                <Target className="h-5 w-5 text-teal-700" />
              </div>
              <p className="h6 text-gray-900">Our Vision</p>
              <p className="xs-regular text-gray-700">
                To be the QA partner product teams trust for stability, uptime,
                and exceptional user experience across every release.
              </p>
            </div>

            <div className="rounded-3xl border border-white bg-teal-100 p-6 flex flex-col gap-3">
              <div className="h-10 w-10 rounded-2xl bg-white flex items-center justify-center">
                <ShieldCheck className="h-5 w-5 text-teal-700" />
              </div>
              <p className="h6 text-gray-900">How We Support You</p>
              <p className="xs-regular text-gray-700">
                We become your QA team inside your existing process—providing
                fast feedback and dependable coverage while saving you the cost
                and complexity of hiring internally.
              </p>
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

            <div className="absolute inset-0 mix-blend-multiply" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center px-6 sm:px-10 lg:px-14 py-12 lg:py-16">
              {/* Left copy */}
              <div className="text-white">
                <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
                  30-Minute Free QA
                  <br />
                  Consultation for your product.
                </h1>

                <p className="body-regular mt-6 text-white/90 text-base sm:text-lg max-w-2xl">
                  Share your product, stack, and release goals. We’ll review
                  your current QA approach and outline a practical testing plan
                  you can start using immediately.
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