'use client';

import { useQueryFeatured } from '@/app/modules/use-query-featured';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppLanguage } from '@/modules/hooks/use-app-language';
import { formatDate } from '@/modules/utils';
import { TrendingUp, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function SidebarTrending() {
  const { Strings } = useAppLanguage();
  const { data: articles } = useQueryFeatured();

  if (!articles?.length) {
    return null;
  }

  const trendingArticles = articles.slice(1, 4);

  return (
    <Card className="group border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm transition-all duration-300 hover:from-card/90 hover:to-card/60 hover:shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2 text-lg">
          <div className="rounded-lg bg-primary/10 p-2 transition-colors duration-300 group-hover:bg-primary/20">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <span>{Strings.trendingNow}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {trendingArticles.map((article, index) => (
          <Link
            key={article.slug}
            href={`/posts/${article.slug}`}
            className="group/item flex items-start space-x-3 rounded-lg p-3 transition-all duration-300 hover:bg-muted/50 hover:shadow-sm"
          >
            <div className="relative flex-shrink-0">
              <span className="absolute -left-1 -top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground transition-transform duration-300 group-hover/item:scale-110">
                {index + 1}
              </span>
              <Image
                src={article.imageUrl || '/placeholder.svg'}
                alt={article.title}
                width={48}
                height={48}
                unoptimized
                className="rounded-lg object-cover transition-transform duration-300 group-hover/item:scale-105"
              />
            </div>
            <div className="min-w-0 flex-1 space-y-1">
              <h4 className="line-clamp-2 text-sm font-medium transition-colors duration-300 group-hover/item:text-primary">{article.title}</h4>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="px-2 py-0.5 text-xs">
                  {article.source}
                </Badge>
                <span className="text-xs text-muted-foreground">{formatDate(article.updatedAt)}</span>
              </div>
            </div>
            <ArrowUpRight className="h-4 w-4 translate-x-1 transform text-muted-foreground opacity-0 transition-all duration-300 group-hover/item:translate-x-0 group-hover/item:opacity-100" />
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
