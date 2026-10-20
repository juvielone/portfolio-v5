"use client";

import { useState, type ReactNode } from "react";
import CategoryRiffle from "./CategoryRiffle";
import CategoryTabs, { PANEL_ID, tabId } from "./CategoryTabs";
import type { CategoryId } from "@/content/data";

// Holds the selected category, shared by the folders and the tabs; the cards themselves are rendered on the server.
export default function ProjectsList({ panels }: { panels: Record<CategoryId, ReactNode> }) {
  const [category, setCategory] = useState<CategoryId>("main");

  return (
    <>
      <h2 className="sr-only">Projects</h2>
      <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
        <CategoryRiffle value={category} onChange={setCategory} />
        <div className="w-full min-w-0 sm:flex-1">
          <CategoryTabs value={category} onChange={setCategory} />
        </div>
      </div>
      <div id={PANEL_ID} role="tabpanel" aria-labelledby={tabId(category)}>
        {panels[category]}
      </div>
    </>
  );
}
