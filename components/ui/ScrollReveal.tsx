"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";

/**
 * Dependency-free scroll-reveal engine (no framer-motion).
 * Uses a single IntersectionObserver and a library of CSS-driven variants
 * defined in globals.css, so every section can reveal with a different,
 * unusual motion. Pass `stagger` to cascade direct children.
 */
export type RevealVariant =
  | "rise"
  | "zoom"
  | "blur"
  | "skew"
  | "flip"
  | "tilt"
  | "clip"
  | "mask"
  | "swing"
  | "unfold"
  | "glitch"
  | "fade";

interface Props {
  children: React.ReactNode;
  variant?: RevealVariant;
  /** ms delay before the reveal plays */
  delay?: number;
  /** cascade direct children instead of the wrapper itself */
  stagger?: boolean;
  /** replay every time it enters the viewport */
  repeat?: boolean;
  className?: string;
  id?: string;
}

const ScrollReveal = ({
  children,
  variant = "rise",
  delay = 0,
  stagger = false,
  repeat = false,
  className,
  id,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            if (!repeat) io.unobserve(e.target);
          } else if (repeat) {
            setShown(false);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [repeat]);

  return (
    <div
      ref={ref}
      id={id}
      data-show={shown ? "true" : "false"}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
      className={cn(
        stagger ? "reveal-stagger" : ["reveal", `reveal-${variant}`],
        className
      )}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
