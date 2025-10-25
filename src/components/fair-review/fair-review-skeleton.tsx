import { Card, CardContent } from "@/src/components/ui/card";
import { Skeleton } from "@/src/components/ui/skeleton";

export function FairReviewSkeleton() {
  return (
    <div className="px-4 sm:px-0">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card
            key={index}
            className="group relative overflow-hidden border border-gray-200/50 dark:border-white/10 bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg"
          >
            {/* Image skeleton */}
            <Skeleton className="h-56 w-full rounded-t-lg bg-gradient-to-br from-yellow-100/50 to-amber-100/50 dark:from-yellow-900/20 dark:to-amber-900/20" />

            <CardContent className="p-4 space-y-3">
              {/* Title skeleton */}
              <Skeleton className="h-6 w-3/4 rounded-lg" />
              <Skeleton className="h-6 w-1/2 rounded-lg" />

              {/* Meta skeleton */}
              <div className="space-y-2">
                <Skeleton className="h-3 w-32 rounded-lg" />
                <Skeleton className="h-3 w-28 rounded-lg" />
              </div>

              {/* Content skeleton */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full rounded-lg" />
                <Skeleton className="h-4 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4 rounded-lg" />
              </div>

              {/* Rating skeleton */}
              <div className="flex gap-1 pt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-4 w-4 rounded" />
                ))}
              </div>

              {/* Stats skeleton */}
              <div className="pt-3 border-t flex justify-between">
                <Skeleton className="h-3 w-16 rounded-lg" />
                <Skeleton className="h-3 w-20 rounded-lg" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
