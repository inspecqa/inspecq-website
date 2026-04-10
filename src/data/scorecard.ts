// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export type ScoreBand = "At risk" | "Needs work" | "Developing" | "Strong";

export interface Question {
  cat: string;
  text: string;
  opts: [string, number][];
}

export interface CategoryRecommendation {
  critical: string;
  improvement: string;
  strengthen: string;
}

// ─────────────────────────────────────────────
// Questions (20 total)
// ─────────────────────────────────────────────

export const questions: Question[] = [
  {
    cat: "Test coverage",
    text: "How much of your core user journeys are covered by automated tests?",
    opts: [
      ["None — we rely entirely on manual testing", 0],
      ["Some critical paths have tests, but coverage is sparse", 1],
      ["Most happy paths are covered, edge cases are not", 2],
      ["Comprehensive coverage including edge cases and error states", 3],
    ],
  },
  {
    cat: "Test coverage",
    text: "Do you have a documented list of what needs to be tested before each release?",
    opts: [
      ["No formal list — testers use their own judgment", 0],
      ["An informal checklist exists but it's not always followed", 1],
      ["A defined checklist exists and is used consistently", 2],
      ["A living test plan tied to product requirements and updated per sprint", 3],
    ],
  },
  {
    cat: "Test coverage",
    text: "How is API testing handled in your product?",
    opts: [
      ["It's not tested separately — we rely on UI tests", 0],
      ["Some manual Postman/curl checks on major endpoints", 1],
      ["Automated API tests exist for core endpoints", 2],
      ["Comprehensive API test suite with contract testing and edge cases", 3],
    ],
  },
  {
    cat: "Test coverage",
    text: "Do you have performance or load testing in your pipeline?",
    opts: [
      ["No performance testing at all", 0],
      ["Occasional manual load tests before big launches", 1],
      ["Automated performance tests run periodically", 2],
      ["Performance baselines and alerts are part of every release", 3],
    ],
  },
  {
    cat: "Automation",
    text: "What percentage of your regression tests are automated?",
    opts: [
      ["0% — all regression is manual", 0],
      ["Less than 25%", 1],
      ["25–75%", 2],
      ["More than 75%", 3],
    ],
  },
  {
    cat: "Automation",
    text: "How reliable are your automated tests? (flakiness rate)",
    opts: [
      ["Very unreliable — tests fail randomly and are often ignored", 0],
      ["Somewhat flaky — we accept some false failures", 1],
      ["Mostly reliable — occasional flakiness is investigated", 2],
      ["Highly reliable — flaky tests are blocked from merging", 3],
    ],
  },
  {
    cat: "Automation",
    text: "Are automated tests integrated into your CI/CD pipeline?",
    opts: [
      ["No CI/CD pipeline exists", 0],
      ["CI exists but tests are run manually", 1],
      ["Tests run on CI but failures don't block deploys", 2],
      ["Tests are required to pass before any merge or deploy", 3],
    ],
  },
  {
    cat: "Automation",
    text: "How long does your full test suite take to run?",
    opts: [
      ["We don't have an automated suite", 0],
      ["More than 60 minutes", 1],
      ["15–60 minutes", 2],
      ["Under 15 minutes", 3],
    ],
  },
  {
    cat: "Process",
    text: "When are testers involved in the development cycle?",
    opts: [
      ["Only after development is complete", 0],
      ["Near the end of each sprint", 1],
      ["At the start of development for test planning", 2],
      ["From requirements phase — QA reviews specs and acceptance criteria", 3],
    ],
  },
  {
    cat: "Process",
    text: "How are bugs tracked and prioritized?",
    opts: [
      ["Informally — Slack messages or sticky notes", 0],
      ["Basic ticketing (Jira/Linear) but no severity framework", 1],
      ["Structured bug reports with severity/priority classification", 2],
      ["Full triage process with SLA targets for each severity level", 3],
    ],
  },
  {
    cat: "Process",
    text: "How do you handle regression testing after bug fixes?",
    opts: [
      ["We trust that the fix works and move on", 0],
      ["Developer tests their own fix", 1],
      ["QA manually retests the specific fix", 2],
      ["Automated regression plus testing related areas for side effects", 3],
    ],
  },
  {
    cat: "Process",
    text: "Do you conduct test retrospectives or QA process reviews?",
    opts: [
      ["Never", 0],
      ["Only when something goes seriously wrong", 1],
      ["After major releases", 2],
      ["Regularly as part of sprint ceremonies", 3],
    ],
  },
  {
    cat: "Security & compliance",
    text: "How is security testing conducted for your product?",
    opts: [
      ["Not done — we rely on the developer not writing vulnerabilities", 0],
      ["Occasional manual checks or third-party pen tests", 1],
      ["Automated SAST/DAST scanning in the pipeline", 2],
      ["Regular pen testing plus automated scanning plus security test cases", 3],
    ],
  },
  {
    cat: "Security & compliance",
    text: "Has your application been tested for OWASP Top 10 vulnerabilities?",
    opts: [
      ["No", 0],
      ["We're aware of OWASP but haven't tested systematically", 1],
      ["We've done a one-time OWASP review", 2],
      ["OWASP testing is part of our regular release cycle", 3],
    ],
  },
  {
    cat: "Security & compliance",
    text: "Do you test for accessibility (WCAG compliance)?",
    opts: [
      ["No accessibility testing", 0],
      ["We check the basics manually", 1],
      ["We use automated a11y scanning tools", 2],
      ["We combine automated scanning with assistive technology testing", 3],
    ],
  },
  {
    cat: "Mobile & cross-platform",
    text: "How do you test across different browsers and devices?",
    opts: [
      ["We test on one browser and assume it works elsewhere", 0],
      ["Manual testing on a few devices/browsers", 1],
      ["Automated cross-browser tests on major browsers", 2],
      ["Full device/browser matrix with automated and exploratory testing", 3],
    ],
  },
  {
    cat: "Mobile & cross-platform",
    text: "If you have a mobile app, how is it tested?",
    opts: [
      ["No mobile app or no dedicated mobile testing", 0],
      ["Manual testing on one or two physical devices", 1],
      ["Testing on a device farm or emulator suite", 2],
      ["Automated mobile tests plus exploratory testing on real devices", 3],
    ],
  },
  {
    cat: "Team & culture",
    text: "Does your team have a dedicated QA engineer or QA function?",
    opts: [
      ["No — developers self-test their own code", 0],
      ["Shared responsibility — everyone does some QA", 1],
      ["One QA engineer for the whole team", 2],
      ["A dedicated QA function with clear ownership and processes", 3],
    ],
  },
  {
    cat: "Team & culture",
    text: "How is QA knowledge shared and documented in your team?",
    opts: [
      ["It's not — knowledge lives in people's heads", 0],
      ["Some notes exist but aren't maintained", 1],
      ["A QA wiki or runbook exists and is updated occasionally", 2],
      ["Comprehensive, living documentation maintained as part of sprints", 3],
    ],
  },
  {
    cat: "Team & culture",
    text: "How does leadership view QA investment?",
    opts: [
      ["It's seen as a cost to minimize", 0],
      ["It's tolerated but not prioritized", 1],
      ["It's recognized as important but underfunded", 2],
      ["It's treated as a strategic capability tied to release velocity", 3],
    ],
  },
];

