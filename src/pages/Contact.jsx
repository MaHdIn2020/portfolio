// src/pages/Contact.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMessageCircle, FiSend } from "react-icons/fi";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    emailjs
      .send(
        "service_0jvjsyb",
        "template_u1xq09s",
        { name: formData.name, email: formData.email, message: formData.message },
        "yt00LSJjV_bZpV8-P"
      )
      .then(
        () => {
          setStatus({ ok: true, msg: "Message sent successfully! I'll get back to you soon." });
          setFormData({ name: "", email: "", message: "" });
          setLoading(false);
        },
        (err) => {
          setStatus({ ok: false, msg: "Failed to send. Please try again or email me directly." });
          setLoading(false);
          console.error(err);
        }
      );
  };

  const contactInfo = [
    { icon: <FiMail size={20} />, label: "Email", value: "tanjip.surait.mahdin@gmail.com", href: "mailto:tanjip.surait.mahdin@gmail.com" },
    { icon: <FiPhone size={20} />, label: "Phone", value: "+880 1322 071271", href: "tel:+8801322071271" },
    { icon: <FiMessageCircle size={20} />, label: "WhatsApp", value: "+880 1322 071271", href: "https://wa.me/8801322071271" },
  ];

  return (
    <section id="contact" style={{ background: "#0d1117", padding: "100px 24px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "60px" }}
        >
          <p style={{ color: "#00e5ff", fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>
            Get in touch
          </p>
          <h2 className="section-heading cyan-underline" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#ffffff" }}>
            Contact Me
          </h2>
          <p style={{ color: "#94a3b8", marginTop: "16px", maxWidth: "480px", lineHeight: 1.7 }}>
            Have a project in mind or want to collaborate? Feel free to reach out — I usually respond within 24 hours.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "40px", alignItems: "start" }} className="contact-grid">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {contactInfo.map((info, i) => (
              <a
                key={i}
                href={info.href}
                target={info.label === "WhatsApp" ? "_blank" : undefined}
                rel="noreferrer"
                style={{ textDecoration: "none" }}
              >
                <motion.div
                  className="bento-card"
                  whileHover={{ y: -4, borderColor: "rgba(0,229,255,0.4)" }}
                  style={{ padding: "20px 24px", display: "flex", alignItems: "center", gap: "16px" }}
                >
                  <div style={{
                    width: "44px", height: "44px", borderRadius: "10px",
                    background: "rgba(0,229,255,0.1)", border: "1px solid rgba(0,229,255,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#00e5ff", flexShrink: 0,
                  }}>
                    {info.icon}
                  </div>
                  <div>
                    <p style={{ color: "#94a3b8", fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>
                      {info.label}
                    </p>
                    <p style={{ color: "#ffffff", fontSize: "0.88rem", fontWeight: 500 }}>{info.value}</p>
                  </div>
                </motion.div>
              </a>
            ))}
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bento-card"
            style={{ padding: "36px", display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {[
              { name: "name", type: "text", placeholder: "Your Name", required: true },
              { name: "email", type: "email", placeholder: "Your Email", required: true },
            ].map((field) => (
              <div key={field.name} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ color: "#94a3b8", fontSize: "0.78rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {field.placeholder}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  required={field.required}
                  value={formData[field.name]}
                  onChange={handleChange}
                  disabled={loading}
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "10px",
                    padding: "13px 16px",
                    color: "#ffffff",
                    fontSize: "0.9rem",
                    outline: "none",
                    transition: "border-color 0.3s",
                    fontFamily: "'Inter', sans-serif",
                  }}
                  onFocus={e => (e.target.style.borderColor = "rgba(0,229,255,0.5)")}
                  onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                />
              </div>
            ))}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ color: "#94a3b8", fontSize: "0.78rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Message
              </label>
              <textarea
                name="message"
                rows={5}
                placeholder="Your message..."
                required
                value={formData.message}
                onChange={handleChange}
                disabled={loading}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                  padding: "13px 16px",
                  color: "#ffffff",
                  fontSize: "0.9rem",
                  outline: "none",
                  resize: "vertical",
                  fontFamily: "'Inter', sans-serif",
                  transition: "border-color 0.3s",
                }}
                onFocus={e => (e.target.style.borderColor = "rgba(0,229,255,0.5)")}
                onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%", opacity: loading ? 0.7 : 1 }}
            >
              <FiSend size={16} />
              {loading ? "Sending..." : "Send Message"}
            </button>

            {status && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  padding: "12px 16px",
                  borderRadius: "10px",
                  background: status.ok ? "rgba(0,229,255,0.08)" : "rgba(239,68,68,0.08)",
                  border: `1px solid ${status.ok ? "rgba(0,229,255,0.3)" : "rgba(239,68,68,0.3)"}`,
                  color: status.ok ? "#00e5ff" : "#f87171",
                  fontSize: "0.85rem",
                  textAlign: "center",
                }}
              >
                {status.msg}
              </motion.div>
            )}
          </motion.form>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default Contact;
