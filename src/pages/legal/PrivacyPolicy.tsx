import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-white to-white relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 bg-[url('/src/assets/pattern-light.svg')] opacity-[0.12] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto pt-24 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14 mt-6 sm:mt-8">
          <div className="inline-flex items-center bg-teal-100 text-teal-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 shadow-sm">
            Privacy &amp; Data
          </div>

          <p className="h1 font-bold text-teal-900 mb-1 sm:mb-2 mt-1 sm:mt-2 text-2xl sm:text-3xl lg:text-4xl">
            InspecQ Privacy Policy
          </p>

          <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
            Last updated: November 2025
          </p>

          <p className="body-md text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            This Privacy Policy explains how we collect, use, and protect your
            personal information when you visit our website, contact us, or use
            InspecQ&apos;s services.
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-gray-100 p-5 sm:p-8 md:p-10 lg:p-12">
          <section className="space-y-8 sm:space-y-10 text-gray-700 leading-relaxed text-sm sm:text-base">
            {/* 1. Information We Collect */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                1. Information We Collect
              </h2>

              <h3 className="mt-2 text-sm sm:text-base font-semibold text-gray-800">
                a) Information You Provide Directly
              </h3>
              <p className="mt-1.5">
                We may collect personal and business information that you
                voluntarily share with us, such as:
              </p>
              <ul className="list-disc ml-5 sm:ml-6 mt-2 space-y-1.5">
                <li>Name and contact details (email, phone)</li>
                <li>Company name, role, and project details</li>
                <li>
                  Information submitted via contact, free trial, or &quot;Book a
                  Call&quot; forms
                </li>
                <li>Attachments, documents, or files you share for analysis</li>
              </ul>

              <h3 className="mt-4 text-sm sm:text-base font-semibold text-gray-800">
                b) Automatically Collected Information
              </h3>
              <p className="mt-1.5">
                When you visit our website, certain information may be collected
                automatically, such as:
              </p>
              <ul className="list-disc ml-5 sm:ml-6 mt-2 space-y-1.5">
                <li>IP address and approximate location</li>
                <li>Browser type, version, and device information</li>
                <li>Pages visited, time spent, and referring URLs</li>
                <li>Basic analytics and cookie-based data</li>
              </ul>

              <h3 className="mt-4 text-sm sm:text-base font-semibold text-gray-800">
                c) Trial &amp; Contact Forms
              </h3>
              <p className="mt-1.5">
                If you submit a form (such as a 7-day trial request, contact
                form, or consultation booking), we collect the information you
                submit to respond to your request.
              </p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

            {/* 2. How We Use Your Information */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                2. How We Use Your Information
              </h2>
              <p className="mt-1.5">We use the information we collect to:</p>
              <ul className="list-disc ml-5 sm:ml-6 mt-2 space-y-1.5">
                <li>Communicate with you and respond to inquiries</li>
                <li>Provide, operate, and improve our QA services</li>
                <li>Prepare proposals, scopes of work, and project plans</li>
                <li>Issue invoices and manage contracts</li>
                <li>Maintain internal records and project history</li>
                <li>
                  Improve our website experience, content, and service offerings
                </li>
              </ul>
              <p className="mt-2">
                We do not sell or rent your personal information to third
                parties.
              </p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

            {/* 3. Legal Basis for Processing */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                3. Legal Basis for Processing
              </h2>
              <p className="mt-1.5">
                Depending on your location, we may process your personal data
                under one or more of the following legal bases:
              </p>
              <ul className="list-disc ml-5 sm:ml-6 mt-2 space-y-1.5">
                <li>Your consent</li>
                <li>Performance of a contract or pre-contractual steps</li>
                <li>
                  Legitimate business interests (e.g., improving services)
                </li>
                <li>Compliance with legal obligations</li>
              </ul>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

            {/* 4. Data Storage & Security */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                4. Data Storage &amp; Security
              </h2>
              <p className="mt-1.5">
                We store data using secure third-party tools and platforms such
                as:
              </p>
              <ul className="list-disc ml-5 sm:ml-6 mt-2 space-y-1.5">
                <li>Cloud databases (e.g., Supabase)</li>
                <li>Google Workspace (e.g., Gmail, Google Sheets)</li>
                <li>Project management and collaboration tools</li>
              </ul>
              <p className="mt-2">
                We implement reasonable technical and organizational measures to
                protect your data. However, no method of transmission or storage
                over the internet is 100% secure, and we cannot guarantee
                absolute security.
              </p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

            {/* 5. Sharing of Information */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                5. Sharing of Information
              </h2>
              <p className="mt-1.5">We may share your information with:</p>
              <ul className="list-disc ml-5 sm:ml-6 mt-2 space-y-1.5">
                <li>
                  InspecQ team members directly involved in your project or
                  request
                </li>
                <li>
                  Trusted third-party service providers used for operations
                  (e.g., hosting, email, analytics, scheduling)
                </li>
              </ul>
              <p className="mt-2">
                These third parties are only given access to the information
                necessary to perform their services and are expected to protect
                it.
              </p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

            {/* 6. Cookies & Analytics */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                6. Cookies &amp; Analytics
              </h2>
              <p className="mt-1.5">
                Our website may use cookies and analytics tools to understand
                how visitors use the site and to improve user experience. You
                can adjust your browser settings to refuse cookies, but some
                features of the site may not function properly without them.
              </p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

            {/* 7. Data Retention */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                7. Data Retention
              </h2>
              <p className="mt-1.5">
                We retain your personal data only for as long as necessary to:
              </p>
              <ul className="list-disc ml-5 sm:ml-6 mt-2 space-y-1.5">
                <li>Deliver and support our services</li>
                <li>Comply with legal and accounting obligations</li>
                <li>Maintain project history and records</li>
              </ul>
              <p className="mt-2">
                You may request deletion of your data, subject to any legal
                obligations to retain certain records.
              </p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

            {/* 8. Your Rights */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                8. Your Rights
              </h2>
              <p className="mt-1.5">
                Depending on your jurisdiction, you may have rights to:
              </p>
              <ul className="list-disc ml-5 sm:ml-6 mt-2 space-y-1.5">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate or incomplete data</li>
                <li>Request deletion of your data, where applicable</li>
                <li>Restrict or object to certain types of processing</li>
                <li>Request a copy of your data (data portability)</li>
                <li>Withdraw consent where processing is based on consent</li>
              </ul>
              <p className="mt-2">
                To exercise any of these rights, please contact us using the
                details below.
              </p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

            {/* 9. Third-Party Links */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                9. Third-Party Links
              </h2>
              <p className="mt-1.5">
                Our website may contain links to third-party websites. We are
                not responsible for the content or privacy practices of those
                sites. We encourage you to review the privacy policies of any
                external sites you visit.
              </p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

            {/* 10. Children's Privacy */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                10. Children&apos;s Privacy
              </h2>
              <p className="mt-1.5">
                Our website and services are not intended for children under the
                age of 16, and we do not knowingly collect personal information
                from children. If you believe a child has provided us with
                personal data, please contact us so we can delete it.
              </p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

            {/* 11. Changes to This Privacy Policy */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                11. Changes to This Privacy Policy
              </h2>
              <p className="mt-1.5">
                We may update this Privacy Policy from time to time. When we do,
                we will revise the &quot;Last updated&quot; date at the top of
                the page. We encourage you to review this page periodically for
                any changes.
              </p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

            {/* 12. Contact Us */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                12. Contact Us
              </h2>
              <p className="mt-1.5">
                If you have any questions, concerns, or requests regarding this
                Privacy Policy or how we handle your data, please contact us at{" "}
                <a
                  href="mailto:contact@inspecq.com"
                  className="text-teal-600 font-semibold hover:underline"
                >
                  contact@inspecq.com
                </a>
                .
              </p>
            </div>
          </section>

          <p className="mt-10 sm:mt-12 text-gray-600 text-center text-xs sm:text-sm">
            By using the InspecQ website or working with us, you acknowledge
            that you have read and understood this Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;