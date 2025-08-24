"use client";
import Aboutme from '@/components/main/Aboutme';
import Footer from '@/components/main/Footer';
import Hero from '@/components/main/Hero';
import Projects from '@/components/main/Projects';
import Skills from '@/components/main/Skills';
import Publications from '@/components/main/Publications';
import Timeline from '@/components/main/Timeline';
import AITypingChat from '@/components/sub/AITypingChat';

export default function Home() {
  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-start bg-[#030014]">
      <section className="w-full flex justify-center items-center max-w-7xl mx-auto px-2 md:px-4 py-8 md:py-12">
        <div className="w-full flex justify-center">
          <div className="w-full max-w-2xl px-2 md:px-8">
            <AITypingChat />
          </div>
        </div>
      </section>
      <section className="w-full max-w-7xl mx-auto px-4">
        <Hero />
      </section>
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
    </main>
  );
}
