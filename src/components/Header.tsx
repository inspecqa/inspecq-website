import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import MobileNavDrawer from "../components/MobileNavDrawer.tsx";
import headerLogo from "../assets/header-logo.svg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [elevated, setElevated] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const location = useLocation();
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const prefersReduceMotion = useRef<boolean>(
    typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const services = [
    { name: "Functional Testing", path: "/services/functional-testing" },
    { name: "Test Automation", path: "/services/test-automation" },
    { name: "Performance Testing", path: "/services/performance-testing" },
    { name: "Mobile Testing", path: "/services/mobile-testing" },
    // { name: "Security Testing", path: "/services/security-testing" },
    { name: "API Testing", path: "/services/api-testing" },
  ]
  
  const isActive = (p: string) => location.pathname === p;

  // Handle hide/show + elevation in a single scroll loop
  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        const goingDown = y > lastScrollY.current;
        const passedThreshold = y > 120;

        // Elevation (shadow) if slightly scrolled
        setElevated(y > 4);

        // Keep header visible if menus are open
        if (isMenuOpen || isServicesOpen) {
          setIsHidden(false);
        } else {
          // Hide on scroll down after threshold; show on scroll up or near top
          if (goingDown && passedThreshold) {
            setIsHidden(true);
          } else {
            setIsHidden(false);
          }
        }

        lastScrollY.current = y;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen, isServicesOpen]);

  // When route changes, close menus and reveal header
  useEffect(() => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
    setIsHidden(false);
  }, [location.pathname]);


  return (
    <header className="fixed top-0 inset-x-0 z-50 pointer-events-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div
          className={[
            "pointer-events-auto rounded-[48px] bg-white/95 backdrop-blur border border-gray-100",
            elevated ? "shadow-lg" : "shadow-md",
            // Smooth hide/show
            prefersReduceMotion.current
              ? ""
              : "transition-transform duration-300 will-change-transform",
            isHidden
              ? "-translate-y-10 opacity-0"
              : "translate-y-0 opacity-100",
            "px-4 sm:px-6",
          ].join(" ")}
        >
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img
                src={headerLogo}
                alt="InspecQ"
                className="h-8 w-auto ml-4 mt-2"
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className={`px-4 py-2 rounded-full  text-sm font-medium  transition ${
                  isActive("/")
                    ? "bg-teal-50 text-teal-800"
                    : "text-teal-700 hover:text-teal-700 hover:bg-teal-50"
                }`}
              >
                Home
              </Link>

              {/* Services w/ dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <button
                  className={`flex items-center gap-1 px-2 py-2 rounded-full text-sm font-medium transition ${
                    location.pathname.startsWith("/services")
                      ? "text-teal-700"
                      : "text-teal-700 hover:text-teal-700"
                  }`}
                >
                  Services <ChevronDown className="h-4 w-4" />
                </button>

                {isServicesOpen && (
                  <div className="absolute top-full left-0 w-64 bg-white border border-gray-100 rounded-xl shadow-lg py-2">
                    <Link
                      to="/services"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-700"
                    >
                      All Services
                    </Link>
                    <div className="my-2 border-t border-gray-100" />
                    {services.map((s) => (
                      <Link
                        key={s.path}
                        to={s.path}
                        onClick={() => setIsServicesOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-700"
                      >
                        {s.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/solutions"
                className={`text-sm rounded-full px-4 py-2 font-medium transition ${
                  isActive("/solutions")
                    ? "bg-teal-50 text-teal-800"
                    : "text-teal-700 hover:text-teal-700"
                }`}
              >
                Solution
              </Link>

              <Link
                to="/pricing"
                className={`text-sm rounded-full px-4 py-2 font-medium transition ${
                  isActive("/pricing")
                    ? "bg-teal-50 text-teal-800"
                    : "text-teal-700 hover:text-teal-700"
                }`}
              >
                Pricing
              </Link>

              <Link
                to="/about"
                className={`text-sm rounded-full px-4 py-2 font-medium transition ${
                  isActive("/about")
                    ? "bg-teal-50 text-teal-800"
                    : "text-teal-700 hover:text-teal-700"
                }`}
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className={`text-sm rounded-full px-4 py-2 font-medium transition ${
                  isActive("/contact")
                    ? "bg-teal-50 text-teal-800"
                    : "text-teal-700 hover:text-teal-700"
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* CTA */}
            <div className="hidden md:flex">
              <Link
                to="/free-trial"
                className="rounded-full bg-teal-700 hover:bg-teal-800 text-white px-6 py-3 text-sm font-medium transition"
              >
                Start Free Trial
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden p-2 text-teal-700"
              aria-label="Open menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-3 mx-4 bg-white border border-gray-100 rounded-2xl shadow-lg">
          <div className="px-2 py-3 space-y-1">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-teal-700 hover:bg-teal-50 hover:text-teal-700"
            >
              Home
            </Link>
            <Link
              to="/services"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-teal-700 hover:bg-teal-50 hover:text-teal-700"
            >
              Services
            </Link>
            <Link
              to="/solutions"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-teal-700 hover:bg-teal-50 hover:text-teal-700"
            >
              Solution
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-teal-700 hover:bg-teal-50 hover:text-teal-700"
            >
              About Us
            </Link>
            <Link
              to="/pricing"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-teal-700 hover:bg-teal-50 hover:text-teal-700"
            >
              Pricing
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-teal-700 hover:bg-teal-50 hover:text-teal-700"
            >
              Contact
            </Link>
            <div className="border-t border-gray-100 my-2" />
            <Link
              to="/free-trial"
              onClick={() => setIsMenuOpen(false)}
              className="block mx-2 mb-2 text-center rounded-full bg-teal-700 hover:bg-teal-800 text-white px-4 py-3 text-sm font-medium transition"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      )}

      <MobileNavDrawer
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        servicesOpen={isServicesOpen}
        setServicesOpen={setIsServicesOpen}
      />
    </header>
  );
};

export default Header;