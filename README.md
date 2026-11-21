# Organization Website Foundation

This project is the Phase 1 foundation for a production-ready Metaxur website built with plain HTML, CSS, JavaScript, and PHP-ready structure.

## Structure

- `index.html` — Homepage shell and primary landing structure
- `about.html` — Secondary page placeholder
- `services.html` — Services page placeholder
- `contact.html` — Contact page placeholder
- `css/` — Centralized styling system
- `js/` — Site behavior and motion hooks
- `data/organization.js` — Centralized organization data placeholder
- `api/contact.php` — PHP API stub for later email integration
- `config/mail.php` — Mail configuration stub
- `.env.example` — Example environment file

## Brand system

- Logo mark: `assets/images/metaxur-mark.svg` (reversed for dark backgrounds: `metaxur-mark-reversed.svg`; full lockup: `metaxur-logo.svg`)
- Favicon: `assets/icons/favicon.svg`
- Purple: `#1900B8`
- Blue: `#0754B5`
- Yellow accent: `#FFDF59`

The palette is centralized in `css/variables.css`. Purple and blue carry the primary UI; yellow is reserved for accents.

## Local preview

Use a simple PHP server from the project root:

```bash
php -S localhost:8000
```

Then open:

```text
http://localhost:8000/index.html
```

## Phase 1 status

This phase focuses on:

- semantic HTML foundation
- CSS variables and base responsive styles
- reusable component patterns
- Metaxur logo and brand colors
- placeholder organization copy awaiting approved company details
- navigation and reveal animations
- readiness for later backend and email phases

## Notes

- Placeholder content is intentionally marked in brackets so it can be replaced with real organization information.
- The contact form and backend are not yet connected to live email delivery.
- Do not commit real secrets or live API keys.
