// src/components/TechMarquee.jsx
// Infinite scrolling horizontal tech stack banner between sections
import { motion } from "framer-motion";
import {
  SiReact, SiNodedotjs, SiMongodb, SiJavascript,
  SiPython, SiHtml5, SiCss3, SiGit, SiExpress,
  SiTailwindcss, SiFirebase, SiGithub,
} from "react-icons/si";

const techStack = [
  { name: "React",      icon: <SiReact />,      color: "#61dafb" },
  { name: "Node.js",    icon: <SiNodedotjs />,  color: "#339933" },
  { name: "MongoDB",    icon: <SiMongodb />,    color: "#47a248" },
  { name: "JavaScript", icon: <SiJavascript />, color: "#f7df1e" },
  { name: "Python",     icon: <SiPython />,     color: "#3776ab" },
  { name: "HTML5",      icon: <SiHtml5 />,      color: "#e34f26" },
  { name: "CSS3",       icon: <SiCss3 />,       color: "#1572b6" },
  { name: "Git",        icon: <SiGit />,        color: "#f05032" },
  { name: "Express",    icon: <SiExpress />,    color: "#ffffff" },
  { name: "Tailwind",   icon: <SiTailwindcss />,color: "#06b6d4" },
  { name: "Firebase",   icon: <SiFirebase />,   color: "#ffca28" },
  { name: "GitHub",     icon: <SiGithub />,     color: "#ffffff" },
];

// Duplicate for seamless loop
const items = [...techStack, ...techStack];

const TechMarquee = () => {
  return (
    <div
      style={{
        background: "#0d1117",
        borderTop: "1px solid rgba(0,229,255,0.08)",
        borderBottom: "1px solid rgba(0,229,255,0.08)",
        padding: "20px 0",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Left fade */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: "120px", zIndex: 2,
        background: "linear-gradient(90deg, #0d1117, transparent)",
        pointerEvents: "none",
      }} />
      {/* Right fade */}
      <div style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: "120px", zIndex: 2,
        background: "linear-gradient(-90deg, #0d1117, transparent)",
        pointerEvents: "none",
      }} />

      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
        style={{ display: "flex", gap: "48px", width: "max-content" }}
      >
        {items.map((tech, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ fontSize: "1.3rem", color: tech.color }}>{tech.icon}</span>
            <span style={{ color: "#94a3b8", fontSize: "0.85rem", fontWeight: 500 }}>
              {tech.name}
            </span>
            {/* Separator dot */}
            <span style={{ color: "rgba(0,229,255,0.25)", marginLeft: "4px", fontSize: "0.6rem" }}>◆</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default TechMarquee;
