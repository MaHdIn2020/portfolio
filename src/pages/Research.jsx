// src/pages/Research.jsx
// New section: Research (not projects). Placed after Projects, before Contact.
import { motion } from "framer-motion";
import { FiBookOpen } from "react-icons/fi";

const researchItems = [
  {
    id: 1,
    title: "Hybrid Physics Tutoring System for NCTB Class 9–10 Students",
    type: "Undergraduate Thesis",
    oneLiner:
      "Designing a hybrid tutoring system for NCTB Class 9–10 physics, supervised at BRAC University.",
    description:
      "Undergraduate thesis developing a hybrid physics tutoring system for Class 9–10 students following the NCTB curriculum in Bangladesh. The system aims to support student learning through adaptive feedback. Supervisors: Md. Fakhruddin Gazzali and Dr. Muhammad Iqbal Hossain, BRAC University.",
    status: "In Progress",
    tags: ["Education Technology", "Adaptive Systems", "NLP", "Bangladesh"],
    // TODO(Tanjip): add paper/poster link when ready
  },
  {
    id: 2,
    title: "Flood Risk Prediction Across Regions of Bangladesh",
    type: "Course Thesis — Phitron",
    oneLiner:
      "Classical ML for flood risk classification in Bangladesh, evaluated with leave-one-region-out validation.",
    description:
      "Phitron course thesis applying classical machine learning to flood risk prediction across regions of Bangladesh. The evaluation uses a leave-one-region-out cross-validation strategy to assess how well models generalise to unseen geographic areas. Work is ongoing and no final results are reported.",
    status: "In Progress",
    tags: ["Machine Learning", "Natural Disaster", "Bangladesh", "Geospatial"],
    // TODO(Tanjip): add paper/poster link when ready
  },
];

const statusColors = {
  "In Progress": { bg: "rgba(251,146,60,0.1)", border: "rgba(251,146,60,0.35)", text: "#fb923c" },
  Published: { bg: "rgba(0,229,255,0.1)", border: "rgba(0,229,255,0.3)", text: "#00e5ff" },
};

const Research = () => {
  return (
    <section
      id="research"
      aria-label="Research"
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
            Academic work
          </p>
          <h2 className="section-heading cyan-underline" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#ffffff" }}>
            Research
          </h2>
        </motion.div>

        {/* Research cards — distinct style from project cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {researchItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              style={{
                background: "linear-gradient(135deg, rgba(0,229,255,0.03) 0%, rgba(10,10,18,0) 100%)",
                border: "1px solid rgba(0,229,255,0.15)",
                borderLeft: "3px solid #00e5ff",
                borderRadius: "16px",
                padding: "36px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Background glow */}
              <div
                style={{
                  position: "absolute", top: 0, right: 0,
                  width: "200px", height: "200px",
                  background: "radial-gradient(circle, rgba(0,229,255,0.04) 0%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />

              {/* Type + status row */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px", flexWrap: "wrap" }}>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  color: "#94a3b8", fontSize: "0.75rem", fontWeight: 600,
                  textTransform: "uppercase", letterSpacing: "0.08em",
                }}>
                  <FiBookOpen size={13} /> {item.type}
                </span>
                <span
                  style={{
                    padding: "3px 12px",
                    borderRadius: "100px",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    background: statusColors[item.status]?.bg,
                    border: `1px solid ${statusColors[item.status]?.border}`,
                    color: statusColors[item.status]?.text,
                  }}
                >
                  {item.status}
                </span>
              </div>

              {/* Title */}
              <h3 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "1.2rem",
                color: "#ffffff",
                lineHeight: 1.4,
                marginBottom: "8px",
              }}>
                {item.title}
              </h3>

              {/* One-liner */}
              <p style={{ color: "#00e5ff", fontSize: "0.85rem", fontWeight: 500, marginBottom: "14px" }}>
                {item.oneLiner}
              </p>

              {/* Description */}
              <p style={{ color: "#94a3b8", lineHeight: 1.75, fontSize: "0.9rem", marginBottom: "20px" }}>
                {item.description}
              </p>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {item.tags.map((tag, j) => (
                  <span
                    key={j}
                    style={{
                      padding: "4px 12px",
                      borderRadius: "6px",
                      background: "rgba(148,163,184,0.08)",
                      border: "1px solid rgba(148,163,184,0.15)",
                      color: "#64748b",
                      fontSize: "0.72rem",
                      fontWeight: 500,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {/* TODO(Tanjip): add paper/poster link here when ready */}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Research;
