// src/data/profile.js
// Single source of truth — consumed by Hero, About, Footer, Contact, etc.

export const profile = {
  name: "Tanjip Surait Mahdin",
  shortName: "TSM",
  firstName: "Tanjip",
  heroLines: ["I TURN IDEAS", "INTO INTUITIVE", "PRODUCTS."],
  heroEyebrow: "✳ DIGITAL PRODUCTS, BUILT WITH INTENT",
  heroPhrases: ["real impact.", "clear interfaces.", "working models."],
  heroMeta: "INDEPENDENT DEVELOPER",
  location: "DHAKA, BANGLADESH",
  roles: ["Full Stack Developer", "ML Engineer", "ML/AI Researcher", "Coding Instructor"],
  bio: "CSE Graduate from BRAC University. I build web apps and train ML models, and I teach coding at Codingal — turning complex problems into products people can actually use.",
  education: {
    degree: "B.Sc. in Computer Science & Engineering",
    university: "BRAC University",
    location: "Dhaka, Bangladesh",
    cgpa: "3.77",
    cgpaOutOf: "4.00",
    status: "Expected graduation: September 2026",
  },
  links: {
    github: "https://github.com/MaHdIn2020",
    linkedin: "https://www.linkedin.com/in/tanjip-surait-mahdin/",
    facebook: "https://www.facebook.com/tanjip.mahdin",
    email: "tanjip.surait.mahdin@gmail.com",
    phone: "+880 1322 071271",
    phoneHref: "tel:+8801322071271",
    whatsapp: "https://wa.me/8801322071271",
    resume: "/resume.pdf",
  },
  stats: [
    { value: "50+", label: "Students Taught" },
    { value: "3.77", label: "CGPA / 4.00" },
    { value: "9", label: "Projects" },
  ],
};

export const aboutChapters = [
  {
    id: "01",
    kicker: "01 / BACKGROUND",
    title: "The graduate, not just the degree.",
    body: "I'm a Computer Science & Engineering graduate from BRAC University in Dhaka. I break complex problems into smaller parts, find the idea underneath, and build toward something both thoughtful and useful.",
    note: "Based in Bangladesh · Open to opportunities",
  },
  {
    id: "02",
    kicker: "02 / WHAT I DO",
    title: "Full-stack to ML — one loop.",
    body: "I turn questions, early ideas, and complex problems into useful digital products. From understanding what needs solving, to building an experience that feels clear, practical, and easy to use.",
    note: "From a rough idea to something people can use.",
  },
  {
    id: "03",
    kicker: "03 / HOW I WORK",
    title: "Deliberate, then refined.",
    body: "I start by understanding the problem and what a useful outcome looks like. Then I shape a clear direction, build it in deliberate steps, test what works, and refine until the solution feels cohesive.",
    note: "Curiosity first · Thoughtful execution throughout",
  },
  {
    id: "04",
    kicker: "04 / OUTSIDE THE SCREEN",
    title: "Teaching is how I learn.",
    body: "As a Coding Instructor at Codingal, I've worked with 50+ students across different ages and skill levels — designing lesson plans matched to each learner's pace and guiding small projects that stick.",
    note: "Python · JavaScript · HTML/CSS · Web fundamentals",
  },
];

export default profile;
