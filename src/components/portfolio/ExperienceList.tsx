"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import TechList from "./TechList";
import ExperienceStack from "./ExperienceStack";
import { EXPERIENCE } from "@/content/data";

export default function ExperienceList() {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <>
      <div className="mb-8 flex items-center justify-between gap-4 sm:gap-6">
        <div className="min-w-0 sm:flex-1 [&>*]:mb-0 [&>*>span:last-child]:hidden sm:[&>*>span:last-child]:block">
          <SectionLabel index="02">Experience</SectionLabel>
        </div>
        <ExperienceStack count={EXPERIENCE.length} onHover={setHover} />
      </div>
      <ol className="space-y-4">
        {EXPERIENCE.map((job, i) => {
          const on = hover === i;
          return (
            <Reveal key={job.role} delay={i * 0.05}>
              <li
                className={`group grid gap-2 rounded-xl border p-5 transition-all duration-500 hover:border-border hover:bg-card/60 motion-safe:hover:-translate-y-1 sm:grid-cols-[9rem_1fr] sm:gap-6 ${on ? "border-primary/40 bg-card/60 motion-safe:-translate-y-1" : "border-transparent"} ${hover !== null && !on ? "opacity-50" : ""}`}
              >
                <span
                  className={`pt-1 font-mono text-xs uppercase tracking-wider transition-colors group-hover:text-primary ${on ? "text-primary" : "text-muted-foreground"}`}
                >
                  {job.period}
                </span>
                <div>
                  <h3 className="font-heading text-lg font-medium">
                    {job.role} <span className="text-muted-foreground">· {job.org}</span>
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{job.summary}</p>
                  <TechList items={job.tech} />
                </div>
              </li>
            </Reveal>
          );
        })}
      </ol>
    </>
  );
}
