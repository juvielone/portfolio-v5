import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import TechList from "./TechList";
import { EXPERIENCE } from "@/content/data";

export default function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-24 pt-32 lg:pt-16">
      <SectionLabel index="02">Experience</SectionLabel>
      <ol className="space-y-4">
        {EXPERIENCE.map((job, i) => (
          <Reveal key={job.role} delay={i * 0.05}>
            <li className="group grid gap-2 rounded-xl border border-transparent p-5 transition-all duration-500 hover:border-border hover:bg-card/60 motion-safe:hover:-translate-y-1 sm:grid-cols-[9rem_1fr] sm:gap-6">
              <span className="pt-1 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors group-hover:text-primary">
                {job.period}
              </span>
              <div>
                <h3 className="font-heading text-lg font-medium">
                  {job.role}{" "}
                  <span className="text-muted-foreground">· {job.org}</span>
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {job.summary}
                </p>
                <TechList items={job.tech} />
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
