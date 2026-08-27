import { createMetadata } from "@/lib/site";
import { PageHeader, PhaseNote } from "@/components/page-header";

export const metadata = createMetadata({
  title: "Topics",
  path: "/topics",
  description: "Explore programming topics and discover resources by subject.",
});

export default function TopicsPage() {
  return (
    <div>
      <PageHeader eyebrow="Discovery" title="Topics" lead="Explore the library by subject." />
      <PhaseNote phase="Phase 3 — Discovery">
        Topic pages (with resource counts) and the <code>/topics/[slug]</code> routes are built in
        Phase 3, alongside search, filters and author pages.
      </PhaseNote>
    </div>
  );
}
