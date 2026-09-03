import Script from 'next/script';

export default function ArticleJsonLd({ article }: { article: any }) {
  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN_URL ?? 'https://nihontechhub.com';
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? 'nihontechhub';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.summary,
    image: article.imageUrl ? [article.imageUrl] : undefined,
    datePublished: article.createdAt,
    dateModified: article.updatedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/posts/${article.slug}`,
    },
    author: article.author?.name
      ? {
          '@type': 'Person',
          name: article.author.name,
          jobTitle: article.author.description,
          description: article.author.bio,
        }
      : undefined,
    publisher: {
      '@type': 'Organization',
      '@id': `${baseUrl}/#organization`,
      name: siteName,
    },
  };

  return <Script id="article-json-ld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
