import { createMetadata, siteConfig } from "@/lib/site";
import { PageHeader } from "@/components/page-header";

export const metadata = createMetadata({
  title: "Privacy",
  path: "/privacy",
  description:
    "Think Like Programmer is a privacy-friendly site: no accounts, no unnecessary tracking.",
});

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl">
      <PageHeader title="Privacy" lead="TLP is designed to be a privacy-friendly website." />

      <div className="text-fg-muted flex flex-col gap-6">
        <section>
          <h2 className="text-fg mb-2 text-lg font-semibold">No account required</h2>
          <p>
            {siteConfig.name} has no login, registration, or user profiles. You can search, browse,
            read about, and download resources without providing an email address, phone number, or
            any personal information.
          </p>
        </section>

        <section>
          <h2 className="text-fg mb-2 text-lg font-semibold">Tracking</h2>
          <p>
            The site avoids unnecessary tracking. If privacy-friendly, aggregate analytics are ever
            added, this page will be updated to say exactly what is collected and why.
          </p>
        </section>

        <section>
          <h2 className="text-fg mb-2 text-lg font-semibold">External links</h2>
          <p>
            Downloads and official-source links often point to third-party websites, which have
            their own privacy practices. TLP is not responsible for the content or policies of
            external sites.
          </p>
        </section>

        <section>
          <h2 className="text-fg mb-2 text-lg font-semibold">Hosting</h2>
          <p>
            The site is served as static files via a CDN. Standard server logs (such as IP address
            and request time) may be processed transiently by the hosting provider to deliver the
            site and protect against abuse.
          </p>
        </section>
      </div>
    </div>
  );
}
