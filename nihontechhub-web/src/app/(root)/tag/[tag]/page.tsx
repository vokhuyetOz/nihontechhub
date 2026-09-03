import NewsJsonLd from '@/components/custom/app-seo/news-jsonld';
import { AppleTvBanner } from '@/components/features';
import { TagSection } from '@/components/features/tag-section';
import { Badge } from '@/components/ui/badge';
import { NewsAPI, TNews } from '@/modules/api/news';
import { QUERY_KEYS } from '@/modules/queries';
import { dehydrate, HydrationBoundary, InfiniteData, QueryClient } from '@tanstack/react-query';
import { Metadata } from 'next';

export default async function TagPage({ params: noawait }: { params: Promise<{ tag: string }> }) {
  const params = await noawait;
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: [QUERY_KEYS.POSTS, QUERY_KEYS.TAG, params.tag],
    queryFn: ({ pageParam }) =>
      NewsAPI.byTag({
        tag: params.tag.toUpperCase(),
        page: pageParam,
      }),
    initialPageParam: 1,
  });

  const posts = queryClient.getQueryData<InfiniteData<{ data: TNews[] }>>([QUERY_KEYS.POSTS, QUERY_KEYS.TAG, params.tag]);
  let allPosts: TNews[] = [];
  if (posts) {
    // data sẽ có cấu trúc của InfiniteQuery
    // data.pages là mảng các page đã fetch được
    allPosts = posts.pages.flatMap((page) => page.data);
  }
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="mx-auto max-w-6xl">
        {/* Category Header */}
        <div className="mb-8">
          <div className="mb-4 flex items-center space-x-3">
            <Badge variant="secondary" className="px-4 py-2 text-lg">
              {params.tag}
            </Badge>
          </div>
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">{params.tag}</h1>
          {/* <p className="text-xl text-muted-foreground">Stay updated with the latest {categoryName.toLowerCase()} news, trends, and developments.</p> */}
        </div>

        {params.tag.toLowerCase() === 'apple-tv' && <AppleTvBanner className="mb-8 w-full" />}

        {/* Articles Grid */}
        <TagSection data={{ value: params.tag }} />
      </div>
      <NewsJsonLd list={allPosts} />
    </HydrationBoundary>
  );
}

export async function generateMetadata({ params: noawait }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
  const locale = process.env.NEXT_PUBLIC_LANG ?? 'Ja';
  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN_URL ?? 'https://nihontechhub.com';
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? 'nihontechhub';
  const { tag } = await noawait;

  if (locale === 'Ja') {
    return {
      title: `${tag} | ニュース一覧`,
      description: `${tag} の最新ニュースやテクノロジー情報をチェック`,
      alternates: {
        canonical: `${baseUrl}/tag/${tag}`,
      },
      openGraph: {
        title: `${tag} | ニュース一覧`,
        description: `${tag} の最新ニュースやテクノロジー情報をチェック`,
        siteName,
        locale, // dùng từ ENV
      },
    };
  }

  return {
    title: `${tag} News & Insights - TechSum`,
    description: `Latest ${tag} news, trends, and insights from the tech world.`,
    alternates: {
      canonical: `${baseUrl}/tag/${tag}`,
    },
  };
}
