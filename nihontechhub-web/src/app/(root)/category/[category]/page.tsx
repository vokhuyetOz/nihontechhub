import NewsJsonLd from '@/components/custom/app-seo/news-jsonld';
import { CategorySection, AppleTvBanner } from '@/components/features';
import { Badge } from '@/components/ui/badge';
import { NewsAPI, TNews } from '@/modules/api/news';
import { NewssourceAPI, TNewssource } from '@/modules/api/newssource';
import { QUERY_KEYS } from '@/modules/queries';
import { dehydrate, HydrationBoundary, InfiniteData, QueryClient } from '@tanstack/react-query';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type PageProps = {
  params: Promise<{ category: string }>;
};

export default async function CategoryPage({ params: noawait }: PageProps) {
  const params = await noawait;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.NEWSSOURCE, params.category],
    queryFn: () => NewssourceAPI.detail(params.category),
  });

  const source = queryClient.getQueryData<TNewssource>([QUERY_KEYS.NEWSSOURCE, params.category]);

  if (!source) {
    return notFound();
  }
  await queryClient.prefetchInfiniteQuery({
    queryKey: [QUERY_KEYS.POSTS, params.category],
    queryFn: ({ pageParam }) =>
      NewsAPI.list({
        category: params.category,
        page: pageParam,
      }),
    initialPageParam: 1,
  });

  const categoryName = source.label;
  const posts = queryClient.getQueryData<InfiniteData<{ data: TNews[] }>>([QUERY_KEYS.POSTS, params.category]);
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
              {categoryName}
            </Badge>
          </div>
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">{categoryName} News & Insights</h1>
          <p className="text-xl text-muted-foreground">Stay updated with the latest {categoryName.toLowerCase()} news, trends, and developments.</p>
        </div>

        {params.category.toLowerCase() === '9to5mac' && <AppleTvBanner className="mb-8 w-full" />}

        {/* Articles Grid */}
        <CategorySection data={source} noHeader />
      </div>
      <NewsJsonLd list={allPosts} />
    </HydrationBoundary>
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = process.env.NEXT_PUBLIC_LANG ?? 'Ja';
  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN_URL ?? 'https://nihontechhub.com';
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? 'nihontechhub';
  const { category } = await params;
  const source = await NewssourceAPI.detail(category);
  const categoryLabel = source?.label ?? category;

  if (locale === 'Ja') {
    return {
      title: `${categoryLabel} | ニュース一覧`,
      description: `${categoryLabel} の最新ニュースやテクノロジー情報をチェック`,
      alternates: {
        canonical: `${baseUrl}/category/${category}`,
      },
      openGraph: {
        title: `${categoryLabel} | ニュース一覧`,
        description: `${categoryLabel} の最新ニュースやテクノロジー情報をチェック`,
        siteName,
        locale, // dùng từ ENV
      },
    };
  }

  return {
    title: `${categoryLabel} News & Insights - ${siteName}`,
    description: `Latest ${categoryLabel} news, trends, and insights from the tech world.`,
    alternates: {
      canonical: `${baseUrl}/category/${category}`,
    },
  };
}
