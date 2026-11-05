// src/components/Preloader.jsx
// Flow: 0→100% loading → ONE merged welcome+quote screen (7s countdown) → site.
// Big "Welcome / Happy exploring." on top, fresh quote directly underneath.
// No separate welcome page, no button, no keyboard gate — auto-enters after timer.
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { generateQuote } from "../data/quoteGenerator";

const QUOTE_SECONDS = 7;

export default function Preloader({ onDone }) {
  const [phase, setPhase] = useState("loading"); // loading → welcomeQuote → done
  const [progress, setProgress] = useState(0);
  const [quote, setQuote] = useState(null);
  const [countdown, setCountdown] = useState(QUOTE_SECONDS);
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
          setQuote(generateQuote());
          setCountdown(QUOTE_SECONDS);
          setPhase("welcomeQuote");
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

  const finishAll = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    setPhase("done");
    onDone?.();
  }, [onDone]);

  // Countdown 7→0 on the merged screen
  useEffect(() => {
    if (phase !== "welcomeQuote") return;
    if (reduced.current) {
      const t = setTimeout(finishAll, 1200);
      return () => clearTimeout(t);
    }
    const iv = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(iv);
          finishAll();
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(iv);
  }, [phase, finishAll, reduced]);

  if (phase === "done") return null;
  const pct = phase !== "loading" ? 100 : progress;
  const ringSize = 56;
  const ringStroke = 3;
  const ringR = (ringSize - ringStroke) / 2;
  const ringC = 2 * Math.PI * ringR;
  const ringOffset = ringC * (1 - (QUOTE_SECONDS - countdown) / QUOTE_SECONDS);

  return (
    <div
      className="preloader"
      role="status"
      aria-label="Portfolio loading"
      aria-busy={phase !== "done"}
    >
      <div className="preloader-top">
        <span>TANJIP SURAIT MAHDIN</span>
        <span>PORTFOLIO — 2026</span>
      </div>

      <div className="preloader-center">
        <AnimatePresence mode="wait">
          {phase === "loading" && (
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
          )}

          {phase === "welcomeQuote" && quote && (
            <motion.div
              key="welcomeQuote"
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -14, filter: "blur(4px)" }}
              transition={{ duration: 0.6, ease: [0.22, 0.8, 0.3, 1] }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0, textAlign: "center", maxWidth: 680, padding: "0 20px", width: "100%" }}
            >
              {/* — Welcome block — */}
              <p className="preloader-hint" style={{ color: "var(--accent)", margin: "0 0 12px" }}>✳ WELCOME</p>
              <h2 className="display-title" style={{ fontSize: "clamp(56px, 8vw, 96px)", margin: 0, color: "#fff", letterSpacing: "-0.05em", lineHeight: 0.92 }}>
                Happy<br />
                <span style={{ color: "var(--accent)" }}>exploring.</span>
              </h2>
              <p style={{ color: "var(--muted)", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.14em", margin: "14px 0 0" }}>
                FULL-STACK · ML · RESEARCH · TEACHING
              </p>

              {/* — Divider — */}
              <div style={{ width: "min(420px, 70vw)", height: 1, background: "linear-gradient(90deg, transparent, rgba(0,229,255,0.5), transparent)", margin: "26px 0" }} aria-hidden="true" />

              {/* — Quote block — */}
              <p className="preloader-hint" style={{ color: "var(--accent)", margin: "0 0 12px" }}>
                ✦ {quote.theme} · FRESH QUOTE
              </p>
              <blockquote style={{ margin: 0 }}>
                <p style={{ fontFamily: "var(--display)", fontSize: "clamp(20px, 3vw, 30px)", lineHeight: 1.4, fontWeight: 600, letterSpacing: "-0.02em", color: "#fff", margin: 0 }}>
                  “{quote.text}”
                </p>
                <cite style={{ display: "block", fontFamily: "var(--mono)", fontStyle: "normal", fontSize: 12, letterSpacing: "0.14em", color: "var(--muted)", marginTop: 12 }}>
                  — {quote.author.toUpperCase()}
                </cite>
              </blockquote>

              {/* — Countdown + skip — */}
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 26 }}>
                <div style={{ position: "relative", width: ringSize, height: ringSize }} role="timer" aria-label={`Entering site in ${countdown} seconds`}>
                  <svg width={ringSize} height={ringSize} viewBox={`0 0 ${ringSize} ${ringSize}`} aria-hidden="true">
                    <circle cx={ringSize / 2} cy={ringSize / 2} r={ringR} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={ringStroke} />
                    <circle
                      cx={ringSize / 2} cy={ringSize / 2} r={ringR} fill="none"
                      stroke="var(--accent)" strokeWidth={ringStroke} strokeLinecap="round"
                      strokeDasharray={ringC} strokeDashoffset={ringOffset}
                      transform={`rotate(-90 ${ringSize / 2} ${ringSize / 2})`}
                      style={{ transition: "stroke-dashoffset 1s linear" }}
                    />
                  </svg>
                  <span style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", fontFamily: "var(--mono)", fontSize: 14, fontWeight: 600, color: "#fff" }}>
                    {countdown}
                  </span>
                </div>
                <div style={{ textAlign: "left" }}>
                  <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.14em", color: "var(--muted)", margin: 0 }}>
                    ENTERING IN {countdown}…
                  </p>
                  <button
                    type="button"
                    onClick={finishAll}
                    style={{ marginTop: 8, fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.14em", color: "var(--accent)", border: "1px solid rgba(0,229,255,0.4)", background: "none", padding: "8px 14px", borderRadius: 999, cursor: "pointer" }}
                  >
                    SKIP →
                  </button>
                </div>
              </div>

              <div className="preloader-bar" style={{ width: "min(420px, 70vw)", marginTop: 16 }} aria-hidden="true">
                <i style={{ transform: `scaleX(${(QUOTE_SECONDS - countdown) / QUOTE_SECONDS})` }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="preloader-bottom">
        <span>{phase === "loading" ? "LOADING" : "WELCOME"}</span>
        <span>{phase === "loading" ? `${String(pct).padStart(2, "0")}%` : `ENTERING ${countdown}…`}</span>
      </div>
    </div>
  );
}
