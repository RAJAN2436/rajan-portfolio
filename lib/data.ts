export const profile = {
  name: "Rajan Sharma",
  role: "AI Engineer",
  location: "Bareilly, Uttar Pradesh",
  email: "rajansharma243641@gmail.com",
  phone: "+91-74520-73580",
  website: "mrajansharma.vercel.app",
  summary:
    "Experienced in developing AI-driven tools, from concept design to deployment, with hands-on exposure to the full project development lifecycle.",
  social: {
    github: "https://github.com/RAJAN2436",
    linkedin: "https://www.linkedin.com/in/rajan-sharma-stack/",
  },
};

export const experience = [
  {
    id: "01",
    role: "Developer",
    company: "InvertisPrep",
    period: "2026 - Present",
    description:
      "Working as a Web Developer at InvertisPrep, an ed-tech learning platform providing PYQs and exam preparation resources for students.",
  },
  {
    id: "02",
    role: "Founder",
    company: "StackLabs",
    period: "2026 - Present",
    description:
      "Founder of StackLabs, leading the design and development of web/software products from concept to execution.",
  },
];

export const education = [
  {
    id: "01",
    degree: "Bachelor of Computer Application With Artificial Intelligence",
    school: "Invertis University Bareilly",
    period: "2025 - 2028",
    description:
      "Specialized in Full Stack Development, AI Engineering, and Machine Learning, with additional expertise in UI/UX Design, startup leadership, and strong communication abilities.",
  },
];

export const skills = ["Full-Stack Dev", "AI Engineering", "Machine Learning"];

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
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    demoUrl: "https://rajan-portfolio-nu.vercel.app/",
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
    title: "Sharma Makeovers",
    description: "A clean interface platform of Makeup academy.",
    tech: ["MongoDB", "Express.js", "React", "Node.js"],
    demoUrl: "https://sharma-makeovers.vercel.app/",
    githubUrl: "https://github.com/RAJAN2436/sharma-makeovers",
    status: "live",
  },
];
