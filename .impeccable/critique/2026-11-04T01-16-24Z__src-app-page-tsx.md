---
target: homepage
total_score: 18
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 3
target_identity: "file:C:\\Users\\juvie\\OneDrive\\Desktop\\Projects\\portfolio-v5\\src\\app\\page.tsx"
target_fingerprint: "sha256:02b1127030cebe54d6c04028f5fe4159cc0c37736dcff1f3d82d41de7eb96547"
target_path: "C:\\Users\\juvie\\OneDrive\\Desktop\\Projects\\portfolio-v5\\src\\app\\page.tsx"
timestamp: 2026-11-04T01-16-24Z
slug: src-app-page-tsx
---
# Critique: homepage (src/app/page.tsx)
Method: dual-agent (A: design review, B: detector + metadata). No browser automation; overlay unavailable.

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | Active nav/tab clear; Stack frames 4–5 inert |
| 2 | Match System / Real World | 2 | Case Study -> github.com root; Resume -> linkedin.com; "Main" vague |
| 3 | User Control and Freedom | 3 | mailto launches without warning |
| 4 | Consistency and Standards | 2 | Only Experience has visible numbered label; About no heading; Projects heading sr-only |
| 5 | Error Prevention | 2 | Contact only via mailto, no visible email |
| 6 | Recognition Rather Than Recall | 2 | 2/3 projects hidden in tabs; no nav below lg |
| 7 | Flexibility and Efficiency | n/a | portfolio |
| 8 | Aesthetic and Minimalist Design | 2 | spotlight, ticking clock, two figures, duplicated category controls |
| 9 | Error Recovery | 2 | public empty state; no mailto fallback |
| 10 | Help and Documentation | n/a | content site |
| Total | | 18/32 | Acceptable |

## Design Specificity Verdict
Category-interchangeable dev-portfolio template (sticky identity column, cursor spotlight, teal-on-near-black, dim-siblings rows, mono numbered labels, tech pills, glow cards, "Hello! I'm"). Distinctive: real portrait; hairline Riffle/Stack (third-party, loose metaphors). Detector: 0 findings (src + URL desktop); 3 mobile typography advisories (unbalanced Experience h3s, straggler in project description), placeholder-dependent.

## Priority Issues
- [P0] Hero content SSR at opacity:0 via Reveal (7 elements; AboutSection.tsx:10-23); mobile role absent from h1, tagline ~713px, CTA ~1030px. Fix: h1 = name+role, compact mobile photo, CTAs in first viewport, no Reveal above fold. Cmd: layout, clarify.
- [P1] Projects IA: 3 tabs x 1 project; lead card AI-forward ("AI Inbox Assistant"); no visible Projects heading; Riffle duplicates tabs; non-Main projects not in SSR. Fix: single list with category tags, problem-first cards, Riffle unique job or drop. Cmd: distill.
- [P1] Link previews: no og:image, twitter summary, title lacks role, no Person JSON-LD (layout.tsx:16-28). Fix: opengraph-image.tsx, summary_large_image, JSON-LD. Cmd: optimize.
- [P1] Placeholders read as real + Base44 remnant (data.ts:70, next.config.ts:6); resume -> linkedin.com; bare social URLs; unconfirmed bio claims. Fix: visible placeholder treatment, local images, hide dead links. Cmd: harden.
- [P2] Template identity + weak ending (footer only, no closing contact). Fix: closing contact block; one signature idea tied to positioning. Cmd: bolder/layout or redesign.

## Persona Red Flags
Recruiter: text-only preview, no role in h1, AI-first tagline, anonymised employers, AI-wrapper lead project, fake resume link, TOOLKIT unrendered. Casey: no mobile nav, CTA ~1030px, hover-only Stack/dimming, soft upscaled photo, floating toggle. Jordan: Riffle not signposted, vague categories, unexplained Stack. Riley: Stack frames 4-5 unmapped, Riffle touch-tap risk, Stack not focusable, clock ticks under reduced motion.

## Minor Observations
Clock light-mode ~3.6:1 (SydneyClock.tsx:24); dimmed rows ~2:1; borders ~1.25:1; footer inside main; #about no heading; h1 br joins text; stray em dash ProjectCard.tsx:11; portrait black bg on light theme.

## Questions
Without spotlight/sticky column/teal, is it recognisably yours? Why does no card show a workflow? Do Riffle/Stack earn their space?
