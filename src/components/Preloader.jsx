// src/components/Preloader.jsx
// Portfolio-style loader: big counter, progress bar, press ENTER / click to enter.
import { useEffect, useRef, useState } from "react";

export default function Preloader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [visible, setVisible] = useState(true);
  const startRef = useRef(performance.now());
  const reduced = useRef(typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    return () => { document.documentElement.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const start = startRef.current;
    const duration = reduced.current ? 0 : 1500;
    let raf = 0;
    let loaded = document.readyState === "complete";
    const onLoad = () => { loaded = true; };
    if (!loaded) window.addEventListener("load", onLoad, { once: true });

    const tick = (now) => {
      const elapsed = now - start;
      const p = duration === 0 ? 100 : Math.min(99, Math.floor((elapsed / duration) * 100));
      setProgress(p);
      if (duration !== 0 && elapsed < duration) {
        raf = requestAnimationFrame(tick);
      } else {
        // wait for load before finishing
        const finish = () => {
          setProgress(100);
          setReady(true);
        };
        if (loaded) finish();
        else {
          const iv = setInterval(() => {
            if (loaded) { clearInterval(iv); finish(); }
          }, 120);
          setTimeout(() => { clearInterval(iv); finish(); }, 3000);
        }
      }
    };
    if (reduced.current) { setProgress(100); setReady(true); }
    else raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("load", onLoad); };
  }, []);

  useEffect(() => {
    if (!ready) return;
    const onKey = (e) => {
      if (e.repeat) return;
      if (e.key === "Enter" || e.code === "Space") { e.preventDefault(); enter(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  const enter = () => {
    if (!ready || exiting) return;
    setExiting(true);
  };

  useEffect(() => {
    if (!exiting) return;
    const t = setTimeout(() => { setVisible(false); onDone?.(); }, reduced.current ? 0 : 750);
    return () => clearTimeout(t);
  }, [exiting, onDone, reduced]);

  if (!visible) return null;

  const pct = ready ? 100 : progress;

  return (
    <div
      className={`preloader${exiting || !visible ? " is-done" : ""}`}
      role="status"
      aria-label="Portfolio loading"
      onClick={enter}
      onKeyDown={(e) => { if (e.key === "Enter") enter(); }}
    >
      <div className="preloader-top">
        <span>TANJIP SURAIT MAHDIN</span>
        <span>PORTFOLIO — 2026</span>
      </div>

      <div className="preloader-center">
        <div className="preloader-count">
          {String(pct).padStart(2, "0")}
          <sup>%</sup>
        </div>
        <div className="preloader-bar" aria-hidden="true"><i style={{ transform: `scaleX(${pct / 100})` }} /></div>
        {ready ? (
          <button type="button" className="preloader-hint" onClick={enter} style={{ background: "none", border: "none" }}>
            Click to Enter ↗
          </button>
        ) : (
          <div className="preloader-hint">{pct < 100 ? "Loading Portfolio" : "System Ready"}</div>
        )}
      </div>

      <div className="preloader-bottom">
        <span>{ready ? "SYSTEM READY" : "LOADING"}</span>
        <span>{ready ? "PRESS ENTER" : `${String(pct).padStart(2, "0")}%`}</span>
      </div>
    </div>
  );
}
