import Link from "next/link";
import { siteConfig, createMetadata } from "@/lib/site";
import { CATEGORIES } from "@/lib/categories";

export const metadata = createMetadata({
  path: "/",
  description: siteConfig.description,
});

const POPULAR = [
  "python",
  "javascript",
  "web-development",
  "algorithms",
  "machine-learning",
  "linux",
  "databases",
  "devops",
];

export default function HomePage() {
  const popular = POPULAR.map((slug) => CATEGORIES.find((c) => c.slug === slug)).filter(
    (c): c is NonNullable<typeof c> => Boolean(c),
  );

  return (
    <div className="flex flex-col gap-16">
      {/* Hero */}
      <section className="pt-6 text-center sm:pt-12">
        <p className="font-mono text-sm text-fg-subtle">&lt;TLP/&gt;</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-fg sm:text-6xl">
          Think Like Programmer
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-fg-muted">
          A free library for people who love to build with code. Explore programming books,
          computer science resources, and developer knowledge — freely available from a growing
          open library.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/books"
            className="inline-flex h-11 items-center rounded-md bg-primary px-5 font-medium text-primary-fg transition-colors hover:bg-primary-hover"
          >
            Explore Books
          </Link>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center rounded-md border border-line bg-surface px-5 font-medium text-fg transition-colors hover:border-fg-subtle"
          >
            View on GitHub ↗
          </a>
          <Link
            href="/contribute"
            className="inline-flex h-11 items-center px-2 font-medium text-fg-muted underline-offset-4 hover:text-fg hover:underline"
          >
            Contribute a Resource
          </Link>
        </div>

        {/* Search placeholder — real search lands in Phase 3 (§17, §58). */}
        <div className="mx-auto mt-8 max-w-xl">
          <div
            className="flex h-11 items-center gap-2 rounded-md border border-line bg-surface px-4 text-sm text-fg-subtle"
            aria-hidden
          >
            <span>Search programming books…</span>
            <kbd className="ml-auto rounded border border-line bg-bg px-1.5 py-0.5 text-xs">/</kbd>
          </div>
        </div>
      </section>

      {/* Popular topics */}
      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-fg-subtle">
          Popular Topics
        </h2>
        <ul className="flex flex-wrap gap-2">
          {popular.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/books/${c.slug}`}
                className="inline-flex items-center rounded-full border border-line bg-surface px-3 py-1.5 text-sm text-fg-muted transition-colors hover:border-fg-subtle hover:text-fg"
              >
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Placeholder sections for Phase 1/2 */}
      <section className="grid gap-4 sm:grid-cols-3">
        {["Featured Books", "Recently Added", "Explore the Library"].map((label) => (
          <div
            key={label}
            className="rounded-lg border border-dashed border-line bg-surface/50 p-6"
          >
            <h2 className="text-sm font-semibold text-fg">{label}</h2>
            <p className="mt-2 text-xs text-fg-subtle">
              Populated once book content and the library UI land (Phase 1–2).
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
