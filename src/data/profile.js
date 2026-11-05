// src/data/profile.js
// Single source of truth — consumed by Hero, About, Footer, Contact, etc.

export const profile = {
  name: "Tanjip Surait Mahdin",
  shortName: "TSM",
  firstName: "Tanjip",
  heroHeadline: ["Tanjip builds", "software that", "ships."],
  heroRotation: ["models that work.", "interfaces people get.", "products that teach."],
  heroMeta: "FULL-STACK × ML ENGINEER",
  location: "DHAKA, BANGLADESH",
  roles: ["Full Stack Developer", "ML Engineer", "ML/AI Researcher", "Coding Instructor"],
  bio: "CSE Graduate from BRAC University. I ship web apps and train ML models, and I teach coding at Codingal — turning complex problems into products people can actually use.",
  availability: "OPEN FOR OPPORTUNITIES",
  locationTag: "DHAKA · BRAC UNIVERSITY",
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
    id: "background",
    kicker: "THE BASICS",
    title: "Graduating into building.",
    body: "I finished my B.Sc. in Computer Science & Engineering at BRAC University in Dhaka. Most of what stuck wasn't a single course — it was the habit of pulling a messy problem apart, finding the thread underneath, and stitching it back together as something useful.",
    note: "Dhaka-based · Looking for what to build next",
  },
  {
    id: "craft",
    kicker: "WHAT I BUILD",
    title: "Interfaces with a model inside.",
    body: "I spend my time on both sides of the stack: the buttons, forms, and feedback people touch — and the classifiers, retrieval systems, and tuning loops that make those clicks mean something. End to end, not one layer at a time.",
    note: "From first sketch to something a person can open and use.",
  },
  {
    id: "method",
    kicker: "HOW I METHOD",
    title: "Sketch, ship, sharpen.",
    body: "My loop is short on purpose. Define what a good result looks like, draw the smallest version that could work, release it, watch how it behaves in use, then tighten the details. The polish is a consequence of the loop, not a separate phase.",
    note: "Break it down · Build it · Watch it · Make it clean",
  },
  {
    id: "teaching",
    kicker: "OFF-HOURS",
    title: "I teach because it clarifies.",
    body: "At Codingal I mentor beginners through Python, JavaScript, and their first real projects — 50+ learners and counting. Explaining a concept out loud is still the fastest way I know to find the gaps in my own understanding.",
    note: "Python · JavaScript · HTML/CSS · First projects",
  },
];

export default profile;
