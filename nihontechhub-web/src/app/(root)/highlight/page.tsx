import EventJsonLd from '@/components/custom/app-seo/event-jsonld';
import { TopHighlightsAll } from '@/components/features/top-highlights-all';
import { HighlightAPI, THighlight } from '@/modules/api/highlight';
import { QUERY_KEYS } from '@/modules/queries';
import { dehydrate, HydrationBoundary, InfiniteData, QueryClient } from '@tanstack/react-query';
import { Metadata } from 'next';

export default async function HighlightPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: [QUERY_KEYS.HIGHLIGHT],
    queryFn: ({ pageParam }) => HighlightAPI.list({ page: pageParam }),
    initialPageParam: 1,
  });

  const highlights = queryClient.getQueryData<InfiniteData<{ data: THighlight[] }>>([QUERY_KEYS.HIGHLIGHT]);
  let allPosts: THighlight[] = [];
  if (highlights) {
    // data sẽ có cấu trúc của InfiniteQuery
    // data.pages là mảng các page đã fetch được
    allPosts = highlights.pages.flatMap((page) => page.data);
  }
  if (!allPosts?.length) {
    return null;
  }
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TopHighlightsAll />
      <EventJsonLd list={allPosts} />
    </HydrationBoundary>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = process.env.NEXT_PUBLIC_LANG ?? 'Ja';
  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN_URL ?? 'https://nihontechhub.com';
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? 'nihontechhub';

  if (locale === 'Ja') {
    const titleJa = `AI厳選テクノロジーハイライト`;
    const descJa = 'AIが複数の信頼できるニュースソースを横断的に分析し、重要なイベントを時系列でわかりやすくまとめます。';
    return {
      title: titleJa,
      description: descJa,
      alternates: {
        canonical: `${baseUrl}/highlight`,
      },
      openGraph: {
        title: titleJa,
        description: descJa,
        siteName,
        locale,
      },
    };
  }
  const titleEn = `AI-Curated Tech Highlights`;
  const descEn = `Our AI does not just collect news—it intelligently combines multiple correlated articles from different publications into comprehensive event summaries. Each highlight represents the most significant developments, cross-referenced and verified across trusted sources.`;
  return {
    title: titleEn,
    description: descEn,
    alternates: {
      canonical: `${baseUrl}/highlight`,
    },
    openGraph: {
      title: titleEn,
      description: descEn,
      siteName,
      locale: 'en',
    },
  };
}
