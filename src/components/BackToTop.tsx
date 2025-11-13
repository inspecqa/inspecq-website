import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          setVisible(window.scrollY > 250); // কত দূর স্ক্রল করলে বাটন দেখাবে
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    handleScroll(); // initial check
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
      className="fixed bottom-6 right-6 z-50 rounded-full bg-teal-600 text-white p-3 shadow-lg hover:bg-teal-700 transition-transform hover:scale-105"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};

export default BackToTop;