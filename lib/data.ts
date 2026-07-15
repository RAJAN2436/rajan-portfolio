export const profile = {
  name: "Rajan Sharma",
  role: "Full Stack Developer",
  location: "Bareilly, Uttar Pradesh",
  email: "rajansharma243641@gmail.com",
  phone: "+91 7452073580",
  social: {
    github: "https://github.com/RAJAN2436",
    linkedin: "https://www.linkedin.com/in/rajan-sharma-ai/",
    instagram: "https://www.instagram.com/itz___rajan__sharma/",
    whatsapp:
      "https://api.whatsapp.com/send/?phone=7452073580&text&type=phone_number&app_absent=0&wame_ctl=1",
  },
};

export const stack = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "Python",
  "C",
  "Figma",
  "Jupyter Lab",
];

export const qualifications = {
  degree: "BCA — AI & ML",
  period: "2025 — Present",
};

export const experience = {
  role: "AI Internship",
  company: "Codec Technologies",
  period: "Feb 2026 — Present",
  duration: "1 Month",
};

export const skills = [
  "Python",
  "C",
  "HTML / HTML5",
  "CSS / CSS3",
  "Jupyter Lab",
  "Data Analytics",
];

export type Project = {
  title: string;
  description: string;
  tech: string[];
  demoUrl?: string;
  githubUrl?: string;
  status: "live" | "pending";
};

export const projects: Project[] = [
  {
    title: "Portfolio Website",
    description:
      "Modern responsive portfolio with smooth animations and a clean interface.",
    tech: ["HTML", "CSS", "JS"],
    demoUrl: "https://cozy-crisp-b269de.netlify.app/",
    githubUrl: "https://github.com/RAJAN2436",
    status: "live",
  },
  {
    title: "Alumni Lux",
    description:
      "A digital platform for centralized alumni data management and engagement.",
    tech: ["HTML", "CSS", "JS"],
    demoUrl: "https://rajan2436.github.io/alumnidashboard/",
    githubUrl: "https://github.com/RAJAN2436/alumnidashboard",
    status: "live",
  },
  {
    title: "Number Guessing Game",
    description:
      "A modern C-based number guessing game with difficulty modes, a scoring system, high-score tracking, ANSI terminal support, input validation, and a clean modular structure.",
    tech: ["C"],
    demoUrl:
      "https://github.com/RAJAN2436/Number-Guessing-Game/blob/main/Number%20guessing%20game.c",
    githubUrl: "https://github.com/RAJAN2436/Number-Guessing-Game/tree/main",
    status: "live",
  },
  {
    title: "Pending",
    description: "Launching more projects soon.",
    tech: ["Coming Soon"],
    status: "pending",
  },
  {
    title: "In Progress",
    description: "Currently in development — check back soon.",
    tech: ["Pending"],
    status: "pending",
  },
];
