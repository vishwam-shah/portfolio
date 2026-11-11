"use client";

import React from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { HiOutlineEnvelope } from "react-icons/hi2";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/ui/Reveal";
import ShimmerButton from "@/components/ui/ShimmerButton";

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

      <div className="mt-14">
        <Reveal>
          <GlassCard className="h-full p-8 sm:p-10">
            <div className="space-y-5 text-base leading-relaxed text-zinc-600 sm:text-lg">
              <p>
                I&apos;m{" "}
                <span className="font-semibold text-zinc-900">Vishwam Shah</span>.
                I build AI products that reach production and stay there. Most
                of my work starts with a business problem rather than a model:
                manual work eating the week, support that won&apos;t scale,
                documents nobody has time to read.
              </p>
              <p>
                I own the whole build, so you deal with one person instead of
                stitching a model together with a frontend contractor. That has
                meant conversational AI handling live customer channels across{" "}
                <span className="font-medium text-zinc-900">WhatsApp and
                Instagram</span>, voice agents running real-time interviews, and
                vision apps that run on the phone itself with no server round
                trip. Platforms I&apos;ve shipped have powered{" "}
                <span className="font-medium text-zinc-900">$50K+ in
                transactions</span> across{" "}
                <span className="font-medium text-zinc-900">20+ client
                projects</span>.
              </p>
              <p className="text-zinc-500">
                You see something running early and often, not a status update.
                An M.Tech in Artificial Intelligence sits behind the work, but
                what matters is that it holds up once real users are on it.
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

      </div>
    </section>
  );
};

export default Aboutme;
