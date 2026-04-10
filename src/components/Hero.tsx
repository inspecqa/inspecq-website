import { Calendar, MoveRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "../assets/hero-bg.svg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-start justify-center pt-24 md:pt-28 lg:pt-32 pb-8 md:pb-10 lg:pb-12">
      {/* Background illustration */}
      <img
        src={heroBg}
        alt=""
        className="absolute inset-0 w-full h-full max-w-none pointer-events-none -z-10 opacity-90 object-cover"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col items-center text-center w-full">
          {/* Heading */}
          <h1 className="h1 text-teal-900 max-w-3xl mt-8">
            Ship Bug-Free Software Faster with QA Experts
          </h1>

          {/* Subheading */}
          <p className="body-regular mt-3 max-w-2xl text-gray-700">
            From Startups to Enterprises, we ensure flawless delivery through
            end-to-end testing, automation, and security compliance.
          </p>

          {/* CTAs */}
          <div className="mt-7 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto justify-center">
            <Link
              to="/services"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-teal-900 text-white btn-text no-underline shadow-sm hover:bg-teal-600 transition-colors"
            >
              <span>Explore QA Services</span>
              <MoveRight className="h-5 w-5 ml-2" />
            </Link>

            <a
              href="/book?service=30-minutes-meeting"
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
