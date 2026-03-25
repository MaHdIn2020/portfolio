// src/components/Skills.jsx
import { motion } from "framer-motion";
import {
  SiPython,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiExpress,
  SiGit,
  SiGithub,
  SiMysql,
  SiTensorflow,
} from "react-icons/si";
import { FaBrain } from "react-icons/fa";

const skills = [
  { name: "Python", icon: <SiPython className="text-yellow-400" />, level: "Advanced" },
  { name: "HTML5", icon: <SiHtml5 className="text-orange-500" />, level: "Advanced" },
  { name: "CSS3", icon: <SiCss3 className="text-blue-500" />, level: "Advanced" },
  { name: "JavaScript", icon: <SiJavascript className="text-yellow-300" />, level: "Advanced" },
  { name: "React", icon: <SiReact className="text-cyan-400" />, level: "Advanced" },
  { name: "Node.js", icon: <SiNodedotjs className="text-green-500" />, level: "Intermediate" },
  { name: "MongoDB", icon: <SiMongodb className="text-green-400" />, level: "Intermediate" },
  { name: "Express.js", icon: <SiExpress className="text-black" />, level: "Intermediate" },
  { name: "Algorithms", icon: <FaBrain className="text-pink-400" />, level: "Advanced" },
  { name: "Machine Learning", icon: <SiTensorflow className="text-orange-400" />, level: "Intermediate" },
  { name: "Problem Solving", icon: <FaBrain className="text-purple-400" />, level: "Advanced" },
  { name: "Git / GitHub", icon: <SiGithub className="text-gray-800" />, level: "Advanced" },
];

const Skills = () => {
  return (
    <section id="skills" className="bg-[#5C94FC] text-white py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl font-bold mb-12 text-[#FBD000] pixel-text text-center drop-shadow-[3px_3px_0_#000]"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Skills & Technologies
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 flex flex-col items-center pixel-border text-black cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10, rotate: index % 2 === 0 ? 2 : -2 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <div className="text-5xl mb-4 drop-shadow-[2px_2px_0_#000] drop-shadow-color-white">{skill.icon}</div>
              <h3 className="text-sm font-bold pixel-text text-center leading-snug h-8 flex items-center">{skill.name}</h3>
              <p className="text-gray-600 font-bold text-xs mt-2 uppercase">{skill.level}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
