import { useEffect } from "react";
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

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (!open) return;

    const prev = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    };

    const scrollY = window.scrollY;

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.body.style.overflow = prev.overflow;
      document.body.style.position = prev.position;
      document.body.style.top = prev.top;
      document.body.style.width = prev.width;
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  // Close on ESC
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <div
      aria-hidden={!open}
      className={`
        fixed inset-0 z-[9999]
        ${open ? "pointer-events-auto" : "pointer-events-none"}
      `}
    >
      {/* Backdrop */}
      <div
        className={`
          absolute inset-0 bg-black/40 backdrop-blur-sm
          transition-opacity duration-300 ease-out
          ${open ? "opacity-100" : "opacity-0"}
        `}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`
          absolute left-0 top-0 h-full w-[86vw] max-w-[360px]
          bg-gradient-to-b from-teal-950 via-teal-900 to-teal-800
          text-white shadow-2xl flex flex-col
          pt-[calc(env(safe-area-inset-top)+16px)]
          pb-[calc(env(safe-area-inset-bottom)+16px)]
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
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
              <img src={headerLogo} alt="InspecQ" className="h-16 w-16" />
            </button>
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="grid place-items-center h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Nav */}
          <nav
            className={`
              mt-6 text-left space-y-1 flex-1 overflow-y-auto
              transition-all duration-300
              ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
            `}
          >
            <button
              type="button"
              onClick={() => handleNav("/")}
              className={`block w-full text-left text-body-md px-3 py-3 rounded-lg hover:bg-white/10 transition-colors ${
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
                className={`w-full flex items-center justify-between px-3 py-3 rounded-lg hover:bg-white/10 transition-colors ${
                  location.pathname.startsWith("/services") ? "bg-white/10" : ""
                }`}
                aria-expanded={servicesOpen}
                aria-controls="mobile-services"
              >
                <span>Services</span>
                <ChevronDown
                  className={`h-5 w-5 transition-transform duration-200 ${
                    servicesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                id="mobile-services"
                className={`
                  overflow-hidden transition-[max-height,opacity,transform]
                  duration-300
                  ${
                    servicesOpen
                      ? "max-h-96 opacity-100 translate-y-0"
                      : "max-h-0 opacity-0 -translate-y-1"
                  }
                `}
              >
                <div className="mt-1 ml-2 pl-3 border-l border-white/15 space-y-1">
                  {services.map((s) => (
                    <button
                      key={s.path}
                      type="button"
                      onClick={() => handleNav(s.path)}
                      className={`block w-full text-left px-3 py-2 rounded-md text-white/90 hover:bg-white/10 transition-colors ${
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
              className={`block w-full text-left px-3 py-3 rounded-lg hover:bg-white/10 transition-colors ${
                isActive("/solutions") ? "bg-white/10" : ""
              }`}
            >
              Solutions
            </button>

            <button
              type="button"
              onClick={() => handleNav("/about")}
              className={`block w-full text-left px-3 py-3 rounded-lg hover:bg-white/10 transition-colors ${
                isActive("/about") ? "bg-white/10" : ""
              }`}
            >
              About Us
            </button>

            <button
              type="button"
              onClick={() => handleNav("/pricing")}
              className={`block w-full text-left px-3 py-3 rounded-lg hover:bg-white/10 transition-colors ${
                isActive("/pricing") ? "bg-white/10" : ""
              }`}
            >
              Pricing
            </button>

            <button
              type="button"
              onClick={() => handleNav("/contact")}
              className={`block w-full text-left px-3 py-3 rounded-lg hover:bg-white/10 transition-colors ${
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
                className="w-full text-center rounded-xl bg-white text-black-500 btn-text hover:bg-white/90 px-5 py-3 font-medium transition-colors"
              >
                Start Free Trial
              </button>
            </div>

            {/* Footer */}
            <div className="mt-2 flex flex-col items-center justify-center gap-4 px-1 py-8 text-sm text-white/80 pb-2 border-t border-white/10">
              <p className="xs-regular text-white">
                © 2025 InspecQ. All rights reserved.
              </p>

              <div className="flex items-center justify-center gap-6">
                <button
                  type="button"
                  onClick={() => handleNav("/legal/terms-and-service")}
                  className="hover:text-white transition-colors"
                >
                  Terms &amp; Privacy
                </button>
                <button
                  type="button"
                  onClick={() => handleNav("/legal/privacy-policy")}
                  className="hover:text-white transition-colors"
                >
                  Security
                </button>
              </div>
            </div>
          </nav>
        </div>
      </aside>
    </div>
  );
}