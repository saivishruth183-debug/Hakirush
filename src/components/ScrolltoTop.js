// src/components/ScrollToTop.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function smoothScrollToTop(duration = 800) {
  const start = window.scrollY;
  const startTime = performance.now();

  function scroll() {
    const now = performance.now();
    const time = Math.min(1, (now - startTime) / duration);
    const timeFunction = 1 - Math.pow(1 - time, 3); // ease-out

    window.scrollTo(0, start * (1 - timeFunction));

    if (time < 1) requestAnimationFrame(scroll);
  }

  requestAnimationFrame(scroll);
}

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    smoothScrollToTop(500); // scroll animation duration
  }, [pathname]); // runs every time route changes

  return null;
};

export default ScrollToTop;
