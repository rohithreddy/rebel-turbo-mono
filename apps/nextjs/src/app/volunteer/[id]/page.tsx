import { Suspense } from "react"

import { Skeleton } from "@barebel/ui/skeleton"
import VolunteerDetailClient from "@/components/volunteer-detail-client"

export default function VolunteerDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="container px-4 py-12">
      <Suspense
        fallback={
          <div className="space-y-6">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
              <div className="space-y-6">
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-32 w-full" />
              </div>
              <div className="space-y-6">
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </div>
        }
      >
        <VolunteerDetailClient id={params.id} />
      </Suspense>
    </div>
  )
}
