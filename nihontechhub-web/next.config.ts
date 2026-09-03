import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  devIndicators: false,
  images: {
    // Article/avatar images are scraped from an effectively unbounded set of outlets (ESource
    // sources each pull images off arbitrary third-party CDNs — e.g. bestlistai content has shown
    // up on random *.cloudfront.net hosts — plus a hardcoded images.unsplash.com default avatar),
    // so a hostname allowlist isn't viable; allow every host instead. Highlight-section images stay
    // `unoptimized` regardless (see top-highlights.tsx / top-highlights-all.tsx): they're aggregated
    // from an even larger, less reliable pool of syndicated outlets (e.g. mezha.net), and routing
    // them through Next's server-side image optimizer means a slow/unreachable upstream times out
    // and breaks the image for everyone instead of just failing in that one visitor's browser.
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
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
