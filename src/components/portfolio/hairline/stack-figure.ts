import { create, type Figure, type HairlineOptions } from "./mount";
import { mount as engine } from "./figures/stack";

/** Stack from @lucasmarkes/hairline 0.5.1 (MIT © Lucas Marques), unchanged. */

export type { Figure, HairlineOptions };

/** A call stack of five frames: the pointer's height picks one, and the frames above lift away to open it. `intensity` lifts them further. */
export function stack(el: HTMLElement, options?: HairlineOptions): Figure {
  return create({
    id: "stack",
    label: "A call stack of five frames: the pointer's height picks one, and the frames above lift away to open it.",
    rest: "rest",
    engine,
    tour: [[200, 250], [200, 216], [200, 199], null],
  }, el, options);
}
