import EventJsonLd from '@/components/custom/app-seo/event-jsonld';
import { KeyTechEventsAll } from '@/components/features/key-tech-events-all';
import { EventAPI, TEvent } from '@/modules/api/event';
import { QUERY_KEYS } from '@/modules/queries';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Metadata } from 'next';

export default async function EventPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.EVENT_ALL],
    queryFn: EventAPI.all,
  });

  const events = queryClient.getQueryData<TEvent[]>([QUERY_KEYS.EVENT_ALL]);

  if (!events?.length) {
    return null;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <KeyTechEventsAll />
      <EventJsonLd list={events} />
    </HydrationBoundary>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = process.env.NEXT_PUBLIC_LANG ?? 'Ja';
  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN_URL ?? 'https://nihontechhub.com';
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? 'nihontechhub';

  if (locale === 'Ja') {
    const titleJa = `AIが世界中のテックニュースを分析・統合。主要イベントとトレンドを時系列でチェック。`;
    const descJa = `AIが世界中のテックニュースを分析・統合。主要イベントとトレンドを時系列でチェック。`;
    return {
      title: titleJa,
      description: descJa,
      alternates: {
        canonical: `${baseUrl}/event`,
      },
      openGraph: {
        title: titleJa,
        description: descJa,
        url: `${baseUrl}/event`,
        siteName,
        locale,
        type: 'website',
      },
    };
  }
  const titleEn = `AI-Aggregated Tech Timeline | Events & Insights`;
  const descEn = `AI-powered technology event timeline. Summarized global news and insights in chronological order.`;
  return {
    title: titleEn,
    description: descEn,
    alternates: {
      canonical: `${baseUrl}/event`,
    },
    openGraph: {
      title: titleEn,
      description: descEn,
      url: `${baseUrl}/event`,
      siteName,
      locale: 'en',
      type: 'website',
    },
  };
}
