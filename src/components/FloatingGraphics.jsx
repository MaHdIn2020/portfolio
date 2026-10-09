// src/components/FloatingGraphics.jsx
// Animated SVG code symbols + particle dots floating in the Hero background
import { motion } from "framer-motion";

const codeSymbols = [
  { symbol: "</>", x: "8%",  y: "20%", size: "1.1rem", delay: 0,    dur: 6 },
  { symbol: "{ }",  x: "88%", y: "15%", size: "1rem",   delay: 0.5,  dur: 7 },
  { symbol: "()",   x: "5%",  y: "70%", size: "0.9rem",  delay: 1,    dur: 8 },
  { symbol: "=>",   x: "92%", y: "60%", size: "0.95rem", delay: 1.5,  dur: 6.5 },
  { symbol: "[ ]",  x: "75%", y: "80%", size: "0.9rem",  delay: 0.8,  dur: 7.5 },
  { symbol: "&&",   x: "18%", y: "85%", size: "0.85rem", delay: 2,    dur: 9 },
  { symbol: "//",   x: "82%", y: "38%", size: "0.8rem",  delay: 1.2,  dur: 7 },
  { symbol: "fn()", x: "3%",  y: "42%", size: "0.78rem", delay: 0.3,  dur: 8.5 },
];

const orbData = [
  { w: 300, h: 300, x: "-5%",  y: "10%",  c: "rgba(0,229,255,0.06)", delay: 0    },
  { w: 200, h: 200, x: "80%",  y: "60%",  c: "rgba(0,184,204,0.05)", delay: 1    },
  { w: 150, h: 150, x: "50%",  y: "85%",  c: "rgba(0,229,255,0.04)", delay: 0.5  },
];

const FloatingGraphics = () => {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {/* Glowing orbs */}
      {orbData.map((orb, i) => (
        <motion.div
          key={`orb-${i}`}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 4 + i, ease: "easeInOut", delay: orb.delay }}
          style={{
            position: "absolute",
            left: orb.x, top: orb.y,
            width: orb.w, height: orb.h,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${orb.c} 0%, transparent 70%)`,
            filter: "blur(20px)",
          }}
        />
      ))}

      {/* Floating code symbols */}
      {codeSymbols.map((s, i) => (
        <motion.div
          key={`sym-${i}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: [0, 0.18, 0.12, 0.18, 0],
            y: [10, -10, 5, -8, 10],
          }}
          transition={{
            repeat: Infinity,
            duration: s.dur,
            delay: s.delay,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: s.x, top: s.y,
            fontFamily: "'Space Grotesk', monospace",
            fontSize: s.size,
            color: "#00e5ff",
            fontWeight: 700,
            letterSpacing: "0.05em",
            userSelect: "none",
            whiteSpace: "nowrap",
          }}
        >
          {s.symbol}
        </motion.div>
      ))}

      {/* Rising particle dots */}
      {[...Array(18)].map((_, i) => (
        <motion.div
          key={`dot-${i}`}
          style={{
            position: "absolute",
            bottom: 0,
            left: `${(i * 5.8) % 95}%`,
            width: i % 4 === 0 ? "3px" : "2px",
            height: i % 4 === 0 ? "3px" : "2px",
            borderRadius: "50%",
            background: i % 3 === 0 ? "#00e5ff" : "rgba(0,229,255,0.5)",
          }}
          animate={{
            y: [0, -(300 + (i % 5) * 80)],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 5 + (i % 4),
            delay: i * 0.4,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Animated corner bracket — top left */}
      <motion.svg
        width="80" height="80" viewBox="0 0 80 80"
        style={{ position: "absolute", top: "12%", left: "2%", opacity: 0.12 }}
        animate={{ opacity: [0.08, 0.2, 0.08] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      >
        <path d="M30 5 L5 5 L5 30" fill="none" stroke="#00e5ff" strokeWidth="3" strokeLinecap="round" />
        <path d="M50 75 L75 75 L75 50" fill="none" stroke="#00e5ff" strokeWidth="3" strokeLinecap="round" />
      </motion.svg>

      {/* Animated corner bracket — bottom right */}
      <motion.svg
        width="80" height="80" viewBox="0 0 80 80"
        style={{ position: "absolute", bottom: "18%", right: "2%", opacity: 0.1 }}
        animate={{ opacity: [0.06, 0.18, 0.06] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
      >
        <path d="M30 5 L5 5 L5 30" fill="none" stroke="#00e5ff" strokeWidth="3" strokeLinecap="round" />
        <path d="M50 75 L75 75 L75 50" fill="none" stroke="#00e5ff" strokeWidth="3" strokeLinecap="round" />
      </motion.svg>

      {/* Drifting horizontal scan line */}
      <motion.div
        animate={{ top: ["0%", "100%"] }}
        transition={{ repeat: Infinity, duration: 8, ease: "linear", delay: 2 }}
        style={{
          position: "absolute",
          left: 0, right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(0,229,255,0.12), transparent)",
          pointerEvents: "none",
        }}
      />

      {/* Small geometric diamond shapes */}
      {[
        { x: "15%", y: "30%", delay: 0 },
        { x: "85%", y: "25%", delay: 1.5 },
        { x: "70%", y: "72%", delay: 0.8 },
      ].map((d, i) => (
        <motion.div
          key={`diamond-${i}`}
          animate={{ rotate: [0, 360], opacity: [0.08, 0.2, 0.08] }}
          transition={{ repeat: Infinity, duration: 8 + i * 2, ease: "linear", delay: d.delay }}
          style={{
            position: "absolute",
            left: d.x, top: d.y,
            width: "10px", height: "10px",
            border: "1.5px solid rgba(0,229,255,0.4)",
            transform: "rotate(45deg)",
          }}
        />
      ))}
    </div>
  );
};

export default FloatingGraphics;
