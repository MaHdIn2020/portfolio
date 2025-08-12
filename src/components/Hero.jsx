// src/components/Hero.jsx
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaFacebook, FaTwitter } from "react-icons/fa";

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col md:flex-row items-center justify-center text-white bg-gradient-to-b from-black via-gray-900 to-black px-6 md:px-12 overflow-hidden"
    >
      {/* Left Content */}
      <motion.div
        className="flex-1 text-center md:text-left space-y-6"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.p
          className="text-gray-400 uppercase tracking-widest text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Hi, My name is
        </motion.p>

        <motion.h1
          className="text-4xl md:text-5xl font-bold"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <span className="text-indigo-400">Tanjip Surait Mahdin</span>
        </motion.h1>

        <motion.h2
          className="text-2xl md:text-3xl font-semibold text-gray-300"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Full Stack Developer
        </motion.h2>

        <motion.p
          className="text-gray-400 max-w-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          I’m a Computer Science student passionate about building modern,
          user-friendly, and efficient web applications. I enjoy learning new
          technologies and creating impactful projects.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <a
            className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 rounded-lg text-white font-medium shadow-lg transition-colors duration-300"
          >
            Download Resume
          </a>
          <div className="flex justify-center sm:justify-start space-x-4 text-xl">
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
          </div>
        </motion.div>
      </motion.div>

      {/* Right Image */}
      <motion.div
        className="flex-1 flex justify-center mt-10 md:mt-0"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <motion.img
          src="https://ibb.co.com/HL8YfZVf"
          alt="Tanjip Mahdin"
          className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full border-4 border-gray-800 shadow-[0_0_30px_rgba(99,102,241,0.5)]"
          whileHover={{ scale: 1.05, rotate: 2 }}
          transition={{ type: "spring", stiffness: 200 }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;
