"use client";

/**
 * Motion-animated SVG icons (pqoqubbw style) - copied straight in, no icon
 * package. Built on framer-motion. Each icon accepts `size` + `className`
 * and animates on hover, or continuously while `active` is true.
 */

import * as React from "react";
import { motion, useAnimation, type Variants } from "framer-motion";
import { cn } from "@/utils/cn";

type IconProps = {
  size?: number;
  className?: string;
  /** Drive the animation from a parent (e.g. loading state). */
  active?: boolean;
};

/* ---------------------------------------------------------------- Send ---- */

const planeVariants: Variants = {
  normal: { x: 0, y: 0, rotate: 0, opacity: 1 },
  hover: { x: 2, y: -2, rotate: 8, transition: { type: "spring", stiffness: 350, damping: 12 } },
  send: {
    x: [0, 3, 26],
    y: [0, -3, -26],
    opacity: [1, 1, 0],
    rotate: [0, 8, 14],
    transition: { duration: 0.5, ease: "easeIn" },
  },
};

export function SendIcon({ size = 16, className, active }: IconProps) {
  const controls = useAnimation();

  React.useEffect(() => {
    if (active) controls.start("send");
    else controls.start("normal");
  }, [active, controls]);

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("overflow-visible", className)}
      initial="normal"
      animate={controls}
      onMouseEnter={() => !active && controls.start("hover")}
      onMouseLeave={() => !active && controls.start("normal")}
    >
      <motion.g variants={planeVariants}>
        <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
        <path d="m21.854 2.147-10.94 10.939" />
      </motion.g>
    </motion.svg>
  );
}

/* ------------------------------------------------------------- Sparkle ---- */

export function SparkleIcon({ size = 18, className, active }: IconProps) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("overflow-visible", className)}
    >
      <motion.path
        d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .962 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.962 0z"
        animate={
          active
            ? { scale: [1, 1.12, 1], rotate: [0, 8, 0] }
            : { scale: 1, rotate: 0 }
        }
        transition={{ duration: 1.4, repeat: active ? Infinity : 0, ease: "easeInOut" }}
        style={{ transformOrigin: "12px 12px" }}
      />
      <motion.path
        d="M20 3v4"
        animate={active ? { opacity: [0.3, 1, 0.3] } : { opacity: 0.9 }}
        transition={{ duration: 1.1, repeat: active ? Infinity : 0, delay: 0.2 }}
      />
      <motion.path
        d="M22 5h-4"
        animate={active ? { opacity: [0.3, 1, 0.3] } : { opacity: 0.9 }}
        transition={{ duration: 1.1, repeat: active ? Infinity : 0, delay: 0.35 }}
      />
      <motion.path
        d="M4 17v2"
        animate={active ? { opacity: [0.3, 1, 0.3] } : { opacity: 0.9 }}
        transition={{ duration: 1.1, repeat: active ? Infinity : 0, delay: 0.5 }}
      />
      <motion.path
        d="M5 18H3"
        animate={active ? { opacity: [0.3, 1, 0.3] } : { opacity: 0.9 }}
        transition={{ duration: 1.1, repeat: active ? Infinity : 0, delay: 0.65 }}
      />
    </motion.svg>
  );
}

/* -------------------------------------------------------------- Loader ---- */

export function LoaderIcon({ size = 16, className }: IconProps) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      className={className}
      animate={{ rotate: 360 }}
      transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </motion.svg>
  );
}

/* --------------------------------------------------------------- Check ---- */

export function CheckIcon({ size = 16, className }: IconProps) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <motion.path
        d="M20 6 9 17l-5-5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
    </motion.svg>
  );
}
