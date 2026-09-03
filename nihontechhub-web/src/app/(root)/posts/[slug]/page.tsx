import ArticleJsonLd from '@/components/custom/app-seo/article-jsonld';
import { OptimizedImage, AppleTvBanner } from '@/components/features';
import { AppInstallBanner } from '@/components/features/app-install-banner';
import { NihonSoftwareSection } from '@/components/features/nihon-software-section';
import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { NewsAPI, TNews } from '@/modules/api/news';
import { getSupportedLanguage } from '@/modules/i18n';
import { QUERY_KEYS } from '@/modules/queries';
import { estimateReadTime, formatDate, isHTML } from '@/modules/utils';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import {
  Calendar,
  //  Share2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { marked } from 'marked';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { PostRelate } from './components/post-relate';

function ArticleContent({ content }: Readonly<{ content: string }>) {
  if (!content) {
    return null;
  }
  const html = isHTML(content);
  if (html) {
    return <div className="h-full w-full" dangerouslySetInnerHTML={{ __html: content }} />;
  }
  return <div className="h-full w-full" dangerouslySetInnerHTML={{ __html: marked.parse(content, { async: false }) as string }} />;
}

export default async function ArticlePage({ params: noAwait }: { params: Promise<{ slug: string }> }) {
  const params = await noAwait;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.POSTS, params.slug],
    queryFn: () => NewsAPI.detail({ slug: params.slug }),
  });
  const Strings = getSupportedLanguage();

  const article = queryClient.getQueryData<TNews>([QUERY_KEYS.POSTS, params.slug]);
  if (!article) {
    return notFound();
  }

  const appleTVKeywords = ['tv', 'apple', 'ios', 'iphone', 'ipad', 'macbook', 'macos'];
  const hasAppleTVKeyword = (text?: string | null) => (text ? appleTVKeywords.some((kw) => text.toLowerCase().includes(kw)) : false);
  const shouldShowAppleTVBanner = hasAppleTVKeyword(article.title) || article.tags?.some(hasAppleTVKeyword) || article.keywords?.some(hasAppleTVKeyword);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="mx-auto max-w-4xl">
        <article className="space-y-8">
          {/* Header */}
          <header className="space-y-6">
            <div className="flex flex-wrap items-center gap-2 space-x-4">
              <Badge variant="secondary" className="border-primary/20 bg-primary/10 px-3 py-1 text-primary">
                {article.source}
              </Badge>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(article.updatedAt)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{Strings.xMinRead(estimateReadTime(article.content))}</span>
                </div>
                {article.source === 'bestlistai' && (
                  <div className="flex items-center space-x-1">
                    <a href={article.link} target="_blank" rel="noreferrer">
                      <Badge variant="secondary" className="border-primary/20 bg-primary/10 px-3 py-1 text-primary">
                        {Strings.GoToSite}
                      </Badge>
                    </a>
                  </div>
                )}
              </div>
            </div>

            <h1 className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-4xl font-bold leading-tight text-transparent md:text-5xl lg:text-6xl">
              {article.title}
            </h1>
            <p className="text-xl leading-relaxed text-muted-foreground lg:text-2xl">{article.summary}</p>
            {/* Author and Share */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <OptimizedImage src={article.author?.avatar} alt={article.author?.name || '著者'} width={64} height={64} className="rounded-full ring-2 ring-primary/20" />
                <div>
                  <p className="text-lg font-semibold">{article.author?.name}</p>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span>{article.author?.description}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {/* <Button variant="outline" size="sm" className="hover:bg-primary/10">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button> */}
                {/* <Button variant="outline" size="sm" className="hover:bg-blue-500/10 hover:text-blue-600">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="hover:bg-blue-600/10 hover:text-blue-700">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="hover:bg-blue-700/10 hover:text-blue-800">
                  <Linkedin className="h-4 w-4" />
                </Button> */}
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative h-[400px] w-full overflow-hidden rounded-2xl shadow-2xl lg:h-[500px]">
            <OptimizedImage src={article.imageUrl} alt={article.imageCaption || article.title} fill priority quality={95} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Apple TV Banner - Only visible if keywords match */}
          {shouldShowAppleTVBanner && <AppleTvBanner className="w-full" />}

          {/* AI disclosure */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4" />
            <span>AI要約 — 複数の情報源を統合して作成しています</span>
          </div>

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert article-content max-w-none">
            <ArticleContent content={article.content} />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-8">
            {article.tags?.map((tag) => (
              <Link key={tag} href={`/tag/${tag.toLowerCase().replace(' ', '-')}`}>
                <Badge variant="outline" className="transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 hover:text-primary">
                  #{tag}
                </Badge>
              </Link>
            ))}
            {article.keywords?.map((tag) => (
              <Link key={tag} href={`/tag/${tag.toLowerCase().replace(' ', '-')}`}>
                <Badge variant="outline" className="transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 hover:text-primary">
                  #{tag}
                </Badge>
              </Link>
            ))}
          </div>
          <Separator />
          {/* Author Bio */}
          <Card className="border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-start space-x-6">
                <OptimizedImage src={article.author?.avatar} alt={article.author?.name || '著者'} width={80} height={80} className="rounded-full ring-2 ring-primary/20" />
                <div className="flex-1">
                  <h3 className="mb-3 text-xl font-semibold">{article.author?.name}</h3>
                  <p className="leading-relaxed text-muted-foreground">{article.author?.bio}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </article>
        <div className="mt-8">
          <NihonSoftwareSection />
        </div>
        {/* Related Articles */}
        <PostRelate tags={article.tags} id={article.id} />
        <div className="mt-8">
          <AppInstallBanner />
        </div>
      </div>
      <ArticleJsonLd article={article} />
    </HydrationBoundary>
  );
}

export async function generateMetadata({ params: noAwait }: { params: Promise<{ slug: string }> }) {
  const params = await noAwait;
  const article = await NewsAPI.detail({ slug: params.slug });
  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN_URL ?? 'https://nihontechhub.com';

  if (!article) {
    return {
      title: '記事が見つかりませんでした',
    };
  }

  return {
    title: article.title,
    description: article.summary,
    alternates: {
      canonical: `${baseUrl}/posts/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.summary,
      images: [article.imageUrl],
      type: 'article',
      publishedTime: article.createdAt,
      modifiedTime: article.updatedAt,
    },
  };
}
