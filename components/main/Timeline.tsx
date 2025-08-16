import React from 'react';

const timeline = [
  
  {
    year: '2025',
    title: 'AI Researcher',
    description: 'Started working as an AI researcher at PDEU.',
    place: 'PDEU',
    icon: '🚀',
  },
  {
    year: '2024',
    title: 'Web Developer',
    description: 'Built scalable web apps.',
    place: 'Internship',
    icon: '💻',
  },
  {
    year: '2023',
    title: 'Graduated',
    description: 'Completed B.Tech in Information Technology.',
    place: 'SAL ENGINEERING AND TECHNICAL INSTITUTE',
    icon: '🎓',
  },
  // Add more timeline events here
];

const Timeline = () => (
  <section className="w-full max-w-3xl mx-auto py-16 px-4">
    <h2 className="text-3xl font-bold text-center text-white mb-8 tracking-widest uppercase">My Journey</h2>
    <div className="relative border-l-2 border-cyan-500 ml-6">
      {timeline.map((item, idx) => (
        <div key={idx} className="mb-12 ml-8">
          <div className="absolute -left-6 top-0 flex items-center justify-center w-10 h-10 bg-cyan-700 rounded-full text-2xl border-4 border-[#23234d] shadow-lg">
            {item.icon}
          </div>
          <div className="pl-4">
            <div className="text-lg font-semibold text-cyan-300">{item.year} — {item.title}</div>
            <div className="text-sm text-purple-300 mt-1">{item.place}</div>
            <div className="text-gray-300 mt-1">{item.description}</div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Timeline;
