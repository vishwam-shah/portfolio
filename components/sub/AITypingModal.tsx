// Props interface for AITypingModal
export interface AITypingModalProps {
  onClose: () => void;
  suggestion: string;
  editable?: boolean;
}
import React, { useState, useRef, useEffect } from "react";
import { FaTimes, FaWhatsapp, FaEnvelope, FaInstagram, FaLinkedin } from "react-icons/fa";

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './phoneinput-override.css';


const AITypingModal = ({ onClose, suggestion, editable }: AITypingModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState(suggestion);
  const [status, setStatus] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);


  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleWhatsapp = () => {
    const msg = encodeURIComponent(`Hi, I'm ${name}. ${message} (Contact: ${contact}, Email: ${email})`);
    window.open(`https://wa.me/?text=${msg}`, "_blank");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, contact, message }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('Message sent successfully!');
        setName(""); setEmail(""); setContact("");
      } else {
        setStatus(data.message || 'Failed to send message.');
      }
    } catch (err) {
      setStatus('Failed to send message.');
    }
    setSubmitting(false);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center min-h-screen bg-black/60">
        <div ref={modalRef} className="bg-[#181829] rounded-2xl shadow-2xl p-8 w-full max-w-md relative border-2 border-cyan-400 animate-fade-in">
          <button
            className="absolute top-3 right-3 text-gray-400 hover:text-red-400 text-xl"
            onClick={onClose}
            aria-label="Close"
          >
            <FaTimes />
          </button>
          <h3 className="text-2xl font-bold text-cyan-300 mb-4 text-center">Contact for Collaboration</h3>
          {status && status.includes('success') ? (
            <div className="flex flex-col items-center justify-center py-8">
              <svg width="64" height="64" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#22c55e"/><path d="M7 13l3 3 7-7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <div className="mt-4 text-green-400 text-xl font-bold">Successfully received!</div>
            </div>
          ) : (
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
              country={'in'}
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
                    color: '#22d3ee',
                    borderRadius: '0.5rem',
                    border: '1px solid #0891b2',
                    boxShadow: '0 4px 24px 0 #000a',
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
              {/* Editable message area */}
              {editable ? (
                <textarea
                  className="rounded-lg px-4 py-2 bg-[#23234d] text-cyan-200 border border-cyan-700 focus:border-cyan-400 outline-none font-mono min-h-[60px] max-h-[200px] resize-none"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Edit your message..."
                />
              ) : (
                <div className="rounded-lg px-4 py-2 bg-[#23234d] text-cyan-200 border border-cyan-700 font-mono min-h-[60px]">
                  {message}
                </div>
              )}
              <button
                type="submit"
                className="mt-2 py-2 px-4 rounded-lg bg-gradient-to-tr from-cyan-400 to-purple-500 text-white font-semibold shadow-md hover:from-purple-500 hover:to-cyan-400 transition-all flex items-center justify-center"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin mr-2" width="20" height="20" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="4" fill="none" opacity="0.2"/><path d="M12 2a10 10 0 0 1 10 10" stroke="#fff" strokeWidth="4" fill="none"/></svg>
                    Submitting...
                  </>
                ) : (
                  'Submit'
                )}
              </button>
              {status && (
                <div className={`mt-2 text-center font-semibold ${status.includes('success') ? 'text-green-400' : 'text-red-400'}`}>{status}</div>
              )}
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
          )}
        </div>
      </div>
    </>
  );
};

export default AITypingModal;
