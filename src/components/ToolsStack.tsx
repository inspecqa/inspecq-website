import { useState, type ComponentType } from "react";
import {
  CheckCircle,
  Code,
  Database,
  Globe,
  Smartphone,
  Zap,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

type Tool = {
  name: string;
  logo?: string;
  description?: string;
};

type Category = {
  id: string;
  title: string;
  icon: ComponentType<{ className?: string }>;
  color: string;
  tools: Tool[];
};

const categories: Category[] = [
  {
    id: "functional",
    title: "Functional Testing",
    icon: Zap,
    color: "bg-teal-500",
    tools: [
      { name: "Jira", logo: "/icon/jira.png" },
      { name: "BrowserStack", logo: "/icon/bs.png" },
      { name: "Qase", logo: "/icon/qase.png" },
    ],
  },
  {
    id: "automation",
    title: "Test Automation",
    icon: Zap,
    color: "bg-teal-500",
    tools: [
      { name: "Selenium", logo: "/icon/selenium.png" },
      { name: "Cypress", logo: "/icon/cypress.png" },
      { name: "Playwright", logo: "/icon/playwright.png" },
      { name: "WebdriverIO", logo: "/icon/webio.png" },
      { name: "Appium", logo: "/icon/appium.png" },
    ],
  },
  {
    id: "performance",
    title: "Performance Testing",
    icon: Database,
    color: "bg-purple-500",
    tools: [
      { name: "k6", logo: "/icon/k6.png" },
      { name: "JMeter", logo: "/icon/jmeter.png" },
      { name: "Locust", logo: "/icon/locust.png" },
    ],
  },
  {
    id: "api",
    title: "API Testing",
    icon: Globe,
    color: "bg-blue-500",
    tools: [
      { name: "Postman", logo: "/icon/postman.png" },
      { name: "REST Assured", logo: "/icon/restassured.png" },
      { name: "Newman", logo: "/icon/postman.png" },
    ],
  },
  {
    id: "mobile",
    title: "Mobile Testing",
    icon: Smartphone,
    color: "bg-orange-500",
    tools: [
      { name: "Appium", logo: "/icon/appium.png" },
      { name: "Espresso", logo: "/icon/espresso.png" },
      { name: "XCUITest", logo: "/icon/ios.png" },
    ],
  },
  {
    id: "devops",
    title: "Development & CI/CD",
    icon: Code,
    color: "bg-teal-500",
    tools: [
      { name: "Git & GitHub", logo: "/icon/github.png" },
      { name: "Jenkins", logo: "/icon/jenkins.png" },
      { name: "GitHub Actions", logo: "/icon/ga.png" },
      { name: "Docker", logo: "/icon/docker.png" },
      { name: "SonarQube", logo: "/icon/sq.png" },
    ],
  },
];

const ToolsStack = () => {
  // store the id of the currently open card (or null)
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="tools-stack" className="py-16 sm:py-20 bg-[#E9F4F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 sm:mb-14 grid grid-cols-1 md:grid-cols-2 gap-y-8 md:gap-x-20 items-start">
          <div>
            <div className="inline-flex items-center bg-white text-teal-800 px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-4 shadow-sm">
              <CheckCircle className="h-4 w-4 mr-2" />
              Our Technology Stack
            </div>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-snug">
              Tools & Technologies <br className="hidden sm:block" /> We Master
            </p>
          </div>

          <div className="md:self-start md:pt-4">
            <p className="text-sm sm:text-base text-gray-600 max-w-md">
              We select the most effective tools for your product and workflows.
              Whether you&apos;re an early-stage startup or a growing team, we
              plug into your stack seamlessly.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {categories.map((c) => {
            const isOpen = openId === c.id;
            const remaining = c.tools.length > 2 ? c.tools.length - 2 : 0;
            const panelId = `tools-panel-${c.id}`;
            const btnId = `tools-button-${c.id}`;

            return (
              <div
                key={c.id}
                className="relative rounded-2xl bg-white border border-gray-100 p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Header row */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`${c.color} text-white p-2.5 rounded-lg flex items-center justify-center`}
                    >
                      <c.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
                      {c.title}
                    </h3>
                  </div>

                  {/* Dropdown button */}
                  <button
                    id={btnId}
                    type="button"
                    onClick={() => toggle(c.id)}
                    className={`h-9 w-9 rounded-full grid place-items-center border text-sm transition-colors
                      ${
                        isOpen
                          ? "bg-teal-600 border-teal-600 text-white"
                          : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                      }`}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    aria-label={isOpen ? "Collapse" : "Expand"}
                  >
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                </div>

                <div className="my-4 h-px bg-gray-100" />

                {/* Tools content */}
                {isOpen ? (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3"
                  >
                    {c.tools.map((t, idx) => (
                      <div
                        key={`${c.id}-${t.name}-${idx}`}
                        className="flex items-center gap-3"
                      >
                        {t.logo ? (
                          <img
                            src={t.logo}
                            alt={t.name}
                            className="w-6 h-6 object-contain"
                          />
                        ) : (
                          <span className="text-xl leading-none">🔧</span>
                        )}
                        <span className="text-sm sm:text-base text-gray-800 font-medium">
                          {t.name}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex flex-wrap items-center gap-4">
                      {c.tools.slice(0, 2).map((t, idx) => (
                        <div
                          key={`${c.id}-compact-${t.name}-${idx}`}
                          className="flex items-center gap-2"
                        >
                          {t.logo ? (
                            <img
                              src={t.logo}
                              alt={t.name}
                              className="w-6 h-6 object-contain"
                            />
                          ) : (
                            <span className="text-xl leading-none">🔧</span>
                          )}
                          <span className="text-sm sm:text-base text-gray-800 font-medium">
                            {t.name}
                          </span>
                        </div>
                      ))}
                    </div>

                    {remaining > 0 && (
                      <span className="ml-auto inline-flex items-center rounded-full border border-gray-200 px-3 py-1 text-xs sm:text-sm text-gray-700 bg-white">
                        + {remaining} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ToolsStack;