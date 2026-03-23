import React from 'react';

const timeline = [
  {
    year: '2025 – Present',
    title: 'AI Researcher',
    description: 'Conducting research on EEG-based motor imagery classification using deep learning for Brain-Computer Interfaces. Published at ICCCNT 2025.',
    place: 'PDEU (Pandit Deendayal Energy University)',
    icon: '🚀',
  },
  {
    year: '2024',
    title: 'Full Stack Web Developer',
    description: 'Built and deployed scalable web applications including RealtyEaseAI, a virtual assistant SaaS platform, and Krafting, a digital marketing website. Gained hands-on experience with Next.js, TypeScript, and cloud deployment.',
    place: 'Internship / Freelance',
    icon: '💻',
  },
  {
    year: '2021 – 2023',
    title: 'B.Tech in Information Technology',
    description: 'Graduated with a B.Tech in Information Technology. Focused on AI/ML, computer vision, and web development. Completed multiple industry projects and research work.',
    place: 'SAL Engineering and Technical Institute, Ahmedabad',
    icon: '🎓',
  },
];

const Timeline = () => (
  <section id="timeline" className="w-full max-w-3xl mx-auto py-16 px-4">
    <h2 className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-12 tracking-widest uppercase">
      My Journey
    </h2>
    <div className="relative border-l-2 border-cyan-500 ml-6">
      {timeline.map((item, idx) => (
        <div key={idx} className="mb-12 ml-8 relative">
          <div className="absolute -left-[52px] top-0 flex items-center justify-center w-10 h-10 bg-cyan-700 rounded-full text-2xl border-4 border-[#23234d] shadow-lg">
            {item.icon}
          </div>
          <div className="pl-4 bg-gradient-to-br from-[#181829]/80 to-[#23234d]/80 rounded-2xl p-5 shadow-xl border border-[#2d2d5a]">
            <div className="text-lg font-semibold text-cyan-300">{item.year} — {item.title}</div>
            <div className="text-sm text-purple-300 mt-1 font-medium">{item.place}</div>
            <div className="text-gray-300 mt-2 text-sm leading-relaxed">{item.description}</div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Timeline;
