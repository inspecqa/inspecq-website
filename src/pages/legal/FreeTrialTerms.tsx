const FreeTrialTerms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-white to-white relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 bg-[url('/src/assets/pattern-light.svg')] opacity-[0.12] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto pt-28 pb-24 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14 mt-8">
          <div className="inline-flex items-center bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-medium mb-4 shadow-sm">
            7-Day Trial's Terms & Conditions
          </div>

          <p className="h1 font-bold text-teal-900 mb-4 mt-2">
            InspecQ Free Trial Terms
          </p>

          <p className="body-md text-gray-600 max-w-2xl mx-auto">
            Please review these terms to understand what’s included in your
            complimentary InspecQ trial and how we operate with full
            transparency.
          </p>
        </div>

        {/* Premium Content Card */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-10 md:p-12">
          <section className="space-y-10 text-gray-700 leading-relaxed">
            {/* 1 */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                1. Trial Duration
              </h2>
              <p className="mt-1">
                Your InspecQ Free Trial lasts for{" "}
                <strong>7 calendar days</strong> from the moment your request is
                confirmed.
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

            {/* 2 */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                2. No Payment Required
              </h2>
              <p className="mt-1">
                No credit card or payment method is needed. The trial does{" "}
                <strong>not</strong> auto-upgrade into a paid plan.
              </p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

            {/* 3 */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                3. What’s Included
              </h2>
              <p className="mt-1">
                During the trial period, InspecQ provides a{" "}
                <strong>lightweight, evaluation-focused QA review</strong>. This
                may include:
              </p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Smoke & basic functional testing</li>
                <li>API or mobile sanity checks (if applicable)</li>
                <li>Bug reporting with evidence</li>
                <li>High-level quality insights</li>
                <li>Process & tooling recommendations</li>
              </ul>

              <p className="mt-2">
                <strong>The exact scope will be confirmed during the kickoff call.</strong>
              </p>

            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

            {/* 4 */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                4. Limited Scope — Fair Use
              </h2>
              <p className="mt-1">
                The free trial is designed for evaluation only. InspecQ reserves
                the right to reasonably limit the scope if the requested work
                exceeds what is feasible within the complimentary trial period.
              </p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

            {/* 5 */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                5. No SLAs or Guarantees
              </h2>
              <p className="mt-1">
                The free trial does not include SLAs, guaranteed coverage, or
                comprehensive multi-platform testing. All work is performed on a
                best-effort basis.
              </p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

            {/* 6 */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                6. Confidentiality & Security
              </h2>
              <p className="mt-1">
                Any information you share during the trial remains confidential.
                We do not disclose or resell your data.
              </p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

            {/* 7 */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                7. System Access Requirements
              </h2>
              <p className="mt-1">
                You may need to provide temporary access (non-production) to
                staging environments for the trial. Access must:
              </p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>avoid production databases or sensitive data</li>
                <li>follow least-permission / QA-only access best practices</li>
                <li>be removed after the trial upon your request</li>
              </ul>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

            {/* 8 */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                8. Deliverables at Trial Completion
              </h2>
              <p className="mt-1">You will receive:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>A summary of findings</li>
                <li>Any detected bugs</li>
                <li>Key quality recommendations</li>
                <li>Suggestions for next steps or engagement options</li>
              </ul>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

            {/* 9 */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                9. Right to Refuse or Discontinue
              </h2>
              <p className="mt-1">
                InspecQ may decline or stop a trial if the request involves:
              </p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>unsafe access requirements</li>
                <li>misuse of services</li>
                <li>unrealistic expectations outside of trial limitations</li>
              </ul>
            </div>
          </section>

          <p className="mt-12 text-gray-600 text-center">
            For questions about these terms, contact{" "}
            <a
              href="mailto:hello@inspecq.com"
              className="text-teal-600 font-semibold hover:underline"
            >
              hello@inspecq.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default FreeTrialTerms;
