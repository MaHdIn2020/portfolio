// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink, useLocation } from "react-router";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: 1, text: "Home", to: "home" },
    { id: 2, text: "About", to: "about" },
    { id: 3, text: "Experience", to: "experience" },
    { id: 4, text: "Education", to: "education" },
    { id: 5, text: "Skills", to: "skills" },
    { id: 6, text: "Projects", to: "projects" },
    { id: 7, text: "Contact", to: "contact" },
  ];

  return (
    <nav
      aria-label="Main navigation"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? "rgba(10,10,18,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,229,255,0.12)" : "none",
        transition: "all 0.3s ease",
        padding: "0 24px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: "70px" }}>
        {/* Logo */}
        <RouterLink
          to="/"
          aria-label="Tanjip Surait Mahdin — Home"
          style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}
        >
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "1.4rem",
              color: "#00e5ff",
              letterSpacing: "-0.02em",
            }}
          >
            TSM
          </span>
          <span style={{ width: "1px", height: "20px", background: "rgba(0,229,255,0.3)" }} />
          <span style={{ fontSize: "0.8rem", color: "#94a3b8", fontWeight: 400 }}>Portfolio</span>
        </RouterLink>

        {/* Desktop nav */}
        <div style={{ display: "flex", alignItems: "center", gap: "28px" }} className="hidden md:flex">
          {navLinks.map(({ id, text, to }) =>
            isHome ? (
              <ScrollLink
                key={id}
                to={to}
                smooth={true}
                duration={500}
                offset={-70}
                className="nav-link"
                style={{ color: "#94a3b8", fontSize: "0.875rem", fontWeight: 500, cursor: "pointer", textDecoration: "none", transition: "color 0.3s" }}
                activeClass="active"
                onMouseEnter={(e) => (e.target.style.color = "#00e5ff")}
                onMouseLeave={(e) => (e.target.style.color = "#94a3b8")}
              >
                {text}
              </ScrollLink>
            ) : (
              <a
                key={id}
                href={`/#${to}`}
                className="nav-link"
                style={{ color: "#94a3b8", fontSize: "0.875rem", fontWeight: 500, textDecoration: "none" }}
                onMouseEnter={(e) => (e.target.style.color = "#00e5ff")}
                onMouseLeave={(e) => (e.target.style.color = "#94a3b8")}
              >
                {text}
              </a>
            )
          )}
          <a
            href="mailto:tanjip.surait.mahdin@gmail.com"
            className="btn-primary"
            aria-label="Send email to hire Tanjip"
            style={{ padding: "8px 20px", fontSize: "0.85rem" }}
          >
            Hire Me
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{ background: "none", border: "none", color: "#00e5ff", fontSize: "1.5rem", cursor: "pointer", display: "flex" }}
          className="md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            style={{
              background: "rgba(10,10,18,0.98)",
              backdropFilter: "blur(16px)",
              borderTop: "1px solid rgba(0,229,255,0.12)",
              padding: "16px 24px 24px",
            }}
            className="md:hidden"
          >
            {navLinks.map(({ id, text, to }) =>
              isHome ? (
                <ScrollLink
                  key={id}
                  to={to}
                  smooth={true}
                  duration={500}
                  offset={-70}
                  onClick={() => setIsOpen(false)}
                  style={{ display: "block", padding: "12px 0", color: "#94a3b8", fontSize: "1rem", fontWeight: 500, cursor: "pointer", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                >
                  {text}
                </ScrollLink>
              ) : (
                <a
                  key={id}
                  href={`/#${to}`}
                  onClick={() => setIsOpen(false)}
                  style={{ display: "block", padding: "12px 0", color: "#94a3b8", fontSize: "1rem", fontWeight: 500, textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                >
                  {text}
                </a>
              )
            )}
            <a
              href="mailto:tanjip.surait.mahdin@gmail.com"
              className="btn-primary"
              style={{ display: "inline-block", marginTop: "16px" }}
              onClick={() => setIsOpen(false)}
            >
              Hire Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
