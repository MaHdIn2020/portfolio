// src/components/Footer.jsx
// Footer with copy-email, socials, availability note, back to top.
import { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import { profile } from "../data/profile";

export default function Footer() {
  const [copied, setCopied] = useState(null);
  const copy = async (kind, value) => {
    try { await navigator.clipboard.writeText(value); setCopied(kind); setTimeout(() => setCopied(null), 2200); } catch { /* noop */ }
  };

  const socials = [
    { label: "GitHub", href: profile.links.github, handle: "MaHdIn2020 ↗" },
    { label: "LinkedIn", href: profile.links.linkedin, handle: "tanjip-surait-mahdin ↗" },
    { label: "Facebook", href: profile.links.facebook, handle: "tanjip.mahdin ↗" },
  ];
  const icons = { GitHub: <FaGithub />, LinkedIn: <FaLinkedin />, Facebook: <FaFacebook /> };

  return (
    <footer style={{ borderTop: "1px solid var(--line)", padding: "28px var(--gutter) 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 36, paddingBottom: 56 }}>

        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p className="index-num" style={{ marginBottom: 12 }}>DIRECT CONTACT</p>
          <button onClick={() => copy("email", profile.links.email)} style={{ display: "block", textAlign: "left", padding: "10px 0", borderBottom: "1px solid var(--line)" }}>
            <span style={{ display: "block", fontFamily: "var(--mono)", fontSize: 11, color: "var(--muted)" }}>EMAIL · CLICK TO COPY</span>
            <span style={{ fontSize: 15, fontWeight: 600 }}>{copied === "email" ? "Copied ✓" : profile.links.email}</span>
          </button>
          <button onClick={() => copy("phone", profile.links.phone)} style={{ display: "block", textAlign: "left", padding: "10px 0", borderBottom: "1px solid var(--line)" }}>
            <span style={{ display: "block", fontFamily: "var(--mono)", fontSize: 11, color: "var(--muted)" }}>PHONE · CLICK TO COPY</span>
            <span style={{ fontSize: 15, fontWeight: 600 }}>{copied === "phone" ? "Copied ✓" : profile.links.phone}</span>
          </button>
          <a href={profile.links.whatsapp} target="_blank" rel="noreferrer" style={{ display: "block", padding: "10px 0" }}>
            <span style={{ display: "block", fontFamily: "var(--mono)", fontSize: 11, color: "var(--muted)" }}>WHATSAPP · OPEN CHAT</span>
            <span style={{ fontSize: 15, fontWeight: 600 }}>{profile.links.phone} ↗</span>
          </a>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
          <p className="index-num" style={{ marginBottom: 12 }}>ELSEWHERE</p>
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "12px 0", borderBottom: "1px solid var(--line)", color: "var(--muted)", fontSize: 14 }}>
              <span>{s.label}</span>
              <span style={{ color: "#fff" }}>{icons[s.label]} {s.handle}</span>
            </a>
          ))}
          <a href={profile.links.resume} download style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", color: "var(--muted)", fontSize: 14 }}>
            <span>Resume</span>
            <span style={{ color: "var(--accent)" }}>View resume ↗</span>
          </a>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
          <p className="index-num" style={{ marginBottom: 12 }}>STATUS</p>
          <p style={{ fontFamily: "var(--display)", fontSize: "clamp(22px,2.4vw,30px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, margin: 0 }}>
            Open to <span style={{ color: "var(--accent)" }}>new roles</span> &amp; collaborations.
          </p>
          <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 12, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 10px rgba(0,229,255,0.6)" }} />
            Based in Bangladesh · Full-stack + ML
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ marginTop: 18, fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em", color: "var(--accent)", border: "1px solid rgba(0,229,255,0.4)", padding: "8px 14px", borderRadius: 999 }}
          >
            BACK TO TOP ↑
          </button>
        </motion.div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 12, padding: "16px 0 20px", borderTop: "1px solid var(--line)", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.08em", color: "var(--muted)" }}>
        <span>© {new Date().getFullYear()} TANJIP SURAIT MAHDIN</span>
        <span>BUILT WITH INTENT</span>
        <a href="#home" style={{ color: "#fff" }}>HOME ↑</a>
      </div>
    </footer>
  );
}
