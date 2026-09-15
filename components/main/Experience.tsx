"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  HiOutlineCpuChip,
  HiOutlineSquares2X2,
  HiOutlineSparkles,
  HiOutlineShieldCheck,
  HiOutlineCodeBracket,
} from "react-icons/hi2";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/utils/cn";

type Role = {
  company: string;
  role: string;
  period: string;
  location: string;
  points: string[];
  tags: string[];
  Icon: React.ComponentType<{ className?: string }>;
  current?: boolean;
};

const roles: Role[] = [
  {
    company: "HunterRepo",
    role: "AI Engineer",
    period: "Mar 2026 - Jul 2026",
    location: "Remote · Kuala Lumpur, Malaysia",
    Icon: HiOutlineCpuChip,
    points: [
      "Owned the ML pipeline for a vehicle-recovery platform end to end: curated a custom dataset, trained and validated a YOLO plate-detection model, and shipped it at 83% accuracy with sub-300ms on-device inference.",
      "Deployed to edge devices via ONNX Runtime and native Kotlin & Swift modules, removing server round-trips entirely, and built the supporting Python services and operations portal.",
      "Created a continuous-learning loop with an active-learning gate that auto-confirms high-confidence reads and routes uncertain crops to CVAT for retraining.",
      "Architected a 12-step repossession state machine with RBAC, real-time SSE notifications, automated invoicing and a full audit log.",
    ],
    tags: ["YOLO", "ONNX Runtime", "Kotlin", "Swift", "React Native", "Next.js"],
  },
  {
    company: "RealtyEaseAI",
    role: "Full-Stack AI Engineer",
    period: "Apr 2024 - Mar 2026",
    location: "Remote · New York, USA",
    Icon: HiOutlineSquares2X2,
    points: [
      "Architected and shipped LLM features into a production multi-tenant SaaS on GCP, integrating Groq to automate lead capture, document handling and task tracking - cutting 40 hours of manual work per week.",
      "Designed and tuned robust prompt pipelines for classification, information extraction and content generation, iterating on accuracy, response quality, latency and token cost across multiple AI providers.",
      "Built a production RAG pipeline over client documents with intelligent chunking, embeddings and vector search, grounding assistant answers in company-specific data and sharply reducing hallucinations.",
      "Delivered the platform end to end with RBAC, secure APIs and real-time messaging, supporting $50K+ in transactions, while leading a 2-person team through code reviews, testing and releases.",
    ],
    tags: ["Next.js", "GCP", "Groq", "RAG", "Prompt Engineering", "Leadership"],
  },
  {
    company: "Espread Solutions",
    role: "AI Engineer",
    period: "Dec 2025 - Feb 2026",
    location: "Remote",
    Icon: HiOutlineSparkles,
    points: [
      "Built AI content-generation systems on OpenAI / Gemini / Groq with custom prompt-engineering pipelines.",
      "Developed an AI keyword generator, SEO automation and structured multi-step content workflows.",
      "Shipped a guest-posting platform with separate Admin/User dashboards and end-to-end publishing.",
    ],
    tags: ["LLM APIs", "Prompt Engineering", "SEO", "Next.js"],
  },
  {
    company: "DIAT - DRDO",
    role: "Summer Intern",
    period: "Jun 2025 - Jul 2025",
    location: "Pune, India",
    Icon: HiOutlineShieldCheck,
    points: [
      "Built and evaluated deep-learning sentiment-analysis models for a government defense use case, classifying text as positive, negative or neutral with NLP preprocessing and feature extraction.",
      "Developed the full pipeline - preprocessing, data preparation, training, hyperparameter tuning, evaluation and real-time inference - benchmarking models on accuracy, precision, recall and F1.",
    ],
    tags: ["NLP", "Sentiment Analysis", "PyTorch", "Python"],
  },
  {
    company: "Demaze Technologies",
    role: "Software Developer Intern",
    period: "Jan 2024 - Apr 2024",
    location: "Ahmedabad, India",
    Icon: HiOutlineCodeBracket,
    points: [
      "Built a production-ready RBAC dashboard, secure authentication system and admin panel for VidhyaX, with protected routes, secure session handling and permission-based UI rendering across multiple user roles.",
      "Developed and integrated RESTful APIs for user, role and administrative operations, keeping frontend and backend in step behind a secure, scalable access layer.",
      "Improved page performance ~25% through lazy loading and code splitting; shipped 5+ reviewed pull requests.",
    ],
    tags: ["React", "RBAC", "REST APIs", "Auth", "Tailwind"],
  },
];

// switchback x-positions (% of width) - kept in the central gutter so the road
// connects at each card's inner edge and weaves between the columns, never
// crossing a card face.
const NODE_X = [44, 56, 43, 57, 45];

