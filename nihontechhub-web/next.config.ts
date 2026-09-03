import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  devIndicators: false,
  images: {
    // Hero/avatar/card images are scraped from these source outlets (see ESource in nihontechhub-be).
    // Highlight-section images are excluded from optimization instead (unbounded, aggregated from many outlets) —
    // see the `unoptimized` prop on the <Image> calls in top-highlights.tsx / top-highlights-all.tsx.
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
