import Link from "next/link";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/site";
import { getCategory } from "@/lib/categories";
import { getBook, getPublishedBooks } from "@/lib/books";
import { PageHeader } from "@/components/page-header";

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

const LICENSE_LABEL: Record<string, string> = {
  public_domain: "Public Domain",
  creative_commons: "Creative Commons",
  open_license: "Open License",
  author_permission: "Author Permission",
  official_free_distribution: "Official Free Distribution",
};

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const book = await getBook(slug);
  if (!book || book.status !== "published" || book.category !== category) notFound();

  const cat = getCategory(book.category);

  const info: [string, string | undefined][] = [
    ["Author", book.authors.join(", ")],
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
      <PageHeader eyebrow={cat?.label} title={book.title} lead={book.subtitle} />

      <div className="mb-8 flex flex-wrap gap-3">
        <a
          href={book.download.url}
          target="_blank"
          rel="noreferrer"
          className="bg-primary text-primary-fg hover:bg-primary-hover inline-flex h-11 items-center rounded-md px-5 font-medium"
        >
          Download {book.format}
          {book.download.size ? ` • ${book.download.size}` : ""}
        </a>
        <a
          href={book.officialUrl}
          target="_blank"
          rel="noreferrer"
          className="border-line bg-surface text-fg hover:border-fg-subtle inline-flex h-11 items-center rounded-md border px-5 font-medium"
        >
          Official Source ↗
        </a>
      </div>

      <section className="mb-8">
        <h2 className="text-fg mb-2 text-lg font-semibold">Description</h2>
        <p className="text-fg-muted max-w-2xl">{book.description}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-fg mb-3 text-lg font-semibold">Book information</h2>
        <dl className="grid max-w-2xl grid-cols-[8rem_1fr] gap-x-4 gap-y-2 text-sm">
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

      {book.tags.length > 0 && (
        <section className="mb-8">
          <h2 className="text-fg mb-3 text-lg font-semibold">Topics</h2>
          <ul className="flex flex-wrap gap-2">
            {book.tags.map((t) => (
              <li
                key={t}
                className="border-line bg-surface text-fg-muted rounded-full border px-3 py-1 font-mono text-xs"
              >
                {t}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="border-line bg-surface/50 rounded-lg border p-5">
        <h2 className="text-fg mb-2 text-lg font-semibold">License</h2>
        <p className="text-fg text-sm">
          {LICENSE_LABEL[book.license.type]} — {book.license.name}
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

      <p className="mt-10 text-sm">
        <Link href={`/books/${book.category}`} className="text-fg-muted hover:text-fg">
          ← Back to {cat?.label}
        </Link>
      </p>
    </article>
  );
}
