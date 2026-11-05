// src/components/Preloader.jsx
// Original loader: progress → "Welcome / Happy Exploring" → auto-exits to site.
// No button, no keyboard gate — direct transition.
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onDone }) {
  const [phase, setPhase] = useState("loading"); // loading → welcome → done
  const [progress, setProgress] = useState(0);
  const startRef = useRef(performance.now());
  const reduced = useRef(typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const doneRef = useRef(false);

  // Lock scroll while loading
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    return () => { document.documentElement.style.overflow = ""; };
  }, []);

  // Count 0 → 100
  useEffect(() => {
    const start = startRef.current;
    const duration = reduced.current ? 300 : 1400;
    let raf = 0;
    let loaded = document.readyState === "complete";
    const onLoad = () => { loaded = true; };
    if (!loaded) window.addEventListener("load", onLoad, { once: true });

    const tick = (now) => {
      const elapsed = now - start;
      const p = Math.min(99, Math.floor((elapsed / duration) * 100));
      setProgress(p);
      if (elapsed < duration) {
        raf = requestAnimationFrame(tick);
      } else {
        const finish = () => {
          setProgress(100);
          setPhase("welcome");
        };
        if (loaded) finish();
        else {
          const iv = setInterval(() => { if (loaded) { clearInterval(iv); finish(); } }, 100);
          setTimeout(() => { clearInterval(iv); finish(); }, 2500);
        }
      }
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("load", onLoad); };
  }, [reduced]);

  // After welcome beat → exit
  useEffect(() => {
    if (phase !== "welcome") return;
    const t = setTimeout(() => {
      if (!doneRef.current) {
        doneRef.current = true;
        setPhase("done");
        onDone?.();
      }
    }, reduced.current ? 400 : 2200);
    return () => clearTimeout(t);
  }, [phase, onDone, reduced]);

  if (phase === "done") return null;
  const pct = phase === "welcome" ? 100 : progress;

  return (
    <div
      className="preloader"
      role="status"
      aria-label="Portfolio loading"
      aria-busy={phase === "loading"}
    >
      <div className="preloader-top">
        <span>TANJIP SURAIT MAHDIN</span>
        <span>PORTFOLIO — 2026</span>
      </div>

      <div className="preloader-center">
        <AnimatePresence mode="wait">
          {phase === "loading" ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
              transition={{ duration: 0.4 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}
            >
              <div className="preloader-count">
                {String(pct).padStart(2, "0")}
                <sup>%</sup>
              </div>
              <div className="preloader-bar" aria-hidden="true"><i style={{ transform: `scaleX(${pct / 100})` }} /></div>
              <div className="preloader-hint">Loading Portfolio</div>
            </motion.div>
          ) : (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -14, filter: "blur(4px)" }}
              transition={{ duration: 0.55, ease: [0.22, 0.8, 0.3, 1] }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, textAlign: "center" }}
            >
              <p className="preloader-hint" style={{ color: "var(--accent)", margin: 0 }}>✳ WELCOME</p>
              <h2 className="display-title" style={{ fontSize: "clamp(44px, 7vw, 84px)", margin: 0, color: "#fff", letterSpacing: "-0.04em", lineHeight: 0.95 }}>
                Happy<br />
                <span style={{ color: "var(--accent)" }}>exploring.</span>
              </h2>
              <p style={{ color: "var(--muted)", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.14em", margin: "6px 0 0" }}>
                FULL-STACK · ML · RESEARCH · TEACHING
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="preloader-bottom">
        <span>{phase === "loading" ? "LOADING" : "READY"}</span>
        <span>{phase === "loading" ? `${String(pct).padStart(2, "0")}%` : "WELCOME"}</span>
      </div>
    </div>
  );
}
