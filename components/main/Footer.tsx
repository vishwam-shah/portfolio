"use client"
import React from "react";
import {
    RxAngle,
  RxGithubLogo,
  RxShadowInner,
  RxTwitterLogo,
} from "react-icons/rx";

import { FaDiscord, FaLinkedin} from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";


const Footer = () => {


  return (
    <motion.div 
    initial="hidden"
      animate="visible"
      
    className="w-full h-full  text-gray-200 shadow-lg p-[15px] z-[30] "
    // style={footerStyle} 
    >
        <motion.div 
        initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        className="w-full flex flex-col items-center justify-center m-auto ">
            <div className="w-full h-full flex flex-row items-center justify-around flex-wrap ">
                

                <div className="min-w-[200px] h-auto flex flex-col items-center justify-start">
                    <div className="font-bold text-[16px]">Community</div>
                    <p className="flex flex-row items-center my-[15px] cursor-pointer hover:text-green-500">
          
                    <FaLinkedin />
                    <Link href="https://www.linkedin.com/in/vishwam-shah" target="_blank" ><span className="text-[15px] ml-[6px]">Linkedin</span></Link>    
                    </p>
                    <p className="flex flex-row items-center my-[15px] cursor-pointer hover:text-green-500">
                    <RxGithubLogo />
                    <Link href="https://www.github.com/vishwamshah07 " target="_blank"> <span className="text-[15px] ml-[6px]">Github</span></Link>   
                    </p>
                    <p className="flex flex-row items-center my-[15px] cursor-pointer hover:text-green-500">
                        <RxAngle />
                        <Link href="" target="_blank"><span className="text-[15px] ml-[6px]">Well Found</span></Link>    
                    </p>
                </div>
                <div className="min-w-[200px] h-auto flex flex-col items-center justify-start">
                    <div className="font-bold text-[16px]">Social Media</div>
                    <p className="flex flex-row items-center my-[15px] cursor-pointer hover:text-green-500">
                    <FaDiscord />
                        <span className="text-[15px] ml-[6px]"><Link href="" target="_blank">Discord</Link></span>    
                    </p>
                    <p className="flex flex-row items-center my-[15px] cursor-pointer hover:text-green-500">
                   <RxTwitterLogo />
                   <Link href="" target="_blank"><span className="text-[15px] ml-[6px]">Twitter</span></Link>    
                    </p>
                    <p className="flex flex-row items-center my-[15px] cursor-pointer hover:text-green-500">
                    <RxShadowInner />
                        <Link href="https://join.slack.com/t/newworkspace-xcz8151/shared_invite/zt-29l1d1dx2-~ew5PeeAjPwrrWRp6TJLmA" target="_blank"><span className="text-[15px] ml-[6px]">Slack</span> </Link>    
                    </p>
                </div>
                <div className="min-w-[200px] h-auto flex flex-col items-center justify-start">
                    <div className="font-bold text-[16px]">About</div>
                   <p className="flex flex-row items-center my-[15px] cursor-pointer hover:text-green-500">
                     
                        <span className="text-[15px] ml-[6px]">Become Sponsor</span>    
                    </p>
                    <p className="flex flex-row items-center my-[15px] cursor-pointer hover:text-green-500">
                      
                        <Link href="https://docs.google.com/document/d/1EbIrEA_zuzbal2X17RwAQ5tPWRHYu7ift3Ei_46H-Ek/edit?usp=sharing" target="_blank"><span className="text-[15px] ml-[6px]">Learning about me</span></Link>    
                    </p>
                    <p className="flex flex-row items-center my-[15px] cursor-pointer hover:text-green-500">
                  
                        <Link href="https://vishwamshah007@gmail.com" target="_blank"><span className="text-[15px] ml-[6px]">vishwamshah007@gmail.com</span> </Link>   
                    </p>
                </div>
            </div>

            <div className="mb-[20px] text-[15px] text-center">
                &copy; Created by Vishwam Shah 2025 Inc. All rights reserved
            </div>
        </motion.div>
    </motion.div>
  )
}

export default Footer