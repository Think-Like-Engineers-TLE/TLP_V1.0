import type { Metadata } from "next";

export const siteConfig = {
  name: "Think Like Programmer",
  shortName: "TLP",
  domain: "thinklikeprogrammer.dev",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://thinklikeprogrammer.dev",
  description:
    "A free, open-source library of legally free programming books and learning resources. Learn. Explore. Build.",
  tagline: "Learn. Explore. Build.",
  // TODO: point this at the real repository once it exists.
  github: "https://github.com/think-like-programmer/think-like-programmer",
  nav: [
    { label: "Books", href: "/books" },
    { label: "Topics", href: "/topics" },
    { label: "Authors", href: "/authors" },
    { label: "About", href: "/about" },
    { label: "Contribute", href: "/contribute" },
  ],
  footerLinks: [
    { label: "About", href: "/about" },
    { label: "Contribute", href: "/contribute" },
    { label: "Legal & Licensing", href: "/legal" },
    { label: "Privacy", href: "/privacy" },
  ],
} as const;

interface PageMetaOptions {
  title?: string;
  description?: string;
  /** Path starting with "/" — used for the canonical URL. */
  path?: string;
}

/** Build consistent per-page metadata (canonical + Open Graph + Twitter). */
export function createMetadata({ title, description, path = "/" }: PageMetaOptions = {}): Metadata {
  const desc = description ?? siteConfig.description;
  const canonical = new URL(path, siteConfig.url).toString();
  return {
    title,
    description: desc,
    alternates: { canonical },
    openGraph: {
      title: title ?? siteConfig.name,
      description: desc,
      url: canonical,
      siteName: siteConfig.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? siteConfig.name,
      description: desc,
    },
  };
}
