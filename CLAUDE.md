# Juvie Lagos — Portfolio

## Goal
Personal portfolio with my own custom design. I'm a full-stack developer
positioning toward a niche: building web apps and software with AI.
Audience: recruiters (primary) and freelance clients.
The site must be fast, polished, and highly discoverable (SEO + link previews).

## Origin
Exported from Base44 and being rebuilt as a self-hosted Next.js app.
No Base44 code, SDK, auth, or tooling should remain or be reintroduced.

## Stack
- Next.js (App Router) + TypeScript + Tailwind CSS
- framer-motion for animation, lucide-react for icons, next-themes for dark mode
- Deployed on Vercel

## How to work with me
- Before implementing anything (modifying files, running git commands, or
  deploying): first tell me the plan, then stop and wait for my explicit go
  signal. Never start implementing in the same message as the plan.
- Ask clarifying questions only when necessary — for major changes, direction
  changes, or when I ask. Don't expand scope beyond what I requested.
- Don't add new dependencies without asking.
- Run `npm run lint` and `npm run build` before reporting work as done;
  report failures honestly.

## Content
- `data.ts` holds all site content (experience, projects, links, contact).
  It is currently placeholder content — some true, some not.
- Never invent facts about me. Use placeholders or ask.

## Code conventions
- Server Components by default; add "use client" only for interactivity
  (theme toggle, animations, clock, scroll tracking).
- Small, focused components; sparse comments.
- Use next/font for fonts and next/image for images.
- SEO: use the Metadata API, Open Graph tags, a sitemap and robots.txt,
  and semantic HTML.
- Accessibility: keyboard navigable, respect prefers-reduced-motion,
  sufficient contrast in both themes.
- Target Lighthouse 95+ across all categories.

## Parked (do later, not now)
- Favicon, page title/branding.
- Real content in data.ts.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
