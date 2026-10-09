// src/pages/ProjectsList.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiExternalLink, FiGithub, FiX, FiLayers, FiZap } from "react-icons/fi";

const projects = [
  {
    id: 1,
    name: "Match Finder",
    image: "/match-finder.jpeg",
    description: "A modern matrimonial platform connecting users based on preferences, with advanced filtering and profile matching.",
    technologies: ["React", "Tailwind CSS", "Framer Motion", "Firebase"],
    liveLink: "https://match-finder-2c918.web.app/",
    githubClient: "https://github.com/MaHdIn2020/MatchFinder",
    challenges: "Building a fully responsive layout with smooth animations and implementing complex filter logic for user preferences.",
    futurePlans: "Adding real-time chat, user authentication, and AI-powered match recommendations.",
  },
  {
    id: 2,
    name: "HobbyHive",
    image: "/HobbyHive.jpeg",
    description: "A group buying platform for hobby enthusiasts featuring product reviews, group orders, and community features.",
    technologies: ["React.js", "Node.js", "MongoDB", "Express.js"],
    liveLink: "https://hobbyhive-d81af.web.app/",
    githubClient: "https://github.com/MaHdIn2020/hobbyhive",
    challenges: "Handling concurrent user authentication, managing group purchase states, and implementing a review system.",
    futurePlans: "Expanding hobby categories, improving UI/UX, and adding payment gateway integration.",
  },
  {
    id: 3,
    name: "Review Hub",
    image: "/review-hub.jpeg",
    description: "A responsive product review platform with user authentication, ratings, and a curated product discovery feed.",
    technologies: ["React.js", "Node.js", "MongoDB", "Express.js"],
    liveLink: "https://review-hub-641bc.web.app/",
    githubClient: "https://github.com/MaHdIn2020/Review-Hub",
    challenges: "Building a secure review system, preventing duplicate reviews, and handling user auth at scale.",
    futurePlans: "Implementing AI-powered product recommendations and improving the overall UI/UX experience.",
  },
];

const ProjectsList = () => {
  const [selected, setSelected] = useState(null);

  return (
    <section id="projects" style={{ background: "#0d1117", padding: "100px 24px" }}>
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
            What I've built
          </p>
          <h2 className="section-heading cyan-underline" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#ffffff" }}>
            My Projects
          </h2>
        </motion.div>

        {/* Project Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="bento-card"
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              whileHover={{ y: -6 }}
              style={{ cursor: "pointer", overflow: "hidden" }}
              onClick={() => setSelected(project)}
            >
              {/* Image */}
              <div style={{ position: "relative", overflow: "hidden", height: "200px" }}>
                <img
                  src={project.image}
                  alt={project.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
                  onMouseEnter={e => (e.target.style.transform = "scale(1.06)")}
                  onMouseLeave={e => (e.target.style.transform = "scale(1)")}
                />
                {/* Overlay */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to bottom, transparent 50%, rgba(10,10,18,0.9) 100%)",
                }} />
              </div>

              {/* Content */}
              <div style={{ padding: "24px" }}>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.15rem", color: "#ffffff", marginBottom: "10px" }}>
                  {project.name}
                </h3>
                <p style={{ color: "#94a3b8", fontSize: "0.875rem", lineHeight: 1.65, marginBottom: "16px" }}>
                  {project.description}
                </p>

                {/* Tech badges */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="skill-badge" style={{ fontSize: "0.72rem", padding: "4px 10px" }}>
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div style={{ display: "flex", gap: "12px" }}>
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      style={{ display: "flex", alignItems: "center", gap: "6px", color: "#00e5ff", fontSize: "0.82rem", fontWeight: 600, textDecoration: "none" }}
                      onMouseEnter={e => (e.currentTarget.style.opacity = "0.7")}
                      onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                    >
                      <FiExternalLink size={14} /> Live Demo
                    </a>
                  )}
                  {project.githubClient && (
                    <a
                      href={project.githubClient}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      style={{ display: "flex", alignItems: "center", gap: "6px", color: "#94a3b8", fontSize: "0.82rem", fontWeight: 600, textDecoration: "none" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#ffffff")}
                      onMouseLeave={e => (e.currentTarget.style.color = "#94a3b8")}
                    >
                      <FiGithub size={14} /> Source Code
                    </a>
                  )}
                  <span
                    style={{ marginLeft: "auto", color: "#00e5ff", fontSize: "0.78rem", fontWeight: 500, opacity: 0.7 }}
                  >
                    View Details →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            style={{
              position: "fixed", inset: 0,
              background: "rgba(0,0,0,0.85)",
              backdropFilter: "blur(8px)",
              display: "flex", alignItems: "center", justifyContent: "center",
              zIndex: 200, padding: "24px",
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: "#111827",
                border: "1px solid rgba(0,229,255,0.2)",
                borderRadius: "20px",
                maxWidth: "720px",
                width: "100%",
                maxHeight: "85vh",
                overflowY: "auto",
              }}
            >
              {/* Image */}
              <div style={{ position: "relative" }}>
                <img
                  src={selected.image}
                  alt={selected.name}
                  style={{ width: "100%", height: "260px", objectFit: "cover", borderRadius: "20px 20px 0 0" }}
                />
                <button
                  onClick={() => setSelected(null)}
                  aria-label="Close"
                  style={{
                    position: "absolute", top: "16px", right: "16px",
                    background: "rgba(10,10,18,0.8)", border: "1px solid rgba(0,229,255,0.3)",
                    borderRadius: "50%", width: "36px", height: "36px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#00e5ff", cursor: "pointer", fontSize: "1rem",
                  }}
                >
                  <FiX />
                </button>
              </div>

              {/* Content */}
              <div style={{ padding: "32px" }}>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.6rem", color: "#ffffff", marginBottom: "8px" }}>
                  {selected.name}
                </h3>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px" }}>
                  {selected.technologies.map((t, i) => (
                    <span key={i} className="skill-badge" style={{ fontSize: "0.75rem" }}>{t}</span>
                  ))}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                  {[
                    { label: "Description", icon: <FiLayers size={14} />, text: selected.description },
                    { label: "Challenges", icon: <FiZap size={14} />, text: selected.challenges },
                    { label: "Future Plans", icon: <FiZap size={14} />, text: selected.futurePlans },
                  ].map((item, i) => (
                    <div key={i}>
                      <p style={{ display: "flex", alignItems: "center", gap: "6px", color: "#00e5ff", fontSize: "0.78rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "6px" }}>
                        {item.icon} {item.label}
                      </p>
                      <p style={{ color: "#94a3b8", lineHeight: 1.7, fontSize: "0.9rem" }}>{item.text}</p>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", gap: "14px", marginTop: "28px", flexWrap: "wrap" }}>
                  {selected.liveLink && (
                    <a href={selected.liveLink} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: "0.85rem", padding: "10px 22px" }}>
                      Live Demo ↗
                    </a>
                  )}
                  {selected.githubClient && (
                    <a href={selected.githubClient} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ fontSize: "0.85rem", padding: "10px 22px", display: "flex", alignItems: "center", gap: "8px" }}>
                      <FiGithub /> Source Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsList;
