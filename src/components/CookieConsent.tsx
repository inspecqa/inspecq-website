import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cookie, ShieldCheck, X } from "lucide-react";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [isClosing, setIsClosing] = useState(false); // এনিমেশনের জন্য

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      // একটু দেরি করে দেখাবে যাতে ইউজার বিরক্ত না হয়
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    } else if (consent === "granted") {
      handleAccept(false);
    }
  }, []);

  const updateConsent = (status: "granted" | "denied") => {
    if (window.gtag) {
      window.gtag("consent", "update", {
        ad_storage: status,
        ad_user_data: status,
        ad_personalization: status,
        analytics_storage: status,
      });
    }
    localStorage.setItem("cookieConsent", status);

    // বন্ধ করার এনিমেশন
    setIsClosing(true);
    setTimeout(() => setShowBanner(false), 300);
  };

  const handleAccept = (updateStorage = true) => {
    if (updateStorage) updateConsent("granted");
  };

  const handleDecline = () => {
    updateConsent("denied");
  };

  if (!showBanner) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[100] transition-transform duration-500 ease-in-out ${
        isClosing ? "translate-y-full" : "translate-y-0"
      }`}
    >
      {/* Main Container with Glassmorphism */}
      <div className="bg-teal-900/90 backdrop-blur-md border-t border-slate-700/50 shadow-2xl p-4 sm:p-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-8">
          {/* Text Section with Icon */}
          <div className="flex items-start gap-4">

            {/* Cookie Icon */}
            <div className="flex-shrink-0 p-2.5 bg-white border border-teal-500/30 rounded-full mt-0.5 sm:mt-0">
              <Cookie className="w-5 h-5 text-teal-400" />
            </div>

            <p className="text-sm leading-relaxed text-white text-center sm:text-left">
              We value your privacy. InspecQ uses cookies to enhance your
              experience, analyze traffic, and ensure our services work
              perfectly. Learn more in our{" "}
              <Link
                to="/legal/privacy-policy"
                className="text-white-400 hover:text-teal-200 underline underline-offset-1 transition-colors"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>

          {/* Buttons Section */}
          <div className="flex gap-3 w-full sm:w-auto">
            <button
              onClick={handleDecline}
              className="flex-1 sm:flex-none px-5 py-2.5 text-sm font-medium text-slate-200 hover:text-white border border-white hover:border-slate-500 rounded-lg transition-colors duration-200"
            >
              Decline
            </button>
            <button
              onClick={() => handleAccept()}
              className="flex-1 sm:flex-none px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-teal-600 to-white-600 hover:from-teal-500 hover:to-white-500 rounded-lg shadow-lg shadow-slate-500/30 transition-all duration-200 transform hover:scale-[1.02]"
            >
              Accept Cookies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;