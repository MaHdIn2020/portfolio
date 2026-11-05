// src/components/Navbar.jsx
// Portfolio-style fixed header: brand, mono nav, availability dot.
import { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

const links = [
  { label: "About", to: "about" },
  { label: "Work", to: "work" },
  { label: "Research", to: "research" },
  { label: "Contact", to: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["home", "about", "work", "research", "contact"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <header
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 90,
        background: scrolled ? "rgba(8,8,13,0.82)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,229,255,0.12)" : "1px solid transparent",
        transition: "background .35s, border-color .35s",
      }}
    >
      <div style={{ maxWidth: "100%", padding: "0 var(--gutter)", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        <ScrollLink to="home" smooth duration={600} className="brand" style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 22, letterSpacing: "-0.05em", cursor: "pointer" }}>
          TS<span style={{ color: "var(--accent)" }}>M</span>
          <sup style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--accent)", marginLeft: 6 }}>®</sup>
        </ScrollLink>

        <nav aria-label="Main" style={{ display: "flex", alignItems: "center", gap: 28 }} className="nav-desktop">
          {links.map((l) => (
            <ScrollLink
              key={l.to}
              to={l.to}
              smooth
              duration={600}
              offset={-70}
              spy
              className={`nav-link${active === l.to ? " active" : ""}`}
              style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: active === l.to ? "var(--accent)" : "var(--muted)", cursor: "pointer" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = active === l.to ? "var(--accent)" : "var(--muted)")}
            >
              {l.label}{l.to === "work" && <sup style={{ marginLeft: 4, color: "var(--accent)" }}>09</sup>}
            </ScrollLink>
          ))}
          <a href="/resume.pdf" download className="nav-resume" style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "1px solid rgba(0,229,255,0.5)", color: "var(--accent)", padding: "8px 16px", borderRadius: 999, fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.06em" }}>
            Resume <span aria-hidden="true">↗</span>
          </a>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--mono)", fontSize: 11, color: "var(--muted)" }} className="nav-avail">
            <motion.span animate={{ scale: [1, 1.35, 1], opacity: [1, 0.6, 1] }} transition={{ repeat: Infinity, duration: 1.8 }} style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent)", display: "inline-block" }} />
            AVAILABLE
          </span>
        </nav>

        <button className="nav-burger" onClick={() => setOpen(!open)} aria-label="Toggle menu" style={{ background: "none", border: "none", color: "var(--accent)", fontSize: 22, display: "none" }}>
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {open && (
        <motion.nav initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} style={{ padding: "12px var(--gutter) 20px", background: "rgba(8,8,13,0.96)", backdropFilter: "blur(16px)", display: "flex", flexDirection: "column", gap: 14 }}>
          {links.map((l) => (
            <ScrollLink key={l.to} to={l.to} smooth duration={600} offset={-70} onClick={() => setOpen(false)} style={{ fontFamily: "var(--mono)", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "#e6edf2", cursor: "pointer" }}>
              {l.label}
            </ScrollLink>
          ))}
          <a href="/resume.pdf" download style={{ fontFamily: "var(--mono)", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)" }}>Resume ↗</a>
        </motion.nav>
      )}

      <style>{`
        @media (max-width: 860px) {
          .nav-desktop { display: none !important; }
          .nav-burger { display: block !important; }
        }
      `}</style>
    </header>
  );
}
