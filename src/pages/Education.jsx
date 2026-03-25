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
      className="bg-[#5C94FC] text-white py-16 px-6 md:px-12 mx-auto"
    >
      <motion.h2
        className="text-3xl font-bold mb-12 text-[#E52521] pixel-text text-center drop-shadow-[3px_3px_0_#000]"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Education
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-10 text-black"
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
            className="space-y-4 bg-white pixel-border p-6 hover:-translate-y-2 transition-transform cursor-default"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <div className="flex items-center space-x-3 text-[#E52521] text-2xl">
              <FaGraduationCap />
              <h3 className="text-lg font-bold pixel-text text-black leading-tight">{edu.degree}</h3>
            </div>

            <p className="text-[#43B047] font-bold text-lg">{edu.institution}</p>
            <p className="text-sm text-gray-600 font-bold">{edu.year}</p>

            {edu.gpa && (
              <p className="font-semibold">
                <strong className="text-black">GPA:</strong> <span className="text-[#d95f36] font-bold">{edu.gpa}</span>
              </p>
            )}
            {edu.cgpa && (
              <p className="font-semibold">
                <strong className="text-black">CGPA:</strong> <span className="text-[#d95f36] font-bold">{edu.cgpa}</span>
              </p>
            )}
            {edu.note && <p className="text-[#E52521] pixel-text text-xs tracking-wider mt-2">{edu.note}</p>}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Education;
