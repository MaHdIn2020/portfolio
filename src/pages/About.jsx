// src/pages/About.jsx
import { motion } from "framer-motion";

// TODO(Tanjip): edit this paragraph in your own words when you're happy with the content
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

        {/* Single paragraph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bento-card"
          style={{ padding: "40px", maxWidth: "780px" }}
        >
          <p style={{ color: "#cbd5e1", lineHeight: 1.85, fontSize: "1.05rem" }}>
            I&apos;m Tanjip, a CSE graduate from BRAC University in Dhaka. I build web apps
            and train ML models, and I teach coding at Codingal, where I&apos;ve worked with 50+
            students. My thesis is about physics tutoring for Class 9–10 students in Bangladesh.
            I like projects where a model ends up inside something a person can actually click.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
