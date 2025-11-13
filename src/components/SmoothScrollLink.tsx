import React from "react";
import { useSmoothScroll } from "../hooks/useSmoothScroll";

interface SmoothScrollLinkProps {
  to: string; // e.g., "#ft-process"
  offset?: number;
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
}

const SmoothScrollLink: React.FC<SmoothScrollLinkProps> = ({
  to,
  offset = 100,
  className = "",
  children,
  ariaLabel,
}) => {
  const scrollTo = useSmoothScroll(offset);

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={() => scrollTo(to)}
      className={className}
    >
      {children}
    </button>
  );
};

export default SmoothScrollLink;