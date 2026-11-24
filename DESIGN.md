---
name: Juvielone Lagos — Portfolio
description: Baseline design (v1, not final). A single calm column for recruiters, with a warm orange-red accent and subtle motion.
colors:
  background: "hsl(210 40% 98%)"
  foreground: "hsl(222 47% 11%)"
  card: "hsl(0 0% 100%)"
  muted-foreground: "hsl(215 16% 42%)"
  border: "hsl(214 32% 89%)"
  primary: "hsl(12 78% 42%)"
  primary-foreground: "hsl(0 0% 100%)"
  accent: "hsl(18 80% 94%)"
  accent-foreground: "hsl(12 70% 32%)"
  dark-background: "hsl(216 33% 3%)"
  dark-foreground: "hsl(214 32% 91%)"
  dark-card: "hsl(213 24% 7%)"
  dark-muted-foreground: "hsl(215 20% 65%)"
  dark-border: "hsl(215 20% 14%)"
  dark-primary: "hsl(16 90% 64%)"
  dark-primary-foreground: "hsl(216 33% 3%)"
  dark-accent: "hsl(16 40% 13%)"
  dark-accent-foreground: "hsl(18 90% 74%)"
typography:
  display:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 8vw, 4.75rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.04em"
  section-heading:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    letterSpacing: "-0.025em"
  lead:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    lineHeight: 1.375
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  small:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
  meta:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
  data:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
rounded:
  lg: "8px"
  xl: "16px"
  full: "9999px"
spacing:
  gutter: "24px"
  column: "42rem"
  section-top: "112px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
  button-secondary:
    textColor: "{colors.foreground}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
  project-thumb:
    backgroundColor: "{colors.accent}"
    rounded: "{rounded.lg}"
    width: "144px"
---

# Design System: Juvielone Lagos — Portfolio

> **Status: baseline (v1).** This is the agreed starting layout and structure, not the final visual design. Refine on top of it; don't replace it without Juvie's say-so.

## Overview
A single centred column that reads top to bottom like a short, confident résumé: who Juvie is, what they've done, what they've built. It's built for recruiters who skim, so there's no sidebar, no tabs and no decoration that competes with the content. Personality comes from small, well-timed motion and one warm accent, not ornament.

Explicitly left behind (the old template look): sticky identity sidebar, cursor spotlight, teal on near-black, dimming sibling rows, numbered mono section labels ("02 •"), tech pills, glow cards, hairline Riffle/Stack figures.

## Colors
One accent, used sparingly. Tokens are HSL triplets in `src/app/globals.css` (`:root` and `.dark`), exposed to Tailwind via `@theme inline`.

### Primary
Orange-red, `primary`. Used for hover states (role/title text, social icons, nav underline), the highlighted phrase in the tagline, and the primary button. Never for large surfaces or body text.

### Neutral
Cool near-white / near-black backgrounds, slate `muted-foreground` for all secondary text (company, dates, descriptions, tech lines), and a low-contrast `border` for dividers.

### Accent
`accent` is a pale tint of the primary, used only as the placeholder fill behind project thumbnails.

### Named Rules
- **One accent:** no second hue. Emphasis comes from weight, size or the single accent.
- **Hover earns the colour:** at rest the page is mostly neutral; the accent shows up when someone interacts.

## Typography
Space Grotesk for the name and section headings, Inter for everything else, JetBrains Mono only for live data (the Sydney clock) and the 404 code. All via `next/font`.

### Hierarchy
- **Name (h1):** Space Grotesk 600, fluid `clamp(2.75rem, 8vw, 4.75rem)`, tracking -0.04em, with the role ("Full-stack developer") underneath at 0.42em, regular weight, muted.
- **Lead:** Inter 1.25rem, the tagline. One phrase may be in `primary`.
- **Section heading (h2):** Space Grotesk 600, 1.5rem, plain words ("Experience", "Projects"). No numbers, no eyebrows.
- **Item title (h3):** Inter medium, base size, "Title · subtitle" with the second part muted.
- **Body / description:** Inter 0.875rem, muted.
- **Meta line:** Inter 0.75rem, muted, values joined with " · " (e.g. "Freelance · React · C# / .NET").

## Layout
- Single column, `max-w-[42rem]`, centred, 24px side gutter at every width.
- Header: name (link to top) on the left, About / Experience / Projects text nav on the right. It leaves room for the fixed theme toggle on mobile.
- Sections start with `pt-28`. Hero starts `pt-20` (`sm:pt-28`).
- Experience: divided list. Role + company left, dates right (tabular numbers), then summary, then tech line.
- Projects: single list (no tabs), 2.5rem apart. A 144px 4:3 thumbnail on the left from `sm` up, stacked above the text on mobile. Category is shown as text in the meta line.

## Elevation & Depth
Flat. No shadows, no glows, no glass. Structure comes from spacing and 1px dividers. The only layered element is the fixed theme toggle (`bg-card/70` with backdrop blur), which has to stay readable over content.

## Shapes
Fully rounded buttons and the theme toggle; 16px radius on the hero portrait; 8px on project thumbnails. No cards.

## Components

### Buttons
`HeroActions`: a primary "Say hello" (mailto) and a secondary "Resume", both pill-shaped with icons, lifting 2px on hover.

### Navigation
`SiteHeader`: text links. On hover the text goes to `foreground` and a 1px `primary` underline grows from the left (400ms, ease `cubic-bezier(0.22,1,0.36,1)`).

### Hero
`AboutSection`: 72px portrait + "Sydney, Australia" + live clock, then name/role, tagline, intro paragraph, buttons, social icons.

### Experience row
`ExperienceSection`: hover turns the role `primary`. Rows fade up on scroll via `Reveal`.

### Project row
`ProjectsSection`: the whole row is one link. On hover the title turns `primary`, the thumbnail scales to 1.04 (700ms), and the arrow nudges up-right.

## Motion
Subtle and purposeful. It's part of the personality, so keep it, but keep it quiet.
- **Hero entrance:** CSS `animate-hero-in` (fade + 0.5rem rise, 1s) staggered 0 / 80 / 160 / 220 / 280ms. It's CSS so the hero never depends on JS to become visible.
- **Scroll reveal:** `Reveal` (framer-motion), fade + 24px rise, 0.8s, ease `[0.22,1,0.36,1]`, 50ms stagger per item, once.
- **Hover:** colour shifts 300ms; transforms use the same ease-out curve.
- Everything collapses under `prefers-reduced-motion` (global rule in `globals.css`, and `Reveal` checks `useReducedMotion`).

## Do's and Don'ts
### Do:
- Keep it one column and to the point. Each section is a heading and a list.
- Use the meta-line pattern (" · " separated, muted, 0.75rem) for any tags or stack info.
- Keep both themes at WCAG AA, and check hover colours in both.
- Put `Reveal` inside list items, never as a direct child of `<ol>`/`<ul>`.
### Don't:
- Bring back the sticky sidebar, spotlight, teal, numbered labels, pills, glow cards or category tabs.
- Add a second accent colour, gradients, or decorative shadows.
- Use monospace for anything that isn't data or code.
- Add an eyebrow/kicker above headings.
