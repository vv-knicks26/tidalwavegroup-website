# Tidal Wave Group — Website

Official marketing website for **Tidal Wave Group LLC**, a digital marketing
agency based in Dover, DE (tidalwavegroup.co).

It's a fast, fully responsive, dependency-free static site — just HTML, CSS,
and a little vanilla JavaScript. No build step, no frameworks.

## Structure

```
.
├── index.html          # Single-page site (all sections)
├── 404.html            # Custom not-found page
├── CNAME               # Custom domain for GitHub Pages (tidalwavegroup.co)
├── robots.txt
├── sitemap.xml
└── assets/
    ├── css/styles.css  # All styles (brand tokens at the top)
    ├── js/main.js      # Nav, scroll reveal, counters, FAQ, contact form
    └── img/
        ├── logo-mark.svg        # Wave badge mark (header / favicon / app icon)
        ├── favicon.svg          # Simplified mark for small sizes
        ├── logo-full.svg        # Full lockup (mark + wordmark) — light backgrounds
        └── logo-full-white.svg  # Full lockup for dark backgrounds
```

## The logo

A custom **cresting-wave badge** with a matching wordmark, designed for this
project. The mark works standalone (favicon, social avatar) and the full
lockups (`logo-full*.svg`) pair it with the "TIDAL WAVE / GROUP" wordmark.

**Brand colors** (also defined as CSS variables in `styles.css`):

| Token        | Hex       | Use                    |
| ------------ | --------- | ---------------------- |
| Aqua         | `#22D3EE` | Highlights, gradients  |
| Cyan         | `#0891B2` | Primary accent / CTAs  |
| Deep Navy    | `#0A2540` | Text, dark sections    |
| Foam         | `#E6F7FB` | Soft backgrounds       |

Fonts: **Poppins** (headings) + **Inter** (body), loaded from Google Fonts.

## Local preview

No build needed — open `index.html`, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploying to GitHub Pages (with the custom domain)

1. Push this repo to GitHub.
2. **Settings → Pages** → *Build and deployment* → Source: **Deploy from a
   branch**, Branch: `main` / `/root`.
3. The included `CNAME` file sets the custom domain to `tidalwavegroup.co`.
4. At your DNS provider, point the domain at GitHub Pages:
   - Apex `tidalwavegroup.co` → four `A` records:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - (optional) `www` → `CNAME` to `<your-username>.github.io`
5. Back in **Settings → Pages**, tick **Enforce HTTPS** once the cert issues.

The site also works as-is on Netlify, Vercel, Cloudflare Pages, or any static
host — just point it at the repo root.

## Contact form

Submissions are routed to **info@tidalwavegroup.co** — but that address is
never printed anywhere on the site (no `mailto:` text links, no footer
address), to keep it away from spam scrapers.

Two ways it can deliver, in order of preference:

1. **Recommended — a form service.** Set `FORM_ENDPOINT` near the top of
   `assets/js/main.js` to a form endpoint (Formspree, Formcarry, Netlify
   Forms, etc.). Point *that service* at info@tidalwavegroup.co. The inbox
   then lives only in the service's config — nothing email-related ships in
   the site at all.

   ```js
   var FORM_ENDPOINT = "https://formspree.io/f/xxxxxxx";
   ```

2. **Fallback (no backend).** If `FORM_ENDPOINT` is left blank, the form
   opens the visitor's own email client pre-addressed to the inbox. That
   address is **assembled at runtime from fragments** in `main.js` (never a
   literal string), so it isn't sitting in the source for bots to harvest.

Either way, no email address is visible on the rendered page.

## ⚠️ Placeholder content to review before launch

This is a complete, launch-ready template, but a few items use representative
sample content. Please confirm/replace:

- **Contact inbox** — the form routes to `info@tidalwavegroup.co` (not shown
  on the page). To use a different inbox, update the fragments in the
  `inbox()` function in `main.js`, or better, set `FORM_ENDPOINT` to a form
  service pointed at your address (see "Contact form" above).
- **Stats / metrics** — the numbers in the "By The Numbers" section and the
  hero dashboard (ROAS, traffic lift, campaigns, retention) are illustrative
  samples. Swap in your real figures.
- **Testimonials** — the three client quotes are unattributed samples. Replace
  with real, approved client testimonials before publishing.
- **Platform logos** — the "channels & platforms" strip lists common tools;
  edit to match what you actually use.
- **Business hours** — listed as Mon–Fri, 9am–6pm ET; adjust if needed.

## Business details

> **Tidal Wave Group LLC**
> 1272 S Governors Ave, Unit #2035
> Dover, DE 19904
> (888) 665-4586
