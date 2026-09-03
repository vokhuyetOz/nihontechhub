'use client';

import { ArticleCard } from '@/components/features';

import { useQueryRelate } from '../modules/use-query-relate';

export function PostRelate({ tags, id }: Readonly<{ tags: string[]; id: string }>) {
  const { data: relatedArticles } = useQueryRelate(tags, id);
  if (!relatedArticles?.length) {
    return null;
  }

  return (
    <section className="mt-16">
      <h2 className="mb-8 text-3xl font-bold">関連記事</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {relatedArticles.map((article) => (
          <ArticleCard key={article.id} article={article as any} />
        ))}
      </div>
    </section>
  );
}
