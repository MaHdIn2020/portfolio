// src/pages/About.jsx
// About — chapter tab story: auto-advancing tabs with progress bar + animated counters.
// Distinct from pinned scroll: interactive chapter navigation.
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { profile, aboutChapters } from "../data/profile";
import DecryptedText from "../components/DecryptedText";

const DURATION = 5200;

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
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useRef(typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const chapter = aboutChapters[active];

  useEffect(() => {
    if (reduced.current || paused) return;
    const id = setInterval(() => setActive((v) => (v + 1) % aboutChapters.length), DURATION);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section id="about" className="section" style={{ paddingTop: 72 }} aria-label="About">
      <div className="kicker" data-reveal>
        <span><em>01</em> THE PERSON</span>
        <span className="k-right">CHAPTER BY CHAPTER</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 0.95fr) minmax(0, 1.05fr)", gap: "clamp(28px,4vw,68px)", marginTop: 44, alignItems: "start" }} className="about-grid">
        {/* Left — intro + tabs */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="display-title" style={{ fontSize: "clamp(42px, 5.2vw, 74px)", margin: 0, lineHeight: 0.95 }}
          >
            A {profile.firstName.toLowerCase()} with
            <br />
            <DecryptedText
              text="models inside"
              animateOn="both" sequential revealDirection="start"
              speed={45} maxIterations={8} loop loopDelay={3200}
              encryptedClassName="decrypted-glyph" characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%&*"
            />
            <br />
            <span style={{ color: "var(--accent)" }}>products.</span>
          </motion.h2>

          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15, duration: 0.7 }} style={{ color: "#b9c1cc", fontSize: 15, lineHeight: 1.75, maxWidth: 520, marginTop: 22 }}>
            {profile.bio}
          </motion.p>

          <div style={{ display: "flex", gap: 10, marginTop: 28, flexWrap: "wrap" }}>
            {profile.stats.map((s, i) => <StatCounter key={i} value={s.value} label={s.label} />)}
          </div>

          {/* Chapter tabs */}
          <div style={{ marginTop: 36, display: "flex", flexDirection: "column" }} role="tablist" aria-label="About chapters">
            {aboutChapters.map((c, i) => {
              const isActiveTab = i === active;
              return (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={isActiveTab}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setPaused(true)}
                  onMouseLeave={() => setPaused(false)}
                  style={{
                    display: "flex", alignItems: "center", gap: 14, textAlign: "left",
                    padding: "14px 6px", borderTop: "1px solid var(--line)", background: "none",
                    color: isActiveTab ? "#fff" : "var(--muted)", cursor: "pointer", position: "relative",
                  }}
                >
                  <span className="index-num" style={{ flexShrink: 0 }}><strong>{c.id}</strong></span>
                  <span style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: 15, letterSpacing: "-0.01em", flex: 1 }}>{c.kicker.split("/")[1].trim().replace(/\b\w/g, (m) => m.toUpperCase())}</span>
                  <span style={{ width: isActiveTab ? 44 : 16, height: 2, background: isActiveTab ? "var(--accent)" : "rgba(255,255,255,0.15)", display: "inline-block", transition: "width .35s, background .35s", position: "relative", overflow: "hidden" }} aria-hidden="true">
                    {isActiveTab && !reduced.current && (
                      <motion.i key={active} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: DURATION / 1000, ease: "linear" }} style={{ position: "absolute", inset: 0, background: "#fff", transformOrigin: "left", display: "block" }} />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
          <p style={{ color: "var(--muted)", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.12em", marginTop: 14 }}>
            {reduced.current ? "TAP A CHAPTER TO READ" : "AUTO-ADVANCING — CLICK ANY CHAPTER"}
          </p>
        </div>

        {/* Right — active chapter panel */}
        <div
          style={{ position: "sticky", top: 110, border: "1px solid rgba(0,229,255,0.22)", background: "linear-gradient(160deg, rgba(0,229,255,0.05), rgba(255,255,255,0.012) 60%)", padding: "clamp(24px,3.5vw,44px)", minHeight: 460, overflow: "hidden" }}
          onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
        >
          <div aria-hidden="true" style={{ position: "absolute", top: -90, right: -70, width: 240, height: 240, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,229,255,0.12), transparent 70%)" }} />
          <AnimatePresence mode="wait">
            <motion.article
              key={chapter.id}
              initial={{ opacity: 0, y: 26, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -14, filter: "blur(3px)" }}
              transition={{ duration: 0.55, ease: [0.22, 0.8, 0.3, 1] }}
              style={{ position: "relative" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="index-num">{chapter.kicker}</span>
                <span style={{ display: "inline-flex", gap: 6 }}>
                  {aboutChapters.map((_, i) => (
                    <span key={i} aria-hidden="true" style={{ width: i === active ? 22 : 6, height: 6, borderRadius: 6, background: i === active ? "var(--accent)" : "rgba(255,255,255,0.18)", transition: "width .3s, background .3s" }} />
                  ))}
                </span>
              </div>
              <h3 className="display-title" style={{ fontSize: "clamp(30px, 3.6vw, 50px)", margin: "22px 0 18px", lineHeight: 1.02 }}>{chapter.title}</h3>
              <p style={{ color: "#c4d3df", fontSize: "clamp(16px, 1.5vw, 19px)", lineHeight: 1.75, margin: 0 }}>{chapter.body}</p>
              <p style={{ color: "var(--accent)", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.12em", marginTop: 26, borderTop: "1px solid rgba(0,229,255,0.2)", paddingTop: 16 }}>{chapter.note}</p>

              {/* prev / next */}
              <div style={{ display: "flex", gap: 10, marginTop: 30 }}>
                <button onClick={() => setActive((active - 1 + aboutChapters.length) % aboutChapters.length)} aria-label="Previous chapter" style={{ width: 42, height: 42, borderRadius: "50%", border: "1px solid var(--line)", display: "grid", placeItems: "center", background: "none", color: "#fff", cursor: "pointer" }}>←</button>
                <button onClick={() => setActive((active + 1) % aboutChapters.length)} aria-label="Next chapter" style={{ width: 42, height: 42, borderRadius: "50%", border: "1px solid var(--line)", display: "grid", placeItems: "center", background: "none", color: "var(--accent)", cursor: "pointer" }}>→</button>
                <span className="index-num" style={{ alignSelf: "center", marginLeft: 6 }}><strong>{chapter.id}</strong> / 04</span>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; }
          .about-grid > div:last-child { position: static !important; min-height: 0 !important; }
        }
      `}</style>
    </section>
  );
}
