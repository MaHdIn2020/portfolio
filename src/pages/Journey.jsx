// src/pages/Journey.jsx
// Experience + Education combined, editorial row style.
import { motion } from "framer-motion";
import { profile } from "../data/profile";
import DecryptedText from "../components/DecryptedText";

const education = [
  { degree: "Secondary School Certificate (SSC)", institution: "Monipur High School and College", year: "2019", result: "GPA 5.00 / 5.00" },
  { degree: "Higher Secondary Certificate (HSC)", institution: "Mirpur Cantonment High School and College", year: "2022", result: "GPA 5.00 / 5.00" },
  { degree: "B.Sc. in Computer Science & Engineering", institution: "BRAC University", year: "Expected graduation: September 2026", result: "CGPA 3.77 / 4.00", highlight: true },
];

export default function Journey() {
  return (
    <section id="experience" className="section" aria-label="Where I've been">
      <div className="kicker" data-reveal>
        <span>WHERE I&apos;VE BEEN</span>
        <span className="k-right">WORK &amp; SCHOOL</span>
      </div>

      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="display-title" style={{ fontSize: "clamp(44px, 6vw, 80px)", margin: "36px 0 48px" }}>
        Work <span style={{ color: "var(--muted)" }}>&amp;</span> <DecryptedText text="school" animateOn="both" encryptedClassName="decrypted-glyph" speed={40} sequential characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&*" />
      </motion.h2>

      {/* Current role */}
      <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 0.8fr)", gap: "clamp(20px,4vw,48px)", padding: "28px 0", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", alignItems: "start" }}>
        <div>
          <p className="index-num" style={{ marginBottom: 10 }}><strong>CURRENT</strong> · REMOTE</p>
          <h3 className="display-title" style={{ fontSize: "clamp(28px,3.4vw,44px)", margin: "0 0 8px" }}>Coding Instructor <span style={{ color: "var(--accent)" }}>— Codingal</span></h3>
          <p style={{ color: "var(--muted)", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em" }}>2026 — PRESENT · FULL-TIME</p>
          <p style={{ color: "#b9c1cc", lineHeight: 1.75, marginTop: 18, maxWidth: 640 }}>
            Teaching programming one-on-one and in small groups. I&apos;ve worked with 50+ students across different age groups and skill levels — designing lesson plans matched to each learner&apos;s pace and guiding small projects that build real confidence.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <img src="/codingal.png" alt="Codingal" style={{ width: 72, height: 72, objectFit: "contain", background: "#fff", padding: 10, borderRadius: 12, border: "1px solid var(--line)" }} />
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              "Taught 50+ students across individual and group sessions",
              "Covered Python, JavaScript, HTML/CSS, and introductory web development",
              "Designed lesson plans matched to each student's learning pace",
              "Guided students through building small projects to apply what they learned",
            ].map((h, i) => (
              <li key={i} style={{ display: "flex", gap: 10, color: "#cbd5e1", fontSize: 14, lineHeight: 1.65 }}>
                <span style={{ width: 6, height: 6, background: "var(--accent)", borderRadius: "50%", marginTop: 8, flexShrink: 0 }} />{h}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Education rows */}
      <div style={{ marginTop: 48 }}>
        <p className="index-num" style={{ marginBottom: 16 }}>EDUCATION</p>
        <div className="edu-rows">
          {education.map((edu, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }} style={{ display: "grid", gridTemplateColumns: "minmax(0,1.4fr) minmax(0,1fr) auto", gap: 18, padding: "20px 0", borderTop: "1px solid var(--line)", alignItems: "center", borderColor: edu.highlight ? "rgba(0,229,255,0.4)" : "var(--line)" }}>
              <div>
                <p style={{ fontFamily: "var(--display)", fontSize: 17, fontWeight: 700, margin: 0 }}>{edu.degree}</p>
                <p style={{ color: "var(--accent)", fontSize: 13, fontWeight: 600, marginTop: 4 }}>{edu.institution}</p>
              </div>
              <p style={{ color: "var(--muted)", fontSize: 13, fontFamily: "var(--mono)" }}>{edu.year}</p>
              <span style={{ fontFamily: "var(--mono)", fontSize: 12, fontWeight: 700, background: "rgba(0,229,255,0.08)", border: "1px solid rgba(0,229,255,0.2)", padding: "6px 12px", borderRadius: 8, color: "var(--accent)", whiteSpace: "nowrap" }}>{edu.result}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .edu-rows > div { grid-template-columns: 1fr !important; gap: 8px !important; }
        }
      `}</style>
    </section>
  );
}
