import Script from 'next/script';

export default function EventJsonLd({ list }: { list: Array<any> }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: list?.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.title, // chỉ cần name
    })),
  };
  return <Script id="event-json-ld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
