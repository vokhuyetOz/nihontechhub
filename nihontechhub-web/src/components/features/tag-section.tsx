'use client';

import { useQueryPostsByTag } from '@/app/(root)/tag/[tag]/modules/use-query-tag';
import { Button } from '@/components/ui/button';
import { ChevronRight, Loader2 } from 'lucide-react';

import { ArticleCard } from './article-card';

interface TagSectionProps {
  data: { value: string };
}

export function TagSection({ data }: TagSectionProps) {
  const { list: articles, hasNextPage, fetchNextPage, isFetchingNextPage } = useQueryPostsByTag(data.value);

  if (!articles?.length) {
    return null;
  }

  const handleLoadMore = async () => {
    if (hasNextPage) {
      await fetchNextPage();
    }
  };

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
                Loading...
              </>
            ) : (
              <>
                Load More Articles
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
