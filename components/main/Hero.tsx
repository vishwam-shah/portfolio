"use client";

import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { HiArrowDown, HiOutlineEnvelope } from "react-icons/hi2";
import ShimmerButton from "@/components/ui/ShimmerButton";
import Typewriter from "@/components/ui/Typewriter";
import HeroDither from "@/components/main/HeroDither";

// Three.js chip is client-only and heavy, load without SSR.
const HeroChip = dynamic(() => import("@/components/main/HeroChip"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 grid place-items-center">
      <div className="h-32 w-32 animate-spin-slow rounded-3xl border border-dashed border-aurora-violet/30" />
    </div>
  ),
});

const stats = [
  { value: "20+", label: "Client projects delivered" },
  { value: "$50K+", label: "Transactions powered" },
  { value: "IEEE", label: "Published research" },
];

const ease = [0.22, 1, 0.36, 1] as const;
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const chipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(chipRef.current, {
        yPercent: -16,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center justify-center px-5 pt-28 md:pt-24"
    >
      {/* dithered hero background - full bleed across the viewport */}
      <div className="pointer-events-none absolute inset-y-0 left-1/2 z-0 w-screen -translate-x-1/2 overflow-hidden">
        <HeroDither />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-linear-to-t from-canvas via-canvas/60 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-canvas/70 to-transparent" />
      </div>

      {/* soft scrim behind the copy so text reads cleanly over the dither */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(70% 65% at 30% 45%, rgba(251,251,253,0.92) 0%, rgba(251,251,253,0.55) 38%, transparent 70%)",
        }}
      />

      <div className="relative z-10 grid w-full items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        {/* ---------- Left: copy ---------- */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start gap-6"
        >
          <motion.h1
            variants={item}
            className="font-display text-5xl font-bold leading-[1.02] tracking-tight text-zinc-900 sm:text-6xl lg:text-7xl"
          >
            <Typewriter
              speed={70}
              startDelay={500}
              lines={[
                { text: "Vishwam Shah" },
                {
                  text: "AI Engineer",
                  className:
                    "mt-2 bg-linear-to-r from-aurora-violet via-aurora-blue to-aurora-teal bg-clip-text text-transparent",
                },
                {
                  text: "& Full-Stack Developer.",
                  className: "mt-1 text-2xl font-medium text-zinc-400 sm:text-3xl",
                },
              ]}
            />
          </motion.h1>

          <motion.p
            variants={item}
            className="max-w-xl text-base leading-relaxed text-zinc-600 sm:text-lg"
          >
            I build production AI products end to end: LLM &amp; RAG systems,
            on-device computer vision, and scalable{" "}
            <span className="font-medium text-zinc-900">MERN</span> /{" "}
            <span className="font-medium text-zinc-900">Next.js</span>{" "}
            platforms. From fine-tuned models to the last 10% of the UI, I ship
            things people actually use.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap items-center gap-3">
            <ShimmerButton href="#projects" variant="dark" moving={false}>
              View my work
              <HiArrowDown className="h-4 w-4" />
            </ShimmerButton>
            <ShimmerButton href="#contact" variant="light">
              <HiOutlineEnvelope className="h-4 w-4" />
              Get in touch
            </ShimmerButton>
            <div className="ml-1 flex items-center gap-1">
              {[
                { Icon: FaGithub, href: "https://github.com/vishwam-shah" },
                {
                  Icon: FaLinkedin,
                  href: "https://www.linkedin.com/in/vishwam-shah/",
                },
                { Icon: FaXTwitter, href: "https://twitter.com/vishwamshah007" },
              ].map(({ Icon, href }) => (
                <Link
                  key={href}
                  href={href}
                  target="_blank"
                  className="grid h-11 w-11 place-items-center rounded-full border border-black/10 bg-white/70 text-zinc-500 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-black/20 hover:text-zinc-900"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-2 flex items-center gap-8 border-t border-black/10 pt-6"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl font-bold text-zinc-900">
                  {s.value}
                </div>
                <div className="text-xs uppercase tracking-wider text-zinc-400">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ---------- Right: 3D core ---------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease, delay: 0.2 }}
          className="relative aspect-square w-full max-w-[560px] justify-self-center"
        >
          <div ref={chipRef} className="relative h-full w-full">
            <div className="absolute inset-0 -z-10 rounded-full bg-aurora-violet/15 blur-[100px]" />
            <HeroChip />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
