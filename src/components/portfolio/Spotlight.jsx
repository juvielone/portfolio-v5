import React, { useEffect, useRef } from "react";
import useMediaQuery from "@/hooks/useMediaQuery";

export default function Spotlight() {
  const ref = useRef(null);
  const enabled = useMediaQuery("(pointer: fine) and (prefers-reduced-motion: no-preference)");

  useEffect(() => {
    if (!enabled) return;
    let raf;
    const move = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        el.style.setProperty("--x", `${e.clientX}px`);
        el.style.setProperty("--y", `${e.clientY}px`);
        el.style.opacity = "1";
      });
    };
    window.addEventListener("pointermove", move);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-0 transition-opacity duration-700"
      style={{
        background: "radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), var(--spotlight), transparent 70%)",
      }}
    />
  );
}