// src/components/TypeWriter.jsx
// Cycles through an array of strings with a typewriter + delete effect
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TypeWriter = ({ words = [], speed = 80, pause = 1800, deleteSpeed = 45 }) => {
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    let timeout;

    if (!isDeleting && displayText === current) {
      // Finished typing — pause then start deleting
      timeout = setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && displayText === "") {
      // Finished deleting — move to next word
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    } else {
      const delta = isDeleting
        ? deleteSpeed
        : displayText.length < current.length ? speed : speed;

      timeout = setTimeout(() => {
        setDisplayText(
          isDeleting
            ? current.slice(0, displayText.length - 1)
            : current.slice(0, displayText.length + 1)
        );
      }, delta);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, wordIndex, words, speed, pause, deleteSpeed]);

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "2px" }}>
      <span style={{ color: "#00e5ff", fontWeight: 600 }}>{displayText}</span>
      {/* Blinking cursor */}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        style={{
          display: "inline-block",
          width: "2px",
          height: "1.1em",
          background: "#00e5ff",
          marginLeft: "2px",
          verticalAlign: "middle",
          borderRadius: "1px",
        }}
      />
    </span>
  );
};

export default TypeWriter;
