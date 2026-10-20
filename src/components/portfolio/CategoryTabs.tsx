"use client";

import { useRef, type KeyboardEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CATEGORIES, type CategoryId } from "@/content/data";

export const tabId = (id: CategoryId) => `projects-tab-${id}`;
export const PANEL_ID = "projects-panel";

type Props = { value: CategoryId; onChange: (id: CategoryId) => void };

export default function CategoryTabs({ value, onChange }: Props) {
  const reduce = useReducedMotion();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: KeyboardEvent, i: number) => {
    const last = CATEGORIES.length - 1;
    const next =
      e.key === "ArrowRight" ? (i === last ? 0 : i + 1)
      : e.key === "ArrowLeft" ? (i === 0 ? last : i - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    onChange(CATEGORIES[next].id);
    refs.current[next]?.focus();
  };

  return (
    <div role="tablist" aria-label="Project category" className="relative flex">
      <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-border" />
      {CATEGORIES.map(({ id, label }, i) => {
        const active = id === value;
        return (
          <button
            key={id}
            ref={(el) => { refs.current[i] = el; }}
            id={tabId(id)}
            type="button"
            role="tab"
            aria-selected={active}
            aria-controls={PANEL_ID}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(id)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={`relative flex-1 px-3 py-2.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:flex-none sm:px-6 sm:text-base ${
              active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {active && (
              <motion.span
                aria-hidden
                layoutId="projects-tab-outline"
                transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }}
                className="absolute inset-x-0 -bottom-px top-0 rounded-t-xl border border-b-0 border-foreground/40 bg-background"
              />
            )}
            <span className="relative">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
