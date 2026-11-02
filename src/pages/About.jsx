// src/pages/About.jsx
import { motion } from "framer-motion";

const About = () => {
  return (
    <section
      id="about"
      className="bg-[#0d1117] py-20 px-4 sm:px-6 lg:px-8"
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
            Get to know me
          </p>
          <h2 className="section-heading cyan-underline text-3xl sm:text-4xl lg:text-5xl text-white font-bold">
            About Me
          </h2>
        </motion.div>

        {/* Single paragraph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bento-card p-6 sm:p-10 max-w-3xl"
        >
          <p className="text-slate-300 leading-relaxed text-sm sm:text-base lg:text-lg">
            I&apos;m Tanjip, a CSE graduate from BRAC University in Dhaka. I build web apps
            and train ML models, and I teach coding at Codingal, where I&apos;ve worked with 50+
            students. My thesis is about physics tutoring for Class 9–10 students in Bangladesh.
            I like projects where a model ends up inside something a person can actually click.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
