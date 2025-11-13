import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, X } from "lucide-react";

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
  { name: "Security Testing", path: "/services/security-testing" },
  { name: "API Testing", path: "/services/api-testing" },
];

export default function MobileNavDrawer({
  open,
  onClose,
  servicesOpen,
  setServicesOpen,
}: Props) {
  const location = useLocation();

  // Close on route change
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Lock page scroll
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden
        className={`fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm transition-opacity ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`fixed left-0 top-0 z-[80] h-screen w-[86vw] max-w-[360px]
        bg-teal-900 text-white shadow-2xl flex flex-col justify-between
        pt-[calc(env(safe-area-inset-top)+16px)] pb-[calc(env(safe-area-inset-bottom)+16px)]
        transition-transform duration-300 will-change-transform
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="px-5">
          {/* Header row */}
          <div className="flex items-center justify-between">
            <Link to="/" className="shrink-0">
              <img
                src="./assets/header-logo.svg"
                alt="InspecQ"
                className="h-8 w-8"
              />
            </Link>
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="grid place-items-center h-6 w-6 rounded bg-white/10 hover:bg-white/15"
            >
              <X className="h-3 w-3" />
            </button>
          </div>

          {/* Nav */}
          <nav className="mt-6 text-left space-y-1">
            <Link
              to="/"
              className="block text-body-md px-3 py-3 rounded-lg hover:bg-white/10"
            >
              Home
            </Link>

            {/* Services accordion */}
            <div className="rounded-lg">
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="w-full flex items-center justify-between px-3 py-3 rounded-lg hover:bg-white/10"
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
                    <Link
                      key={s.path}
                      to={s.path}
                      className="block px-3 py-2 rounded-md text-white/90 hover:bg-white/10"
                    >
                      {s.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              to="/solutions"
              className="block px-3 py-3 rounded-lg hover:bg-white/10"
            >
              Solution
            </Link>
            <Link
              to="/about"
              className="block px-3 py-3 rounded-lg hover:bg-white/10"
            >
              About Us
            </Link>
            <Link
              to="/pricing"
              className="block px-3 py-3 rounded-lg hover:bg-white/10"
            >
              Pricing
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-3 rounded-lg hover:bg-white/10"
            >
              Contact
            </Link>

            {/* CTA */}
            <div>
              <Link
                to="/free-trial"
                className="mt-16 block text-center rounded bg-white text-black-500 btn-text hover:bg-white/90 px-5 py-3 font-medium"
              >
                Start Free Trial
              </Link>
            </div>

            {/* Divider */}
            <div className="mt-20 my-5 h-px bg-white/15" />
          </nav>

          {/* Footer */}
          <div className="flex items-center justify-between px-1 text-sm text-white/80">
            <Link to="/legal" className="hover:text-white">
              © 2025 InspecQ. All rights reserved.
            </Link>
            <div className="flex gap-6">
              <Link to="/terms" className="hover:text-white">
                Terms & Privacy
              </Link>
              <Link to="/security" className="hover:text-white">
                Security
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}