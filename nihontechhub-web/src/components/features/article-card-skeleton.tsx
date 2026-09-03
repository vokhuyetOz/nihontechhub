export function ArticleCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border-0 bg-card/50">
      <div className="h-56 w-full animate-pulse bg-muted" />
      <div className="space-y-4 p-6">
        <div className="h-6 w-3/4 animate-pulse rounded bg-muted" />
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-7 w-7 animate-pulse rounded-full bg-muted" />
            <div className="h-4 w-20 animate-pulse rounded bg-muted" />
          </div>
          <div className="h-4 w-16 animate-pulse rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}

export function ArticleGridSkeleton({ count = 6 }: Readonly<{ count?: number }>) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {Array.from({ length: count }).map((_, index) => (
        <ArticleCardSkeleton key={index} />
      ))}
    </div>
  );
}
