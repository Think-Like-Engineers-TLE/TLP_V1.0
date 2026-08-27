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
        <p className="text-fg-subtle font-mono text-sm">&lt;TLP/&gt;</p>
        <h1 className="text-fg mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
          Think Like Programmer
        </h1>
        <p className="text-fg-muted mx-auto mt-4 max-w-2xl text-lg">
          A free library for people who love to build with code. Explore programming books, computer
          science resources, and developer knowledge — freely available from a growing open library.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/books"
            className="bg-primary text-primary-fg hover:bg-primary-hover inline-flex h-11 items-center rounded-md px-5 font-medium transition-colors"
          >
            Explore Books
          </Link>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noreferrer"
            className="border-line bg-surface text-fg hover:border-fg-subtle inline-flex h-11 items-center rounded-md border px-5 font-medium transition-colors"
          >
            View on GitHub ↗
          </a>
          <Link
            href="/contribute"
            className="text-fg-muted hover:text-fg inline-flex h-11 items-center px-2 font-medium underline-offset-4 hover:underline"
          >
            Contribute a Resource
          </Link>
        </div>

        {/* Search placeholder — real search lands in Phase 3 (§17, §58). */}
        <div className="mx-auto mt-8 max-w-xl">
          <div
            className="border-line bg-surface text-fg-subtle flex h-11 items-center gap-2 rounded-md border px-4 text-sm"
            aria-hidden
          >
            <span>Search programming books…</span>
            <kbd className="border-line bg-bg ml-auto rounded border px-1.5 py-0.5 text-xs">/</kbd>
          </div>
        </div>
      </section>

      {/* Popular topics */}
      <section>
        <h2 className="text-fg-subtle mb-4 text-sm font-semibold tracking-widest uppercase">
          Popular Topics
        </h2>
        <ul className="flex flex-wrap gap-2">
          {popular.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/books/${c.slug}`}
                className="border-line bg-surface text-fg-muted hover:border-fg-subtle hover:text-fg inline-flex items-center rounded-full border px-3 py-1.5 text-sm transition-colors"
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
            className="border-line bg-surface/50 rounded-lg border border-dashed p-6"
          >
            <h2 className="text-fg text-sm font-semibold">{label}</h2>
            <p className="text-fg-subtle mt-2 text-xs">
              Populated once book content and the library UI land (Phase 1–2).
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
