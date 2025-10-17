"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@barebel/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@barebel/ui/tabs"
import { Badge } from "@barebel/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@barebel/ui/avatar"
import { Trophy, Star, TrendingUp, Award, Medal, LightbulbIcon, MapPin } from "lucide-react"
import { motion } from "framer-motion"

interface ContributorProps {
  id: string
  name: string
  image?: string
  points: number
  rank: number
  badges: {
    id: string
    name: string
    icon: string
    color: string
  }[]
  contributions: {
    solutions: number
    votes: number
    visits: number
    campaigns: number
  }
}

export default function CommunityLeaderboard({ contributors }: { contributors: ContributorProps[] }) {
  const [activeTab, setActiveTab] = useState("points")

  const getBadgeIcon = (icon: string) => {
    switch (icon) {
      case "trophy":
        return <Trophy className="h-3 w-3" />
      case "star":
        return <Star className="h-3 w-3" />
      case "trending-up":
        return <TrendingUp className="h-3 w-3" />
      case "award":
        return <Award className="h-3 w-3" />
      default:
        return <Medal className="h-3 w-3" />
    }
  }

  const getRankColor = (rank: number) => {
    if (rank === 1) return "text-yellow-500"
    if (rank === 2) return "text-gray-400"
    if (rank === 3) return "text-amber-700"
    return "text-gray-600"
  }

  const sortedByPoints = [...contributors].sort((a, b) => b.points - a.points)
  const sortedBySolutions = [...contributors].sort((a, b) => b.contributions.solutions - a.contributions.solutions)
  const sortedByVisits = [...contributors].sort((a, b) => b.contributions.visits - a.contributions.visits)

  return (
    <Card className="border-none shadow-lg">
      <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-t-lg">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-orange-500" />
          <CardTitle>Community Leaderboard</CardTitle>
        </div>
        <CardDescription>Top contributors making a difference in our community</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="points">Points</TabsTrigger>
            <TabsTrigger value="solutions">Solutions</TabsTrigger>
            <TabsTrigger value="visits">Site Visits</TabsTrigger>
          </TabsList>

          <TabsContent value="points" className="pt-4">
            <div className="space-y-3">
              {sortedByPoints.map((contributor, index) => (
                <motion.div
                  key={contributor.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 font-bold ${getRankColor(contributor.rank)}`}>{contributor.rank}</div>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={contributor.image ?? "/placeholder.svg"} alt={contributor.name} />
                      <AvatarFallback>{contributor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{contributor.name}</p>
                      <div className="flex gap-1">
                        {contributor.badges.slice(0, 3).map((badge) => (
                          <Badge
                            key={badge.id}
                            variant="outline"
                            className={`text-xs px-1 py-0 h-4 bg-${badge.color}-50 text-${badge.color}-700 border-${badge.color}-200`}
                          >
                            {getBadgeIcon(badge.icon)}
                          </Badge>
                        ))}
                        {contributor.badges.length > 3 && (
                          <span className="text-xs text-gray-500">+{contributor.badges.length - 3}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-orange-500 fill-orange-500" />
                    <span className="font-bold">{contributor.points}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="solutions" className="pt-4">
            <div className="space-y-3">
              {sortedBySolutions.map((contributor, index) => (
                <motion.div
                  key={contributor.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 font-bold ${getRankColor(index + 1)}`}>{index + 1}</div>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={contributor.image ?? "/placeholder.svg"} alt={contributor.name} />
                      <AvatarFallback>{contributor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{contributor.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <LightbulbIcon className="h-4 w-4 text-orange-500" />
                    <span className="font-bold">{contributor.contributions.solutions}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="visits" className="pt-4">
            <div className="space-y-3">
              {sortedByVisits.map((contributor, index) => (
                <motion.div
                  key={contributor.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 font-bold ${getRankColor(index + 1)}`}>{index + 1}</div>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={contributor.image ?? "/placeholder.svg"} alt={contributor.name} />
                      <AvatarFallback>{contributor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{contributor.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-orange-500" />
                    <span className="font-bold">{contributor.contributions.visits}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
