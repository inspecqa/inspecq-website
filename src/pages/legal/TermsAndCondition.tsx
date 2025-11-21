import React from "react";

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-white to-white relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 bg-[url('/src/assets/pattern-light.svg')] opacity-[0.12] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto pt-24 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14 mt-6 sm:mt-8">
          <div className="inline-flex items-center bg-teal-100 text-teal-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 shadow-sm">
            Terms &amp; Conditions
          </div>

          <p className="h1 font-bold text-teal-900 mb-1 sm:mb-2 mt-1 sm:mt-2 text-2xl sm:text-3xl lg:text-4xl">
            InspecQ Terms &amp; Conditions
          </p>

          <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
            Last updated: November 2025
          </p>

          <p className="body-md text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            These Terms &amp; Conditions govern your use of InspecQ&apos;s
            website, services, and any related materials. By working with us or
            using our site, you agree to these terms.
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-gray-100 p-5 sm:p-8 md:p-10 lg:p-12">
          <section className="space-y-8 sm:space-y-10 text-gray-700 leading-relaxed text-sm sm:text-base">
            {/* 1. Services Provided */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                1. Services Provided
              </h2>
              <p className="mt-1.5">
                InspecQ provides software quality assurance services, which may
                include:
              </p>
              <ul className="list-disc ml-5 sm:ml-6 mt-2 space-y-1.5">
                <li>Manual Testing</li>
                <li>Test Automation</li>
                <li>API Testing</li>
                <li>Performance Testing</li>
                <li>Mobile App Testing</li>
                <li>QA Consulting &amp; Audits</li>
              </ul>
              <p className="mt-2">
                Any additional or custom services will be agreed in writing,
                such as via email or a signed agreement.
              </p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

            {/* 2. Engagement & Scope of Work */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                2. Engagement &amp; Scope of Work
              </h2>
              <p className="mt-1.5">
                Before starting any project, both parties will agree on a Scope
                of Work (&quot;SOW&quot;) outlining:
              </p>
              <ul className="list-disc ml-5 sm:ml-6 mt-2 space-y-1.5">
                <li>Deliverables and testing scope</li>
                <li>Timelines and milestones</li>
                <li>Pricing and payment terms</li>
                <li>Responsibilities and communication expectations</li>
              </ul>
              <p className="mt-2">
                Work begins only after confirmation via email or signed
                agreement.
              </p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

            {/* 3. Client Responsibilities */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                3. Client Responsibilities
              </h2>
              <p className="mt-1.5">
                To allow us to deliver quality work, you agree to:
              </p>
              <ul className="list-disc ml-5 sm:ml-6 mt-2 space-y-1.5">
                <li>
                  Provide required access to environments, builds, APIs, test
                  data, and documentation.
                </li>
                <li>
                  Share clear requirements, acceptance criteria, and priorities.
                </li>
                <li>
                  Respond within reasonable timeframes to questions and feedback
                  requests.
                </li>
                <li>
                  Ensure all provided data and credentials are lawful and do not
                  infringe third-party rights.
                </li>
              </ul>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

            {/* 4. Payment Terms */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                4. Payment Terms
              </h2>
              <p className="mt-1.5">
                Payment terms, currency, and billing frequency will be defined
                in the SOW or invoice. Unless otherwise agreed:
              </p>
              <ul className="list-disc ml-5 sm:ml-6 mt-2 space-y-1.5">
                <li>Invoices are due within the agreed payment window.</li>
                <li>
                  Late or unpaid invoices may result in work being paused until
                  payment is received.
                </li>
                <li>
                  For recurring or monthly services, plans may renew
                  automatically unless cancelled according to the agreed notice
                  period.
                </li>
              </ul>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

            {/* 5. Confidentiality */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                5. Confidentiality
              </h2>
              <p className="mt-1.5">
                Both parties agree to keep confidential all non-public business,
                technical, and product information shared during the engagement.
                Confidential information will not be disclosed to any third
                party except as needed for project delivery and only under
                appropriate confidentiality obligations.
              </p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

            {/* 6. Intellectual Property */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                6. Intellectual Property
              </h2>
              <p className="mt-1.5">Upon full payment of fees:</p>
              <ul className="list-disc ml-5 sm:ml-6 mt-2 space-y-1.5">
                <li>
                  You own the specific test artefacts created for your project
                  (e.g., test cases, test reports, bug reports), unless
                  otherwise agreed.
                </li>
                <li>
                  InspecQ retains ownership of its internal frameworks, scripts,
                  utilities, templates, and methodologies used to deliver the
                  services. These may be reused across clients.
                </li>
              </ul>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

            {/* 7. Non-Disclosure Agreement */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                7. Non-Disclosure Agreement (NDA)
              </h2>
              <p className="mt-1.5">
                If required, both parties may sign a separate NDA. Whether or
                not a standalone NDA exists, the confidentiality obligations in
                these Terms &amp; Conditions remain in force.
              </p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

            {/* 8. Limitation of Liability */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                8. Limitation of Liability
              </h2>
              <p className="mt-1.5">
                To the maximum extent permitted by law, InspecQ will not be
                liable for:
              </p>
              <ul className="list-disc ml-5 sm:ml-6 mt-2 space-y-1.5">
                <li>Indirect, incidental, or consequential damages.</li>
                <li>
                  Losses resulting from incorrect, incomplete, or outdated
                  information provided by the client.
                </li>
                <li>
                  Issues arising from third-party tools, hosting providers, or
                  services outside InspecQ&apos;s control.
                </li>
              </ul>
              <p className="mt-2">
                In any case, InspecQ&apos;s total liability is limited to the
                amount paid by you for the services under the current
                engagement.
              </p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

            {/* 9. Termination */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                9. Termination
              </h2>
              <p className="mt-1.5">
                Either party may terminate the engagement with written notice as
                defined in the SOW or agreement. Upon termination, you agree to
                pay for all work completed up to the effective termination date.
              </p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

            {/* 10. Use of Client Logo & Case Studies */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                10. Use of Client Logo &amp; Case Studies
              </h2>
              <p className="mt-1.5">
                With your explicit permission, InspecQ may reference the
                collaboration in anonymized case studies or display your logo on
                our website or marketing materials. You may decline or withdraw
                this permission at any time.
              </p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

            {/* 11. Governing Law */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                11. Governing Law
              </h2>
              <p className="mt-1.5">
                These Terms &amp; Conditions are governed by the laws of the
                jurisdiction where InspecQ operates, unless superseded by a
                separate written agreement.
              </p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

            {/* 12. Contact */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                12. Contact
              </h2>
              <p className="mt-1.5">
                For any questions about these Terms &amp; Conditions, please
                contact us at{" "}
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
            By continuing to work with InspecQ or using our website, you confirm
            that you have read and agree to these Terms &amp; Conditions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;