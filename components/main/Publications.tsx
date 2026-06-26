"use client";

import React from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { HiOutlineDocumentText, HiOutlineAcademicCap } from "react-icons/hi2";
import SectionHeading from "@/components/ui/SectionHeading";
import Tag from "@/components/ui/Tag";
import Reveal from "@/components/ui/Reveal";

const paper = {
  title: "EEG-Based Motor Imagery Classification Using Deep Learning Techniques",
  authors:
    "M. Dsylva, V. Shah, S. Acharya, S. Vankadiya, Dr. S. Satapathy, Dr. N. Singh",
  venue: "16th IEEE International Conference, Indore",
  link: "#",
  tags: ["Deep Learning", "EEG / BCI", "CNN", "Signal Processing"],
};

const certs = [
  { name: "Azure AI Fundamentals", issuer: "Microsoft", year: "2022" },
  { name: "Python Using AI/ML", issuer: "KSI", year: "2021" },
  { name: "Programming in Java (ELITE)", issuer: "NPTEL", year: "2022" },
];

const Publications = () => (
  <section id="publications" className="mx-auto w-full max-w-4xl px-5 py-24">
    <SectionHeading
      reveal="blur"
      eyebrow="Research & Credentials"
      title={
        <>
          Published <span className="text-gradient-aurora">work</span>
        </>
      }
    />

    <Reveal variant="rise" className="mt-14">
      <a
        href={paper.link}
        target="_blank"
        rel="noopener noreferrer"
        className="glass group block p-7 transition-all duration-300 hover:shadow-glow"
      >
      <div className="flex items-start gap-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-linear-to-br from-aurora-violet/30 to-aurora-teal/20 text-fg">
          <HiOutlineDocumentText className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-lg font-semibold text-fg sm:text-xl">
              {paper.title}
            </h3>
            <FiArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-fg4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
          </div>
          <div className="mt-1 font-mono text-xs uppercase tracking-widest text-aurora-teal">
            {paper.venue}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-fg3">{paper.authors}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {paper.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </div>
      </div>
      </a>
    </Reveal>

    {/* certifications */}
    <h3 className="mt-12 text-sm font-semibold uppercase tracking-[0.2em] text-fg4">
      Certifications
    </h3>

    <Reveal stagger className="mt-4 grid gap-4 sm:grid-cols-3">
      {certs.map((c) => (
        <div key={c.name} className="glass-soft flex items-start gap-3 p-5">
          <HiOutlineAcademicCap className="mt-0.5 h-5 w-5 shrink-0 text-aurora-violet" />
          <div>
            <div className="text-sm font-semibold text-fg">{c.name}</div>
            <div className="mt-0.5 text-xs text-fg4">
              {c.issuer} · {c.year}
            </div>
          </div>
        </div>
      ))}
    </Reveal>
  </section>
);

export default Publications;
