// src/pages/Research.jsx
import { motion } from "framer-motion";
import { FiBookOpen, FiCheckCircle, FiClock, FiAward, FiTag, FiUser } from "react-icons/fi";

const researchPapers = [
  {
    id: 1,
    title: "Confidence-Governed Hybrid SLM-LLM Tutoring",
    author: "Tanjip Surait Mahdin",
    description:
      "I developed a hybrid physics tutoring system for NCTB Class 9–10 students using a fine-tuned Qwen2.5-1.5B model and hybrid RAG (FAISS + BM25). Confidence-based routing escalates low-confidence queries to a larger Tutor LLM via Groq API within an active learning loop. The pipeline is trained on 7,000+ Socratic QA pairs across 13 NCTB chapters.",
    statuses: [
      {
        label: "Extended Abstract Accepted",
        venue: "BRAC University Silver Jubilee Research Conference 2026",
        icon: FiCheckCircle,
        theme: "emerald",
      },
      {
        label: "Recommended for Exhibition",
        venue: "Phase 2 Panel Members, CSE Department, BRAC University",
        icon: FiAward,
        theme: "cyan",
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
      "I investigated region-wise flood risk prediction across Bangladesh using classical machine learning algorithms to assess geographic vulnerability. The framework implements leave-one-region-out (LORO) spatial cross-validation to rigorously benchmark cross-region generalization on unseen geographic zones. The study highlights robust predictive stability across diverse environmental and hydrological conditions.",
    statuses: [
      {
        label: "Under Review",
        venue: "Submitted to ECCE 2027 (International Conference on Electrical, Computer and Communication Engineering), hosted at CUET",
        icon: FiClock,
        theme: "amber",
      },
    ],
    tags: ["Classical ML", "LORO validation", "Python"],
    featured: false,
  },
];

const badgeStyles = {
  emerald: {
    badge: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
    dot: "bg-emerald-400",
    iconColor: "text-emerald-400",
  },
  cyan: {
    badge: "bg-cyan-500/10 border-cyan-500/30 text-cyan-300",
    dot: "bg-cyan-400",
    iconColor: "text-cyan-400",
  },
  amber: {
    badge: "bg-amber-500/10 border-amber-500/30 text-amber-300",
    dot: "bg-amber-400",
    iconColor: "text-amber-400",
  },
};

const Research = () => {
  return (
    <section
      id="research"
      aria-label="Academic Research and Publications"
      className="bg-[#0a0a12] py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-14"
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
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {researchPapers.map((paper) => (
            <motion.article
              key={paper.id}
              className="bento-card group flex flex-col justify-between p-7 md:p-8 relative overflow-hidden"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              whileHover={{ y: -6 }}
              style={{
                borderColor: paper.featured ? "rgba(0, 229, 255, 0.35)" : "rgba(30, 41, 59, 0.9)",
              }}
            >
              {/* Cyan top accent line for featured card */}
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
                {/* Header Meta: Research Icon & Author */}
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400">
                      <FiBookOpen size={18} />
                    </div>
                    <span className="text-xs font-mono font-medium tracking-wide text-cyan-400 uppercase">
                      Research Paper
                    </span>
                  </div>

                  {/* Author Line */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/70 border border-slate-700/60 text-slate-300 text-xs">
                    <FiUser className="text-cyan-400" size={13} />
                    <span className="font-medium">{paper.author}</span>
                  </div>
                </div>

                {/* Paper Title */}
                <h3
                  className="text-xl md:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-200 leading-snug mb-4"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {paper.title}
                </h3>

                {/* Status Badge Line */}
                <div className="flex flex-col gap-2.5 mb-5">
                  {paper.statuses.map((st, idx) => {
                    const style = badgeStyles[st.theme] || badgeStyles.cyan;
                    const IconComponent = st.icon;
                    return (
                      <div
                        key={idx}
                        className={`inline-flex flex-wrap items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium ${style.badge}`}
                      >
                        <span className="flex items-center gap-1.5 font-semibold shrink-0">
                          <IconComponent className={style.iconColor} size={14} />
                          {st.label}
                        </span>
                        <span className="text-slate-500 hidden sm:inline">•</span>
                        <span className="text-slate-300 text-[0.78rem] leading-tight">
                          {st.venue}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Description (2-3 sentences, <60 words, professional, concise, first-person-neutral) */}
                <p className="text-slate-300 text-sm md:text-[0.925rem] leading-relaxed mb-6 font-normal">
                  {paper.description}
                </p>
              </div>

              {/* Tech Stack Tags */}
              <div className="pt-4 border-t border-slate-800/80 mt-auto">
                <div className="flex items-center gap-2 mb-2.5 text-xs text-slate-400 font-medium">
                  <FiTag className="text-cyan-400" size={13} />
                  <span>Keywords &amp; Stack</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {paper.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="inline-block px-2.5 py-1 text-xs font-mono rounded-md bg-cyan-950/30 border border-cyan-500/20 text-cyan-300 hover:border-cyan-400/50 hover:bg-cyan-950/50 transition-colors"
                    >
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

