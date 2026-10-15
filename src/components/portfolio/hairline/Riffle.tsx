"use client";

import {
  forwardRef, useCallback, useEffect, useLayoutEffect, useRef,
  type ComponentPropsWithoutRef,
} from "react";
import { riffle, type Figure, type RiffleOptions } from "./riffle-figure";

/**
 * <Riffle count={3} /> — Riffle with a configurable number of cards.
 *
 * Modified from @lucasmarkes/hairline/react (MIT © Lucas Marques). Renders one
 * empty <div> at a 5:4 aspect ratio and mounts the figure on it in a layout
 * effect, so on the server the box is there and the drawing is not. Changing
 * `count` redraws the figure; every other prop reaches the running figure.
 */

export type RiffleProps = RiffleOptions & Omit<ComponentPropsWithoutRef<"div">, "children" | keyof RiffleOptions>;

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export const Riffle = forwardRef<HTMLDivElement, RiffleProps>(function Riffle(props, ref) {
  const { count, intensity, theme, label, onRead, play, style, ...attrs } = props;
  /* aria-label stays on the div and is the figure's label too, so the two never disagree about the name */
  const named = label ?? props["aria-label"];

  const el = useRef<HTMLDivElement | null>(null);
  const figure = useRef<Figure | null>(null);
  const read = useRef(onRead);
  const set = useCallback((node: HTMLDivElement | null) => {
    el.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) ref.current = node;
  }, [ref]);

  useIsoLayoutEffect(() => { read.current = onRead; });

  useIsoLayoutEffect(() => {
    const f = riffle(el.current!, { count, intensity, theme, label: named, play, onRead: (text) => read.current?.(text) });
    figure.current = f;
    return () => { f.destroy(); figure.current = null; };
    // mounts once; options (count included) reach the figure through the effect below
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* every key is sent, so a prop that was removed goes back to its default */
  useIsoLayoutEffect(() => { figure.current?.update({ count, intensity, theme, label: named, play } as RiffleOptions); }, [count, intensity, theme, named, play]);

  return <div {...attrs} ref={set} style={{ aspectRatio: "5 / 4", ...style }} />;
});
Riffle.displayName = "Riffle";

export default Riffle;
