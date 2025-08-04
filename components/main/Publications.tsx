import React from 'react';

const publications = [
  {
    title: 'EEG Based Motor Imagery Classification Using Deep Learning',
    venue: 'ICCCNT 2025',
    year: 2025,
    description: 'This work reviews recent advances in EEG-based motor imagery classification for non-invasive brain-computer interfaces. It highlights semi-supervised learning, attention mechanisms, CNNs, and Riemannian geometry as key techniques for improving accuracy and overcoming challenges in interpreting complex, individual EEG signals.',
    link: '#',
  },
  // Add more publications here
];

const Publications = () => (
  <section className="w-full max-w-3xl mx-auto py-16 px-4">
    <h2 className="text-3xl font-bold text-center text-white mb-8 tracking-widest uppercase">Publications</h2>
    <ul className="space-y-8">
      {publications.map((pub, idx) => (
        <li key={idx} className="bg-gradient-to-r from-[#1a1a2e] to-[#23234d] rounded-xl p-6 shadow-lg border border-[#2d2d5a]">
          <a href={pub.link} target="_blank" rel="noopener noreferrer" className="text-xl font-semibold text-cyan-400 hover:underline cursor-pointer transition-all duration-200 hover:text-purple-400">
            {pub.title}
          </a>
          <div className="text-sm text-gray-400 mt-1">{pub.venue} &middot; {pub.year}</div>
          <p className="mt-2 text-gray-200">{pub.description}</p>
        </li>
      ))}
    </ul>
  </section>
);

export default Publications;
