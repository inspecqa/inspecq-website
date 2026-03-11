import React from "react";
import SEO from "../../components/SEO";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-white to-white relative overflow-hidden">
      <SEO
        title="Privacy Policy"
        description="Read InspecQ's Privacy Policy to understand how we collect, use, and protect your personal data when you use our website or services."
        canonical="/privacy-policy"
      />
      {/* Decorative background pattern */}
      <div className="absolute inset-0 bg-[url('/src/assets/pattern-light.svg')] opacity-[0.12] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto pt-24 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14 mt-6 sm:mt-8">
          <div className="inline-flex items-center bg-teal-100 text-teal-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 shadow-sm">
            Privacy &amp; Data
          </div>

          <h1 className="h1 font-bold text-teal-900 mb-1 sm:mb-2 mt-1 sm:mt-2 text-2xl sm:text-3xl lg:text-4xl">
            InspecQ Privacy Policy
          </h1>

          <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
            Last updated: March 2026
          </p>

          <p className="body-md text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            InspecQ LLC (&quot;InspecQ&quot;, &quot;we&quot;, &quot;us&quot;, or
            &quot;our&quot;) respects your privacy and is committed to
            protecting your personal data. This Privacy Policy outlines how we
            collect, use, process, and protect your personal information when
            you visit our website (www.inspecq.com), contact us, or use our
            software quality assurance services. This policy applies to
            individuals (&quot;you&quot;) acting in a B2B capacity as
            representatives of existing or prospective clients.
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
                We collect personal information that you voluntarily provide
                when interacting with us, including:
              </p>
              <ul className="list-disc ml-5 sm:ml-6 mt-2 space-y-1.5">
                <li>
                  <strong>Contact Information:</strong> Name, email address,
                  phone number, and company name.
                </li>
                <li>
                  <strong>Inquiry Details:</strong> Information submitted via
                  our &quot;Book a Call&quot;, free trial, or general contact
                  forms.
                </li>
                <li>
                  <strong>Project Information:</strong> Documents, test
                  requirements, links to applications, or files you share for
                  analysis in connection with a project or bid.
                </li>
              </ul>

              <h3 className="mt-4 text-sm sm:text-base font-semibold text-gray-800">
                b) Automatically Collected Information
              </h3>
              <p className="mt-1.5">
                When you visit our website, we automatically collect certain
                technical data using cookies and similar tracking technologies:
              </p>
              <ul className="list-disc ml-5 sm:ml-6 mt-2 space-y-1.5">
                <li>
                  <strong>Device &amp; Usage Data:</strong> IP address, browser
                  type, operating system, referring URLs, pages visited, and
                  time spent on the site.
                </li>
                <li>
                  <strong>Analytics:</strong> Aggregated, sanitized metrics
                  regarding website traffic and user behavior.
                </li>
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
              <p className="mt-1.5">
                We use the collected information for the following business
                purposes:
              </p>
              <ul className="list-disc ml-5 sm:ml-6 mt-2 space-y-1.5">
                <li>
                  <strong>Service Delivery:</strong> To provide, operate, and
                  maintain our QA services, including preparing proposals and
                  Statements of Work (SOWs).
                </li>
                <li>
                  <strong>Communication:</strong> To respond to your inquiries,
                  schedule consultations, and provide customer support.
                </li>
                <li>
                  <strong>Administrative Tasks:</strong> To issue invoices,
                  manage contracts, and maintain internal business records.
                </li>
                <li>
                  <strong>Website Improvement:</strong> To understand how users
                  interact with our site and improve functionality and user
                  experience.
                </li>
                <li>
                  <strong>Marketing:</strong> To send you relevant updates or
                  marketing materials, strictly provided you have opted in or
                  have an existing business relationship with us. You may opt
                  out at any time.
                </li>
              </ul>
              <p className="mt-2 font-semibold">
                We do not sell, rent, or trade your personal information to
                third parties.
              </p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

            {/* 3. Legal Basis for Processing */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                3. Legal Basis for Processing (GDPR/UK GDPR Compliance)
              </h2>
              <p className="mt-1.5">
                If you are located in the European Economic Area (EEA) or the
                United Kingdom, our legal basis for collecting and using the
                personal information described above depends on the specific
                context:
              </p>
              <ul className="list-disc ml-5 sm:ml-6 mt-2 space-y-1.5">
                <li>
                  <strong>Performance of a Contract:</strong> Processing is
                  necessary to fulfill a contract with you or take
                  pre-contractual steps at your request.
                </li>
                <li>
                  <strong>Legitimate Interests:</strong> Processing is necessary
                  for our legitimate business interests (e.g., improving our
                  services or B2B direct marketing) and is not overridden by
                  your data protection rights.
                </li>
                <li>
                  <strong>Consent:</strong> Where you have given explicit
                  consent for us to process your data for a specific purpose.
                </li>
                <li>
                  <strong>Legal Obligation:</strong> Processing is necessary to
                  comply with the law (e.g., tax and accounting regulations).
                </li>
              </ul>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

            {/* 4. Privacy Rights */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                4. Privacy Rights (CCPA/CPRA &amp; GDPR)
              </h2>
              <p className="mt-1.5">
                Depending on your location, you may have specific rights
                regarding your personal data:
              </p>
              <ul className="list-disc ml-5 sm:ml-6 mt-2 space-y-1.5">
                <li>
                  <strong>Right to Access:</strong> You can request a copy of
                  the personal data we hold about you.
                </li>
                <li>
                  <strong>Right to Rectification:</strong> You can request that
                  we correct any inaccurate or incomplete data.
                </li>
                <li>
                  <strong>
                    Right to Erasure (&quot;Right to be Forgotten&quot;):
                  </strong>{" "}
                  You can request the deletion of your personal data under
                  certain conditions.
                </li>
                <li>
                  <strong>Right to Restrict or Object to Processing:</strong>{" "}
                  You can object to our processing of your data, particularly
                  for direct marketing purposes.
                </li>
                <li>
                  <strong>Right to Data Portability:</strong> You can request
                  the transfer of your data to another organization.
                </li>
                <li>
                  <strong>California Privacy Rights (CCPA/CPRA):</strong>{" "}
                  California residents have the right to know what personal
                  information is collected, the right to request deletion, the
                  right to opt-out of the &quot;sale&quot; or
                  &quot;sharing&quot; of personal information (Note: We do not
                  sell personal data), and the right to non-discrimination for
                  exercising these rights.
                </li>
              </ul>
              <p className="mt-2 text-sm sm:text-base text-gray-700">
                To exercise any of these rights, please contact us at{" "}
                <a
                  href="mailto:contact@inspecq.com"
                  className="text-teal-600 font-semibold hover:underline"
                >
                  contact@inspecq.com
                </a>
                . We will respond to your request within the timeframe required
                by applicable law (typically 30 days).
              </p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

            {/* 5. Sharing Your Information */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                5. Sharing Your Information
              </h2>
              <p className="mt-1.5">
                We only share your information with trusted third parties in the
                following limited circumstances:
              </p>
              <ul className="list-disc ml-5 sm:ml-6 mt-2 space-y-1.5">
                <li>
                  <strong>Service Providers:</strong> We share data with
                  third-party vendors who provide services on our behalf (e.g.,
                  Google Workspace for email/cloud storage, CRM systems like
                  HubSpot, and billing/invoicing platforms). These providers are
                  contractually obligated to protect your data.
                </li>
                <li>
                  <strong>Legal Compliance:</strong> If required by law,
                  subpoena, or court order, or to protect the safety, rights, or
                  property of InspecQ.
                </li>
                <li>
                  <strong>Business Transfers:</strong> In the event of a merger,
                  acquisition, reorganization, or sale of all or a portion of
                  our assets, user data may be transferred as a business asset.
                </li>
              </ul>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

            {/* 6. Data Storage & Security */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                6. Data Storage &amp; Security
              </h2>
              <p className="mt-1.5">
                We implement industry-standard technical and organizational
                security measures designed to protect the security of any
                personal information we process. We store data using secure
                third-party tools and platforms such as cloud databases (e.g.,
                Supabase) and Google Workspace.
              </p>
              <p className="mt-2">
                However, please also remember that we cannot guarantee that the
                internet itself is 100% secure. Although we will do our best to
                protect your personal information, transmission of personal
                information to and from our intended destinations is at your own
                risk.
              </p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

            {/* 7. Data Retention */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                7. Data Retention
              </h2>
              <p className="mt-1.5">
                We retain your personal information only for as long as is
                necessary for the purposes set out in this Privacy Policy.
              </p>
              <ul className="list-disc ml-5 sm:ml-6 mt-2 space-y-1.5">
                <li>
                  <strong>General Inquiries:</strong> Data related to inquiries
                  that do not lead to a contract is generally deleted within two
                  (2) years.
                </li>
                <li>
                  <strong>Client Data:</strong> Data related to active clients
                  is retained for the duration of the business relationship and
                  up to seven (7) years thereafter to satisfy legal, tax, and
                  accounting requirements.
                </li>
              </ul>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

            {/* 8. Cookies & Tracking Technologies */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                8. Cookies &amp; Tracking Technologies
              </h2>
              <p className="mt-1.5">
                Our website uses cookies (small text files placed on your
                device) to enhance your browsing experience. Types of cookies
                used may include essential session cookies, preference cookies,
                and analytics cookies.
              </p>

              <div className="mt-4 space-y-4">
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-800">
                    Necessary / Essential Cookies
                  </h3>
                  <p className="mt-1">
                    These Cookies are essential to provide You with services
                    available through the Website and to enable You to use some
                    of its features. They help to authenticate users and prevent
                    fraudulent use of user accounts.
                  </p>
                </div>

                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-800">
                    Cookie Policy / Notice Acceptance Cookies
                  </h3>
                  <p className="mt-1">
                    These Cookies identify if users have accepted the use of
                    cookies on the Website.
                  </p>
                </div>

                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-800">
                    Analytics Cookies (Google Analytics)
                  </h3>
                  <p className="mt-1">
                    We use Google Analytics to monitor and analyze the use of
                    our Service. Google Analytics is a web analytics service
                    offered by Google that tracks and reports website traffic.
                  </p>
                </div>
              </div>

              <p className="mt-4 bg-teal-50 p-4 rounded-lg border border-teal-100 text-sm">
                <strong>Your Choice:</strong> You can set your browser to refuse
                all or some browser cookies, or to alert you when websites set
                or access cookies. You can also opt-out of having made your
                activity on the Service available to Google Analytics by
                installing the Google Analytics opt-out browser add-on or by
                declining cookies through our{" "}
                <span className="font-semibold">Cookie Consent Banner</span>.
              </p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

            {/* 9. International Data Transfers */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                9. International Data Transfers
              </h2>
              <p className="mt-1.5">
                InspecQ operates from multiple locations. If you access our
                website or services from outside our primary operating
                jurisdictions, please be aware that your information may be
                transferred to, stored, and processed in our facilities and by
                third parties with whom we share it. We rely on recognized legal
                mechanisms, such as Standard Contractual Clauses (SCCs), to
                legally transfer data across borders.
              </p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

            {/* 10. Children's Privacy */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                10. Children&apos;s Privacy
              </h2>
              <p className="mt-1.5">
                Our website and services are intended exclusively for a general
                B2B audience. We do not knowingly solicit data from or market to
                children under 16 years of age. If we learn that personal
                information from users less than 16 years of age has been
                collected, we will deactivate the account and take reasonable
                measures to promptly delete such data from our records.
              </p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

            {/* 11. Changes to This Privacy Policy */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                11. Changes to This Privacy Policy
              </h2>
              <p className="mt-1.5">
                We may update this Privacy Policy from time to time. The updated
                version will be indicated by an updated &quot;Last updated&quot;
                date at the top of the policy. We encourage you to review this
                Privacy Policy frequently to be informed of how we are
                protecting your information.
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
                Privacy Policy or how we handle your data, you may email us at:{" "}
                <a
                  href="mailto:contact@inspecq.com"
                  className="text-teal-600 font-semibold"
                > contact@inspecq.com
                </a>
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