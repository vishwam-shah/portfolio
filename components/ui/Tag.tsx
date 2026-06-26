import React from "react";
import { cn } from "@/utils/cn";

/** Small pill used for tech / keyword chips. */
const Tag = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span
    className={cn(
      "rounded-full border border-line bg-white/60 px-3 py-1 text-xs text-fg3",
      className
    )}
  >
    {children}
  </span>
);

export default Tag;
