'use client';

import { TNews } from '@/modules/api/news';

import { ArticleCard } from './article-card';

interface SearchSectionProps {
  list: TNews[];
}

export function SearchSection({ list: articles }: SearchSectionProps) {
  if (!articles?.length) {
    return null;
  }

  return (
    <section className="space-y-8">
      {/* Articles Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {articles?.map((article, index) => (
          <div key={article.id} className="animate-in fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            <ArticleCard article={article} />
          </div>
        ))}
      </div>
    </section>
  );
}
