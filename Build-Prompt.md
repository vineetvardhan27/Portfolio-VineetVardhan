# Freelance Portfolio Website — Elaborated Agent Build Prompt

> Companion docs: `Design.md` (visual system) and `Implementation.md` (technical phases & file structure).
> This file is the master prompt to hand to a coding agent (Claude Code / Cursor). It expands the original brief into concrete stack, library, and animation decisions so the agent doesn't have to guess.

---

## 0. Stack Decision

Build with:

- **Next.js 14 (App Router)** — matches your existing Grove PMS / Hotel Greenery View stack, SSR for SEO on a portfolio site matters.
- **Tailwind CSS** — utility styling, matches Design.md tokens.
- **Framer Motion** — primary animation library for all component-level motion (hero entrance, card hover, section reveals, page transitions).
- **Lenis (studio-freight/lenis)** — smooth inertial scrolling, gives the "premium app" scroll feel the brief describes (Swiggy-like smoothness) without hijacking native scroll behavior.
- **React Hook Form + Zod** — contact form validation, lightweight, no unnecessary bloat.
- **Resend** (or EmailJS if you want zero-backend) — contact form delivery. Resend is preferable since you already run Supabase/Vercel-style infra for clients.
- **next/image** — all screenshots/mockups, for automatic optimization.
- **clsx / tailwind-merge** — conditional class composition for interactive card states.
- **Vercel Analytics** (optional, free tier) — for actual traffic/conversion signal instead of invented stats.

Do **not** use GSAP, Three.js, or particle libraries — brief explicitly rules out floating 3D objects, particles, glow effects.

---

## STEP 1 — Positioning (Copy Layer)

No animation here. Just content constants — put these in a single `content/copy.ts` file so all sections pull from one source (makes future edits agent-safe and avoids copy drift across components).

```ts
export const positioning = {
  primary: "I build websites and software that help businesses grow.",
  secondary: "Websites • Booking Systems • Business Software",
};
```

Avoid "Full-stack / React / Next.js developer" framing in hero — technology appears only in the case-study "Technology" section and services cards, never in the hero.

---

## STEP 2 — Hero Section

**Component:** `components/Hero.tsx`

Structure:
- Left: headline, subtext, primary + secondary CTA (two buttons, primary filled, secondary ghost/outline)
- Right: animated floating dashboard/website preview mockup (a static screenshot or simplified illustrative UI, not a real client screenshot — keep neutral/generic here)

**Framer Motion pattern for entrance:**

```tsx
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

<motion.div variants={container} initial="hidden" animate="show">
  <motion.h1 variants={item}>Your business deserves a better digital experience.</motion.h1>
  <motion.p variants={item}>I design and build fast, modern websites and custom software...</motion.p>
  <motion.div variants={item} className="flex gap-4">
    <Button variant="primary">Start a Project</Button>
    <Button variant="ghost">View My Work</Button>
  </motion.div>
</motion.div>
```

**Floating preview card (right side):**

Use a subtle continuous float, not scroll-triggered:

```tsx
<motion.div
  animate={{ y: [0, -10, 0] }}
  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
>
  <PreviewCard />
</motion.div>
```

Keep translate amplitude ≤10px — brief flags "excessive" motion. Respect `prefers-reduced-motion` by wrapping this in a check (see Step: Accessibility below) and disabling the infinite loop entirely for reduced-motion users.

---

## STEP 3 — Trust / Proof Bar

**Component:** `components/TrustBar.tsx`

Static row, scroll-reveal only (fade + slight y), no continuous animation:

```tsx
<motion.div
  initial={{ opacity: 0, y: 12 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.4 }}
  transition={{ duration: 0.4 }}
>
```

Populate only with real categories you actually deliver: Hotel Websites, Booking Systems, Custom PMS, Business Software. No invented numbers — if you want a counter later, gate it behind real data (e.g., "2 hospitality clients live" is fine; "500+ clients" is not).

---

## STEP 4 — Featured Projects

**Component:** `components/ProjectsGrid.tsx` + `components/ProjectCard.tsx`

