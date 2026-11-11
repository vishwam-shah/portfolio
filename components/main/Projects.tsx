"use client";

import React from "react";
import Image from "next/image";
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineCamera,
  HiOutlineSparkles,
  HiOutlineDocumentMagnifyingGlass,
  HiOutlineArrowTrendingUp,
  HiOutlineMicrophone,
  HiOutlineEnvelope,
  HiOutlineHome,
  HiOutlineBuildingOffice2,
  HiOutlineCpuChip,
  HiOutlineCommandLine,
  HiOutlineMusicalNote,
  HiOutlineDocumentText,
  HiOutlineSquares2X2,
  HiOutlineChartBar,
  HiOutlineBolt,
} from "react-icons/hi2";
import { FiGithub } from "react-icons/fi";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import Tag from "@/components/ui/Tag";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

type Project = {
  name: string;
  category: string;
  description: string;
  tech: string[];
  Icon: React.ComponentType<{ className?: string }>;
  /** Optional cover screenshot; the gradient tint stands in when absent. */
  image?: string;
  from: string;
  to: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    name: "Antrenor AI",
    category: "Voice Agents · Interview Prep",
    description:
      "An AI interviewer platform running real-time voice interviews over LiveKit: it refines your CV for a target role, generates role-specific questions and scores each answer automatically. Backed by a curated bank of real interview questions scraped from 130+ companies across multiple verified sources.",
    tech: ["Next.js", "Python", "LiveKit", "Anthropic API", "Web Scraping"],
    Icon: HiOutlineMicrophone,
    image: "/projects/antrenor-ai.jpg",
    from: "from-aurora-violet/40",
    to: "to-aurora-blue/10",
    featured: true,
  },
  {
    name: "CHATZEN",
    category: "LLM · Multi-tenant SaaS",
    description:
      "A multi-tenant conversational AI platform that unifies WhatsApp, Instagram and other channels in one interface, with tenant-specific knowledge grounding and centralized management for every conversation.",
    tech: ["Next.js", "Python", "Node.js", "LLM APIs", "PostgreSQL"],
    Icon: HiOutlineChatBubbleLeftRight,
    image: "/projects/chatzen.jpg",
    from: "from-aurora-violet/35",
    to: "to-aurora-blue/10",
  },
  {
    name: "Rachnova",
    category: "Technology Group - Product & AI",
    description:
      "A technology group site spanning three practices - Engineering, Intelligence and Studio - covering web platforms, product apps, applied AI and agentic systems for companies that want one team from first build through to market.",
    tech: ["Applied AI", "Agentic Systems", "iOS / Android"],
    Icon: HiOutlineCpuChip,
    image: "/projects/rachnova.jpg",
    from: "from-aurora-violet/35",
    to: "to-aurora-indigo/10",
  },
  {
    name: "AgenticMVP",
    category: "AI Product Studio - Sydney",
    description:
      "An AI product studio that audits a business's workflows, ranks the gaps by cost, effort and risk, then builds guarded agentic systems kept under human approval. Covers multi-step agent workflows, evals and guardrails, private company knowledge search and voice agents.",
    tech: ["Agentic Workflows", "Evals & Guardrails", "Voice Agents"],
    Icon: HiOutlineCommandLine,
    image: "/projects/agenticmvp.jpg",
    from: "from-aurora-blue/35",
    to: "to-aurora-violet/10",
  },
  {
    name: "Trimesha",
    category: "Digital Solutions - Custom Software",
    description:
      "A digital solutions company site covering AI-powered custom software: web and mobile development, UI/UX, cloud infrastructure, API development and data analytics for businesses building and scaling digital products.",
    tech: ["Next.js", "React Native", "Flutter", "AWS", "GraphQL"],
    Icon: HiOutlineSquares2X2,
    image: "/projects/trimesha.jpg",
    from: "from-aurora-teal/35",
    to: "to-aurora-blue/10",
  },
  {
    name: "RealtyEaseAI",
    category: "Real Estate - Managed Operations",
    description:
      "A managed execution service pairing AI-enhanced virtual assistants with a quality assurance manager acting as a fractional COO. Two team tracks cover day-to-day operations and digital growth, with a two-business-hour response guarantee and 48-hour onboarding.",
    tech: ["CRM Integration", "Ops Automation", "Lead Capture"],
    Icon: HiOutlineBuildingOffice2,
    image: "/projects/realtyease.jpg",
    from: "from-aurora-indigo/35",
    to: "to-aurora-teal/10",
  },
  {
    name: "Reliance Realty Advisers",
    category: "Real Estate - Brokerage Site",
    description:
      "A brokerage site serving buyers and sellers across Minnesota and Florida, with property search for both states, seller home valuations, community guides, financing resources and agent profiles.",
    tech: ["Property Search", "Lead Capture", "Local SEO"],
    Icon: HiOutlineHome,
    image: "/projects/reliance-brokerage.jpg",
    from: "from-aurora-blue/30",
    to: "to-aurora-teal/10",
  },
  {
    name: "Sunset Cleaning & Maintenance",
    category: "Local Services - Marketing Site",
    description:
      "A marketing site for a New York cleaning company serving homes and businesses, covering office, retail, residential and post-construction cleaning with eco-friendly products, built to convert local search into booked jobs.",
    tech: ["Service Site", "Lead Capture", "Local SEO"],
    Icon: HiOutlineBolt,
    image: "/projects/sunset-cleaning.jpg",
    from: "from-aurora-pink/30",
    to: "to-aurora-violet/10",
  },
  {
    name: "Tailor",
    category: "LLM - Resume Tailoring",
    description:
      "Paste a job description, upload a resume as PDF, DOCX or LaTeX, and it rewrites the resume in the job's own language - with every change traceable back to real experience rather than invented. Files stay in memory unless a run is saved.",
    tech: ["Next.js", "LLM API", "PDF / DOCX Parsing"],
    Icon: HiOutlineDocumentText,
    image: "/projects/resume-customizer.jpg",
    from: "from-aurora-violet/35",
    to: "to-aurora-blue/10",
  },
  {
    name: "Vinyl",
    category: "Web App - Music Player",
    description:
      "A browser music player with a library split into all songs, favourites and recents, custom playlists, local file playback, sorting by title, artist or recency, and quick links out to YouTube and JioSaavn.",
    tech: ["React", "Web Audio", "Playlists"],
    Icon: HiOutlineMusicalNote,
    image: "/projects/music-player.jpg",
    from: "from-aurora-pink/30",
    to: "to-aurora-indigo/10",
  },
  {
    name: "Mini Pokedex",
    category: "Web App - Data & Team Building",
    description:
      "A Pokedex for Generations I and II with searchable, sortable stat tables per Pokemon, plus a team builder that aggregates a six-slot roster into overall team stats so you can see where a line-up is strong or exposed.",
    tech: ["React", "PokeAPI", "Data Visualisation"],
    Icon: HiOutlineChartBar,
    image: "/projects/mini-pokedex.jpg",
    from: "from-aurora-teal/30",
    to: "to-aurora-blue/10",
  },  {
    name: "MailPilot",
    category: "Tool-Using Agent · Email",
    description:
      "A tool-using AI email assistant that takes natural-language instructions to reply, forward and organize mail, classifying each message's intent to cut manual triage down to the messages that actually need a human.",
    tech: ["Next.js", "LLM API", "Tool Calling", "Intent Classification"],
    Icon: HiOutlineEnvelope,
    from: "from-aurora-pink/30",
    to: "to-aurora-blue/10",
  },
  {
    name: "ANPR Mobile Application",
    category: "Computer Vision · Mobile",
    description:
      "A React Native field app that reads vehicle number plates from the live camera feed - a custom YOLO detector plus a fine-tuned OCR model, run fully on-device through ONNX Runtime at 83% accuracy and sub-300ms per frame.",
    tech: ["React Native", "YOLO", "OCR", "ONNX Runtime", "OpenCV"],
    Icon: HiOutlineCamera,
    image: "/projects/anpr.jpg",
    from: "from-aurora-indigo/40",
    to: "to-aurora-violet/10",
  },
  {
    name: "AI Content Generator",
    category: "LLM · SEO Automation",
    description:
      "A dashboard for structured, SEO-optimized blog creation across multiple formats, with one-click export and multi-site publishing powered by LLM APIs.",
    tech: ["LLM APIs", "SEO", "Next.js"],
    Icon: HiOutlineSparkles,
    image: "/projects/content-generator.jpg",
    from: "from-aurora-pink/30",
    to: "to-aurora-violet/10",
  },
  {
    name: "Document Intelligence Engine",
    category: "OCR · NLP Pipeline",
    description:
      "An AI pipeline for OCR, structured information extraction, automated document classification and multi-document summarization at scale.",
    tech: ["OCR", "NLP", "Classification", "Summarization"],
    Icon: HiOutlineDocumentMagnifyingGlass,
    image: "/projects/document-intelligence.jpg",
    from: "from-aurora-blue/35",
    to: "to-aurora-teal/10",
  },
  {
    name: "Financial Sentiment Platform",
    category: "FinBERT · Market NLP",
    description:
      "Combines FinBERT, custom NLP pipelines and real-time market data feeds to generate predictive sentiment insights on Indian equities.",
    tech: ["FinBERT", "NLP", "Real-time Data"],
    Icon: HiOutlineArrowTrendingUp,
    image: "/projects/financial-sentiment.jpg",
    from: "from-aurora-teal/35",
    to: "to-aurora-indigo/10",
  },
];

