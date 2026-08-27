/**
 * Validate every book entry in content/books/*.json.
 *
 * Run: npm run validate:books
 * Exits non-zero on the first batch of failures so CI blocks the PR
 * (Full Project Description §52 — Automated Book Validation).
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { bookSchema } from "../lib/validation";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const booksDir = path.join(root, "content", "books");

type Failure = { file: string; message: string };

async function main() {
  let files: string[];
  try {
    files = (await fs.readdir(booksDir)).filter((f) => f.endsWith(".json") && !f.startsWith("_"));
  } catch {
    console.log("No content/books directory — nothing to validate.");
    return;
  }

  if (files.length === 0) {
    console.log("No book entries found.");
    return;
  }

  const failures: Failure[] = [];
  const slugs = new Map<string, string>();

  for (const file of files.sort()) {
    const full = path.join(booksDir, file);
    let json: unknown;
    try {
      json = JSON.parse(await fs.readFile(full, "utf8"));
    } catch (err) {
      failures.push({ file, message: `invalid JSON: ${(err as Error).message}` });
      continue;
    }

    const result = bookSchema.safeParse(json);
    if (!result.success) {
      for (const issue of result.error.issues) {
        failures.push({ file, message: `${issue.path.join(".") || "(root)"}: ${issue.message}` });
      }
      continue;
    }

    const { slug } = result.data;
    const expected = `${slug}.json`;
    if (file !== expected) {
      failures.push({ file, message: `filename should be "${expected}" to match slug` });
    }
    if (slugs.has(slug)) {
      failures.push({ file, message: `duplicate slug "${slug}" (also in ${slugs.get(slug)})` });
    } else {
      slugs.set(slug, file);
    }
  }

  const ok = files.length - new Set(failures.map((f) => f.file)).size;
  console.log(`Checked ${files.length} book entr${files.length === 1 ? "y" : "ies"}.`);

  if (failures.length > 0) {
    console.error(`\n❌ Book metadata validation failed:\n`);
    for (const f of failures) console.error(`  ${f.file}\n    - ${f.message}`);
    console.error(`\n${ok} passed, ${new Set(failures.map((f) => f.file)).size} failed.`);
    process.exit(1);
  }

  console.log(`✅ All ${ok} entr${ok === 1 ? "y" : "ies"} valid.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
