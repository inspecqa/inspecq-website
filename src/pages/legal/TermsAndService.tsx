import React from "react";

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-white to-white relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 bg-[url('/src/assets/pattern-light.svg')] opacity-[0.08] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto pt-28 pb-24 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14 mt-8">
          <div className="inline-flex items-center bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-medium mb-4 shadow-sm">
            Legal Terms
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-teal-900 mb-4">
            InspecQ Terms of Service
          </h1>

          <p className="text-sm text-gray-500">Last updated: November 2025</p>

          <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            These Terms of Service govern your use of InspecQ&apos;s website,
            services, and any related materials. By working with us or using our
            site, you agree to these terms.
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white/80 backdrop-blur-sm shadow-sm rounded-2xl border border-gray-100 p-6 sm:p-8 space-y-8">
          {/* 1. Services Provided */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              1. Services Provided
            </h2>
            <p className="text-gray-700 text-sm sm:text-base">
              InspecQ provides software quality assurance services, which may
              include:
            </p>
            <ul className="mt-3 list-disc list-inside space-y-1 text-gray-700 text-sm sm:text-base">
              <li>Manual Testing</li>
              <li>Test Automation</li>
              <li>API Testing</li>
              <li>Performance Testing</li>
              <li>Mobile App Testing</li>
              <li>QA Consulting &amp; Audits</li>
            </ul>
            <p className="mt-3 text-gray-700 text-sm sm:text-base">
              Any additional or custom services will be agreed in writing, such
              as via email or a signed agreement.
            </p>
          </section>

          {/* 2. Engagement & Scope of Work */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              2. Engagement &amp; Scope of Work
            </h2>
            <p className="text-gray-700 text-sm sm:text-base">
              Before starting any project, both parties will agree on a Scope of
              Work (&quot;SOW&quot;) outlining:
            </p>
            <ul className="mt-3 list-disc list-inside space-y-1 text-gray-700 text-sm sm:text-base">
              <li>Deliverables and testing scope</li>
              <li>Timelines and milestones</li>
              <li>Pricing and payment terms</li>
              <li>Responsibilities and communication expectations</li>
            </ul>
            <p className="mt-3 text-gray-700 text-sm sm:text-base">
              Work begins only after confirmation via email or signed agreement.
            </p>
          </section>

          {/* 3. Client Responsibilities */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              3. Client Responsibilities
            </h2>
            <p className="text-gray-700 text-sm sm:text-base">
              To allow us to deliver quality work, you agree to:
            </p>
            <ul className="mt-3 list-disc list-inside space-y-1 text-gray-700 text-sm sm:text-base">
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
          </section>

          {/* 4. Payment Terms */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              4. Payment Terms
            </h2>
            <p className="text-gray-700 text-sm sm:text-base">
              Payment terms, currency, and billing frequency will be defined in
              the SOW or invoice. Unless otherwise agreed:
            </p>
            <ul className="mt-3 list-disc list-inside space-y-1 text-gray-700 text-sm sm:text-base">
              <li>Invoices are due within the agreed payment window.</li>
              <li>
                Late or unpaid invoices may result in work being paused until
                payment is received.
              </li>
              <li>
                For recurring or monthly services, plans may renew automatically
                unless cancelled according to the agreed notice period.
              </li>
            </ul>
          </section>

          {/* 5. Confidentiality */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              5. Confidentiality
            </h2>
            <p className="text-gray-700 text-sm sm:text-base">
              Both parties agree to keep confidential all non-public business,
              technical, and product information shared during the engagement.
              Confidential information will not be disclosed to any third party
              except as needed for project delivery and only under appropriate
              confidentiality obligations.
            </p>
          </section>

          {/* 6. Intellectual Property */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              6. Intellectual Property
            </h2>
            <p className="text-gray-700 text-sm sm:text-base">
              Upon full payment of fees:
            </p>
            <ul className="mt-3 list-disc list-inside space-y-1 text-gray-700 text-sm sm:text-base">
              <li>
                You own the specific test artefacts created for your project
                (e.g., test cases, test reports, bug reports), unless otherwise
                agreed.
              </li>
              <li>
                InspecQ retains ownership of its internal frameworks, scripts,
                utilities, templates, and methodologies used to deliver the
                services. These may be reused across clients.
              </li>
            </ul>
          </section>

          {/* 7. Non-Disclosure Agreement */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              7. Non-Disclosure Agreement (NDA)
            </h2>
            <p className="text-gray-700 text-sm sm:text-base">
              If required, both parties may sign a separate NDA. Whether or not
              a standalone NDA exists, the confidentiality obligations in these
              Terms remain in force.
            </p>
          </section>

          {/* 8. Limitation of Liability */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              8. Limitation of Liability
            </h2>
            <p className="text-gray-700 text-sm sm:text-base">
              To the maximum extent permitted by law, InspecQ will not be liable
              for:
            </p>
            <ul className="mt-3 list-disc list-inside space-y-1 text-gray-700 text-sm sm:text-base">
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
            <p className="mt-3 text-gray-700 text-sm sm:text-base">
              In any case, InspecQ&apos;s total liability is limited to the
              amount paid by you for the services under the current engagement.
            </p>
          </section>

          {/* 9. Termination */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              9. Termination
            </h2>
            <p className="text-gray-700 text-sm sm:text-base">
              Either party may terminate the engagement with written notice as
              defined in the SOW or agreement. Upon termination, you agree to
              pay for all work completed up to the effective termination date.
            </p>
          </section>

          {/* 10. Use of Client Logo / Case Study */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              10. Use of Client Logo &amp; Case Studies
            </h2>
            <p className="text-gray-700 text-sm sm:text-base">
              With your explicit permission, InspecQ may reference the
              collaboration in anonymized case studies or display your logo on
              our website or marketing materials. You may decline or withdraw
              this permission at any time.
            </p>
          </section>

          {/* 11. Governing Law */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              11. Governing Law
            </h2>
            <p className="text-gray-700 text-sm sm:text-base">
              These Terms are governed by the laws of the jurisdiction where
              InspecQ operates, unless superseded by a separate written
              agreement.
            </p>
          </section>

          {/* 12. Contact */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              12. Contact
            </h2>
            <p className="text-gray-700 text-sm sm:text-base">
              For any questions about these Terms of Service, please contact us
              at:
            </p>
            <ul className="mt-3 space-y-1 text-gray-700 text-sm sm:text-base">
              <li>
                <span className="font-medium">Email:</span>{" "}
                <a
                  href="mailto:contact@inspecq.com"
                  className="text-teal-700 hover:underline"
                >
                  contact@inspecq.com
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
                  https://inspecq.com
                </a>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;