// src/components/Hero.jsx
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaFacebook, FaTwitter } from "react-icons/fa";

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col md:flex-row items-center justify-center text-white bg-[#5C94FC] px-6 md:px-12 pt-20 overflow-hidden"
    >
      {/* Left Content */}
      <motion.div
        className="flex-1 text-center md:text-left space-y-8 mt-16 md:mt-0"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="inline-block bg-[#E52521] text-white px-4 py-2 pixel-border pixel-text text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          PLAYER 1 READY
        </motion.div>

        <motion.h1
          className="text-4xl md:text-5xl font-bold pixel-text leading-tight text-white drop-shadow-[4px_4px_0_#000]"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <span className="text-[#FBD000]">Tanjip Surait</span><br />
          Mahdin
        </motion.h1>

        <motion.h2
          className="text-xl md:text-2xl font-semibold pixel-text text-[#43B047] drop-shadow-[2px_2px_0_#000]"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Full Stack Developer
        </motion.h2>

        <motion.p
          className="text-white max-w-lg font-bold drop-shadow-[1px_1px_0_#000] text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          I’m a Computer Science student passionate about building modern,
          user-friendly, and efficient web applications. Leveling up one project at a time.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <a
            className="mario-button inline-block text-center"
            href="#"
          >
            START GAME (Resume)
          </a>
          <div className="flex justify-center sm:justify-start space-x-6 text-3xl">
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
                className="pixel-border bg-white p-2 hover:bg-[#FBD000] transition-colors duration-300"
                style={{ color: social.color }}
                whileHover={{ y: -5 }}
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
        className="flex-1 flex justify-center mt-12 md:mt-0"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <motion.img
          src="/profile.jpeg"
          alt="Tanjip Mahdin"
          className="w-64 h-64 md:w-80 md:h-80 object-cover pixel-border bg-[#FBD000]"
          whileHover={{ scale: 1.05, rotate: 2 }}
          transition={{ type: "spring", stiffness: 200 }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;
