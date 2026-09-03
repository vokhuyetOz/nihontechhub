export default function ArticleLoading() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 h-5 w-64 animate-pulse rounded bg-muted" />
      <div className="space-y-8">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-7 w-24 animate-pulse rounded-full bg-muted" />
            <div className="h-5 w-32 animate-pulse rounded bg-muted" />
          </div>
          <div className="space-y-3">
            <div className="h-10 w-full animate-pulse rounded bg-muted md:h-12" />
            <div className="h-10 w-3/4 animate-pulse rounded bg-muted md:h-12" />
          </div>
          <div className="h-6 w-full animate-pulse rounded bg-muted" />
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 animate-pulse rounded-full bg-muted" />
            <div className="space-y-2">
              <div className="h-5 w-32 animate-pulse rounded bg-muted" />
              <div className="h-4 w-48 animate-pulse rounded bg-muted" />
            </div>
          </div>
        </div>

        <div className="h-[400px] w-full animate-pulse rounded-2xl bg-muted lg:h-[500px]" />

        <div className="space-y-4">
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
        </div>

        <div className="flex flex-wrap gap-2 pt-8">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-7 w-20 animate-pulse rounded-full bg-muted" />
          ))}
        </div>
      </div>
    </div>
  );
}
