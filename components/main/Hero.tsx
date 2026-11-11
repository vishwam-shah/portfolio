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

/**
 * Hero — full-bleed WebGL "Waves" shader behind the headline.
 *
 * Background is components/ui/adisyon-shader (21st.dev Shader Builder, zero
 * dependencies, one WebGL1 canvas) with its built-in cursor interaction
 * enabled, so the wave field swirls under the pointer. It does NOT consult
 * prefers-reduced-motion, so it animates everywhere.
 *
 * The shader's palette is a BEACH recipe (deep water -> foam -> sand)
 * rather than restyling the rest of the site: the hero was previously the only
 * dark section on a light site, which read as a transplant. Same hues, raised
 * values — so the hero now belongs to the page and no other section changed.
 *
 * HeroChip (the 3D AI chip) and HeroDither are intentionally no longer
 * rendered here. Both files are kept in components/main/ — the chip is only
 * unmounted from this section, not deleted.
 */
const ShaderBackground = dynamic(
  () => import("@/components/ui/adisyon-shader").then((m) => m.ShaderBackground),
  { ssr: false, loading: () => <div className="h-full w-full bg-[#EFE2C4]" /> }
);

// Only the two figures that already existed in this codebase are kept here.
// "40 hrs manual work automated" and "IEEE accepted research" were removed as
// requested: credentials and vague automation claims do not convert clients.
// Replacements are intentionally NOT invented — add real numbers you can
// stand behind (users served, uptime, cost saved, repeat-client rate).
const stats: { prefix?: string; value: number; suffix?: string; label: string }[] = [
  { value: 20, suffix: "+", label: "Client projects delivered" },
  { prefix: "$", value: 50, suffix: "K+", label: "Transactions powered" },
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

/**
 * Counts up to the figure on mount. A number that visibly resolves reads as
 * measured rather than decorative, which is the point of putting it in front
 * of a prospective client.
 */
function StatValue({
  prefix,
  value,
  suffix,
}: {
  prefix?: string;
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const target = { v: 0 };
    const tween = gsap.to(target, {
      v: value,
      duration: 1.6,
      delay: 0.9,
      ease: "power2.out",
      onUpdate: () => {
        if (ref.current) ref.current.textContent = String(Math.round(target.v));
      },
    });
    return () => {
      tween.kill();
    };
  }, [value]);

  return (
    <span className="font-display text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
      {prefix}
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Scroll-linked exit: the copy lifts and dissolves as the hero scrolls away,
  // so the hand-off to the next section is a move rather than a cut.
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        yPercent: -14,
        opacity: 0,
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
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-[#EFE2C4]"
    >
      {/* full-bleed shader — swirls under the cursor */}
      <div className="absolute inset-0 z-0">
        <ShaderBackground className="h-full w-full" />
      </div>

      {/* left-weighted scrim so the copy reads over the wave crests */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(100deg, rgba(250,246,238,0.88) 0%, rgba(250,246,238,0.56) 40%, rgba(250,246,238,0.14) 70%, rgba(250,246,238,0) 100%)",
        }}
      />

      <div
        ref={contentRef}
        className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-24 pt-32 md:pt-28"
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex max-w-3xl flex-col items-start gap-6"
        >
          <motion.h1
            variants={item}
            className="font-display text-[2.5rem] font-bold leading-[1.04] tracking-tight text-zinc-900 sm:text-6xl lg:text-7xl"
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
            I build production AI products end to end: LLM, RAG &amp; agentic
            systems, on-device computer vision, and scalable{" "}
            <span className="font-medium text-zinc-900">Next.js</span> /{" "}
            <span className="font-medium text-zinc-900">FastAPI</span>{" "}
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
            className="mt-4 grid w-full max-w-xl grid-cols-2 gap-3"
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="crystal crystal-light rounded-2xl px-5 py-4"
              >
                <StatValue prefix={s.prefix} value={s.value} suffix={s.suffix} />
                <div className="mt-1 text-[11px] uppercase tracking-wider text-zinc-400">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;