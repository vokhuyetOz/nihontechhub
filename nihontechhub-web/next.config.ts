import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  devIndicators: false,
  images: {
    // Article/avatar images come from the fixed set of outlets in ESource (nihontechhub-be),
    // so they're safe to optimize through this explicit allowlist. Highlight-section images are
    // aggregated from an unbounded set of outlets instead — those stay `unoptimized`, see the
    // <Image> calls in top-highlights.tsx / top-highlights-all.tsx.
    remotePatterns: [
      { protocol: 'https', hostname: 'techcrunch.com' },
      { protocol: 'https', hostname: '**.techcrunch.com' },
      { protocol: 'https', hostname: '9to5mac.com' },
      { protocol: 'https', hostname: '**.9to5mac.com' },
      { protocol: 'https', hostname: '9to5google.com' },
      { protocol: 'https', hostname: '**.9to5google.com' },
      { protocol: 'https', hostname: 'bestlist.ai' },
      { protocol: 'https', hostname: '**.bestlist.ai' },
    ],
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
