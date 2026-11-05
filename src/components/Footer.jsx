// src/components/Footer.jsx
// Footer — completely reworked: 2-col grid, icon buttons, no copy-rows, no "BUILT WITH INTENT".
import { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import { profile } from "../data/profile";

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(profile.links.email); setCopied(true); setTimeout(() => setCopied(false), 2200); } catch { /* noop */ }
  };

  const socials = [
    { icon: <FaGithub />, href: profile.links.github, label: "GitHub" },
    { icon: <FaLinkedin />, href: profile.links.linkedin, label: "LinkedIn" },
    { icon: <FaFacebook />, href: profile.links.facebook, label: "Facebook" },
  ];

  return (
    <footer style={{ borderTop: "1px solid var(--line)", padding: "56px var(--gutter) 0", background: "rgba(255,255,255,0.012)" }}>
      <motion.div
        initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 40, paddingBottom: 48 }}
      >
        {/* Brand */}
        <div>
          <p className="display-title" style={{ fontSize: "clamp(28px,3vw,40px)", margin: "0 0 8px", color: "#fff" }}>{profile.name}</p>
          <p style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.7, margin: 0, maxWidth: 340 }}>
            Full-stack developer &amp; ML engineer, based in Dhaka. Teaching the next builders at Codingal.
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
            {socials.map((s, i) => (
              <motion.a
                key={i}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                whileHover={{ y: -3, color: "var(--accent)", borderColor: "rgba(0,229,255,0.5)" }}
                style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", color: "#cbd5e1", fontSize: 16 }}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Say hi */}
        <div>
          <p className="index-num" style={{ marginBottom: 14 }}>SAY HI</p>
          <button
            onClick={copyEmail}
            style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", textAlign: "left", background: "rgba(0,229,255,0.06)", border: "1px solid rgba(0,229,255,0.25)", padding: "14px 16px", borderRadius: 12, cursor: "pointer", color: "#fff" }}
          >
            <span style={{ minWidth: 0, flex: 1 }}>
              <span style={{ display: "block", fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.14em", color: "var(--muted)" }}>COPY MY EMAIL</span>
              <span style={{ display: "block", fontSize: 14, fontWeight: 600, overflowWrap: "anywhere", marginTop: 4 }}>{copied ? "Copied — go paste it ✉" : profile.links.email}</span>
            </span>
            <span style={{ color: "var(--accent)", flexShrink: 0 }}>{copied ? "✓" : "⧉"}</span>
          </button>
          <a href={profile.links.resume} download style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 14, color: "var(--accent)", fontSize: 13, fontWeight: 600, borderBottom: "1px solid rgba(0,229,255,0.4)", paddingBottom: 4 }}>
            Grab my resume ↓
          </a>
          <p style={{ color: "var(--muted)", fontSize: 12, marginTop: 16, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 10px rgba(0,229,255,0.6)" }} />
            Dhaka · Open for new builds
          </p>
        </div>

        {/* Jump back */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <p className="index-num" style={{ marginBottom: 14 }}>JUMP BACK</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ fontFamily: "var(--display)", fontSize: "clamp(22px,2.4vw,30px)", fontWeight: 700, letterSpacing: "-0.02em", color: "#fff", background: "none", border: "none", padding: 0, cursor: "pointer", textAlign: "left", lineHeight: 1.2 }}
          >
            Back to the top <span style={{ color: "var(--accent)" }}>↑</span>
          </button>
          <p style={{ color: "var(--muted)", fontSize: 12, marginTop: 12 }}>Thanks for landing here.</p>
        </div>
      </motion.div>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 12, padding: "18px 0 22px", borderTop: "1px solid var(--line)", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.08em", color: "var(--muted)" }}>
        <span>© {new Date().getFullYear()} TANJIP SURAIT MAHDIN</span>
        <span style={{ color: "var(--accent)" }}>● MADE BY HAND, SHIPPED WITH CARE</span>
      </div>
    </footer>
  );
}
