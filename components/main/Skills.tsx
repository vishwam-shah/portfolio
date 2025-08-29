
import {
  SiPython, SiPytorch, SiTensorflow, SiScikitlearn, SiOpencv, SiNumpy, SiPandas, SiJupyter, SiDocker, SiReact, SiNextdotjs, SiNodedotjs, SiExpress, SiTypescript, SiPostgresql, SiMongodb, SiGraphql, SiRedis, SiAmazonaws, SiGooglecloud, SiLinux, SiTailwindcss, SiStyledcomponents, SiJsonwebtokens, SiR, SiCplusplus
} from "react-icons/si";
import Image from 'next/image';
import { motion } from 'framer-motion';

const aiSkills = [
  { name: "Python", icon: <SiPython size={38} color="#3776AB" /> },
  { name: "PyTorch", icon: <SiPytorch size={38} color="#EE4C2C" /> },
  { name: "TensorFlow", icon: <SiTensorflow size={38} color="#FF6F00" /> },
  { name: "Scikit-learn", icon: <SiScikitlearn size={38} color="#F7931E" /> },
  { name: "HuggingFace", icon: <Image src="https://huggingface.co/front/assets/huggingface_logo-noborder.svg" alt="HuggingFace" width={38} height={38} /> },
  { name: "Numpy", icon: <SiNumpy size={38} color="#013243" /> },
  { name: "Pandas", icon: <SiPandas size={38} color="#150458" /> },
  { name: "Jupyter", icon: <SiJupyter size={38} color="#F37626" /> },
  { name: "Docker (MLOps)", icon: <SiDocker size={38} color="#2496ED" /> },
  { name: "Deep Learning", icon: <SiR size={38} color="#276DC3" /> },
  { name: "NLP", icon: <SiCplusplus size={38} color="#00599C" /> },
  { name: "Computer Vision", icon: <SiOpencv size={38} color="#5C3EE8" /> },
  { name: "Reinforcement Learning", icon: <SiPython size={38} color="#FFD21F" /> },
];

const fullStackSkills = [
  { name: "Next.js", icon: <SiNextdotjs size={38} color="#fff" /> },
  { name: "React", icon: <SiReact size={38} color="#61DAFB" /> },
  { name: "Node.js", icon: <SiNodedotjs size={38} color="#339933" /> },
  { name: "Express", icon: <SiExpress size={38} color="#fff" /> },
  { name: "TypeScript", icon: <SiTypescript size={38} color="#3178C6" /> },
  // { name: "PostgreSQL", icon: <SiPostgresql size={38} color="#336791" /> },
  { name: "MongoDB", icon: <SiMongodb size={38} color="#47A248" /> },
  // { name: "Docker", icon: <SiDocker size={38} color="#2496ED" /> },
  // { name: "GraphQL", icon: <SiGraphql size={38} color="#E10098" /> },
  { name: "Redis", icon: <SiRedis size={38} color="#DC382D" /> },
  // { name: "AWS", icon: <SiAmazonaws size={38} color="#FF9900" /> },
  // { name: "GCP", icon: <SiGooglecloud size={38} color="#4285F4" /> },
  { name: "JWT", icon: <SiJsonwebtokens size={38} color="#FCC624" /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss size={38} color="#38BDF8" /> },
  { name: "Styled Components", icon: <SiStyledcomponents size={38} color="#DB7093" /> },
];

const Skills = () => {
  return (
    <section id="skills" className="flex flex-col items-center justify-center gap-8 py-12 relative">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-8 tracking-widest uppercase">
        Skills
      </h2>
      <div className="w-full flex flex-col md:flex-row gap-12 justify-center items-start">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-cyan-300 mb-4 flex items-center gap-2">
            <span>🧠</span> AI / Machine Learning
          </h3>
          <div className="flex flex-wrap gap-6">
            {aiSkills.map((skill, idx) => (
              <motion.div
                key={skill.name}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.15, rotate: 6 }}
                transition={{ duration: 0.5, type: 'spring', bounce: 0.3, delay: idx * 0.07 }}
                viewport={{ once: true }}
              >
                {skill.icon}
                <span className="text-white text-sm font-medium text-center mt-2">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-cyan-300 mb-4 flex items-center gap-2">
            <span>🚀</span> Full Stack
          </h3>
          <div className="flex flex-wrap gap-6">
            {fullStackSkills.map((skill, idx) => (
              <motion.div
                key={skill.name}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.15, rotate: 6 }}
                transition={{ duration: 0.5, type: 'spring', bounce: 0.3, delay: idx * 0.07 }}
                viewport={{ once: true }}
              >
                {skill.icon}
                <span className="text-white text-sm font-medium text-center mt-2">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
