# Book entries

Each book is a single JSON file in this directory: `content/books/<slug>.json`.
The filename should match the `slug` field. Files starting with `_` are ignored.

The build (`lib/books.ts`) and CI (`npm run validate:books`) both validate every
file against `lib/validation.ts`. An invalid entry fails the build.

## Required fields

| Field | Notes |
|---|---|
| `slug` | kebab-case, unique, matches the filename |
| `title` | |
| `author` | a string (`"A, B"`) or an array of strings |
| `description` | at least a full sentence (20+ chars) |
| `category` | must be a slug from `lib/categories.ts` |
| `tags` | non-empty array |
| `language` | e.g. `"English"` |
| `difficulty` | `Beginner` \| `Intermediate` \| `Advanced` \| `All Levels` |
| `format` | `PDF` \| `EPUB` \| `HTML` \| `MOBI` |
| `license` | see below |
| `source` | `{ name, url }` — where the resource officially comes from |
| `download` | `{ url, size? }` |
| `officialUrl` | canonical page for the resource |
| `addedAt` | `YYYY-MM-DD` |

Optional: `subtitle`, `subcategory`, `publicationYear`, `pages`, `cover`,
`featured` (default `false`), `status` (default `draft`).

## The `license` object

```json
{
  "type": "creative_commons",
  "name": "Creative Commons Attribution 4.0 International",
  "url": "https://creativecommons.org/licenses/by/4.0/",
  "redistributionAllowed": true,
  "note": "Optional: link to the author's explicit permission."
}
```

`type` is one of: `public_domain`, `creative_commons`, `open_license`,
`author_permission`, `official_free_distribution`.

**Rule:** if `redistributionAllowed` is `false`, then `download.url` **must** equal
`officialUrl` — TLP links to the official source and never hosts the file itself.

## `status`

- `draft` — entry exists but has not been verified by a maintainer; not shown on the site.
- `published` — verified; appears in listings, search, and sitemap.
- `archived` — kept for history, hidden from listings.

New submissions should be added as `draft`. A maintainer flips it to `published`
after checking the license, the source, and that the download link works.

## Example

See `eloquent-javascript.json` in this directory.
