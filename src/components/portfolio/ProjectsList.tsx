"use client";

import { useState, type ReactNode } from "react";
import SectionLabel from "./SectionLabel";
import CategoryRiffle from "./CategoryRiffle";
import { CATEGORIES, type CategoryId } from "@/content/data";

// Holds the selected category; the cards themselves are rendered on the server.
export default function ProjectsList({ panels }: { panels: Record<CategoryId, ReactNode> }) {
  const [category, setCategory] = useState<CategoryId>("main");
  const label = CATEGORIES.find((c) => c.id === category)?.label;

  return (
    <>
      <div className="mb-8 flex flex-row-reverse items-center justify-between gap-4 sm:flex-row sm:justify-start sm:gap-6">
        <CategoryRiffle value={category} onChange={setCategory} />
        <div className="min-w-0 sm:flex-1 [&>*]:mb-0 [&>*>span:last-child]:hidden sm:[&>*>span:last-child]:block">
          <SectionLabel index="03">{label}</SectionLabel>
        </div>
      </div>
      {panels[category]}
    </>
  );
}
