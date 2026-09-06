# Mr. Book & Fly — Enhancement Progress

## ✅ Part 1: SEO (Done — pushed to `main`, commit `0bf2a5c8`)

- Added `src/lib/seo.ts` — a `useSEO()` hook that sets a unique title,
  meta description, canonical URL, and OG/Twitter tags per page (client-side).
  Applied to all 18 routes.
- Fixed `public/sitemap.xml`: `/appointment-booking` didn't exist as a route;
  corrected to `/slot-booking`. Added missing entries (`/health-insurance`,
  the blog post).
- `public/robots.txt`: disallowed `/dashboard` (private/user-specific page).
- Wrote real content for `src/pages/BlogDummyTicket.tsx`
  ("What Is a Dummy Ticket for Visa?") — was previously an empty placeholder.
- Known limitation: since this is a client-rendered SPA (no SSR), social
  previews (WhatsApp/Facebook/Twitter crawlers, which don't run JS) will
  still show the homepage's static OG tags from `index.html` regardless of
  which page is shared. Only JS-executing crawlers (e.g. Googlebot) see the
  per-page tags. Fixing this fully would require SSR or prerendering.

## 🕓 Part 2: "Enhance like the reference project" — NOT STARTED

Context: user provided a `.tar` file containing an entirely different,
much larger project (Next.js 16 + Prisma + SQLite + NextAuth + Razorpay +
email service + admin/customer dashboards + 12 PDF doc types) — a full
backend rewrite of a "Mr Book and Fly"-style booking platform. This is a
different tech stack from the current site (Vite + React SPA + Vercel
serverless functions).

Rather than blindly porting the whole thing (multi-week rewrite, new DB,
new payment gateway, new hosting decisions), we agreed to scope this
explicitly. Options discussed, still awaiting user's choice:

1. **Visual/design only** — dark "liquid glass" theme, cinematic hero
   video, animations, matching the reference's look and feel.
2. **New pages only** — e.g. FAQs, Track Booking, Refund Policy timeline,
   Services overview page — built within the *current* stack.
3. **Backend features** — customer login/dashboard, admin panel, real
   payment gateway (currently Stripe/PayPal, reference uses Razorpay),
   auto-generated PDFs/emails, actual database. This is a much bigger
   scope (new hosting/DB/secrets decisions required).

**Next step when resuming:** ask the user which of the above (or what
combination) they want, then scope and execute accordingly.

## Quick facts about the current site
- Stack: Vite + React 19 + TypeScript + react-router-dom (client-side SPA)
- Hosting: Vercel (see `vercel.json`), with a few serverless functions in `api/`
- Live domain: https://mrbookandfly.shop
- GitHub repo: https://github.com/Michio969/Mr.-Book-Fly
