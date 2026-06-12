# DESIGN.md — kurt.valcorza.com

Design system for this site, adapted from the opencode.ai design language
(via [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md)).
AI agents working on this repository should follow these rules for any UI change.

## Design principle

"Marketing page rendered as a Unix manpage." One monospaced font family for
every role — headlines, body, buttons, footer. Hierarchy comes from size and
weight only. No photography, no illustrations, no shadows, no gradients, no
icon fonts. ASCII bracket markers (`[+]`, `[->]`, `[x]`) replace icons. The
single dark surface is the hero terminal (TUI) mockup; everything else sits on
a warm cream canvas separated by 1px hairline rules and generous whitespace.

## Color palette

| Token | Value | Use |
|---|---|---|
| `--ink` | `#201d1d` | Headlines, body emphasis, primary buttons, hero TUI surface |
| `--ink-deep` | `#0f0000` | Pressed/active CTA state |
| `--canvas` | `#fdfcfc` | All page backgrounds (warm cream) |
| `--surface-soft` | `#f8f7f7` | Inputs, quiet panels |
| `--surface-card` | `#f1eeee` | Code snippets, disabled states |
| `--surface-dark` | `#201d1d` | Hero TUI mockup only |
| `--surface-dark-elevated` | `#302c2c` | Prompt rows inside the dark surface |
| `--text-charcoal` | `#302c2c` | Strong secondary text |
| `--text-body` | `#424245` | Paragraph text |
| `--text-mute` | `#646262` | Muted labels, tags |
| `--text-stone` | `#6e6e73` | Tertiary text |
| `--text-ash` | `#9a9898` | Faint text, disabled |
| `--accent` | `#007aff` | TUI prompt symbol only — never marketing chrome |
| `--success` | `#30d158` | TUI output only |
| `--hairline` | `rgba(15, 0, 0, 0.12)` | All dividers and borders |
| `--hairline-strong` | `#646262` | Emphasized borders (focused input) |

Semantic colors (accent/danger/warning/success) appear only inside the
terminal mockup, never in page chrome.

## Typography

Single family: **IBM Plex Mono** (the Berkeley Mono stand-in), weights
400 / 500 / 700.

Stack: `'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco,
Consolas, 'Liberation Mono', 'Courier New', monospace`

| Role | Size / weight / line-height |
|---|---|
| Display XL (hero headline) | 38px / 700 / 1.5 (28px on mobile) |
| Heading MD (section labels) | 16px / 700 / 1.5 |
| Body MD | 16px / 400 / 1.5 |
| Body Strong | 16px / 500 / 1.5 |
| Button MD | 16px / 500 / 2.0 |
| Caption MD (footer, tags) | 14px / 400 / 2.0 |

Section labels are written manpage-style: `## projects`.

## Spacing & radius

8px base unit. Tokens: xxs 1px · xs 4px · sm 8px · md 12px · lg 16px ·
xl 24px · xxl 32px · **section 96px** (vertical rhythm between major blocks;
tightens to 64px on mobile).

Radius: 0 for sections and nav, **4px for every interactive element**,
9999px reserved for avatar circles only. No other rounding.

## Components

- **Nav**: canvas background, 56px height, hairline bottom rule. Block-pixel
  wordmark left (`█▌kurtvalcorza`), bracket-style text links right.
- **Hero TUI mockup**: `--surface-dark`, 64px 32px padding (32px 16px mobile),
  contains the ASCII block-pixel wordmark and prompt rows on
  `--surface-dark-elevated` with a blinking `▌` cursor.
- **Buttons**: primary = ink fill, cream text; secondary = cream fill, ink
  text, hairline border. 4px radius, ~40px height, 4px 20px padding.
- **Cards**: canvas background, hairline border, 4px radius, 20px padding,
  no shadow, no hover lift — hover darkens the border only. Indexed with
  bracket markers (`[01]`, `[02]`, …).
- **Tags**: caption-md, mute color, rendered in brackets via CSS
  (`.tag::before "["` / `::after "]"`).
- **Links**: ink color, underlined on hover; external links suffixed `↗`,
  internal actions prefixed `->`.
- **Footer**: caption-md, mute, hairline top rule, 32px vertical padding.
- **Chat widget**: toggle is a square 4px-radius ink button labeled `[chat]`
  / `[x]`; window has a hairline-strong border, no glow.

## Layout

~960px max content column, flush-left, single-column reading flow. Project
grid: auto-fill columns at 320px minimum. Sections separated by 96px and a
1px hairline only — no background bands. Touch targets ≥ 40px.

## Hard rules

1. Never introduce a sans-serif or serif font.
2. Never add box-shadows, gradients, background images, or icon fonts
   (no Font Awesome). Use ASCII/text markers instead.
3. Keep the dark surface exclusive to the hero TUI mockup.
4. All borders are 1px hairlines; all interactive radii are 4px.
