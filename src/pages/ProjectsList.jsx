// src/pages/ProjectsList.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiExternalLink, FiGithub, FiX, FiLayers, FiFileText } from "react-icons/fi";

// ── PROJECT DATA ──────────────────────────────────────────────────────────────
// Order: ML projects → Web projects → Game
const projects = [
  // ── ML ────────────────────────────────────────────────────────────────────
  {
    id: 1,
    name: "Yahoo Answers Topic Classification",
    category: "ML",
    shortDesc:
      "10-class NLP classification comparing classical ML vs. deep learning on the Yahoo Answers dataset.",
    description:
      "Multi-class text classification on the Yahoo Answers dataset (question title + content + best answer, 10 classes). Compares classical ML (Naive Bayes, Logistic Regression, SVM, Random Forest, tuned with GridSearchCV) against neural networks (DNN on TF-IDF + Truncated SVD; DNN, RNN, GRU, LSTM, and bidirectional variants on Skip-gram Word2Vec, tuned with KerasTuner). Preprocessing: lowercase, HTML strip, tokenize, stopword removal, lemmatize. Metrics: accuracy and macro F1. Finding: deep models outperform classical; Bidirectional LSTM achieves the best macro F1.",
    challenges:
      "Balancing fair comparison between TF-IDF and Word2Vec feature spaces required separate tuning pipelines; KerasTuner trials for the bidirectional models were compute-intensive and needed careful early stopping.",
    technologies: ["Python", "scikit-learn", "TensorFlow/Keras", "KerasTuner", "Gensim", "NLP"],
    githubLink: "https://github.com/MaHdIn2020/Yahoo-Answers-Topic-Classification",
    reportLink:
      "https://github.com/MaHdIn2020/Yahoo-Answers-Topic-Classification/raw/main/Yahoo_Answers_Topic_Classification_Report.pdf",
  },
  {
    id: 2,
    name: "Heart Failure Prediction",
    category: "ML",
    shortDesc:
      "Binary heart-disease classifier deployed as a Streamlit app. Notebook built with AI assistance.",
    description:
      "Binary classifier on the Kaggle Heart Failure Prediction dataset (918 rows, 12 features). Compared five models: Logistic Regression, SVM, KNN, Naive Bayes, Decision Tree. Best result: Logistic Regression with 86.41% accuracy and 87.92% F1. The ML notebook was built with AI-assisted code generation, then deployed as an interactive Streamlit app with a sidebar for patient inputs, a risk gauge, and charts.",
    challenges:
      "172 zero-values in Cholesterol and some in RestingBP required imputation before any model training; ensuring the exported model matched the preprocessing pipeline used in the app required careful serialisation with joblib.",
    technologies: ["Python", "scikit-learn", "Streamlit", "Plotly", "joblib"],
    githubLink: "https://github.com/MaHdIn2020/Heart-Failure-Prediction",
    liveLink: "https://heart-failure-prediction0.streamlit.app/",
  },
  {
    id: 3,
    name: "Diabetes Prediction System",
    category: "ML",
    shortDesc:
      "Streamlit app for diabetes risk from clinical inputs. Compares nine classifiers including XGBoost.",
    description:
      "Interactive Streamlit application for diabetes risk prediction from clinical diagnostic inputs (glucose, blood pressure, insulin levels, BMI, age, and pregnancy history). The preprocessing pipeline cleans erroneous zero values in physiological indicators using targeted median and mean imputation, mitigates extreme insulin outliers via IQR capping, and standardises features before model training across nine candidate algorithms: Logistic Regression, Naive Bayes, Decision Tree, SVM, KNN, Random Forest, AdaBoost, Gradient Boosting, and XGBoost with GridSearch hyperparameter tuning.",
    challenges:
      "Addressing high feature skewness and zero-value measurements in clinical indicators like Insulin and SkinThickness without discarding valuable patient records, alongside calibrating prediction probability thresholds.",
    technologies: ["Python", "scikit-learn", "XGBoost", "Streamlit"],
    githubLink: "https://github.com/MaHdIn2020/Diabetes-Prediction-System",
  },
  {
    id: 4,
    name: "Predicting Career Changes",
    category: "ML",
    shortDesc:
      "ML approach to employee retention — predicts whether an employee will change career from 13 variables.",
    description:
      "Predicts employee turnover probability using 13 demographic and occupational variables (city development index, gender, education level, relevant experience, company size/type, and training hours). Incorporates comprehensive exploratory data analysis, target-preserving missing value handling, ordinal and one-hot encoding, and feature importance analysis to identify the primary drivers behind career transitions.",
    challenges:
      "Addressing severe class imbalance between staying and job-seeking candidates, alongside preventing target leakage across high-cardinality geographic features during cross-validation.",
    technologies: ["Python", "Pandas", "NumPy", "Seaborn", "scikit-learn"],
    githubLink:
      "https://github.com/MaHdIn2020/-Predicting-Career-Changes-A-Machine-Learning-Approach-to-Employee-Retention",
  },

  // ── WEB ────────────────────────────────────────────────────────────────────
  {
    id: 5,
    name: "BRAC Research Connect",
    category: "Web",
    shortDesc:
      "Full-stack thesis workflow platform for BRAC University — team project.",
    description:
      "Full-stack thesis management system for BRAC University featuring dedicated, role-based dashboards for Students, Supervisors, and Admins. Core modules include thesis proposal submission, lifecycle status tracking, supervisor feedback and evaluation, meeting scheduling, and arXiv research paper discovery.",
    challenges:
      "Coordinating authentication tokens, granular authorization levels, and real-time state synchronization between student submissions and faculty review workflows.",
    technologies: ["React", "Tailwind CSS", "Firebase", "Node.js", "Express.js", "MongoDB", "Vercel"],
    githubLink: "https://github.com/MaHdIn2020/BRAC-Research-Connect",
    extraLinks: [
      { label: "Client repo", href: "https://github.com/IFTI-KAR/BRACU-Research-Thesis-client" },
      { label: "Server repo", href: "https://github.com/IFTI-KAR/BRACU-Research-server" },
    ],
  },
  {
    id: 6,
    name: "Match Finder",
    category: "Web",
    shortDesc:
      "Matrimonial platform with preference-based profile matching and advanced filters.",
    description:
      "A matrimonial web platform designed for preference-based profile discovery and user matchmaking. Features dynamic search filtering by multiple demographic criteria, authenticated profile management, and interactive animations.",
    challenges:
      "Managing complex client-side multi-attribute filtering (age ranges, location, career, and lifestyle preferences) while preserving smooth transitions and 60fps card interactions.",
    technologies: ["React", "Tailwind CSS", "Framer Motion", "Firebase"],
    githubLink: "https://github.com/MaHdIn2020/MatchFinder",
    liveLink: "https://match-finder-2c918.web.app/",
  },
  {
    id: 7,
    name: "HobbyHive",
    category: "Web",
    shortDesc:
      "Group buying platform for hobby enthusiasts with community reviews and orders.",
    description:
      "A community-oriented group purchasing platform connecting hobby enthusiasts. Allows buyers to pool collective order quantities to unlock bulk discounts, participate in product discussions, and publish verified community reviews.",
    challenges:
      "Maintaining atomic order updates and group pool thresholds as multiple participants join or withdraw from active group buys simultaneously.",
    technologies: ["React.js", "Node.js", "MongoDB", "Express.js"],
    githubLink: "https://github.com/MaHdIn2020/hobbyhive",
    liveLink: "https://hobbyhive-d81af.web.app/",
  },
  {
    id: 8,
    name: "Review Hub",
    category: "Web",
    shortDesc:
      "Product review platform with user authentication, ratings, and a discovery feed.",
    description:
      "A responsive, full-stack product review application providing authenticated users with rating submission, verified buyer badge indicators, categorized search, and an algorithmic discovery feed for top-rated consumer goods.",
    challenges:
      "Optimizing aggregated star rating calculations and pagination queries in MongoDB to keep product feed load times instantaneous under frequent new reviews.",
    technologies: ["React.js", "Node.js", "MongoDB", "Express.js"],
    githubLink: "https://github.com/MaHdIn2020/Review-Hub",
    liveLink: "https://review-hub-641bc.web.app/",
  },

  // ── GAME ──────────────────────────────────────────────────────────────────
  {
    id: 9,
    name: "3D Space Shooter",
    category: "Game",
    shortDesc:
      "3D space combat game in Python + PyOpenGL/GLUT — CSE423 course project.",
    description:
      "3D space combat simulator developed in Python utilizing PyOpenGL and GLUT. Features 4 progressive difficulty stages, 3 enemy vessel classes, an animated final boss encounter, power-up systems (energy shields and tracking missiles), combo score multipliers, and dynamic perspective switching between third-person and cockpit cameras.",
    challenges:
      "Implementing real-time 3D projectile collision detection and HUD radar projection while synchronizing frame-rate updates with GLUT rendering loops.",
    technologies: ["Python", "PyOpenGL", "GLUT"],
    githubLink: "https://github.com/MaHdIn2020/3D-Space-Shooter_CSE423",
  },
];

