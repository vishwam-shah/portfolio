

import React, { useState, useRef, useEffect } from "react";
import { FaRobot, FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";
// Make sure AITypingModal.tsx exists in the same folder, or update the path if it's elsewhere
// Make sure the file exists at the specified path, or update the path below if it's elsewhere
import AITypingModal from "./AITypingModal";

const aiSuggestions = [
  "Help me build an AI-powered chatbot for my business",
  "Help me build a personal AI assistant",
  "Help me build a resume analyzer for recruiters",
  "Help me build a generative AI art tool",
  "Help me build a code review AI for developers",
  "Help me build a custom LLM for my company",
  "Help me build a smart document search engine",
  "Help me build a recommendation system like Netflix",
  "Help me build a voice-to-text app for meetings",
  "Help me build an AI tool for medical image analysis",
  "Help me build a space image classifier",
  "Help me build a trend analysis dashboard",
  "Try: 'Show me AI projects'",
  "Ask: 'What is NLP?'",
  "Try: 'Show a space-themed project'",
  "Ask: 'What is computer vision?'",
];


const AITypingChat = () => {
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isFocused) {
      const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % aiSuggestions.length);
      }, 2500);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line
  }, [isFocused]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
    setModalMessage(input);
    setIsFocused(false);
  };

  return (
    <div className="flex flex-col items-center justify-center mx-auto w-[90vw] max-w-[300px] sm:max-w-[350px] md:max-w-[500px] lg:max-w-[700px] mt-10 z-30">
      <motion.div
        className="relative w-full max-w-full mt-4 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="absolute inset-0 rounded-2xl z-0 animate-gradient-move bg-gradient-to-r from-purple-500 via-cyan-400 to-blue-500 bg-[length:200%_200%] border-4 border-transparent" style={{ filter: 'blur(6px)' }} />
        <form
          onSubmit={handleSend}
          className="relative z-10 flex items-center bg-[#181829]/90 rounded-2xl px-2 sm:px-4 md:px-6 py-2 md:py-3 shadow-lg border-2 border-transparent focus-within:border-cyan-400 w-full"
        >
          <FaRobot className="text-cyan-400 mr-2 animate-bounce" size={22} />
          {/* Animated suggestion text, not editable until focused */}
          {!isFocused ? (
            <div
              className="flex-1 bg-transparent outline-none text-cyan-200 font-mono text-base sm:text-lg md:text-xl px-2 sm:px-4 break-words whitespace-pre-line w-full min-h-[40px] max-h-[120px] flex items-center cursor-pointer"
              style={{ minWidth: '0', width: '100%' }}
              tabIndex={0}
              onClick={() => setIsFocused(true)}
              onFocus={() => setIsFocused(true)}
            >
              <span className="animate-fade-in" key={index}>{aiSuggestions[index]}</span>
            </div>
          ) : (
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={2}
              className="block flex-1 bg-transparent outline-none text-cyan-200 font-mono text-base sm:text-lg md:text-xl placeholder:text-cyan-300 transition-all duration-200 px-2 sm:px-4 break-words whitespace-pre-line w-full resize-none min-h-[40px] max-h-[120px]"
              style={{ boxShadow: 'none', border: 'none', minWidth: '0', width: '100%' }}
              placeholder="Ask or type your AI idea..."
              autoFocus
            />
          )}
          <button
            type="submit"
            className="ml-2 p-2 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 hover:from-purple-500 hover:to-cyan-400 text-white shadow-md transition-all duration-300 focus:outline-none cursor-pointer scale-100 hover:scale-110 active:scale-95 active:ring-2 active:ring-purple-400"
            aria-label="Send"
            style={{ transition: 'transform 0.1s, box-shadow 0.1s' }}
          >
            <FaPaperPlane size={18} />
          </button>
        </form>
      </motion.div>
      {showModal && <AITypingModal onClose={() => setShowModal(false)} suggestion={modalMessage} editable />}
    </div>
  );
};

export default AITypingChat;
