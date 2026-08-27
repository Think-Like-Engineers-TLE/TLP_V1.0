import Link from "next/link";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/site";
import { getCategory } from "@/lib/categories";
import { getBook, getPublishedBooks, getRelatedBooks } from "@/lib/books";
import { LICENSE_TYPE_LABEL } from "@/lib/labels";
import { slugify } from "@/lib/slug";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BookCover } from "@/components/book-cover";
import { BookCard } from "@/components/book-card";
import { Badge, difficultyTone } from "@/components/ui/badge";
import { SectionHeading } from "@/components/section-heading";

export const dynamicParams = false;

export async function generateStaticParams() {
  const books = await getPublishedBooks();
  return books.map((b) => ({ category: b.category, slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const book = await getBook(slug);
  return createMetadata({
    title: book?.title ?? "Book",
    path: `/books/${category}/${slug}`,
    description: book?.description,
  });
}

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const book = await getBook(slug);
  if (!book || book.status !== "published" || book.category !== category) notFound();

  const cat = getCategory(book.category);
  const related = await getRelatedBooks(book);

  const info: [string, string | undefined][] = [
    ["Language", book.language],
    ["Category", cat?.label],
    ["Level", book.difficulty],
    ["Pages", book.pages ? String(book.pages) : undefined],
    ["Published", book.publicationYear ? String(book.publicationYear) : undefined],
    ["Format", book.format],
    ["License", book.license.name],
    ["Source", book.source.name],
  ];

  return (
    <article>
      <Breadcrumbs
        items={[
          { label: "Books", href: "/books" },
          { label: cat?.label ?? book.category, href: `/books/${book.category}` },
          { label: book.title },
        ]}
      />

      {/* Header */}
      <div className="grid gap-8 md:grid-cols-[200px_1fr]">
        <BookCover book={book} className="w-40 md:w-full" />

        <div>
          <h1 className="text-fg text-3xl font-semibold tracking-tight">{book.title}</h1>
          {book.subtitle && <p className="text-fg-muted mt-1 text-lg">{book.subtitle}</p>}

          <p className="text-fg-muted mt-2">
            {book.authors.map((name, i) => (
              <span key={name}>
                {i > 0 && ", "}
                <Link href={`/authors/${slugify(name)}`} className="hover:text-fg hover:underline">
                  {name}
                </Link>
              </span>
            ))}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {cat && (
              <Link href={`/books/${cat.slug}`}>
                <Badge tone="neutral">{cat.label}</Badge>
              </Link>
            )}
            <Badge tone={difficultyTone(book.difficulty)}>{book.difficulty}</Badge>
            <Badge tone="neutral">{book.language}</Badge>
            {book.publicationYear && <Badge tone="neutral">{book.publicationYear}</Badge>}
          </div>

          {/* CTAs + transparency (§59, §60) */}
          <div className="border-line bg-surface mt-6 rounded-lg border p-4">
            <div className="flex flex-wrap gap-3">
              <a
                href={book.download.url}
                target="_blank"
                rel="noreferrer"
                className="bg-primary text-primary-fg hover:bg-primary-hover inline-flex h-11 items-center rounded-md px-5 font-medium"
              >
                Download {book.format}
                {book.download.size ? ` · ${book.download.size}` : ""}
              </a>
              <a
                href={book.officialUrl}
                target="_blank"
                rel="noreferrer"
                className="border-line bg-bg text-fg hover:border-fg-subtle inline-flex h-11 items-center rounded-md border px-5 font-medium"
              >
                Official Source ↗
              </a>
            </div>
            <dl className="text-fg-subtle mt-3 grid grid-cols-[5rem_1fr] gap-x-3 gap-y-1 text-xs">
              <dt>License</dt>
              <dd className="text-fg-muted">{book.license.name}</dd>
              <dt>Source</dt>
              <dd className="text-fg-muted">{book.source.name}</dd>
            </dl>
          </div>
        </div>
      </div>

      {/* Description */}
      <section className="mt-10 max-w-2xl">
        <h2 className="text-fg mb-2 text-lg font-semibold">Description</h2>
        <p className="text-fg-muted">{book.description}</p>
      </section>

      {/* Book information */}
      <section className="mt-8">
        <h2 className="text-fg mb-3 text-lg font-semibold">Book information</h2>
        <dl className="border-line grid max-w-2xl grid-cols-[8rem_1fr] gap-x-4 gap-y-2 border-t pt-3 text-sm">
          {info
            .filter(([, v]) => Boolean(v))
            .map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="text-fg-subtle">{k}</dt>
                <dd className="text-fg">{v}</dd>
              </div>
            ))}
        </dl>
      </section>

      {/* Learning topics */}
      {book.tags.length > 0 && (
        <section className="mt-8">
          <h2 className="text-fg mb-3 text-lg font-semibold">Topics</h2>
          <ul className="flex flex-wrap gap-2">
            {book.tags.map((t) => (
              <li key={t}>
                <Link
                  href={`/topics/${slugify(t)}`}
                  className="border-line bg-surface text-fg-muted hover:border-fg-subtle hover:text-fg inline-flex rounded-full border px-3 py-1 font-mono text-xs"
                >
                  {t}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* License (§13, §54) */}
      <section className="border-line bg-surface/50 mt-8 rounded-lg border p-5">
        <h2 className="text-fg mb-2 text-lg font-semibold">License</h2>
        <p className="text-fg text-sm">
          {LICENSE_TYPE_LABEL[book.license.type]} — {book.license.name}
          {book.license.url && (
            <>
              {" "}
              <a
                href={book.license.url}
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                (license text ↗)
              </a>
            </>
          )}
        </p>
        <p className="text-fg-muted mt-2 text-sm">
          {book.license.redistributionAllowed
            ? "This resource is listed because its license permits redistribution."
            : "This resource is listed with a link to its official source; TLP does not host the file."}
        </p>
        {book.license.note && <p className="text-fg-muted mt-2 text-sm">{book.license.note}</p>}
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-12">
          <SectionHeading href={`/books/${book.category}`}>Related books</SectionHeading>
          <ul className="grid gap-4 md:grid-cols-2">
            {related.map((b) => (
              <li key={b.slug} className="flex">
                <BookCard book={b} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <p className="mt-10 text-sm">
        <Link href={`/books/${book.category}`} className="text-fg-muted hover:text-fg">
          ← Back to {cat?.label}
        </Link>
      </p>
    </article>
  );
}
