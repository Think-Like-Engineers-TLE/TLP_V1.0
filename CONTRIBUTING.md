# Contributing to Think Like Programmer

Thanks for helping build an open library for developers. Every contribution
counts — a new resource, a metadata fix, a typo, an accessibility improvement.

## Ground rules

1. **Legality first.** TLP only lists resources that are legally free to read and
   share. A PDF existing somewhere is not a reason to list it. Every entry must
   answer: _why are we legally allowed to list (and, if we host the file,
   redistribute) this?_
2. **No copyrighted binaries in the repo.** Book files are referenced by URL —
   the official source, or approved storage. Do not commit PDFs.
3. **Content is data, not code.** Books live in `content/`, never hard-coded in
   components.

## Development setup

```bash
npm install
npm run dev
```

Before opening a PR:

```bash
npm run validate     # validate:books + typecheck + lint
npm run format       # prettier
```

## Adding a resource

1. Create `content/books/<slug>.json`. The filename must match the `slug`.
2. Fill in the fields — see [`content/books/README.md`](./content/books/README.md)
   for the full schema and the `license` object rules.
3. Set `"status": "draft"`. A maintainer verifies the license, source, and
   download link, then flips it to `"published"`.
4. Run `npm run validate:books`.
5. Open a PR. CI re-runs validation on every push.

If you're not comfortable writing JSON, open a
[resource submission issue](../../issues/new?template=book-submission.yml)
instead and someone will add it.

## Workflow

```
fork → branch → edit metadata → verify license → npm run validate
     → pull request → maintainer review → merge → automatic deploy
```

## Code style

- TypeScript, `strict` mode.
- Prettier + ESLint (`next/core-web-vitals`). CI enforces both.
- Match the surrounding code — small, focused PRs.

## Reporting problems

- Bugs: [bug report issue](../../issues/new?template=bug-report.yml)
- Copyright / license concerns: open an issue with the `copyright` label
- Security: see [`SECURITY.md`](./SECURITY.md)
