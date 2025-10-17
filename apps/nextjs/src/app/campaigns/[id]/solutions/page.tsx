import { SelectItem } from "@barebel/ui/select"
import { SelectContent } from "@barebel/ui/select"
import { SelectValue } from "@barebel/ui/select"
import { SelectTrigger } from "@barebel/ui/select"
import { Select } from "@barebel/ui/select"
import Link from "next/link"
import { Button } from "@barebel/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@barebel/ui/card"
import { Textarea } from "@barebel/ui/textarea"
import { ArrowLeft, LightbulbIcon } from "lucide-react"
import { Badge } from "@barebel/ui/badge"
import GamifiedVoting from "@/components/gamified-voting"
import CommunityLeaderboard from "@/components/community-leaderboard"
import VerificationSystem from "@/components/verification-system"

export default function CampaignSolutionsPage({ params }: { params: { id: string } }) {
  // This would normally be fetched from an API
  const campaign = {
    id: params.id,
    title: "Skill Training for Disabled Youth in Rural Maharashtra",
    category: "Disability Support",
  }

  // Mock data for proposals
  const proposals = [
    {
      id: "1",
      title: "Partner with Local Community College",
      description:
        "Instead of building a new facility, we could partner with the local community college to use their classrooms during evening hours. This would save approximately ₹150,000 from the budget and provide a more integrated learning environment.",
      author: {
        id: "user1",
        name: "Rajesh Kumar",
        image: "/thoughtful-urbanite.png",
        reputation: 245,
      },
      votes: 24,
      votesNeeded: 30,
      status: "pending",
      category: "Facilities",
      tags: ["cost-saving", "partnership", "integration"],
      voters: [
        { id: "v1", name: "Ananya Patel", image: "/confident-indian-professional.png", points: 5, voted: true },
        { id: "v2", name: "Vikram Singh", image: "/thoughtful-indian-man.png", points: 5, voted: true },
        { id: "v3", name: "Priya Sharma", image: "/compassionate-community-builder.png", points: 10, voted: true },
        // More voters...
      ],
      createdAt: "2023-04-10",
    },
    {
      id: "2",
      title: "Corporate Computer Donation Program",
      description:
        "I work at a tech company that replaces computers every 2 years. We could donate our previous-generation laptops for the digital skills training. They're still perfectly capable for learning programming and design. I can coordinate with our IT department if there's interest.",
      author: {
        id: "user2",
        name: "Ananya Patel",
        image: "/confident-indian-professional.png",
        reputation: 320,
      },
      votes: 32,
      votesNeeded: 30,
      status: "approved",
      category: "Equipment",
      tags: ["donation", "technology", "partnership"],
      voters: [
        { id: "v1", name: "Rajesh Kumar", image: "/thoughtful-urbanite.png", points: 5, voted: true },
        { id: "v4", name: "Amit Patel", image: "/thoughtful-indian-man.png", points: 5, voted: true },
        // More voters...
      ],
      createdAt: "2023-04-08",
    },
    {
      id: "3",
      title: "Volunteer Driver Network",
      description:
        "For transportation, we could create a volunteer driver network instead of paying for commercial transportation. I've implemented a similar system for a senior center, and it reduced transportation costs by 70% while creating stronger community bonds.",
      author: {
        id: "user3",
        name: "Vikram Singh",
        image: "/thoughtful-indian-man.png",
        reputation: 178,
      },
      votes: 18,
      votesNeeded: 30,
      status: "pending",
      category: "Transportation",
      tags: ["volunteer", "cost-saving", "community"],
      voters: [
        { id: "v5", name: "Neha Gupta", image: "/confident-indian-woman.png", points: 5, voted: true },
        // More voters...
      ],
      createdAt: "2023-04-05",
    },
  ]

  // Mock data for verification
  const verificationData = {
    campaignId: params.id,
    status: "verified",
    verifications: [
      {
        id: "v1",
        type: "identity",
        status: "verified",
        verifier: {
          name: "TrustChain Verification",
          role: "Identity Verification Service",
          image: "/secure-check-logo.png",
        },
        date: "2023-03-15",
        evidence: "Identity documents and organizational records verified by TrustChain.",
        evidenceUrl: "/verification-reports/identity-trustchain.pdf",
      },
      {
        id: "v2",
        type: "location",
        status: "verified",
        verifier: {
          name: "GeoTrust India",
          role: "Location Verification Service",
          image: "/verified-location-pin.png",
        },
        date: "2023-03-20",
        evidence: "Training location inspected and geo-tagged imagery archived for review.",
        evidenceUrl: "/verification-reports/location-geotrust.pdf",
      },
      {
        id: "v3",
        type: "impact",
        status: "pending",
        date: "2023-04-30",
        evidence: "Impact report scheduled for publication after the first cohort completes training.",
      },
    ],
    visitReports: [
      {
        id: "visit1",
        visitor: {
          name: "Amit Patel",
          role: "Community Verifier",
          image: "/thoughtful-indian-man.png",
        },
        date: "2023-04-02",
        location: "Satara District, Maharashtra",
        summary:
          "I visited the proposed training site and met with the local team. The location is accessible and suitable for the training program. I verified the presence of basic infrastructure and the team's preparation for the project.",
        images: ["/rural-india-training.png", "/inclusive-indian-classroom.png"],
        reportUrl: "/verification-reports/visit-amit-patel.pdf",
      },
    ],
  }

  // Mock data for community leaderboard
  const contributors = [
    {
      id: "user1",
      name: "Rajesh Kumar",
      image: "/thoughtful-urbanite.png",
      points: 245,
      rank: 1,
      badges: [
        { id: "b1", name: "Solution Star", icon: "star", color: "orange" },
        { id: "b2", name: "Top Contributor", icon: "trophy", color: "yellow" },
        { id: "b3", name: "Verified Visitor", icon: "map-pin", color: "blue" },
      ],
      contributions: {
        solutions: 12,
        votes: 45,
        visits: 3,
        campaigns: 1,
      },
    },
    {
      id: "user2",
      name: "Ananya Patel",
      image: "/confident-indian-professional.png",
      points: 320,
      rank: 2,
      badges: [
        { id: "b4", name: "Solution Expert", icon: "award", color: "orange" },
        { id: "b5", name: "Rising Star", icon: "trending-up", color: "green" },
      ],
      contributions: {
        solutions: 18,
        votes: 62,
        visits: 1,
        campaigns: 2,
      },
    },
    {
      id: "user3",
      name: "Vikram Singh",
      image: "/thoughtful-indian-man.png",
      points: 178,
      rank: 3,
      badges: [{ id: "b6", name: "Resourceful", icon: "lightbulb", color: "blue" }],
      contributions: {
        solutions: 8,
        votes: 32,
        visits: 5,
        campaigns: 0,
      },
    },
    {
      id: "user4",
      name: "Priya Sharma",
      image: "/compassionate-community-builder.png",
      points: 156,
      rank: 4,
      badges: [{ id: "b7", name: "Campaign Creator", icon: "flag", color: "purple" }],
      contributions: {
        solutions: 5,
        votes: 28,
        visits: 2,
        campaigns: 3,
      },
    },
  ]

  return (
    <div className="container px-4 py-12 md:py-24">
      <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
        <div>
          <div className="mb-8">
            <Link
              href={`/campaigns/${campaign.id}`}
              className="flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Campaign
            </Link>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-orange-600">{campaign.category}</Badge>
              <h1 className="text-2xl font-bold">{campaign.title}</h1>
            </div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <LightbulbIcon className="h-5 w-5 text-orange-600" />
              Community Solutions
            </h2>
            <p className="text-gray-500">
              Join our unique collaborative approach to maximize impact with minimal resources.
            </p>
          </div>

          <Card className="mb-8 bg-orange-50 border-orange-200">
            <CardHeader>
              <CardTitle className="text-lg">Propose a Resourceful Solution</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                What's unique about Be A Rebel is our focus on resourcefulness. Can you think of a way to help this
                campaign achieve its goals with fewer resources? Share your ideas below!
              </p>
              <Textarea placeholder="Share your solution here..." className="mb-4" />
            </CardContent>
            <CardFooter>
              <Button className="bg-orange-600 hover:bg-orange-700">Submit Solution</Button>
            </CardFooter>
          </Card>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Community Solutions ({proposals.length})</h3>
              <Select defaultValue="most-voted">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="most-voted">Most Voted</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="most-discussed">Most Discussed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-6">
              {proposals.map((proposal) => (
                <GamifiedVoting key={proposal.id} proposal={proposal} />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <VerificationSystem data={verificationData} />
          <CommunityLeaderboard contributors={contributors} />
        </div>
      </div>
    </div>
  )
}
