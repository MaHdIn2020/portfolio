// src/components/Hero.jsx
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import { HiArrowDown } from "react-icons/hi";
import { HiArrowDownTray } from "react-icons/hi2";
import { Link as ScrollLink } from "react-scroll";
import FloatingGraphics from "./FloatingGraphics";
import TypeWriter from "./TypeWriter";
import { profile } from "../data/profile";

const Hero = () => {
  return (
    <section
      id="home"
      className="hero-bg grid-bg relative overflow-hidden min-h-screen flex flex-col justify-between pt-24 sm:pt-28 pb-10"
    >
      {/* Animated background elements */}
      <FloatingGraphics />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 my-auto">
        {/* Main Grid: Mobile Column / Desktop 2-Column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-center">
          
          {/* TEXT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col items-center md:items-start text-center md:text-left gap-4 sm:gap-5 order-1 md:order-1"
          >
            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/25 rounded-full px-4 py-1.5 w-fit"
            >
              <motion.span
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                transition={{ repeat: Infinity, duration: 1.8 }}
                className="w-2 h-2 bg-[#00e5ff] rounded-full shrink-0"
              />
              <span className="text-[#00e5ff] text-xs sm:text-sm font-medium">
                Available for opportunities
              </span>
            </motion.div>

            {/* Headline Name */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7 }}
              className="font-['Space_Grotesk'] font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.15]"
            >
              Tanjip Surait
              <br />
              <span className="gradient-text">Mahdin</span>
            </motion.h1>

            {/* TypeWriter cycling roles */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-base sm:text-xl font-['Space_Grotesk'] font-medium text-cyan-300 min-h-[1.75rem]"
            >
              <TypeWriter words={profile.roles} speed={75} pause={2000} deleteSpeed={40} />
            </motion.div>

            {/* PHOTO ON MOBILE (shows right after name & roles on screens < md) */}
            <div className="md:hidden w-full my-2 flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="bracket-frame relative inline-block mx-auto"
              >
                <img
                  src="/Picture.jpg"
                  alt="Tanjip Surait Mahdin — CSE Graduate from BRAC University"
                  className="w-52 h-64 sm:w-60 sm:h-72 object-cover object-top rounded-xl border border-cyan-500/30 shadow-[0_12px_32px_rgba(0,0,0,0.6)]"
                />
                {/* Extra bracket corners */}
                <div className="absolute -top-2 -right-2 w-6 h-6 border-t-[3px] border-r-[3px] border-[#00e5ff] rounded-tr-sm pointer-events-none" />
                <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-[3px] border-l-[3px] border-[#00e5ff] rounded-bl-sm pointer-events-none" />
              </motion.div>

              {/* Mobile Achievement Badges under Photo */}
              <div className="flex flex-wrap justify-center gap-2.5 mt-4 max-w-sm">
                <div className="bg-[#111827]/90 border border-cyan-500/25 rounded-xl px-3 py-1.5 flex items-center gap-2 shadow-lg">
                  <span className="text-base">🎓</span>
                  <div className="text-left">
                    <p className="text-white text-xs font-bold leading-tight">BRAC University</p>
                    <p className="text-[#00e5ff] text-[10px] font-mono">CSE · CGPA {profile.education.cgpa}</p>
                  </div>
                </div>

                <div className="bg-[#111827]/90 border border-cyan-500/25 rounded-xl px-3 py-1.5 flex items-center gap-2 shadow-lg">
                  <img
                    src="/codingal.png"
                    alt="Codingal"
                    className="w-4 h-4 object-contain rounded bg-white p-0.5"
                  />
                  <div className="text-left">
                    <p className="text-white text-xs font-bold leading-tight">Codingal</p>
                    <p className="text-[#00e5ff] text-[10px] font-mono">Instructor · {profile.studentsTaught} students</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-md"
            >
              CSE Graduate from BRAC University. Building web apps, training ML models,
              and teaching coding at Codingal.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-wrap gap-3 sm:gap-4 items-center justify-center md:justify-start w-full sm:w-auto pt-1"
            >
              <ScrollLink to="projects" smooth duration={600} offset={-70}>
                <motion.span
                  className="btn-primary cursor-pointer text-sm font-semibold py-2.5 px-6 inline-flex items-center justify-center"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  View My Work
                </motion.span>
              </ScrollLink>
              <motion.a
                href={profile.links.resume}
                download
                className="btn-outline cursor-pointer inline-flex items-center justify-center gap-2 text-sm font-semibold py-2.5 px-6"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <HiArrowDownTray size={16} />
                Download Resume
              </motion.a>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex gap-3 items-center justify-center md:justify-start pt-2"
            >
              {[
                { icon: <FaGithub />, href: profile.links.github, label: "GitHub" },
                { icon: <FaLinkedin />, href: profile.links.linkedin, label: "LinkedIn" },
                { icon: <FaFacebook />, href: profile.links.facebook, label: "Facebook" },
              ].map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  whileHover={{ y: -3, scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-slate-300 hover:text-[#00e5ff] hover:border-cyan-500/40 hover:bg-cyan-500/15 transition-all text-lg"
                >
                  {s.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* DESKTOP PHOTO (visible on md: and up) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.8, ease: "easeOut" }}
            className="hidden md:flex flex-col items-center justify-center relative order-2"
          >
            {/* Photo with bracket frame */}
            <motion.div
              className="bracket-frame relative z-10 inline-block"
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
            >
              <img
                src="/Picture.jpg"
                alt="Tanjip Surait Mahdin — CSE Graduate from BRAC University"
                className="w-[280px] lg:w-[330px] h-[340px] lg:h-[390px] object-cover object-top rounded-xl border border-cyan-500/30 shadow-[0_16px_40px_rgba(0,0,0,0.6)]"
              />
              {/* Extra bracket corners */}
              <div className="absolute -top-2 -right-2 w-7 h-7 border-t-[3px] border-r-[3px] border-[#00e5ff] rounded-tr-sm pointer-events-none" />
              <div className="absolute -bottom-2 -left-2 w-7 h-7 border-b-[3px] border-l-[3px] border-[#00e5ff] rounded-bl-sm pointer-events-none" />
            </motion.div>

            {/* Floating mini card 1: BRAC University */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0, y: [0, -6, 0] }}
              transition={{
                delay: 0.9,
                duration: 0.5,
                y: { repeat: Infinity, duration: 3.2, ease: "easeInOut" },
              }}
              className="absolute -right-4 lg:-right-8 top-[18%] bg-[#111827]/95 border border-cyan-500/30 rounded-xl px-3.5 py-2.5 flex items-center gap-2.5 shadow-[0_10px_25px_rgba(0,0,0,0.5)] z-20 backdrop-blur-md"
            >
              <span className="text-xl">🎓</span>
              <div>
                <p className="text-white text-xs font-bold leading-tight">BRAC University</p>
                <p className="text-[#00e5ff] text-[11px] font-mono">CSE · CGPA {profile.education.cgpa}</p>
              </div>
            </motion.div>

            {/* Floating mini card 2: Codingal */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0, y: [0, 6, 0] }}
              transition={{
                delay: 1.1,
                duration: 0.5,
                y: { repeat: Infinity, duration: 3.6, ease: "easeInOut", delay: 0.5 },
              }}
              className="absolute -left-4 lg:-left-8 bottom-[20%] bg-[#111827]/95 border border-cyan-500/30 rounded-xl px-3.5 py-2.5 flex items-center gap-2.5 shadow-[0_10px_25px_rgba(0,0,0,0.5)] z-20 backdrop-blur-md"
            >
              <img
                src="/codingal.png"
                alt="Codingal"
                className="w-5 h-5 object-contain rounded bg-white p-0.5"
              />
              <div>
                <p className="text-white text-xs font-bold leading-tight">Codingal</p>
                <p className="text-[#00e5ff] text-[11px] font-mono">Instructor · {profile.studentsTaught} students</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ── STATS ROW ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="grid grid-cols-3 gap-px bg-cyan-500/15 rounded-2xl overflow-hidden mt-12 sm:mt-16 border border-cyan-500/20 shadow-lg"
        >
          {profile.stats.map((s, i) => (
            <div
              key={i}
              className="p-3.5 sm:p-5 text-center bg-[#0d1117]/95 hover:bg-cyan-500/5 transition-colors"
            >
              <p className="font-['Space_Grotesk'] font-extrabold text-lg sm:text-2xl lg:text-3xl text-[#00e5ff] leading-tight mb-1">
                {s.value}
              </p>
              <p className="text-slate-400 text-[10px] sm:text-xs font-medium tracking-wide">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="mx-auto mt-6 text-slate-400 text-lg flex items-center justify-center"
        aria-hidden="true"
      >
        <HiArrowDown />
      </motion.div>
    </section>
  );
};

export default Hero;
