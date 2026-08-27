import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface/40">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-md">
            <p className="font-mono text-sm text-fg">&lt;TLP/&gt;</p>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">
              All resources are provided according to their respective licenses or permissions.
              TLP does not claim ownership of third-party books, content, trademarks, or copyrights.
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

        <p className="mt-8 border-t border-line pt-6 text-xs text-fg-subtle">
          Open Source • Free • Developer Focused —{" "}
          <span className="font-mono">{siteConfig.domain}</span>
        </p>
      </div>
    </footer>
  );
}
