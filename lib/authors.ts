// Build-time only (see lib/books.ts).
import { promises as fs } from "node:fs";
import path from "node:path";
import { slugify } from "./slug";
import { getPublishedBooks } from "./books";
import type { Author, Book } from "./types";

const AUTHORS_DIR = path.join(process.cwd(), "content", "authors");

let overridesCache: Map<string, Author> | null = null;

/**
 * Optional author info from content/authors/*.json.
 * Only sourced information belongs here (§22).
 */
async function getOverrides(): Promise<Map<string, Author>> {
  if (overridesCache) return overridesCache;
  const map = new Map<string, Author>();
  try {
    const files = (await fs.readdir(AUTHORS_DIR)).filter(
      (f) => f.endsWith(".json") && !f.startsWith("_"),
    );
    for (const file of files) {
      const raw = await fs.readFile(path.join(AUTHORS_DIR, file), "utf8");
      const a = JSON.parse(raw) as Author;
      if (a.slug) map.set(a.slug, a);
    }
  } catch {
    /* no overrides */
  }
  overridesCache = map;
  return map;
}

export interface AuthorWithCount extends Author {
  count: number;
}

/** All authors derived from book credits, with book counts (§22). */
export async function getAllAuthors(): Promise<AuthorWithCount[]> {
  const [books, overrides] = await Promise.all([getPublishedBooks(), getOverrides()]);
  const map = new Map<string, { name: string; count: number }>();

  for (const book of books) {
    for (const name of book.authors) {
      const slug = slugify(name);
      const existing = map.get(slug);
      if (existing) existing.count += 1;
      else map.set(slug, { name, count: 1 });
    }
  }

  return [...map.entries()]
    .map(([slug, { name, count }]) => {
      const override = overrides.get(slug);
      return {
        slug,
        name: override?.name ?? name,
        bio: override?.bio,
        links: override?.links,
        count,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

export async function getAuthor(slug: string): Promise<AuthorWithCount | undefined> {
  const authors = await getAllAuthors();
  return authors.find((a) => a.slug === slug);
}

export async function getBooksByAuthor(slug: string): Promise<Book[]> {
  const books = await getPublishedBooks();
  return books.filter((b) => b.authors.some((name) => slugify(name) === slug));
}

/** Group authors A–Z by first letter for the index page. */
export function groupAuthorsByLetter(authors: AuthorWithCount[]): [string, AuthorWithCount[]][] {
  const groups = new Map<string, AuthorWithCount[]>();
  for (const author of authors) {
    const first = author.name.trim().charAt(0).toUpperCase();
    const letter = /[A-Z]/.test(first) ? first : "#";
    const list = groups.get(letter) ?? [];
    list.push(author);
    groups.set(letter, list);
  }
  return [...groups.entries()].sort(([a], [b]) => a.localeCompare(b));
}
