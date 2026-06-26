"use client";

import React from "react";
import dynamic from "next/dynamic";

const StarsBackground = dynamic(() => import("./StarsBackground"), {
  ssr: false,
});

/**
 * Fixed, full-viewport light ambient background:
 *  - near-white canvas
 *  - soft pastel mesh-gradient (violet / blue / teal) that slowly drifts
 *  - dotted grid with a radial fade
 *  - a top spotlight glow
 * Pure CSS/transform animation, no GPU/3D cost.
 */
const AuroraBackground = () => {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-canvas"
    >
      {/* radial gradient from top (white center -> grey edges) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 10%, #ffffff 42%, #e9ecf1 64%, #9aa1ad 100%)",
        }}
      />

      {/* drifting soft blobs for subtle life */}
      <div className="absolute left-[6%] top-[-12%] h-[44vmax] w-[44vmax] animate-aurora-1 rounded-full bg-slate-400/12 blur-[130px]" />
      <div className="absolute right-[0%] top-[6%] h-[38vmax] w-[38vmax] animate-aurora-2 rounded-full bg-slate-400/10 blur-[130px]" />

      {/* revolving universe */}
      <div className="absolute inset-0 opacity-70">
        <StarsBackground />
      </div>

      {/* dotted grid with radial fade */}
      <div className="absolute inset-0 bg-dots [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_72%)]" />

      {/* soft top spotlight (keeps content area airy, lets gradient edges show) */}
      <div className="absolute inset-x-0 top-0 h-[40vh] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.7),transparent_70%)]" />
    </div>
  );
};

export default AuroraBackground;
