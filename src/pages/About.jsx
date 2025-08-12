// src/components/About.jsx
import { motion } from "framer-motion";
import { FaCode, FaRunning, FaPaintBrush, FaBullseye } from "react-icons/fa";

const About = () => {
  return (
    <section
      id="about"
      className="bg-black text-white py-16 px-6 md:px-12 mx-auto"
    >
      <motion.h2
        className="text-3xl font-bold mb-12 text-indigo-400 text-center"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        About Me
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-10 text-gray-300"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
        }}
      >
      {/* Professional Focus */}
        <motion.div
          className="space-y-4 border border-gray-800 rounded-lg p-6 hover:shadow-indigo-500/50 transition-shadow cursor-default"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <div className="flex items-center space-x-3 text-indigo-400 text-2xl">
            <FaBullseye />
            <h3 className="text-xl font-semibold">Professional Focus</h3>
          </div>
          <p>
            I specialize in building responsive, user-friendly web applications using modern technologies.
            My work blends clean design with efficient code, ensuring both functionality and performance.
            I aim to create solutions that are scalable, maintainable, and enjoyable to use.
          </p>
        </motion.div>

        {/* Programming Journey & Skills */}
        <motion.div
          className="space-y-4 border border-gray-800 rounded-lg p-6 hover:shadow-indigo-500/50 transition-shadow cursor-default"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <div className="flex items-center space-x-3 text-indigo-400 text-2xl">
            <FaCode />
            <h3 className="text-xl font-semibold">Programming Journey</h3>
          </div>
          <p>
            My passion for software development began with exploring web technologies like HTML, CSS, and JavaScript.
            Over time, I mastered full-stack development with the MERN stack and continuously expand my skills into AI and machine learning.
            I enjoy solving complex problems and building scalable, efficient applications.
          </p>
        </motion.div>

        {/* Hobbies & Interests */}
        <motion.div
          className="space-y-4 border border-gray-800 rounded-lg p-6 hover:shadow-indigo-500/50 transition-shadow cursor-default"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <div className="flex items-center space-x-3 text-indigo-400 text-2xl">
            <FaRunning />
            <FaPaintBrush />
            <h3 className="text-xl font-semibold">Hobbies & Interests</h3>
          </div>
          <p>
Maintaining balance is important to me — I enjoy staying active through regular walking and light exercise. I’m passionate about exploring new technologies, constantly learning, and applying what I’ve learned to build practical projects. These interests keep me motivated and help me approach challenges with a fresh, problem-solving mindset.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
