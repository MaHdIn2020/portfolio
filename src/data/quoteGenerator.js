// src/data/quoteGenerator.js
// Local "AI" quote composer — generates a fresh quote on every refresh, no API.
// Combines original fragments + real seeded quotes, shuffled each load.

const technical = [
  { archetype: "Code is read more than written", author: "After Harold Abelson", note: "Programs must be written for people to read, and only incidentally for machines." },
  { archetype: "First solve the problem, then write the code", author: "After John Johnson" },
  { archetype: "The best code is the one you don't have to write", author: "After Jeff Sickel" },
  { archetype: "Make it work, make it right, make it fast", author: "Kent Beck" },
  { archetype: "Simplicity is the soul of efficiency", author: "Austin Freeman" },
  { archetype: "Code is like humor — when you have to explain it, it's bad", author: "Cory House" },
  { archetype: "The first draft is always garbage", author: "After Ernest Hemingway" },
  { archetype: "Working software over comprehensive documentation", author: "Agile Manifesto" },
];

const motivational = [
  { archetype: "Amateurs sit and wait for inspiration. Professionals sit down and work", author: "After Stephen King" },
  { archetype: "The only way to do great work is to love what you do", author: "After Steve Jobs" },
  { archetype: "Discipline is choosing what you want most over what you want now", author: "After Abraham Lincoln" },
  { archetype: "It always seems impossible until it's done", author: "Nelson Mandela" },
  { archetype: "Success is not final, failure is not fatal: courage to continue counts", author: "After Winston Churchill" },
  { archetype: "Don't watch the clock; do what it does — keep going", author: "After Sam Levenson" },
  { archetype: "The dream is free. The hustle is sold separately", author: "Original" },
  { archetype: "Do or do not. There is no try", author: "After Yoda" },
];

const philosophical = [
  { archetype: "We are what we repeatedly do. Excellence then is not an act but a habit", author: "After Will Durant, on Aristotle" },
  { archetype: "The unexamined life is not worth living", author: "Socrates" },
  { archetype: "Less, but better", author: "After Dieter Rams" },
  { archetype: "Quality is not an act, it is a habit", author: "After Aristotle" },
  { archetype: "What we think, we become", author: "After Buddha" },
  { archetype: "The whole is greater than the sum of its parts", author: "After Aristotle" },
  { archetype: "He who has a why to live can bear almost any how", author: "After Nietzsche" },
  { archetype: "Simplicity is the ultimate sophistication", author: "After Leonardo da Vinci" },
];

const openings = [
  "In the end,",
  "Remember —",
  "When you build, remember:",
  "For the coder and the dreamer:",
  "A small truth to code by:",
  "In practice,",
  "As you ship, keep this:",
];

const closers = [
  "— and let the work speak.",
  "— that is the real craft.",
  "— keep building.",
  "— the rest is noise.",
  "— and it will hold.",
  "— ship it with care.",
];

const themes = [
  { name: "TECHNICAL", pool: technical },
  { name: "MOTIVATIONAL", pool: motivational },
  { name: "PHILOSOPHICAL", pool: philosophical },
];

function pick(arr, seed) {
  return arr[seed % arr.length];
}

function seededRandom() {
  // crypto-strong: different on every refresh, unless sessionStorage says otherwise
  const bytes = new Uint32Array(1);
  crypto.getRandomValues(bytes);
  return bytes[0];
}

export function generateQuote() {
  const seed = seededRandom();
  const theme = pick(themes, seed);
  const entry = pick(theme.pool, (seed >> 3) ^ (seed << 1));
  const opening = pick(openings, (seed >> 5) ^ (seed << 2));
  const closer = pick(closers, (seed >> 7) ^ (seed << 3));

  // 50% use real quote verbatim, 50% wrap with a composed framing
  const useFraming = (seed & 1) === 0;
  const text = useFraming
    ? `${opening} ${entry.archetype.charAt(0).toLowerCase()}${entry.archetype.slice(1)} ${closer}`
    : entry.archetype;

  return {
    text,
    author: entry.author,
    theme: theme.name,
    id: seed.toString(36),
  };
}

export default generateQuote;
