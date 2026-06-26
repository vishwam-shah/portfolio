"use client";

import React from "react";
import {
  SiPython,
  SiTypescript,
  SiJavascript,
  SiPytorch,
  SiTensorflow,
  SiScikitlearn,
  SiOpencv,
  SiHuggingface,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiFastapi,
  SiFlask,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiTailwindcss,
  SiDocker,
  SiVercel,
  SiGit,
  SiOpenai,
} from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import Marquee from "@/components/ui/Marquee";
import Tag from "@/components/ui/Tag";
import Reveal from "@/components/ui/Reveal";

type Tech = { name: string; icon: React.ReactNode };

const aiRow: Tech[] = [
  { name: "Python", icon: <SiPython color="#3776AB" /> },
  { name: "OpenAI", icon: <SiOpenai color="#10a37f" /> },
  { name: "PyTorch", icon: <SiPytorch color="#EE4C2C" /> },
  { name: "TensorFlow", icon: <SiTensorflow color="#FF6F00" /> },
  { name: "scikit-learn", icon: <SiScikitlearn color="#F7931E" /> },
  { name: "Hugging Face", icon: <SiHuggingface color="#FFD21E" /> },
  { name: "OpenCV", icon: <SiOpencv color="#5C3EE8" /> },
  { name: "TypeScript", icon: <SiTypescript color="#3178C6" /> },
];

const devRow: Tech[] = [
  { name: "Next.js", icon: <SiNextdotjs color="#000" /> },
  { name: "React", icon: <SiReact color="#61DAFB" /> },
  { name: "React Native", icon: <TbBrandReactNative color="#61DAFB" /> },
  { name: "Node.js", icon: <SiNodedotjs color="#339933" /> },
  { name: "FastAPI", icon: <SiFastapi color="#009688" /> },
  { name: "Flask", icon: <SiFlask color="#000" /> },
  { name: "MongoDB", icon: <SiMongodb color="#47A248" /> },
  { name: "PostgreSQL", icon: <SiPostgresql color="#4169E1" /> },
  { name: "Redis", icon: <SiRedis color="#DC382D" /> },
  { name: "Tailwind", icon: <SiTailwindcss color="#06B6D4" /> },
  { name: "Docker", icon: <SiDocker color="#2496ED" /> },
  { name: "Vercel", icon: <SiVercel color="#000" /> },
  { name: "Git", icon: <SiGit color="#F05032" /> },
  { name: "JavaScript", icon: <SiJavascript color="#F7DF1E" /> },
  { name: "Express", icon: <SiExpress color="#000" /> },
];

const Pill = ({ name, icon }: Tech) => (
  <div className="flex shrink-0 items-center gap-2.5 rounded-full border border-line bg-white/70 px-5 py-3 shadow-soft backdrop-blur-sm">
    <span className="text-xl">{icon}</span>
    <span className="whitespace-nowrap text-sm font-medium text-fg2">{name}</span>
  </div>
);

const categories = [
  { title: "AI / LLM", items: ["OpenAI", "Gemini", "Claude", "Groq", "Prompt Engineering", "RAG", "AI Agents", "LangChain", "LlamaIndex"] },
  { title: "Machine Learning", items: ["PyTorch", "TensorFlow", "Scikit-learn", "Hugging Face", "Kaggle"] },
  { title: "Computer Vision", items: ["YOLO", "OpenCV", "OCR", "Roboflow", "CVAT"] },
  { title: "Frontend", items: ["React.js", "Next.js", "React Native", "TypeScript", "Tailwind CSS", "HTML", "CSS"] },
  { title: "Backend", items: ["Node.js", "Express.js", "FastAPI", "Flask"] },
  { title: "Databases", items: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Pinecone", "ChromaDB"] },
  { title: "Languages", items: ["Python", "JavaScript", "TypeScript", "SQL"] },
  { title: "DevOps & Tools", items: ["Git", "GitHub", "Docker", "CI/CD", "Vercel", "Railway", "Render", "Postman"] },
];

const Skills = () => {
  return (
    <section id="skills" className="mx-auto w-full max-w-7xl px-5 py-16 sm:py-24">
      <SectionHeading
        reveal="flip"
        eyebrow="Toolbox"
        title={
          <>
            The stack behind <span className="text-gradient-aurora">the work</span>
          </>
        }
        subtitle="A focused toolkit across the AI and web spectrum, chosen for shipping real products."
      />

      <div className="mt-14 flex flex-col gap-4">
        <Marquee duration="38s">
          {aiRow.map((s) => (
            <Pill key={s.name} {...s} />
          ))}
        </Marquee>
        <Marquee duration="50s" reverse>
          {devRow.map((s) => (
            <Pill key={s.name} {...s} />
          ))}
        </Marquee>
      </div>

      <Reveal stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((c) => (
          <GlassCard key={c.title} spotlight className="h-full p-6">
            <h3 className="font-display text-base font-semibold text-fg">
              {c.title}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {c.items.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </GlassCard>
        ))}
      </Reveal>
    </section>
  );
};

export default Skills;
