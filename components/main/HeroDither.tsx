"use client";

import { useEffect, useRef } from "react";

/**
 * Animated ordered-dithering gradient background (the "hero bg" look from the
 * 21st.dev dithering card, rebuilt in our palette). A smooth density gradient is
 * thresholded through a 4x4 Bayer matrix so the dot DENSITY ramps from sparse
 * (top) to denser (bottom) - the classic dithered gradient - with a slow drift
 * so the field gently shimmers. Light dots so it never reads as a solid blob and
 * text stays readable. Pure canvas 2D, no shader deps.
 */

const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

const PIXEL = 4; // on-screen size of each dither cell

const HeroDither = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let raf = 0;
    let last = 0;

    const resize = () => {
      w = Math.max(1, Math.floor(parent.clientWidth / PIXEL));
      h = Math.max(1, Math.floor(parent.clientHeight / PIXEL));
      canvas.width = w;
      canvas.height = h;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (now - last < 40) return; // ~25fps is plenty for a subtle drift
      last = now;

      const t = now * 0.0006;
      const img = ctx.createImageData(w, h);
      const data = img.data;

      for (let y = 0; y < h; y++) {
        const ny = y / h;
        for (let x = 0; x < w; x++) {
          const nx = x / w;

          // base density gradient (sparse top -> denser bottom-right)
          let density = 0.06 + ny * 0.5 + nx * 0.12;
          // gentle drifting modulation so the dot field shimmers/moves
          density += 0.06 * Math.sin(nx * 4.0 + ny * 3.0 + t);
          density += 0.04 * Math.sin(ny * 6.0 - t * 1.3);
          density = Math.min(0.62, Math.max(0, density));

          const threshold = (BAYER[y & 3][x & 3] + 0.5) / 16;
          const i = (y * w + x) * 4;

          if (density > threshold) {
            data[i] = 190; // matte golden dot (muted, low saturation)
            data[i + 1] = 162;
            data[i + 2] = 104;
            data[i + 3] = 150; // semi-transparent so it stays subtle
          } else {
            data[i + 3] = 0;
          }
        }
      }
      ctx.putImageData(img, 0, 0);

      if (reduce) cancelAnimationFrame(raf); // render one static frame
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="absolute inset-0 h-full w-full"
      style={{ imageRendering: "pixelated" }}
    />
  );
};

export default HeroDither;
