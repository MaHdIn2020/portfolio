// src/components/Hero.jsx
// Portfolio-style hero: editorial headline, phrase cycler, photo with travelling border, tech marquee.
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import { profile } from "../data/profile";
import {
  SiPython, SiJavascript, SiHtml5, SiCss3, SiReact, SiTailwindcss,
  SiNodedotjs, SiExpress, SiMongodb, SiScikitlearn, SiTensorflow, SiGit, SiGithub as SiGh, SiVercel,
} from "react-icons/si";

const marqueeIcons = [
  SiPython, SiJavascript, SiHtml5, SiCss3, SiReact, SiTailwindcss,
  SiNodedotjs, SiExpress, SiMongodb, SiScikitlearn, SiTensorflow, SiGit, SiGh, SiVercel,
];

function LogoMarquee() {
  const trackRef = useRef(null);
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let start = performance.now();
    const loop = (timestamp) => {
      const el = (timestamp - start) / 1000;
      const half = track.scrollWidth / 2 || 1;
      const x = -((el * 28) % half);
      if (track) track.style.transform = `translateX(${x}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  const Group = ({ hidden }) => (
    <div style={{ display: "flex", alignItems: "center", gap: "clamp(28px,4vw,56px)", padding: "0 28px" }} aria-hidden={hidden || undefined}>
      {marqueeIcons.map((Icon, i) => <Icon key={i} aria-hidden={hidden} style={{ fontSize: 26, color: "#9aa5b1", flexShrink: 0 }} />)}
    </div>
  );
  return (
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 62, display: "flex", alignItems: "center", overflow: "hidden", borderTop: "1px solid var(--line)", maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)" }} aria-label="Technologies">
      <div ref={trackRef} style={{ display: "flex", width: "max-content", willChange: "transform" }}>
        <Group /><Group hidden />
      </div>
    </div>
  );
}

const ease = [0.22, 0.61, 0.36, 1];

export default function Hero() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const reduced = useRef(typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const phrases = profile.heroPhrases;

  useEffect(() => {
    if (reduced.current) return;
    const id = setInterval(() => setPhraseIdx((v) => (v + 1) % phrases.length), 2600);
    return () => clearInterval(id);
  }, [phrases.length]);

  const socials = [
    { icon: <FaGithub />, href: profile.links.github, label: "GitHub" },
    { icon: <FaLinkedin />, href: profile.links.linkedin, label: "LinkedIn" },
    { icon: <FaFacebook />, href: profile.links.facebook, label: "Facebook" },
  ];

  return (
    <section id="home" aria-labelledby="hero-title" style={{ position: "relative", height: "min(960px, 100svh)", minHeight: 780, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "120px var(--gutter) 0", overflow: "hidden" }}>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,229,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.035) 1px, transparent 1px)", backgroundSize: "56px 56px", maskImage: "radial-gradient(ellipse at 30% 40%, #000 30%, transparent 75%)" }} />

      <div style={{ position: "relative", display: "flex", justifyContent: "space-between", gap: 16, fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.14em", color: "var(--muted)" }}>
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 0.6 }}>{profile.heroMeta} <b style={{ color: "var(--accent)", marginLeft: 6 }}>●</b></motion.span>
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }}>{profile.location} <b aria-hidden="true" style={{ color: "var(--accent)" }}>↘</b></motion.span>
      </div>

      <div style={{ position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(240px, 31vw)", gap: "clamp(24px,4vw,64px)", alignItems: "end", paddingBottom: 86 }} className="hero-grid">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease }}>
          <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.14em", color: "var(--muted)" }}>
            <span style={{ color: "var(--accent)" }}>✳</span> DIGITAL PRODUCTS, BUILT WITH INTENT
          </p>
          <h1 id="hero-title" className="display-title" style={{ margin: "22px 0 28px", fontSize: "clamp(52px, 7.2vw, 118px)" }}>
            {profile.heroLines.slice(0, 2).map((l, i) => (
              <span key={i} style={{ display: "block", overflow: "hidden" }}>
                <motion.span style={{ display: "block" }} initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: 0.2 + i * 0.11, duration: 0.85, ease }}>{l}</motion.span>
              </span>
            ))}
            <span style={{ display: "block", overflow: "hidden" }}>
              <motion.span style={{ display: "block", color: "var(--accent)" }} initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: 0.42, duration: 0.85, ease }}>{profile.heroLines[2]}</motion.span>
            </span>
          </h1>

          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.7 }} style={{ display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap", fontFamily: "var(--mono)", fontSize: 12, letterSpacing: "0.12em", color: "var(--muted)", marginBottom: 28 }}>
            <span>DESIGNED FOR</span>
            <strong key={phrases[phraseIdx]} style={{ color: "var(--accent)", fontFamily: "var(--display)", fontSize: "clamp(24px,3vw,38px)", fontWeight: 700, letterSpacing: "-0.04em", animation: reduced.current ? "none" : "phrase-enter .5s cubic-bezier(.2,.75,.2,1) both" }}>
              {phrases[phraseIdx]}
            </strong>
            <style>{`@keyframes phrase-enter { from{opacity:0; transform:translateY(8px)} to{opacity:1; transform:translateY(0)} }`}</style>
          </motion.p>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.8 }} style={{ color: "#b9c1cc", fontSize: 15, lineHeight: 1.7, maxWidth: 520, marginBottom: 30 }}>
            {profile.bio}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.7 }} style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <a href="#work" className="btn-primary">View My Work ↗</a>
            <a href={profile.links.resume} download className="btn-outline">Download Resume ↓</a>
            <span style={{ display: "inline-flex", gap: 10 }}>
              {socials.map((s, i) => (
                <motion.a key={i} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} whileHover={{ y: -3, color: "var(--accent)", borderColor: "rgba(0,229,255,0.5)" }} style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", color: "#cbd5e1", fontSize: 16 }}>
                  {s.icon}
                </motion.a>
              ))}
            </span>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.9, ease }} className="hero-photo-wrap" style={{ position: "relative", height: "min(520px, 52vh)", overflow: "hidden", background: "#0d1117" }}>
          <img src="/Picture.jpg" alt="Portrait of Tanjip Surait Mahdin" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 20%", filter: "grayscale(0.35) contrast(1.05)", opacity: 0.92, maskImage: "linear-gradient(to bottom, #000 72%, transparent 100%)" }} />
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", color: "var(--accent)", pointerEvents: "none" }}>
            <rect x="0.6" y="0.6" width="98.8" height="98.8" pathLength="100" fill="none" stroke="currentColor" strokeWidth="1.2" vectorEffect="non-scaling-stroke" strokeDasharray="16 84" style={{ animation: reduced.current ? "none" : "border-lap 10s linear infinite" }} />
            <style>{`@keyframes border-lap { from{stroke-dashoffset:0} to{stroke-dashoffset:-100} }`}</style>
          </svg>
          <span className="index-num" style={{ position: "absolute", right: 14, bottom: 14, color: "var(--muted)" }}>01 / 08</span>
        </motion.div>
      </div>

      <LogoMarquee />

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; align-items: start !important; padding-bottom: 76px !important; }
          .hero-photo-wrap { display: none; }
        }
      `}</style>
    </section>
  );
}
