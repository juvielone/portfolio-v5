import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import TechList from "./TechList";
import { PROJECTS } from "@/content/data";

export default function ProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-24 pt-32">
      <SectionLabel index="03">Projects</SectionLabel>
      <div className="grid gap-5">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.05}>
            <article className="group rounded-2xl border bg-card/50 p-7 backdrop-blur-xs transition-all duration-500 hover:border-primary/40 hover:shadow-[0_20px_50px_-20px_hsl(var(--primary)/0.25)] motion-safe:hover:-translate-y-1.5">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-heading text-xl font-medium transition-colors group-hover:text-primary">{p.title}</h3>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{p.tag}</span>
              </div>
              <p className="mt-3 max-w-xl text-sm text-muted-foreground">{p.description}</p>
              <TechList items={p.tech} />
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
