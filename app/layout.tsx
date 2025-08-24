"use client";
import './globals.css';
import Navbar from '@/components/main/Navbar';
import dynamic from 'next/dynamic';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter } from 'next/font/google';
import React, { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });
const StarsCanvas = dynamic(() => import('@/components/main/StarBackground'), { ssr: false });
const Loader = dynamic(() => import('@/components/main/Loader'), { ssr: false });
import { Analytics } from "@vercel/analytics/next"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      <head>
        <title>Vishwam Shah | AI Portfolio</title>
        <meta name="description" content="Portfolio of Vishwam Shah - AI/ML & Full Stack Developer. Projects, skills, publications, and contact." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </head>
      <body className={`${inter.className} bg-[#030014] overflow-y-scroll overflow-x-hidden`}>
        <Analytics />
        {showLoader ? (
          <Loader />
        ) : (
          <>
            <StarsCanvas />
            <Navbar />
            {children}
            <SpeedInsights />
          </>
        )}
      </body>
    </html>
  );
}