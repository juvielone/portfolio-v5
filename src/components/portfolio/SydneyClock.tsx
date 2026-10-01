"use client";

import { useSyncExternalStore } from "react";

const format = () =>
  new Date().toLocaleTimeString("en-AU", {
    timeZone: "Australia/Sydney",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

const subscribe = (tick: () => void) => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id);
};

export default function SydneyClock() {
  // Server snapshot is null so the static HTML never shows a stale build-time clock.
  const time = useSyncExternalStore(subscribe, format, () => null);

  return (
    <p className="mt-1 font-mono text-xs tabular-nums text-muted-foreground/80">
      {time ?? "--:--:-- --"} local time
    </p>
  );
}
