"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/utils/cn";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** show a cursor-following spotlight glow */
  spotlight?: boolean;
  /** subtle 3D tilt toward the cursor */
  tilt?: boolean;
  className?: string;
}

/**
 * Frosted-glass surface with an optional cursor spotlight and a soft tilt.
 * The spotlight is driven by CSS custom props updated on mousemove, so it
 * stays cheap (no re-render of children).
 */
const GlassCard = ({
  children,
  spotlight = true,
  tilt = false,
  className,
  ...rest
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const next: React.CSSProperties & Record<string, string> = {
      ["--x"]: `${x}px`,
      ["--y"]: `${y}px`,
    };
    if (tilt) {
      const rx = ((y / rect.height) - 0.5) * -6;
      const ry = ((x / rect.width) - 0.5) * 6;
      next.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    }
    setStyle(next);
  };

  const handleLeave = () => {
    setStyle(tilt ? { transform: "perspective(900px) rotateX(0) rotateY(0)" } : {});
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={style}
      className={cn(
        "group glass overflow-hidden p-6 transition-[transform,box-shadow] duration-300 will-change-transform",
        "hover:shadow-glow",
        className
      )}
      {...rest}
    >
      {spotlight && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(420px circle at var(--x) var(--y), rgba(124,92,255,0.18), transparent 45%)",
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GlassCard;
