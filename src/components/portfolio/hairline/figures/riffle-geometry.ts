import {
  Cam, facing, fillet, fit, hull, open, poly, proj, rad, ringAt, rrect, run, seg,
  type Camera, type Projector, type Ring, type Sample, type Vec2,
} from "../core/iso";
import type { Tour } from "../core/stage";

/**
 * Riffle's drawing, with no DOM: the camera, the tray and a card in any pose,
 * as path strings. The engine (riffle.ts) writes these into its svg on every
 * frame.
 *
 * Modified from @lucasmarkes/hairline (MIT): the number of cards is a
 * parameter `n` (1…MAX) instead of a fixed eight. The tray's depth follows
 * `n`, and the camera refits to it, so fewer cards are drawn larger. Each
 * card's tab carries `n` punches, one marked for its number.
 */

/** The most cards the tab's punch grid has room for. */
export const MAX = 8, DEFAULT_COUNT = 8;
export const W = 84, H = 54, G = 13, TW = 22, TH = 7, TABS = [6, 31, 56], TK = 1.4;
export const REST = -12, BACK = -24, FWD = 20, LIFT = 16;
export const X0 = -5, X1 = W + 5, Y0 = -9, WH = 20, WR = 6, WT = 2.4;

/** A count from anything: what is not a finite number is the default; the rest is rounded and clamped to 1…MAX. */
export function cardCount(value: unknown): number {
  const v = typeof value === "string" && value.trim() !== "" ? Number(value) : value;
  if (typeof v !== "number" || !Number.isFinite(v)) return DEFAULT_COUNT;
  return Math.min(MAX, Math.max(1, Math.round(v)));
}

/** The tray's front edge, for n cards. */
export const y1 = (n: number) => (n - 1) * G + 9;

/** The points that must stay in frame: the tray's corners and a card lifted at the back. */
const bounds = (n: number): [number, number, number][] => {
  const Y1 = y1(n);
  return [[X0, Y0, 0], [X1, Y1, -8], [X1, Y0, 0], [X0, Y1, 0], [X0, Y0, H + TH], [X1, Y0, H + TH + LIFT]];
};

/** The width and height those points take on screen. */
const extent = (C: Camera, n: number): [number, number] => {
  const P = proj(C);
  let a = 1e9, b = -1e9, c = 1e9, d = -1e9;
  for (const p of bounds(n)) {
    const q = P(p[0], p[1], p[2]);
    a = Math.min(a, q[0]); b = Math.max(b, q[0]); c = Math.min(c, q[1]); d = Math.max(d, q[1]);
  }
  return [b - a, d - c];
};

/**
 * The camera, fitted to the tray with a card lifted, so nothing leaves the
 * frame in any pose. Fewer than eight cards make a shorter tray, so the camera
 * zooms in until the figure fills the same footprint the eight-card tray does.
 */
export function camera(n: number): Camera {
  const C = Cam(45, 0.5, 1.62);
  if (n < DEFAULT_COUNT) {
    const [w8, h8] = extent(C, DEFAULT_COUNT), [w, h] = extent(C, n);
    C.S *= Math.min(w8 / w, h8 / h);
  }
  fit(C, bounds(n), 200, 166);
  return C;
}

/** The tray's outline and the rim's inner edge. */
export const trayRings = (n: number): { outer: Ring; inner: Ring } => {
  const Y1 = y1(n);
  return {
    outer: rrect(X0, Y0, X1, Y1, WR, 6),
    inner: rrect(X0 + WT, Y0 + WT, X1 - WT, Y1 - WT, WR - WT, 6),
  };
};

/** A run of points ordered left to right on screen. */
const LR = (pts: Vec2[]) => (pts[0][0] <= pts[pts.length - 1][0] ? pts : pts.slice().reverse());

/**
 * The tray's paths, which never move. `far` is painted before the cards, `near`
 * after them; each entry is [d, class].
 */
