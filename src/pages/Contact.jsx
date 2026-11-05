// src/pages/Contact.jsx
// Contact — giant invitation + working emailjs form + copy-email header.
import { useState } from "react";
import { motion } from "framer-motion";
import { FiSend } from "react-icons/fi";
import emailjs from "@emailjs/browser";
import DecryptedText from "../components/DecryptedText";
import { profile } from "../data/profile";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    emailjs
      .send("service_0jvjsyb", "template_u1xq09s", { name: formData.name, email: formData.email, message: formData.message }, "yt00LSJjV_bZpV8-P")
      .then(() => {
        setStatus({ ok: true, msg: "Message sent successfully! I'll get back to you soon." });
        setFormData({ name: "", email: "", message: "" });
        setLoading(false);
      })
      .catch(() => {
        setStatus({ ok: false, msg: "Failed to send. Please try again or email me directly." });
        setLoading(false);
      });
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10,
    padding: "13px 16px", color: "#fff", fontSize: "0.9rem", outline: "none", width: "100%", fontFamily: "var(--sans)",
  };

  return (
    <section id="contact" className="section" aria-label="Contact" style={{ paddingBottom: 40 }}>
      <div className="kicker" data-reveal>
        <span><em>06</em> YOUR TURN</span>
        <span className="k-right">HAVE SOMETHING IN MIND?</span>
      </div>

      <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="display-title" style={{ fontSize: "clamp(56px, 9vw, 128px)", margin: "40px 0 8px", lineHeight: 0.9 }}>
        Let&apos;s build<br /><span style={{ color: "var(--accent)" }}>
          <DecryptedText text="something" animateOn="both" encryptedClassName="decrypted-glyph" speed={38} sequential characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%&*" />
        </span> useful.
      </motion.h2>
      <p style={{ color: "var(--muted)", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.14em", marginBottom: 48 }}>OPEN TO OPPORTUNITIES · I USUALLY RESPOND WITHIN 24 HOURS</p>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 0.9fr) minmax(0, 1.1fr)", gap: "clamp(24px,4vw,56px)", alignItems: "start" }} className="contact-grid">
        <motion.div initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="index-num" style={{ marginBottom: 14 }}>DIRECT CONTACT</p>
          {[
            { label: "EMAIL", value: profile.links.email, href: `mailto:${profile.links.email}` },
            { label: "PHONE", value: profile.links.phone, href: profile.links.phoneHref },
            { label: "WHATSAPP", value: profile.links.phone, href: profile.links.whatsapp },
          ].map((c) => (
            <a key={c.label} href={c.href} target={c.label === "WHATSAPP" ? "_blank" : undefined} rel="noreferrer" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, padding: "16px 0", borderBottom: "1px solid var(--line)" }}>
              <span>
                <span style={{ display: "block", fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.12em", color: "var(--muted)" }}>{c.label}</span>
                <span style={{ fontSize: 16, fontWeight: 600 }}>{c.value}</span>
              </span>
              <span style={{ color: "var(--accent)" }}>↗</span>
            </a>
          ))}
          <p style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.7, marginTop: 20 }}>
            Prefer email? The form opposite ships via EmailJS — no account needed on your end. I read every message personally.
          </p>
        </motion.div>

        <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ border: "1px solid var(--line)", padding: "clamp(20px,3vw,36px)", display: "flex", flexDirection: "column", gap: 16, background: "rgba(255,255,255,0.015)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="form-row">
            <input type="text" name="name" placeholder="Your Name" required value={formData.name} onChange={handleChange} disabled={loading} style={inputStyle} />
            <input type="email" name="email" placeholder="Your Email" required value={formData.email} onChange={handleChange} disabled={loading} style={inputStyle} />
          </div>
          <textarea name="message" rows={5} placeholder="Tell me about your project..." required value={formData.message} onChange={handleChange} disabled={loading} style={{ ...inputStyle, resize: "vertical" }} />
          <button type="submit" disabled={loading} className="btn-primary" style={{ justifyContent: "center", opacity: loading ? 0.7 : 1 }}>
            <FiSend size={15} /> {loading ? "Sending..." : "Send Message"}
          </button>
          {status && (
            <p style={{ textAlign: "center", fontSize: 13, color: status.ok ? "var(--accent)" : "#f87171" }}>{status.msg}</p>
          )}
        </motion.form>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
