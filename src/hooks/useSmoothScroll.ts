export const useSmoothScroll = (offset: number = 0) => {
  return (to: string) => {
    const element = document.querySelector(to);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };
};