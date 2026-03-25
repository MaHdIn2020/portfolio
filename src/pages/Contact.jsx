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

    const serviceID = "service_0jvjsyb";
    const templateID = "template_u1xq09s";
    const userID = "yt00LSJjV_bZpV8-P";

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
      className="bg-[#5C94FC] text-white py-16 px-6 sm:px-12 w-full"
    >
      <motion.h2
        className="text-3xl font-bold mb-10 text-[#FBD000] pixel-text text-center drop-shadow-[3px_3px_0_#000]"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Contact Player 1
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto items-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Contact Info */}
        <div className="space-y-8 bg-white text-black p-8 pixel-border bg-[url('https://i.imgur.com/3qV9Y0J.png')] bg-[length:20px] bg-repeat">
          <div className="flex items-center space-x-4 bg-white/90 p-3 pixel-border">
            <MdEmail className="text-[#E52521] text-4xl" />
            <div>
              <p className="font-bold pixel-text text-xs uppercase mb-1">Email</p>
              <a
                href="mailto:your.email@example.com"
                className="text-black font-bold hover:text-[#E52521] transition-colors"
              >
                tanjip.surait.mahdin@gmail.com
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-4 bg-white/90 p-3 pixel-border">
            <MdPhone className="text-[#43B047] text-4xl" />
            <div>
              <p className="font-bold pixel-text text-xs uppercase mb-1">Phone</p>
              <a
                href="tel:+8801234567890"
                className="text-black font-bold hover:text-[#43B047] transition-colors"
              >
                +880 1639322453
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-4 bg-white/90 p-3 pixel-border">
            <MdWhatsapp className="text-[#FBD000] text-4xl drop-shadow-[1px_1px_0_#000]" />
            <div>
              <p className="font-bold pixel-text text-xs uppercase mb-1">WhatsApp</p>
              <a
                href="https://wa.me/8801322071271"
                target="_blank"
                rel="noreferrer"
                className="text-black font-bold hover:text-[#FBD000] transition-colors"
              >
                +880 1322071271
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-6 bg-[#d95f36] p-8 shadow-[8px_8px_0_#000] border-4 border-black"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            value={formData.name}
            onChange={handleChange}
            className="p-3 bg-white border-4 border-black text-black font-bold placeholder-gray-500 focus:outline-none focus:bg-[#FFF] shadow-[inset_4px_4px_0_#ccc]"
            disabled={loading}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="p-3 bg-white border-4 border-black text-black font-bold placeholder-gray-500 focus:outline-none focus:bg-[#FFF] shadow-[inset_4px_4px_0_#ccc]"
            disabled={loading}
          />
          <textarea
            name="message"
            rows="5"
            placeholder="Your Message..."
            required
            value={formData.message}
            onChange={handleChange}
            className="p-3 bg-white border-4 border-black text-black font-bold placeholder-gray-500 resize-none focus:outline-none focus:bg-[#FFF] shadow-[inset_4px_4px_0_#ccc]"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="mario-button bg-[#FBD000] text-black w-full"
          >
            {loading ? "SENDING..." : "SEND MESSAGE"}
          </button>
          {status && (
            <div className={`font-bold pixel-text text-xs text-center mt-2 px-2 py-3 bg-white border-2 border-black ${status.includes("successfully") ? "text-[#43B047]" : "text-[#E52521]"}`}>
              {status}
            </div>
          )}
        </form>
      </motion.div>
    </section>
  );
};

export default Contact;
