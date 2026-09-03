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

export default async function HomePage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.NEWSSOURCE],
    queryFn: NewssourceAPI.list,
  });

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.FEATURED_ARTICLE],
    queryFn: NewsAPI.featured,
  });

  await queryClient.prefetchInfiniteQuery({
    queryKey: [QUERY_KEYS.EVENT],
    queryFn: ({ pageParam }) => EventAPI.list({ page: pageParam }),
    initialPageParam: 1,
  });

  await queryClient.prefetchInfiniteQuery({
    queryKey: [QUERY_KEYS.HIGHLIGHT],
    queryFn: ({ pageParam }) => HighlightAPI.list({ page: pageParam }),
    initialPageParam: 1,
  });

  const sources = queryClient.getQueryData<TNewssource[]>([QUERY_KEYS.NEWSSOURCE]);
  // await queryClient.prefetchInfiniteQuery({
  //   queryKey: [QUERY_KEYS.POSTS, sources?.[0]?.value],
  //   queryFn: ({ pageParam }) => NewsAPI.list({ page: pageParam, category: sources?.[0]?.value }),
  //   initialPageParam: 1,
  // });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
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
