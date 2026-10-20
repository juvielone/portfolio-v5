export type Section = { id: string; label: string };
export type Social = { label: "LinkedIn" | "GitHub" | "X"; href: string };
export type Job = { period: string; role: string; org: string; summary: string; tech: string[] };
export type CategoryId = "main" | "freelance" | "personal";
export type Category = { id: CategoryId; label: string };
export type Project = {
  title: string;
  category: CategoryId;
  subtitle: string;
  link: string;
  tag: string;
  description: string;
  tech: string[];
  image: string;
};

export const SECTIONS: Section[] = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
];

export const SOCIALS: Social[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "GitHub", href: "https://github.com/" },
  { label: "X", href: "https://x.com/" },
];

export const CONTACT = {
  email: "hello@juvielagos.com",
  resume: "https://www.linkedin.com/",
};

export const TOOLKIT = ["Next.js", "TypeScript", "React", "C# / .NET", "Node.js", "PostgreSQL", "Azure", "LLM APIs"];

export const EXPERIENCE: Job[] = [
  {
    period: "2023 — Present",
    role: "Full-Stack Developer",
    org: "Independent",
    summary:
      "Designing and shipping web apps and AI-assisted tools for small teams — replacing spreadsheet-and-email workflows with focused, reliable products.",
    tech: ["Next.js", "TypeScript", "LLM APIs", "PostgreSQL"],
  },
  {
    period: "2021 — 2023",
    role: "Software Engineer",
    org: "SaaS Platform Team",
    summary:
      "Built customer-facing features and internal tooling across a C#/.NET and React stack, improving page performance and simplifying complex admin flows.",
    tech: ["C# / .NET", "React", "Azure", "SQL Server"],
  },
  {
    period: "2019 — 2021",
    role: "Junior Web Developer",
    org: "Digital Studio",
    summary:
      "Delivered responsive marketing sites and web apps for clients, with a focus on accessible UI and clean, maintainable front-end code.",
    tech: ["JavaScript", "React", "Node.js", "CSS"],
  },
];

export const CATEGORIES: Category[] = [
  { id: "main", label: "Main" },
  { id: "freelance", label: "Freelance" },
  { id: "personal", label: "Personal" },
];

// Images are Base44-hosted placeholders until real screenshots replace them.
const IMG = "https://media.base44.com/images/public/6ab71d80b373ae27734d54a6";

export const PROJECTS: Project[] = [
  {
    title: "Inbox Triage",
    category: "main",
    subtitle: "AI Inbox Assistant",
    link: "https://github.com/",
    tag: "AI Tool",
    description:
      "An assistant that reads shared inboxes, classifies requests, drafts replies and routes work to the right person — so nothing sits unanswered.",
    tech: ["Next.js", "LLM APIs", "Postgres"],
    image: `${IMG}/d38bf144f_generated_image.png`,
  },
  {
    title: "Quote Builder",
    category: "freelance",
    subtitle: "Guided Pricing Workflow",
    link: "https://github.com/",
    tag: "Web App",
    description:
      "Turns a messy spreadsheet quoting process into a guided flow with live pricing, reusable templates and one-click PDF exports.",
    tech: ["React", "C# / .NET", "Azure"],
    image: `${IMG}/b2cff3cd2_generated_image.png`,
  },
  {
    title: "Ops Pulse",
    category: "personal",
    subtitle: "Operations Dashboard",
    link: "https://github.com/",
    tag: "Dashboard",
    description:
      "A lightweight operations dashboard that unifies job status, team capacity and alerts into a single calm view.",
    tech: ["TypeScript", "Node.js", "Charts"],
    image: `${IMG}/395fb0449_generated_image.png`,
  },
];
