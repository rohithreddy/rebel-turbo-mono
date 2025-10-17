"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@barebel/ui/card"
import { Badge } from "@barebel/ui/badge"
import { Progress } from "@barebel/ui/progress"
import { Button } from "@barebel/ui/button"
import { MessageCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { api } from "~/trpc/react"

// Mockup data for fallback when API fails
const mockCampaigns = [
  {
    id: "mock-1",
    title: "Skill Training for Disabled Youth in Rural Maharashtra",
    category: "Disability Support",
    image: "/rural-empowerment-meeting.png",
    raised: 245000,
    goal: 500000,
    backers: 78,
    endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
    status: "active",
    createdAt: new Date(),
  },
  {
    id: "mock-2",
    title: "Mobile Library for Underprivileged Children in Rajasthan",
    category: "Education",
    image: "/inclusive-india-workshop.png",
    raised: 180000,
    goal: 300000,
    backers: 64,
    endDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // 21 days from now
    status: "active",
    createdAt: new Date(),
  },
  {
    id: "mock-3",
    title: "Women's Textile Cooperative in Tamil Nadu",
    category: "Women Empowerment",
    image: "/tamil-nadu-textile-harmony.png",
    raised: 320000,
    goal: 400000,
    backers: 112,
    endDate: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000), // 9 days from now
    status: "active",
    createdAt: new Date(),
  },
]

export default function CampaignListClient({
  category,
  sort,
}: {
  category?: string
  sort?: "newest" | "ending-soon" | "most-funded" | "most-solutions"
}) {
  const campaignsQuery = api.campaigns.getAll.useQuery(
    {
      category,
      sort,
      limit: 9,
    },
    {
      retry: 1,
      onError: (err) => {
        console.error("Error fetching campaigns:", err)
      },
    },
  )

  const { data, status, error } = campaignsQuery

  if (status === "pending") {
    return <div className="text-center py-8">Loading campaigns...</div>
  }

  if (status === "error") {
    console.error("Error fetching campaigns:", error)
    return (
      <div>
        <div className="text-center py-4 text-amber-600 bg-amber-50 rounded-lg mb-6">
          Unable to fetch live data. Showing sample campaigns instead.
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockCampaigns.map((campaign) => (
            <Card key={campaign.id} className="overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative h-48 w-full">
                  <Image
                    src={campaign.image && campaign.image.length > 0 ? campaign.image : "/placeholder.svg"}
                    alt={campaign.title}
                    fill
                    className="object-cover"
                  />
                  <Badge className="absolute top-2 left-2 bg-orange-600">{campaign.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <Link href={`/campaigns/${campaign.id}`}>
                  <h3 className="font-bold text-lg mb-2 hover:text-orange-600 transition-colors">{campaign.title}</h3>
                </Link>
                <div className="mt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">₹{campaign.raised.toLocaleString()}</span>
                    <span className="text-gray-500">raised of ₹{campaign.goal.toLocaleString()}</span>
                  </div>
                  <Progress value={(campaign.raised / campaign.goal) * 100} className="h-2" />
                  <div className="flex justify-between text-sm">
                    <span>{campaign.backers} backers</span>
                    <span>
                      {new Date(campaign.endDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex justify-between">
                <Link href={`/campaigns/${campaign.id}`}>
                  <Button>Support</Button>
                </Link>
                <Link href={`/campaigns/${campaign.id}/solutions`}>
                  <Button variant="outline" className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>Solutions</span>
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (!data) {
    return <div className="text-center py-8">No campaigns found.</div>
  }

  if (data.items.length === 0) {
    return <div className="text-center py-8">No campaigns found.</div>
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {data.items.map((campaign) => {
        const rawRaised = Number(campaign.raised)
        const rawGoal = Number(campaign.goal)
        const raised = Number.isFinite(rawRaised) ? rawRaised : 0
        const goal = Number.isFinite(rawGoal) ? rawGoal : 0
        const campaignImage = campaign.image && campaign.image.length > 0 ? campaign.image : "/placeholder.svg"

        const progress = goal > 0 ? (raised / goal) * 100 : 0

        return (
          <Card key={campaign.id} className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="relative h-48 w-full">
                <Image src={campaignImage} alt={campaign.title} fill className="object-cover" />
                <Badge className="absolute top-2 left-2 bg-orange-600">{campaign.category}</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <Link href={`/campaigns/${campaign.id}`}>
                <h3 className="font-bold text-lg mb-2 hover:text-orange-600 transition-colors">{campaign.title}</h3>
              </Link>
              <div className="mt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">₹{raised.toLocaleString()}</span>
                  <span className="text-gray-500">raised of ₹{goal.toLocaleString()}</span>
                </div>
                <Progress value={progress} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span>{campaign.backers} backers</span>
                  <span>
                    {new Date(campaign.endDate).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-0 flex justify-between">
              <Link href={`/campaigns/${campaign.id}`}>
                <Button>Support</Button>
              </Link>
              <Link href={`/campaigns/${campaign.id}/solutions`}>
                <Button variant="outline" className="flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" />
                  <span>Solutions</span>
                </Button>
              </Link>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
