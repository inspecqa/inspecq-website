import { Calendar, CheckCircle, MoveRight, Sparkle } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "../assets/hero-bg.svg";

declare global {
  interface Window {
    Calendly: {
      initPopupWidget: (options: { url: string }) => void;
      closePopupWidget?: () => void;
    };
  }
}

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-start justify-center pt-20 md:pt-24 lg:pt-28 pb-40 md:pb-56 lg:pb-64 overflow-visible">
      <img
        src={heroBg}
        alt=""
        className="absolute inset-x-0 bottom-0 w-full max-w-none pointer-events-none z-10 opacity-90 object-contain"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 items-center justify-items-center">
          <div className="flex flex-col items-center text-center w-full">
            <div className="mt-6 mb-6 w-full max-w-2xl">
              <div className="inline-flex items-center bg-background-50 text-teal-800 px-4 py-2 rounded-full text-sm font-medium mx-auto">
                <CheckCircle className="h-4 w-4 mr-2" />
                QA Agency with Expert Team
              </div>
            </div>

            <div className="mx-auto text-center max-w-3xl">
              <p className="h1 text-teal-900">
                Ship Better Software Faster, With Expert QA You Can Trust
              </p>
              <p className="body-regular mt-2">
                From startups to enterprises, we ensure flawless software
                delivery through end-to-end testing, automation, and expert QA
                support.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-6">
                <Link
                  to="/services"
                  className="bg-teal-500 text-white w-[244px] h-[56px] rounded-[48px] flex items-center justify-center gap-2 pt-[16px] pr-[22px] pb-[16px] pl-[24px] btn-text no-underline"
                >
                  <span>Explore QA Services</span>
                  <MoveRight className="h-5 w-5" />
                </Link>

                <a
                  href="https://calendly.com/mail-inspecq/30min"
                  className="min-w-[229px] w-auto h-[56px] rounded-[48px] border others-buttonBorder text-gray-700 flex items-center justify-center gap-2 px-6 btn-text bg-white hover:bg-gray-50 transition-all duration-200"
                >
                  <span className="whitespace-nowrap">
                    Book Free QA Session
                  </span>
                  <Calendar className="h-5 w-5" />
                </a>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
