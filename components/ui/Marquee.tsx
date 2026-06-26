"use client";

import React from "react";
import { cn } from "@/utils/cn";

interface Props {
  children: React.ReactNode;
  reverse?: boolean;
  duration?: string;
  className?: string;
  /** pause animation while hovered */
  pauseOnHover?: boolean;
}

/**
 * Infinite horizontal marquee. Children are rendered twice and translated
 * -50% so the loop is seamless. Edges fade out via a mask.
 */
const Marquee = ({
  children,
  reverse = false,
  duration = "40s",
  className,
  pauseOnHover = true,
}: Props) => {
  return (
    <div
      className={cn(
        "group relative flex w-full overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className
      )}
      style={{ ["--marquee-duration" as string]: duration }}
    >
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1}
          className={cn(
            "flex shrink-0 items-center gap-4 pr-4",
            reverse ? "animate-marquee-reverse" : "animate-marquee",
            pauseOnHover && "group-hover:[animation-play-state:paused]"
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
};

export default Marquee;
