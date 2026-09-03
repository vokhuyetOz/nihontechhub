import { ArticleGridSkeleton } from '@/components/features/article-card-skeleton';

export default function SearchLoading() {
  return (
    <div className="mx-auto max-w-6xl">
      <ArticleGridSkeleton />
    </div>
  );
}
