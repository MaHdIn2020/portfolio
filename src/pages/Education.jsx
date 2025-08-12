// src/components/Education.jsx
import { motion } from "framer-motion";
import { FaGraduationCap } from "react-icons/fa";

const Education = () => {
  const educationData = [
    {
      degree: "Secondary School Certificate (SSC)",
      institution: "Monipur High School and College",
      year: "2019",
      gpa: "5.00 / 5.00",
    },
    {
      degree: "Higher Secondary Certificate (HSC)",
      institution: "Mirpur Cantonment High School and College",
      year: "2022",
      gpa: "5.00 / 5.00",
    },
    {
      degree: "B.Sc. in Computer Science and Engineering",
      institution: "BRAC University",
      year: "2022 – 2026 (Expected)",
      cgpa: "3.79 / 4.00",
      note: "Currently in 3rd Year",
    },
  ];

  return (
    <section
      id="education"
      className="bg-black text-white py-16 px-6 md:px-12 mx-auto"
    >
      <motion.h2
        className="text-3xl font-bold mb-12 text-indigo-400 text-center"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Education
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
        {educationData.map((edu, index) => (
          <motion.div
            key={index}
            className="space-y-4 border border-gray-800 rounded-lg p-6 hover:shadow-indigo-500/50 transition-shadow cursor-default"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <div className="flex items-center space-x-3 text-indigo-400 text-2xl">
              <FaGraduationCap />
              <h3 className="text-lg font-semibold">{edu.degree}</h3>
            </div>

            <p className="text-indigo-300">{edu.institution}</p>
            <p className="text-sm text-gray-400">{edu.year}</p>

            {edu.gpa && (
              <p>
                <strong className="text-white">GPA:</strong> {edu.gpa}
              </p>
            )}
            {edu.cgpa && (
              <p>
                <strong className="text-white">CGPA:</strong> {edu.cgpa}
              </p>
            )}
            {edu.note && <p className="text-gray-400">{edu.note}</p>}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Education;
