// src/pages/Work.jsx
// Work — featured-project showcase: large featured card + list, no pinned horizontal scroll.
// Filter chips preserved. Featured rotates through the filtered set.
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { FiExternalLink, FiGithub, FiX, FiFileText, FiArrowRight } from "react-icons/fi";

const projects = [
  { id: 1, name: "Yahoo Answers Topic Classification", category: "ML", tags: "NLP · Deep Learning", shortDesc: "10-class NLP classification comparing classical ML vs. deep learning on the Yahoo Answers dataset.", description: "Multi-class text classification on the Yahoo Answers dataset (10 classes). Compares classical ML (Naive Bayes, Logistic Regression, SVM, Random Forest, tuned with GridSearchCV) against neural networks (DNN on TF-IDF + Truncated SVD; DNN, RNN, GRU, LSTM, and bidirectional variants on Skip-gram Word2Vec, tuned with KerasTuner). Finding: deep models outperform classical; Bidirectional LSTM achieves the best macro F1.", challenges: "Balancing fair comparison between TF-IDF and Word2Vec feature spaces required separate tuning pipelines; KerasTuner trials for bidirectional models were compute-intensive and needed careful early stopping.", technologies: ["Python", "scikit-learn", "TensorFlow/Keras", "KerasTuner", "Gensim", "NLP"], githubLink: "https://github.com/MaHdIn2020/Yahoo-Answers-Topic-Classification", reportLink: "https://github.com/MaHdIn2020/Yahoo-Answers-Topic-Classification/raw/main/report/Yahoo_Answers_Text_Classification_Report.pdf", year: "2025" },
  { id: 2, name: "Heart Failure Prediction", category: "ML", tags: "Streamlit · Clinical ML", shortDesc: "Binary heart-disease classifier deployed as a Streamlit app with a risk gauge and charts.", description: "Binary classifier on the Kaggle Heart Failure Prediction dataset (918 rows, 12 features). Compared five models: Logistic Regression, SVM, KNN, Naive Bayes, Decision Tree. Best result: Logistic Regression with 86.41% accuracy and 87.92% F1. Deployed as an interactive Streamlit app with a sidebar for patient inputs, a risk gauge, and charts.", challenges: "172 zero-values in Cholesterol and RestingBP required imputation; ensuring the exported model matched the preprocessing pipeline required careful joblib serialisation.", technologies: ["Python", "scikit-learn", "Streamlit", "Plotly", "joblib"], githubLink: "https://github.com/MaHdIn2020/Heart-Failure-Prediction", liveLink: "https://heart-failure-prediction0.streamlit.app/", year: "2025" },
  { id: 3, name: "Diabetes Prediction System", category: "ML", tags: "Streamlit · XGBoost", shortDesc: "Streamlit app for diabetes risk from clinical inputs. Compares nine classifiers including XGBoost.", description: "Interactive Streamlit application for diabetes risk prediction from clinical diagnostic inputs. Preprocessing cleans erroneous zero values via targeted imputation, caps insulin outliers via IQR, and standardises features before training across nine algorithms including XGBoost with GridSearch tuning.", challenges: "Addressing high feature skewness and zero-value measurements in clinical indicators without discarding records, alongside probability threshold calibration.", technologies: ["Python", "scikit-learn", "XGBoost", "Streamlit"], githubLink: "https://github.com/MaHdIn2020/Diabetes-Prediction-System", year: "2025" },
  { id: 4, name: "Predicting Career Changes", category: "ML", tags: "EDA · Imbalance handling", shortDesc: "ML approach to employee retention — predicts career change from 13 variables.", description: "Predicts employee turnover probability using 13 demographic and occupational variables. Incorporates comprehensive EDA, target-preserving missing value handling, ordinal and one-hot encoding, and feature importance analysis to identify primary drivers behind career transitions.", challenges: "Severe class imbalance and preventing target leakage across high-cardinality geographic features during cross-validation.", technologies: ["Python", "Pandas", "NumPy", "Seaborn", "scikit-learn"], githubLink: "https://github.com/MaHdIn2020/-Predicting-Career-Changes-A-Machine-Learning-Approach-to-Employee-Retention", year: "2024" },
  { id: 5, name: "BRAC Research Connect", category: "Web", tags: "MERN · Role-based dashboards", shortDesc: "Full-stack thesis workflow platform for BRAC University — team project.", description: "Full-stack thesis management system for BRAC University featuring dedicated, role-based dashboards for Students, Supervisors, and Admins. Core modules include thesis proposal submission, lifecycle status tracking, supervisor feedback and evaluation, meeting scheduling, and arXiv research paper discovery.", challenges: "Coordinating auth tokens, granular authorization levels, and real-time state sync between student submissions and faculty review workflows.", technologies: ["React", "Tailwind CSS", "Firebase", "Node.js", "Express.js", "MongoDB", "Vercel"], githubLink: "https://github.com/MaHdIn2020/BRAC-Research-Connect", year: "2025" },
  { id: 6, name: "Match Finder", category: "Web", tags: "React · Firebase", shortDesc: "Matrimonial platform with preference-based profile matching and advanced filters.", description: "A matrimonial web platform designed for preference-based profile discovery and matchmaking. Features dynamic search filtering by multiple demographic criteria, authenticated profile management, and interactive animations.", challenges: "Complex client-side multi-attribute filtering while preserving smooth transitions and 60fps card interactions.", technologies: ["React", "Tailwind CSS", "Framer Motion", "Firebase"], githubLink: "https://github.com/MaHdIn2020/MatchFinder", liveLink: "https://match-finder-2c918.web.app/", year: "2024" },
  { id: 7, name: "HobbyHive", category: "Web", tags: "MERN · Group buying", shortDesc: "Group buying platform for hobby enthusiasts with community reviews and orders.", description: "A community-oriented group purchasing platform connecting hobby enthusiasts. Allows buyers to pool collective order quantities to unlock bulk discounts, participate in product discussions, and publish verified community reviews.", challenges: "Maintaining atomic order updates and group pool thresholds as multiple participants join or withdraw simultaneously.", technologies: ["React.js", "Node.js", "MongoDB", "Express.js"], githubLink: "https://github.com/MaHdIn2020/hobbyhive", liveLink: "https://hobbyhive-d81af.web.app/", year: "2024" },
  { id: 8, name: "Review Hub", category: "Web", tags: "MERN · Ratings feed", shortDesc: "Product review platform with user auth, ratings, and a discovery feed.", description: "A responsive, full-stack product review application with rating submission, verified buyer badges, categorized search, and an algorithmic discovery feed for top-rated consumer goods.", challenges: "Optimizing aggregated star rating calculations and pagination queries in MongoDB for instant feed load times.", technologies: ["React.js", "Node.js", "MongoDB", "Express.js"], githubLink: "https://github.com/MaHdIn2020/Review-Hub", liveLink: "https://review-hub-641bc.web.app/", year: "2024" },
  { id: 9, name: "3D Space Shooter", category: "Game", tags: "PyOpenGL · GLUT", shortDesc: "3D space combat game in Python + PyOpenGL/GLUT — CSE423 course project.", description: "3D space combat simulator in Python with PyOpenGL and GLUT. Features 4 progressive difficulty stages, 3 enemy vessel classes, an animated final boss, power-up systems, combo score multipliers, and dynamic perspective switching between third-person and cockpit cameras.", challenges: "Real-time 3D projectile collision detection and HUD radar projection while synchronizing frame-rate updates with GLUT rendering loops.", technologies: ["Python", "PyOpenGL", "GLUT"], githubLink: "https://github.com/MaHdIn2020/3D-Space-Shooter_CSE423", year: "2024" },
];