// Catmull-Rom -> cubic bezier smooth path through points
function smoothPath(pts: [number, number][]) {
  if (pts.length < 2) return "";
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
}

const Experience = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<SVGPathElement>(null);
  const [path, setPath] = useState("");
  const [size, setSize] = useState({ w: 0, h: 0 });

  // measure node centers and build the winding road through them
  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;

    const measure = () => {
      const cr = c.getBoundingClientRect();
      const pts = nodeRefs.current
        .filter(Boolean)
        .map((n) => {
          const r = (n as HTMLDivElement).getBoundingClientRect();
          return [r.left + r.width / 2 - cr.left, r.top + r.height / 2 - cr.top] as [number, number];
        });
      setSize({ w: c.clientWidth, h: c.clientHeight });
      setPath(smoothPath(pts));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(c);
    window.addEventListener("load", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("load", measure);
    };
  }, []);

  // GSAP: draw the road as you scroll
  useEffect(() => {
    const p = progressRef.current;
    if (!p || !path) return;
    gsap.registerPlugin(ScrollTrigger);
    const len = p.getTotalLength();
    const ctx = gsap.context(() => {
      gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(p, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 68%",
          end: "bottom 82%",
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, [path]);

  return (
    <section id="experience" className="mx-auto w-full max-w-5xl px-5 py-16 sm:py-24">
      <SectionHeading
        reveal="skew"
        title={
          <>
            The road I&apos;ve <span className="text-gradient-aurora">travelled</span>
          </>
        }
        subtitle="Five roles across AI engineering and full-stack product - training models, shipping platforms and leading small teams."
      />

      <div ref={containerRef} className="relative mt-16">
        {/* winding road (desktop) */}
        <svg
          className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
          viewBox={`0 0 ${size.w || 1} ${size.h || 1}`}
          preserveAspectRatio="none"
          fill="none"
        >
          <defs>
            <linearGradient id="road" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="50%" stopColor="#475569" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
          </defs>
          {/* untravelled trail (dotted) */}
          <path d={path} stroke="rgba(71,85,105,0.22)" strokeWidth={3} strokeDasharray="2 12" strokeLinecap="round" />
          {/* travelled road, drawn on scroll */}
          <path
            ref={progressRef}
            d={path}
            stroke="url(#road)"
            strokeWidth={4.5}
            strokeLinecap="round"
            style={{ filter: "drop-shadow(0 0 6px rgba(71,85,105,0.4))" }}
          />
        </svg>

        {/* straight dotted line (mobile) */}
        <div className="pointer-events-none absolute left-[23px] top-2 h-[calc(100%-1rem)] border-l-2 border-dashed border-aurora-violet/25 md:hidden" />

        <div className="flex flex-col">
          {roles.map((r, i) => {
            const nx = NODE_X[i % NODE_X.length];
            const left = nx < 50;
            return (
              <Reveal
                key={r.company + r.period}
                variant="fade"
                delay={40}
                className="relative py-6 md:grid md:grid-cols-2 md:gap-x-28 md:py-8"
              >
                {/* node */}
                <div
                  ref={(el) => {
                    nodeRefs.current[i] = el;
                  }}
                  style={{ ["--nx" as string]: `${nx}%` }}
                  className="timeline-node absolute top-10 z-10 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl border border-line bg-white/90 text-aurora-violet shadow-glow backdrop-blur-sm md:top-1/2"
                >
                  {r.current && (
                    <span
                      className="absolute inset-0 animate-ping rounded-2xl border border-aurora-violet/40"
                      style={{ animationDuration: "2.5s" }}
                    />
                  )}
                  <r.Icon className="h-6 w-6" />
                </div>

                {/* card */}
                <div className={cn("pl-16 md:pl-0", left ? "md:col-start-1 md:pr-6" : "md:col-start-2 md:pl-6")}>
                  <div className="glass p-6 sm:p-7">
                    <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                      <div>
                        <h3 className="font-display text-xl font-semibold text-fg">
                          {r.role}
                          <span className="text-fg3"> · {r.company}</span>
                        </h3>
                        <div className="mt-0.5 text-sm text-fg4">{r.location}</div>
                      </div>
                      <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-aurora-teal">
                        {r.current && (
                          <span className="h-1.5 w-1.5 rounded-full bg-aurora-teal shadow-[0_0_8px_2px_rgba(20,184,166,0.6)]" />
                        )}
                        {r.period}
                      </span>
                    </div>

                    <ul className="mt-4 flex flex-col gap-2.5">
                      {r.points.map((p, j) => (
                        <li key={j} className="flex gap-3 text-sm leading-relaxed text-fg2">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-aurora-violet" />
                          {p}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {r.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-line bg-white/60 px-3 py-1 text-xs text-fg3"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
