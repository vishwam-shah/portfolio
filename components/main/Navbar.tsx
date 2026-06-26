"use client";

import { useState, useEffect } from "react";
import { HiBars3, HiXMark } from "react-icons/hi2";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/utils/cn";

const links = [
  { label: "About", href: "#about-me", id: "about-me" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Work", href: "#projects", id: "projects" },
  { label: "Research", href: "#publications", id: "publications" },
  { label: "Contact", href: "#contact", id: "contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["home", ...links.map((l) => l.id)];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "flex w-full max-w-5xl items-center justify-between rounded-full px-3 py-2 transition-all duration-300",
          scrolled
            ? "border border-black/[0.07] bg-white/80 shadow-soft backdrop-blur-xl"
            : "border border-transparent bg-transparent"
        )}
      >
        <Link
          href="#home"
          className="ml-2 flex items-center gap-2 font-display text-sm font-bold tracking-tight text-zinc-900"
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-linear-to-br from-zinc-600 to-zinc-800 text-[13px] text-white shadow-soft">
            VS
          </span>
          <span className="hidden sm:block">Vishwam</span>
        </Link>

        {/* desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.id}
              href={l.href}
              className={cn(
                "relative rounded-full px-3.5 py-1.5 text-sm transition-colors",
                active === l.id ? "text-zinc-900" : "text-zinc-500 hover:text-zinc-900"
              )}
            >
              {active === l.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 -z-10 rounded-full border border-black/[0.06] bg-zinc-100"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="#contact"
            className="hidden rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-ink-800 md:block"
          >
            Let&apos;s talk
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white text-zinc-900 md:hidden"
          >
            {open ? <HiXMark className="h-5 w-5" /> : <HiBars3 className="h-5 w-5" />}
          </button>
        </div>
      </motion.nav>

      {/* mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-0 z-40 flex flex-col bg-canvas/95 px-6 pb-10 pt-28 backdrop-blur-xl md:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.05 } } }}
              className="flex flex-col gap-2"
            >
              {links.map((l) => (
                <motion.li
                  key={l.id}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    show: { opacity: 1, x: 0 },
                  }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl border border-black/[0.07] bg-white px-5 py-4 font-display text-2xl font-semibold text-zinc-900 shadow-soft"
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  show: { opacity: 1, x: 0 },
                }}
              >
                <Link
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="mt-2 block rounded-2xl bg-ink px-5 py-4 text-center font-display text-xl font-semibold text-white"
                >
                  Let&apos;s talk
                </Link>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
