import { CategorySection, FeaturedArticle, Sidebar } from '@/components/features';
import { AccessTradeBanner } from '@/components/features/accesstrade-banner';
import { AppInstallBanner } from '@/components/features/app-install-banner';
import { AppleTvBanner } from '@/components/features/appletv-banner';
import { KeyTechEvents } from '@/components/features/key-tech-events';
import { NihonSoftwareSection } from '@/components/features/nihon-software-section';
import { TopHighlights } from '@/components/features/top-highlights';
import { EventAPI } from '@/modules/api/event';
import { HighlightAPI } from '@/modules/api/highlight';
import { NewsAPI } from '@/modules/api/news';
import { NewssourceAPI, TNewssource } from '@/modules/api/newssource';
import { QUERY_KEYS } from '@/modules/queries';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Metadata } from 'next';

export default async function HomePage() {
  const locale = process.env.NEXT_PUBLIC_LANG ?? 'Ja';
  const queryClient = new QueryClient();

  await Promise.allSettled([
    queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.NEWSSOURCE],
      queryFn: NewssourceAPI.list,
    }),
    queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.FEATURED_ARTICLE],
      queryFn: NewsAPI.featured,
    }),
    queryClient.prefetchInfiniteQuery({
      queryKey: [QUERY_KEYS.EVENT],
      queryFn: ({ pageParam }) => EventAPI.list({ page: pageParam }),
      initialPageParam: 1,
    }),
    queryClient.prefetchInfiniteQuery({
      queryKey: [QUERY_KEYS.HIGHLIGHT],
      queryFn: ({ pageParam }) => HighlightAPI.list({ page: pageParam }),
      initialPageParam: 1,
    }),
  ]);

  const sources = queryClient.getQueryData<TNewssource[]>([QUERY_KEYS.NEWSSOURCE]);
  // await queryClient.prefetchInfiniteQuery({
  //   queryKey: [QUERY_KEYS.POSTS, sources?.[0]?.value],
  //   queryFn: ({ pageParam }) => NewsAPI.list({ page: pageParam, category: sources?.[0]?.value }),
  //   initialPageParam: 1,
  // });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <h1 className="sr-only">{locale === 'Ja' ? 'NihonTechHub | 最新テクノロジーニュース' : 'NihonTechHub - Technology News & Insights'}</h1>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="space-y-12 lg:col-span-3">
          {/* Featured Article */}
          <FeaturedArticle />
          <AppleTvBanner className="mb-8 w-full" />
          <NihonSoftwareSection />
          {/* AccessTrade Inline Banner */}
          <AccessTradeBanner variant="inline" />
          {/* Category Sections */}
          {sources?.map((source: any) => <CategorySection key={source.value} data={source} />)}
          <TopHighlights />
          <KeyTechEvents />
          <AppInstallBanner />
        </div>
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Sidebar />
        </div>
      </div>
    </HydrationBoundary>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = process.env.NEXT_PUBLIC_LANG ?? 'Ja';
  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN_URL ?? 'https://nihontechhub.com';
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? 'nihontechhub';

  if (locale === 'Ja') {
    const titleJa = 'NihonTechHub | 最新テクノロジーニュース・AIキュレーション';
    const descJa =
      '最新のテクノロジーニュース、インサイト、トレンドをお届けする信頼の情報源。AIが世界中のテックニュースを横断的に分析し、厳選してお届けします。';
    return {
      title: titleJa,
      description: descJa,
      alternates: {
        canonical: baseUrl,
      },
      openGraph: {
        title: titleJa,
        description: descJa,
        url: baseUrl,
        siteName,
        locale,
        type: 'website',
      },
    };
  }

  const titleEn = 'NihonTechHub - Technology News & Insights';
  const descEn = 'Stay updated with the latest technology news, insights, and trends.';
  return {
    title: titleEn,
    description: descEn,
    alternates: {
      canonical: baseUrl,
    },
    openGraph: {
      title: titleEn,
      description: descEn,
      url: baseUrl,
      siteName,
      locale: 'en',
      type: 'website',
    },
  };
}
