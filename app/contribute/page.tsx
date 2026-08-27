import { createMetadata, siteConfig } from "@/lib/site";
import { PageHeader } from "@/components/page-header";

export const metadata = createMetadata({
  title: "Contribute",
  path: "/contribute",
  description: "How to contribute a legally free resource or help improve Think Like Programmer.",
});

const CONTRIBUTIONS = [
  "Add a legally free book",
  "Improve metadata",
  "Fix a typo",
  "Improve the UI",
  "Improve accessibility",
  "Add translations",
  "Improve search",
  "Fix bugs",
  "Write documentation",
];

const WORKFLOW = [
  "Fork the repository",
  "Create a branch",
  "Add or update resource metadata in content/books/",
  "Verify the license permits listing/redistribution",
  "Run npm run validate",
  "Open a pull request",
  "Maintainer review",
  "Merge → automatic deployment",
];

export default function ContributePage() {
  return (
    <div className="max-w-2xl">
      <PageHeader
        title="Contribute"
        lead="Think Like Programmer is open source. Contributions of every size are welcome."
      />

      <section className="mb-8">
        <h2 className="text-fg mb-3 text-lg font-semibold">Ways to contribute</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {CONTRIBUTIONS.map((c) => (
            <li
              key={c}
              className="border-line bg-surface text-fg-muted rounded-md border px-3 py-2 text-sm"
            >
              {c}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-fg mb-3 text-lg font-semibold">Contribution workflow</h2>
        <ol className="flex flex-col gap-2">
          {WORKFLOW.map((step, i) => (
            <li key={step} className="text-fg-muted flex gap-3 text-sm">
              <span className="text-fg-subtle font-mono">{String(i + 1).padStart(2, "0")}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="text-fg mb-2 text-lg font-semibold">Adding a book</h2>
        <p className="text-fg-muted text-sm">
          Book entries are JSON files in <code>content/books/</code>. See{" "}
          <code>content/books/README.md</code> and <code>CONTRIBUTING.md</code> in the{" "}
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline"
          >
            repository
          </a>{" "}
          for the schema and rules. CI validates every entry automatically.
        </p>
      </section>
    </div>
  );
}
