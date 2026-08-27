import { createMetadata, siteConfig } from "@/lib/site";
import { PageHeader } from "@/components/page-header";

export const metadata = createMetadata({
  title: "Legal & Licensing",
  path: "/legal",
  description: "How Think Like Programmer handles licensing, copyright, and takedown requests.",
});

export default function LegalPage() {
  return (
    <div className="max-w-2xl">
      <PageHeader title="Legal & Licensing" />

      <div className="text-fg-muted flex flex-col gap-6">
        <p>
          All resources listed on {siteConfig.name} are provided according to their respective
          licenses or permissions. TLP does not claim ownership of third-party books, content,
          trademarks, or copyrights.
        </p>

        <section>
          <h2 className="text-fg mb-2 text-lg font-semibold">Why a resource is listed</h2>
          <p>Each entry is listed on one of the following bases:</p>
          <ul className="mt-2 list-disc pl-5">
            <li>The work is in the public domain.</li>
            <li>The work is released under a Creative Commons or other open license.</li>
            <li>The author has explicitly permitted free redistribution.</li>
            <li>The publisher offers an official free download.</li>
          </ul>
          <p className="mt-2">
            Where redistribution is not permitted, TLP links to the official source and does not
            host the file.
          </p>
        </section>

        <section>
          <h2 className="text-fg mb-2 text-lg font-semibold">Reporting a concern</h2>
          <p>
            If you believe a resource is listed incorrectly — a copyright concern, a broken
            download, an incorrect license, or wrong information — please open an issue on{" "}
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              GitHub
            </a>
            . No account on this site is required.
          </p>
        </section>

        <section>
          <h2 className="text-fg mb-2 text-lg font-semibold">Site license</h2>
          <p>
            The website source code is released under the MIT License. The book metadata index is
            released under CC BY 4.0. Listed resources retain their own licenses.
          </p>
        </section>
      </div>
    </div>
  );
}
