"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/utils/cn";

interface Props {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  target?: string;
  disabled?: boolean;
  /** dark = black face, light = white face. Both get the moving border. */
  variant?: "dark" | "light";
  /** show the travelling line around the border (default true) */
  moving?: boolean;
  className?: string;
}

/**
 * Signature button: a solid face with a thick light-line travelling around the
 * border (rotating conic gradient revealed through a padded ring). Renders as a
 * Link when `href` is provided, otherwise a <button>.
 */
const ShimmerButton = ({
  children,
  href,
  onClick,
  type = "button",
  target,
  disabled,
  variant = "dark",
  moving = true,
  className,
}: Props) => {
  const face = cn(
    "relative z-10 inline-flex h-full w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-300",
    variant === "dark"
      ? "bg-ink text-white group-hover:bg-ink-800"
      : "bg-white/95 text-zinc-900 backdrop-blur-sm group-hover:bg-white"
  );

  const inner = moving ? (
    <>
      {/* travelling line around the border */}
      <span className="absolute inset-[-150%] animate-border-spin bg-[conic-gradient(from_0deg,transparent_0deg,transparent_230deg,var(--color-aurora-violet)_290deg,var(--color-aurora-blue)_320deg,var(--color-aurora-teal)_345deg,transparent_360deg)]" />
      <span className={face}>{children}</span>
    </>
  ) : (
    <span className={face}>{children}</span>
  );

  const classes = cn(
    "group relative inline-flex overflow-hidden rounded-full shadow-soft transition-transform duration-300 hover:-translate-y-0.5",
    moving ? "p-[2.5px]" : "p-0",
    disabled && "pointer-events-none opacity-60",
    className
  );

  if (href) {
    return (
      <Link href={href} target={target} className={classes}>
        {inner}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {inner}
    </button>
  );
};

export default ShimmerButton;
