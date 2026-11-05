// src/pages/Skills.jsx
// Technologies — grouped, staggered reveal.
import { motion } from "framer-motion";
import {
  SiPython, SiJavascript, SiCplusplus, SiHtml5, SiCss3,
  SiReact, SiNodedotjs, SiExpress, SiMongodb, SiTailwindcss, SiFirebase,
  SiStreamlit, SiScikitlearn, SiTensorflow, SiPandas, SiNumpy,
  SiGit, SiGithub, SiVercel, SiPostman,
} from "react-icons/si";
import { FaBrain } from "react-icons/fa";
import DecryptedText from "../components/DecryptedText";

const skillGroups = [
  { category: "CODE & INTERFACE", skills: [
    { name: "Python", icon: <SiPython /> }, { name: "JavaScript", icon: <SiJavascript /> },
    { name: "C++", icon: <SiCplusplus /> }, { name: "HTML5", icon: <SiHtml5 /> },
    { name: "CSS3", icon: <SiCss3 /> }, { name: "React", icon: <SiReact /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss /> }, { name: "Figma", icon: <FaBrain /> },
  ]},
  { category: "SERVERS & STORAGE", skills: [
    { name: "Node.js", icon: <SiNodedotjs /> }, { name: "Express.js", icon: <SiExpress /> },
    { name: "MongoDB", icon: <SiMongodb /> }, { name: "Firebase", icon: <SiFirebase /> },
    { name: "Streamlit", icon: <SiStreamlit /> },
  ]},
  { category: "MODELS & DATA", skills: [
    { name: "scikit-learn", icon: <SiScikitlearn /> }, { name: "TensorFlow / Keras", icon: <SiTensorflow /> },
    { name: "Pandas", icon: <SiPandas /> }, { name: "NumPy", icon: <SiNumpy /> },
    { name: "XGBoost", icon: <FaBrain /> }, { name: "Gensim / NLP", icon: <FaBrain /> },
  ]},
  { category: "EVERYDAY TOOLS", skills: [
    { name: "Git", icon: <SiGit /> }, { name: "GitHub", icon: <SiGithub /> },
    { name: "Vercel", icon: <SiVercel /> }, { name: "Postman", icon: <SiPostman /> },
  ]},
];

export default function Skills() {
  return (
    <section id="skills" className="section" aria-label="Toolbox">
      <div className="kicker" data-reveal>
        <span>TOOLBOX</span>
        <span className="k-right">WHAT'S IN THE BAG</span>
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
        className="display-title"
        style={{ fontSize: "clamp(52px, 7vw, 96px)", margin: "36px 0 56px" }}
      >
        <DecryptedText
          text="The toolbox"
          animateOn="both"
          effect="scramble"
          sequential
          revealDirection="start"
          speed={40}
          maxIterations={8}
          scrambleColor="#00e5ff"
          encryptedClassName="decrypted-glyph"
          characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%&*"
        />
      </motion.h2>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {skillGroups.map((group, gi) => (
          <motion.div
            key={gi}
            className="technology-group"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }}
            style={{ display: "grid", gridTemplateColumns: "minmax(180px, 0.3fr) 1fr", gap: 24, padding: "22px 0", borderTop: "1px solid var(--line)" }}
          >
            <motion.p variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }} style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.14em", color: "var(--muted)", paddingTop: 8 }}>
              <span style={{ color: "var(--accent)", marginRight: 8 }}>0{gi + 1}</span>{group.category}
            </motion.p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "10px 18px" }}>
              {group.skills.map((skill, si) => (
                <motion.div
                  key={si}
                  variants={{ hidden: { opacity: 0, y: 16, scale: 0.97 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45 } } }}
                  whileHover={{ y: -2, color: "var(--accent)" }}
                  style={{ display: "flex", alignItems: "center", gap: 10, color: "#9aa5b1", padding: "10px 12px", border: "1px solid transparent", transition: "border-color .25s" }}
                >
                  <span style={{ fontSize: 19, color: "currentColor" }}>{skill.icon}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#e6edf2" }}>{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      <style>{`
        @media (max-width: 900px) {
          .technology-group { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