export function tray(P: Projector, front: (q: Sample) => boolean, outer: Ring, inner: Ring, n: number) {
  const Y1 = y1(n);
  // far half: body, the rim's inner edge, and the floor seam along the far walls
  const far: [string, string][] = [
    [poly(hull(ringAt(P, outer, 0).concat(ringAt(P, outer, WH)))), "sil"],
    [poly(ringAt(P, inner, WH)), "nf"],
    [open(ringAt(P, run(inner, (q) => !front(q)), 2.5)), "nf lo"],
  ];
  // near half: one opaque piece from the rim's inner edge down to the floor
  const iF = LR(ringAt(P, run(inner, front), WH)), oT = LR(ringAt(P, run(outer, front), WH)), oB = LR(ringAt(P, run(outer, front), 0));
  // a finger pull, set into the front
  const hx = (X0 + X1) / 2, onFront = (ring: Ring) => ring.map((q) => P(q.u, Y1, q.v));
  const near: [string, string][] = [
    [poly([...iF, oT[oT.length - 1], ...oB.slice().reverse(), oT[0]]), "fo"],
    [open(oT), "nf lo"],
    [open(iF), "nf"],
    [open([oT[0], ...oB, oT[oT.length - 1]]), "nf sil"],
    [poly(onFront(rrect(hx - 11, 6.5, hx + 11, 12.5, 3, 5))), "nf"],
    [poly(onFront(rrect(hx - 9.4, 8, hx + 9.4, 11, 1.5, 5))), "nf lo"],
  ];
  return { far, near };
}

/**
 * Card i of n, back to front: its number (n at the back), which of the three
 * tab positions it takes, and its filleted outline, drawn upright in its own plane.
 */
export function card(i: number, n: number) {
  const num = n - i, t0 = TABS[(n - 1 - i) % 3];
  const shape = fillet(
    [[0, 0], [W, 0], [W, H], [t0 + TW, H], [t0 + TW, H + TH], [t0, H + TH], [t0, H], [0, H]],
    [1, 1, 3.2, 1.8, 2.4, 2.4, 1.8, 3.2],
  );
  return { n: num, t0, shape };
}

export type CardPose = { back: string; face: string; head: string; rules: string; punch: Vec2[] };

/**
 * Card i leaning th degrees (negative leans back) and lifted by `lift`: its
 * back edge, face, heading and rules as paths, and where each of the `holes`
 * punches of its number sits on the tab: one centred row for up to four, a
 * 4 × 2 grid above that (eight gives the original layout exactly).
 */
export function pose(P: Projector, i: number, t0: number, shape: readonly Vec2[], th: number, lift: number, holes: number): CardPose {
  const yb = i * G, s = Math.sin(rad(th)), c = Math.cos(rad(th));
  const w = (u: number, v: number) => P(u, yb + v * s, v * c + lift);
  const wb = (u: number, v: number) => P(u, yb + v * s - TK * c, v * c + TK * s + lift);
  const cols = Math.min(holes, 4), rows = Math.ceil(holes / 4);
  const punch: Vec2[] = [];
  for (let k = 0; k < holes; k++) {
    punch.push(w(t0 + TW / 2 + ((k % cols) - (cols - 1) / 2) * 3.6, H + TH / 2 + ((rows - 1) / 2 - Math.floor(k / cols)) * 2.8));
  }
  return {
    back: poly(shape.map((p) => wb(p[0], p[1]))),
    face: poly(shape.map((p) => w(p[0], p[1]))),
    head: seg(w(6, H - 11), w(W - 6, H - 11)),
    rules: [H - 18, H - 25, H - 32, H - 39].map((v) => seg(w(6, v), w(W - 6, v))).join(""),
    punch,
  };
}

/** The middle of card i's top edge, at rest. */
export const top = (P: Projector, i: number) => P(W / 2, i * G + H * Math.sin(rad(REST)), H * Math.cos(rad(REST)));

/**
 * A tour of n cards: each one's top edge, back to front, then off the stage.
 * Walked at DOMINO's pace, the cards tip back one after another and stand up again.
 */
export function lap(n: number): Tour {
  const { P } = scene(n);
  // spread out from the middle, so each stop clears the band of the card pulled before it
  return [...Array.from({ length: n }, (_, i) => top(P, i + (i - (n - 1) / 2) * 0.5)), null];
}

/** A quick walk for lap(): the cards' own staggered tweens run the pulls together. */
export const DOMINO = { travel: 260, dwell: 140 };

/** The fitted camera, its projector and facing test, and the tray's rings: what both the engine and the still start from. */
export function scene(n: number) {
  const C = camera(n);
  /* how much the camera zoomed in over the eight-card framing, so sizes set in screen units can follow */
  return { C, P: proj(C), front: facing(C), zoom: C.S / 1.62, ...trayRings(n) };
}
