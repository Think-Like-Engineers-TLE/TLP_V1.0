import { createMetadata } from "@/lib/site";
import { PageHeader, PhaseNote } from "@/components/page-header";

export const metadata = createMetadata({
  title: "Authors",
  path: "/authors",
  description: "Browse authors in the Think Like Programmer library.",
});

export default function AuthorsPage() {
  return (
    <div>
      <PageHeader eyebrow="Discovery" title="Authors" lead="Browse the library by author." />
      <PhaseNote phase="Phase 3 — Discovery">
        The A–Z author index and <code>/authors/[slug]</code> pages are built in Phase 3. Author
        entries will only include appropriately sourced information.
      </PhaseNote>
    </div>
  );
}
