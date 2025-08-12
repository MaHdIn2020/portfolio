// src/components/Contact.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { MdEmail, MdPhone, MdWhatsapp } from "react-icons/md";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const serviceID = "service_0jvjsyb";     // Replace with your EmailJS service ID
    const templateID = "template_u1xq09s";   // Replace with your EmailJS template ID
    const userID = "yt00LSJjV_bZpV8-P";           // Replace with your EmailJS user ID

emailjs.send(
  serviceID,
  templateID,
  {
    name: formData.name,
    email: formData.email,
    message: formData.message,
  },
  userID
)
      .then(
        () => {
          setStatus("Message sent successfully!");
          setFormData({ name: "", email: "", message: "" });
          setLoading(false);
        },
        (error) => {
          setStatus("Failed to send message. Please try again.");
          setLoading(false);
          console.error(error);
        }
      );
  };

  return (
    <section
      id="contact"
      className="bg-black text-white py-16 px-6 sm:px-12 w-full"
    >
      <motion.h2
        className="text-3xl font-bold mb-10 text-indigo-400 text-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Contact Me
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="flex items-center space-x-4">
            <MdEmail className="text-indigo-400 text-3xl" />
            <div>
              <p className="font-semibold">Email</p>
              <a
                href="mailto:your.email@example.com"
                className="text-gray-300 hover:text-indigo-400 transition-colors"
              >
                tanjip.surait.mahdin@gmail.com
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <MdPhone className="text-indigo-400 text-3xl" />
            <div>
              <p className="font-semibold">Phone</p>
              <a
                href="tel:+8801234567890"
                className="text-gray-300 hover:text-indigo-400 transition-colors"
              >
                +880 1639322453
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <MdWhatsapp className="text-indigo-400 text-3xl" />
            <div>
              <p className="font-semibold">WhatsApp</p>
              <a
                href="https://wa.me/8801322071271"
                target="_blank"
                rel="noreferrer"
                className="text-gray-300 hover:text-indigo-400 transition-colors"
              >
                +880 1322071271
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-6 bg-gray-900 p-8 rounded-lg shadow-lg"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            value={formData.name}
            onChange={handleChange}
            className="p-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
            disabled={loading}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="p-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
            disabled={loading}
          />
          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            required
            value={formData.message}
            onChange={handleChange}
            className="p-3 rounded-md bg-gray-800 text-white resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-md font-semibold transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
          {status && (
            <p className={`font-medium text-center mt-2 ${status.includes("successfully") ? "text-green-400" : "text-red-500"}`}>
              {status}
            </p>
          )}
        </form>
      </motion.div>
    </section>
  );
};

export default Contact;
