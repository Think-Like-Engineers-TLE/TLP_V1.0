/**
 * Generate public/search-index.json from the content.
 * Runs automatically via the `predev` / `prebuild` npm hooks.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getPublishedBooks } from "../lib/books";
import { getAllTopics } from "../lib/topics";
import { getAllAuthors } from "../lib/authors";
import { buildSearchIndex } from "../lib/search";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function main() {
  const [books, topics, authors] = await Promise.all([
    getPublishedBooks(),
    getAllTopics(),
    getAllAuthors(),
  ]);

  const index = buildSearchIndex(books, topics, authors);
  const outFile = path.join(root, "public", "search-index.json");
  await fs.mkdir(path.dirname(outFile), { recursive: true });
  await fs.writeFile(outFile, JSON.stringify(index));

  const counts = index.reduce<Record<string, number>>((acc, r) => {
    acc[r.type] = (acc[r.type] ?? 0) + 1;
    return acc;
  }, {});
  console.log(
    `Wrote public/search-index.json — ${index.length} records ` +
      `(${counts.book ?? 0} books, ${counts.topic ?? 0} topics, ${counts.author ?? 0} authors)`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
