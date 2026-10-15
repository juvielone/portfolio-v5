import { create, type Figure, type HairlineOptions } from "./mount";
import { engine } from "./figures/riffle";
import { cardCount } from "./figures/riffle-geometry";

/**
 * Riffle with a configurable number of cards.
 *
 * Modified from @lucasmarkes/hairline (MIT © Lucas Marques). Same drawing,
 * motion, options and theming as the original; adds `count` (1…8, default 8).
 */

export type RiffleOptions = HairlineOptions & {
  /** How many cards the tray holds, 1 to 8. Rounded and clamped; anything that is not a number is 8. Default 8. */
  count?: number;
};

export type { Figure, HairlineOptions };

/** A tray of `count` cards. The card under the pointer stands up; the arrow keys walk the cards. `intensity` spreads the ripple further from the pulled card. */
export function riffle(el: HTMLElement, options?: RiffleOptions): Figure {
  const opts: RiffleOptions = { ...options };
  let n = cardCount(opts.count);
  let dead = false;

  /* the card count shapes the tray and the camera, so a new count draws a new figure; every other option updates the running one */
  const make = () => create({
    id: "riffle",
    label: `A tray of ${n} card${n === 1 ? "" : "s"}. Hover or use the arrow keys to pull a card.`,
    rest: "rest",
    engine: engine(n),
    focusable: true,
  }, el, opts);

  let figure = make();

  return {
    update(next: RiffleOptions) {
      if (dead || !next) return;
      const own = opts as Record<string, unknown>, given = next as Record<string, unknown>;
      for (const k in given) {
        if (given[k] === undefined) delete own[k];
        else own[k] = given[k];
      }
      const m = cardCount(opts.count);
      if (m !== n) {
        n = m;
        figure.destroy();
        figure = make();
      } else {
        figure.update(next);
      }
    },
    destroy() {
      if (dead) return;
      dead = true;
      figure.destroy();
    },
  };
}