// ─────────────────────────────────────────────
// Unique categories (in order of appearance)
// ─────────────────────────────────────────────

export const categories: string[] = Array.from(
  new Set(questions.map((q) => q.cat))
);

// ─────────────────────────────────────────────
// Recommendations (per category, per bracket)
// ─────────────────────────────────────────────

export const recommendations: Record<string, CategoryRecommendation> = {
  "Test coverage": {
    critical:
      "You have significant release risk with minimal test coverage. Establishing even a basic smoke test suite could prevent costly production incidents.",
    improvement:
      "Your coverage foundation exists but has meaningful gaps. Prioritizing test cases for your most-used features and error states would give the highest return.",
    strengthen:
      "Your coverage is solid. Consider adding mutation testing or property-based testing to find the subtle bugs your current suite misses.",
  },
  Automation: {
    critical:
      "Manual-only testing creates a bottleneck that will slow your team as your product grows. Starting with automation for your top 10 user journeys would immediately reduce regression time.",
    improvement:
      "Your automation exists but isn't fully reliable or integrated. Fixing flaky tests and gating deploys on test results would increase its value significantly.",
    strengthen:
      "Good automation maturity. Focus on reducing suite runtime and building visual regression coverage to maintain this advantage at scale.",
  },
  Process: {
    critical:
      "Without a structured QA process, defects are likely slipping through unpredictably. Defining a release checklist and triage process is the highest-leverage starting point.",
    improvement:
      "Your process has structure but inconsistencies. Standardizing your triage workflow and involving QA earlier in sprints would reduce late-cycle bug discovery.",
    strengthen:
      "Strong process foundations. The next level is predictive metrics — tracking escape rate and mean time to detect to proactively improve quality.",
  },
  "Security & compliance": {
    critical:
      "Your product has unmitigated security exposure. A basic OWASP review and SAST tool integration should be prioritized immediately.",
    improvement:
      "You have some security awareness but not systematic coverage. Regular automated scanning plus annual pen testing would close most of the gap.",
    strengthen:
      "Good security posture. Consider threat modeling as part of feature design and adding runtime security monitoring to complement your static checks.",
  },
  "Mobile & cross-platform": {
    critical:
      "You have blind spots on a significant portion of your user base. A cross-browser testing strategy costs less than the support tickets it prevents.",
    improvement:
      "You test across some configurations but have gaps. Expanding to a lightweight device/browser matrix would catch a category of bugs you're currently missing.",
    strengthen:
      "Good cross-platform coverage. Explore real-device testing for your top 3 device segments to catch issues emulators miss.",
  },
  "Team & culture": {
    critical:
      "QA as an afterthought creates compounding technical debt. Even a part-time QA function with clear ownership would transform your release confidence.",
    improvement:
      "QA has some investment but isn't fully empowered. Clearer ownership and documentation would make your existing effort more consistent.",
    strengthen:
      "QA is valued here. Channel that into a QA engineering roadmap and tooling investment to stay ahead of your product's growing complexity.",
  },
};
