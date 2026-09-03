export default function HighlightLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 animate-pulse rounded-full bg-muted" />
        <div className="h-7 w-64 animate-pulse rounded bg-muted" />
      </div>
      <div className="h-16 w-full animate-pulse rounded-lg bg-muted" />
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex flex-col overflow-hidden rounded-xl border sm:flex-row">
            <div className="h-48 w-full animate-pulse bg-muted sm:h-32 sm:w-48 sm:shrink-0" />
            <div className="flex-1 space-y-3 p-4">
              <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
              <div className="h-4 w-full animate-pulse rounded bg-muted" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
