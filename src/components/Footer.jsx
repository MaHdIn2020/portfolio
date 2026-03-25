// src/components/Footer.jsx
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaFacebook, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#E52521] border-t-8 border-black shadow-[0_-4px_0_rgba(0,0,0,0.1)] py-8 text-white relative">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Side */}
        <motion.div
          className="text-center md:text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl font-bold text-white pixel-text drop-shadow-[2px_2px_0_#000]">
            Tanjip Mahdin
          </h2>
          <p className="text-xs font-bold mt-2 text-white">
            © {new Date().getFullYear()} All levels completed.
          </p>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex space-x-6 text-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {[
            { icon: <FaGithub />, link: "https://github.com/MaHdIn2020", color: "#000" },
            { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/tanjip-surait-mahdin/", color: "#0077b5" },
            { icon: <FaFacebook />, link: "https://www.facebook.com/tanjip.mahdin", color: "#1877f2" },
          ].map((social, i) => (
            <motion.a
              key={i}
              href={social.link}
              target="_blank"
              rel="noreferrer"
              className="bg-white p-2 pixel-border hover:bg-[#FBD000] transition-colors duration-300"
              style={{ color: social.color }}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
