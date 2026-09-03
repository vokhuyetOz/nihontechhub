import Script from 'next/script';

export default function OrganizationJsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN_URL ?? 'https://nihontechhub.com';
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? 'nihontechhub';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${baseUrl}/#organization`,
        name: siteName,
        url: baseUrl,
        logo: `${baseUrl}/logo.png`,
      },
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: baseUrl,
        name: siteName,
        publisher: { '@id': `${baseUrl}/#organization` },
        potentialAction: {
          '@type': 'SearchAction',
          target: `${baseUrl}/search/{search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };

  return <Script id="organization-json-ld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
