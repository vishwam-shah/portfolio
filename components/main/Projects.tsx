"use client";

import React from "react";
import Image from "next/image";
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineCircleStack,
  HiOutlineCamera,
  HiOutlineSparkles,
  HiOutlineDocumentMagnifyingGlass,
  HiOutlineArrowTrendingUp,
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
  image: string;
  from: string;
  to: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    name: "AI Chatbot Platform",
    category: "LLM · Multi-tenant SaaS",
    description:
      "A platform that unifies WhatsApp, Instagram and email under one intelligent conversational AI, with a centralized management dashboard for every channel.",
    tech: ["LLM APIs", "Next.js", "WhatsApp API", "Multi-tenant"],
    Icon: HiOutlineChatBubbleLeftRight,
    image: "/projects/chatbot-platform.jpg",
    from: "from-aurora-violet/40",
    to: "to-aurora-blue/10",
    featured: true,
  },
  {
    name: "Chatbot Platform Portal",
    category: "RAG · Knowledge Base",
    description:
      "A RAG knowledge system using vector databases and LLMs for contextual Q&A and semantic search over large enterprise document sets.",
    tech: ["RAG", "Vector DB", "Semantic Search", "LLM"],
    Icon: HiOutlineCircleStack,
    image: "/projects/chatbot-portal.jpg",
    from: "from-aurora-teal/35",
    to: "to-aurora-blue/10",
  },
  {
    name: "ANPR Mobile Application",
    category: "Computer Vision · Mobile",
    description:
      "A React Native app integrating YOLO, OCR and OpenCV for real-time vehicle number-plate detection, recognition and fleet analytics.",
    tech: ["React Native", "YOLO", "OCR", "OpenCV"],
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
    {/* gradient tint shows while the image loads / as a fallback */}
    <div className={`absolute inset-0 bg-linear-to-br ${p.from} ${p.to}`} />
    <Image
      src={p.image}
      alt={p.name}
      fill
      sizes={p.featured ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
      className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
    />
    {/* legibility wash for the corner icon */}
    <div className="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-black/10" />
    <span className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-xl border border-white/30 bg-white/20 text-white backdrop-blur-md">
      <p.Icon className="h-5 w-5" />
    </span>
  </div>
);

const Projects = () => {
  return (
    <section id="projects" className="mx-auto w-full max-w-7xl px-5 py-24">
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
