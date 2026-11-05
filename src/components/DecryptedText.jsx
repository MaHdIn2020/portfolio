// src/components/DecryptedText.jsx
// Scramble-reveal text. Hover / view triggers.
import { useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+";

export default function DecryptedText({
  text,
  animateOn = "hover",
  speed = 55,
  maxIterations = 10,
  sequential = false,
  revealDirection = "start",
  loop = false,
  loopDelay = 2000,
  clickMode,
  encryptedClassName = "",
  revealedClassName = "",
  characters = DEFAULT_CHARS,
  className = "",
  parentClassName = "",
}) {
  const [display, setDisplay] = useState(() => Array.from(text));
  const [revealed, setRevealed] = useState(false);
  const tokensRef = useRef(Array.from(text).map((ch) => ({ ch, space: ch === " ", encrypted: false })));
  const rafRef = useRef(0);
  const loopTimerRef = useRef(null);
  const hostRef = useRef(null);
  const revealRef = useRef(0);
  const hoveringRef = useRef(false);
  const loopRef = useRef(loop);
  loopRef.current = loop;
  const speedRef = useRef(speed); speedRef.current = speed;
  const charsRef = useRef(characters); charsRef.current = characters;
  const maxIterRef = useRef(maxIterations); maxIterRef.current = maxIterations;

  useEffect(() => {
    tokensRef.current = Array.from(text).map((ch) => ({ ch, space: ch === " ", encrypted: false }));
    setDisplay(Array.from(text));
    setRevealed(false);
  }, [text]);

  const pick = useCallback(() => charsRef.current[Math.floor(Math.random() * charsRef.current.length)], []);

  const scramble = useCallback(() => {
    const tokens = tokensRef.current;
    cancelAnimationFrame(rafRef.current);
    clearTimeout(loopTimerRef.current);
    tokens.forEach((t) => { if (!t.space) t.encrypted = true; });
    setRevealed(false);
    revealRef.current = revealDirection === "end" ? tokens.length - 1 : 0;
    const dir = revealDirection === "end" ? -1 : 1;
    let counter = 0;
    let last = 0;
    const step = (ts) => {
      if (ts - last >= speedRef.current) {
        last = ts;
        counter++;
        setDisplay(tokens.map((t) => (t.space ? " " : t.encrypted ? pick() : t.ch)));
        if (counter >= maxIterRef.current) {
          counter = 0;
          const idx = revealRef.current;
          if (idx >= 0 && idx < tokens.length && !tokens[idx].space) tokens[idx].encrypted = false;
          revealRef.current += dir;
          if (sequential) { /* reveal faster in sequential */ }
        }
      }
      if (tokens.some((t) => t.encrypted)) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setDisplay(tokens.map((t) => t.ch));
        setRevealed(true);
        if (loopRef.current && !hoveringRef.current) {
          loopTimerRef.current = setTimeout(() => scramble(), loopDelay);
        }
      }
    };
    rafRef.current = requestAnimationFrame(step);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revealDirection, sequential, pick, loopDelay]);

  useEffect(() => {
    if (animateOn !== "view" && animateOn !== "both") return;
    const node = hostRef.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          scramble();
          if (animateOn === "view") obs.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [animateOn, scramble]);

  useEffect(() => () => { cancelAnimationFrame(rafRef.current); clearTimeout(loopTimerRef.current); }, []);

  const interactive = animateOn === "hover" || animateOn === "both" || clickMode === "once";

  return (
    <span
      ref={hostRef}
      aria-label={text}
      className={`${parentClassName} ${className}`.trim()}
      onMouseEnter={interactive && animateOn !== "view" ? () => { hoveringRef.current = true; scramble(); } : undefined}
      onMouseLeave={interactive ? () => { hoveringRef.current = false; } : undefined}
      onClick={clickMode === "once" ? scramble : undefined}
    >
      <span aria-hidden="true">
        {tokensRef.current.map((t, i) => (
          <span key={i} className={t.space ? undefined : revealed ? (revealedClassName || className) : (encryptedClassName || className)}>
            {t.space ? " " : display[i] ?? t.ch}
          </span>
        ))}
      </span>
      <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap" }}>{text}</span>
    </span>
  );
}
