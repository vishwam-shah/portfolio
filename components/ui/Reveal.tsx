"use client";

import React from "react";
import ScrollReveal, { type RevealVariant } from "@/components/ui/ScrollReveal";

interface Props {
  children: React.ReactNode;
  delay?: number;
  variant?: RevealVariant;
  stagger?: boolean;
  className?: string;
}

/**
 * Scroll-reveal wrapper built on the custom (non-framer) engine. Defaults to a
 * gentle rise; pass `variant` for a section-specific motion or `stagger` to
 * cascade direct children.
 */
const Reveal = ({ children, delay = 0, variant = "rise", stagger = false, className }: Props) => (
  <ScrollReveal variant={variant} delay={delay} stagger={stagger} className={className}>
    {children}
  </ScrollReveal>
);

export default Reveal;