const Cover = ({ p }: { p: Project }) => (
  <div
    className={`relative ${p.featured ? "aspect-[16/7]" : "aspect-[16/10]"} w-full overflow-hidden rounded-2xl border border-line`}
  >
    {/* gradient tint shows while the image loads, and stands in when a
        project has no screenshot yet */}
    <div className={`absolute inset-0 bg-linear-to-br ${p.from} ${p.to}`} />
    {p.image && (
      <Image
        src={p.image}
        alt={p.name}
        fill
        sizes={p.featured ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
        className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
      />
    )}
    {/* legibility wash for the corner icon */}
    <div className="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-black/10" />
    <span className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-xl border border-white/30 bg-white/20 text-white backdrop-blur-md">
      <p.Icon className="h-5 w-5" />
    </span>
    {/* without a screenshot the tile would read as empty - centre the mark */}
    {!p.image && (
      <p.Icon className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 text-white/45" />
    )}
  </div>
);

const Projects = () => {
  return (
    <section id="projects" className="mx-auto w-full max-w-7xl px-5 py-16 sm:py-24">
      <SectionHeading
        reveal="zoom"
        eyebrow="Selected Work"
        title={
          <>
            Things I&apos;ve <span className="text-gradient-aurora">built</span>
          </>
        }
        subtitle="A mix of AI systems and full-stack products, each shipped to real users."
      />

      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal
            key={p.name}
            variant="rise"
            delay={i * 130}
            className={p.featured ? "md:col-span-2 lg:col-span-2" : ""}
          >
            <GlassCard tilt className="flex h-full flex-col p-5">
              <Cover p={p} />
              <div className="flex flex-1 flex-col px-1 pt-5">
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-fg4">
                  {p.category}
                </span>
                <h3 className="mt-2 font-display text-xl font-semibold text-fg">
                  {p.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fg3">
                  {p.description}
                </p>
                <div className="mt-auto flex flex-wrap gap-2 pt-5">
                  {p.tech.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Button href="https://github.com/vishwam-shah" target="_blank" variant="ghost">
          <FiGithub className="h-4 w-4" />
          More on GitHub
        </Button>
      </div>
    </section>
  );
};

export default Projects;
