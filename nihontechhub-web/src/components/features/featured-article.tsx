'use client';

import { useQueryFeatured } from '@/app/modules/use-query-featured';
import { Badge } from '@/components/ui/badge';
import { useAppLanguage } from '@/modules/hooks/use-app-language';
import { estimateReadTime } from '@/modules/utils';
import { Calendar, ArrowUpRight, Clock, TrendingUp } from 'lucide-react';
import Link from 'next/link';

import { OptimizedImage } from './optimized-image';

export function FeaturedArticle() {
  const { Strings, languageCode } = useAppLanguage();
  console.log('languagecode', languageCode);
  const { data: articles } = useQueryFeatured();

  const article = articles?.[0];
  if (!article) {
    return null;
  }
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm transition-all duration-500 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/10">
      <Link href={`/posts/${article.slug}`} className="block">
        <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
          <div className="relative h-80 overflow-hidden lg:h-full">
            <OptimizedImage
              src={article.imageUrl}
              alt={article.imageCaption}
              style={{
                objectFit: 'cover',
              }}
              fill
              className="aspect-[1/1] transition-transform duration-700 group-hover:scale-110"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={90}
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background/20 lg:to-background/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-50" />

            {/* Featured Badge */}
            <div className="absolute left-6 top-6">
              <Badge className="border-0 bg-gradient-to-r from-primary to-primary/80 px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg backdrop-blur-sm">
                <TrendingUp className="mr-2 h-4 w-4" />
                {Strings.featuredStory}
              </Badge>
            </div>

            {/* Reading Time */}
            <div className="absolute right-6 top-6 rounded-full bg-background/90 px-4 py-2 text-sm font-medium text-foreground/80 shadow-lg backdrop-blur-sm">
              <Clock className="mr-2 inline h-4 w-4" />
              {Strings.xMinRead(estimateReadTime(article.content))}
            </div>

            {/* Read More Indicator */}
            <div className="absolute bottom-6 right-6 translate-y-4 transform opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <div className="rounded-full bg-background/90 p-3 shadow-lg backdrop-blur-sm">
                <ArrowUpRight className="h-6 w-6 text-foreground" />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-6 p-8 lg:p-12">
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="border-primary/20 bg-primary/10 px-3 py-1 text-primary transition-colors duration-300 hover:bg-primary/20">
                {article.source}
              </Badge>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground/70">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(article.updatedAt).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </div>

            <h1 className="text-3xl font-bold leading-tight transition-colors duration-300 group-hover:text-primary lg:text-4xl xl:text-5xl">{article.title}</h1>

            <p className="text-lg leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80 lg:text-xl">{article.summary}</p>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <OptimizedImage
                    src={article.author?.avatar}
                    alt={article.author?.name}
                    width={56}
                    height={56}
                    className="rounded-full ring-2 ring-transparent transition-all duration-300 group-hover:ring-primary/30"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">{article.author?.name}</p>
                  <p className="text-sm text-muted-foreground">{article.author?.description}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {article.tags?.map((tag) => (
                <Badge key={tag} variant="outline" className="border-border/50 text-sm transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 hover:text-primary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
