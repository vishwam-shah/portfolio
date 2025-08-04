"use client"
import React from "react";
import {
    RxAngle,
  RxGithubLogo,
  RxShadowInner,
  RxTwitterLogo,
} from "react-icons/rx";

import { FaDiscord, FaLinkedin, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";


const Footer = () => {


  return (
    <motion.div 
    initial="hidden"
      animate="visible"
      
    className="w-full h-full text-gray-200 shadow-lg p-4 z-[30] bg-[rgba(24,24,41,0.5)]"
    // style={footerStyle} 
    >
        <motion.div 
        initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        className="w-full flex flex-col items-center justify-center m-auto ">
            <div className="w-full flex flex-col md:flex-row items-stretch md:justify-center gap-8 flex-wrap">
                

                <div className="flex-1 min-w-[220px] h-auto flex flex-col items-center justify-center py-2 px-2">
                    <div className="font-bold text-[16px] mb-2 md:mb-4 whitespace-nowrap">Community</div>
                    <p className="flex flex-row items-center my-[15px] cursor-pointer hover:text-green-500">
          
                    <FaLinkedin />
                    <Link href="https://www.linkedin.com/in/vishwam-shah" target="_blank" ><span className="text-[15px] ml-[6px]">Linkedin</span></Link>    
                    </p>
                    <p className="flex flex-row items-center my-[15px] cursor-pointer hover:text-green-500">
                    <RxGithubLogo />
                    <Link href="https://www.github.com/vishwams-shah " target="_blank"> <span className="text-[15px] ml-[6px]">Github</span></Link>   
                    </p>
                    <p className="flex flex-row items-center my-[15px] cursor-pointer hover:text-green-500">
                        <RxAngle />
                        <Link href="https://wellfound.com/u/vishwam-shah-4" target="_blank"><span className="text-[15px] ml-[6px]">Well Found</span></Link>    
                    </p>
                </div>
                <div className="flex-1 min-w-[220px] h-auto flex flex-col items-center justify-center py-2 px-2">
                    <div className="font-bold text-[16px] mb-2 md:mb-4 whitespace-nowrap">Social Media</div>
                    <p className="flex flex-row items-center my-[15px] cursor-pointer hover:text-green-500">
                        <FaInstagram />
                        <Link href="https://instagram.com/vishwam07" target="_blank"><span className="text-[15px] ml-[6px]">Instagram</span></Link>
                    </p>
                    <p className="flex flex-row items-center my-[15px] cursor-pointer hover:text-green-500">
                        <FaWhatsapp />
                        <Link href="https://wa.me/917984683397" target="_blank"><span className="text-[15px] ml-[6px]">WhatsApp</span></Link>
                    </p>
                    <p className="flex flex-row items-center my-[15px] cursor-pointer hover:text-blue-400">
                        <RxTwitterLogo />
                        <Link href="https://twitter.com/vishwamshah007" target="_blank"><span className="text-[15px] ml-[6px]">Twitter</span></Link>
                    </p>
                </div>
                <div className="flex-1 min-w-[220px] h-auto flex flex-col items-center justify-center py-2 px-2">
                    <div className="font-bold text-[16px] mb-2 md:mb-4 whitespace-nowrap">About</div>
                    <p className="flex flex-row items-center my-2 cursor-pointer hover:text-green-500">
                        <span className="text-[15px] ml-[6px]">📍 Ahmedabad, India</span>
                    </p>
                    <p className="flex flex-row items-center my-2 cursor-pointer hover:text-green-500">
                        <Link href="mailto:vishwamshah007@gmail.com" target="_blank"><span className="text-[15px] ml-[6px]">vishwamshah007@gmail.com</span></Link>
                    </p>
                    <p className="flex flex-row items-center my-2 cursor-pointer hover:text-purple-400">
                        <RxShadowInner />
                        <Link href="" target="_blank"><span className="text-[15px] ml-[6px]">Portfolio</span></Link>
                    </p>
                    <p className="flex flex-row items-center my-2 cursor-pointer hover:text-blue-400">
                        <FaDiscord />
                        <Link href="tel:+917984683397" target="_blank"><span className="text-[15px] ml-[6px]">+91 79846 83397</span></Link>
                    </p>
                </div>
            </div>

            {/* Copyright removed for professional look */}
        </motion.div>
    </motion.div>
  )
}

export default Footer