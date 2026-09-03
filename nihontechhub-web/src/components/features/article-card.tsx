import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { TNews } from '@/modules/api/news';
import { getSupportedLanguage } from '@/modules/i18n';
import { estimateReadTime, formatDate } from '@/modules/utils';
import { Calendar, ArrowUpRight, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { OptimizedImage } from './optimized-image';

interface ArticleCardProps {
  article: TNews;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const Strings = getSupportedLanguage();

  return (
    <Card className="group overflow-hidden border-0 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-card/80 hover:shadow-xl hover:shadow-primary/5">
      <Link href={`/posts/${article.slug}`} className="block">
        <div className="relative h-56 overflow-hidden bg-muted/20">
          <Image
            src={article.imageUrl || '/placeholder.svg?height=224&width=400'}
            alt={article.imageCaption || article.title}
            fill
            unoptimized
            className="aspect-[16/9] object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
          />
          {/* Category Badge */}
          <Badge className="absolute left-4 top-4 z-10 border-0 bg-primary text-primary-foreground shadow-lg transition-colors duration-300">{article.source}</Badge>

          {/* Reading Time */}
          <div className="absolute right-4 top-4 translate-y-2 transform rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground/80 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <Clock className="mr-1 inline h-3 w-3" />
            {Strings.xMinRead(estimateReadTime(article.content))}
          </div>

          {/* Arrow Icon */}
          <div className="absolute bottom-4 right-4 translate-x-2 transform opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
            <div className="rounded-full bg-background/90 p-2 shadow-lg backdrop-blur-sm">
              <ArrowUpRight className="h-4 w-4 text-foreground" />
            </div>
          </div>
        </div>

        <CardContent className="space-y-4 p-6">
          <h3 className="line-clamp-2 text-xl font-semibold leading-tight transition-colors duration-300 group-hover:text-primary">{article.title}</h3>

          <p className="line-clamp-3 leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">{article.summary}</p>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-3 transition-colors duration-300 group-hover:text-foreground/70">
              <div className="relative">
                <OptimizedImage
                  src={article.author?.avatar}
                  alt={article.author?.name || '著者'}
                  width={28}
                  height={28}
                  className="rounded-full ring-2 ring-transparent transition-all duration-300 group-hover:ring-primary/20"
                />
              </div>
              <span className="font-medium">{article.author?.name}</span>
            </div>

            <div className="flex items-center space-x-1 transition-colors duration-300 group-hover:text-foreground/70">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(article.updatedAt)}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {[...new Set(article?.tags ?? [])].map((tag) => (
              <Badge key={tag} variant="outline" className="border-border/50 text-xs transition-all duration-300 hover:border-primary/50 hover:text-primary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
