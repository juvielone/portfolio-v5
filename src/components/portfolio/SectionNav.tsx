"use client";

import { SECTIONS } from "@/content/data";
import useActiveSection from "@/hooks/useActiveSection";

const IDS = SECTIONS.map((s) => s.id);

export default function SectionNav() {
  const active = useActiveSection(IDS);

  return (
    <nav aria-label="Sections" className="mt-16 hidden lg:block">
      <ul className="space-y-5">
        {SECTIONS.map((s, i) => {
          const on = active === s.id;
          return (
            <li key={s.id}>
              <a href={`#${s.id}`} aria-current={on ? "true" : undefined} className="group flex items-center gap-4 py-1">
                <span className={`h-px transition-all duration-500 ${on ? "w-16 bg-primary" : "w-8 bg-muted-foreground/50 group-hover:w-12 group-hover:bg-foreground"}`} />
                <span className={`font-mono text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${on ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>
                  {String(i + 1).padStart(2, "0")} • {s.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
