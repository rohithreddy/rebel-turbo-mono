import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@barebel/ui/card"
import { Badge } from "@barebel/ui/badge"
import { Progress } from "@barebel/ui/progress"
import { Button } from "@barebel/ui/button"
import { MessageCircle, Clock, Users } from "lucide-react"

export default function FeaturedCampaigns() {
  const campaigns = [
    {
      id: 1,
      title: "Skill Training for Disabled Youth in Rural Maharashtra",
      category: "Disability Support",
      image: "/placeholder.svg?key=lwejc",
      raised: 245000,
      goal: 500000,
      backers: 78,
      daysLeft: 15,
      solutions: 12,
    },
    {
      id: 2,
      title: "Mobile Library for Underprivileged Children in Rajasthan",
      category: "Education",
      image: "/placeholder.svg?key=s02em",
      raised: 180000,
      goal: 300000,
      backers: 64,
      daysLeft: 21,
      solutions: 8,
    },
    {
      id: 3,
      title: "Women's Textile Cooperative in Tamil Nadu",
      category: "Women Empowerment",
      image: "/tamil-nadu-textile-harmony.png",
      raised: 320000,
      goal: 400000,
      backers: 112,
      daysLeft: 9,
      solutions: 15,
    },
  ]

  return (
    <div className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
      {campaigns.map((campaign) => (
        <Card
          key={campaign.id}
          className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <CardHeader className="p-0">
            <div className="relative h-48 w-full">
              <Image src={campaign.image || "/placeholder.svg"} alt={campaign.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <Badge className="absolute top-2 left-2 bg-orange-600">{campaign.category}</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <Link href={`/campaigns/${campaign.id}`}>
              <h3 className="font-bold text-lg mb-2 hover:text-orange-600 transition-colors">{campaign.title}</h3>
            </Link>
            <div className="mt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-orange-600">₹{campaign.raised.toLocaleString()}</span>
                <span className="text-gray-500">raised of ₹{campaign.goal.toLocaleString()}</span>
              </div>
              <Progress
                value={(campaign.raised / campaign.goal) * 100}
                className="h-2 bg-gray-100"
                indicatorClassName="bg-gradient-to-r from-orange-500 to-orange-600"
              />
              <div className="flex justify-between text-sm">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span>{campaign.backers} backers</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span>{campaign.daysLeft} days left</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-6 pt-0 flex justify-between">
            <Link href={`/campaigns/${campaign.id}`}>
              <Button className="bg-orange-600 hover:bg-orange-700 shadow hover:shadow-md transition-all">
                Support This Cause
              </Button>
            </Link>
            <Link href={`/campaigns/${campaign.id}/solutions`}>
              <Button variant="outline" className="flex items-center gap-1 hover:bg-orange-50 transition-all">
                <MessageCircle className="h-4 w-4" />
                <span>{campaign.solutions}</span>
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
