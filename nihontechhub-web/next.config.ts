import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  devIndicators: false,
  images: {
    // All hero/avatar/card/highlight images are scraped from an unbounded set of source outlets
    // (see ESource in nihontechhub-be), so they're rendered with the `unoptimized` prop instead of
    // going through next/image's optimizer + remote-host allowlist — see optimized-image.tsx,
    // article-card.tsx, sidebar-trending.tsx, top-highlights.tsx, top-highlights-all.tsx.
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'no-referrer-when-downgrade' },
        ],
      },
    ];
  },
};

export default nextConfig;
