'use client';

import { useQueryNews } from '@/app/modules/use-query-news';
import { Button } from '@/components/ui/button';
import { TNewssource } from '@/modules/api/newssource';
import { useAppLanguage } from '@/modules/hooks/use-app-language';
import { ChevronRight, Loader2, TrendingUp } from 'lucide-react';
import Link from 'next/link';

import { ArticleCard } from './article-card';

interface CategorySectionProps {
  data: TNewssource;
  noHeader?: boolean;
}

export function CategorySection({ data, noHeader }: CategorySectionProps) {
  const { Strings } = useAppLanguage();
  const { list: articles, hasNextPage, fetchNextPage, isFetchingNextPage } = useQueryNews(data.value);
  if (!articles?.length) {
    return null;
  }

  const handleLoadMore = async () => {
    if (hasNextPage) {
      await fetchNextPage();
    }
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      AI: '🤖',
      Apple: '🍎',
      Google: '🔍',
      Startups: '🚀',
    };
    return icons[category as keyof typeof icons] || '📰';
  };

  const getCategoryGradient = (category: string) => {
    const gradients = {
      AI: 'from-blue-500/10 to-purple-500/10',
      Apple: 'from-gray-500/10 to-slate-500/10',
      Google: 'from-green-500/10 to-blue-500/10',
      Startups: 'from-orange-500/10 to-red-500/10',
    };
    return gradients[category as keyof typeof gradients] || 'from-primary/10 to-primary/5';
  };
  const category = data.value;
  return (
    <section className="space-y-8">
      {/* Category Header */}
      {!noHeader && (
        <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${getCategoryGradient(category)} border border-border/50 p-8`}>
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="transform text-4xl transition-transform duration-300 group-hover:scale-110">{getCategoryIcon(category)}</div>
              <div>
                <h2 className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">{data.label}</h2>
                <p className="mt-1 text-muted-foreground">Latest updates and insights</p>
              </div>
            </div>
            <Link
              href={`/category/${category.toLowerCase()}`}
              className="group flex items-center space-x-2 rounded-full bg-background/50 px-4 py-2 text-sm font-medium text-muted-foreground backdrop-blur-sm transition-all duration-300 hover:bg-background/80 hover:text-primary"
            >
              <TrendingUp className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              <span>{Strings.viewAll}</span>
              <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="absolute right-0 top-0 h-32 w-32 -translate-y-16 translate-x-16 rounded-full bg-gradient-to-bl from-primary/5 to-transparent" />
        </div>
      )}
      {/* Articles Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {articles?.map((article, index) => (
          <div key={article.id} className="animate-in fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            <ArticleCard article={article} />
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {hasNextPage && (
        <div className="flex flex-col items-center space-y-4 pt-8">
          <Button
            onClick={handleLoadMore}
            disabled={isFetchingNextPage}
            size="lg"
            className="group min-w-[160px] border-0 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:from-primary/90 hover:to-primary hover:shadow-xl hover:shadow-primary/25"
          >
            {isFetchingNextPage ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {Strings.loading}...
              </>
            ) : (
              <>
                {Strings.loadMore}
                <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </>
            )}
          </Button>

          {/* Articles Count Indicator
          <div className="rounded-full bg-muted/50 px-4 py-2 text-sm text-muted-foreground backdrop-blur-sm">
            Showing <span className="font-semibold text-foreground">{visibleCount}</span> of <span className="font-semibold text-foreground">{articles.length}</span> articles
          </div> */}
        </div>
      )}
    </section>
  );
}
