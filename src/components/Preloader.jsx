// src/components/Preloader.jsx
// Flow: 0→100% loading → Welcome → Fresh AI quote (7s countdown) → site.
// No button, no keyboard gate — auto-enters after timer. Skip button for impatient visitors.
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { generateQuote } from "../data/quoteGenerator";

const QUOTE_SECONDS = 7;

export default function Preloader({ onDone }) {
  const [phase, setPhase] = useState("loading"); // loading → welcome → quote → done
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

  const finishAll = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    setPhase("done");
    onDone?.();
  }, [onDone]);

  // Welcome → generate quote → quote phase
  useEffect(() => {
    if (phase !== "welcome") return;
    const t = setTimeout(() => {
      setQuote(generateQuote());
      setCountdown(QUOTE_SECONDS);
      setPhase("quote");
    }, reduced.current ? 600 : 1600);
    return () => clearTimeout(t);
  }, [phase, reduced]);

  // Quote countdown 7→0, then enter site
  useEffect(() => {
    if (phase !== "quote") return;
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
  const ringSize = 64;
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

          {phase === "welcome" && (
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

          {phase === "quote" && quote && (
            <motion.div
              key="quote"
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -14, filter: "blur(4px)" }}
              transition={{ duration: 0.55, ease: [0.22, 0.8, 0.3, 1] }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, textAlign: "center", maxWidth: 640, padding: "0 20px" }}
            >
              <p className="preloader-hint" style={{ color: "var(--accent)", margin: 0 }}>
                ✦ {quote.theme} · FRESH QUOTE
              </p>

              <blockquote style={{ margin: 0 }}>
                <p style={{ fontFamily: "var(--display)", fontSize: "clamp(22px, 3.4vw, 34px)", lineHeight: 1.35, fontWeight: 600, letterSpacing: "-0.02em", color: "#fff", margin: 0 }}>
                  “{quote.text}”
                </p>
                <cite style={{ display: "block", fontFamily: "var(--mono)", fontStyle: "normal", fontSize: 12, letterSpacing: "0.14em", color: "var(--muted)", marginTop: 14 }}>
                  — {quote.author.toUpperCase()}
                </cite>
              </blockquote>

              {/* Countdown ring */}
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 8 }}>
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

              <div className="preloader-bar" style={{ width: "min(420px, 70vw)", marginTop: 6 }} aria-hidden="true">
                <i style={{ transform: `scaleX(${(QUOTE_SECONDS - countdown) / QUOTE_SECONDS})` }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="preloader-bottom">
        <span>{phase === "loading" ? "LOADING" : phase === "welcome" ? "READY" : "QUOTE"}</span>
        <span>{phase === "loading" ? `${String(pct).padStart(2, "0")}%` : phase === "welcome" ? "WELCOME" : `ENTERING ${countdown}…`}</span>
      </div>
    </div>
  );
}