const CATEGORIES = ["All", "ML", "Web", "Game"];

export default function Work() {
  const [category, setCategory] = useState("All");
  const [featuredId, setFeaturedId] = useState(1);
  const [selected, setSelected] = useState(null);
  const visible = category === "All" ? projects : projects.filter((p) => p.category === category);
  const featured = visible.find((p) => p.id === featuredId) || visible[0];

  // Parallax on featured panel
  const { scrollYProgress } = useScroll();
  const featY = useTransform(scrollYProgress, [0, 1], [0, -18]);

  useEffect(() => {
    if (featured) setFeaturedId(featured.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const others = visible.filter((p) => p.id !== featured?.id);

  return (
    <section id="work" aria-label="Things I've built" style={{ overflow: "hidden", padding: "90px 0 8px" }}>
      <div style={{ padding: "0 var(--gutter)" }}>
        <div className="kicker" data-reveal>
          <span>THINGS I'VE BUILT</span>
          <span className="k-right">ML · WEB · GAMES</span>
        </div>

        <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.75 }} className="display-title" style={{ fontSize: "clamp(56px, 8vw, 108px)", margin: "36px 0 12px" }}>
          Built, <span style={{ color: "var(--accent)" }}>tested, shipped.</span>
        </motion.h2>
        <p style={{ color: "var(--muted)", fontSize: 14, maxWidth: 460, marginBottom: 36 }}>
          One build in the spotlight, the rest in a clean catalogue. Filter to narrow it down.
        </p>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setCategory(cat)} aria-pressed={category === cat} style={{ padding: "8px 16px", borderRadius: 999, border: category === cat ? "1px solid var(--accent)" : "1px solid var(--line)", background: category === cat ? "rgba(0,229,255,0.1)" : "transparent", color: category === cat ? "var(--accent)" : "var(--muted)", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer" }}>
              {cat}{cat !== "All" && <sup style={{ marginLeft: 6, fontSize: 9 }}>{projects.filter((p) => p.category === cat).length}</sup>}
            </button>
          ))}
          <span className="index-num" style={{ marginLeft: "auto", alignSelf: "center" }}>SHOWING {visible.length} OF {projects.length}</span>
        </div>
      </div>

      {/* Featured + catalogue */}
      <div style={{ padding: "0 var(--gutter)", display: "grid", gridTemplateColumns: "minmax(0, 1.35fr) minmax(0, 1fr)", gap: "clamp(20px,3vw,36px)", alignItems: "start" }} className="work-grid">
        {/* Featured */}
        <AnimatePresence mode="wait">
          {featured && (
            <motion.article
              key={featured.id}
              initial={{ opacity: 0, y: 28, clipPath: "inset(0 0 6% 0)" }}
              animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.55, ease: [0.22, 0.8, 0.3, 1] }}
              onClick={() => setSelected(featured)}
              style={{ position: "sticky", top: 104, border: "1px solid rgba(0,229,255,0.35)", background: "linear-gradient(150deg, rgba(0,229,255,0.09), rgba(255,255,255,0.02) 55%)", padding: "clamp(22px,3vw,40px)", minHeight: 520, display: "flex", flexDirection: "column", cursor: "pointer", overflow: "hidden" }}
            >
              <motion.div style={{ y: featY, position: "absolute", inset: 0, background: "radial-gradient(ellipse at 18% 0%, rgba(0,229,255,0.14), transparent 55%)", pointerEvents: "none" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative" }}>
                <span className="index-num">FEATURED PROJECT</span>
                <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--muted)" }}>{featured.year}</span>
              </div>
              <span style={{ marginTop: 42, fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", position: "relative" }}>{featured.category} · {featured.tags}</span>
              <h3 className="display-title" style={{ fontSize: "clamp(38px, 4.6vw, 64px)", margin: "16px 0 16px", lineHeight: 0.96, position: "relative" }}>{featured.name}</h3>
              <p style={{ color: "rgba(216,231,238,0.78)", fontSize: 15, lineHeight: 1.7, maxWidth: 560, position: "relative" }}>{featured.shortDesc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 20, position: "relative" }}>
                {featured.technologies.map((t) => <span key={t} style={{ fontFamily: "var(--mono)", fontSize: 10, border: "1px solid rgba(255,255,255,0.14)", padding: "5px 9px", color: "var(--muted)" }}>{t}</span>)}
              </div>
              <div style={{ display: "flex", gap: 20, borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: 20, marginTop: "auto", position: "relative" }}>
                {featured.liveLink && <a href={featured.liveLink} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} style={{ fontSize: 14, fontWeight: 700 }}>Live Site <span style={{ color: "var(--accent)" }}>↗</span></a>}
                <a href={featured.githubLink} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} style={{ fontSize: 14, fontWeight: 700 }}>GitHub <span style={{ color: "var(--accent)" }}>↗</span></a>
                <span style={{ marginLeft: "auto", fontFamily: "var(--mono)", fontSize: 11, color: "var(--muted)", letterSpacing: "0.1em" }}>CLICK FOR DETAILS →</span>
              </div>
            </motion.article>
          )}
        </AnimatePresence>

        {/* Catalogue */}
        <div style={{ display: "flex", flexDirection: "column", borderTop: "1px solid var(--line)" }}>
          <AnimatePresence mode="popLayout" initial={false}>
            {others.map((p, idx) => (
              <motion.button
                key={p.id}
                layout
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                onClick={() => { setFeaturedId(p.id); }}
                whileHover={{ background: "rgba(0,229,255,0.045)", x: 6 }}
                style={{
                  display: "grid", gridTemplateColumns: "auto minmax(0,1fr) auto", gap: 16, alignItems: "center",
                  padding: "20px 14px", borderBottom: "1px solid var(--line)", textAlign: "left", background: "none", cursor: "pointer", color: "#fff",
                }}
                aria-label={`Feature ${p.name}`}
              >
                <span className="index-num" style={{ fontSize: 12 }}><strong>{p.category}</strong></span>
                <span>
                  <span className="display-title" style={{ display: "block", fontSize: 20, lineHeight: 1.1 }}>{p.name}</span>
                  <span style={{ display: "block", color: "var(--muted)", fontSize: 12, marginTop: 5, lineHeight: 1.55 }}>{p.shortDesc}</span>
                  <span style={{ display: "block", fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.1em", color: "var(--accent)", marginTop: 8, textTransform: "uppercase" }}>{p.category} · {p.tags}</span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--muted)" }}>{p.year}</span>
                  <span
                    role="button" tabIndex={0}
                    aria-label={`Open details for ${p.name}`}
                    onClick={(e) => { e.stopPropagation(); setSelected(p); }}
                    onKeyDown={(e) => { if (e.key === "Enter") { e.stopPropagation(); setSelected(p); } }}
                    style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, color: "var(--accent)" }}
                  >
                    Open <FiArrowRight size={13} />
                  </span>
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
          {others.length === 0 && (
            <p style={{ padding: "32px 14px", color: "var(--muted)", fontSize: 14 }}>Nothing else in this filter — pick another category.</p>
          )}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(4,4,8,0.82)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} role="dialog" aria-modal="true" aria-label={selected.name}>
            <motion.div initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12 }} onClick={(e) => e.stopPropagation()} style={{ width: "min(720px, 100%)", maxHeight: "86vh", overflow: "auto", background: "#0d1117", border: "1px solid rgba(0,229,255,0.3)", padding: "clamp(24px,4vw,44px)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                <span className="index-num">{selected.category}</span>
                <button onClick={() => setSelected(null)} aria-label="Close" style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid var(--line)", display: "grid", placeItems: "center", background: "none", color: "#fff", cursor: "pointer" }}><FiX /></button>
              </div>
              <h3 className="display-title" style={{ fontSize: "clamp(32px,4vw,52px)", margin: "18px 0 12px" }}>{selected.name}</h3>
              <p style={{ color: "#b9c1cc", lineHeight: 1.75 }}>{selected.description}</p>
              <p style={{ color: "var(--muted)", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em", marginTop: 24, textTransform: "uppercase" }}>CHALLENGE</p>
              <p style={{ color: "#cbd5e1", lineHeight: 1.7, marginTop: 8 }}>{selected.challenges}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 22 }}>
                {selected.technologies.map((t) => <span key={t} className="skill-badge" style={{ fontSize: 12 }}>{t}</span>)}
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 28 }}>
                {selected.liveLink && <a href={selected.liveLink} target="_blank" rel="noreferrer" className="btn-primary"><FiExternalLink size={14} /> Live Demo</a>}
                <a href={selected.githubLink} target="_blank" rel="noreferrer" className="btn-outline"><FiGithub size={14} /> GitHub</a>
                {selected.reportLink && <a href={selected.reportLink} target="_blank" rel="noreferrer" className="btn-outline"><FiFileText size={14} /> Report</a>}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .work-grid { grid-template-columns: 1fr !important; }
          .work-grid > article { position: static !important; min-height: 0 !important; }
        }
      `}</style>
    </section>
  );
}
