# Riffle with `count`

A modified copy of `Riffle` from [@lucasmarkes/hairline](https://github.com/lucasmarkes/hairline) (MIT © Lucas Marques — see `LICENSE`). Same drawing, motion, options and theming, plus a `count` prop.

## Install

Copy this whole `hairline/` folder into your project, e.g. `src/components/hairline/`. No dependencies besides React 18+.

```tsx
import { Riffle } from "@/components/hairline/Riffle";

export default function Page() {
  return <Riffle count={3} />;
}
```

You can uninstall `@lucasmarkes/hairline` if Riffle was the only thing you used from it.

## Props

| Prop        | Default  | Notes |
| ----------- | -------- | ----- |
| `count`     | `8`      | Number of cards, 1–8. Rounded and clamped. Changing it redraws the figure. |
| `intensity` | `0.5`    | 0–1. How far and slow the ripple spreads from the pulled card. |
| `theme`     | `"auto"` | `"auto"`, `"light"` or `"dark"`. |
| `label`     |          | Accessible name. |
| `onRead`    |          | Called with the caption: `"rest"`, `"01"`, `"02"`… |
| `play`      | `false`  | Plays the figure on its own until hovered. |

Plus any `<div>` attribute. Theming uses the same `--hairline-*` CSS variables as the original.

## What changed from the original

- `figures/riffle-geometry.ts`: the fixed `N = 8` is now a parameter. Tray depth follows the count, and the camera zooms in so fewer cards fill the same footprint as eight. Each tab has one hole per card (one row up to 4, a 4 × 2 grid above that; 8 matches the original exactly).
- `figures/riffle.ts`: the engine takes the count; hole size follows the zoom.
- `riffle-figure.ts`, `Riffle.tsx`: new entry and React component with `count`.
- `core/`, `mount.ts`, `intensity.ts`: unchanged copies of the library's engine.
