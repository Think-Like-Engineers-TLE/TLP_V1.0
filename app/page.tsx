import Link from "next/link";
import { siteConfig, createMetadata } from "@/lib/site";
import { categoriesByGroup } from "@/lib/categories";
import { getFeaturedBooks, getRecentBooks } from "@/lib/books";
import { getAllTopics } from "@/lib/topics";
import { BookGrid } from "@/components/book-grid";
import { SectionHeading } from "@/components/section-heading";
import { Badge, difficultyTone } from "@/components/ui/badge";

export const metadata = createMetadata({ path: "/" });

export default async function HomePage() {
  const [featured, recent, topics] = await Promise.all([
    getFeaturedBooks(),
    getRecentBooks(6),
    getAllTopics(),
  ]);
  const groups = [...categoriesByGroup().entries()];
  const popularTopics = topics.slice(0, 12);

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
      {popularTopics.length > 0 && (
        <section>
          <SectionHeading href="/topics">Popular Topics</SectionHeading>
          <ul className="flex flex-wrap gap-2">
            {popularTopics.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/topics/${t.slug}`}
                  className="border-line bg-surface text-fg-muted hover:border-fg-subtle hover:text-fg inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors"
                >
                  {t.label}
                  <span className="text-fg-subtle font-mono text-xs">{t.count}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Featured */}
      {featured.length > 0 && (
        <section>
          <SectionHeading href="/books">Featured Books</SectionHeading>
          <BookGrid books={featured} />
        </section>
      )}

      {/* Recently added */}
      {recent.length > 0 && (
        <section>
          <SectionHeading>Recently Added</SectionHeading>
          <ul className="divide-line border-line divide-y rounded-lg border">
            {recent.map((book) => (
              <li key={book.slug}>
                <Link
                  href={`/books/${book.category}/${book.slug}`}
                  className="hover:bg-surface flex items-center gap-3 px-4 py-3"
                >
                  <span aria-hidden className="text-fg-subtle font-mono">
                    →
                  </span>
                  <span className="text-fg min-w-0 flex-1 truncate">{book.title}</span>
                  <span className="text-fg-muted hidden truncate text-sm sm:block">
                    {book.authors.join(", ")}
                  </span>
                  <Badge tone={difficultyTone(book.difficulty)}>{book.difficulty}</Badge>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Explore the library */}
      <section>
        <SectionHeading href="/books">Explore the Library</SectionHeading>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map(([group, categories]) => (
            <div key={group} className="border-line bg-surface rounded-lg border p-4">
              <h3 className="text-fg mb-2 text-sm font-semibold">{group}</h3>
              <ul className="flex flex-wrap gap-x-3 gap-y-1 text-sm">
                {categories.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/books/${c.slug}`} className="text-fg-muted hover:text-primary">
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
