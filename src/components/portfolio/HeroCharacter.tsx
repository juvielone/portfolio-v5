"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { HERO_FRAMES } from "@/content/hero-frames";

const { width: W, height: H, cols: COLS, count: COUNT, sheet: SHEET, poster: POSTER } = HERO_FRAMES;
const EASE = 0.12; // interpolation per 60fps frame

// Shows the poster frame immediately; on mouse devices, swaps in a canvas that
// scrubs through the pre-extracted sprite sheet as the cursor moves across the window.
export default function HeroCharacter() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const interactive =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!interactive) return;

    let alive = true;
    let raf: number | null = null;
    const idle = (COUNT - 1) / 2;
    let target = idle;
    let current = idle;
    let drawn = -1;

    const sheet = new window.Image();
    sheet.src = SHEET;

    const draw = () => {
      const i = Math.round(current);
      const ctx = canvasRef.current?.getContext("2d");
      if (i === drawn || !ctx) return;
      ctx.drawImage(sheet, (i % COLS) * W, Math.floor(i / COLS) * H, W, H, 0, 0, W, H);
      drawn = i;
    };
    const tick = (last: number) => (now: number) => {
      const dt = Math.min((now - last) / 16.67, 3);
      current += (target - current) * (1 - Math.pow(1 - EASE, dt));
      if (Math.abs(target - current) < 0.01) current = target;
      draw();
      raf = current === target ? null : requestAnimationFrame(tick(now));
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick(performance.now()));
    };
    const onMove = (e: PointerEvent) => {
      target = (e.clientX / window.innerWidth) * (COUNT - 1);
      kick();
    };
    const onLeave = () => {
      target = idle;
      kick();
    };

    sheet
      .decode()
      .then(() => {
        if (!alive) return;
        draw();
        setReady(true);
        window.addEventListener("pointermove", onMove);
        document.documentElement.addEventListener("pointerleave", onLeave);
      })
      .catch(() => {}); // the poster stays visible if the sprite fails to load

    return () => {
      alive = false;
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="relative mx-auto mb-10 w-full max-w-sm overflow-hidden rounded-2xl">
      <Image
        src={POSTER}
        width={W}
        height={H}
        alt="Anime-style illustrated portrait of Juvie Lagos"
        loading="eager"
        fetchPriority="high"
        sizes="(min-width: 432px) 384px, calc(100vw - 48px)"
        className="h-auto w-full"
      />
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
