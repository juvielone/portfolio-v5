export const SITE_NAME = "Juvielone Lagos";

export const SITE_DESCRIPTION =
  "Full-stack developer in Sydney building web apps and AI-powered tools that make messy workflows simple.";

// Vercel sets VERCEL_PROJECT_PRODUCTION_URL automatically; NEXT_PUBLIC_SITE_URL overrides it (e.g. a custom domain).
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
