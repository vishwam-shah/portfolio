"use client"

import React from 'react';
import { motion } from "framer-motion";
import { slideInFromLeft } from "@/utils/motion";
import { FaGithub, FaLinkedin, FaUserAstronaut, FaInstagram, FaWhatsapp } from "react-icons/fa";
import Link from 'next/link';

const Aboutme = () => {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="w-full flex flex-col items-center justify-center gap-8 py-12 relative z-[20]"
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={slideInFromLeft(1)}
        className="flex flex-col items-center justify-center px-9 lg:px-64 md:px-32 relative"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-8 tracking-widest uppercase flex items-center justify-center gap-3">
          <FaUserAstronaut className="text-cyan-300 drop-shadow-lg" size={36} />
          About Me
        </h2>
        <div className="max-w-3xl text-center text-gray-300 text-lg leading-relaxed bg-gradient-to-br from-[#181829]/80 to-[#23234d]/80 rounded-2xl p-8 shadow-xl border border-[#2d2d5a] backdrop-blur-md">
          <p>
            Hi! I’m Vishwam Shah, an <span className="text-cyan-300 font-semibold">AI/ML & Full Stack Developer</span> passionate about building intelligent systems and exploring the cosmos through code.<br/>
            My journey spans <span className="text-purple-300">deep learning</span>, <span className="text-purple-300">NLP</span>, <span className="text-purple-300">computer vision</span>, and scalable web platforms.<br/>
            I thrive at the intersection of <span className="text-cyan-300">AI</span> and <span className="text-cyan-300">Full Stack Web Apps</span>, creating solutions that push boundaries and inspire curiosity.
          </p>
          <p className="mt-4">
            With experience in <span className="text-cyan-300">Python</span>, <span className="text-cyan-300">PyTorch</span>, <span className="text-cyan-300">Next.js</span>, and <span className="text-cyan-300">cloud-native</span> technologies, I love transforming ideas into impactful products.<br/>
            Let’s connect and build the future—on Earth and beyond.
          </p>
        </div>
        <div className="flex gap-3 p-4 my-4 text-gray-200 text-[24px]">
          <Link href="https://www.linkedin.com/in/vishwam-shah" target="_blank" className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-green-500 cursor-pointer"><FaLinkedin /></Link>
          <Link href="https://www.github.com/vishwam-shah" target="_blank" className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-green-500 cursor-pointer"><FaGithub /></Link>
          <Link href="https://www.instagram.com/vishwam07" target="_blank" className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-pink-500 cursor-pointer"><FaInstagram /></Link>
          <Link href="https://wa.me/917984683397" target="_blank" className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-green-400 cursor-pointer"><FaWhatsapp /></Link>
        </div>
        <Link
          href="https://drive.google.com/file/d/1Z-xXY0Oxu7qDSU-C8F-jB7T7XqvQxwJL/view?usp=drive_link"
          target="_blank"
  className="h-[40px] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 w-[200px] button-primary text-center text-white cursor-pointer rounded-xl hover:bg-purple-500 flex items-center justify-center focus:ring-2 focus:ring-cyan-400"
        >
          Get My Resume
        </Link>
      </motion.div>
    </motion.section>
  );
};

export default Aboutme;