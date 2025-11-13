import { useState } from "react";
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

type Tool = { name: string; logo?: string; description?: string };
type Category = {
  id: string; // stable unique id (slug)
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  tools: Tool[];
};

const ToolsStack = () => {
  const categories: Category[] = [
    {
      id: "functional",
      title: "Functional Testing",
      icon: Zap,
      color: "bg-teal-500",
      tools: [
        { name: "Zephyr", logo: "/icons/zephyr.png" },
        { name: "Jira", logo: "/icons/jira.png" },
        { name: "BrowserStack", logo: "/icons/browserstack.png" },
        { name: "Qase", logo: "/icons/qase.png" },
      ],
    },
    {
      id: "automation",
      title: "Test Automation",
      icon: Zap,
      color: "bg-teal-500",
      tools: [
        { name: "Selenium", logo: "/icons/selenium.png" },
        { name: "Cypress", logo: "/icons/cypress.png" },
        { name: "Playwright", logo: "/icons/playwright.png" },
        { name: "WebdriverIO", logo: "/icons/webdriverio.png" },
        { name: "Appium", logo: "/icons/appium.png" },
      ],
    },
    {
      id: "performance",
      title: "Performance Testing",
      icon: Database,
      color: "bg-purple-500",
      tools: [
        { name: "k6", logo: "/icons/k6.svg" },
        { name: "JMeter", logo: "/icons/jmeter.png" },
        { name: "Locust", logo: "/icons/locust.png" },
        { name: "BlazeMeter", logo: "/icons/blazemeter.png" },
      ],
    },
    {
      id: "api",
      title: "API Testing",
      icon: Globe,
      color: "bg-blue-500",
      tools: [
        { name: "Postman", logo: "/icons/postman.png" },
        { name: "REST Assured", logo: "☕" },
        { name: "Newman", logo: "🏃‍♂️" },
      ],
    },
    {
      id: "mobile",
      title: "Mobile Testing",
      icon: Smartphone,
      color: "bg-orange-500",
      tools: [
        { name: "Appium", logo: "/icons/appium.png" },
        { name: "Espresso", logo: "☕" },
        { name: "XCUITest", logo: "🍏" },
      ],
    },
    {
      id: "devops",
      title: "Development & CI/CD",
      icon: Code,
      color: "bg-teal-500",
      tools: [
        { name: "Git & GitHub", logo: "/icons/github.png" },
        { name: "Jenkins", logo: "/icons/jenkins.png" },
        { name: "GitHub Actions", logo: "/icons/github-actions.png" },
        { name: "Docker", logo: "/icons/docker.png" },
        { name: "SonarQube", logo: "/icons/sonarqube.png" },
      ],
    },
  ];

  // Exclusive open: store the id of the currently open card (or null)
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="tools-stack" className="py-20 bg-[#E9F4F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 grid grid-cols-1 md:grid-cols-2 gap-y-8 md:gap-x-28 items-start">
          <div>
            <div className="inline-flex items-center bg-white text-teal-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <CheckCircle className="h-4 w-4 mr-2" />
              Our Technology Stack
            </div>
            <p className="h2">
              Tools & Technologies <br /> We Master
            </p>
          </div>
          <div className="md:self-start pt-12">
            <p className="body-md text-gray-600 max-w-md">
              We choose the right stack for your needs. Whether you’re a startup
              or scaling enterprise, we adapt to your stack seamlessly.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((c, i) => {
            const isOpen = openId === c.id;
            const remaining = c.tools.length > 2 ? c.tools.length - 2 : 0;
            const panelId = `tools-panel-${c.id}`;
            const btnId = `tools-button-${c.id}`;

            return (
              <div
                key={c.id}
                className="relative rounded-2xl bg-white border border-gray-100 p-5 md:p-6"
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`${c.color} text-white p-2.5 rounded-lg`}>
                      <c.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900">
                      {c.title}
                    </h3>
                  </div>

                  {/* Dropdown button */}
                  <button
                    id={btnId}
                    type="button"
                    onClick={() => toggle(c.id)}
                    className={[
                      "h-9 w-9 rounded-full grid place-items-center border transition-colors",
                      isOpen
                        ? "bg-teal-600 border-teal-600 text-white"
                        : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50",
                    ].join(" ")}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    aria-label={isOpen ? "Collapse" : "Expand"}
                  >
                    {isOpen ? <ChevronUp /> : <ChevronDown />}
                  </button>
                </div>

                <div className="my-4 h-px bg-gray-100" />

                {/* Tools content */}
                {isOpen ? (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    className="grid grid-cols-2 gap-x-10 gap-y-4"
                  >
                    {c.tools.map((t, idx) => (
                      <div
                        key={`${c.id}-${t.name}-${idx}`}
                        className="flex items-center gap-3"
                      >
                        {t.logo?.includes("/icons/") ? (
                          <img
                            src={t.logo}
                            alt={t.name}
                            className="w-6 h-6 object-contain"
                          />
                        ) : (
                          <span className="text-xl leading-none">
                            {t.logo ?? "🔧"}
                          </span>
                        )}
                        <span className="text-gray-800 font-medium">
                          {t.name}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-8">
                      {c.tools.slice(0, 2).map((t, idx) => (
                        <div
                          key={`${c.id}-compact-${t.name}-${idx}`}
                          className="flex items-center gap-2"
                        >
                          {t.logo?.includes("/icons/") ? (
                            <img
                              src={t.logo}
                              alt={t.name}
                              className="w-6 h-6 object-contain"
                            />
                          ) : (
                            <span className="text-xl leading-none">
                              {t.logo ?? "🔧"}
                            </span>
                          )}
                          <span className="text-gray-800 font-medium">
                            {t.name}
                          </span>
                        </div>
                      ))}
                    </div>

                    {remaining > 0 && (
                      <span className="ml-auto inline-flex items-center rounded-full border border-gray-200 px-3 py-1 text-sm text-gray-700 bg-white">
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