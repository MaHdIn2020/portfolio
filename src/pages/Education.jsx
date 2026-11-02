// src/pages/Education.jsx
import { motion } from "framer-motion";
import { FiAward } from "react-icons/fi";
import { profile } from "../data/profile";

const educationData = [
  {
    degree: "Secondary School Certificate (SSC)",
    institution: "Monipur High School and College",
    year: "2019",
    result: "GPA 5.00 / 5.00",
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Mirpur Cantonment High School and College",
    year: "2022",
    result: "GPA 5.00 / 5.00",
  },
  {
    degree: profile.education.degree,
    institution: profile.education.university,
    year: profile.education.status,
    result: `CGPA ${profile.education.cgpa} / ${profile.education.cgpaOutOf}`,
    highlight: true,
  },
];

const Education = () => {
  return (
    <section id="education" aria-label="Education" className="bg-[#0d1117] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-14"
        >
          <p className="text-[#00e5ff] text-xs font-semibold uppercase tracking-widest mb-3">
            Academic background
          </p>
          <h2 className="section-heading cyan-underline text-3xl sm:text-4xl lg:text-5xl text-white font-bold">
            Education
          </h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {educationData.map((edu, i) => (
            <motion.div
              key={i}
              className="bento-card p-6 sm:p-7 relative overflow-hidden flex flex-col justify-between"
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              whileHover={{ y: -5 }}
              style={{
                borderColor: edu.highlight ? "rgba(0,229,255,0.35)" : undefined,
              }}
            >
              {edu.highlight && (
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#00e5ff] to-transparent" />
              )}

              <div>
                {/* Icon */}
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center text-[#00e5ff] mb-4 border ${
                    edu.highlight
                      ? "bg-cyan-500/15 border-cyan-500/30"
                      : "bg-cyan-500/10 border-cyan-500/20"
                  }`}
                >
                  <FiAward size={20} />
                </div>

                <h3 className="font-['Space_Grotesk'] font-bold text-base sm:text-lg text-white leading-snug mb-2">
                  {edu.degree}
                </h3>

                <p className="text-[#00e5ff] font-semibold text-xs sm:text-sm mb-1.5">
                  {edu.institution}
                </p>

                <p className="text-slate-400 text-xs mb-4">
                  {edu.year}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800">
                <span className="font-mono text-xs font-semibold text-slate-200 bg-slate-800/80 border border-slate-700/60 px-3 py-1 rounded-md inline-block">
                  {edu.result}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
