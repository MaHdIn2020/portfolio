// src/components/Footer.jsx
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaFacebook, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800 py-8 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Side */}
        <motion.div
          className="text-center md:text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-lg font-semibold text-white">
            Tanjip Surait Mahdin
          </h2>
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex space-x-6 text-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {[
            { icon: <FaGithub />, link: "https://github.com/MaHdIn2020" },
            { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/tanjip-surait-mahdin/" },
            { icon: <FaFacebook />, link: "https://www.facebook.com/tanjip.mahdin" },
          ].map((social, i) => (
            <motion.a
              key={i}
              href={social.link}
              target="_blank"
              rel="noreferrer"
              className="hover:text-indigo-400 transition-colors duration-300"
              whileHover={{ scale: 1.2 }}
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
