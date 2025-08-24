"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaRobot, FaRocket, FaGlobe, FaBrain } from 'react-icons/fa';
import { motion } from 'framer-motion';

const GITHUB_USERNAME = 'vishwam-shah';

const iconMap = {
  javascript: <FaRocket className="text-yellow-400" size={28} />,
  typescript: <FaRobot className="text-cyan-400" size={28} />,
  python: <FaBrain className="text-cyan-400" size={28} />,
  default: <FaGlobe className="text-purple-400" size={28} />,
};

const manualProjects = [
  {
    id: 'manual-1',
    name: 'AI Based Stock Market Sentiment Analysis',
    description: 'Analyzes stock market sentiment using AI and NLP techniques to predict market trends and investor behavior.',
    language: 'python',
    source: 'https://github.com/vishwam-shah/stock-sentiment-ai',
    liveDemo: 'https://stockai-demo.vercel.app',
    thumbnail: '/cryptocurrency.png',
  },
  {
    id: 'manual-2',
    name: 'Built RealtyEaseAI From Scratch',
    description: 'End-to-end development of a Viartual Assistant Platform Providing Customized dashboard for their users based on their service with , Built Admin Panel and added Multiple Features',
    language: 'typescript',
    source: 'https://github.com/vishwam-shah/realtyeaseai',
    liveDemo: 'https://realtyeaseai.com',
    thumbnail: '/mamafood.png',
  },
  {
    id: 'manual-2',
    name: 'Built Krafting From Scratch',
    description: 'Built Digital Marketing Website Providing Customized Digital Solutions for Clients to increase their online presence and engagement.',
    language: 'typescript',
    source: 'https://github.com/vishwam-shah/Krafting',
    liveDemo: 'https://Krafting.in',
    thumbnail: '/mamafood.png',
  },
  {
    id: 'manual-2',
    name: 'Built LMS From Scratch',
    description: 'Built Learning Management System Providing Customized Learning Solutions for Clients to increase their online presence and engagement.',
    language: 'typescript',
    source: 'https://github.com/vishwam-shah/Krafting',
    liveDemo: 'https://Krafting.in',
    thumbnail: '/mamafood.png',
  },
  // {
  //   id: 'manual-2',
  //   name: 'Building RealtyEaseAI From Scratch',
  //   description: 'End-to-end development of a real estate AI platform for property analysis, price prediction, and automated recommendations.',
  //   language: 'typescript',
  //   html_url: '#',
  //   homepage: '',
  // },
];

const Projects = () => {
  const [githubProjects, setGithubProjects] = useState<any[]>([]);

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated`)
      .then((res) => res.json())
      .then((data) => {
        setGithubProjects(data);
      });
  }, []);

  const allProjects = [...manualProjects, ...githubProjects];

  return (
    <section className="w-full flex flex-col items-center justify-center py-12" id="projects">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-12 tracking-widest uppercase">
        Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl mx-auto">
        {allProjects.map((project, idx) => (
          <motion.div
            key={project.id}
            className="bg-gradient-to-br from-[#181829] to-[#23234d] rounded-2xl p-8 shadow-xl border border-[#2d2d5a] flex flex-col gap-4 relative hover:scale-[1.025] transition-transform z-[40]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(0,255,255,0.15)' }}
            transition={{ duration: 0.6, type: 'spring', bounce: 0.25, delay: idx * 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Thumbnail removed as requested */}
            <motion.div
              className="absolute -top-6 left-6 transition-transform duration-300 hover:scale-125 drop-shadow-lg"
              whileHover={{ rotate: 8, scale: 1.2 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {iconMap[(project.language as string)?.toLowerCase() as keyof typeof iconMap] || iconMap.default}
            </motion.div>
            <motion.h3
              className="text-xl font-semibold text-white mb-1"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.18 + 0.35 }}
              viewport={{ once: true }}
            >
              {project.name}
            </motion.h3>
            <motion.p
              className="text-gray-300 text-sm mb-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.2 + 0.4 }}
              viewport={{ once: true }}
            >
              {project.description || project.topics?.join(', ') || 'No description provided.'}
            </motion.p>
            <motion.div
              className="flex gap-4 mt-auto"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.22 + 0.45 }}
              viewport={{ once: true }}
            >
                {/* Manual projects: use source and liveDemo; GitHub projects: use html_url and homepage */}
                {project.source || project.html_url ? (
                  <a
                    href={project.source || project.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:underline cursor-pointer transition-all duration-200 hover:text-cyan-400"
                  >
                    Source
                  </a>
                ) : null}
                {(project.liveDemo || project.homepage) && (
                  <a
                    href={project.liveDemo || project.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:underline cursor-pointer transition-all duration-200 hover:text-purple-400"
                  >
                    Live Demo
                  </a>
                )}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;