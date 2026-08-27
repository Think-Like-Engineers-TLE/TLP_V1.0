# Architecture

> Decisions made in Phase 0. Cross-references are to the Full Project Description.

## Principles

Static-first, content-driven, privacy-friendly, open source (§2, §31). No backend,
no auth, no database for the MVP (§36, §68).

```
GitHub repo → CI (validate + build) → static export → Cloudflare Pages/CDN → visitors
```

## Framework: Next.js + static export

- **Next.js App Router + TypeScript**, `output: 'export'` (`next.config.mjs`).
  Produces a fully static `out/` directory — no Node server at runtime.
- `images.unoptimized = true` (no image optimization server).
- `trailingSlash = true` so nested routes resolve as `.../index.html` on static hosts.
- Dynamic routes (`/books/[category]`, `/books/[category]/[slug]`) use
  `generateStaticParams` + `dynamicParams = false`.

## Content pipeline (§16, §28, §29, §52)

```
content/books/<slug>.json
      │  parsed + validated by lib/validation.ts (Zod)
      ▼
lib/books.ts  (getAllBooks / getPublishedBooks / getBook / …)
      │
      ▼
pages, sitemap, (later) search index, category & author pages
```

- **`lib/validation.ts`** is the single source of truth for a valid entry.
- **`scripts/validate-books.ts`** runs the same schema in CI (`npm run validate:books`)
  so bad metadata fails the PR before build.
- `status: draft | published | archived` — only `published` entries are shown,
  indexed, or put in the sitemap.
- Categories are a fixed taxonomy in **`lib/categories.ts`** (§20); `category`
  must be one of those slugs.

### The redistribution rule

Each `license` has `redistributionAllowed`. If it's `false`, the schema requires
`download.url === officialUrl` — TLP links to the official source and never
hosts the file (§15, §33, §54).

## Book file storage (§33, §34)

Never commit PDFs to the repo (`.gitignore` excludes `PDF Books/`). Per entry:

| Option | When |
|---|---|
| A — external official source | default; `download.url` points at the publisher/author |
| B — TLP-hosted (Cloudflare) | only when redistribution is explicitly permitted |
| C — GitHub Releases | small assets, case by case |

Covers → `public/covers/` or Cloudflare. Metadata → git.

## Theming (§38)

Dark-first. `components/theme-script.tsx` is a tiny render-blocking script that
resolves `light | dark` from `localStorage["tlp-theme"]` or the OS setting and
sets `<html data-theme>` before paint (no flash). `components/theme-provider.tsx`
manages the `light | dark | system` preference at runtime. Tokens live in
`app/globals.css` (`:root` = light, `[data-theme="dark"]` = dark), mapped to
Tailwind utilities via `@theme inline`.

## Deployment (§32)

Cloudflare Pages. Two options:

1. **GitHub Actions** (`.github/workflows/deploy.yml`) — builds and runs
   `wrangler pages deploy out`. Needs `CLOUDFLARE_API_TOKEN` and
   `CLOUDFLARE_ACCOUNT_ID` secrets, and a Pages project named
   `think-like-programmer`.
2. **Pages Git integration** — connect the repo in the Cloudflare dashboard
   (build: `npm run build`, output: `out`) and delete the deploy workflow.

`NEXT_PUBLIC_SITE_URL` must be set to the production URL (canonical links,
sitemap, OG tags).

## Open questions (carry into later phases)

- Final domain.
- JSON vs. Markdown for long-form book descriptions (currently JSON only).
- Whether covers are committed to the repo or stored on Cloudflare.
- Client-side search library (Phase 3) — e.g. a prebuilt index + minisearch/fuse.
- Privacy-friendly analytics: yes/no, which one (§35).
