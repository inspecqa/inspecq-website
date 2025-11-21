import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa6";
import footerLogo from "../assets/footer-logo.svg";

const services = [
  { name: "Functional Testing", path: "/services/functional-testing" },
  { name: "Test Automation", path: "/services/test-automation" },
  { name: "Performance Testing", path: "/services/performance-testing" },
  { name: "Mobile Testing", path: "/services/mobile-testing" },
  // { name: "Security Testing", path: "/services/security-testing" },
  { name: "API Testing", path: "/services/api-testing" },
  { name: "QA Consulting & Audits", path: "/services/qa-consulting-audits" },
];

const company = [
  { name: "About", path: "/about" },
  { name: "Solutions", path: "/solutions" },
  // { name: "Case Studies", path: "/case-studies" },
  { name: "Pricing", path: "/pricing" },
  // { name: "Blog", path: "/blog" },
  // { name: "Careers", path: "/careers" },
  // { name: "Resources", path: "/resources" },
];

const quicklinks = [
  { name: "Terms & Conditions", path: "/legal/terms-and-service" },
  { name: "Privacy Policy", path: "/legal/privacy-policy" },
];

const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterError, setNewsletterError] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterError("");
    setNewsletterSuccess("");

    const email = newsletterEmail.trim();

    if (!email) {
      setNewsletterError("Email address is required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setNewsletterError("Please enter a valid email address.");
      return;
    }

    // TODO: hook into newsletter backend here
    setNewsletterSuccess("You're subscribed! We'll keep you updated.");
    setNewsletterEmail("");
  };

  const handleNavClick = () => {
    // Smooth scroll to top when navigating from footer links
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-[#0F1A24] text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Top row: brand + newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left: brand & socials */}
          <div>
            <Link
              to="/"
              className="inline-flex items-center space-x-3"
              onClick={handleNavClick}
            >
              <img src={footerLogo} alt="InspecQ" className="h-9 w-auto mb-2" />
              {/* <div className="flex flex-col items-start">
                <img
                  src={footerLogo}
                  alt="InspecQ"
                  className="h-9 w-auto mb-2"
                />

                <p className="body-regular text-white leading-relaxed">
                  Built to Inspect. Powered by Quality.
                </p>
              </div> */}
            </Link>

            <p className="mt-4 body-regular text-white max-w-md leading-relaxed">
              Built to Inspect. Powered by Quality. <br></br>We&apos;re a QA
              agency bringing industry expertise to deliver exceptional software
              testing services.
            </p>

            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://www.facebook.com/helloinspecqa"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-teal-600/80 hover:bg-teal-600 grid place-items-center transition"
              >
                <FaFacebook className="h-5 w-5 text-slate-100" />
              </a>

              <a
                href="https://www.linkedin.com/company/inspecq/"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-teal-600/80 hover:bg-teal-600 grid place-items-center transition"
              >
                <FaLinkedin className="h-5 w-5 text-white" />
              </a>

              <a
                href="https://x.com/inspecq"
                aria-label="X (Twitter)"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-teal-600/80 hover:bg-teal-600 grid place-items-center transition"
              >
                <RiTwitterXLine className="h-5 w-5 text-white" />
              </a>
            </div>
          </div>

          {/* Right: newsletter */}
          <div className="lg:justify-self-end w-full max-w-xl">
            <h5>Subscribe to our newsletter</h5>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-4"
            >
              <div className="flex-1">
                <div className="flex items-center bg-white rounded-full shadow-sm">
                  <Mail className="h-5 w-5 text-slate-400 ml-4" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={newsletterEmail}
                    onChange={(e) => {
                      setNewsletterEmail(e.target.value);
                      if (newsletterError) setNewsletterError("");
                      if (newsletterSuccess) setNewsletterSuccess("");
                    }}
                    className="w-full bg-transparent px-3 py-3 text-slate-800 placeholder-slate-400 focus:outline-none"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="btn-text rounded-full bg-teal-500 hover:bg-teal-700 text-white px-6 py-3 transition w-full sm:w-auto text-center"
              >
                Subscribe
              </button>
            </form>

            {(newsletterError || newsletterSuccess) && (
              <p
                className={`mt-2 text-sm ${
                  newsletterError ? "text-red-400" : "text-emerald-400"
                }`}
              >
                {newsletterError || newsletterSuccess}
              </p>
            )}
          </div>
        </div>

        {/* Divider */}
        <hr className="mt-10 md:mt-12 border-slate-800" />

        {/* Lower grid: Services / Company / Quick Links / Contact */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 justify-center justify-items-center md:justify-items-start text-center md:text-left">
          {/* Services */}
          <div>
            <h5>Services</h5>
            <ul className="space-y-3 mt-4">
              {services.map((s) => (
                <li key={s.name}>
                  <Link
                    to={s.path}
                    onClick={handleNavClick}
                    className="body-regular text-slate-400 hover:text-slate-200 transition"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h5>Company</h5>
            <ul className="space-y-3 mt-4">
              {company.map((c) => (
                <li key={c.name}>
                  <Link
                    to={c.path}
                    onClick={handleNavClick}
                    className="body-regular text-slate-400 hover:text-slate-200 transition"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h5>Quick Links</h5>
            <ul className="space-y-3 mt-4">
              {quicklinks.map((q) => (
                <li key={q.name}>
                  <Link
                    to={q.path}
                    onClick={handleNavClick}
                    className="body-regular text-slate-400 hover:text-slate-200 transition"
                  >
                    {q.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5>Contact</h5>
            <ul className="space-y-4 text-slate-300 mt-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-slate-400 mt-0.5" />
                <span className="body-regular">Remote Operations</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-slate-400 mt-0.5" />
                <div className="body-regular text-left">
                  <div>Mon–Fri : 9 AM – 11 PM EST</div>
                  <div>Sat : 10 AM – 2 PM EST</div>
                  <div>Sun : By Appointment Only</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <hr className="mt-10 md:mt-12 border-slate-800" />
        <div className="py-4 mt-2 flex flex-col md:flex-row items-center justify-center text-sm">
          <p className="xs-regular text-slate-200">
            © 2025 InspecQ | All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
