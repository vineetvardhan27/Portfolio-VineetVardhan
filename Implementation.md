# Implementation.md — Technical Plan & Build Phases

> Pairs with `Build-Prompt.md` (what to build) and `Design.md` (how it should look/feel). This file covers stack setup, file structure, build order, and testing checklist — the same role `Architecture.md` / `Phases.md` play in the Grove PMS doc set.

---

## 1. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 14 (App Router) | SEO-friendly SSR, matches existing stack |
| Styling | Tailwind CSS | Fast iteration, matches Design.md tokens directly |
| Animation | Framer Motion | Component-level motion, scroll hooks, layout animations |
| Smooth scroll | Lenis (`@studio-freight/lenis`) | Inertial scroll feel without hijacking accessibility |
| Forms | React Hook Form + Zod | Lightweight validation |
| Email delivery | Resend (server-side via Route Handler) | Keeps API key off client |
| Icons | lucide-react | Single consistent line-icon set |
| Images | `next/image` | Automatic optimization/lazy-load |
| Hosting | Vercel | Free tier, matches Next.js, instant preview deploys |
| Analytics (optional) | Vercel Analytics | Real traffic data only, no invented stats |

---

## 2. Folder Structure

```
/app
  /page.tsx                 → Home (all sections composed here)
  /work
    /[slug]/page.tsx         → Dynamic case-study route
  /api
    /contact/route.ts        → Form submission handler (Resend)
  /layout.tsx                → Root layout, nav + footer, Lenis provider
  /globals.css                → Tailwind base + CSS variables from Design.md

/components
  Hero.tsx
  TrustBar.tsx
  ProjectsGrid.tsx
  ProjectCard.tsx
  Services.tsx
  Pricing.tsx
  Process.tsx
  WhyWorkWithMe.tsx
  Testimonials.tsx
  FinalCTA.tsx
  ContactForm.tsx
  Nav.tsx
  Footer.tsx
  /ui
    Button.tsx
    Tabs.tsx
    Card.tsx

/content
  copy.ts                    → Hero/positioning strings
  projects.ts                → Project + case-study data, including each project's `liveUrl`
  pricing.ts                 → India/International pricing data
  testimonials.ts            → Real testimonials only (empty array until available)

Example shape for `projects.ts` (real data, not placeholders):

```ts
export const projects = [
  {
    slug: "hotel-greenery-view",
    name: "Hotel Greenery View",
    liveUrl: "https://www.hotelgreeneryview.com/",
    summary: "Modernized the hotel's online presence with a booking-focused website designed to make rooms, amenities and direct enquiries easier to access.",
    // challenge, solution, result, technology, screenshots[] go here
  },
  {
    slug: "grove-pms",
    name: "Grove PMS",
    liveUrl: "https://grovepms.vercel.app/",
    summary: "Multi-tenant hospitality PMS handling room booking, billing, inventory and analytics.",
  },
  {
    slug: "anugra-travels",
    name: "Anugra Travels",
    liveUrl: "https://www.anugratravels.com/",
    summary: "Travel agency site featuring an interactive 3D globe built with real-time data.",
  },
];
```

`liveUrl` is optional per project (`liveUrl?: string`) — if a project is ever mid-rebuild or unstable, omit the field temporarily rather than linking to something unfinished; both the home-page card and the case-study page should conditionally render the demo CTA based on its presence.

/lib
  lenis-provider.tsx          → Client component wrapping Lenis init
  motion-variants.ts          → Shared Framer Motion variant objects (container/item stagger, card hover, etc.)
  reduced-motion.ts           → useReducedMotion helper wrapper

/public
  /images                     → Screenshots, mockups
```

Keeping `motion-variants.ts` centralized means every component imports the same stagger/easing values instead of redefining `{ duration: 0.3, ease: "easeOut" }` inline everywhere — one place to tune timing globally.

---

## 3. Build Phases

### Phase 1 — Foundation
- Scaffold Next.js + Tailwind, wire up `globals.css` with Design.md CSS variables.
- Set up Lenis provider in root layout.
- Build `Button`, `Card`, `Tabs` primitives in `/components/ui` using Design.md tokens.
- Set up `content/copy.ts`, `content/projects.ts`, `content/pricing.ts` with real data.

### Phase 2 — Static Sections (no motion yet)
- Nav, Hero, TrustBar, Services, Pricing, Process, WhyWorkWithMe, FinalCTA, Footer — built and responsive, mobile-first, before any animation is added. This isolates layout bugs from motion bugs.

### Phase 3 — Motion Layer
- Add Framer Motion entrance/stagger to Hero.
- Add scroll-reveal (`whileInView`) to TrustBar, Services, WhyWorkWithMe, Process.
- Add `useScroll`/`useTransform` progress line to Process section.
- Add sticky-nav scroll-shrink behavior.
- Add reduced-motion guards throughout.

### Phase 4 — Projects & Case Studies
- Build `ProjectCard` with hover interactions (desktop) and tap states (mobile).
- Build dynamic `/work/[slug]` route, pulling from `content/projects.ts`.
- Add `AnimatePresence` cross-fade between case studies.

### Phase 5 — Forms & Contact
- Build `ContactForm` with React Hook Form + Zod schema.
- Build `/api/contact/route.ts` Resend integration.
- Add WhatsApp deep-link CTA.
- Test form submission end-to-end (success + validation error states).

### Phase 6 — Testimonials (conditional)
- Only build this section once at least one real, written testimonial exists.
- If none exist yet, skip the section in the deployed build rather than shipping a placeholder.

### Phase 7 — Polish & QA
- Cross-browser check (Chrome, Safari, mobile Safari especially — iOS scroll behavior with Lenis needs testing).
- Lighthouse pass: target 90+ performance, especially with `next/image` and no unused JS from unneeded libraries.
- Reduced-motion pass: toggle OS setting, confirm all loops/parallax disable correctly.
- Real device test on at least one mid-range Android phone (majority of Indian SME traffic).

### Phase 8 — Deploy
- Deploy to Vercel, connect custom domain.
- Add Vercel Analytics (optional).
- Set up Resend domain verification for contact form deliverability.

---

## 4. Testing Checklist (pre-launch)

- [ ] All CTAs link to correct sections/routes
- [ ] Contact form validates and actually delivers an email
- [ ] WhatsApp link opens with pre-filled message on both mobile and desktop
- [ ] No hover-dependent content is inaccessible on touch devices
- [ ] `prefers-reduced-motion` disables hero float, process progress animation, and any looping motion
- [ ] Pricing tab switch (`layoutId`) works smoothly on first load (no layout shift/flicker)
- [ ] Case-study pages all have real screenshots, not lorem-ipsum placeholders
- [ ] No invented statistics anywhere (trust bar, counters, testimonials)
- [ ] Mobile nav menu opens/closes cleanly, no scroll-lock bugs
- [ ] Lighthouse: Performance 90+, Accessibility 95+, no console errors

---

## 5. Notes for Future Iteration

- If you later add more than 3 projects, `ProjectsGrid` should paginate or filter by category rather than growing indefinitely on the home page — keep the home page to the 3 strongest projects always.
- If testimonials grow past 4–5, swap the manual `overflow-x-auto` carousel for a lightweight library (e.g., `embla-carousel-react`) rather than hand-rolling more carousel logic.
- Revisit `content/pricing.ts` numbers whenever your actual rate card changes — this file is the single source of truth, don't hardcode prices in `Pricing.tsx` or `Services.tsx` directly.
