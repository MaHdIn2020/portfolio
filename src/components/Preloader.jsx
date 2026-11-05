// src/components/Preloader.jsx
// Flow: thin top progress line + side-by-side quote card → site.
// Distinct layout: split card, no centered giant %, no top mono header rows.
// Welcome phrase sits inside the card above the fresh quote; 7s countdown below.
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { generateQuote } from "../data/quoteGenerator";

const QUOTE_SECONDS = 7;

const TICK_WORDS = ["WARMING UP LINES…", "LOADING PIXELS…", "ALIGNING GRID…", "POURING COFFEE…", "ALMOST THERE…"];

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
  const tickIndex = Math.min(TICK_WORDS.length - 1, Math.floor((pct / 100) * TICK_WORDS.length));

  return (
    <div className="preloader" role="status" aria-label="Portfolio loading" aria-busy={phase !== "done"}>
      {/* Progress strip — pinned to top edge */}
      <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "rgba(255,255,255,0.08)" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: "var(--accent)", transition: "width .18s linear" }} />
      </div>

      <AnimatePresence mode="wait">
        {phase === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.985 }}
            transition={{ duration: 0.45, ease: [0.22, 0.8, 0.3, 1] }}
            style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "56px var(--gutter) 48px" }}
          >
            {/* Brand — centred initials, no mono rows */}
            <div style={{ textAlign: "center" }}>
              <p className="display-title" style={{ fontSize: "clamp(44px, 6vw, 72px)", margin: 0, color: "#fff", letterSpacing: "-0.05em", lineHeight: 1 }}>
                TSM
                <span style={{ color: "var(--accent)", fontSize: "0.35em", verticalAlign: "super", marginLeft: 6 }}>®</span>
              </p>
              <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.2em", color: "var(--muted)", marginTop: 10 }}>
                FULL-STACK · ML · RESEARCH · TEACHING
              </p>
            </div>

            {/* Pill + percent + tick */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
              <div
                aria-hidden="true"
                style={{
                  width: "min(340px, 70vw)", height: 44, borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.18)", overflow: "hidden", position: "relative",
                }}
              >
                <div style={{
                  width: `${pct}%`, height: "100%", borderRadius: 999,
                  background: "linear-gradient(90deg, rgba(0,229,255,0.25), var(--accent))",
                  transition: "width .18s linear",
                }} />
                <span style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", fontFamily: "var(--mono)", fontSize: 12, letterSpacing: "0.14em", color: "#fff", fontVariantNumeric: "tabular-nums" }}>
                  {pct}%
                </span>
              </div>
              <p style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.18em", color: "var(--muted)", margin: 0 }}>
                {TICK_WORDS[tickIndex]}
              </p>
            </div>
          </motion.div>
        )}

        {phase === "welcomeQuote" && quote && (
          <motion.div
            key="welcomeQuote"
            initial={{ opacity: 0, y: 20, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.985 }}
            transition={{ duration: 0.55, ease: [0.22, 0.8, 0.3, 1] }}
            style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "32px var(--gutter)" }}
          >
            <div style={{
              width: "min(620px, 100%)",
              border: "1px solid rgba(255,255,255,0.14)",
              background: "linear-gradient(160deg, rgba(0,229,255,0.07), rgba(255,255,255,0.015) 55%)",
              borderRadius: 20,
              padding: "clamp(28px, 4vw, 44px)",
              textAlign: "left",
              boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 30, height: 30, borderRadius: "50%", background: "var(--accent)", color: "#001318", display: "grid", placeItems: "center", fontWeight: 800, fontSize: 14, fontFamily: "var(--display)" }}>T</span>
                <span style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.16em", color: "var(--muted)" }}>GREETINGS FROM TANJIP</span>
              </div>

              <h2 className="display-title" style={{ fontSize: "clamp(34px, 5vw, 58px)", margin: "18px 0 0", color: "#fff", letterSpacing: "-0.04em", lineHeight: 0.95 }}>
                Good to see you.
              </h2>

              <div style={{ width: "100%", height: 1, background: "linear-gradient(90deg, rgba(0,229,255,0.45), transparent)", margin: "22px 0" }} aria-hidden="true" />

              <p style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.18em", color: "var(--accent)", margin: "0 0 10px" }}>
                ✦ {quote.theme}
              </p>
              <blockquote style={{ margin: 0 }}>
                <p style={{ fontFamily: "var(--display)", fontSize: "clamp(20px, 2.8vw, 28px)", lineHeight: 1.4, fontWeight: 600, letterSpacing: "-0.02em", color: "#fff", margin: 0 }}>
                  “{quote.text}”
                </p>
                <cite style={{ display: "block", fontFamily: "var(--mono)", fontStyle: "normal", fontSize: 11, letterSpacing: "0.14em", color: "var(--muted)", marginTop: 12 }}>
                  — {quote.author.toUpperCase()}
                </cite>
              </blockquote>

              <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 26, flexWrap: "wrap" }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--muted)", fontVariantNumeric: "tabular-nums" }} role="timer" aria-label={`Entering site in ${countdown} seconds`}>
                  Entering in <strong style={{ color: "#fff" }}>{countdown}…</strong>
                </span>
                <span style={{ flex: 1, minWidth: 120, height: 3, background: "rgba(255,255,255,0.12)", borderRadius: 3, overflow: "hidden" }} aria-hidden="true">
                  <span style={{ display: "block", height: "100%", width: `${((QUOTE_SECONDS - countdown) / QUOTE_SECONDS) * 100}%`, background: "var(--accent)", transition: "width 1s linear" }} />
                </span>
                <button
                  type="button"
                  onClick={finishAll}
                  style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.14em", color: "var(--accent)", border: "1px solid rgba(0,229,255,0.4)", background: "none", padding: "9px 16px", borderRadius: 999, cursor: "pointer" }}
                >
                  SKIP →
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
