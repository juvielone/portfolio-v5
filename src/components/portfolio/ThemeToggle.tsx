"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const noop = () => () => {};

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(noop, () => true, () => false);
  const isDark = resolvedTheme === "dark";

  // Icons switch via the `dark:` variant so server and client markup always match.
  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={mounted ? (isDark ? "Switch to light mode" : "Switch to dark mode") : "Toggle theme"}
      className="fixed right-5 top-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border bg-card/70 text-foreground backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:text-primary md:right-8 md:top-8"
    >
      <Sun className="absolute h-4 w-4 rotate-0 scale-100 opacity-100 transition-all duration-500 dark:rotate-90 dark:scale-0 dark:opacity-0" />
      <Moon className="absolute h-4 w-4 -rotate-90 scale-0 opacity-0 transition-all duration-500 dark:rotate-0 dark:scale-100 dark:opacity-100" />
    </button>
  );
}