Order:
1. Hotel Greenery View (live website + booking-oriented enquiry flow) — live: https://www.hotelgreeneryview.com/
2. Grove PMS (multi-tenant hospitality SaaS — booking, billing, inventory, analytics) — live: https://grovepms.vercel.app/
3. Anugra Travels (interactive 3D globe, real-time data) — live: https://www.anugratravels.com/ — this is your strongest visually distinct third project; it also lets you show range beyond "hotel sites"

Each card: name, one-line problem→solution copy, large screenshot, and **two** CTAs side by side:

- **"View Case Study →"** — internal Next.js `<Link>` into the dynamic case-study route (`/work/[slug]`)
- **"Live Demo ↗"** — external link (`target="_blank" rel="noopener noreferrer"`) straight to the deployed product, using an external-link icon (`lucide-react`'s `ArrowUpRight` or `ExternalLink`) so it's visually distinct from the internal case-study arrow

Store the live URL alongside each project's other data in `content/projects.ts` (see `Implementation.md`) rather than hardcoding it in the component — this is real, verifiable proof-of-work, so treat it the same way as the trust-bar rule: only show a demo link for something that's actually live and stable. If Grove PMS is mid-rebuild at any point and might look unfinished to a visitor, temporarily omit its demo link rather than sending prospects to something in flux.

Two-CTA layout on the card (example):

```tsx
<div className="flex items-center gap-4 pt-2">
  <Link href={`/work/${project.slug}`} className="inline-flex items-center gap-1 font-medium">
    View Case Study <ArrowRight size={16} />
  </Link>
  {project.liveUrl && (
    <a
      href={project.liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-[--text-secondary] hover:text-[--accent] transition-colors"
    >
      Live Demo <ExternalLink size={14} />
    </a>
  )}
</div>
```

---

## STEP 5 — Interactive Project Cards (Framer Motion detail)

```tsx
<motion.div
  className="group relative rounded-2xl border border-neutral-200 overflow-hidden"
  whileHover={{ y: -6 }}
  transition={{ duration: 0.25, ease: "easeOut" }}
>
  <motion.img
    src={project.image}
    whileHover={{ scale: 1.04 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
  />
  <div className="p-6">
    <h3>{project.name}</h3>
    <p className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      {project.secondaryInfo}
    </p>
    <motion.span whileHover={{ x: 4 }} className="inline-flex items-center gap-1">
      View Case Study <ArrowRight size={16} />
    </motion.span>
  </div>
</motion.div>
```

Keep every transition between 200–400ms, `ease: "easeOut"` or a custom cubic-bezier — no spring bounce here (springs read as "playful," brief wants "premium/restrained").

**Mobile:** disable `whileHover`, rely on `whileTap={{ scale: 0.98 }}` instead, and show secondary info by default (no hover-dependent content on touch devices).

---

## STEP 6 & 7 — Services + Pricing

Static content, data-driven from a `content/pricing.ts` array so India/International tabs render from the same source:

```tsx
const [region, setRegion] = useState<'IN' | 'INTL'>('IN');

<motion.div layout className="flex gap-2 p-1 bg-neutral-100 rounded-full w-fit">
  {(['IN', 'INTL'] as const).map((r) => (
    <button key={r} onClick={() => setRegion(r)} className="relative px-4 py-2">
      {region === r && (
        <motion.div layoutId="pill" className="absolute inset-0 bg-white rounded-full shadow-sm" />
      )}
      <span className="relative z-10">{r === 'IN' ? 'India' : 'International'}</span>
    </button>
  ))}
</motion.div>
```

`layoutId` gives the tab-switch its smooth pill-slide — this is the single most "Swiggy-like" micro-interaction in the whole site and costs almost nothing to implement.

---

## STEP 8 — Process ("From Idea to Launch")

Scroll-linked progress line using Framer Motion's `useScroll` + `useTransform`:

```tsx
const ref = useRef(null);
const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

<svg>
  <motion.line x1="0" x2="0" y1="0" y2="100%" style={{ pathLength }} stroke="currentColor" />
</svg>
```

Each of the 4 steps (Understand / Design / Build / Launch) fades in via `whileInView` as the scroll line reaches it — stagger by ~0.15s per step.

---

## STEP 9 — Why Work With Me

Simple 4-card grid, `whileInView` fade+lift, staggered by index. Use `lucide-react` for line icons (already available in this environment's React sandbox and consistent with a minimal aesthetic) — e.g. `Target`, `Wrench`, `Zap`, `MessageCircle`.

---

## STEP 10 — Case Study Pages

**Route:** `app/work/[slug]/page.tsx` (dynamic route, one entry per project in `content/projects.ts`)

Structure per brief: Challenge → Solution → Result → Technology → Screenshots → Next Project.

At the top of each case study, right below the project title, include a prominent **"Visit Live Site ↗"** button (same `liveUrl` field from `content/projects.ts`) — this is the highest-intent CTA on the whole page, since a visitor reading a case study is already convinced enough to want to see the real thing working. Place it above the fold, before "The Challenge" copy begins.

Use Framer Motion's `AnimatePresence` for the "Next Project" transition so navigating between case studies cross-fades instead of hard-cutting:

```tsx
<AnimatePresence mode="wait">
  <motion.div
    key={slug}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
</AnimatePresence>
```

For Technology sections: only list what's actually relevant to *that* project (e.g., Grove PMS → Next.js, Supabase, multi-tenant architecture; Anugra Travels → globe.gl, Three.js, Firebase Realtime DB).

---

## STEP 11 — Testimonials

Only real testimonials (e.g., Ohm Adhikari / Hotel Greenery View, once you have a written quote). If you don't yet have enough testimonials to fill a carousel, **skip this section entirely** rather than inventing content — the brief is explicit about this, and an empty/fake-feeling testimonials section hurts credibility more than omitting it.

Carousel: `overflow-x-auto snap-x` with `scroll-behavior: smooth` is sufficient — no need for a JS carousel library for 2–3 cards.

---

## STEP 12 & 13 — Final CTA + Contact Form

Form validation with Zod:

```ts
const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  brief: z.string().min(10, "Tell me a bit more about what you want to build"),
  budget: z.enum(["15-30k", "30-50k", "50k-1L", "1L+", "500-1000", "1000-2500", "2500+"]),
});
```

Submit via a Next.js Route Handler (`app/api/contact/route.ts`) that calls Resend — keeps the API key server-side, never exposed to the client.

WhatsApp secondary CTA: plain `wa.me` deep link with a pre-filled message, no library needed.

---

## Accessibility / Reduced Motion (apply globally)

Wrap all continuous/looping animations (hero float, any auto-playing carousel) in a check:

```tsx
const shouldReduceMotion = useReducedMotion(); // from framer-motion
```

Use it to skip infinite loops and shorten `whileInView` durations to near-instant for users with `prefers-reduced-motion` set.

---

## Navigation

Sticky nav using `useScroll` to detect scroll position and shrink/add a background blur past ~80px scroll — this is a common "premium app" nav pattern and pairs well with Lenis's smooth scroll.

```tsx
const { scrollY } = useScroll();
const [scrolled, setScrolled] = useState(false);
useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 80));
```

Mobile menu: `AnimatePresence` + `motion.div` sliding in from the right or a full-screen overlay, staggered link entrance matching the hero's stagger pattern for visual consistency.

---

## Handoff Notes for the Agent

- Pull all copy from `content/copy.ts`, `content/projects.ts`, `content/pricing.ts` — never hardcode strings inside components.
- Every `motion.*` component's transition duration must fall in the 200–400ms range unless explicitly a continuous/looping animation (hero float, marquee-style trust bar if used).
- No spring physics (`type: "spring"`) on hover states — use `ease` curves only, per the "restrained, not bouncy" direction.
- Follow `Design.md` for every color, spacing, and typography decision — do not introduce new tokens ad hoc.
- Follow `Implementation.md` for build order and file structure.
