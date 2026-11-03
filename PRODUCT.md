# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
- Primary: recruiters evaluating Juvie for full-stack roles with an AI lean
  (general full-stack positions where AI integration is a strength).
  They are scanning quickly and deciding whether to reach out.
- Secondary: freelance clients looking for someone to build a web app or
  AI-assisted tool.

## Product Purpose
A personal portfolio that gets recruiters (and clients) to understand who
Juvie is, trust the work, and make contact. Success = contact / résumé
views from the right roles. It must be fast, polished, and highly
discoverable (SEO + rich link previews).

## Positioning
A product-minded full-stack developer who builds practical software around
real-world problems. Juvie learns how a business actually works, finds where
the workflow wastes time or breaks, and turns that into an intuitive, useful
application.

- Core identity: full-stack software engineering combined with product
  thinking and problem-solving.
- What the work delivers: clean, intuitive user experiences and business
  workflow automation.
- AI's role: an important part of the technical direction, used where it
  creates genuine value. Juvie is not someone who follows AI trends or
  builds thin AI wrappers. Copy must never lead with AI hype; AI appears
  as a means, not the identity.
- Range: credible for general software engineering roles and AI-oriented
  roles alike. Positioning must not narrow to either one.
- Working tagline (current site copy, still compatible): "web apps and
  AI-powered tools that make messy workflows simple." Future copy may
  refine it toward the product-minded framing, but must not invent claims.

## Operating Context
- Recruiters often arrive via a shared link (LinkedIn, email, job
  application), so link previews and the first viewport carry the most weight.
- Based in Sydney, Australia (locale en_AU).

## Capabilities and Constraints
- Single-page portfolio: About, Experience, Projects; project categories
  Main / Freelance / Personal; light/dark theme; Sydney clock.
- Next.js (App Router) + TypeScript + Tailwind, deployed on Vercel.
  Rebuilt from a Base44 export — no Base44 code, SDK, or hosting may remain.
- No new dependencies without Juvie's approval.
- Target Lighthouse 95+ in all categories.
- Naming: full name "Juvielone Lagos" for SEO/metadata; "Juvie" in the
  on-page greeting and casual copy.
- Parked: favicon, page title/branding, real content in data.ts.

## Evidence on Hand
- Real project screenshots exist (supplied by Juvie, not yet in the repo).
- `public/hero/profile.png`: hero character image.
- Everything in `src/content/data.ts` is currently UNCONFIRMED: projects
  (Inbox Triage, Quote Builder, Ops Pulse), work history, email, social
  URLs, and the Base44-hosted images. Treat it all as placeholder.
- Never invent projects, employers, dates, metrics, testimonials, or clients.

## Product Principles
1. Problem first: show the real problem and the workflow before the tech or the AI.
2. Recruiter speed: the role fit and a way to make contact are clear within seconds.
3. Discoverable by default: metadata, OG previews, and semantic structure
   are part of the product, not an afterthought.
4. Honest placeholders: unknowns stay visibly placeholder, never fabricated.

## Accessibility & Inclusion
Keyboard navigable, respects prefers-reduced-motion, sufficient contrast in
both themes (WCAG AA).
