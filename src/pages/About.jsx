// src/pages/About.jsx
// About — snapshot cards: 4 static cards, staggered reveal. No auto-advance, no tabs, no dots.
// Original layout: title + stat row above, card grid below.
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { profile, aboutChapters } from "../data/profile";
import DecryptedText from "../components/DecryptedText";

function StatCounter({ value, label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const match = String(value).match(/^([\d.,]+)(.*)$/);
    if (!match) { setDisplay(String(value)); return; }
    const target = parseFloat(match[1].replace(/,/g, ""));
    const suffix = match[2] || "";
    const isDecimal = match[1].includes(".");
    const decimals = isDecimal ? match[1].split(".")[1].length : 0;
    const start = performance.now();
    const dur = 1300;
    let raf = 0;
    const step = (t) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      const current = target * eased;
      setDisplay((isDecimal ? current.toFixed(decimals) : Math.round(current).toLocaleString()) + suffix);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <div ref={ref} style={{ border: "1px solid var(--line)", padding: "14px 18px", minWidth: 104, position: "relative", overflow: "hidden" }}>
      <p className="display-title" style={{ fontSize: 28, margin: 0, color: "var(--accent)", fontVariantNumeric: "tabular-nums" }}>{display}</p>
      <p style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.12em", color: "var(--muted)", marginTop: 4 }}>{label.toUpperCase()}</p>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="section" style={{ paddingTop: 72 }} aria-label="About">
      <div className="kicker" data-reveal>
        <span>GOOD TO KNOW</span>
        <span className="k-right">THE SHORT VERSION</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: "clamp(28px,4vw,68px)", marginTop: 44, alignItems: "start" }} className="about-grid">
        {/* Left — headline + bio + stats */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="display-title" style={{ fontSize: "clamp(42px, 5.2vw, 74px)", margin: 0, lineHeight: 0.95 }}
          >
            A {profile.firstName.toLowerCase()} who
            <br />
            <DecryptedText
              text="reads the data"
              animateOn="both" sequential revealDirection="start"
              speed={45} maxIterations={8} loop loopDelay={3200}
              encryptedClassName="decrypted-glyph" characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%&*"
            />
            <br />
            <span style={{ color: "var(--accent)" }}>before shipping.</span>
          </motion.h2>

          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15, duration: 0.7 }} style={{ color: "#b9c1cc", fontSize: 15, lineHeight: 1.75, maxWidth: 520, marginTop: 22 }}>
            {profile.bio}
          </motion.p>

          <div style={{ display: "flex", gap: 10, marginTop: 28, flexWrap: "wrap" }}>
            {profile.stats.map((s, i) => <StatCounter key={i} value={s.value} label={s.label} />)}
          </div>
        </div>

        {/* Right — snapshot cards */}
        <div style={{ display: "grid", gap: 14 }} role="list" aria-label="About snapshots">
          {aboutChapters.map((c, i) => (
            <motion.article
              key={c.id}
              role="listitem"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.09, ease: [0.22, 0.8, 0.3, 1] }}
              whileHover={{ y: -4, borderColor: "rgba(0,229,255,0.5)" }}
              style={{
                border: "1px solid var(--line)",
                background: "rgba(255,255,255,0.014)",
                padding: "clamp(18px,2.4vw,26px)",
                transition: "border-color .25s",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                <span style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 12, letterSpacing: "0.02em", color: "var(--accent)", textTransform: "uppercase" }}>{c.kicker}</span>
                <span style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.12em", color: "var(--muted)", textTransform: "uppercase" }}>{c.note}</span>
              </div>
              <h3 style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: "clamp(20px,2.2vw,26px)", letterSpacing: "-0.02em", lineHeight: 1.1, margin: "10px 0 8px" }}>{c.title}</h3>
              <p style={{ color: "#b9c1cc", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{c.body}</p>
            </motion.article>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
