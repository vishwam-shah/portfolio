"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaRobot, FaRocket, FaGlobe, FaBrain } from 'react-icons/fa';
import { motion } from 'framer-motion';

const projectDetails = [
  {
    name: 'AI Research Platform',
    description: [
      'A scalable platform for training and deploying deep learning models, featuring experiment tracking, GPU scheduling, and real-time monitoring. Integrates with HuggingFace and PyTorch for NLP and vision tasks.'
    ],
    image: '/gpt3.png',
    technologies: ['Python', 'PyTorch', 'HuggingFace', 'React', 'Docker'],
    live: '',
    source: '',
    icon: <FaBrain className="text-cyan-400" size={28} />,
  },
  {
    name: 'Space Image Classifier',
    description: [
      'A computer vision web app that classifies astronomical images using CNNs. Built with TensorFlow, FastAPI, and Next.js. Features interactive visualizations and a cosmic UI.'
    ],
    image: '/spacetravellers.png',
    technologies: ['TensorFlow', 'Next.js', 'FastAPI', 'Tailwind CSS'],
    live: '',
    source: '',
    icon: <FaRocket className="text-purple-400" size={28} />,
  },
  {
    name: 'LLM Chatbot SaaS',
    description: [
      'A SaaS platform for building and deploying custom LLM chatbots. Features prompt engineering, analytics, and multi-channel integration. Built with Next.js, Node.js, and LangChain.'
    ],
    image: '/gpt3.png',
    technologies: ['Next.js', 'LangChain', 'Node.js', 'TypeScript'],
    live: '',
    source: '',
    icon: <FaRobot className="text-cyan-400" size={28} />,
  },
  {
    name: 'Global Space Data Portal',
    description: [
      'A full-stack portal for exploring and visualizing open space datasets. Features interactive maps, AI-powered search, and a modern, space-inspired UI.'
    ],
    image: '/main.svg',
    technologies: ['React', 'Node.js', 'MongoDB', 'Mapbox'],
    live: '',
    source: '',
    icon: <FaGlobe className="text-cyan-400" size={28} />,
  },
];

const Projects = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const togglePopUp = (project: any) => {
    setSelectedProject(project);
    setShowPopUp(true);
  };

  const closePopUp = () => {
    setShowPopUp(false);
  };

  useEffect(() => {
    if (showPopUp) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showPopUp]);



  return (
    <section className="w-full flex flex-col items-center justify-center py-12" id="projects">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-12 tracking-widest uppercase">
        Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl mx-auto">
        {projectDetails.map((project, idx) => (
          <motion.div
            key={idx}
            className="bg-gradient-to-br from-[#181829] to-[#23234d] rounded-2xl p-8 shadow-xl border border-[#2d2d5a] flex flex-col gap-4 relative hover:scale-[1.025] transition-transform"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(0,255,255,0.15)' }}
            transition={{ duration: 0.6, type: 'spring', bounce: 0.25, delay: idx * 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div
              className="absolute -top-6 left-6 transition-transform duration-300 hover:scale-125 drop-shadow-lg"
              whileHover={{ rotate: 8, scale: 1.2 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {project.icon}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.12 + 0.2 }}
              viewport={{ once: true }}
            >
              <Image
                src={project.image}
                alt={project.name}
                width={400}
                height={160}
                className="w-full h-40 object-contain rounded-xl bg-[#23234d] mb-2"
              />
            </motion.div>
            <div className="flex flex-wrap gap-2 mb-2">
              {project.technologies.map((tech) => (
                <motion.span
                  key={tech}
                  className="px-3 py-1 text-xs rounded-full bg-[#23234d] text-cyan-300 border border-cyan-700 font-mono"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.15 + 0.3 }}
                  viewport={{ once: true }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
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
              {project.description[0]}
            </motion.p>
            <motion.div
              className="flex gap-4 mt-auto"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.22 + 0.45 }}
              viewport={{ once: true }}
            >
              {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline cursor-pointer transition-all duration-200 hover:text-purple-400">Live Demo</a>}
              {project.source && <a href={project.source} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline cursor-pointer transition-all duration-200 hover:text-cyan-400">Source</a>}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;