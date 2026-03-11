import React from "react";
import SEO from "../../components/SEO";

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-white to-white relative overflow-hidden">
      <SEO
        title="Terms & Conditions"
        description="Review InspecQ's Terms & Conditions which govern the use of our QA testing services, including scope of work, payment, confidentiality, and intellectual property."
        canonical="/terms-and-conditions"
      />
      {/* Decorative background pattern */}
      <div className="absolute inset-0 bg-[url('/src/assets/pattern-light.svg')] opacity-[0.12] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto pt-24 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14 mt-6 sm:mt-8">
          <div className="inline-flex items-center bg-teal-100 text-teal-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 shadow-sm">
            Terms &amp; Conditions
          </div>

          <h1 className="h1 font-bold text-teal-900 mb-1 sm:mb-2 mt-1 sm:mt-2 text-2xl sm:text-3xl lg:text-4xl">
            InspecQ Terms &amp; Conditions
          </h1>

          <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
            Last updated: March 2026
          </p>

          <p className="body-md text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            These Terms &amp; Conditions ("Terms") govern your use of the
            website located at www.inspecq.com (the "Site") and the software
            quality assurance services ("Services") provided by InspecQ
            ("InspecQ", "we", "us", or "our"). By accessing the Site or engaging
            our Services, you ("Client", "you") agree to be bound by these
            Terms. If you do not agree to these Terms, please do not use our
            Site or Services.
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
                InspecQ provides professional software quality assurance
                services, including but not limited to:
              </p>
              <ul className="list-disc ml-5 sm:ml-6 mt-2 space-y-1.5">
                <li>Manual Testing</li>
                <li>Test Automation</li>
                <li>API Testing</li>
                <li>Performance Testing</li>
                <li>Mobile App Testing</li>
                <li>Security Testing</li>
                <li>QA Consulting &amp; Audits</li>
              </ul>
              <p className="mt-2">
                Any specific services to be provided will be detailed in a
                mutually agreed-upon Statement of Work (&quot;SOW&quot;) or
                order form.
              </p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

            {/* 2. Engagement & Scope of Work */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                2. Engagement &amp; Scope of Work
              </h2>
              <p className="mt-1.5">
                Before commencing any project, InspecQ and the Client will
                execute an (&quot;SOW&quot;) outlining:
              </p>
              <ul className="list-disc ml-5 sm:ml-6 mt-2 space-y-1.5">
                <li>Deliverables and testing scope</li>
                <li>Timelines and milestones</li>
                <li>Pricing, payment terms, and billing frequency</li>
                <li>Responsibilities and communication expectations</li>
              </ul>
              <p className="mt-2">
                Work will commence only upon execution of an SOW or explicit
                written confirmation via email. In the event of a conflict
                between these Terms and an SOW, the SOW shall prevail for that
                specific engagement.
              </p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

            {/* 3. Client Responsibilities */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                3. Client Responsibilities
              </h2>
              <p className="mt-1.5">
                The Client acknowledges that the timely and successful delivery
                of Services depends on the Client’s cooperation. The Client
                agrees to:
              </p>
              <ul className="list-disc ml-5 sm:ml-6 mt-2 space-y-1.5">
                <li>
                  Provide timely access to necessary software environments,
                  builds, APIs, test data, and documentation.
                </li>
                <li>
                  Share clear requirements, acceptance criteria, and project
                  priorities.
                </li>
                <li>
                  Review deliverables and respond to queries within reasonable
                  timeframes.
                </li>
                <li>
                  Ensure all provided data, credentials, and software do not
                  infringe upon any third-party intellectual property rights or
                  violate applicable laws.
                </li>
              </ul>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

            {/* 4. Payment Terms */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                4. Payment Terms
              </h2>
              <p className="mt-1.5">Unless otherwise specified in an SOW:</p>
              <ul className="list-disc ml-5 sm:ml-6 mt-2 space-y-1.5">
                <li>
                  Invoices are due and payable within thirty (30) days of the
                  invoice date (Net-30).
                </li>
                <li>
                  Any undisputed amount not paid when due shall accrue interest
                  at a rate of 1.5% per month, or the maximum rate permitted by
                  law, whichever is lower.
                </li>
                <li>
                  InspecQ reserves the right to suspend Services immediately if
                  an invoice remains unpaid past its due date.
                </li>
                <li>
                  For recurring or monthly retainer services, plans may renew
                  automatically unless canceled according to the notice period
                  agreed upon in the SOW.
                </li>
              </ul>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

            {/* 5. Confidentiality */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                5. Confidentiality &amp; Non-Disclosure
              </h2>
              <p className="mt-1.5">
                Both parties agree to treat all non-public business, technical,
                financial, and product information (including source code and
                trade secrets) shared during the engagement as highly
                confidential (&quot;Confidential Information&quot;).
                Confidential Information will not be disclosed to any third
                party except as strictly necessary for project delivery and
                under binding confidentiality obligations. <br /> These
                obligations survive the termination of the engagement. If a
                separate NDA is executed between the parties, the terms of that
                NDA shall govern the exchange of Confidential Information.
              </p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

            {/* 6. Intellectual Property */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                6. Intellectual Property
              </h2>
              <p className="mt-1.5">
                Upon full payment of all undisputed fees:
              </p>
              <ul className="list-disc ml-5 sm:ml-6 mt-2 space-y-1.5">
                <li>
                  Client Ownership: The Client retains all right, title, and
                  interest in and to the specific testing deliverables created
                  exclusively for the Client (e.g., custom test cases, final
                  test reports, logged bugs).
                </li>
                <li>
                  InspecQ Ownership: InspecQ retains all right, title, and
                  interest in and to its pre-existing tools, internal
                  frameworks, automation scripts, utilities, templates, and
                  methodologies (the "Background Technology") used to deliver
                  the Services. InspecQ grants the Client a limited,
                  non-exclusive license to use any Background Technology solely
                  to the extent incorporated into the final deliverables.
                </li>
              </ul>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

            {/* 7. Non-Solicitation */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                7. Non-Solicitation
              </h2>
              <p className="mt-1.5">
                During the term of any active SOW and for a period of twelve
                (12) months following its termination or expiration, the Client
                agrees not to directly or indirectly solicit, recruit, or hire
                any InspecQ employee or contractor who performed Services for
                the Client, without InspecQ’s prior written consent.
              </p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

            {/* 8. Disclaimer of Warranties */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                8. Disclaimer of Warranties
              </h2>
              <p className="mt-1.5">
                <strong>
                  INSPECQ PROVIDES QUALITY ASSURANCE AND TESTING SERVICES ONLY.
                  WE DO NOT GUARANTEE THAT THE CLIENT’S SOFTWARE, PRODUCTS, OR
                  SYSTEMS WILL BE 100% ERROR-FREE, SECURE, OR UNINTERRUPTED.
                </strong>
                <br />
                THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE"
                BASIS. INSPECQ EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY KIND,
                EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED
                WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
                AND NON-INFRINGEMENT.
              </p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

            {/* 9. Limitation of Liability */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                9. Limitation of Liability
              </h2>
              <p className="mt-1.5">
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW:
              </p>
              <ul className="list-disc ml-5 sm:ml-6 mt-2 space-y-1.5">
                <li>
                  <strong>NO CONSEQUENTIAL DAMAGES:</strong> IN NO EVENT SHALL
                  INSPECQ BE LIABLE TO THE CLIENT FOR ANY INDIRECT, INCIDENTAL,
                  CONSEQUENTIAL, SPECIAL, PUNITIVE, OR EXEMPLARY DAMAGES,
                  INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, LOSS OF REVENUE,
                  LOSS OF DATA, OR BUSINESS INTERRUPTION, EVEN IF ADVISED OF THE
                  POSSIBILITY OF SUCH DAMAGES.
                </li>
                <li>
                  <strong>LIABILITY CAP:</strong> INSPECQ’S TOTAL CUMULATIVE
                  LIABILITY FOR ALL CLAIMS ARISING OUT OF OR RELATED TO THESE
                  TERMS OR ANY SOW, WHETHER IN CONTRACT, TORT (INCLUDING
                  NEGLIGENCE), OR OTHERWISE, SHALL NOT EXCEED THE TOTAL AMOUNT
                  ACTUALLY PAID BY THE CLIENT TO INSPECQ FOR THE SPECIFIC
                  SERVICES GIVING RISE TO THE CLAIM DURING THE SIX (6) MONTHS
                  IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE LIABILITY.
                </li>
              </ul>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

            {/* 9. Termination */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                10. Termination
              </h2>
              <p className="mt-1.5">
                Either party may terminate a project engagement with written
                notice as defined in the applicable SOW. Upon termination, the
                Client remains obligated to pay InspecQ for all Services
                performed and expenses incurred up to the effective date of
                termination.
              </p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

            {/* 11. Promotional Use */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                11. Promotional Use
              </h2>
              <p className="mt-1.5">
                Unless otherwise stated in an SOW or NDA, InspecQ may use the
                Client's name and logo on the Site and in marketing materials to
                reference the fact that the Client is a customer. The Client may
                withdraw this permission at any time by sending physical or
                electronic notice to InspecQ.
              </p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

            {/* 12. Governing Law */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                12. Governing Law
              </h2>
              <p className="mt-1.5">
                These Terms and any dispute arising out of or related to them
                shall be governed by and construed in accordance with the laws
                of the State of Bangladesh, without giving effect to its
                conflict of laws principles.
              </p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

            {/* 13. Changes to These Terms */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                13. Changes to These Terms
              </h2>
              <p className="mt-1.5">
                We reserve the right to modify these Terms at any time. We will
                indicate that changes have been made by updating the "Last
                updated" date at the top of this document. Your continued use of
                the Site or Services after any changes constitutes your
                acceptance of the new Terms.
              </p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

            {/* 14. Contact */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                14. Contact
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