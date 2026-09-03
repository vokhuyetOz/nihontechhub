import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  devIndicators: false,
  images: {
    // Article/avatar/highlight images are scraped from an effectively unbounded set of outlets
    // (ESource sources each pull images off arbitrary third-party CDNs — e.g. bestlistai content
    // has shown up on random *.cloudfront.net hosts — plus a hardcoded images.unsplash.com default
    // avatar), so a hostname allowlist isn't viable; allow every host instead.
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
