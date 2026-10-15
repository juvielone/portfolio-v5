"use client";

import { useState, type CSSProperties } from "react";
import { Riffle } from "./hairline/Riffle";
import { CATEGORIES, type CategoryId } from "@/content/data";

// Riffle numbers its 3 cards front to back: 01 Main, 02 Freelance, 03 Personal
const toIndex = (text: string) => {
  const n = parseInt(text, 10);
  return n >= 1 && n <= CATEGORIES.length ? n - 1 : null;
};

const HI = ["hsl(var(--folder-1))", "hsl(var(--folder-2))", "hsl(var(--folder-3))"];

type Props = { value: CategoryId; onChange: (id: CategoryId) => void };

export default function CategoryRiffle({ value, onChange }: Props) {
  const [hover, setHover] = useState<number | null>(null);
  const selected = CATEGORIES.findIndex((c) => c.id === value);
  const shown = hover ?? selected;

  const pick = () => {
    if (hover !== null) onChange(CATEGORIES[hover].id);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="w-36 cursor-pointer sm:w-60"
        style={{ "--hairline-hi": HI[shown] } as CSSProperties}
        onClick={pick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            pick();
          }
        }}
      >
        <Riffle count={3} intensity={0.6} aria-label="Choose project category" onRead={(t) => setHover(toIndex(t))} />
      </div>
    </div>
  );
}
