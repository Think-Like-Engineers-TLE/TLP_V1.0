<div align="center">

# `<TLP/>` Think Like Programmer

**A free, open-source library of legally free programming books and learning resources.**

Learn. Explore. Build.

</div>

---

Think Like Programmer (TLP) is a static-first, privacy-friendly website for
discovering and downloading programming books and resources that are **legally**
free to read and share. No account, no email, no tracking — it should feel like
_GitHub meets a modern technical library_.

The real product is not the PDFs — it's the **organization, metadata, discovery
experience, and licensing transparency** around them.

## Status

**Phase 3 — Discovery.** Foundation, full UI, ~19 book entries, and now
`⌘K` / `/` global search plus URL-driven filters and sorting on the library.
Remaining before launch: more content, and Phase 5 polish (perf, a11y, deploy).

## Tech stack

| | |
|---|---|
| Framework | [Next.js](https://nextjs.org) (App Router) + TypeScript, static export (`output: 'export'`) |
| Styling | Tailwind CSS v4 + CSS-variable design tokens (dark-first) |
| Fonts | Inter (sans) + JetBrains Mono (mono) via `next/font` |
| Content | JSON files in `content/books/`, validated with [Zod](https://zod.dev) |
| Hosting | Cloudflare Pages (static CDN) |
| CI | GitHub Actions — validate content, typecheck, lint, build |

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build            # static export to ./out (runs search-index first)
npm run preview          # serve ./out locally
npm run search-index     # regenerate public/search-index.json
npm run validate:books   # validate content/books/*.json
npm run validate         # validate:books + typecheck + lint
npm run format           # prettier --write .
```

Requires Node 20+.

## Project structure

```
app/            Next.js App Router — routes, layout, sitemap, robots
  books/        /books, /books/[category], /books/[category]/[slug]
  topics/ authors/ about/ contribute/ legal/ privacy/
components/     Header, Footer, ThemeProvider/Toggle, shared UI
content/        Book / author / topic data (the library index)
  books/        <slug>.json — see content/books/README.md
lib/            books, validation (Zod schema), categories, search, sort, site config
scripts/        validate-books.ts, build-search-index.ts
docs/           architecture.md, design-system.md
.github/        CI + deploy workflows, issue / PR templates
```

## Contributing

See [`CONTRIBUTING.md`](./CONTRIBUTING.md). The short version: fork → branch →
add or edit a `content/books/*.json` entry → `npm run validate` → open a PR.
Every resource must have a clear license basis for being listed.

## Roadmap

- **Phase 0 — Foundation** ✅ setup, design system, CI/CD, deployment
- **Phase 1 — UI** ✅ component library, homepage, book cards & pages, category / topic / author pages, drawer nav
- **Phase 2 — Content** 🚧 19 book entries in; covers + more books ongoing
- **Phase 3 — Discovery** ✅ `⌘K` / `/` global search, URL-driven filters & sorting on the library
- **Phase 4 — Open Source** contribution system, validation, templates
- **Phase 5 — Launch** SEO, performance, a11y, security & legal review

## License

Code: [MIT](./LICENSE). Metadata index (`content/`): CC BY 4.0. Listed resources
keep their own licenses.
