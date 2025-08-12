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
  { name: "Express.js", icon: <SiExpress className="text-gray-300" />, level: "Intermediate" },
  { name: "Data Structures & Algorithms", icon: <FaBrain className="text-pink-400" />, level: "Advanced" },
  { name: "Machine Learning & AI", icon: <SiTensorflow className="text-orange-400" />, level: "Intermediate" },
  { name: "Problem-Solving Skills", icon: <FaBrain className="text-purple-400" />, level: "Advanced" },
  { name: "Version Control (Git, GitHub)", icon: <SiGithub className="text-gray-400" />, level: "Advanced" },
];

const Skills = () => {
  return (
    <section id="skills" className="bg-black text-white py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl font-bold mb-12 text-indigo-400 text-center"
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
              className="bg-gray-900 p-6 rounded-xl flex flex-col items-center shadow-lg hover:shadow-indigo-500/50 transition-shadow"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <div className="text-5xl mb-4">{skill.icon}</div>
              <h3 className="text-lg font-semibold">{skill.name}</h3>
              <p className="text-gray-400 text-sm">{skill.level}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
