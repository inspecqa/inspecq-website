import { useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, X } from "lucide-react";
import headerLogo from "../assets/header-logo.svg";

type Props = {
  open: boolean;
  onClose: () => void;
  servicesOpen: boolean;
  setServicesOpen: (v: boolean) => void;
};

const services = [
  { name: "Functional Testing", path: "/services/functional-testing" },
  { name: "Test Automation", path: "/services/test-automation" },
  { name: "Performance Testing", path: "/services/performance-testing" },
  { name: "Mobile Testing", path: "/services/mobile-testing" },
  { name: "API Testing", path: "/services/api-testing" },
  { name: "QA Consulting & Audits", path: "/services/qa-consulting-audits" },
];

export default function MobileNavDrawer({
  open,
  onClose,
  servicesOpen,
  setServicesOpen,
}: Props) {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const handleNav = (path: string) => {
    navigate(path);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setServicesOpen(false);
    onClose();
  };

  if (!open) return null;

  return (
    <aside
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      className={`
        fixed left-0 top-0 z-[9999] h-screen w-[86vw] max-w-[360px]
        bg-teal-900 text-white shadow-2xl flex flex-col
        pt-[calc(env(safe-area-inset-top)+16px)]
        pb-[calc(env(safe-area-inset-bottom)+16px)]
      `}
    >
      <div className="px-5 flex-1 flex flex-col">
        {/* Header row */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="shrink-0"
            onClick={() => handleNav("/")}
          >
            <img src={headerLogo} alt="InspecQ" className="h-20 w-20" />
          </button>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="grid place-items-center h-6 w-6 rounded bg-white/10 hover:bg-white/15"
          >
            <X className="h-3 w-3" />
          </button>
        </div>

        {/* Nav */}
        <nav className="mt-6 text-left space-y-1 flex-1 overflow-y-auto">
          <button
            type="button"
            onClick={() => handleNav("/")}
            className={`block w-full text-left text-body-md px-3 py-3 rounded-lg hover:bg-white/10 ${
              isActive("/") ? "bg-white/10" : ""
            }`}
          >
            Home
          </button>

          {/* Services accordion */}
          <div className="rounded-lg">
            <button
              type="button"
              onClick={() => setServicesOpen(!servicesOpen)}
              className={`w-full flex items-center justify-between px-3 py-3 rounded-lg hover:bg-white/10 ${
                location.pathname.startsWith("/services") ? "bg-white/10" : ""
              }`}
              aria-expanded={servicesOpen}
              aria-controls="mobile-services"
            >
              <span>Services</span>
              <ChevronDown
                className={`h-5 w-5 transition-transform ${
                  servicesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              id="mobile-services"
              className={`overflow-hidden transition-[max-height,opacity] duration-300 ${
                servicesOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="mt-1 ml-2 pl-3 border-l border-white/15 space-y-1">
                {services.map((s) => (
                  <button
                    key={s.path}
                    type="button"
                    onClick={() => handleNav(s.path)}
                    className={`block w-full text-left px-3 py-2 rounded-md text-white/90 hover:bg-white/10 ${
                      isActive(s.path) ? "bg-white/10" : ""
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleNav("/solutions")}
            className={`block w-full text-left px-3 py-3 rounded-lg hover:bg-white/10 ${
              isActive("/solutions") ? "bg-white/10" : ""
            }`}
          >
            Solutions
          </button>

          <button
            type="button"
            onClick={() => handleNav("/about")}
            className={`block w-full text-left px-3 py-3 rounded-lg hover:bg-white/10 ${
              isActive("/about") ? "bg-white/10" : ""
            }`}
          >
            About Us
          </button>

          <button
            type="button"
            onClick={() => handleNav("/pricing")}
            className={`block w-full text-left px-3 py-3 rounded-lg hover:bg-white/10 ${
              isActive("/pricing") ? "bg-white/10" : ""
            }`}
          >
            Pricing
          </button>

          <button
            type="button"
            onClick={() => handleNav("/contact")}
            className={`block w-full text-left px-3 py-3 rounded-lg hover:bg-white/10 ${
              isActive("/contact") ? "bg-white/10" : ""
            }`}
          >
            Contact
          </button>

          {/* CTA */}
          <div className="mt-6 mb-5">
            <button
              type="button"
              onClick={() => handleNav("/free-trial")}
              className="w-full text-center rounded bg-white text-black-500 btn-text hover:bg-white/90 px-5 py-3 font-medium"
            >
              Start Free Trial
            </button>
          </div>

          {/* Footer */}
          <div className="mt-1 flex flex-col items-center justify-center gap-4 px-1 py-8 text-sm text-white/80 pb-2">
            <button
              type="button"
              onClick={() => handleNav("/legal/free-trial-terms")}
              className="hover:text-white"
            >
              © 2025 InspecQ. All rights reserved.
            </button>

            <div className="flex items-center justify-center gap-6">
              <button
                type="button"
                onClick={() => handleNav("/legal/terms-and-service")}
                className="hover:text-white"
              >
                Terms &amp; Privacy
              </button>
              <button
                type="button"
                onClick={() => handleNav("/legal/privacy-policy")}
                className="hover:text-white"
              >
                Security
              </button>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
}
