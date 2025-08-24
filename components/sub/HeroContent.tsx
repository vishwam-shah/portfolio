"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/utils/motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaDiscord, FaTwitter} from "react-icons/fa";
import Link from "next/link";
import AITypingChat from "./AITypingChat";


const HeroContent = () => {
  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        className="flex flex-row items-center justify-center px-4 md:px-20 mt-24 w-full z-[20]"
      >
        <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start mt-6 max-w-[600px]">
          <motion.div
            variants={slideInFromTop}
            className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]"
          >
            <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
            <h1 className="Welcome-text text-[13px]">
              AI Developer
            </h1>
          </motion.div>
          <motion.div
            variants={slideInFromLeft(0.5)}
            className="flex flex-col gap-6 mt-6 md:text-6xl text-4xl font-bold text-white w-auto h-auto"
          >
            <span>
              Hi there, I&apos;m
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 animate-pulse">
                {" "}Vishwam Shah{" "}
              </span><br/>
              <span className="font-bold text-green-400">{"<"}AI Developer{"/>"}</span>
            </span>
          </motion.div>
          <motion.p
            variants={slideInFromLeft(0.8)}
            className="md:text-lg text-white my-5 font-mono"
          >
            who loves creating smart systems to solve real-world challenges. Whether it&apos;s teaching machines to understand language, recognize images, or make predictions, I enjoy turning complex ideas into practical solutions. Along with playing with AI, I’m passionate about building websites from scratch and designing responsive, user-friendly interfaces that stand out. Please check out my projects and skills.
          </motion.p>
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-row gap-5 text-gray-200 text-[22px]"
          >
            <Link className="hover:text-green-400" href="https://www.linkedin.com/in/vishwam-shah/" target="_blank"><FaLinkedin /></Link>
            <Link className="hover:text-green-400" href="https://www.github.com/vishwamshah07" target="_blank"><FaGithub /></Link>
            <Link className="hover:text-green-400" href="https://discord.gg/" target="_blank"><FaDiscord /></Link>
            <Link className="hover:text-green-400" href="https://www.twitter.com/" target="_blank"><FaTwitter /></Link>
          </motion.div>
          <motion.a
            variants={slideInFromLeft(1)}
            className="py-2 button-primary text-center text-white cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 rounded-lg max-w-[200px] hover:bg-purple-500"
            href="#about-me"
          >
            Learn More!
          </motion.a>
        </div>
        <motion.div
          variants={slideInFromRight(0.8)}
          className="w-full h-full flex justify-center items-center"
        >
          <Image
            src="/mainIconsdark.svg"
            alt="work icons"
            height={650}
            width={650}
          />
        </motion.div>
      </motion.div>
    </>
  );
};

export default HeroContent;