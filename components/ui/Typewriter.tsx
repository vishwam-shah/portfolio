"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/utils/cn";

export type TypeLine = { text: string; className?: string };

interface Props {
  lines: TypeLine[];
  /** ms per character */
  speed?: number;
  /** ms before typing starts */
  startDelay?: number;
  /** ms pause between lines */
  linePause?: number;
  caretClassName?: string;
  className?: string;
}

/**
 * Multi-line typewriter. Reserves the full layout box up-front (invisible
 * remainder) so nothing below jumps while it types. Pure React + setTimeout.
 */
const Typewriter = ({
  lines,
  speed = 60,
  startDelay = 350,
  linePause = 320,
  caretClassName,
  className,
}: Props) => {
  const [counts, setCounts] = useState<number[]>(() => lines.map(() => 0));
  const [active, setActive] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(t);
  }, [startDelay]);

  useEffect(() => {
    if (!started || active >= lines.length) return;
    const full = lines[active].text;
    const n = counts[active];

    if (n < full.length) {
      const t = setTimeout(() => {
        setCounts((prev) => {
          const c = [...prev];
          c[active] = n + 1;
          return c;
        });
      }, speed);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => setActive((a) => a + 1), linePause);
    return () => clearTimeout(t);
  }, [started, active, counts, lines, speed, linePause]);

  const caretLine = Math.min(active, lines.length - 1);

  return (
    <span className={className}>
      {lines.map((line, i) => {
        const shown = line.text.slice(0, counts[i]);
        const rest = line.text.slice(counts[i]);
        return (
          <span key={i} className={cn("block", line.className)}>
            <span>{shown}</span>
            {i === caretLine && (
              <span
                aria-hidden
                className={cn(
                  "ml-1 inline-block w-[3px] -translate-y-[0.06em] animate-blink rounded-sm bg-aurora-violet align-middle",
                  caretClassName
                )}
                style={{ height: "0.92em" }}
              />
            )}
            <span className="opacity-0" aria-hidden>
              {rest || " "}
            </span>
          </span>
        );
      })}
    </span>
  );
};

export default Typewriter;
