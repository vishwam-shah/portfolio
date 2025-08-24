"use client";
import dynamic from 'next/dynamic';
import Hero from '@/components/main/Hero';
import React, { useEffect, useState } from 'react';

const Aboutme = dynamic(() => import('@/components/main/Aboutme'), { ssr: false });
const Footer = dynamic(() => import('@/components/main/Footer'), { ssr: false });
const Projects = dynamic(() => import('@/components/main/Projects'), { ssr: false });
const Skills = dynamic(() => import('@/components/main/Skills'), { ssr: false });
const Publications = dynamic(() => import('@/components/main/Publications'), { ssr: false });
const Timeline = dynamic(() => import('@/components/main/Timeline'), { ssr: false });
const AITypingChat = dynamic(() => import('@/components/sub/AITypingChat'), { ssr: false });

export default function Home() {
  const [showRest, setShowRest] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRest(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-start bg-[#030014]">
      <section className="w-full max-w-7xl mx-auto px-4">
        <Hero />
      </section>
      <section className="w-full flex justify-center items-center max-w-7xl mx-auto px-2 md:px-4 py-8 md:py-12">
        <div className="w-full flex justify-center">
          <div className="w-full max-w-2xl px-2 md:px-8">
            <AITypingChat />
          </div>
        </div>
      </section>
      {showRest && <>
        <section className="w-full max-w-7xl mx-auto px-4 py-12 bg-gradient-to-b from-[#030014] to-[#181829] rounded-3xl shadow-lg my-8">
          <Skills />
        </section>
        <section className="w-full max-w-7xl mx-auto px-4 py-12">
          <Aboutme />
        </section>
        <section className="w-full max-w-7xl mx-auto px-4 py-12 bg-gradient-to-b from-[#181829] to-[#030014] rounded-3xl shadow-lg my-8">
          <Projects />
        </section>
        <section className="w-full max-w-7xl mx-auto px-4 py-12">
          <Timeline />
        </section>
        <section className="w-full max-w-7xl mx-auto px-4 py-12 bg-gradient-to-b from-[#030014] to-[#181829] rounded-3xl shadow-lg my-8">
          <Publications />
        </section>
        <Footer />
      </>}
    </main>
  );
}
