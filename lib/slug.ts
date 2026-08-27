// Combining diacritical marks (U+0300 to U+036F) left behind by NFKD normalization.
const COMBINING_MARKS = new RegExp("[\\u0300-\\u036f]", "g");

/** Turn arbitrary text into a URL-safe kebab-case slug. */
export function slugify(input: string): string {
  return input
    .normalize("NFKD")
    .replace(COMBINING_MARKS, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
