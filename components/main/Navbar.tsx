"use client"
import { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaGithub, FaLinkedin, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleBodyOverflow = () => {
      if (isMenuOpen && typeof window !== 'undefined') {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    };

    handleBodyOverflow();

    return () => {
      document.body.style.overflow = 'auto'; // Reset overflow when unmounting component
    };
  }, [isMenuOpen]);

  const handleClick = () => {
    if (window.innerWidth <= 768) {
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#1f94942a] backdrop-blur-md z-50 px-2 md:px-10">
      <div className="w-full h-full flex flex-row items-center justify-between m-auto px-2 md:px-[10px] gap-6">
        <Link href="#about-me" className="h-auto w-auto flex flex-row items-center ml-1 md:ml-0">
          <Image
            src="/VS_logo_design_1.jpg"
            alt="logo"
            width={60}
            height={60}
            className="cursor-pointer hover:animate-slowspin rounded-[50%]"
          />
          <span className="font-bold ml-[10px] hidden md:block text-gray-300 hover:text-emerald-500">
            AI Dev
          </span>
        </Link>

        <div className=" md:flex  hidden w-[70%] h-auto border border-[#7042f861] bg-[#0300145e]  md:px-[20px] md:py-[10px] md:rounded-full text-gray-200 ">
          <div className="flex md:flex-row md:items-center md:justify-between lg:justify-around w-full gap-5">
            <Link href="#about-me" className="cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-green-400">
              About me
            </Link>
            <Link href="#skills" className="cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-green-400">
              Skills
            </Link>
            <Link href="#projects" className="cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-green-400">
              Projects
            </Link>
            <Link href="https://drive.google.com/file/d/1KjRjK3qWAsK4-yEJrB662YIp4fAJmg8t/view?usp=sharing" target='_blank' className='cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-green-400'>Get My Resume </Link>
            <Link href="#contact" className="cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-green-400">
              Contact
            </Link>
          </div>
        </div>

        <div className="hidden md:flex md:flex-row md:justify-between  md:gap-5 md:text-gray-200 md:text-[24px]">
        <Link href="https://www.linkedin.com/in/vishwam-shah/" target="_blank" className=' hover:text-green-400'><FaLinkedin /></Link>
          <Link href="https://www.github.com/vishwam-shah" target="_blank" className=' hover:text-green-400'><FaGithub /></Link>
          <Link href="https://www.instagram.com/vishwam07" target="_blank" className=' hover:text-pink-500'><FaInstagram /></Link>
          <Link href="https://wa.me/917984683397" target="_blank" className=' hover:text-green-400'><FaWhatsapp /></Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center ml-2">
          <button
            type="button"
            onClick={toggleMenu}
            className="text-gray-200 focus:outline-none relative"
            style={{ right: 0 }}
            aria-label="Open menu"
          >
            {isMenuOpen ? (
              <FaTimes className="w-9 h-9 p-1" />
            ) : (
              <FaBars className="w-9 h-9 p-1" />
            )}
          </button>
        </div>

        {/* Responsive Menu */}
        {isMenuOpen && (
          <div
            className="w-full fixed top-[65px] left-0 bg-[#181829] bg-opacity-95 flex flex-col items-center z-50 min-h-screen pt-8 px-4"
            onClick={toggleMenu}
          >
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center w-full gap-6"
            >
              <li className="w-full">
                <Link href="#about-me" className="block w-full text-center py-4 text-lg font-semibold text-cyan-200 rounded-xl bg-[#23234d] mb-2 active:bg-cyan-900 focus:bg-cyan-900 transition-all" onClick={handleClick}>
                  About me
                </Link>
              </li>
              <li className="w-full">
                <Link href="#skills" className="block w-full text-center py-4 text-lg font-semibold text-cyan-200 rounded-xl bg-[#23234d] mb-2 active:bg-cyan-900 focus:bg-cyan-900 transition-all" onClick={handleClick}>
                  Skills
                </Link>
              </li>
              <li className="w-full">
                <Link href="#projects" className="block w-full text-center py-4 text-lg font-semibold text-cyan-200 rounded-xl bg-[#23234d] mb-2 active:bg-cyan-900 focus:bg-cyan-900 transition-all" onClick={handleClick}>
                  Projects
                </Link>
              </li>
              <li className="w-full">
                <Link href="https://drive.google.com/file/d/1KjRjK3qWAsK4-yEJrB662YIp4fAJmg8t/view?usp=sharing" target="_blank" className="block w-full text-center py-4 text-lg font-semibold text-cyan-200 rounded-xl bg-[#23234d] mb-2 active:bg-cyan-900 focus:bg-cyan-900 transition-all">
                  Get My Resume
                </Link>
              </li>
              <li className="w-full">
                <Link href="#contact" className="block w-full text-center py-4 text-lg font-semibold text-cyan-200 rounded-xl bg-[#23234d] mb-2 active:bg-cyan-900 focus:bg-cyan-900 transition-all" onClick={handleClick}>
                  Contact
                </Link>
              </li>
              <li className="flex flex-row justify-center gap-6 w-full mt-4">
                <Link href="https://www.linkedin.com/in/vishwam-shah/" target="_blank" className="text-cyan-300 text-2xl hover:text-green-400"><FaLinkedin /></Link>
                <Link href="https://github.com/Vishwam-shah" target="_blank" className="text-cyan-300 text-2xl hover:text-green-400"><FaGithub /></Link>
                <Link href="https://www.instagram.com/vishwamshah07" target="_blank" className="text-pink-500 text-2xl hover:text-pink-400"><FaInstagram /></Link>
                <Link href="https://wa.me/919825022222" target="_blank" className="text-green-400 text-2xl hover:text-green-300"><FaWhatsapp /></Link>
              </li>
            </motion.ul>
          </div>
        )}

      </div>
    </div>
  );
};

export default Navbar;