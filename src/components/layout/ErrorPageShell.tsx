import { Link, useNavigate } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

type CtaConfig = {
  label: string;
  to?: string;
  onClick?: () => void;
  external?: boolean;
};

interface ErrorPageShellProps {
  statusCode: string;
  label: string;
  title: string;
  subtitle?: string;
  description: string;
  Icon: LucideIcon;
  primaryCta: CtaConfig;
  secondaryCta?: CtaConfig;
}

const ErrorPageShell: React.FC<ErrorPageShellProps> = ({
  statusCode,
  label,
  title,
  subtitle,
  description,
  Icon,
  primaryCta,
  secondaryCta,
}) => {
  const navigate = useNavigate();

  const renderCta = (cta: CtaConfig, variant: "primary" | "secondary") => {
    const baseClasses =
      "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white";
    const primaryClasses =
      "bg-teal-600 text-white shadow-md shadow-teal-500/25 hover:bg-teal-700 hover:shadow-lg";
    const secondaryClasses =
      "border border-slate-200 bg-white text-slate-700 hover:border-teal-200 hover:text-teal-700";

    const className =
      baseClasses +
      " " +
      (variant === "primary" ? primaryClasses : secondaryClasses);

    if (cta.onClick) {
      return (
        <button type="button" onClick={cta.onClick} className={className}>
          {cta.label}
        </button>
      );
    }

    if (cta.to) {
      if (cta.external) {
        return (
          <a
            href={cta.to}
            target="_blank"
            rel="noreferrer"
            className={className}
          >
            {cta.label}
          </a>
        );
      }

      return (
        <Link to={cta.to} className={className}>
          {cta.label}
        </Link>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-b from-teal-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-950 dark:to-black font-onest overflow-hidden">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-teal-100 opacity-40 blur-3xl" />
        <div className="absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-teal-200 opacity-30 blur-3xl" />
      </div>

      {/* Simple SVG illustration */}
      <div className="pointer-events-none absolute bottom-6 right-6 hidden md:block opacity-60 dark:opacity-40">
        <svg
          width="120"
          height="80"
          viewBox="0 0 120 80"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="8"
            y="10"
            width="104"
            height="60"
            rx="10"
            className="fill-white/80 dark:fill-slate-900/70"
          />
          <rect
            x="18"
            y="22"
            width="40"
            height="8"
            className="fill-teal-400/80"
          />
          <rect
            x="18"
            y="38"
            width="26"
            height="6"
            className="fill-slate-300 dark:fill-slate-700"
          />
          <rect
            x="18"
            y="50"
            width="32"
            height="6"
            className="fill-slate-200 dark:fill-slate-800"
          />
          <circle
            cx="86"
            cy="32"
            r="10"
            className="fill-teal-100 dark:fill-slate-800"
          />
          <path
            d="M81 32.5l3.5 3.5 6-7"
            className="stroke-teal-600 dark:stroke-teal-400"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-xl w-full px-4 sm:px-6">
        <div className="rounded-3xl bg-white/85 dark:bg-slate-900/90 backdrop-blur border border-teal-100/70 dark:border-slate-800 shadow-xl px-6 py-10 sm:px-10 sm:py-12 animate-fade-in-up">
          {/* Status + back */}
          <div className="flex items-center justify-between mb-6">
            <span className="inline-flex items-center justify-center rounded-full border border-teal-100 bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-teal-700 dark:bg-teal-900/60 dark:border-teal-800 dark:text-teal-200">
              {statusCode} • {label}
            </span>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="hidden sm:inline-flex text-xs font-medium text-slate-500 hover:text-teal-700 dark:text-slate-400 dark:hover:text-teal-300 transition"
            >
              Go back
            </button>
          </div>

          <div className="flex items-start gap-5">
            <div className="mt-1 hidden sm:flex items-center justify-center h-14 w-14 rounded-2xl bg-teal-50 border border-teal-100 dark:bg-slate-900 dark:border-slate-800">
              <Icon className="h-7 w-7 text-teal-700 dark:text-teal-300" />
            </div>

            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900 dark:text-slate-50 mb-2">
                {title}
              </h1>

              {subtitle && (
                <p className="text-xs sm:text-sm font-medium uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300 mb-3">
                  {subtitle}
                </p>
              )}

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                {description}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {renderCta(primaryCta, "primary")}
                {secondaryCta && renderCta(secondaryCta, "secondary")}
              </div>

              <p className="mt-6 text-xs text-slate-400 dark:text-slate-500">
                Built to Inspect. Powered by Quality. — InspecQ Error Page
              </p>
            </div>
          </div>

          {/* Mobile back */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-4 inline-block text-xs font-medium text-slate-500 hover:text-teal-700 dark:text-slate-400 dark:hover:text-teal-300 transition sm:hidden"
          >
            Go back to previous page
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPageShell;