import { ArrowRight, FileDown } from "lucide-react";

const caseStudies = [
  {
    title: "Fintech — CI/CD Automation",
    result: "60% faster regression cycles, 0 critical leaks to production.",
    bullets: [
      "Playwright + GitHub Actions integration",
      "API + UI coverage with Allure reporting",
      "Parallelized test execution for CI pipelines",
    ],
    image: "/assets/case/fintech-thumb.png",
    link: "/case-studies/fintech-automation",
    download: "/assets/downloads/case-fintech-automation.pdf",
  },
  {
    title: "E-commerce — Performance Tuning",
    result: "Reduced P95 latency by 43% under peak sale load.",
    bullets: [
      "Load testing with k6 + Grafana dashboards",
      "Database indexing and CDN optimization",
      "Stress and spike test strategy implementation",
    ],
    image: "/assets/case/ecomm-thumb.png",
    link: "/case-studies/ecommerce-performance",
    download: "/assets/downloads/case-ecommerce-performance.pdf",
  },
  {
    title: "SaaS — API Quality Hardening",
    result: "Achieved 98% contract stability across environments.",
    bullets: [
      "Postman + Newman automation suite",
      "Schema and version control validation",
      "Environment parity with staging checks",
    ],
    image: "/assets/case/saas-thumb.png",
    link: "/case-studies/saas-api-quality",
    download: "/assets/downloads/case-saas-api-quality.pdf",
  },
];

const CaseStudies = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/service/service-bg-2.svg"
          alt="background pattern"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Hero Section */}
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
          Real Results. Real Quality Impact.
        </h1>
        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
          See how InspecQ helped teams accelerate releases, improve coverage,
          and strengthen reliability — without slowing innovation.
        </p>

        <a
          href="/contact?source=case-studies"
          className="inline-flex items-center justify-center px-6 py-3 mt-8 rounded-xl bg-teal-600 text-white font-medium hover:bg-teal-700 transition"
        >
          Book a Free QA Call
          <ArrowRight className="ml-2 w-5 h-5" />
        </a>

        {/* Case Study Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 text-left">
          {caseStudies.map((study, index) => (
            <article
              key={index}
              className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {study.image && (
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
              )}
              <h3 className="text-xl font-semibold text-gray-900">
                {study.title}
              </h3>
              <p className="text-teal-700 font-medium mt-2">{study.result}</p>
              <ul className="text-gray-600 text-sm mt-4 space-y-1">
                {study.bullets.map((point, i) => (
                  <li key={i}>• {point}</li>
                ))}
              </ul>

              <div className="flex items-center gap-4 mt-6">
                <a
                  href={study.link}
                  className="text-sm text-teal-700 hover:underline font-medium"
                >
                  View details
                </a>
                <a
                  href={study.download}
                  className="flex items-center text-sm text-gray-500 hover:text-teal-700 transition"
                >
                  <FileDown className="w-4 h-4 mr-1" />
                  PDF
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gray-50 rounded-2xl p-10 mt-20 max-w-3xl mx-auto shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900">
            Want outcomes like these?
          </h2>
          <p className="text-gray-600 mt-3">
            Get a free 30-minute consultation with our QA experts — no slides,
            no fluff, just actionable insights.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <a
              href="/contact?intent=consult"
              className="px-6 py-3 rounded-xl bg-teal-600 text-white font-medium hover:bg-teal-700 transition"
            >
              Book a Call
            </a>
            <a
              href="/assets/downloads/qa-audit-template.pdf"
              className="px-6 py-3 rounded-xl border border-teal-200 text-teal-700 font-medium hover:bg-teal-50 transition"
            >
              Download QA Audit Template
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
