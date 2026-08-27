// Build-time only (see lib/books.ts).
import { promises as fs } from "node:fs";
import path from "node:path";
import { slugify } from "./slug";
import { getPublishedBooks } from "./books";
import type { Book, Topic } from "./types";

const TOPICS_DIR = path.join(process.cwd(), "content", "topics");

let overridesCache: Map<string, Topic> | null = null;

/** Optional curated labels/descriptions from content/topics/*.json. */
async function getOverrides(): Promise<Map<string, Topic>> {
  if (overridesCache) return overridesCache;
  const map = new Map<string, Topic>();
  try {
    const files = (await fs.readdir(TOPICS_DIR)).filter(
      (f) => f.endsWith(".json") && !f.startsWith("_"),
    );
    for (const file of files) {
      const raw = await fs.readFile(path.join(TOPICS_DIR, file), "utf8");
      const t = JSON.parse(raw) as Topic;
      if (t.slug) map.set(t.slug, t);
    }
  } catch {
    /* no overrides */
  }
  overridesCache = map;
  return map;
}

export interface TopicWithCount extends Topic {
  count: number;
}

/** All topics derived from book tags, with resource counts (§21). */
export async function getAllTopics(): Promise<TopicWithCount[]> {
  const [books, overrides] = await Promise.all([getPublishedBooks(), getOverrides()]);
  const counts = new Map<string, { label: string; count: number }>();

  for (const book of books) {
    for (const tag of book.tags) {
      const slug = slugify(tag);
      const existing = counts.get(slug);
      if (existing) existing.count += 1;
      else counts.set(slug, { label: tag, count: 1 });
    }
  }

  return [...counts.entries()]
    .map(([slug, { label, count }]) => {
      const override = overrides.get(slug);
      return {
        slug,
        label: override?.label ?? label,
        description: override?.description,
        count,
      };
    })
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

export async function getTopic(slug: string): Promise<TopicWithCount | undefined> {
  const topics = await getAllTopics();
  return topics.find((t) => t.slug === slug);
}

export async function getBooksByTopic(slug: string): Promise<Book[]> {
  const books = await getPublishedBooks();
  return books.filter((b) => b.tags.some((tag) => slugify(tag) === slug));
}
