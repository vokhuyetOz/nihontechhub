export default function EventLoading() {
  return (
    <div className="space-y-8">
      <div className="space-y-4 text-center">
        <div className="mx-auto h-10 w-10 animate-pulse rounded-full bg-muted" />
        <div className="mx-auto h-9 w-80 animate-pulse rounded bg-muted" />
        <div className="mx-auto h-20 w-full max-w-4xl animate-pulse rounded-lg bg-muted" />
      </div>
      <div className="mx-auto max-w-4xl space-y-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="space-y-3 rounded-xl border p-6">
            <div className="h-5 w-40 animate-pulse rounded bg-muted" />
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}
