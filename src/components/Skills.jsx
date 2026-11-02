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
    <section id="skills" aria-label="Skills and technologies" style={{ background: "#0a0a12", padding: "100px 24px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "60px" }}
        >
          <p style={{ color: "#00e5ff", fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>
            What I work with
          </p>
          <h2 className="section-heading cyan-underline" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#ffffff" }}>
            Skills &amp; Technologies
          </h2>
        </motion.div>

        {/* Skill Groups */}
        <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
          {skillGroups.map((group, gi) => (
            <motion.div
              key={gi}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: gi * 0.1 }}
            >
              <p style={{
                color: "#94a3b8", fontSize: "0.78rem", fontWeight: 600,
                textTransform: "uppercase", letterSpacing: "0.1em",
                marginBottom: "20px",
                paddingBottom: "12px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}>
                {group.category}
              </p>
              {/* Chip grid — no bars, no percentages */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                {group.skills.map((skill, si) => (
                  <motion.div
                    key={si}
                    whileHover={{ y: -4, borderColor: "rgba(0,229,255,0.5)", scale: 1.04 }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: si * 0.05 }}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "10px 18px",
                      background: "#111827",
                      border: "1px solid rgba(0,229,255,0.15)",
                      borderRadius: "100px",
                      cursor: "default",
                    }}
                  >
                    <span style={{ fontSize: "1.1rem", color: skill.color, lineHeight: 1 }}>
                      {skill.icon}
                    </span>
                    <span style={{ fontWeight: 600, fontSize: "0.85rem", color: "#e2e8f0" }}>
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
