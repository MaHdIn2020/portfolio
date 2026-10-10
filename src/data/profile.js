// src/data/profile.js
// Single source of truth for all personal data.
// Import this file wherever you need name, education facts, stats, or links.

export const profile = {
  name: "Tanjip Surait Mahdin",
  shortName: "TSM",
  role: "Graduated CSE student",
  bio: "I'm Tanjip, a graduated CSE student from BRAC University in Dhaka. I build web apps and train ML models, and I teach coding at Codingal, where I've worked with 50+ students. My thesis is about physics tutoring for Class 9–10 students in Bangladesh. I like projects where a model ends up inside something a person can actually click.",

  education: {
    degree: "B.Sc. in Computer Science & Engineering",
    university: "BRAC University",
    location: "Dhaka, Bangladesh",
    cgpa: "3.78",
    cgpaOutOf: "4.00",
    status: "Expected graduation: September 2026",
  },

  studentsTaught: "50+",

  stats: [
    { value: "50+", label: "Students Taught" },
    { value: "3.78", label: "CGPA / 4.00" },
    { value: "9", label: "Projects" },
  ],

  roles: ["Full Stack Developer", "ML Engineer", "Coding Instructor"],

  links: {
    github: "https://github.com/MaHdIn2020",
    linkedin: "https://www.linkedin.com/in/tanjip-surait-mahdin/",
    facebook: "https://www.facebook.com/tanjip.mahdin",
    email: "tanjip.surait.mahdin@gmail.com",
    resume: "/resume.pdf",
  },
};

export default profile;
