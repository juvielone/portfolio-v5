import type { ReactNode } from "react";
import Reveal from "./Reveal";
import ProjectCard from "./ProjectCard";
import ProjectsList from "./ProjectsList";
import { CATEGORIES, PROJECTS, type CategoryId } from "@/content/data";

export default function ProjectsSection() {
  const panels = Object.fromEntries(
    CATEGORIES.map(({ id }) => {
      const items = PROJECTS.filter((p) => p.category === id);
      return [
        id,
        <div key={id} className="grid gap-6">
          {items.length === 0 && <p className="text-sm text-muted-foreground">No projects here yet.</p>}
          {items.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>,
      ];
    }),
  ) as Record<CategoryId, ReactNode>;

  return (
    <section id="projects" className="scroll-mt-24 pt-32">
      <ProjectsList panels={panels} />
    </section>
  );
}