const CATEGORIES = ["All", "ML", "Web", "Game"];

const categoryColors = {
  ML: { bg: "rgba(168,85,247,0.12)", border: "rgba(168,85,247,0.35)", text: "#c084fc" },
  Web: { bg: "rgba(0,229,255,0.10)", border: "rgba(0,229,255,0.30)", text: "#00e5ff" },
  Game: { bg: "rgba(251,146,60,0.12)", border: "rgba(251,146,60,0.35)", text: "#fb923c" },
};

function CategoryBadge({ category }) {
  const c = categoryColors[category] || {};
  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 12px",
        borderRadius: "100px",
        fontSize: "0.7rem",
        fontWeight: 700,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        background: c.bg,
        border: `1px solid ${c.border}`,
        color: c.text,
      }}
    >
      {category}
    </span>
  );
}

const ProjectsList = () => {
  const [selected, setSelected] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const visible =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" aria-label="Projects" style={{ background: "#0d1117", padding: "100px 24px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "40px" }}
        >
          <p style={{ color: "#00e5ff", fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>
            What I&apos;ve built
          </p>
          <h2 className="section-heading cyan-underline" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#ffffff" }}>
            My Projects
          </h2>
        </motion.div>

        {/* Category filter chips */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "40px" }}>
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: "8px 20px",
                borderRadius: "100px",
                border: activeCategory === cat
                  ? "1px solid rgba(0,229,255,0.6)"
                  : "1px solid rgba(255,255,255,0.1)",
                background: activeCategory === cat
                  ? "rgba(0,229,255,0.12)"
                  : "rgba(255,255,255,0.04)",
                color: activeCategory === cat ? "#00e5ff" : "#94a3b8",
                fontSize: "0.82rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.25s",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Project Grid */}
        <motion.div
          layout
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px" }}
        >
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35 }}
                className="bento-card"
                whileHover={{ y: -6 }}
                style={{ cursor: "pointer", overflow: "hidden", display: "flex", flexDirection: "column" }}
                onClick={() => setSelected(project)}
              >
                {/* Card content — no image */}
                <div style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "14px", flex: 1 }}>
                  {/* Category badge + title */}
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "10px" }}>
                    <h3 style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      fontSize: "1.1rem",
                      color: "#ffffff",
                      lineHeight: 1.35,
                      flex: 1,
                    }}>
                      {project.name}
                    </h3>
                    <CategoryBadge category={project.category} />
                  </div>

                  <p style={{ color: "#94a3b8", fontSize: "0.875rem", lineHeight: 1.65 }}>
                    {project.shortDesc}
                  </p>

                  {/* Tech chips */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "auto" }}>
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="skill-badge" style={{ fontSize: "0.7rem", padding: "3px 9px" }}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links row */}
                  <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Live demo of ${project.name}`}
                        onClick={(e) => e.stopPropagation()}
                        style={{ display: "flex", alignItems: "center", gap: "5px", color: "#00e5ff", fontSize: "0.8rem", fontWeight: 600, textDecoration: "none" }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                      >
                        <FiExternalLink size={13} /> Live
                      </a>
                    )}
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`GitHub repository for ${project.name}`}
                        onClick={(e) => e.stopPropagation()}
                        style={{ display: "flex", alignItems: "center", gap: "5px", color: "#94a3b8", fontSize: "0.8rem", fontWeight: 600, textDecoration: "none" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
                      >
                        <FiGithub size={13} /> GitHub
                      </a>
                    )}
                    {project.reportLink && (
                      <a
                        href={project.reportLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`PDF report for ${project.name}`}
                        onClick={(e) => e.stopPropagation()}
                        style={{ display: "flex", alignItems: "center", gap: "5px", color: "#94a3b8", fontSize: "0.8rem", fontWeight: 600, textDecoration: "none" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
                      >
                        <FiFileText size={13} /> Report PDF
                      </a>
                    )}
                    <span style={{ marginLeft: "auto", color: "#00e5ff", fontSize: "0.75rem", fontWeight: 500, opacity: 0.6 }}>
                      Details →
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── MODAL ── */}
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
              onClick={(e) => e.stopPropagation()}
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
              {/* Modal header */}
              <div style={{ padding: "28px 32px 0", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px" }}>
                <div>
                  <CategoryBadge category={selected.category} />
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.5rem", color: "#ffffff", marginTop: "10px" }}>
                    {selected.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  aria-label="Close project details"
                  style={{
                    background: "rgba(10,10,18,0.8)", border: "1px solid rgba(0,229,255,0.3)",
                    borderRadius: "50%", width: "36px", height: "36px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#00e5ff", cursor: "pointer", fontSize: "1rem", flexShrink: 0,
                  }}
                >
                  <FiX />
                </button>
              </div>

              {/* Modal content */}
              <div style={{ padding: "24px 32px 32px" }}>
                {/* Tech chips */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px" }}>
                  {selected.technologies.map((t, i) => (
                    <span key={i} className="skill-badge" style={{ fontSize: "0.75rem" }}>{t}</span>
                  ))}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {/* Description */}
                  <div>
                    <p style={{ display: "flex", alignItems: "center", gap: "6px", color: "#00e5ff", fontSize: "0.78rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "8px" }}>
                      <FiLayers size={13} /> Description
                    </p>
                    <p style={{ color: "#94a3b8", lineHeight: 1.75, fontSize: "0.9rem" }}>{selected.description}</p>
                  </div>

                  {/* Challenges */}
                  <div>
                    <p style={{ display: "flex", alignItems: "center", gap: "6px", color: "#00e5ff", fontSize: "0.78rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "8px" }}>
                      Notes
                    </p>
                    <p style={{ color: "#94a3b8", lineHeight: 1.75, fontSize: "0.9rem" }}>{selected.challenges}</p>
                  </div>
                </div>

                {/* Links */}
                <div style={{ display: "flex", gap: "12px", marginTop: "28px", flexWrap: "wrap" }}>
                  {selected.liveLink && (
                    <a href={selected.liveLink} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: "0.85rem", padding: "10px 22px" }}>
                      Live Demo ↗
                    </a>
                  )}
                  {selected.githubLink && (
                    <a href={selected.githubLink} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ fontSize: "0.85rem", padding: "10px 22px", display: "flex", alignItems: "center", gap: "8px" }}>
                      <FiGithub /> GitHub
                    </a>
                  )}
                  {selected.reportLink && (
                    <a href={selected.reportLink} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ fontSize: "0.85rem", padding: "10px 22px", display: "flex", alignItems: "center", gap: "8px" }}>
                      <FiFileText /> Report PDF
                    </a>
                  )}
                  {selected.extraLinks && selected.extraLinks.map((el, i) => (
                    <a key={i} href={el.href} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ fontSize: "0.85rem", padding: "10px 22px", display: "flex", alignItems: "center", gap: "8px" }}>
                      <FiGithub /> {el.label}
                    </a>
                  ))}
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
