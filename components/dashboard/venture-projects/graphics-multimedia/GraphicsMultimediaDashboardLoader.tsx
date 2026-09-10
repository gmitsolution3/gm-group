import { Skeleton } from "@/components/ui/skeleton";

export default function GraphicsMultimediaDashboardLoader() {
  return (
    <div className="space-y-8">
      {/* Statistics Loading */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="rounded-xl border border-border bg-card p-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <Skeleton className="h-4 w-32 rounded-md" />
                  <Skeleton className="mt-2 h-8 w-24 rounded-lg" />
                </div>
                <Skeleton className="h-10 w-10 rounded-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Today Stats Loading */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <Skeleton className="h-4 w-32 rounded-md" />
              <Skeleton className="mt-2 h-8 w-24 rounded-lg" />
            </div>
            <Skeleton className="h-10 w-10 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Breakdown Loading */}
      <div className="grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="rounded-xl border border-border bg-card p-6">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <Skeleton className="h-4 w-32 rounded-md" />
                  <Skeleton className="mt-2 h-8 w-24 rounded-lg" />
                </div>
                <Skeleton className="h-10 w-10 rounded-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Items Loading */}
      <div className="grid gap-4">
        {/* Recent Bookings */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <Skeleton className="h-4 w-32 rounded-md" />
                <Skeleton className="mt-2 h-8 w-24 rounded-lg" />
              </div>
              <Skeleton className="h-10 w-10 rounded-lg" />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-muted"></div>
                <div className="space-y-1">
                  <Skeleton className="h-4 w-32 rounded-md" />
                  <Skeleton className="h-4 w-24 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Influencer Bookings */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <Skeleton className="h-4 w-32 rounded-md" />
                <Skeleton className="mt-2 h-8 w-24 rounded-lg" />
              </div>
              <Skeleton className="h-10 w-10 rounded-lg" />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-muted"></div>
                <div className="space-y-1">
                  <Skeleton className="h-4 w-32 rounded-md" />
                  <Skeleton className="h-4 w-24 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Users */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <Skeleton className="h-4 w-32 rounded-md" />
                <Skeleton className="mt-2 h-8 w-24 rounded-lg" />
              </div>
              <Skeleton className="h-10 w-10 rounded-lg" />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-muted"></div>
                <div className="space-y-1">
                  <Skeleton className="h-4 w-32 rounded-md" />
                  <Skeleton className="h-4 w-24 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Applications */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <Skeleton className="h-4 w-32 rounded-md" />
                <Skeleton className="mt-2 h-8 w-24 rounded-lg" />
              </div>
              <Skeleton className="h-10 w-10 rounded-lg" />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-muted"></div>
                <div className="space-y-1">
                  <Skeleton className="h-4 w-32 rounded-md" />
                  <Skeleton className="h-4 w-24 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}