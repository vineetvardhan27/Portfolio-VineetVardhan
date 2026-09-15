# Design.md — Visual & Motion System

> Reference this file for every color, type, spacing, and animation-timing decision. If a component needs something not defined here, add it here first, then implement — don't improvise ad hoc tokens in component code.

---

## 1. Design Principles

- **Premium, not flashy.** Every visual decision should read as restraint, not decoration.
- **Product, not portfolio.** The site should feel like a small SaaS landing page, not a personal blog.
- **Motion supports reading, never competes with it.** If an animation makes text harder to scan, cut it.
- **Real data only.** No invented stats, no fake testimonials, no placeholder logos presented as real clients.

---

## 2. Color System

Single restrained accent color, everything else neutral.

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#FFFFFF` | Primary background |
| `--bg-subtle` | `#FAFAFA` | Section alternation, cards |
| `--surface` | `#F4F4F5` | Trust bar, tab backgrounds |
| `--border` | `#E4E4E7` | Card borders, dividers |
| `--text-primary` | `#0A0A0A` | Headlines |
| `--text-secondary` | `#52525B` | Body copy |
| `--text-muted` | `#A1A1AA` | Captions, meta |
| `--accent` | `#2563EB` *(or a single brand color of choice — avoid purple/blue gradient combos)* | CTAs, links, active states |
| `--accent-hover` | Darken accent ~8% | Hover state on filled buttons |

Do not introduce a second accent color. Do not use gradients on text or backgrounds — solid fills only, per brief.

---

## 3. Typography

- **Headings:** A geometric/grotesk sans (e.g., *Inter*, *Geist*, or *General Sans*) — matches the "consumer-tech" reference point (Swiggy-adjacent apps typically use clean grotesks).
- **Body:** Same family, lighter weight, for consistency and smaller bundle size (avoid pairing two font families unless there's a strong reason).

| Style | Size (desktop) | Size (mobile) | Weight | Line-height |
|---|---|---|---|---|
| H1 (hero) | 56–64px | 34–40px | 600 | 1.1 |
| H2 (section title) | 36–40px | 26–28px | 600 | 1.2 |
| H3 (card title) | 20–22px | 18px | 600 | 1.3 |
| Body | 16–18px | 15–16px | 400 | 1.6 |
| Caption / meta | 13–14px | 13px | 500 | 1.4 |

Letter-spacing: slightly tight (-0.01em to -0.02em) on headings for a "product" feel rather than an editorial feel.

---

## 4. Spacing & Layout

- Base spacing unit: **8px**. All margins/padding are multiples of 8 (8, 16, 24, 32, 48, 64, 96).
- Max content width: **1200px**, centered, with 24px side padding on mobile, 48–64px on desktop.
- Section vertical rhythm: 96–128px between major sections on desktop, 64px on mobile.
- Card corner radius: **16px** (`rounded-2xl`) — consistent across project cards, service cards, pricing cards.
- Card border: 1px solid `--border`, shadow only `shadow-sm` by default, `shadow-md` on hover — never heavier.

---

## 5. Breakpoints (mobile-first)

| Name | Width |
|---|---|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |

Build every section at `sm` first, then adjust for `lg`/`xl` — do not design desktop-first and shrink down (brief explicitly calls this out for project cards and nav).

---

## 6. Motion Timing Reference

| Interaction | Duration | Easing |
|---|---|---|
| Card hover lift/zoom | 200–300ms | `easeOut` / `cubic-bezier(0.22,1,0.36,1)` |
| Button micro-interaction | 150–200ms | `easeOut` |
| Scroll-reveal (fade+y) | 350–450ms | `easeOut` |
| Stagger delay between children | 100–150ms | — |
| Tab pill slide (`layoutId`) | Framer default spring, damping ~25 | spring (only exception to "no spring" rule — layout transitions read naturally with a soft spring) |
| Hero float loop | 3.5–4.5s | `easeInOut`, infinite |
| Page/case-study cross-fade | 250–300ms | `easeInOut` |

Global rule: nothing loops faster than ~3s or slower than ~5s for ambient motion (feels either anxious or sluggish). All hover/tap feedback stays under 400ms.

---

## 7. Component Visual Patterns

**Buttons**
- Primary: filled `--accent`, white text, `rounded-full` or `rounded-lg` (pick one and use everywhere), subtle scale-down on tap (`whileTap={{ scale: 0.97 }}`).
- Secondary/ghost: transparent bg, 1px border, text in `--text-primary`.

**Project Cards**
- Image on top (16:10 or 16:9 ratio), content below.
- Hover: image scale 1.04, card lift -6px, shadow deepens, arrow shifts +4px.

**Pricing Table**
- Simple two-column table per region, no "recommended plan" badges (brief wants price *expectation*, not a SaaS-style upsell table).

**Icons**
- One icon set only (`lucide-react`) — line-style, 1.5–2px stroke, no filled/duotone icons mixed in.

---

## 8. What to Explicitly Avoid

- Purple/blue gradient hero backgrounds
- Neon glow / drop-shadow-heavy CTAs
- Glassmorphism (frosted blur cards) anywhere
- Blobby organic background shapes
- Floating 3D objects or particle fields
- More than one accent color
- Mixed icon styles
- Animated counters without real underlying numbers
- Testimonial cards without a real client name/business attached
