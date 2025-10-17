"use client"

import type { RouterOutputs } from "@barebel/api"
import { Calendar, MapPin, Users } from "lucide-react"
import Link from "next/link"

import { Badge } from "@barebel/ui/badge"
import { Button } from "@barebel/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@barebel/ui/card"
import { api } from "~/trpc/react"

const mockOpportunities = [
  {
    id: "mock-1",
    title: "Teaching Assistant for Rural School in Maharashtra",
    organizationName: "Rural Education Foundation",
    category: "Education",
    location: "Pune, Maharashtra",
    remote: false,
    commitment: "10 hours per week",
    startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    slots: 5,
    filledSlots: 2,
    status: "active",
    createdAt: new Date(),
  },
  {
    id: "mock-2",
    title: "Web Development for NGO Website",
    organizationName: "Digital Empowerment Trust",
    category: "Technology",
    location: "Remote",
    remote: true,
    commitment: "Flexible hours",
    startDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
    slots: 3,
    filledSlots: 1,
    status: "active",
    createdAt: new Date(),
  },
  {
    id: "mock-3",
    title: "Environmental Cleanup Drive Coordinator",
    organizationName: "Green Earth Initiative",
    category: "Environment",
    location: "Mumbai, Maharashtra",
    remote: false,
    commitment: "Weekend event",
    startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    slots: 10,
    filledSlots: 4,
    status: "active",
    createdAt: new Date(),
  },
]

type SortOption = "newest" | "ending-soon" | "most-slots" | undefined

type VolunteerOpportunity = RouterOutputs["volunteers"]["getOpportunities"]["items"][number]

interface VolunteerListClientProps {
  category?: string
  location?: string
  remote?: boolean
  sort?: SortOption
}

export default function VolunteerListClient({ category, location, remote, sort }: VolunteerListClientProps) {
  const volunteerQuery = api.volunteers.getOpportunities.useQuery(
    {
      category,
      location,
      remote,
      sort,
      limit: 9,
    },
    {
      retry: 1,
      onError: (err) => {
        console.error("Error fetching volunteer opportunities:", err)
      },
    },
  )

  const { data, status, error } = volunteerQuery

  if (status === "pending") {
    return <div className="py-8 text-center">Loading volunteer opportunities...</div>
  }

  if (status === "error") {
    console.error("Error fetching volunteer opportunities:", error)
    return (
      <div>
        <div className="mb-6 rounded-lg bg-amber-50 py-4 text-center text-amber-600">
          Unable to fetch live data. Showing sample opportunities instead.
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mockOpportunities.map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>
      </div>
    )
  }

  if (!data) {
    return <div className="py-8 text-center">No volunteer opportunities found.</div>
  }

  if (data.items.length === 0) {
    return <div className="py-8 text-center">No volunteer opportunities found.</div>
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.items.map((opportunity) => (
        <OpportunityCard key={opportunity.id} opportunity={opportunity} />
      ))}
    </div>
  )
}

function OpportunityCard({ opportunity }: { opportunity: (typeof mockOpportunities)[number] | VolunteerOpportunity }) {
  const startDate =
    opportunity.startDate instanceof Date ? opportunity.startDate : opportunity.startDate ? new Date(opportunity.startDate) : undefined
  const endDate =
    opportunity.endDate instanceof Date ? opportunity.endDate : opportunity.endDate ? new Date(opportunity.endDate) : undefined
  const availableSlots = Math.max(0, opportunity.slots - opportunity.filledSlots)

  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative flex h-32 w-full items-center justify-center bg-gradient-to-r from-orange-600 to-orange-400 text-center text-white sm:h-48">
          <h3 className="px-4 text-lg font-bold sm:text-xl">{opportunity.organizationName}</h3>
          <Badge className="absolute left-2 top-2 bg-orange-600">{opportunity.category}</Badge>
          {opportunity.remote ? <Badge className="absolute right-2 top-2 bg-blue-600">Remote</Badge> : null}
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col p-4 sm:p-6">
        <Link href={`/volunteer/${opportunity.id}`}>
          <h3 className="mb-2 line-clamp-2 text-base font-bold transition-colors hover:text-orange-600 sm:text-lg">{opportunity.title}</h3>
        </Link>
        <div className="mt-4 space-y-3 text-xs text-gray-500 sm:text-sm">
          <div className="flex items-center">
            <MapPin className="mr-2 h-4 w-4 flex-shrink-0 text-gray-400" />
            <span className="truncate">{opportunity.location}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4 flex-shrink-0 text-gray-400" />
            <span className="truncate">
              {startDate
                ? startDate.toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                  })
                : "Flexible start"}
              {endDate
                ? ` to ${endDate.toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                  })}`
                : ""}
            </span>
          </div>
          <div className="flex items-center">
            <Users className="mr-2 h-4 w-4 flex-shrink-0 text-gray-400" />
            <span>
              {availableSlots} of {opportunity.slots} slots available
            </span>
          </div>
          <div className="text-sm font-medium">Commitment: {opportunity.commitment}</div>
        </div>
      </CardContent>
      <CardFooter className="mt-auto p-4 pt-0 sm:p-6">
        <Link href={`/volunteer/${opportunity.id}`} className="w-full">
          <Button className="w-full text-sm">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
