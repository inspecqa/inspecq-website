import { Calendar, CheckCircle, MoveRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "../assets/hero-bg.svg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-start justify-center pt-24 md:pt-28 lg:pt-32 pb-8 md:pb-10 lg:pb-12 overflow-hidden">
      {/* Background illustration */}
      <img
        src={heroBg}
        alt=""
        className="absolute inset-x-0 bottom-0 w-full max-w-none pointer-events-none -z-10 opacity-90 object-contain md:object-cover"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col items-center text-center w-full">
          {/* Badge */}
          <div className="mb-5">
            <div className="inline-flex items-center bg-background-50 text-teal-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
              <CheckCircle className="h-4 w-4 mr-2" />
              QA Agency with Expert Team
            </div>
          </div>

          {/* Heading */}
          <h1 className="h1 text-teal-900 max-w-3xl">
            Ship Better Software Faster, With Expert QA You Can Trust
          </h1>

          {/* Subheading */}
          <p className="body-regular mt-3 max-w-2xl text-gray-700">
            From startups to enterprises, we ensure flawless software delivery
            through end-to-end testing, automation, and expert QA support.
          </p>

          {/* CTAs */}
          <div className="mt-7 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto justify-center">
            <Link
              to="/services"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-teal-500 text-white btn-text no-underline shadow-sm hover:bg-teal-600 transition-colors"
            >
              <span>Explore QA Services</span>
              <MoveRight className="h-5 w-5 ml-2" />
            </Link>

            <a
              href="https://calendly.com/mail-inspecq/30min"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border others-buttonBorder bg-white text-gray-700 hover:bg-gray-50 transition-colors btn-text"
            >
              <span className="whitespace-nowrap">Book Free QA Session</span>
              <Calendar className="h-5 w-5 ml-2" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
