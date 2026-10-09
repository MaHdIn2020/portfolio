// src/pages/Education.jsx
import { motion } from "framer-motion";
import { FiAward } from "react-icons/fi";

const educationData = [
  {
    degree: "Secondary School Certificate (SSC)",
    institution: "Monipur High School and College",
    year: "2019",
    result: "GPA 5.00 / 5.00",
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Mirpur Cantonment High School and College",
    year: "2022",
    result: "GPA 5.00 / 5.00",
  },
  {
    degree: "B.Sc. in Computer Science & Engineering",
    institution: "BRAC University",
    year: "Graduated — October 2026",
    result: "CGPA 3.78 / 4.00",
    highlight: true,
  },
];

const Education = () => {
  return (
    <section id="education" style={{ background: "#0d1117", padding: "100px 24px" }}>
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
            Academic background
          </p>
          <h2 className="section-heading cyan-underline" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#ffffff" }}>
            Education
          </h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}
        >
          {educationData.map((edu, i) => (
            <motion.div
              key={i}
              className="bento-card"
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              whileHover={{ y: -6 }}
              style={{
                padding: "32px",
                borderColor: edu.highlight ? "rgba(0,229,255,0.35)" : undefined,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {edu.highlight && (
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0,
                  height: "3px",
                  background: "linear-gradient(90deg, #00e5ff, transparent)",
                }} />
              )}

              {/* Icon */}
              <div style={{
                width: "44px", height: "44px", borderRadius: "10px",
                background: edu.highlight ? "rgba(0,229,255,0.15)" : "rgba(0,229,255,0.08)",
                border: "1px solid rgba(0,229,255,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#00e5ff", marginBottom: "16px",
              }}>
                <FiAward size={20} />
              </div>

              <h3 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
                color: "#ffffff",
                lineHeight: 1.4,
                marginBottom: "10px",
              }}>
                {edu.degree}
              </h3>

              <p style={{ color: "#00e5ff", fontWeight: 600, fontSize: "0.88rem", marginBottom: "6px" }}>
                {edu.institution}
              </p>
              <p style={{ color: "#94a3b8", fontSize: "0.82rem", marginBottom: "12px" }}>{edu.year}</p>

              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "rgba(0,229,255,0.06)",
                border: "1px solid rgba(0,229,255,0.15)",
                borderRadius: "8px",
                padding: "6px 14px",
              }}>
                <span style={{ color: "#00e5ff", fontSize: "0.82rem", fontWeight: 700 }}>{edu.result}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
