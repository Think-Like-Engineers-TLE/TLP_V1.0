# Design system

> Phase 0 baseline. GitHub / modern-documentation / digital-library aesthetic —
> _not_ a bookstore, _not_ a gaming site (§8, §38, §70).

## Tokens

Defined in `app/globals.css`. Raw values on `:root` (light) and
`[data-theme="dark"]` (dark), exposed as Tailwind utilities via `@theme inline`.

| Token | Utility | Role |
|---|---|---|
| `--bg` | `bg-bg` | page background |
| `--surface` | `bg-surface` | cards, inputs, raised areas |
| `--surface-2` | `bg-surface-2` | nested / hover surfaces |
| `--line` | `border-line` | default borders (also the global `*` border color) |
| `--fg` | `text-fg` | primary text |
| `--fg-muted` | `text-fg-muted` | secondary text |
| `--fg-subtle` | `text-fg-subtle` | metadata, captions |
| `--primary` | `bg-primary` / `text-primary` | primary action |
| `--primary-hover` | `bg-primary-hover` | primary hover |
| `--primary-fg` | `text-primary-fg` | text on primary |
| `--accent-green` | `text-accent-green` | success / open-license accents |
| `--accent-purple` | `text-accent-purple` | phase markers, secondary accents |
| `--focus` | — | focus ring (`:focus-visible` in base layer) |
| `--danger` | `text-danger` | destructive / error |

Palette is anchored on GitHub Primer values (canvas `#0d1117`, accent blue).

## Typography (§39)

- **Sans:** Inter → `font-sans` (default on `body`).
- **Mono:** JetBrains Mono → `font-mono`. Used for the `<TLP/>` mark, code,
  counts, tags, phase labels, kbd hints.
- Loaded via `next/font/google` in `app/layout.tsx` as CSS variables
  (`--font-inter`, `--font-jetbrains-mono`).

## Theming behavior

- Three states: `light`, `dark`, `system` (default). Stored in
  `localStorage["tlp-theme"]`.
- `ThemeScript` resolves and applies before paint (no FOUC). SSR renders the
  dark-first default (`<html data-theme="dark">`).
- `ThemeToggle` cycles system → light → dark.

## Layout primitives

- Page container: `mx-auto w-full max-w-6xl px-4 sm:px-6`.
- Content pages: `max-w-2xl` for readable prose.
- Header: sticky, `h-14`, `backdrop-blur`, bottom border. Mobile nav collapses
  to a disclosure menu (§37, §57) — Phase 1 will make it a proper drawer.
- `PageHeader` + `PhaseNote` in `components/page-header.tsx` for consistent
  section headers and "not built yet" markers.

## Accessibility (§45) — baseline in place

- Skip link (`.skip-link`), semantic landmarks (`header`/`main`/`footer`/`nav`).
- `:focus-visible` ring on every focusable element.
- `aria-current` on active nav, `aria-expanded`/`aria-controls` on the menu button.
- `prefers-reduced-motion` respected globally.
- Target: **WCAG 2.2 AA**. Full audit is Phase 5.

## Not yet designed (Phase 1)

BookCard, BookGrid, filter/sort controls, search dialog (`/` and `Ctrl+K`),
topic & author cards, cover treatment, skeletons.
