import Script from 'next/script';

type TBreadcrumbItem = { name: string; url?: string };

export default function BreadcrumbJsonLd({ items }: { items: TBreadcrumbItem[] }) {
  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN_URL ?? 'https://nihontechhub.com';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}` } : {}),
    })),
  };

  return <Script id="breadcrumb-json-ld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
