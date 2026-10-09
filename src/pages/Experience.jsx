// src/pages/Experience.jsx
import { motion } from "framer-motion";
import { FiBriefcase, FiCalendar, FiMapPin } from "react-icons/fi";

const experiences = [
  {
    role: "Coding Instructor",
    company: "Codingal",
    logo: "/codingal.png",
    location: "Remote",
    period: "2026 – Present",
    type: "Full-time",
    description:
      "Teaching programming concepts and web development to students across different age groups. Designing engaging lesson plans, conducting live coding sessions, and mentoring aspiring developers to build real-world projects.",
    highlights: [
      "Delivered 1-on-1 and group coding sessions for students aged 8–18",
      "Taught Python, JavaScript, HTML/CSS and introductory web development",
      "Designed structured curricula aligned with student learning objectives",
      "Mentored students through project-based learning and hackathons",
    ],
  },
];

const Experience = () => {
  return (
    <section
      id="experience"
      style={{ background: "#0a0a12", padding: "100px 24px" }}
    >
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
            Work history
          </p>
          <h2
            className="section-heading cyan-underline"
            style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#ffffff" }}
          >
            Experience
          </h2>
        </motion.div>

        {/* Experience Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              className="bento-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{ padding: "36px" }}
            >
              {/* Top row */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", marginBottom: "24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                  {/* Logo */}
                  <div style={{
                    width: "60px", height: "60px", borderRadius: "12px",
                    background: "#ffffff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    padding: "8px", flexShrink: 0,
                    border: "1px solid rgba(0,229,255,0.15)",
                  }}>
                    <img src={exp.logo} alt={exp.company} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                  </div>

                  <div>
                    <h3 style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      fontSize: "1.3rem",
                      color: "#ffffff",
                      marginBottom: "4px",
                    }}>
                      {exp.role}
                    </h3>
                    <p style={{ color: "#00e5ff", fontWeight: 600, fontSize: "1rem" }}>{exp.company}</p>
                  </div>
                </div>

                {/* Meta info badges */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(0,229,255,0.08)", border: "1px solid rgba(0,229,255,0.2)", borderRadius: "100px", padding: "5px 14px", color: "#00e5ff", fontSize: "0.78rem", fontWeight: 500 }}>
                    <FiCalendar size={12} /> {exp.period}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(148,163,184,0.08)", border: "1px solid rgba(148,163,184,0.15)", borderRadius: "100px", padding: "5px 14px", color: "#94a3b8", fontSize: "0.78rem", fontWeight: 500 }}>
                    <FiMapPin size={12} /> {exp.location}
                  </span>
                  <span style={{ background: "rgba(0,229,255,0.12)", border: "1px solid rgba(0,229,255,0.25)", borderRadius: "100px", padding: "5px 14px", color: "#00e5ff", fontSize: "0.78rem", fontWeight: 500 }}>
                    {exp.type}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p style={{ color: "#94a3b8", lineHeight: 1.75, fontSize: "0.93rem", marginBottom: "24px" }}>
                {exp.description}
              </p>

              {/* Highlights */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {exp.highlights.map((h, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <div style={{ width: "6px", height: "6px", background: "#00e5ff", borderRadius: "50%", marginTop: "7px", flexShrink: 0 }} />
                    <p style={{ color: "#cbd5e1", fontSize: "0.88rem", lineHeight: 1.6 }}>{h}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
