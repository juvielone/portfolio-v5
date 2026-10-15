import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import TechList from "./TechList";
import type { Project } from "@/content/data";

export default function ProjectCard({ project: p }: { project: Project }) {
  return (
    <article className="group grid gap-6 overflow-hidden rounded-3xl border bg-card/60 p-6 backdrop-blur-sm transition-all duration-500 hover:border-primary/40 hover:shadow-[0_20px_60px_-25px_hsl(var(--primary)/0.35)] sm:p-8 md:grid-cols-[0.9fr_1.1fr] md:gap-8">
      <div className="flex flex-col">
        <h3 className="font-heading text-2xl font-normal leading-snug tracking-tight">
          {p.title} —<br />
          <span className="text-muted-foreground transition-colors group-hover:text-foreground">{p.subtitle}</span>
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
        <TechList items={p.tech} />
        <a
          href={p.link}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border bg-background/60 px-5 py-2.5 text-sm transition-colors hover:border-primary hover:text-primary md:mt-auto"
        >
          View Case Study <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">for {p.title} (opens in a new tab)</span>
        </a>
      </div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border bg-accent">
        <Image
          src={p.image}
          alt={`${p.title} interface preview`}
          fill
          sizes="(min-width: 768px) 360px, calc(100vw - 96px)"
          className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-[1.04]"
        />
      </div>
    </article>
  );
}
