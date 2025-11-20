import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-white to-white relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 bg-[url('/src/assets/pattern-light.svg')] opacity-[0.08] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto pt-28 pb-24 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14 mt-8">
          <div className="inline-flex items-center bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-medium mb-4 shadow-sm">
            Privacy &amp; Data
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-teal-900 mb-4">
            InspecQ Privacy Policy
          </h1>

          <p className="text-sm text-gray-500">Last updated: November 2025</p>

          <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            This Privacy Policy explains how we collect, use, and protect your
            personal information when you visit our website, contact us, or use
            InspecQ&apos;s services.
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white/80 backdrop-blur-sm shadow-sm rounded-2xl border border-gray-100 p-6 sm:p-8 space-y-8">
          {/* 1. Information We Collect */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              1. Information We Collect
            </h2>

            <h3 className="text-base font-semibold text-gray-800 mb-1">
              a) Information You Provide Directly
            </h3>
            <p className="text-gray-700 text-sm sm:text-base">
              We may collect personal and business information that you
              voluntarily share with us, such as:
            </p>
            <ul className="mt-3 list-disc list-inside space-y-1 text-gray-700 text-sm sm:text-base">
              <li>Name and contact details (email, phone)</li>
              <li>Company name, role, and project details</li>
              <li>
                Information submitted via contact, free trial, or &quot;Book a
                Call&quot; forms
              </li>
              <li>Attachments, documents, or files you share for analysis</li>
            </ul>

            <h3 className="mt-5 text-base font-semibold text-gray-800 mb-1">
              b) Automatically Collected Information
            </h3>
            <p className="text-gray-700 text-sm sm:text-base">
              When you visit our website, certain information may be collected
              automatically, such as:
            </p>
            <ul className="mt-3 list-disc list-inside space-y-1 text-gray-700 text-sm sm:text-base">
              <li>IP address and approximate location</li>
              <li>Browser type, version, and device information</li>
              <li>Pages visited, time spent, and referring URLs</li>
              <li>Basic analytics and cookie-based data</li>
            </ul>

            <h3 className="mt-5 text-base font-semibold text-gray-800 mb-1">
              c) Trial &amp; Contact Forms
            </h3>
            <p className="text-gray-700 text-sm sm:text-base">
              If you submit a form (such as a 7-day trial request, contact form,
              or consultation booking), we collect the information you submit to
              respond to your request.
            </p>
          </section>

          {/* 2. How We Use Your Information */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-700 text-sm sm:text-base">
              We use the information we collect to:
            </p>
            <ul className="mt-3 list-disc list-inside space-y-1 text-gray-700 text-sm sm:text-base">
              <li>Communicate with you and respond to inquiries</li>
              <li>Provide, operate, and improve our QA services</li>
              <li>Prepare proposals, scopes of work, and project plans</li>
              <li>Issue invoices and manage contracts</li>
              <li>Maintain internal records and project history</li>
              <li>
                Improve our website experience, content, and service offerings
              </li>
            </ul>
            <p className="mt-3 text-gray-700 text-sm sm:text-base">
              We do not sell or rent your personal information to third parties.
            </p>
          </section>

          {/* 3. Legal Basis for Processing */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              3. Legal Basis for Processing
            </h2>
            <p className="text-gray-700 text-sm sm:text-base">
              Depending on your location, we may process your personal data
              under one or more of the following legal bases:
            </p>
            <ul className="mt-3 list-disc list-inside space-y-1 text-gray-700 text-sm sm:text-base">
              <li>Your consent</li>
              <li>Performance of a contract or pre-contractual steps</li>
              <li>Legitimate business interests (e.g., improving services)</li>
              <li>Compliance with legal obligations</li>
            </ul>
          </section>

          {/* 4. Data Storage & Security */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              4. Data Storage &amp; Security
            </h2>
            <p className="text-gray-700 text-sm sm:text-base">
              We store data using secure third-party tools and platforms such
              as:
            </p>
            <ul className="mt-3 list-disc list-inside space-y-1 text-gray-700 text-sm sm:text-base">
              <li>Cloud databases (e.g., Supabase)</li>
              <li>Google Workspace (e.g., Gmail, Google Sheets)</li>
              <li>Project management and collaboration tools</li>
            </ul>
            <p className="mt-3 text-gray-700 text-sm sm:text-base">
              We implement reasonable technical and organizational measures to
              protect your data. However, no method of transmission or storage
              over the internet is 100% secure, and we cannot guarantee absolute
              security.
            </p>
          </section>

          {/* 5. Sharing of Information */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              5. Sharing of Information
            </h2>
            <p className="text-gray-700 text-sm sm:text-base">
              We may share your information with:
            </p>
            <ul className="mt-3 list-disc list-inside space-y-1 text-gray-700 text-sm sm:text-base">
              <li>
                InspecQ team members directly involved in your project or
                request
              </li>
              <li>
                Trusted third-party service providers used for operations (e.g.,
                hosting, email, analytics, scheduling)
              </li>
            </ul>
            <p className="mt-3 text-gray-700 text-sm sm:text-base">
              These third parties are only given access to the information
              necessary to perform their services and are expected to protect
              it.
            </p>
          </section>

          {/* 6. Cookies & Analytics */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              6. Cookies &amp; Analytics
            </h2>
            <p className="text-gray-700 text-sm sm:text-base">
              Our website may use cookies and analytics tools to understand how
              visitors use the site and to improve user experience. You can
              adjust your browser settings to refuse cookies, but some features
              of the site may not function properly without them.
            </p>
          </section>

          {/* 7. Data Retention */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              7. Data Retention
            </h2>
            <p className="text-gray-700 text-sm sm:text-base">
              We retain your personal data only for as long as necessary to:
            </p>
            <ul className="mt-3 list-disc list-inside space-y-1 text-gray-700 text-sm sm:text-base">
              <li>Deliver and support our services</li>
              <li>Comply with legal and accounting obligations</li>
              <li>Maintain project history and records</li>
            </ul>
            <p className="mt-3 text-gray-700 text-sm sm:text-base">
              You may request deletion of your data, subject to any legal
              obligations to retain certain records.
            </p>
          </section>

          {/* 8. Your Rights */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              8. Your Rights
            </h2>
            <p className="text-gray-700 text-sm sm:text-base">
              Depending on your jurisdiction, you may have rights to:
            </p>
            <ul className="mt-3 list-disc list-inside space-y-1 text-gray-700 text-sm sm:text-base">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate or incomplete data</li>
              <li>Request deletion of your data, where applicable</li>
              <li>Restrict or object to certain types of processing</li>
              <li>Request a copy of your data (data portability)</li>
              <li>Withdraw consent where processing is based on consent</li>
            </ul>
            <p className="mt-3 text-gray-700 text-sm sm:text-base">
              To exercise any of these rights, please contact us using the
              details below.
            </p>
          </section>

          {/* 9. Third-Party Links */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              9. Third-Party Links
            </h2>
            <p className="text-gray-700 text-sm sm:text-base">
              Our website may contain links to third-party websites. We are not
              responsible for the content or privacy practices of those sites.
              We encourage you to review the privacy policies of any external
              sites you visit.
            </p>
          </section>

          {/* 10. Children's Privacy */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              10. Children&apos;s Privacy
            </h2>
            <p className="text-gray-700 text-sm sm:text-base">
              Our website and services are not intended for children under the
              age of 16, and we do not knowingly collect personal information
              from children. If you believe a child has provided us with
              personal data, please contact us so we can delete it.
            </p>
          </section>

          {/* 11. Changes to This Policy */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              11. Changes to This Privacy Policy
            </h2>
            <p className="text-gray-700 text-sm sm:text-base">
              We may update this Privacy Policy from time to time. When we do,
              we will revise the &quot;Last updated&quot; date at the top of the
              page. We encourage you to review this page periodically for any
              changes.
            </p>
          </section>

          {/* 12. Contact */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              12. Contact Us
            </h2>
            <p className="text-gray-700 text-sm sm:text-base">
              If you have any questions, concerns, or requests regarding this
              Privacy Policy or how we handle your data, please contact us:
            </p>
            <ul className="mt-3 space-y-1 text-gray-700 text-sm sm:text-base">
              <li>
                <span className="font-medium">Email:</span>{" "}
                <a
                  href="mailto:contact@inspecq.com"
                  className="text-teal-700 hover:underline"
                >
                  <strong>contact@inspecq.com</strong>
                </a>
              </li>
              <li>
                <span className="font-medium">Website:</span>{" "}
                <a
                  href="https://inspecq.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-teal-700 hover:underline"
                >
                  <strong>https://inspecq.com</strong>
                </a>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
