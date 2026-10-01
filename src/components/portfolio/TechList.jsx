import React from "react";

export default function TechList({ items }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-2">
      {items.map((t) => (
        <li key={t} className="rounded-full bg-accent px-3 py-1 font-mono text-[11px] text-accent-foreground">
          {t}
        </li>
      ))}
    </ul>
  );
}