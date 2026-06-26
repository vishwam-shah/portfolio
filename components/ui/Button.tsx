"use client";

import React from "react";
import ShimmerButton from "./ShimmerButton";

type Variant = "shimmer" | "primary" | "ghost" | "solid";

interface Props {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  target?: string;
  disabled?: boolean;
  variant?: Variant;
  className?: string;
}

/**
 * The single button primitive across the site. Every variant is the signature
 * moving-border button; `ghost` uses a light face for secondary actions, the
 * rest use the black face.
 */
const Button = ({
  children,
  href,
  onClick,
  type = "button",
  target,
  disabled,
  variant = "primary",
  className,
}: Props) => {
  const face = variant === "ghost" ? "light" : "dark";
  return (
    <ShimmerButton
      href={href}
      onClick={onClick}
      type={type}
      target={target}
      disabled={disabled}
      variant={face}
      className={className}
    >
      {children}
    </ShimmerButton>
  );
};

export default Button;
