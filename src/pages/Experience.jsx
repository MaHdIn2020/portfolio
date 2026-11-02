// src/pages/Experience.jsx
import { motion } from "framer-motion";
import { FiCalendar, FiMapPin } from "react-icons/fi";

const experiences = [
  {
    role: "Coding Instructor",
    company: "Codingal",
    logo: "/codingal.png",
    location: "Remote",
    period: "2026 – Present",
    type: "Full-time",
    description:
      "Teaching programming to students one-on-one and in small groups at Codingal. I've worked with 50+ students across different age groups and skill levels.",
    highlights: [
      "Taught 50+ students across individual and group sessions",
      "Covered Python, JavaScript, HTML/CSS, and introductory web development",
      "Designed lesson plans matched to each student's learning pace",
      "Guided students through building small projects to apply what they learned",
    ],
  },
];

const Experience = () => {
  return (
    <section
      id="experience"
      aria-label="Work experience"
      className="bg-[#0a0a12] py-20 px-4 sm:px-6 lg:px-8"
    >
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
            Work history
          </p>
          <h2 className="section-heading cyan-underline text-3xl sm:text-4xl lg:text-5xl text-white font-bold">
            Experience
          </h2>
        </motion.div>

        {/* Experience Cards */}
        <div className="flex flex-col gap-8">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              className="bento-card p-6 sm:p-9"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              {/* Top row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3.5 sm:gap-5">
                  {/* Logo */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white flex items-center justify-center p-2 shrink-0 border border-cyan-500/20 shadow-md">
                    <img src={exp.logo} alt={exp.company} className="w-full h-full object-contain" />
                  </div>

                  <div>
                    <h3 className="font-['Space_Grotesk'] font-bold text-lg sm:text-xl text-white leading-tight mb-1">
                      {exp.role}
                    </h3>
                    <p className="text-[#00e5ff] font-semibold text-sm sm:text-base">{exp.company}</p>
                  </div>
                </div>

                {/* Meta info badges */}
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="inline-flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/25 rounded-full px-3 py-1 text-[#00e5ff] font-medium">
                    <FiCalendar size={12} /> {exp.period}
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-slate-800/80 border border-slate-700 rounded-full px-3 py-1 text-slate-300 font-medium">
                    <FiMapPin size={12} /> {exp.location}
                  </span>
                  <span className="bg-cyan-500/10 border border-cyan-500/20 rounded-full px-3 py-1 text-[#00e5ff] font-medium">
                    {exp.type}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base mb-5">
                {exp.description}
              </p>

              {/* Highlights */}
              <div className="flex flex-col gap-2.5">
                {exp.highlights.map((h, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-[#00e5ff] rounded-full mt-2 shrink-0" />
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{h}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
