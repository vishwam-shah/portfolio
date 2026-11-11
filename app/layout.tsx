import "./globals.css";
import type { Metadata, Viewport } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";
import { fontVariables } from "./fonts";
import AuroraBackground from "@/components/main/AuroraBackground";
import Navbar from "@/components/main/Navbar";
import Preloader from "@/components/main/Preloader";
import CustomCursor from "@/components/main/CustomCursor";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import SiteChrome from "@/components/main/SiteChrome";

export const metadata: Metadata = {
  metadataBase: new URL("https://vishwamshah.vercel.app"),
  title: "Vishwam Shah | AI Engineer & Full-Stack Developer",
  description:
    "AI engineer and full-stack developer. I build production LLM, RAG and agentic systems, on-device computer vision (YOLO / OCR / ONNX), and scalable Next.js platforms.",
  keywords: [
    "Vishwam Shah",
    "AI Engineer",
    "Full Stack Developer",
    "Machine Learning",
    "LLM",
    "RAG",
    "Agentic AI",
    "LangChain",
    "Vector Search",
    "Computer Vision",
    "YOLO",
    "ONNX",
    "Next.js",
    "React",
    "TypeScript",
    "Python",
    "Portfolio",
  ],
  authors: [{ name: "Vishwam Shah" }],
  openGraph: {
    title: "Vishwam Shah | AI Engineer & Full-Stack Developer",
    description:
      "AI engineer and full-stack developer building production AI products.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vishwam Shah | AI Engineer & Full-Stack Developer",
    description: "AI engineer and full-stack developer building production AI products.",
  },
};

export const viewport: Viewport = {
  themeColor: "#fbfbfd",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="min-h-screen bg-canvas font-sans text-zinc-900 antialiased">
        <SiteChrome>
          <Preloader />
          <ScrollProgressBar />
          <CustomCursor />
          <AuroraBackground />
          <Navbar />
        </SiteChrome>
        <div className="relative z-10">{children}</div>
        <Toaster theme="light" position="bottom-right" richColors closeButton />
        <SpeedInsights />
      </body>
    </html>
  );
}
