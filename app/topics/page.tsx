import Link from "next/link";
import { createMetadata } from "@/lib/site";
import { getAllTopics } from "@/lib/topics";
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/empty-state";

export const metadata = createMetadata({
  title: "Topics",
  path: "/topics",
  description: "Explore programming topics and discover resources by subject.",
});

export default async function TopicsPage() {
  const topics = await getAllTopics();

  return (
    <div>
      <PageHeader
        eyebrow="Discovery"
        title="Topics"
        lead={`${topics.length} ${topics.length === 1 ? "topic" : "topics"} across the library.`}
      />

      {topics.length === 0 ? (
        <EmptyState title="No topics yet">
          Topics are derived from book tags. Add a book to get started.
        </EmptyState>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((t) => (
            <li key={t.slug}>
              <Link
                href={`/topics/${t.slug}`}
                className="border-line bg-surface hover:border-fg-subtle flex h-full flex-col rounded-lg border p-4 transition-colors"
              >
                <span className="text-fg font-medium">{t.label}</span>
                {t.description && (
                  <span className="text-fg-muted mt-1 line-clamp-2 text-sm">{t.description}</span>
                )}
                <span className="text-fg-subtle mt-3 font-mono text-xs">
                  {t.count} {t.count === 1 ? "resource" : "resources"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
