"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";

/**
 * Preloader — the shader, and nothing else.
 *
 *  Backdrop : ReactBits "LiquidChrome" — MIT + Commons Clause, zero deps, raw
 *             WebGL, cursor-reactive. Shortlisted alternates sit beside it in
 *             components/reactbits/ and are a one-line import swap:
 *             MoltenMetal, Iridescence. Compare them at /loader-lab.
 *
 *  No mark, no name, no rule, no progress rail, no scrim. The shader holds the
 *  screen on its own and then the curtains take it away.
 *
 *  Layering is load-bearing: the ROOT is transparent and the BACKDROP carries
 *  the opaque black, so the closing curtains reveal the real site underneath.
 *  With an opaque root they would only ever expose more black.
 *
 *  Sequence (GSAP, no framer-motion):
 *    0.00-2.40  shader holds the screen (cursor-reactive while it does)
 *    2.40-2.85  curtains fade up to a flat black field
 *    2.85-3.75  backdrop switches off, curtain halves part, site revealed
 */

const Backdrop = dynamic(() => import("@/components/reactbits/LiquidChrome"), {
  ssr: false,
  loading: () => null,
});

const EXIT_AT = 2.4;

export default function Preloader() {
  const [done, setDone] = useState(false);

  const root = useRef<HTMLDivElement>(null);
  const backdrop = useRef<HTMLDivElement>(null);
  const leftCurtain = useRef<HTMLDivElement>(null);
  const rightCurtain = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    // Reduced motion: the shader renders a static frame anyway, so get out of
    // the way quickly rather than holding a still image on screen.
    const at = reduced ? 0.6 : EXIT_AT;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.to(
        [leftCurtain.current, rightCurtain.current],
        { opacity: 1, duration: 0.45, ease: "power2.inOut" },
        at
      );
      tl.set(backdrop.current, { opacity: 0 }, at + 0.45);
      tl.to(
        leftCurtain.current,
        { xPercent: -101, duration: 0.9, ease: "power3.inOut" },
        at + 0.45
      );
      tl.to(
        rightCurtain.current,
        { xPercent: 101, duration: 0.9, ease: "power3.inOut" },
        at + 0.45
      );
      tl.add(() => {
        // Release the scroll lock HERE, not in the effect cleanup. When `done`
        // flips this component returns null but is NOT unmounted (layout.tsx
        // keeps it mounted), so cleanup never runs and the lock would be
        // permanent — the page could never scroll.
        document.documentElement.style.overflow = prevOverflow;
        setDone(true);
      });
    }, root);

    return () => {
      ctx.revert();
      document.documentElement.style.overflow = prevOverflow;
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] overflow-hidden"
      role="status"
      aria-label="Loading"
    >
      {/* opaque layer lives HERE, not on the root, so the exit can reveal the
          site. Backdrop is dynamic with ssr:false, so it never renders on the
          server and needs no mounted flag. */}
      <div
        ref={backdrop}
        className="pointer-events-auto absolute inset-0 z-[1] bg-[#060608]"
      >
        <Backdrop className="h-full w-full" />
      </div>

      {/* curtain halves — invisible during load, they carry the exit reveal */}
      <div
        ref={leftCurtain}
        className="pointer-events-none absolute inset-y-0 left-0 z-[9] w-1/2 bg-[#060608]"
        style={{ opacity: 0 }}
        aria-hidden
      />
      <div
        ref={rightCurtain}
        className="pointer-events-none absolute inset-y-0 right-0 z-[9] w-1/2 bg-[#060608]"
        style={{ opacity: 0 }}
        aria-hidden
      />
    </div>
  );
}