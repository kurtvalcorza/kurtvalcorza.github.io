# DESIGN.md — kurt.valcorza.com

Design system for this site, adapted from the
[Vercel DESIGN.md](https://getdesign.md/vercel/design-md)
(via [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md)).
AI agents working on this repository should follow these rules for any UI change.

## Design principle

"Documentation that happens to be selling something." Geist Sans carries every
heading, control, and paragraph; Geist Mono is reserved for small uppercase
section eyebrows. A single near-black ink sits on a near-white canvas, and the
1px hairline — not shadow, not fill — is what defines every card, input, and
divider. The only color the page allows itself is a soft multi-stop mesh
gradient confined to the hero. Everywhere else: restraint.

There is no second decorative system. No photography, no illustrations, no
heavy elevation, no icon fonts. The only graphics are inline monochrome SVGs in
the nav — the GitHub wordmark, the social links, and the sun/moon theme toggle —
each drawn in `currentColor`.

## Color palette

Light is the reference mode. Dark inverts the ladder (Geist's own dark palette)
and is applied via `prefers-color-scheme`, or explicitly by `theme.js` writing
`data-theme` on `<html>`.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--ink` | `#171717` | `#ededed` | Headings, high-emphasis text |
| `--body` | `#4d4d4d` | `#a1a1a1` | Paragraphs, secondary copy |
| `--mute` | `#8f8f8f` | `#8f8f8f` | Captions, eyebrows, metadata |
| `--faint` | `#a1a1a1` | `#6e6e6e` | Card indices, arrow glyphs, lowest tier |
| `--canvas` | `#fafafa` | `#000000` | Page background |
| `--elevated` | `#ffffff` | `#0a0a0a` | Cards, buttons, inputs |
| `--surface-soft` | `#f2f2f2` | `#1a1a1a` | Hover wells, quiet panels |
| `--hairline` | `#ebebeb` | `#2e2e2e` | The 1px border on everything |
| `--hairline-strong` | `#d4d4d4` | `#454545` | Hover border |
| `--primary` | `#171717` | `#ededed` | Primary CTA fill |
| `--on-primary` | `#ffffff` | `#0a0a0a` | Text on primary fill |
| `--link` | `#0070f3` | `#3b9eff` | Links, hover accent, focus |

Step the grey text ladder deliberately: `--ink` → `--body` → `--mute` →
`--faint`. Never set body copy in pure black.

### Mesh gradient

The legacy Vercel gradient trio survives as the hero's only flourish, blended
as four soft radial blooms behind the headline:

| Stop | Value |
|---|---|
| develop | `0, 124, 240` |
| preview | `121, 40, 202` |
| pink | `255, 0, 128` |
| ship | `249, 203, 40` |

Alpha is `--mesh-alpha` (0.16 light, 0.26 dark). The gradient lives in
`.hero::before` and must not appear anywhere else on the page.

## Typography

Two faces, both Geist, loaded from Google Fonts:

- **Geist Sans** (`--font-sans`) — all UI and prose. Fallback: Inter, then system sans.
- **Geist Mono** (`--font-mono`) — uppercase section eyebrows and card indices
  only (this site has no code blocks). Fallback: `ui-monospace`.

| Role | Size | Weight | Line height | Tracking |
|---|---|---|---|---|
| Hero display (`.display`) | 48px | 600 | 48px | -2.4px |
| Card heading (`.card h3`) | 20px | 600 | 28px | -0.4px |
| Eyebrow (`.eyebrow`) | 12px | 500 | 16px | 0, uppercase, mono |
| Lede (`.hero-lede`) | 16px | 400 | 24px | 0 |
| Body (default) | 14px | 400 | 20px | 0 |
| Label / link (`.btn-link`, `.writing-title`) | 14px | 500 | 20px | -0.28px |
| Meta (`.writing-meta`, `.tag`) | 12px | 400 | 16px | 0 |
| Button (`.btn`, `.chat-toggle-btn`) | 16px | 500 | 20px | 0 |

Weight is effectively binary: 600 for headings, 500 for buttons and labels, 400
for everything else. No light weight, no black weight, no italic. Display type
carries tight negative tracking — do not loosen it. On mobile the hero drops to
32px / -1.28px.

## Spacing & layout

4px base unit: 4 · 8 · 12 · 16 · 24 · 32 · 40 · 64 · 96 · 128px, exposed as
`--s-xxs` through `--s-section`.

- Container: 1200px max width, 24px gutters.
- Card interiors: 24px. Section rhythm: 96–128px vertical.
- Button padding is horizontal-only (`0 14px` for pills); height comes from an
  explicit `height` plus line-height, never vertical padding.
- Project grid: `auto-fill, minmax(320px, 1fr)`, 16px gap — collapses to 1-up
  under 640px.

Whitespace is structural. Cards are grouped by hairlines and gaps, never by
background blocks.

## Shapes

The radius language is bimodal — tight squares for functional chrome, full
pills for CTAs, mid-radius for content.

| Token | Value | Use |
|---|---|---|
| `--r-sm` | 6px | Nav icon buttons, theme toggle |
| `--r-md` | 12px | Project cards, chat window |
| `--r-lg` | 16px | Larger panels |
| `--r-pill-category` | 64px | Filter category pills |
| `--r-pill` | 100px | Marketing CTAs, chat toggle |
| `--r-full` | 9999px | Tag chips |

Never mix the shapes within one context: CTAs stay pills, nav/app chrome stays
6px squares.

## Elevation

| Level | Treatment | Use |
|---|---|---|
| 0 — Flat | 1px `--hairline`, no shadow | Default cards, nav, dividers |
| 1 — Whisper | Border + `0 1px 1px rgba(0,0,0,.04)` | Card hover |
| 2 — Floating | `0 2px 2px` + `0 8px 16px -4px` low-alpha stack | Chat window |

Reach for the hairline before the shadow. Flat is the default.

## Components

- **`.site-nav`** — canvas background, bottom hairline, 12px/24px padding. Holds
  the wordmark left, icon links + theme toggle right.
- **`.nav-links a` / `.theme-toggle-btn`** — 32px square hit area, 6px radius,
  `--mute` icon that goes `--ink` on a `--surface-soft` well.
- **`.btn.btn-primary`** — the black (white in dark) pill CTA, 40px tall,
  `0 14px` padding, 100px radius.
- **`.filter-btn`** — category pill, 32px tall, hairline border; active state
  fills with `--primary`.
- **`.card`** — elevated surface, 1px hairline, 12px radius, 24px padding.
  Holds a mono `.card-index` (`01`, `02`, …), a 20px heading, body copy, tag
  chips, then the repository link.
- **`.tag`** — pill chip, hairline border, 12px `--mute` text.
- **`.btn-link` / `.writing-title`** — 14px/500 ink links suffixed with a `↗`
  glyph via `::after` in `--faint`; hover goes `--link`.
- **`.chat-toggle-btn`** — primary pill, fixed bottom-right; label toggles
  between `Chat` and `Close`.

External links always carry the `↗` suffix and `rel="noopener noreferrer"`.

## Constraints

- **Strict CSP.** `default-src 'self'` with no `connect-src`, so no inline
  scripts and no off-origin fetch. Google Fonts is allow-listed for
  `style-src`/`font-src` only. The "Latest writing" list reads a same-origin
  JSON that a scheduled Action bakes from the RSS feeds.
- **No JS dependency for content.** With scripts disabled every card stays
  visible with its static index; the filter only ever hides.
- **Cache-bust on change.** Bump `?v=` on `style.css` and `main.js` whenever
  either changes — GitHub Pages caches aggressively.

## Do

- Let ink and hairline carry the page; keep the canvas near-white (near-black in dark).
- Confine color to the hero mesh gradient and the `--link` accent.
- Label sections with uppercase Geist Mono eyebrows.
- Define surfaces with a 1px hairline before considering a shadow.

## Don't

- Don't fill large surfaces with the accent colors — they live in the gradient.
- Don't mix pill and square shapes within one context.
- Don't pile on shadows, gradients, or a second decorative system.
- Don't set body copy in pure black, or loosen the display tracking.
