// src/components/Skills.jsx
import { motion } from "framer-motion";
import {
  SiPython, SiJavascript, SiCplusplus, SiHtml5, SiCss3,
  SiReact, SiNodedotjs, SiExpress, SiMongodb, SiTailwindcss,
  SiStreamlit, SiScikitlearn, SiTensorflow, SiPandas, SiNumpy,
  SiGit, SiGithub, SiVercel,
} from "react-icons/si";
import { FaBrain } from "react-icons/fa";

// Skills grouped by area — only tools used across repos/experience
const skillGroups = [
  {
    category: "Languages",
    skills: [
      { name: "Python", icon: <SiPython />, color: "#3776ab" },
      { name: "JavaScript", icon: <SiJavascript />, color: "#f7df1e" },
      { name: "C++", icon: <SiCplusplus />, color: "#00599c" },
      { name: "HTML5", icon: <SiHtml5 />, color: "#e34f26" },
      { name: "CSS3", icon: <SiCss3 />, color: "#1572b6" },
    ],
  },
  {
    category: "Web",
    skills: [
      { name: "React", icon: <SiReact />, color: "#61dafb" },
      { name: "Node.js", icon: <SiNodedotjs />, color: "#339933" },
      { name: "Express.js", icon: <SiExpress />, color: "#ffffff" },
      { name: "MongoDB", icon: <SiMongodb />, color: "#47a248" },
      { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "#06b6d4" },
      { name: "Streamlit", icon: <SiStreamlit />, color: "#ff4b4b" },
    ],
  },
  {
    category: "ML / Data",
    skills: [
      { name: "scikit-learn", icon: <SiScikitlearn />, color: "#f7931e" },
      { name: "TensorFlow / Keras", icon: <SiTensorflow />, color: "#ff6f00" },
      { name: "Pandas", icon: <SiPandas />, color: "#150458" },
      { name: "NumPy", icon: <SiNumpy />, color: "#4dabcf" },
      { name: "Gensim / NLP", icon: <FaBrain />, color: "#a855f7" },
    ],
  },
  {
    category: "Tools",
    skills: [
      { name: "Git", icon: <SiGit />, color: "#f05032" },
      { name: "GitHub", icon: <SiGithub />, color: "#ffffff" },
      { name: "Vercel", icon: <SiVercel />, color: "#ffffff" },
    ],
  },
];

const Skills = () => {
  return (
    <section id="skills" aria-label="Skills and technologies" className="bg-[#0a0a12] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-14"
        >
          <p className="text-[#00e5ff] text-xs font-semibold uppercase tracking-widest mb-3">
            What I work with
          </p>
          <h2 className="section-heading cyan-underline text-3xl sm:text-4xl lg:text-5xl text-white font-bold">
            Skills &amp; Technologies
          </h2>
        </motion.div>

        {/* Skill Groups */}
        <div className="flex flex-col gap-10 sm:gap-12">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={gi}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: gi * 0.1 }}
            >
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-4 pb-3 border-b border-slate-800">
                {group.category}
              </p>
              {/* Chip grid */}
              <div className="flex flex-wrap gap-2.5 sm:gap-3">
                {group.skills.map((skill, si) => (
                  <motion.div
                    key={si}
                    whileHover={{ y: -3, scale: 1.03 }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: si * 0.04 }}
                    className="inline-flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 bg-[#111827] border border-cyan-500/20 hover:border-cyan-500/50 rounded-full cursor-default transition-all shadow-sm"
                  >
                    <span className="text-base sm:text-lg leading-none" style={{ color: skill.color }}>
                      {skill.icon}
                    </span>
                    <span className="font-medium text-xs sm:text-sm text-slate-200">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
