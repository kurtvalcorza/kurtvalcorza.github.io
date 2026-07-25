# kurt.valcorza.com

Personal site of **Kurt Valcorza** — science communication, translating AI
R&D into strategic communications.

**Live:** [kurt.valcorza.com](https://kurt.valcorza.com) · deployed from
`main` via GitHub Pages (custom domain in `CNAME`)

## What's on the site

A single-page portfolio of featured projects — AI agent workflows,
Claude Code skills, and speech/ML notebooks — plus an embedded AI Readiness
Assessment chatbot. The project list lives directly in `index.html`; see the
live site or [github.com/kurtvalcorza](https://github.com/kurtvalcorza) for
the current lineup.

## Design

The site follows the [Vercel design language](https://getdesign.md/vercel/design-md)
(the Geist system — "documentation that happens to be selling something"),
adapted in [`DESIGN.md`](DESIGN.md):

- Geist Sans for every text role; Geist Mono for uppercase section eyebrows
- Near-white canvas / near-black ink, 1px hairline rules, tight negative
  tracking on display type
- Bimodal radii — 6px squares for nav chrome, pills for CTAs, 12px for cards
- Monochrome in both themes — no gradients or decorative color
- Dark mode: automatic via `prefers-color-scheme`, with a sun/moon toggle in
  the nav persisted to `localStorage`

AI agents (or humans) making UI changes should follow `DESIGN.md`.

## Structure

```
index.html            single-page portfolio (project cards live here)
assets/css/style.css  design tokens + components
assets/js/theme.js    re-applies a saved theme override before first paint
assets/js/main.js     chat widget + theme toggle behavior
DESIGN.md             design system spec
CNAME                 custom domain
```

## Development

No build step — it's static HTML/CSS/JS:

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

To add a project, copy a `<article class="card">` block in `index.html`, set
its `data-category`, and update the static index markers (`01`, `02`, …) so
they stay contiguous. Bump the `?v=` query on `style.css` / `main.js` whenever
either changes.

## License

MIT — built with AI.
