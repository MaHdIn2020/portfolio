// src/components/Hero.jsx
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import { HiArrowDown } from "react-icons/hi";
import { HiArrowDownTray } from "react-icons/hi2";
import { Link as ScrollLink } from "react-scroll";
import FloatingGraphics from "./FloatingGraphics";
import TypeWriter from "./TypeWriter";
import { profile } from "../data/profile";

const Hero = () => {
  return (
    <section
      id="home"
      className="hero-bg grid-bg"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: "80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated background elements */}
      <FloatingGraphics />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", width: "100%", position: "relative", zIndex: 1 }}>
        {/* ── SPLIT LAYOUT ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "64px",
            alignItems: "center",
            minHeight: "70vh",
          }}
          className="hero-grid"
        >
          {/* LEFT: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "rgba(0,229,255,0.08)",
                border: "1px solid rgba(0,229,255,0.25)",
                borderRadius: "100px", padding: "6px 16px", width: "fit-content",
              }}
            >
              <motion.span
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                transition={{ repeat: Infinity, duration: 1.8 }}
                style={{ width: "8px", height: "8px", background: "#00e5ff", borderRadius: "50%", flexShrink: 0 }}
              />
              <span style={{ color: "#00e5ff", fontSize: "0.8rem", fontWeight: 500 }}>
                Available for opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2.8rem, 5vw, 4rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                color: "#ffffff",
              }}
            >
              Tanjip Surait
              <br />
              <span className="gradient-text">Mahdin</span>
            </motion.h1>

            {/* TypeWriter cycling roles */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              style={{ fontSize: "1.15rem", fontFamily: "'Space Grotesk', sans-serif", minHeight: "1.8rem" }}
            >
              <TypeWriter words={profile.roles} speed={75} pause={2000} deleteSpeed={40} />
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              style={{ color: "#94a3b8", fontSize: "1rem", lineHeight: 1.7, maxWidth: "440px" }}
            >
              Final-year CSE student at BRAC University. Building web apps, training ML models,
              and teaching coding at Codingal.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}
            >
              <ScrollLink to="projects" smooth duration={600} offset={-70}>
                <motion.span
                  className="btn-primary"
                  style={{ cursor: "pointer" }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  View My Work
                </motion.span>
              </ScrollLink>
              <motion.a
                href={profile.links.resume}
                download
                className="btn-outline"
                style={{
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  textDecoration: "none",
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <HiArrowDownTray size={16} />
                Download Resume
                {/* TODO(Tanjip): replace public/resume.pdf with your real CV file */}
              </motion.a>
            </motion.div>

            {/* Social icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              style={{ display: "flex", gap: "14px", alignItems: "center", paddingTop: "4px" }}
            >
              {[
                { icon: <FaGithub />, href: profile.links.github, label: "GitHub" },
                { icon: <FaLinkedin />, href: profile.links.linkedin, label: "LinkedIn" },
                { icon: <FaFacebook />, href: profile.links.facebook, label: "Facebook" },
              ].map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  whileHover={{ y: -4, scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    width: "38px", height: "38px",
                    borderRadius: "10px",
                    background: "rgba(0,229,255,0.06)",
                    border: "1px solid rgba(0,229,255,0.15)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#94a3b8", fontSize: "1.1rem", textDecoration: "none",
                    transition: "color 0.3s, border-color 0.3s, background 0.3s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = "#00e5ff";
                    e.currentTarget.style.borderColor = "rgba(0,229,255,0.4)";
                    e.currentTarget.style.background = "rgba(0,229,255,0.1)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = "#94a3b8";
                    e.currentTarget.style.borderColor = "rgba(0,229,255,0.15)";
                    e.currentTarget.style.background = "rgba(0,229,255,0.06)";
                  }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT: Photo */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}
          >
            {/* Photo with bracket frame */}
            <motion.div
              className="bracket-frame"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              style={{ position: "relative", zIndex: 1, display: "inline-block" }}
            >
              <img
                src="/Picture.jpg"
                alt="Tanjip Surait Mahdin — Final-year CSE student at BRAC University"
                style={{
                  width: "clamp(240px, 30vw, 340px)",
                  height: "clamp(260px, 33vw, 380px)",
                  objectFit: "cover",
                  objectPosition: "top",
                  borderRadius: "12px",
                  display: "block",
                  border: "1px solid rgba(0,229,255,0.25)",
                }}
              />
              {/* Extra bracket corners */}
              <div style={{ position: "absolute", top: "-8px", right: "-8px", width: "28px", height: "28px", borderTop: "3px solid #00e5ff", borderRight: "3px solid #00e5ff", borderRadius: "0 4px 0 0" }} />
              <div style={{ position: "absolute", bottom: "-8px", left: "-8px", width: "28px", height: "28px", borderBottom: "3px solid #00e5ff", borderLeft: "3px solid #00e5ff", borderRadius: "0 0 0 4px" }} />
            </motion.div>

            {/* Floating mini cards around photo */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0, y: [0, -6, 0] }}
              transition={{ delay: 1.2, duration: 0.5, y: { repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.5 } }}
              style={{
                position: "absolute", right: "-30px", top: "15%",
                background: "#111827", border: "1px solid rgba(0,229,255,0.25)",
                borderRadius: "12px", padding: "10px 14px",
                display: "flex", alignItems: "center", gap: "8px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                zIndex: 10,
              }}
            >
              <span style={{ fontSize: "1.2rem" }}>🎓</span>
              <div>
                <p style={{ color: "#ffffff", fontSize: "0.72rem", fontWeight: 700, lineHeight: 1.2 }}>BRAC University</p>
                <p style={{ color: "#00e5ff", fontSize: "0.62rem" }}>CSE, CGPA {profile.education.cgpa}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0, y: [0, 6, 0] }}
              transition={{ delay: 1.4, duration: 0.5, y: { repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 1 } }}
              style={{
                position: "absolute", left: "-30px", bottom: "20%",
                background: "#111827", border: "1px solid rgba(0,229,255,0.25)",
                borderRadius: "12px", padding: "10px 14px",
                display: "flex", alignItems: "center", gap: "8px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                zIndex: 10,
              }}
            >
              <img src="/codingal.png" alt="Codingal" style={{ width: "22px", height: "22px", objectFit: "contain", borderRadius: "4px", background: "#fff", padding: "2px" }} />
              <div>
                <p style={{ color: "#ffffff", fontSize: "0.72rem", fontWeight: 700, lineHeight: 1.2 }}>Codingal</p>
                <p style={{ color: "#00e5ff", fontSize: "0.62rem" }}>Instructor · {profile.studentsTaught} students</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ── STATS ROW ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.7 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1px",
            background: "rgba(0,229,255,0.08)",
            borderRadius: "16px",
            overflow: "hidden",
            marginBottom: "40px",
            border: "1px solid rgba(0,229,255,0.1)",
          }}
          className="stats-row"
        >
          {profile.stats.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ background: "rgba(0,229,255,0.06)" }}
              style={{
                padding: "20px",
                textAlign: "center",
                background: "#0d1117",
                transition: "background 0.3s",
              }}
            >
              <p style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 800,
                fontSize: "1.6rem",
                color: "#00e5ff",
                lineHeight: 1,
                marginBottom: "6px",
              }}>
                {s.value}
              </p>
              <p style={{ color: "#94a3b8", fontSize: "0.75rem", fontWeight: 500 }}>{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        style={{ position: "absolute", bottom: "24px", left: "50%", transform: "translateX(-50%)", color: "#94a3b8", fontSize: "1.3rem", zIndex: 2 }}
      >
        <HiArrowDown />
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; text-align: center; }
          .hero-grid > div:last-child { display: none !important; }
          .stats-row { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
