import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { ChevronDown, Filter, Plus } from "lucide-react"

import { Button } from "@barebel/ui/button"
import { Card } from "@barebel/ui/card"
import { Checkbox } from "@barebel/ui/checkbox"
import { Label } from "@barebel/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@barebel/ui/select"
import { Skeleton } from "@barebel/ui/skeleton"
import VolunteerHero from "@/components/volunteer-hero"
import VolunteerCategories from "@/components/volunteer-categories"
import VolunteerImpactStats from "@/components/volunteer-impact-stats"
import VolunteerListClient from "@/components/volunteer-list-client"

export const metadata: Metadata = {
  title: "Volunteer Opportunities | Be A Rebel",
  description: "Discover volunteer opportunities and contribute your time and skills to causes across India.",
}

export default function VolunteerPage({
  searchParams,
}: {
  searchParams?: { category?: string; location?: string; remote?: string; sort?: string }
}) {
  const category = searchParams?.category
  const location = searchParams?.location === "all" ? undefined : searchParams?.location
  const remote = searchParams?.remote === "true"
  const sort = searchParams?.sort as "newest" | "ending-soon" | "most-slots" | undefined

  return (
    <div className="space-y-8 pb-8">
      <VolunteerHero />

      <div className="container px-4">
        <VolunteerCategories />

        <div className="mt-12 space-y-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <h2 className="text-2xl font-bold sm:text-3xl">Volunteer Opportunities</h2>
            <Link href="/volunteer/create">
              <Button className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700">
                <Plus className="h-4 w-4" />
                <span>Post Opportunity</span>
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-[250px_1fr]">
            <div className="order-2 md:order-1">
              <Card className="sticky top-20 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold">Filters</h3>
                  <Button variant="ghost" size="sm" className="h-8 text-xs">
                    Clear All
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="location-select" className="mb-1.5 block text-sm font-medium">
                      Location
                    </Label>
                    <Select defaultValue={location ?? "all"}>
                      <SelectTrigger id="location-select">
                        <SelectValue placeholder="All Locations" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Locations</SelectItem>
                        <SelectItem value="mumbai">Mumbai</SelectItem>
                        <SelectItem value="delhi">Delhi</SelectItem>
                        <SelectItem value="bangalore">Bangalore</SelectItem>
                        <SelectItem value="chennai">Chennai</SelectItem>
                        <SelectItem value="kolkata">Kolkata</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox id="remote-only" checked={remote} />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="remote-only" className="text-sm font-medium">
                        Remote Only
                      </Label>
                      <p className="text-xs text-muted-foreground">Show only remote opportunities</p>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="sort-select" className="mb-1.5 block text-sm font-medium">
                      Sort By
                    </Label>
                    <Select defaultValue={sort ?? "newest"}>
                      <SelectTrigger id="sort-select">
                        <SelectValue placeholder="Newest First" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="ending-soon">Ending Soon</SelectItem>
                        <SelectItem value="most-slots">Most Slots Available</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="mt-2 w-full">Apply Filters</Button>
                </div>
              </Card>
            </div>

            <div className="order-1 md:order-2">
              <div className="mb-4 flex md:hidden">
                <Button variant="outline" className="flex w-full items-center justify-between" size="sm">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <span>Filters</span>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>

              <Suspense
                fallback={
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }, (_, index) => (
                      <Card key={index} className="flex flex-col overflow-hidden">
                        <Skeleton className="h-48 w-full" />
                        <div className="space-y-4 p-6">
                          <Skeleton className="h-6 w-3/4" />
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-2/3" />
                            <Skeleton className="h-4 w-1/2" />
                          </div>
                          <Skeleton className="mt-4 h-10 w-full" />
                        </div>
                      </Card>
                    ))}
                  </div>
                }
              >
                <VolunteerListClient category={category} location={location} remote={remote} sort={sort} />
              </Suspense>
            </div>
          </div>
        </div>

        <VolunteerImpactStats className="mt-16" />
      </div>
    </div>
  )
}
