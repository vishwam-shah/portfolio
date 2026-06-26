import React from "react";
import { cn } from "@/utils/cn";

/** Standard section wrapper: centered, max width, consistent padding. */
const Container = ({
  children,
  className,
  size = "lg",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "lg" | "md";
}) => (
  <div
    className={cn(
      "mx-auto w-full px-5",
      size === "lg" ? "max-w-7xl" : "max-w-4xl",
      className
    )}
  >
    {children}
  </div>
);

export default Container;
