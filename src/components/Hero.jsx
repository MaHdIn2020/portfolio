// src/components/Hero.jsx
// Original hero — "Tanjip builds software that ships." + rotating focus line.
// No reference copy. No "01 / 08" anywhere. Photo: clean — glow, corner ticks, soft glint, tilt.
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
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

/* Hero portrait — clean pros look: soft cyan glow, 4 cyan corner ticks, slow glint sweep, gentle mouse tilt.
   No rings, no comet, no dashed borders. */
function HeroPhoto({ reduced }) {
  const wrapRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rxSpring = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 160, damping: 20 });
  const rySpring = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), { stiffness: 160, damping: 20 });

  const onMove = (e) => {
    if (reduced || !wrapRef.current) return;
    const r = wrapRef.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) - 0.5);
    my.set(((e.clientY - r.top) / r.height) - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  // Walking robot — steps left→right along the top edge of the photo
  const [walkX, setWalkX] = useState(-70);
  const [step, setStep] = useState(0);
  const [eyesClosed, setEyesClosed] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const timers = [];
    const scheduleBlink = () => {
      const delay = 2600 + Math.random() * 3200;
      timers.push(setTimeout(() => {
        setEyesClosed(true);
        timers.push(setTimeout(() => { setEyesClosed(false); scheduleBlink(); }, 150));
      }, delay));
    };
    scheduleBlink();
    const stepIv = setInterval(() => setStep((v) => v + 1), 320);
    return () => { timers.forEach(clearTimeout); clearInterval(stepIv); };
  }, [reduced]);

  useEffect(() => {
    if (reduced) { setWalkX(40); return; }
    let raf = 0;
    const start = performance.now();
    const DUR = 6800;
    let alive = true;
    const run = () => {
      const go = (now) => {
        if (!alive) return;
        const t = ((now - start) % DUR) / DUR;
        setWalkX(-70 + t * 118);
        raf = requestAnimationFrame(go);
      };
      raf = requestAnimationFrame(go);
    };
    run();
    return () => { alive = false; cancelAnimationFrame(raf); };
  }, [reduced]);

  return (
    <motion.div
      ref={wrapRef}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45, duration: 0.9, ease }}
      className="hero-photo-wrap"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        position: "relative",
        height: "min(520px, 52vh)",
        perspective: 900,
        background: "transparent",
      }}
    >
      {/* soft cyan halo behind the portrait */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: "-14px -10px -34px -10px", borderRadius: 28,
        background: "radial-gradient(ellipse 70% 55% at 50% 32%, rgba(0,229,255,0.22), transparent 70%)",
        filter: "blur(18px)",
        pointerEvents: "none",
      }} />

      {/* outer rim — subtle hairline so it reads as a frame without a chase animation */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: -1, borderRadius: 18,
        border: "1px solid rgba(255,255,255,0.12)",
        pointerEvents: "none", zIndex: 4,
      }} />

      {/* 4 small cyan corner ticks outside the portrait */}
      <span aria-hidden="true" style={{ position: "absolute", left: -7, top: -7, width: 18, height: 18, borderLeft: "2px solid var(--accent)", borderTop: "2px solid var(--accent)", borderTopLeftRadius: 18, zIndex: 4, pointerEvents: "none" }} />
      <span aria-hidden="true" style={{ position: "absolute", right: -7, top: -7, width: 18, height: 18, borderRight: "2px solid var(--accent)", borderTop: "2px solid var(--accent)", borderTopRightRadius: 18, zIndex: 4, pointerEvents: "none" }} />
      <span aria-hidden="true" style={{ position: "absolute", left: -7, bottom: -7, width: 18, height: 18, borderLeft: "2px solid var(--accent)", borderBottom: "2px solid var(--accent)", borderBottomLeftRadius: 18, zIndex: 4, pointerEvents: "none" }} />
      <span aria-hidden="true" style={{ position: "absolute", right: -7, bottom: -7, width: 18, height: 18, borderRight: "2px solid var(--accent)", borderBottom: "2px solid var(--accent)", borderBottomRightRadius: 18, zIndex: 4, pointerEvents: "none" }} />

      <motion.div
        style={{
          position: "relative",
          width: "100%", height: "100%",
          rotateX: rxSpring,
          rotateY: rySpring,
          transformStyle: "preserve-3d",
          borderRadius: 18,
          overflow: "hidden",
          background: "#0d1117",
          boxShadow: "0 30px 80px rgba(0,0,0,0.55)",
        }}
      >
        <img
          src="/Picture.jpg"
          alt="Portrait of Tanjip Surait Mahdin"
          style={{
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "50% 20%",
            filter: "grayscale(0.35) contrast(1.05)",
            opacity: 0.95,
            maskImage: "linear-gradient(to bottom, #000 78%, transparent 100%)",
          }}
        />

        {/* soft cyan veil + bottom fade */}
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(180deg, rgba(0,229,255,0.04) 0%, transparent 40%, rgba(5,6,10,0.55) 100%)" }} />

        {/* gentle glint sweep — slow, subtle */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute", top: "-20%", bottom: "-20%", left: "-32%", width: "38%",
            zIndex: 2, pointerEvents: "none",
            background: "linear-gradient(105deg, transparent, rgba(255,255,255,0.16) 50%, transparent)",
            transform: "skewX(-18deg)",
            animation: reduced ? "none" : "glint-sweep 7s ease-in-out infinite",
          }}
        />
        <style>{`@keyframes glint-sweep { 0%{ left:-32% } 45%{ left:118% } 100%{ left:118% } }`}</style>

        {/* tags */}
        <div style={{ position: "absolute", left: 14, top: 14, zIndex: 3, fontFamily: "var(--mono)", fontSize: 9, letterSpacing: "0.18em", color: "rgba(255,255,255,0.75)", border: "1px solid rgba(255,255,255,0.2)", padding: "6px 10px", borderRadius: 999, background: "rgba(5,6,10,0.45)", backdropFilter: "blur(6px)" }}>
          DHAKA · 2026
        </div>
        <div style={{ position: "absolute", right: 14, bottom: 14, zIndex: 3, fontFamily: "var(--mono)", fontSize: 9, letterSpacing: "0.18em", color: "rgba(255,255,255,0.75)", border: "1px solid rgba(255,255,255,0.2)", padding: "6px 10px", borderRadius: 999, background: "rgba(5,6,10,0.45)", backdropFilter: "blur(6px)", animation: reduced ? "none" : "float-tag 5s ease-in-out infinite" }}>
          ✦ TANJIP S. MAHDIN
        </div>
        <style>{`@keyframes float-tag { 0%,100%{ transform: translateY(0) } 50%{ transform: translateY(-4px) } }`}</style>
      </motion.div>

      {/* ── Robot walking along the top edge ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", top: -8, left: -10, zIndex: 5, pointerEvents: "none",
          transform: `translateX(${walkX}px)`,
          transition: reduced ? "none" : "none",
          filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.5))",
        }}
      >
        <svg width="64" height="68" viewBox="0 0 64 68" fill="none" style={{ display: "block", overflow: "visible" }}>
          {/* antenna */}
          <line x1="32" y1="12" x2="32" y2="20" stroke="#9ab" strokeWidth="3" strokeLinecap="round" />
          <circle cx="32" cy="8" r="4" fill="#00e5ff" />
          {/* head */}
          <rect x="10" y="18" width="44" height="28" rx="10" fill="#eef6f8" stroke="#b9cdd6" strokeWidth="1.5" />
          {/* face screen */}
          <rect x="15" y="23" width="34" height="18" rx="7" fill="#0b1a1f" />
          {/* eyes */}
          {eyesClosed ? (
            <>
              <line x1="21" y1="32" x2="26" y2="32" stroke="#00e5ff" strokeWidth="2.2" strokeLinecap="round" />
              <line x1="38" y1="32" x2="43" y2="32" stroke="#00e5ff" strokeWidth="2.2" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx="23.5" cy="32" r="2.7" fill="#00e5ff" />
              <circle cx="40.5" cy="32" r="2.7" fill="#00e5ff" />
            </>
          )}
          {/* smile */}
          <path d="M27 37 Q32 40 37 37" stroke="#00e5ff" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          {/* ears */}
          <rect x="5" y="28" width="6" height="11" rx="3" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
          <rect x="53" y="28" width="6" height="11" rx="3" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
          {/* body */}
          <rect x="14" y="48" width="36" height="12" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
          {/* legs — stepping */}
          <g style={{ transformOrigin: "24px 60px", transform: `rotate(${reduced ? 0 : step % 2 === 0 ? 22 : -22}deg)`, transition: "transform .28s ease-in-out" }}>
            <line x1="24" y1="60" x2="24" y2="66" stroke="#cbd5e1" strokeWidth="4.5" strokeLinecap="round" />
          </g>
          <g style={{ transformOrigin: "40px 60px", transform: `rotate(${reduced ? 0 : step % 2 === 0 ? -22 : 22}deg)`, transition: "transform .28s ease-in-out" }}>
            <line x1="40" y1="60" x2="40" y2="66" stroke="#cbd5e1" strokeWidth="4.5" strokeLinecap="round" />
          </g>
          {/* arms — swinging opposite to legs */}
          <g style={{ transformOrigin: "14px 52px", transform: `rotate(${reduced ? 0 : step % 2 === 0 ? -18 : 18}deg)`, transition: "transform .28s ease-in-out" }}>
            <line x1="14" y1="52" x2="10" y2="58" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
          </g>
          <g style={{ transformOrigin: "50px 52px", transform: `rotate(${reduced ? 0 : step % 2 === 0 ? 18 : -18}deg)`, transition: "transform .28s ease-in-out" }}>
            <line x1="50" y1="52" x2="54" y2="58" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
          </g>
          {/* bob */}
          <style>{`@keyframes walk-bob { 0%,100%{ transform: translateY(0) } 50%{ transform: translateY(-2.5px) } }`}</style>
        </svg>
        {/* tiny step dust */}
        <span style={{ position: "absolute", left: "50%", bottom: -2, transform: "translateX(-50%)", width: 30, height: 6, borderRadius: 999, background: "radial-gradient(ellipse, rgba(255,255,255,0.18), transparent 70%)", pointerEvents: "none" }} />
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const [idx, setIdx] = useState(0);
  const reduced = useRef(typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const phrases = profile.heroRotation;

  useEffect(() => {
    if (reduced.current) return;
    const id = setInterval(() => setIdx((v) => (v + 1) % phrases.length), 2600);
    return () => clearInterval(id);
  }, [phrases.length]);

  const socials = [
    { icon: <FaGithub />, href: profile.links.github, label: "GitHub" },
    { icon: <FaLinkedin />, href: profile.links.linkedin, label: "LinkedIn" },
    { icon: <FaFacebook />, href: profile.links.facebook, label: "Facebook" },
  ];

  return (
    <section id="home" aria-labelledby="hero-title" style={{ position: "relative", minHeight: "100svh", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "120px var(--gutter) 0", overflow: "hidden" }}>
      {/* Faint grid backdrop */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,229,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.035) 1px, transparent 1px)", backgroundSize: "56px 56px", maskImage: "radial-gradient(ellipse at 30% 40%, #000 30%, transparent 75%)" }} />

      {/* Top strip — availability + location */}
      <div style={{ position: "relative", display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.14em", color: "var(--muted)" }}>
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 0.6 }} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <motion.span animate={reduced.current ? undefined : { scale: [1, 1.35, 1], opacity: [1, 0.6, 1] }} transition={{ repeat: Infinity, duration: 1.8 }} style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 12px rgba(0,229,255,0.7)", display: "inline-block" }} />
          {profile.availability}
        </motion.span>
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }}>{profile.locationTag}</motion.span>
      </div>

      <div style={{ position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(240px, 31vw)", gap: "clamp(24px,4vw,64px)", alignItems: "end", paddingBottom: 86 }} className="hero-grid">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease }}>
          {/* Eyebrow */}
          <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.16em", color: "var(--accent)", margin: 0 }}>
            <span style={{ color: "var(--accent)" }}>●</span> {profile.heroMeta}
          </p>

          {/* Headline — name + role */}
          <h1 id="hero-title" className="display-title" style={{ margin: "22px 0 28px", fontSize: "clamp(52px, 7.2vw, 118px)" }}>
            {profile.heroHeadline.map((line, i) => (
              <span key={i} style={{ display: "block", overflow: "hidden" }}>
                <motion.span style={{ display: "block", color: i === 2 ? "var(--accent)" : "#fff" }} initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: 0.2 + i * 0.11, duration: 0.85, ease }}>
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Rotating focus line */}
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.7 }} style={{ display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap", fontFamily: "var(--mono)", fontSize: 12, letterSpacing: "0.12em", color: "var(--muted)", marginBottom: 28 }}>
            <span>FOCUS</span>
            <strong key={phrases[idx]} style={{ color: "var(--accent)", fontFamily: "var(--display)", fontSize: "clamp(24px,3vw,38px)", fontWeight: 700, letterSpacing: "-0.04em", animation: reduced.current ? "none" : "phrase-enter .5s cubic-bezier(.2,.75,.2,1) both" }}>
              {phrases[idx]}
            </strong>
            <style>{`@keyframes phrase-enter { from{opacity:0; transform:translateY(8px)} to{opacity:1; transform:translateY(0)} }`}</style>
          </motion.p>

          {/* Bio */}
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.8 }} style={{ color: "#b9c1cc", fontSize: 15, lineHeight: 1.7, maxWidth: 520, marginBottom: 30 }}>
            {profile.bio}
          </motion.p>

          {/* CTAs */}
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

        {/* Photo — clean: glow halo, 4 corner ticks, soft glint, tilt (no rings / no chase) */}
        <HeroPhoto reduced={reduced} />
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
