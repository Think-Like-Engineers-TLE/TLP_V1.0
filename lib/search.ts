import type { Book } from "./types";
import { slugify } from "./slug";
import { getCategory } from "./categories";

/**
 * Search (§17, §58). A build step writes the index to `public/search-index.json`
 * (see `scripts/build-search-index.ts`); the client fetches it once and runs
 * `searchRecords` locally. The dataset is small, so no search library is needed.
 */

export type SearchType = "book" | "topic" | "author";

export interface SearchRecord {
  type: SearchType;
  title: string;
  /** Secondary line: authors for a book, resource/book count for topics/authors. */
  subtitle?: string;
  href: string;
  /** Lowercased haystack matched against the query. */
  keywords: string;
}

interface TopicLike {
  slug: string;
  label: string;
  count: number;
}
interface AuthorLike {
  slug: string;
  name: string;
  count: number;
}

export function buildSearchIndex(
  books: Book[],
  topics: TopicLike[],
  authors: AuthorLike[],
): SearchRecord[] {
  const bookRecords: SearchRecord[] = books
    .filter((b) => b.status === "published")
    .map((b) => {
      const category = getCategory(b.category);
      return {
        type: "book" as const,
        title: b.title,
        subtitle: b.authors.join(", "),
        href: `/books/${b.category}/${b.slug}`,
        keywords: [
          b.title,
          b.subtitle,
          ...b.authors,
          category?.label,
          b.category,
          ...b.tags,
          b.language,
          b.difficulty,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase(),
      };
    });

  const topicRecords: SearchRecord[] = topics.map((t) => ({
    type: "topic" as const,
    title: t.label,
    subtitle: `${t.count} ${t.count === 1 ? "resource" : "resources"}`,
    href: `/topics/${t.slug}`,
    keywords: `${t.label} ${t.slug}`.toLowerCase(),
  }));

  const authorRecords: SearchRecord[] = authors.map((a) => ({
    type: "author" as const,
    title: a.name,
    subtitle: `${a.count} ${a.count === 1 ? "book" : "books"}`,
    href: `/authors/${a.slug}`,
    keywords: `${a.name} ${slugify(a.name)}`.toLowerCase(),
  }));

  return [...bookRecords, ...topicRecords, ...authorRecords];
}

/** Rank records against a free-text query. All query tokens must match. */
export function searchRecords(records: SearchRecord[], query: string, limit = 20): SearchRecord[] {
  const tokens = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return [];

  const scored: { record: SearchRecord; score: number }[] = [];

  for (const record of records) {
    let score = 0;
    let matchedAll = true;
    for (const token of tokens) {
      const idx = record.keywords.indexOf(token);
      if (idx === -1) {
        matchedAll = false;
        break;
      }
      // Prefer matches at the start of the title.
      score += record.title.toLowerCase().startsWith(token) ? 10 : idx === 0 ? 6 : 3;
    }
    if (!matchedAll) continue;
    if (record.type === "book") score += 2; // books rank above topics/authors on ties
    scored.push({ record, score });
  }

  return scored
    .sort((a, b) => b.score - a.score || a.record.title.localeCompare(b.record.title))
    .slice(0, limit)
    .map((s) => s.record);
}
