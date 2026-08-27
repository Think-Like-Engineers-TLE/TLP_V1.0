import type { Book } from "@/lib/types";

/** Deterministic hue from a string, so a book's generated cover is stable. */
function hue(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) % 360;
  return h;
}

/**
 * Consistent cover presentation (§40). Uses the real cover image when present,
 * otherwise a generated, on-brand placeholder — no stretched artwork.
 */
export function BookCover({
  book,
  className = "",
  sizes = "(min-width: 1024px) 300px, (min-width: 640px) 45vw, 90vw",
}: {
  book: Pick<Book, "slug" | "title" | "cover" | "category" | "format">;
  className?: string;
  sizes?: string;
}) {
  if (book.cover) {
    return (
      <div className={`bg-surface-2 relative aspect-[3/4] overflow-hidden rounded-md ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={book.cover}
          alt={`Cover of ${book.title}`}
          loading="lazy"
          sizes={sizes}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  const h = hue(book.slug);

  return (
    <div
      aria-hidden
      className={`border-line relative flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-md border p-3 ${className}`}
      style={{
        background: `linear-gradient(160deg, hsl(${h} 45% 18%), hsl(${(h + 40) % 360} 40% 10%))`,
      }}
    >
      <span className="font-mono text-[10px] tracking-widest text-white/40 uppercase">
        {book.format}
      </span>
      <span className="font-mono text-sm leading-snug font-medium text-white/90">{book.title}</span>
      <span className="font-mono text-[10px] text-white/40">&lt;/&gt;</span>
    </div>
  );
}
