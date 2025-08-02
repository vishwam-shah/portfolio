import React, { useState } from "react";
import { FaTimes, FaWhatsapp, FaEnvelope, FaInstagram, FaLinkedin } from "react-icons/fa";

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './phoneinput-override.css';


const AITypingModal = ({ onClose, suggestion }: { onClose: () => void; suggestion: string }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");

  const handleWhatsapp = () => {
    const msg = encodeURIComponent(`Hi, I'm ${name}. ${suggestion} (Contact: ${contact}, Email: ${email})`);
    window.open(`https://wa.me/?text=${msg}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-[#181829] rounded-2xl shadow-2xl p-8 w-full max-w-md relative border-2 border-cyan-400 animate-fade-in">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-red-400 text-xl"
          onClick={onClose}
          aria-label="Close"
        >
          <FaTimes />
        </button>
        <h3 className="text-2xl font-bold text-cyan-300 mb-4 text-center">Contact for Collaboration</h3>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            className="rounded-lg px-4 py-2 bg-[#23234d] text-white border border-cyan-700 focus:border-cyan-400 outline-none"
            placeholder="Your Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <div className="w-full">
            <PhoneInput
              country={'us'}
              value={contact}
              onChange={setContact}
              inputStyle={{
                backgroundColor: '#23234d',
                color: '#fff',
                border: '1px solid #0891b2',
                borderRadius: '0.5rem',
                padding: '0.5rem 1rem',
                outline: 'none',
                width: '100%',
                fontSize: '1rem',
              }}
              buttonStyle={{
                backgroundColor: '#23234d',
                border: 'none',
                borderRadius: '0.5rem 0 0 0.5rem',
              }}
              dropdownStyle={{
                backgroundColor: '#23234d',
                color: '#22d3ee', // Use any color you want here (e.g., cyan-400)
                borderRadius: '0.5rem',
                border: '1px solid #0891b2',
                boxShadow: '0 4px 24px 0 #000a',
                /* Custom hover effect for dropdown items */
                /* This will only affect the dropdown background, not the row hover. */
              }}
              inputProps={{ required: true, name: 'phone', autoFocus: false }}
            />
          </div>
          <input
            type="email"
            className="rounded-lg px-4 py-2 bg-[#23234d] text-white border border-cyan-700 focus:border-cyan-400 outline-none"
            placeholder="Email Address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="mt-2 py-2 px-4 rounded-lg bg-gradient-to-tr from-cyan-400 to-purple-500 text-white font-semibold shadow-md hover:from-purple-500 hover:to-cyan-400 transition-all"
          >
            Submit
          </button>
          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-cyan-700" />
            <span className="mx-3 text-cyan-400 font-bold">or</span>
            <div className="flex-1 h-px bg-cyan-700" />
          </div>
          <div className="flex justify-center gap-6 mt-2 text-2xl contact-icons-row">
            <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" style={{border: 'none'}}>
              <FaWhatsapp color="#22d3ee" />
            </a>
            <a href="mailto:your@email.com" target="_blank" rel="noopener noreferrer" aria-label="Mail" style={{border: 'none'}}>
              <FaEnvelope color="#22d3ee" />
            </a>
            <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{border: 'none'}}>
              <FaInstagram color="#22d3ee" />
            </a>
            <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{border: 'none'}}>
              <FaLinkedin color="#22d3ee" />
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AITypingModal;
