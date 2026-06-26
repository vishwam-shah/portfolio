"use client";

import React from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { HiOutlineEnvelope } from "react-icons/hi2";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/ui/Reveal";
import ShimmerButton from "@/components/ui/ShimmerButton";

const facts = [
  { k: "Based in", v: "Ahmedabad, India" },
  { k: "Education", v: "M.Tech AI · PDEU" },
  { k: "Currently", v: "AI Engineer · HunterRepo" },
  { k: "Focus", v: "LLMs · CV · Full-Stack" },
];

const socials = [
  { Icon: FaLinkedin, href: "https://www.linkedin.com/in/vishwam-shah", hover: "hover:text-aurora-blue" },
  { Icon: FaGithub, href: "https://github.com/vishwam-shah", hover: "hover:text-zinc-900" },
  { Icon: FaInstagram, href: "https://www.instagram.com/vishwam07", hover: "hover:text-aurora-pink" },
  { Icon: FaWhatsapp, href: "https://wa.me/917984683397", hover: "hover:text-aurora-teal" },
];

const Aboutme = () => {
  return (
    <section id="about-me" className="mx-auto w-full max-w-7xl px-5 py-16 sm:py-24">
      <SectionHeading
        reveal="blur"
        eyebrow="About"
        title={
          <>
            Engineer at the intersection of{" "}
            <span className="text-gradient-aurora">AI &amp; the web</span>
          </>
        }
      />

      <div className="mt-14 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <Reveal>
          <GlassCard className="h-full p-8 sm:p-10">
            <div className="space-y-5 text-base leading-relaxed text-zinc-600 sm:text-lg">
              <p>
                Hi, I&apos;m{" "}
                <span className="font-semibold text-zinc-900">Vishwam Shah</span>,
                an AI engineer and full-stack developer pursuing an{" "}
                <span className="font-medium text-zinc-900">M.Tech in
                Artificial Intelligence</span>{" "}
                at PDEU, after a B.Tech in Computer Science. I build production
                systems that pair real machine learning with clean, scalable web
                apps.
              </p>
              <p>
                My work spans{" "}
                <span className="font-medium text-zinc-900">LLM &amp; RAG
                pipelines</span>,{" "}
                <span className="font-medium text-zinc-900">on-device computer
                vision</span>{" "}
                (ANPR / OCR), and{" "}
                <span className="font-medium text-zinc-900">multi-tenant
                SaaS</span> on the MERN &amp; Next.js stack. I&apos;ve shipped
                platforms powering{" "}
                <span className="font-medium text-zinc-900">$50K+ in
                transactions</span>, led small teams, and published BCI research
                at an IEEE conference.
              </p>
              <p className="text-zinc-500">
                I care about the whole loop, from training the model to the last
                10% of the interface.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ShimmerButton href="#contact" variant="dark">
                <HiOutlineEnvelope className="h-4 w-4" />
                Get in touch
              </ShimmerButton>
              <div className="flex items-center gap-2">
                {socials.map(({ Icon, href, hover }) => (
                  <Link
                    key={href}
                    href={href}
                    target="_blank"
                    className={`grid h-11 w-11 place-items-center rounded-full border border-black/10 bg-white/70 text-zinc-500 transition-all duration-300 hover:-translate-y-0.5 ${hover}`}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </Link>
                ))}
              </div>
            </div>
          </GlassCard>
        </Reveal>

        <Reveal delay={0.1}>
          <GlassCard spotlight={false} className="h-full p-8">
            <div className="grid h-full grid-cols-2 gap-x-4 gap-y-7 content-center">
              {facts.map((f) => (
                <div key={f.k}>
                  <div className="text-xs uppercase tracking-wider text-zinc-400">
                    {f.k}
                  </div>
                  <div className="mt-1 font-display text-lg font-semibold text-zinc-900">
                    {f.v}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
};

export default Aboutme;
