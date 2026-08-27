/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static-first: export a fully static site to `out/` for Cloudflare Pages.
  output: "export",
  // No image optimization server in a static export.
  images: { unoptimized: true },
  // Emit `books/python/index.html` style paths so nested routes work on static hosts.
  trailingSlash: true,
  reactStrictMode: true,
  eslint: {
    // Lint is run explicitly in CI (`npm run lint`); don't fail `next build` on it.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
