// src/pages/About.jsx
import { motion } from "framer-motion";
import { FiTarget, FiCode, FiHeart } from "react-icons/fi";

const cards = [
  {
    icon: <FiTarget size={22} />,
    title: "Professional Focus",
    body: "I specialize in building responsive, scalable web applications using modern full-stack technologies. My work blends clean design with efficient code — ensuring both great user experience and solid performance.",
  },
  {
    icon: <FiCode size={22} />,
    title: "Programming Journey",
    body: "My passion for software started with HTML, CSS and JavaScript and grew into full-stack mastery with the MERN stack. I'm continuously expanding into AI, machine learning, and cloud technologies — always leveling up.",
  },
  {
    icon: <FiHeart size={22} />,
    title: "Beyond the Code",
    body: "I believe balance drives creativity. Outside of coding, I enjoy staying active, exploring new technologies, and applying what I learn to real-world projects. These habits keep me sharp and motivated.",
  },
];

const About = () => {
  return (
    <section
      id="about"
      style={{
        background: "#0d1117",
        padding: "100px 24px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "60px" }}
        >
          <p style={{ color: "#00e5ff", fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>
            Get to know me
          </p>
          <h2
            className="section-heading cyan-underline"
            style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#ffffff" }}
          >
            About Me
          </h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}
        >
          {cards.map((card, i) => (
            <motion.div
              key={i}
              className="bento-card"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              whileHover={{ y: -6 }}
              style={{ padding: "32px" }}
            >
              {/* Icon */}
              <div style={{
                width: "48px", height: "48px", borderRadius: "12px",
                background: "rgba(0,229,255,0.1)", border: "1px solid rgba(0,229,255,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#00e5ff", marginBottom: "20px",
              }}>
                {card.icon}
              </div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#ffffff", marginBottom: "12px" }}>
                {card.title}
              </h3>
              <p style={{ color: "#94a3b8", lineHeight: 1.75, fontSize: "0.92rem" }}>
                {card.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
