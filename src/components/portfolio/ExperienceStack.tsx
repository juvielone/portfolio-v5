"use client";

import type { CSSProperties } from "react";
import { Stack } from "./hairline/Stack";

type Props = { count: number; onHover: (index: number | null) => void };

// Stack reports the frame under the pointer; frames 01–03 map to the three roles
export default function ExperienceStack({ count, onHover }: Props) {
  const read = (text: string) => {
    const n = parseInt(text.match(/\d+/)?.[0] ?? "", 10);
    onHover(n >= 1 && n <= count ? n - 1 : null);
  };

  return (
    <div
      className="-mt-8 w-36 shrink-0 sm:-mt-12 sm:w-60"
      onMouseLeave={() => onHover(null)}
      style={{ "--hairline-hi": "hsl(var(--primary))" } as CSSProperties}
    >
      <Stack intensity={0.6} aria-label="Experience timeline" onRead={read} />
    </div>
  );
}
