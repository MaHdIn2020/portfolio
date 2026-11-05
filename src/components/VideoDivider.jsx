// src/components/VideoDivider.jsx
// Single-video divider — Mixkit ID 18140, blue particles.
// Smooth melt-in at top and melt-out at bottom via edge gradients.
// No centre texts. No controls. No credit lines.
// Smooth: video plays muted/loop while sticky keeps it pinned; will-change + contain.
import { memo, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const VIDEO_SRC = "/videos/luminous-layer-space-720.mp4";

const WORDS = ["FULL-STACK", "MACHINE LEARNING", "RESEARCH", "TEACHING", "PRODUCTS", "60FPS"];

const MarqueeRow = memo(function MarqueeRow({ hidden }) {
  return (
    <div aria-hidden={hidden || undefined} style={{ display: "flex", flexShrink: 0 }}>
      {WORDS.map((w, i) => (
        <span key={i} style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.24em", color: "rgba(255,255,255,0.75)", padding: "0 18px", whiteSpace: "nowrap" }}>
          {w} <span style={{ color: "var(--accent)" }}>✳</span>
        </span>
      ))}
    </div>
  );
});

export default memo(function VideoDivider() {
  const sectionRef = useRef(null);
  const reduced = useRef(typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  // Slow parallax — not frame-scrubbing, just gentle drift so it never feels stuck
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 70, damping: 24, mass: 0.8 });
  const videoScale = useTransform(smoothProgress, [0, 0.5, 1], [1.22, 1.04, 1.18]);
  const videoY = useTransform(smoothProgress, [0, 1], ["-6%", "6%"]);
  // Melt-in / melt-out — opacity ramps at both edges of the sticky window
  const fadeIn = useTransform(scrollYProgress, [0, 0.28, 0.72, 1], [0, 1, 1, 0]);
  const marqueeOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const v = sectionRef.current?.querySelector("video");
    if (v) v.muted = true;
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Motion interlude"
      style={{ position: "relative", height: "220vh", background: "#05060a" }}
    >
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", contain: "strict" }}>
        {/* Video layer — gentle parallax, plays normally */}
        <motion.div style={{ position: "absolute", inset: "-8% 0", scale: videoScale, y: videoY, willChange: "transform" }}>
          <video
            src={VIDEO_SRC}
            autoPlay={!reduced.current}
            muted
            loop
            playsInline
            preload="auto"
            poster="/Picture.jpg"
            disablePictureInPicture
            aria-hidden="true"
            style={{
              width: "100%", height: "100%",
              objectFit: "cover",
              willChange: "transform",
              transform: "translateZ(0)",
            }}
          />
        </motion.div>

        {/* Edge gradients — top melts from About, bottom melts into Work */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
          background: "linear-gradient(180deg, rgba(5,6,10,0.95) 0%, rgba(5,6,10,0.55) 12%, transparent 28%, transparent 72%, rgba(5,6,10,0.55) 88%, rgba(5,6,10,0.95) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse at center, transparent 32%, rgba(5,6,10,0.45) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
          background: "linear-gradient(90deg, rgba(0,229,255,0.06), transparent 22%, transparent 78%, rgba(0,229,255,0.06))" }} />
        <motion.div style={{ position: "absolute", inset: 0, borderTop: "1px solid rgba(0,229,255,0.22)", borderBottom: "1px solid rgba(0,229,255,0.22)", pointerEvents: "none", opacity: fadeIn }} />

        {/* Melt veil — whole divider emerges from black and settles to black */}
        <motion.div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: fadeIn,
          background: "linear-gradient(180deg, #05060a 0%, transparent 18%, transparent 82%, #05060a 100%)" }} />

        {/* Top marquee — only remaining text */}
        <motion.div aria-hidden="true" style={{ position: "absolute", top: 24, left: 0, right: 0, overflow: "hidden", opacity: marqueeOpacity }}>
          <motion.div animate={reduced.current ? undefined : { x: ["0%", "-50%"] }} transition={{ repeat: Infinity, duration: 30, ease: "linear" }} style={{ display: "flex", width: "max-content" }}>
            <MarqueeRow /><MarqueeRow hidden />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});
