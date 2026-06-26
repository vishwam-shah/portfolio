import { Inter, Sora, JetBrains_Mono } from "next/font/google";

/**
 * SINGLE SOURCE OF TRUTH FOR TYPOGRAPHY.
 * Swap the whole site's fonts here in one place. Each font exposes a CSS
 * variable that `globals.css` maps to a Tailwind token:
 *   --font-inter     -> font-sans     (body)
 *   --font-sora      -> font-display  (headings)
 *   --font-jetbrains -> font-mono     (code / labels)
 *
 * To change a font: replace the import + call below (e.g. swap `Sora` for
 * `Space_Grotesk`) and keep the same `variable` name. Nothing else changes.
 */
export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const fontDisplay = Sora({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

/** Combined className to drop on <html>. */
export const fontVariables = `${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable}`;
