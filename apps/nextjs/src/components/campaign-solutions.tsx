"use client"

import { useState } from "react"
import { Button } from "@barebel/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@barebel/ui/card"
import { Textarea } from "@barebel/ui/textarea"
import { LightbulbIcon, Filter, TrendingUp, Award } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@barebel/ui/select"
import GamifiedVoting from "./gamified-voting"
import CommunityLeaderboard from "./community-leaderboard"

export default function CampaignSolutions({ campaignId: _campaignId }: { campaignId: string }) {
  const [sortOption, setSortOption] = useState("most-voted")
  const [solution, setSolution] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // This would normally be fetched from an API
  const solutions = [
    {
      id: "1",
      title: "Partner with local community college",
      description:
        "Instead of building a new facility, we could partner with the local community college to use their classrooms during evening hours. This would save approximately ₹150,000 from the budget and provide a more integrated learning environment.",
      author: {
        id: "user1",
        name: "Rajesh Kumar",
        image: "/placeholder.svg?key=x1sya",
        reputation: 342,
      },
      votes: 24,
      votesNeeded: 30,
      status: "pending",
      category: "Cost Reduction",
      tags: ["Partnership", "Education", "Resource Sharing"],
      voters: [
        { id: "voter1", name: "Priya Sharma", image: "/placeholder.svg?key=eb9ya", points: 5, voted: true },
        { id: "voter2", name: "Amit Patel", image: "/placeholder.svg?key=zshpc", points: 3, voted: true },
        { id: "voter3", name: "Neha Gupta", points: 2, voted: true },
        { id: "voter4", name: "Vikram Singh", points: 4, voted: true },
        { id: "voter5", name: "Ananya Desai", points: 3, voted: true },
      ],
      createdAt: "2023-04-10",
      userHasVoted: false,
    },
    {
      id: "2",
      title: "Donated computers from tech companies",
      description:
        "I work at a tech company that replaces computers every 2 years. We could donate our previous-generation laptops for the digital skills training. They're still perfectly capable for learning programming and design. I can coordinate with our IT department if there's interest.",
      author: {
        id: "user2",
        name: "Ananya Patel",
        image: "/placeholder.svg?key=uur5z",
        reputation: 287,
      },
      votes: 32,
      votesNeeded: 30,
      status: "approved",
      category: "Equipment",
      tags: ["Technology", "Donations", "Corporate Partnership"],
      voters: [
        { id: "voter1", name: "Priya Sharma", image: "/placeholder.svg?key=zgwgk", points: 5, voted: true },
        { id: "voter6", name: "Rahul Mehta", points: 4, voted: true },
        { id: "voter7", name: "Deepak Sharma", points: 3, voted: true },
      ],
      createdAt: "2023-04-08",
      userHasVoted: true,
    },
    {
      id: "3",
      title: "Volunteer driver network",
      description:
        "For transportation, we could create a volunteer driver network instead of paying for commercial transportation. I've implemented a similar system for a senior center, and it reduced transportation costs by 70% while creating stronger community bonds.",
      author: {
        id: "user3",
        name: "Vikram Singh",
        image: "/placeholder.svg?key=hhaex",
        reputation: 156,
      },
      votes: 18,
      votesNeeded: 30,
      status: "pending",
      category: "Transportation",
      tags: ["Volunteer", "Community", "Cost Saving"],
      voters: [
        { id: "voter8", name: "Sanjay Patel", points: 2, voted: true },
        { id: "voter9", name: "Meera Reddy", points: 3, voted: true },
      ],
      createdAt: "2023-04-05",
      userHasVoted: false,
    },
  ]

  // Mock data for leaderboard
  const contributors = [
    {
      id: "user1",
      name: "Rajesh Kumar",
      image: "/placeholder.svg?key=y5yr5",
      points: 342,
      rank: 1,
      badges: [
        { id: "b1", name: "Solution Master", icon: "trophy", color: "yellow" },
        { id: "b2", name: "Top Voter", icon: "star", color: "blue" },
        { id: "b3", name: "Verified Visitor", icon: "award", color: "green" },
      ],
      contributions: {
        solutions: 12,
        votes: 87,
        visits: 3,
        campaigns: 2,
      },
    },
    {
      id: "user2",
      name: "Ananya Patel",
      image: "/placeholder.svg?key=cio1b",
      points: 287,
      rank: 2,
      badges: [
        { id: "b4", name: "Rising Star", icon: "trending-up", color: "orange" },
        { id: "b5", name: "Frequent Contributor", icon: "award", color: "purple" },
      ],
      contributions: {
        solutions: 8,
        votes: 65,
        visits: 5,
        campaigns: 1,
      },
    },
    {
      id: "user3",
      name: "Vikram Singh",
      image: "/placeholder.svg?key=fabsl",
      points: 156,
      rank: 3,
      badges: [{ id: "b6", name: "Problem Solver", icon: "star", color: "green" }],
      contributions: {
        solutions: 5,
        votes: 42,
        visits: 2,
        campaigns: 0,
      },
    },
    {
      id: "user4",
      name: "Priya Sharma",
      image: "/placeholder.svg?key=9xhe1",
      points: 124,
      rank: 4,
      badges: [{ id: "b7", name: "Campaign Creator", icon: "medal", color: "blue" }],
      contributions: {
        solutions: 3,
        votes: 28,
        visits: 7,
        campaigns: 3,
      },
    },
  ]

  const handleSubmit = () => {
    if (!solution.trim()) return

    setIsSubmitting(true)
    setSolution("")
    setIsSubmitting(false)
    alert("Your solution has been submitted for review!")
  }

  const handleSortChange = (value: string) => {
    setSortOption(value)
    // Here you would normally fetch sorted solutions
  }

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_300px]">
      <div className="space-y-6">
        <div className="bg-orange-50 p-6 rounded-xl border border-orange-100 shadow-sm">
          <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
            <LightbulbIcon className="h-5 w-5 text-orange-600" />
            Propose a Resourceful Solution
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            What's unique about Be A Rebel is our focus on resourcefulness. Can you think of a way to help this campaign
            achieve its goals with fewer resources? Share your ideas below!
          </p>
          <Textarea
            placeholder="Share your solution here..."
            className="mb-4 min-h-[100px]"
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
          />
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-500">Earn points and badges by contributing quality solutions!</p>
            <Button
              className="bg-orange-600 hover:bg-orange-700"
              onClick={handleSubmit}
              disabled={isSubmitting || !solution.trim()}
            >
              {isSubmitting ? "Submitting..." : "Submit Solution"}
            </Button>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-orange-600" />
            Community Solutions ({solutions.length})
          </h3>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <Select value={sortOption} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="most-voted">Most Voted</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="trending">Trending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <p className="text-sm text-gray-500">
          Vote for the most resourceful solutions to help this campaign maximize its impact. Solutions that reach the
          voting threshold will be considered for implementation!
        </p>

        <div className="space-y-6">
          {solutions.map((solution) => (
            <GamifiedVoting key={solution.id} proposal={solution} />
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <CommunityLeaderboard contributors={contributors} />

        <Card className="border-none shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 rounded-t-lg pb-4">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-green-600" />
              <CardTitle className="text-lg">Rewards & Incentives</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <span className="text-sm">Submit a solution</span>
                <span className="font-medium text-orange-600">+10 points</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <span className="text-sm">Solution gets approved</span>
                <span className="font-medium text-orange-600">+25 points</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <span className="text-sm">Solution implemented</span>
                <span className="font-medium text-orange-600">+50 points</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <span className="text-sm">Verify campaign (site visit)</span>
                <span className="font-medium text-orange-600">+100 points</span>
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-500">
              Earn badges and climb the leaderboard by contributing quality solutions and verifications!
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
