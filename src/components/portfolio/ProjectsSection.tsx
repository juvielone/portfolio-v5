import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import { CATEGORIES, PROJECTS, type CategoryId } from "@/content/data";

const categoryLabel = (id: CategoryId) => CATEGORIES.find((c) => c.id === id)?.label ?? id;

export default function ProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-24 pt-28">
      <h2 className="font-heading text-2xl font-semibold tracking-tight">Projects</h2>
      <ul className="mt-8 space-y-10">
        {PROJECTS.map((p, i) => (
          <li key={p.title}>
            <Reveal delay={i * 0.05}>
              <a href={p.link} target="_blank" rel="noreferrer" className="group grid gap-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg border bg-accent">
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 144px, calc(100vw - 48px)"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.04]"
                  />
                </div>
                <div>
                  <h3 className="flex items-baseline justify-between gap-4 font-medium">
                    <span className="transition-colors duration-300 group-hover:text-primary">
                      {p.title} <span className="text-muted-foreground">· {p.subtitle}</span>
                    </span>
                    <ArrowUpRight
                      className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
                  <p className="mt-3 text-xs text-muted-foreground">
                    {categoryLabel(p.category)} · {p.tech.join(" · ")}
                  </p>
                  <span className="sr-only">(opens in a new tab)</span>
                </div>
              </a>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
