export const SECTIONS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
];

export const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "GitHub", href: "https://github.com/" },
  { label: "X", href: "https://x.com/" },
];

export const CONTACT = {
  email: "hello@juvielagos.com",
  resume: "https://www.linkedin.com/",
};

export const TOOLKIT = ["Next.js", "TypeScript", "React", "C# / .NET", "Node.js", "PostgreSQL", "Azure", "LLM APIs"];

export const EXPERIENCE = [
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

export const PROJECTS = [
  {
    title: "Inbox Triage",
    tag: "AI Tool",
    description:
      "An assistant that reads shared inboxes, classifies requests, drafts replies and routes work to the right person — so nothing sits unanswered.",
    tech: ["Next.js", "LLM APIs", "Postgres"],
  },
  {
    title: "Quote Builder",
    tag: "Web App",
    description:
      "Turns a messy spreadsheet quoting process into a guided flow with live pricing, reusable templates and one-click PDF exports.",
    tech: ["React", "C# / .NET", "Azure"],
  },
  {
    title: "Ops Pulse",
    tag: "Dashboard",
    description:
      "A lightweight operations dashboard that unifies job status, team capacity and alerts into a single calm view.",
    tech: ["TypeScript", "Node.js", "Charts"],
  },
];