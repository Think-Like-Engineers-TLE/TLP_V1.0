import Link from "next/link";
import { createMetadata, siteConfig } from "@/lib/site";
import { PageHeader } from "@/components/page-header";

export const metadata = createMetadata({
  title: "About",
  path: "/about",
  description: "What Think Like Programmer is, how resources are selected, and why it exists.",
});

export default function AboutPage() {
  return (
    <div className="max-w-2xl">
      <PageHeader
        title="About"
        lead="Think Like Programmer is an open-source project built to make programming knowledge easier to discover and access."
      />

      <div className="text-fg-muted flex flex-col gap-6">
        <section>
          <h2 className="text-fg mb-2 text-lg font-semibold">Why TLP exists</h2>
          <p>
            Good programming knowledge is often scattered, hard to find, or buried behind sign-up
            walls. TLP is a clean, searchable index of programming books and learning resources that
            are legally free to read and share — no account, no email, no barriers.
          </p>
        </section>

        <section>
          <h2 className="text-fg mb-2 text-lg font-semibold">How resources are selected</h2>
          <p>
            Every resource must answer one question:{" "}
            <em>why are we legally allowed to list and share this?</em> Entries are accepted only
            when the license or an explicit permission allows it — public domain, a Creative Commons
            or open license, direct author permission, or an official free distribution. A PDF
            existing somewhere is not enough.
          </p>
        </section>

        <section>
          <h2 className="text-fg mb-2 text-lg font-semibold">Open source</h2>
          <p>
            The entire website and its content index live on GitHub. Anyone can propose a resource,
            fix metadata, improve the UI, or add translations.{" "}
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              View the repository ↗
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-fg mb-2 text-lg font-semibold">Privacy</h2>
          <p>
            TLP does not require accounts and avoids unnecessary tracking. See the{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              privacy page
            </Link>{" "}
            for details.
          </p>
        </section>

        <section>
          <h2 className="text-fg mb-2 text-lg font-semibold">Contribute</h2>
          <p>
            See the{" "}
            <Link href="/contribute" className="text-primary hover:underline">
              contribute page
            </Link>{" "}
            for how to add a legally free resource or help improve the project.
          </p>
        </section>
      </div>
    </div>
  );
}
