import React, { useState } from "react";
import {
  CheckCircle,
  Linkedin,
  Github,
  Globe,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Team = () => {
  // 3 members = 3 images
  const members = [
    {
      name: "Sadia Islam",
      role: "Founder",
      tags: ["Quality Leadership", "Automation & QA Strategy"],
      certs: [
        {
          lines: ["4+ years experience"],
        },
        // {
        //   title: "ISTQB",
        //   badge: "Expert",
        //   lines: ["5+ years experience", "In ISTQB"],
        // },
      ],
      image:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1200",
      socials: { github: "#", linkedin: "#", site: "#" },
    },
    {
      name: "Rifat Ara Nawshin",
      role: "Co-Founder",
      tags: ["Framework Design", "CI/CD"],
      certs: [
        {
          title: "Selenium",
          badge: "Expert",
          lines: ["10+ projects delivered", "Cross-browser"],
        },
        {
          title: "Docker",
          badge: "Pro",
          lines: ["Cloud-native pipelines", "GitHub Actions"],
        },
      ],
      image:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1200",
      socials: { linkedin: "#", site: "#" },
    },
    {
      name: "Humayra Himi",
      role: "Co-Founder",
      tags: ["k6", "JMeter"],
      certs: [
        {
          title: "k6",
          badge: "Advanced",
          lines: ["SLO-driven tests", "Grafana dashboards"],
        },
        {
          title: "JMeter",
          badge: "Advanced",
          lines: ["Peak load tuning", "Bottleneck analysis"],
        },
      ],
      image:
        "https://images.pexels.com/photos/1707820/pexels-photo-1707820.jpeg?auto=compress&cs=tinysrgb&w=1200",
      socials: { x: "#", linkedin: "#", site: "#" },
    },
  ];

  const [active, setActive] = useState(0);

  // helpers to rotate active member
  const prev = () =>
    setActive((i) => (i - 1 + members.length) % members.length);
  const next = () => setActive((i) => (i + 1) % members.length);

  // order portraits so active is big (left), the other two stack on the right
  const ordered = [
    members[active],
    members[(active + 1) % members.length],
    members[(active + 2) % members.length],
  ];

  const m = ordered[0]; // active details

  return (
    <section
      id="team"
      className="py-20 bg-[linear-gradient(180deg,#F3F9F9_0%,#F3F9F9_-0%)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-10">
          <div>
            <div className="inline-flex items-center bg-teal-100 shadow-sm px-4 py-2 rounded-full xs-regular mb-6">
              <CheckCircle className="h-4 w-4 mr-2 text-teal-600" />
              Our Team
            </div>
            <h2>
              Meet the Team Behind
              <br /> InspecQ
            </h2>
          </div>
          <p className="body-regular mt-16">
            A team of passionate QA professionals with decades of combined
            experience across multiple industry.
          </p>
        </div>

        {/* Main: left profile details + right 3 portraits layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left profile panel (updates with active) */}
          <div>
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-teal-100 text-teal-800 text-sm">
              {m.role}
            </div>

            <h4 className="mt-4">{m.name}!</h4>

            {/* Chips */}
            <div className="mt-5 flex flex-wrap gap-3">
              {m.tags.map((t, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 rounded-full bg-teal-50 text-teal-800 px-3 py-2 text-sm"
                >
                  <CheckCircle className="h-4 w-4" />
                  {t}
                </span>
              ))}
            </div>

            {/* Two mini cert cards */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {m.certs.map((c, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-slate-200 bg-white p-5"
                >
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-slate-900">
                      {/* {c.title} */}
                    </div>
                    <span className="text-xs rounded-full bg-slate-100 text-slate-700 px-2 py-1">
                      {/* {c.badge} */}
                    </span>
                  </div>
                  <div className="mt-3 space-y-1 text-sm text-slate-600">
                    {c.lines.map((l, j) => (
                      <div key={j}>{l}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Socials + Nav */}
            <div className="mt-7 flex items-center justify-between">
              <div className="flex items-center gap-6 text-slate-800">
                <span className="text-xl">𝕏</span>
                <a
                  href={m.socials.linkedin}
                  className="hover:text-teal-600 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href={m.socials.site}
                  className="hover:text-teal-600 transition-colors"
                >
                  <Globe className="h-5 w-5" />
                </a>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={prev}
                  className="h-8 w-8 rounded-full ring-1 ring-slate-300 grid place-items-center"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={next}
                  className="h-8 w-8 rounded-full bg-slate-900 text-white grid place-items-center"
                  aria-label="Next"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right: 3 images side-by-side layout (active big on left) */}
          <div className="grid grid-cols-3 gap-8">
            {/* Active (big) */}
            <img
              src={ordered[0].image}
              alt={ordered[0].name}
              className="col-span-2 w-full aspect-[3/4] object-cover rounded-[28px]"
            />
            {/* Two stacked */}
            <div className="grid gap-8">
              <img
                src={ordered[1].image}
                alt={ordered[1].name}
                className="w-full aspect-[3/4] object-cover rounded-[28px]"
              />
              <img
                src={ordered[2].image}
                alt={ordered[2].name}
                className="w-full aspect-[3/4] object-cover rounded-[28px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
