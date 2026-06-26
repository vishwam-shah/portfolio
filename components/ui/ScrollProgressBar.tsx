"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Thin gradient progress bar pinned to the top of the viewport, scrubbed to the
 * full page scroll via GSAP ScrollTrigger.
 */
const ScrollProgressBar = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left bg-linear-to-r from-aurora-violet via-aurora-blue to-aurora-teal"
      style={{ transform: "scaleX(0)" }}
    />
  );
};

export default ScrollProgressBar;
