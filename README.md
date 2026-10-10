# RKS Technology Group — Website

The website for RKS Technology Group LLC, a technology consulting and talent solutions firm. Organizations and candidates can learn about the company, its services and approach, then send an enquiry that is emailed to the administrator.

It's a responsive, accessible, single-page site built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, shadcn/ui (Base UI), and Framer Motion. Enquiries are delivered through [Resend](https://resend.com).

> **Content is client-approved.** A few contact details are still to be supplied (marked `TODO(client)`) in [`config/organization.ts`](config/organization.ts) before launch (see [Content to replace](#content-to-replace)).

---

## Tech stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Server Components, Server Actions, Turbopack) |
| UI | React 19, Tailwind CSS v4, shadcn/ui (`base-sera` style on Base UI), Lucide icons |
| Motion | Framer Motion (`LazyMotion` + `domAnimation`, honours `prefers-reduced-motion`) |
| Forms | React Hook Form + Zod (one schema shared by client and server) |
| Email | Resend, isolated behind `lib/email/mailer.ts` |
| Fonts | Archivo (headings), Noto Sans (body) via `next/font` |

There is no database. Submissions go straight to email. To store them later, add PostgreSQL + Prisma and save the submission inside `submitContactForm` (`lib/contact/actions.ts`) before or after sending the email. Nothing else needs to change.

## Brand system

The palette is sampled from the official logo (`assets/brand/rks-logo-source.png`) and defined as tokens in `app/globals.css`:

| Token | Colour | Used for |
| --- | --- | --- |
| `brand` | Indigo `#1800AD` | Primary buttons, eyebrows, icon tiles, "Why RKS" band |
| `brand-2` | Blue `#004AAD` | Links, secondary icons, hover states, CTA band, focus ring |
| `highlight` | Yellow `#FFDE59` | Accents and text on indigo/blue only; selection colour |
| `surface` | `#F3F3F6` | Alternating section backgrounds (matches the logo backdrop) |

Yellow text on white fails WCAG contrast, so keep yellow to fills, or to text on indigo/blue.

Other brand elements:

* **Logo:** `assets/brand/rks-logo.png`, a transparent, tightly cropped lockup generated from the source artwork. It's used in the header, footer and social image.
* **Mark:** `components/brand/brand-mark.tsx`, the three logo shapes redrawn as SVG. It's used for the favicon (`app/icon.svg`), the hero artwork and the CTA motif.
* **"Leaf" corners:** the `rounded-leaf-sm`, `rounded-leaf` and `rounded-leaf-lg` utilities repeat the logo's opposite-rounded corners on panels and icon tiles.
* **Tri-colour bar:** `BrandBar` sits beside section eyebrows, and a full-width rule runs above the footer.

**Cursor interactions** (mouse only, never on touch):

* The hero shapes drift with the cursor at different depths (`ParallaxMark`).
* The main buttons have a slight magnetic pull (`Magnetic`).
* A spotlight and border glow follow the cursor across the service and mission cards, the divider lines of the "What we do" grid light up near the cursor, and a soft glow tracks it on the "Why RKS" band (`Spotlight` plus the `.spotlight-*` classes in `globals.css`).
* The About graphic's squares light up on hover.

The movement effects switch off when the visitor has asked for reduced motion.

**3D and depth effects:**

* `TiltCard` tilts the hero services card, the About photo and the Commitment photo toward the cursor, with a light glare. Inner layers sit at different depths (`translate-z-*`).
* `ParallaxImage` shifts the background photos (hero, "Why RKS" band, "Building Relationships That Last" band) gently against the cursor.
* Both are built on `usePointerParallax` and switch off for touch and reduced motion.

**Photography:** five Unsplash stock photos in `assets/images/`, wired up in `config/images.ts` (credits and licence in `assets/images/CREDITS.md`). They illustrate each section's theme and don't show RKS staff. Replace them with the company's own photos when available.

The logo's indigo **R** has too little contrast on dark backgrounds, so the logo is only placed on light surfaces. If you need a version for dark backgrounds, ask the designer for an official reversed logo.

## Project structure

```text
app/
├── layout.tsx            Root layout, fonts, SEO metadata, MotionProvider
├── page.tsx              Home page composition + Organization JSON-LD
├── globals.css           Design tokens (brand palette), base styles, utilities
├── opengraph-image.tsx   Generated social-share image (built from config)
├── robots.ts             /robots.txt
└── sitemap.ts            /sitemap.xml
assets/brand/             Logo source artwork + processed transparent lockup
components/
├── brand/                BrandMark (SVG logo mark), BrandBar (tri-colour accent)
├── layout/               Header (sticky, mobile menu, active section), Footer, Logo
├── sections/             Hero, WhyRks, About, WhatWeDo, Services, Approach, Mission, Commitment, CTA (relationships), Contact
├── contact/              ContactForm (client component)
├── motion/               MotionProvider, Reveal (scroll reveal), AnimatedCounter
└── ui/                   Button, Input, Textarea, Label, SectionHeading, SocialIcon
config/
└── organization.ts       ALL organization content: name, copy, contact, nav, services…
lib/
├── contact/
│   ├── schema.ts         Zod schema + limits (shared client/server)
│   ├── actions.ts        "use server" — validation, spam checks, rate limit, send
│   ├── rate-limit.ts     In-memory rate limiter (swappable interface)
│   └── email-template.ts HTML + plain-text admin email, escaping
├── email/mailer.ts       Email provider boundary (Resend implementation)
├── env.server.ts         Validated server-only environment variables
└── site.ts               Public site URL helper
```

Only the header, contact form, scroll reveals and counters ship as client components. Everything else is server-rendered and statically prerendered.

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values:

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes (production) | Public URL, e.g. `https://www.example.org`. Used for canonical URLs, Open Graph, robots.txt, sitemap. |
| `ADMIN_EMAIL` | Yes | Inbox that receives contact form submissions. |
| `RESEND_API_KEY` | Yes | API key from <https://resend.com/api-keys>. |
| `CONTACT_FROM_EMAIL` | Yes (production) | Sender, e.g. `Website <no-reply@your-domain.com>`. Must be on a domain verified in Resend. Defaults to Resend's sandbox sender `onboarding@resend.dev`. |
| `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` | Multi-instance only | Stable key so Server Action IDs stay valid across instances. |

Secrets are read only in `server-only` modules and never reach the browser. `.env*` files are git-ignored, except `.env.example`.

## Running locally

Requires Node.js 20.9 or later.

```bash
npm install
cp .env.example .env.local   # then edit values
npm run dev                  # http://localhost:3000
```

Other commands:

```bash
npm run lint      # ESLint (incl. React Compiler rules)
npx tsc --noEmit  # Type check
npm run build     # Production build (also type-checks)
npm run start     # Serve the production build
```

### Testing email locally

* **Quickest:** set `CONTACT_FROM_EMAIL="Website <onboarding@resend.dev>"` and set `ADMIN_EMAIL` to the email address of your Resend account. Resend's sandbox only delivers to that address.
* **Without sending real email:** the Resend SDK honours `RESEND_BASE_URL`, so you can point it at a local mock server that returns `{ "id": "test" }`.

## Configuring the administrator email

1. Create a Resend account and an API key, and set `RESEND_API_KEY`.
2. In Resend → **Domains**, add and verify your domain (SPF/DKIM DNS records).
3. Set `CONTACT_FROM_EMAIL` to an address on that domain, e.g. `Website <no-reply@your-domain.org>`.
4. Set `ADMIN_EMAIL` to the inbox that should receive enquiries.
5. Restart the server (or redeploy). Environment variables are read at runtime.

## How the contact form works

```text
Visitor fills form
  → Client validation (React Hook Form + shared Zod schema, inline accessible errors)
  → Server Action submitContactForm()            [Next.js CSRF origin check, 64 KB body limit]
      1. Re-validate all fields with the same Zod schema (lengths, email format, no line breaks,
         topic must be one of contactSection.topics)
      2. Spam checks: hidden honeypot field + minimum fill time (2.5 s) → silently discarded
      3. Rate limit: 5 submissions / 10 minutes per IP
      4. Build HTML + text email (all user input HTML-escaped, subject line stripped of control chars)
      5. Send via Resend to ADMIN_EMAIL with Reply-To = visitor's email
  → Visitor sees success panel, or a friendly inline error (validation / rate limit / provider / network)
```

Logs record only the outcome and the provider's email ID, never the visitor's personal data. Error responses never include internal details.

The admin email ("New website enquiry: <topic> — <name>") contains name, email, phone, the topic they need help with, their message, and the submission time (UTC). Replying to it goes directly to the visitor.

## Deployment

### Vercel (recommended)

1. Push the repository to GitHub/GitLab and import it in Vercel.
2. Add the environment variables (Production + Preview): `NEXT_PUBLIC_SITE_URL`, `ADMIN_EMAIL`, `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`.
3. Deploy. The build command is `npm run build`, and the output is detected automatically.
4. After the first deploy, set `NEXT_PUBLIC_SITE_URL` to the final domain and redeploy, so canonical URLs, the sitemap and OG tags use it.

### Self-hosted (Node)

```bash
npm ci
npm run build
NODE_ENV=production npm run start   # listens on port 3000 (use -p to change)
```

Run it behind a reverse proxy (nginx, Caddy) with HTTPS. Make sure the proxy forwards `X-Forwarded-For`/`X-Forwarded-Host`; the rate limiter and Server Action CSRF check depend on them. If the proxy's host differs from the public host, add it under `experimental.serverActions.allowedOrigins` in `next.config.ts`. When running several instances, set a shared `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY`.

## Content to replace

The site uses the client-approved copy in `config/organization.ts`. Some details are still missing; search the file for `TODO(client)`. Each one is `null` and hidden on the site until it's filled in:

- [ ] **Email**: the approved copy listed the website (www.rkstechnologygroup.com) under "Email". Confirm the real inbox and set `contact.email`.
- [ ] **Phone**: `contact.phone` (the copy had "12345679 / Actual business number")
- [ ] **Office address**: `contact.address`, e.g. `{ lines: ["Street", "City, State ZIP"], mapUrl: "https://…" }`
- [ ] **Business hours**: `contact.officeHours`, e.g. `[{ days: "Monday – Friday", hours: "9:00 AM – 5:00 PM" }]`
- [ ] **Map location**: `contact.location`, e.g. `{ latitude: 40.748817, longitude: -73.985428, zoom: 15 }`. In Google Maps, right-click the office and click the coordinates to copy them. The Contact section then shows an embedded Google Map (no API key needed) with an "Open in Google Maps" link, and the address gets a "View on map" link.
- [ ] Social media profiles: `socialLinks` (optional)
- [ ] Optional photo for the About section: `about.image` (put the file in `public/images/`)
- [ ] Production URL: set `NEXT_PUBLIC_SITE_URL=https://www.rkstechnologygroup.com` in the host's environment variables

If you change the services, also update `contactSection.topics`. Those are the options in the form's "What can we help you with?" field, and the server only accepts values from that list.

## Known limitations

- **Rate limiting is in-memory**, per server instance. It resets on restart and isn't shared across serverless instances. For stronger guarantees, implement the `RateLimiter` interface in `lib/contact/rate-limit.ts` with a shared store such as Upstash Redis, or add a CAPTCHA (e.g. Cloudflare Turnstile).
- Spam protection is heuristic (honeypot + timing). Determined bots can bypass it; rate limiting bounds the damage.
- Submissions aren't stored. If the email provider is down, the visitor sees an error and is asked to retry or email directly.
- The site is light-theme only and in English.
- The client IP is taken from `X-Forwarded-For`, which is only trustworthy behind a proxy that sets it (Vercel and most hosts do).
