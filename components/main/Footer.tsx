"use client";

import React from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaXTwitter, FaWhatsapp } from "react-icons/fa6";
import { SiWellfound } from "react-icons/si";
import { HiArrowUp } from "react-icons/hi2";
import Button from "@/components/ui/Button";

const nav = [
  { label: "About", href: "#about-me" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#projects" },
  { label: "Research", href: "#publications" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { Icon: FaGithub, href: "https://github.com/vishwam-shah", label: "GitHub" },
  { Icon: FaLinkedin, href: "https://www.linkedin.com/in/vishwam-shah/", label: "LinkedIn" },
  { Icon: FaXTwitter, href: "https://twitter.com/vishwamshah007", label: "X" },
  { Icon: SiWellfound, href: "https://wellfound.com/u/vishwam-shah-4", label: "Wellfound" },
  { Icon: FaWhatsapp, href: "https://wa.me/917984683397", label: "WhatsApp" },
];

const Footer = () => {
  return (
    <footer className="relative w-full px-5 pb-10 pt-16">
      <div className="mx-auto max-w-7xl">
        <div className="glass overflow-hidden p-8 sm:p-12">
          <div className="pointer-events-none absolute -left-20 -top-24 h-56 w-56 rounded-full bg-aurora-violet/15 blur-3xl" />

          <div className="relative grid gap-10 md:grid-cols-[1.4fr_1fr_auto]">
            {/* brand + CTA */}
            <div>
              <Link href="#home" className="flex items-center gap-2">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-linear-to-br from-zinc-600 to-zinc-800 font-display text-sm font-bold text-white shadow-soft">
                  VS
                </span>
                <span className="font-display text-lg font-semibold text-fg">
                  Vishwam Shah
                </span>
              </Link>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-fg3">
                AI engineer and full-stack developer building production AI
                products at the edge of machine learning and the web.
              </p>
              <Button href="#contact" variant="primary" className="mt-6">
                Start a conversation
              </Button>
            </div>

            {/* nav */}
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-fg4">
                Explore
              </div>
              <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3">
                {nav.map((n) => (
                  <li key={n.href}>
                    <Link
                      href={n.href}
                      className="text-sm text-fg3 transition-colors hover:text-fg"
                    >
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* socials */}
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-fg4">
                Connect
              </div>
              <div className="mt-4 flex flex-wrap gap-2 md:max-w-[120px]">
                {socials.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white/60 text-fg3 transition-all duration-300 hover:-translate-y-0.5 hover:text-fg"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="relative mt-10 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 sm:flex-row">
            <p className="flex items-center gap-1.5 text-xs text-fg4">
              Made with
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5 text-red-500"
                fill="currentColor"
                aria-label="love"
                role="img"
              >
                <path d="M12 21s-6.716-4.297-9.193-8.07C1.07 10.36 1.64 6.9 4.41 5.66c2.02-.9 4.06-.18 5.27 1.36L12 9.5l2.32-2.48c1.21-1.54 3.25-2.26 5.27-1.36 2.77 1.24 3.34 4.7 1.6 7.27C18.72 16.7 12 21 12 21z" />
              </svg>
              in
              <svg
                viewBox="0 0 9 6"
                className="h-3 w-[18px] shrink-0 rounded-[1.5px] ring-1 ring-black/10"
                aria-label="India"
                role="img"
              >
                <rect width="9" height="6" fill="#fff" />
                <rect width="9" height="2" fill="#ff9933" />
                <rect y="4" width="9" height="2" fill="#138808" />
                <circle cx="4.5" cy="3" r="0.75" fill="none" stroke="#000088" strokeWidth="0.18" />
                <circle cx="4.5" cy="3" r="0.12" fill="#000088" />
              </svg>
            </p>
            <a
              href="#home"
              className="flex items-center gap-2 text-xs text-fg3 transition-colors hover:text-fg"
            >
              Back to top
              <span className="grid h-7 w-7 place-items-center rounded-full border border-line">
                <HiArrowUp className="h-3.5 w-3.5" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
