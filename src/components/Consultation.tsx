import consultationIllustration from "../assets/consultation-illustration.svg";
import consultationBg from "../assets/consultation-bg.svg";
declare global {
  interface Window {
    Calendly: {
      initPopupWidget: (options: { url: string }) => void;
      closePopupWidget?: () => void;
    };
  }
}

const ConsultationCta = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[28px]">
          <img
            src={consultationBg}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 mix-blend-multiply" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center px-6 sm:px-10 lg:px-14 py-12 lg:py-16">
            {/* Left copy */}
            <div className="text-white">
              <h1>
                30 Minute Free QA
                <br /> Consultation to clear
                <br /> your doubts.
              </h1>

              <p className="body-regular mt-6 text-white/90 text-lg max-w-2xl">
                Book a 30-minute consultation to discuss your testing needs and
                get expert recommendations.
              </p>

              <a
                href="https://calendly.com/mail-inspecq/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-text mt-10 inline-flex items-center rounded-full bg-white border border-buttonBorder text-slate-900 px-6 sm:px-8 py-3 sm:py-4 text-base font-medium shadow-md hover:shadow-lg transition"
              >
                Schedule Consultation
              </a>
            </div>

            {/* Right illustration */}
            <div className="relative">
              <img
                src={consultationIllustration}
                alt="Consultation illustration"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationCta;
