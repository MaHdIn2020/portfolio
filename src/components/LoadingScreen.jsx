// src/components/LoadingScreen.jsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const letters = ["T", "S", "M"];

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("enter"); // enter | exit

  useEffect(() => {
    // Progress bar fills over 3 seconds
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 1;
      });
    }, 30);

    // Trigger exit after 3.4s
    const exitTimer = setTimeout(() => setPhase("exit"), 3400);

    // Tell parent we're done after exit animation completes
    const doneTimer = setTimeout(() => onComplete(), 4200);

    return () => {
      clearInterval(interval);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase === "enter" && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            overflow: "hidden",
            pointerEvents: "all",
          }}
        >
          {/* TOP PANEL */}
          <motion.div
            key="top-panel"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0 }}
            style={{
              position: "absolute",
              top: 0, left: 0, right: 0,
              height: "50%",
              background: "#0a0a12",
              zIndex: 2,
            }}
          />
          {/* BOTTOM PANEL */}
          <motion.div
            key="bottom-panel"
            initial={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0 }}
            style={{
              position: "absolute",
              bottom: 0, left: 0, right: 0,
              height: "50%",
              background: "#0a0a12",
              zIndex: 2,
            }}
          />

          {/* FULL CONTENT LAYER */}
          <motion.div
            key="content"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "#0a0a12",
              zIndex: 3,
            }}
          >
            {/* Animated grid background */}
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: "linear-gradient(rgba(0,229,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.04) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
              opacity: 0.6,
            }} />

            {/* Pulsing glow blob behind letters */}
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              style={{
                position: "absolute",
                width: "300px", height: "300px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(0,229,255,0.18) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

            {/* Rotating arc ring */}
            <motion.svg
              width="180" height="180"
              viewBox="0 0 180 180"
              style={{ position: "absolute" }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            >
              <circle cx="90" cy="90" r="80" fill="none" stroke="rgba(0,229,255,0.08)" strokeWidth="1" />
              <motion.circle
                cx="90" cy="90" r="80"
                fill="none"
                stroke="#00e5ff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="100 402"
                initial={{ strokeDashoffset: 0 }}
              />
            </motion.svg>

            {/* Counter-rotating inner ring */}
            <motion.svg
              width="130" height="130"
              viewBox="0 0 130 130"
              style={{ position: "absolute" }}
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
            >
              <motion.circle
                cx="65" cy="65" r="58"
                fill="none"
                stroke="rgba(0,229,255,0.2)"
                strokeWidth="1"
                strokeLinecap="round"
                strokeDasharray="40 324"
              />
            </motion.svg>

            {/* TSM Letters */}
            <div style={{ display: "flex", gap: "16px", position: "relative", zIndex: 5 }}>
              {letters.map((letter, i) => (
                <motion.span
                  key={letter}
                  initial={{ opacity: 0, y: -40, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.6, ease: "easeOut" }}
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 900,
                    fontSize: "3.5rem",
                    color: i === 1 ? "#00e5ff" : "#ffffff",
                    letterSpacing: "-0.02em",
                    textShadow: i === 1 ? "0 0 30px rgba(0,229,255,0.8)" : "none",
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Horizontal line expand */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "200px" }}
              transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
              style={{
                height: "1px",
                background: "linear-gradient(90deg, transparent, #00e5ff, transparent)",
                marginTop: "12px",
                marginBottom: "16px",
                position: "relative", zIndex: 5,
              }}
            />

            {/* Name typing */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              style={{ position: "relative", zIndex: 5, textAlign: "center" }}
            >
              <p style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: "1.1rem",
                color: "#ffffff",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}>
                Tanjip Surait Mahdin
              </p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.4 }}
              style={{
                marginTop: "40px",
                width: "200px",
                position: "relative", zIndex: 5,
              }}
            >
              <div style={{
                height: "2px",
                background: "rgba(255,255,255,0.07)",
                borderRadius: "2px",
                overflow: "hidden",
              }}>
                <motion.div
                  style={{
                    height: "100%",
                    background: "linear-gradient(90deg, #00e5ff, #0891b2)",
                    borderRadius: "2px",
                    width: `${progress}%`,
                    boxShadow: "0 0 10px rgba(0,229,255,0.6)",
                  }}
                />
              </div>
              <div style={{
                display: "flex", justifyContent: "space-between",
                marginTop: "8px",
              }}>
                <span style={{ color: "#94a3b8", fontSize: "0.65rem", letterSpacing: "0.1em" }}>
                  LOADING
                </span>
                <span style={{ color: "#00e5ff", fontSize: "0.65rem", fontWeight: 700, fontFamily: "monospace" }}>
                  {progress}%
                </span>
              </div>
            </motion.div>

            {/* Floating particles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                style={{
                  position: "absolute",
                  width: i % 3 === 0 ? "4px" : "2px",
                  height: i % 3 === 0 ? "4px" : "2px",
                  borderRadius: "50%",
                  background: "#00e5ff",
                  left: `${10 + (i * 7.5) % 80}%`,
                  bottom: "10%",
                  opacity: 0.4,
                }}
                animate={{
                  y: [0, -(100 + i * 20)],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2 + i * 0.3,
                  delay: i * 0.25,
                  ease: "easeOut",
                }}
              />
            ))}

            {/* Welcome text at bottom */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.6 }}
              style={{
                position: "absolute",
                bottom: "32px",
                color: "#475569",
                fontSize: "0.72rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontWeight: 500,
                zIndex: 5,
              }}
            >
              Welcome to my portfolio
            </motion.p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
