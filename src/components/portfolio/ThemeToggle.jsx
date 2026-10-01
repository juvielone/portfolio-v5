import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const getInitial = () =>
  localStorage.getItem("theme") ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getInitial);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="fixed right-5 top-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border bg-card/70 text-foreground backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:text-primary md:right-8 md:top-8"
    >
      <Sun className={`absolute h-4 w-4 transition-all duration-500 ${isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`} />
      <Moon className={`absolute h-4 w-4 transition-all duration-500 ${isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`} />
    </button>
  );
}