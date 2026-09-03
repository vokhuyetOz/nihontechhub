import { ArticleGridSkeleton } from '@/components/features/article-card-skeleton';

export default function CategoryLoading() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 h-5 w-48 animate-pulse rounded bg-muted" />
      <div className="mb-8">
        <div className="mb-4 h-8 w-32 animate-pulse rounded-full bg-muted" />
        <div className="mb-4 h-10 w-2/3 animate-pulse rounded bg-muted md:h-12" />
        <div className="h-6 w-1/2 animate-pulse rounded bg-muted" />
      </div>
      <ArticleGridSkeleton />
    </div>
  );
}
