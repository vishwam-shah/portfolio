"use client";

import { usePathname } from "next/navigation";

/**
 * Hides the global site chrome (preloader, navbar, cursor, backgrounds) on
 * standalone routes. The root layout applies to every route in the App Router
 * and cannot be opted out of, so /loader-lab was otherwise rendering the
 * preloader over itself — a fixed inset-0 z-[100] overlay that swallowed every
 * click — plus the site header.
 */

const BARE_ROUTES = ["/loader-lab"];

export default function SiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const bare = BARE_ROUTES.some((r) => pathname?.startsWith(r));
  if (bare) return null;
  return <>{children}</>;
}