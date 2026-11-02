// src/pages/Research.jsx
import { motion } from "framer-motion";
import { FiBookOpen, FiCheckCircle, FiClock, FiAward, FiTag, FiUser } from "react-icons/fi";

const researchPapers = [
  {
    id: 1,
    title: "Confidence-Governed Hybrid SLM-LLM Tutoring",
    author: "Tanjip Surait Mahdin",
    description:
      "A hybrid physics tutoring system for NCTB Class 9–10 students built on a fine-tuned Qwen2.5-1.5B model with LoRA adapters and hybrid RAG (FAISS + BM25). Confidence-based routing escalates low-confidence queries to a Tutor LLM via Groq API within an active learning loop. The pipeline is trained on 7,000+ Socratic QA pairs across 13 NCTB chapters.",
    statuses: [
      {
        label: "Extended Abstract Accepted",
        venue: "BRAC University Silver Jubilee Research Conference 2026",
        icon: FiCheckCircle,
        color: "#10b981",
        bg: "rgba(16,185,129,0.08)",
        border: "rgba(16,185,129,0.25)",
      },
      {
        label: "Recommended for Exhibition",
        venue: "Phase 2 Panel Members, CSE Department, BRAC University",
        icon: FiAward,
        color: "#06b6d4",
        bg: "rgba(6,182,212,0.08)",
        border: "rgba(6,182,212,0.25)",
      },
    ],
    tags: ["Qwen2.5", "LoRA", "RAG", "FAISS", "BM25", "Groq", "Gradio"],
    featured: true,
  },
  {
    id: 2,
    title: "Flood Risk Prediction Across Regions of Bangladesh Using Classical Machine Learning",
    author: "Tanjip Surait Mahdin",
    description:
      "Region-wise flood risk prediction for Bangladesh using classical machine learning, evaluated with leave-one-region-out (LORO) spatial cross-validation to benchmark cross-region generalization. The study assesses predictive stability across diverse environmental and hydrological conditions across Bangladesh.",
    statuses: [
      {
        label: "Under Review",
        venue:
          "Submitted to ECCE 2027 (International Conference on Electrical, Computer and Communication Engineering), hosted at CUET",
        icon: FiClock,
        color: "#f59e0b",
        bg: "rgba(245,158,11,0.08)",
        border: "rgba(245,158,11,0.25)",
      },
    ],
    tags: ["Classical ML", "LORO Validation", "Python"],
    featured: false,
  },
];

const Research = () => {
  return (
    <section
      id="research"
      aria-label="Academic Research and Publications"
      style={{ background: "#0a0a12", padding: "100px 24px" }}
    >
      <style>{`
        .research-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
        }
        @media (max-width: 900px) {
          .research-grid { grid-template-columns: 1fr; }
        }
        .research-status-badge {
          display: flex;
          flex-wrap: wrap;
          align-items: flex-start;
          gap: 8px;
          padding: 10px 14px;
          border-radius: 10px;
          border-width: 1px;
          border-style: solid;
          margin-bottom: 10px;
        }
        .research-tag {
          display: inline-block;
          padding: 4px 11px;
          font-size: 0.75rem;
          font-family: 'Space Grotesk', monospace;
          border-radius: 6px;
          background: rgba(0,229,255,0.07);
          border: 1px solid rgba(0,229,255,0.18);
          color: #67e8f9;
          transition: background 0.2s, border-color 0.2s;
        }
        .research-tag:hover {
          background: rgba(0,229,255,0.14);
          border-color: rgba(0,229,255,0.4);
        }
      `}</style>

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "60px" }}
        >
          <p
            style={{
              color: "#00e5ff",
              fontSize: "0.8rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "12px",
            }}
          >
            Academic Work &amp; Preprints
          </p>
          <h2
            className="section-heading cyan-underline"
            style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#ffffff" }}
          >
            Research
          </h2>
        </motion.div>

        {/* Research Cards Grid */}
        <motion.div
          className="research-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {researchPapers.map((paper) => (
            <motion.article
              key={paper.id}
              className="bento-card"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              whileHover={{ y: -6 }}
              style={{
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                overflow: "hidden",
                borderColor: paper.featured
                  ? "rgba(0, 229, 255, 0.35)"
                  : "rgba(30, 41, 59, 0.9)",
              }}
            >
              {/* Cyan top accent for featured card */}
              {paper.featured && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    background: "linear-gradient(90deg, #00e5ff, transparent)",
                  }}
                />
              )}

              <div>
                {/* Header: icon + author */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "10px",
                    marginBottom: "18px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "10px",
                        background: "rgba(0,229,255,0.08)",
                        border: "1px solid rgba(0,229,255,0.22)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#00e5ff",
                        flexShrink: 0,
                      }}
                    >
                      <FiBookOpen size={17} />
                    </div>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        fontFamily: "'Space Grotesk', monospace",
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "#00e5ff",
                      }}
                    >
                      Research Paper
                    </span>
                  </div>

                  {/* Author pill */}
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "4px 12px",
                      borderRadius: "999px",
                      background: "rgba(30,41,59,0.7)",
                      border: "1px solid rgba(71,85,105,0.6)",
                      color: "#cbd5e1",
                      fontSize: "0.75rem",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <FiUser size={12} style={{ color: "#00e5ff", flexShrink: 0 }} />
                    <span style={{ fontWeight: 500 }}>{paper.author}</span>
                  </div>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    color: "#ffffff",
                    lineHeight: 1.4,
                    marginBottom: "18px",
                    transition: "color 0.2s",
                  }}
                >
                  {paper.title}
                </h3>

                {/* Status Badges */}
                <div style={{ marginBottom: "16px" }}>
                  {paper.statuses.map((st, idx) => {
                    const Icon = st.icon;
                    return (
                      <div
                        key={idx}
                        className="research-status-badge"
                        style={{
                          background: st.bg,
                          borderColor: st.border,
                        }}
                      >
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            fontSize: "0.78rem",
                            fontWeight: 700,
                            color: st.color,
                            whiteSpace: "nowrap",
                          }}
                        >
                          <Icon size={13} />
                          {st.label}
                        </span>
                        <span
                          style={{
                            fontSize: "0.76rem",
                            color: "#94a3b8",
                            lineHeight: 1.4,
                          }}
                        >
                          {st.venue}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Description */}
                <p
                  style={{
                    color: "#94a3b8",
                    fontSize: "0.9rem",
                    lineHeight: 1.75,
                    marginBottom: "24px",
                  }}
                >
                  {paper.description}
                </p>
              </div>

              {/* Tags footer */}
              <div
                style={{
                  paddingTop: "18px",
                  borderTop: "1px solid rgba(30,41,59,0.8)",
                  marginTop: "auto",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    marginBottom: "10px",
                    fontSize: "0.75rem",
                    color: "#64748b",
                    fontWeight: 500,
                  }}
                >
                  <FiTag size={12} style={{ color: "#00e5ff" }} />
                  <span>Keywords &amp; Stack</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {paper.tags.map((tag, i) => (
                    <span key={i} className="research-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Research;
