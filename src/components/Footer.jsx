// src/components/Footer.jsx
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";

const Footer = () => {
  const socials = [
    { icon: <FaGithub />, href: "https://github.com/MaHdIn2020", label: "GitHub" },
    { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/tanjip-surait-mahdin/", label: "LinkedIn" },
    { icon: <FaFacebook />, href: "https://www.facebook.com/tanjip.mahdin", label: "Facebook" },
  ];

  return (
    <footer style={{
      background: "#0a0a12",
      borderTop: "1px solid rgba(0,229,255,0.1)",
      padding: "40px 24px",
    }}>
      <div style={{
        maxWidth: "1200px", margin: "0 auto",
        display: "flex", flexWrap: "wrap",
        alignItems: "center", justifyContent: "space-between", gap: "24px",
      }}>
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#00e5ff", marginBottom: "4px" }}>
            Tanjip Surait Mahdin
          </p>
          <p style={{ color: "#94a3b8", fontSize: "0.82rem" }}>
            Full Stack Developer · Coding Instructor
          </p>
          <p style={{ color: "#475569", fontSize: "0.76rem", marginTop: "8px" }}>
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </motion.div>

        {/* Right — Social icons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{ display: "flex", gap: "16px", alignItems: "center" }}
        >
          {socials.map((s, i) => (
            <motion.a
              key={i}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              whileHover={{ y: -4, scale: 1.15 }}
              style={{
                width: "40px", height: "40px",
                borderRadius: "10px",
                background: "rgba(0,229,255,0.06)",
                border: "1px solid rgba(0,229,255,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#94a3b8", fontSize: "1.1rem",
                textDecoration: "none",
                transition: "color 0.3s, border-color 0.3s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = "#00e5ff";
                e.currentTarget.style.borderColor = "rgba(0,229,255,0.4)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = "#94a3b8";
                e.currentTarget.style.borderColor = "rgba(0,229,255,0.15)";
              }}
            >
              {s.icon}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
