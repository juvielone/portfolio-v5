"use client";

import {
  forwardRef, useCallback, useEffect, useLayoutEffect, useRef,
  type ComponentPropsWithoutRef,
} from "react";
import { stack, type Figure, type HairlineOptions } from "./stack-figure";

/**
 * <Stack /> — from @lucasmarkes/hairline/react (MIT © Lucas Marques), the same
 * wrapper as the library's, for the one figure.
 */

export type StackProps = HairlineOptions & Omit<ComponentPropsWithoutRef<"div">, "children" | keyof HairlineOptions>;

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export const Stack = forwardRef<HTMLDivElement, StackProps>(function Stack(props, ref) {
  const { intensity, theme, label, onRead, play, style, ...attrs } = props;
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
    const f = stack(el.current!, { intensity, theme, label: named, play, onRead: (text) => read.current?.(text) });
    figure.current = f;
    return () => { f.destroy(); figure.current = null; };
  }, []);

  useIsoLayoutEffect(() => { figure.current?.update({ intensity, theme, label: named, play }); }, [intensity, theme, named, play]);

  return <div {...attrs} ref={set} style={{ aspectRatio: "5 / 4", ...style }} />;
});
Stack.displayName = "Stack";

export default Stack;
