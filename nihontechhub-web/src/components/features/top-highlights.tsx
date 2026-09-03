'use client';

import { useQueryHighlight } from '@/app/modules/use-query-highlight';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { THighlight } from '@/modules/api/highlight';
import { useAppLanguage } from '@/modules/hooks/use-app-language';
import { concatSentences, getDateString, getSentences } from '@/modules/utils';
import { Sparkles, Brain, Zap, ChevronDown, ChevronUp, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const getImpactColor = (type: THighlight['type']) => {
  switch (type) {
    case 'affairs':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'innovation':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'products':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getBestImage = (images: THighlight['images']) => {
  if (!images || images.length === 0) {
    return '/placeholder.svg';
  }
  // Sort by score and return the highest scoring image
  const sortedImages = images.filter((item) => !item?.image_link?.includes('instagram.com')).sort((a, b) => b.score - a.score);
  return sortedImages?.[0]?.image_link;
};

const getSummary = (content: string, isExpanded = false) => {
  const sentences = getSentences(content);
  if (isExpanded) {
    return content;
  }
  // Return first 2 sentences or all if less than 3
  return concatSentences(sentences.slice(0, 2)) + (sentences.length > 2 ? '...' : '');
};

const needsReadMore = (content: string) => {
  const sentences = getSentences(content);
  return sentences.length > 3;
};

export function TopHighlights() {
  const { Strings } = useAppLanguage();

  const { list } = useQueryHighlight();

  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  if (!list?.length) {
    return null;
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="rounded-full border border-blue-200/50 bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-2">
          <Brain className="h-6 w-6 text-blue-600" />
        </div>
        <div className="flex items-center gap-2">
          <h2 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-2xl font-bold text-transparent">{Strings.AICuratedTechHighlights}</h2>
          <Sparkles className="h-5 w-5 animate-pulse text-blue-500" />
        </div>
      </div>

      <div className="rounded-lg border border-blue-100 bg-gradient-to-r from-blue-50 to-purple-50 p-4">
        <p className="leading-relaxed text-muted-foreground">
          <span className="font-semibold text-blue-700">{Strings.AIPoweredIntelligence}:</span>
          {Strings.AIPoweredIntelligenceDesc}
        </p>
      </div>

      <div className="space-y-4">
        {list.map((highlight) => {
          const isExpanded = expandedItems.has(highlight.id);
          const content = getSummary(highlight.content, isExpanded);
          const showReadMore = needsReadMore(highlight.content);
          const imageUrl = getBestImage(highlight.images);

          return (
            <Card key={highlight.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div className="flex flex-col sm:flex-row">
                {/* Image section - responsive sizing */}
                <div className="relative h-48 w-full sm:h-32 sm:w-48 sm:shrink-0">
                  <Image src={imageUrl || '/placeholder.svg'} alt={highlight.title} fill unoptimized className="object-cover" />
                  <div className="absolute left-3 top-3">
                    <Badge className="border-0 bg-blue-600/90 text-xs text-white backdrop-blur-sm">
                      <Zap className="mr-1 h-3 w-3" />
                      {Strings.AICurated}
                    </Badge>
                  </div>
                </div>

                {/* Content section - flexible width */}
                <div className="min-w-0 flex-1">
                  <CardHeader className="pb-3">
                    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                      <CardTitle className="text-balance text-lg leading-tight">{highlight.title}</CardTitle>
                      <Badge className={`${getImpactColor(highlight.type)} shrink-0 self-start`}>{Strings.highlightType?.[highlight.type] ?? highlight.type}</Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                      <span className="text-xs font-medium text-blue-600 sm:text-sm">{Strings.xArticles(highlight.articles?.length ?? '')}</span>
                      <span className="hidden sm:inline">•</span>
                      <span className="text-xs sm:text-sm">{getDateString(highlight.earliestPublished, 'yyyy-MM-dd HH:mm:ss EEE')}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div
                      className="m-4 overflow-hidden transition-all duration-500 ease-in-out"
                      style={{
                        maxHeight: isExpanded ? '1000px' : '120px',
                      }}
                    >
                      {getSentences(content).map((line, idx) => (
                        <p key={idx} className="mb-2">
                          {line}
                        </p>
                      ))}
                    </div>
                    {showReadMore && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpanded(highlight.id)}
                        className="mb-3 h-auto p-0 font-medium text-emerald-600 transition-all duration-200 hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        {isExpanded ? (
                          <>
                            {Strings.showLess}
                            <ChevronUp className="ml-1 h-4 w-4 transition-transform duration-300" />
                          </>
                        ) : (
                          <>
                            {Strings.readMore}
                            <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-300" />
                          </>
                        )}
                      </Button>
                    )}
                    <div className="mb-4">
                      {highlight?.keywords?.map((keyword) => (
                        <Badge key={keyword} variant="secondary" className="mr-1 text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                    {highlight.articles && highlight.articles.length > 0 && (
                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-muted-foreground">{Strings.sources}:</p>
                        <ul className="space-y-1">
                          {highlight.articles.map((article, idx) => (
                            <li key={idx} className="text-xs">
                              <a href={article.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">
                                {article.title}
                              </a>
                              <span className="text-muted-foreground"> — {article.feed}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center">
        <Link href="/highlight">
          <Button
            size="lg"
            className="rounded-full border-0 bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            {Strings.viewAllAIHighlights}
            <TrendingUp className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
