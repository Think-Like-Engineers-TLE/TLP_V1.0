import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-line bg-surface/40 border-t">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-md">
            <p className="text-fg font-mono text-sm">&lt;TLP/&gt;</p>
            <p className="text-fg-muted mt-2 text-sm leading-relaxed">
              All resources are provided according to their respective licenses or permissions. TLP
              does not claim ownership of third-party books, content, trademarks, or copyrights.
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-col gap-2 text-sm">
              {siteConfig.footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-fg-muted hover:text-fg">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-fg-muted hover:text-fg"
                >
                  Source on GitHub ↗
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <p className="border-line text-fg-subtle mt-8 border-t pt-6 text-xs">
          Open Source • Free • Developer Focused —{" "}
          <span className="font-mono">{siteConfig.domain}</span>
        </p>
      </div>
    </footer>
  );
}
