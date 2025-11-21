import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import MobileNavDrawer from "../components/MobileNavDrawer";
import headerLogo from "../assets/header-logo.svg";

type HeaderProps = {
  showCta?: boolean;
  transparent?: boolean;
};

const services = [
  { name: "Functional Testing", path: "/services/functional-testing" },
  { name: "Test Automation", path: "/services/test-automation" },
  { name: "Performance Testing", path: "/services/performance-testing" },
  { name: "Mobile Testing", path: "/services/mobile-testing" },
  { name: "API Testing", path: "/services/api-testing" },
  { name: "QA Consulting & Audits", path: "/services/qa-consulting-audits" },
];

const Header = ({ showCta = true, transparent = false }: HeaderProps) => {
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

  const isActive = (p: string) => location.pathname === p;

  const scrollToTop = () => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Hide/show + elevation on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        const goingDown = y > lastScrollY.current;
        const passedThreshold = y > 120;

        setElevated(y > 4);

        if (isMenuOpen || isServicesOpen) {
          setIsHidden(false);
        } else {
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

  // On route change: close menus & show header
  useEffect(() => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
    setIsHidden(false);
  }, [location.pathname]);

  const handleNavClick = () => {
    scrollToTop();
  };

  const containerBg = transparent && !elevated ? "bg-white/70" : "bg-white/95";

  return (
    <header className="fixed top-0 inset-x-0 z-50 pointer-events-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div
          className={`pointer-events-auto rounded-[48px] ${containerBg} backdrop-blur border border-gray-100 px-4 sm:px-6 ${
            elevated ? "shadow-lg" : "shadow-md"
          } ${
            prefersReduceMotion.current
              ? ""
              : "transition-transform duration-300 will-change-transform"
          } ${
            isHidden ? "-translate-y-10 opacity-0" : "translate-y-0 opacity-100"
          }`}
        >
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link
              to="/"
              onClick={handleNavClick}
              className="flex items-center gap-3"
            >
              <img
                src={headerLogo}
                alt="InspecQ"
                className="h-8 w-auto ml-2 sm:ml-4 mt-1 sm:mt-2"
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-4 lg:gap-6">
              <Link
                to="/"
                onClick={handleNavClick}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  isActive("/")
                    ? "bg-teal-50 text-teal-800"
                    : "text-teal-700 hover:text-teal-700 hover:bg-teal-50"
                }`}
              >
                Home
              </Link>

              {/* Services dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <button
                  type="button"
                  className={`flex items-center gap-1 px-2 py-2 rounded-full text-sm font-medium transition ${
                    location.pathname.startsWith("/services")
                      ? "text-teal-700"
                      : "text-teal-700 hover:text-teal-700"
                  }`}
                  aria-haspopup="true"
                  aria-expanded={isServicesOpen}
                >
                  Services <ChevronDown className="h-4 w-4" />
                </button>

                {isServicesOpen && (
                  <div className="absolute top-full left-0 w-64 bg-white border border-gray-100 rounded-xl shadow-lg py-2">
                    <Link
                      to="/services"
                      onClick={() => {
                        setIsServicesOpen(false);
                        handleNavClick();
                      }}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-700"
                    >
                      All Services
                    </Link>
                    <div className="my-2 border-t border-gray-100" />
                    {services.map((s) => (
                      <Link
                        key={s.path}
                        to={s.path}
                        onClick={() => {
                          setIsServicesOpen(false);
                          handleNavClick();
                        }}
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
                onClick={handleNavClick}
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
                onClick={handleNavClick}
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
                onClick={handleNavClick}
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
                onClick={handleNavClick}
                className={`text-sm rounded-full px-4 py-2 font-medium transition ${
                  isActive("/contact")
                    ? "bg-teal-50 text-teal-800"
                    : "text-teal-700 hover:text-teal-700"
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Desktop CTA */}
            {showCta && (
              <div className="hidden md:flex">
                <Link
                  to="/free-trial"
                  onClick={handleNavClick}
                  className="rounded-full bg-teal-700 hover:bg-teal-800 text-white px-6 py-3 text-sm font-medium transition"
                >
                  Start Free Trial
                </Link>
              </div>
            )}

            {/* Mobile toggle (opens drawer) */}
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="md:hidden p-2 text-teal-700"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
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

      {/* Mobile drawer only – matches your design */}
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