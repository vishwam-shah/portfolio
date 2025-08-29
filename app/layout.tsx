"use client";
import './globals.css';
import StarsCanvas from '@/components/main/StarsBackground'; // Renamed import to force chunk rebuild
import Navbar from '@/components/main/Navbar';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter } from 'next/font/google';
import Loader from '@/components/main/AppLoader';
import React, { useEffect, useState } from 'react';
// import { CursorifyProvider } from '@cursorify/react';

const inter = Inter({ subsets: ['latin'] });

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
      <body className={`${inter.className} bg-[#030014] overflow-y-scroll overflow-x-hidden`}>
        
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
