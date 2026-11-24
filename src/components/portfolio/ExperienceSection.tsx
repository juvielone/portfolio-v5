import Reveal from "./Reveal";
import { EXPERIENCE } from "@/content/data";

export default function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-24 pt-28">
      <h2 className="font-heading text-2xl font-semibold tracking-tight">Experience</h2>
      <ol className="mt-8 divide-y">
        {EXPERIENCE.map((job, i) => (
          <li key={job.role} className="group py-6">
            <Reveal delay={i * 0.05}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-medium">
                  <span className="transition-colors duration-300 group-hover:text-primary">{job.role}</span>{" "}
                  <span className="text-muted-foreground">· {job.org}</span>
                </h3>
                <span className="text-sm tabular-nums text-muted-foreground">{job.period}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{job.summary}</p>
              <p className="mt-3 text-xs text-muted-foreground">{job.tech.join(" · ")}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
