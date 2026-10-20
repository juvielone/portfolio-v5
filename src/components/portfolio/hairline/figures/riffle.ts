import type { Vec2 } from "../core/iso";
import { tdone, tset, tval, tween, type Tween } from "../core/motion";
import { BACK, FWD, LIFT, REST, W, card, pose, scene, top, tray } from "./riffle-geometry";
import { disposer, mk, place, pointer, reflect, register, type FigureEls, type FigureHandle, type FigureMount } from "../core/stage";

/**
 * Riffle (Fig 9.1) — a rounded tray holding N cards. The card under the pointer stands up and lifts; the ones in front
 * lean forward and the ones behind lean back, staggered outwards from it on
 * the 700ms lift curve. A discrete figure, so every card runs on tweens.
 *
 * Selection never reads the posed cards: it comes from static oblique bands
 * along the resting top edges, so a card moving out from under the pointer
 * can't flip the choice back and forth. The bands are geometry only; nothing
 * draws them. The stage is a focusable group; the arrow keys walk the cards
 * and the read-out names the one pulled by its number.
 *
 * The drawing itself — camera, tray, a card in any pose — is pure and lives in
 * riffle-geometry.ts; this file is the DOM, the tweens and the input.
 *
 * Modified from @lucasmarkes/hairline (MIT): `engine(N)` makes the engine for
 * N cards (already clamped by the caller) instead of a fixed eight, and a
 * `rest` card can stay pulled when nothing points at the tray.
 */

type Card = {
  n: number; t0: number; shape: Vec2[];
  back: SVGPathElement; face: SVGPathElement; head: SVGPathElement; rules: SVGPathElement;
  punch: SVGCircleElement[];
  /** Lean in degrees, and lift. */
  a: Tween; z: Tween;
};

/** The card the tray rests on, shared with whoever made the engine: they set `card`, the engine sets `apply` to hear a change. */
export type Rest = { card: number; apply?: (card: number) => void };

