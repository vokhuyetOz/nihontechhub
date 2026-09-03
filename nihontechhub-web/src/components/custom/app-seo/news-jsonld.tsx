import Script from 'next/script';

export default function NewsJsonLd({ list }: { list: Array<any> }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',

    itemListElement: list?.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.title, // chỉ cần name
      url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/posts/${item.slug}`,
    })),
  };
  return <Script id="news-json-ld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
