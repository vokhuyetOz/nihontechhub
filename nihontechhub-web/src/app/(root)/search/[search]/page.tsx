import { SearchSection } from '@/components/features/search-section';
import { NewsAPI, TNews } from '@/modules/api/news';
import { QUERY_KEYS } from '@/modules/queries';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type PageProps = {
  params: Promise<{ search: string }>;
};

export default async function SearchPage({ params: noawait }: PageProps) {
  const params = await noawait;
  const queryClient = new QueryClient();
  console.log('search', params.search);
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.SEARCH, params.search],
    queryFn: () => NewsAPI.search({ search: params.search }),
  });

  const list = queryClient.getQueryData<{ data: TNews[] }>([QUERY_KEYS.SEARCH, params.search]);
  if (!list?.data?.length) {
    return notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="mx-auto max-w-6xl">
        {/* Articles Grid */}
        <SearchSection list={list.data} />
      </div>
    </HydrationBoundary>
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { search } = await params;

  return {
    title: `${search} - NihonTechHub`,
    description: `Latest ${search} news, trends, and insights from the tech world.`,
  };
}