export const engine = (N: number, rest: Rest = { card: -1 }): FigureMount => ({ stage, svg, read }: FigureEls, value: number): FigureHandle => {
  const bag = disposer();
  let stag = value;

  const { P, front, outer, inner, zoom } = scene(N);
  const paths = tray(P, front, outer, inner, N);

  const g = mk("g", {}, svg);
  reflect(svg, g, P, front, outer, 0, 14);
  for (const [d, cls] of paths.far) mk("path", { d, class: cls }, g);

  const cards: Card[] = [];
  for (let i = 0; i < N; i++) {
    const { n, t0, shape } = card(i, N);
    const grp = mk("g", {}, g);
    const back = mk("path", { class: "lo" }, grp), face = mk("path", { class: "sil" }, grp);
    const head = mk("path", { class: "nf" }, grp), rules = mk("path", { class: "nf lo" }, grp);
    // the card's number, punched on its tab: one hole per card, the card's own marked
    const punch: SVGCircleElement[] = [];
    for (let k = 0; k < N; k++) punch.push(mk("circle", { r: 1.05 * zoom, class: "dot " + (k === n - 1 ? "m" : "off") }, grp));
    cards.push({ n, t0, shape, back, face, head, rules, punch, a: tween(REST), z: tween(0) });
  }

  for (const [d, cls] of paths.near) mk("path", { d, class: cls }, g);

  // hit bands: oblique strips along the RESTING top edges. They never move.
  const c0 = top(P, 0), c1 = top(P, 1), d = [c1[0] - c0[0], c1[1] - c0[1]];
  const px0 = P(0, 0, 0), px1 = P(1, 0, 0), ex = [px1[0] - px0[0], px1[1] - px0[1]];
  const HALF = W / 2 + 14, det = d[0] * ex[1] - d[1] * ex[0];

  // the outer cards give EDGE of their bands to their inner neighbours; the pulled card holds on for STICK past its own
  const EDGE = 0.3, STICK = 0.35;
  /** Where card i's band starts along s. */
  const lo = (i: number) =>
    i <= 0 ? -Infinity : i >= N ? Infinity : i - 0.5 + (N > 2 ? (i === 1 ? -EDGE : i === N - 1 ? EDGE : 0) : 0);

  /** The card whose band holds the point, in the band's own (s, r) coordinates; -1 outside. */
  function hit([x, y]: Vec2) {
    const qx = x - c0[0], qy = y - c0[1];
    const s = (qx * ex[1] - qy * ex[0]) / det, r = (d[0] * qy - d[1] * qx) / det;
    if (Math.abs(r) > HALF || s < -2 || s > N + 3) return -1;
    if (act >= 0 && s >= lo(act) - STICK && s < lo(act + 1) + STICK) return act;
    let i = 0;
    while (i < N - 1 && s >= lo(i + 1)) i++;
    return i;
  }

  function draw(i: number, th: number, lift: number) {
    const cd = cards[i], q = pose(P, i, cd.t0, cd.shape, th, lift, N);
    cd.back.setAttribute("d", q.back);
    cd.face.setAttribute("d", q.face);
    cd.head.setAttribute("d", q.head);
    cd.rules.setAttribute("d", q.rules);
    cd.punch.forEach((el, k) => place(el, q.punch[k]));
  }

  const B = register(stage, (_dt, now) => {
    let moving = false;
    cards.forEach((cd, i) => { draw(i, tval(cd.a, now), tval(cd.z, now)); if (!tdone(cd.a, now) || !tdone(cd.z, now)) moving = true; });
    return moving;
  });
  bag.add(B.unregister);

  let act = -1;
  const caption = (a: number) => (a < 0 ? "rest" : String(N - a).padStart(2, "0"));
  /** Pulls card a (-1 puts them all back). The stagger spreads out from the card pulled, or the one let go. */
  function setActive(a: number) {
    if (a === act) return;
    const now = performance.now(), from = a >= 0 ? a : act;
    act = a;
    cards.forEach((cd, i) => {
      const delay = Math.abs(i - from) * stag;
      const th = a < 0 ? REST : i < a ? BACK : i > a ? FWD : 0;
      tset(cd.a, th, now, delay); tset(cd.z, a === i ? LIFT : 0, now, delay);
      cd.face.classList.toggle("hi", i === a); cd.head.classList.toggle("hi", i === a); cd.punch[cd.n - 1].classList.toggle("m", i !== a);
    });
    read.textContent = caption(a);
    B.wake();
  }

  /* the card that stays pulled when nothing points at the tray; -1 lets them all rest */
  let homeCard = -1, pointing = false;
  const home = () => (homeCard >= 0 && homeCard < N ? homeCard : -1);
  bag.add(pointer(stage, {
    move: (p) => { pointing = true; const h = hit(p); setActive(h < 0 ? home() : h); },
    leave: () => { pointing = false; setActive(home()); },
  }));
  bag.on(stage, "keydown", (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") { setActive(act < 0 ? N - 1 : Math.min(N - 1, act + 1)); e.preventDefault(); }
    else if (e.key === "ArrowRight" || e.key === "ArrowUp") { setActive(act < 0 ? N - 1 : Math.max(0, act - 1)); e.preventDefault(); }
    // Escape puts a pulled card back and claims the key; at home it passes on to the page.
    else if (e.key === "Escape" && act !== home()) { setActive(home()); e.preventDefault(); }
  });
  bag.on(stage, "blur", () => setActive(home()));
  bag.add(() => svg.replaceChildren());

  /* a new home is pulled at once, unless a pointer or the keyboard holds another card */
  rest.apply = (card: number) => {
    homeCard = card;
    if (!pointing && !stage.contains(stage.ownerDocument.activeElement)) setActive(home());
  };
  rest.apply(rest.card);

  return {
    set: (v) => { stag = v; },
    destroy: () => { rest.apply = undefined; bag.dispose(); },
  };
};
