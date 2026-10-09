// src/components/Skills.jsx
import { motion } from "framer-motion";
import {
  SiPython, SiHtml5, SiCss3, SiJavascript, SiReact, SiNodedotjs,
  SiMongodb, SiExpress, SiGit, SiGithub, SiMysql, SiTailwindcss,
} from "react-icons/si";
import { FaBrain } from "react-icons/fa";
import { FiCpu } from "react-icons/fi";

const skillGroups = [
  {
    category: "Frontend",
    skills: [
      { name: "HTML5", icon: <SiHtml5 />, color: "#e34f26", level: 95 },
      { name: "CSS3", icon: <SiCss3 />, color: "#1572b6", level: 90 },
      { name: "JavaScript", icon: <SiJavascript />, color: "#f7df1e", level: 90 },
      { name: "React", icon: <SiReact />, color: "#61dafb", level: 88 },
      { name: "Tailwind", icon: <SiTailwindcss />, color: "#06b6d4", level: 85 },
    ],
  },
  {
    category: "Backend & Database",
    skills: [
      { name: "Node.js", icon: <SiNodedotjs />, color: "#339933", level: 80 },
      { name: "Express.js", icon: <SiExpress />, color: "#ffffff", level: 78 },
      { name: "MongoDB", icon: <SiMongodb />, color: "#47a248", level: 80 },
      { name: "MySQL", icon: <SiMysql />, color: "#4479a1", level: 70 },
      { name: "Python", icon: <SiPython />, color: "#3776ab", level: 85 },
    ],
  },
  {
    category: "Tools & Others",
    skills: [
      { name: "Git", icon: <SiGit />, color: "#f05032", level: 88 },
      { name: "GitHub", icon: <SiGithub />, color: "#ffffff", level: 88 },
      { name: "Algorithms", icon: <FaBrain />, color: "#a855f7", level: 82 },
      { name: "ML/AI", icon: <FiCpu />, color: "#00e5ff", level: 65 },
      { name: "Problem Solving", icon: <FaBrain />, color: "#ec4899", level: 90 },
    ],
  },
];

const Skills = () => {
  return (
    <section id="skills" style={{ background: "#0a0a12", padding: "100px 24px" }}>
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
            Skills & Technologies
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
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "16px" }}>
                {group.skills.map((skill, si) => (
                  <motion.div
                    key={si}
                    className="bento-card"
                    whileHover={{ y: -6, borderColor: "rgba(0,229,255,0.4)" }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: si * 0.05 }}
                    style={{ padding: "20px 18px" }}
                  >
                    {/* Icon */}
                    <div style={{ fontSize: "2rem", marginBottom: "12px", color: skill.color, lineHeight: 1 }}>
                      {skill.icon}
                    </div>
                    <p style={{ fontWeight: 600, fontSize: "0.88rem", color: "#ffffff", marginBottom: "10px" }}>
                      {skill.name}
                    </p>
                    {/* Progress bar */}
                    <div style={{ height: "3px", background: "rgba(255,255,255,0.08)", borderRadius: "2px", overflow: "hidden" }}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 + si * 0.05, ease: "easeOut" }}
                        style={{ height: "100%", background: "linear-gradient(90deg, #00e5ff, #00b8cc)", borderRadius: "2px" }}
                      />
                    </div>
                    <p style={{ color: "#94a3b8", fontSize: "0.7rem", marginTop: "6px", textAlign: "right" }}>
                      {skill.level}%
                    </p>
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
