import React from "react";

export default function SectionLabel({ index, children }) {
  return (
    <h2 className="mb-10 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.2em] text-primary">
      <span>{index} • {children}</span>
      <span className="h-px flex-1 bg-border" />
    </h2>
  );
}