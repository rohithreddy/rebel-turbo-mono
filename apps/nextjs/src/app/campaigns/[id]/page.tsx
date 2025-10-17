"use client"

import { Input } from "@barebel/ui/input"
import Image from "next/image"
import { Button } from "@barebel/ui/button"
import { Badge } from "@barebel/ui/badge"
import { Progress } from "@barebel/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@barebel/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@barebel/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@barebel/ui/avatar"
import { Heart, Share2, Flag, Shield } from "lucide-react"
import CampaignSolutions from "@/components/campaign-solutions"
import DonationForm from "@/components/donation-form"
import VerificationSystem from "@/components/verification-system"

export default function CampaignPage({ params }: { params: { id: string } }) {
  // This would normally be fetched from an API
  const campaign = {
    id: params.id,
    title: "Skill Training for Disabled Youth in Rural Maharashtra",
    category: "Disability Support",
    image: "/placeholder.svg?key=d0mee",
    raised: 245000,
    goal: 500000,
    backers: 78,
    daysLeft: 15,
    solutions: 12,
    creator: {
      name: "Priya Sharma",
      image: "/placeholder.svg?key=pj4ki",
      role: "Founder, Ability Foundation",
      campaigns: 3,
    },
    description: `
      <p>In rural Maharashtra, young people with disabilities face significant barriers to employment and economic independence. Many lack access to vocational training programs tailored to their needs, leaving them dependent on family support and vulnerable to poverty.</p>
      
      <p>Our project aims to establish a skill development center that will provide specialized training in digital skills, handicrafts, and agricultural techniques adapted for people with various disabilities. The center will serve 50 young adults in its first year, with plans to expand to neighboring villages in subsequent years.</p>
      
      <p>What makes our approach unique is our focus on market-relevant skills and direct connections to local businesses. We've already secured partnerships with 5 local employers who are committed to inclusive hiring practices.</p>
      
      <h3>What We Need</h3>
      <p>The funds raised will be used for:</p>
      <ul>
        <li>Accessible training facility setup: ₹200,000</li>
        <li>Adaptive equipment and training materials: ₹150,000</li>
        <li>Instructor salaries (6 months): ₹100,000</li>
        <li>Transportation subsidies for participants: ₹50,000</li>
      </ul>
      
      <h3>Impact</h3>
      <p>Your support will directly help 50 young people with disabilities gain economic independence in the first year. Based on our pilot program, we expect at least 70% of graduates to secure employment or start micro-enterprises within 3 months of completing training.</p>
      
      <p>Beyond the immediate beneficiaries, this project will serve as a model for disability-inclusive vocational training that can be replicated in other rural communities across India.</p>
    `,
    updates: [
      {
        id: 1,
        date: "2023-04-15",
        title: "Training Facility Secured!",
        content:
          "We're excited to announce that we've secured a location for our training center in Satara district. The building owner has generously offered a reduced rent after learning about our mission. Renovation work to make the space fully accessible will begin next week.",
      },
      {
        id: 2,
        date: "2023-03-28",
        title: "New Corporate Partner Joins Our Cause",
        content:
          "We're thrilled to welcome TechSolutions India as our newest corporate partner. They've committed to providing internship opportunities for 5 of our program graduates and will be donating computer equipment for our digital skills training program.",
      },
    ],
    verification: {
      campaignId: params.id,
      status: "verified",
      verifications: [
        {
          id: "v1",
          type: "identity",
          status: "verified",
          verifier: {
            name: "Be A Rebel Verification Team",
            role: "Platform Verifier",
            image: "/placeholder.svg?key=txpgh",
          },
          date: "2023-03-15",
          evidence: "Identity documents reviewed and confirmed with government records.",
          evidenceUrl: "/verification-reports/identity-check.pdf",
        },
        {
          id: "v2",
          type: "location",
          status: "verified",
          verifier: {
            name: "Amit Desai",
            role: "Independent Verifier",
            image: "/placeholder.svg?key=o9ix0",
          },
          date: "2023-03-20",
          evidence: "Site location visited and accessibility improvements documented.",
          evidenceUrl: "/verification-reports/location-audit.pdf",
        },
        {
          id: "v3",
          type: "document",
          status: "verified",
          verifier: {
            name: "Be A Rebel Verification Team",
            role: "Platform Verifier",
          },
          date: "2023-03-18",
          evidence: "Registration certificates and financial statements archived for review.",
        },
        {
          id: "v4",
          type: "impact",
          status: "pending",
          date: "2023-04-30",
          evidence: "Impact metrics will be published after the first training cohort completes the program.",
        },
      ],
      visitReports: [
        {
          id: "visit1",
          visitor: {
            name: "Amit Desai",
            role: "Independent Verifier",
            image: "/placeholder.svg?key=3x1xa",
          },
          date: "2023-03-20",
          location: "Satara District, Maharashtra",
          summary:
            "I visited the proposed training center location and met with Priya Sharma. The building is well-suited for the purpose and is being renovated to ensure accessibility. I also met with two potential program participants and one of the employer partners.",
          images: ["/placeholder.svg?key=dd82i", "/placeholder.svg?key=lz8xm", "/placeholder.svg?key=kzuoh"],
          reportUrl: "/verification-reports/site-visit-march.pdf",
        },
      ],
    },
  }

  return (
    <div className="container px-4 py-12 md:py-24">
      <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="mb-6">
            <Badge className="mb-4 bg-orange-600">{campaign.category}</Badge>
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">{campaign.title}</h1>
              <div className="flex items-center gap-2">
                {campaign.verification.status === "verified" && (
                  <Badge className="bg-green-500 text-white flex items-center gap-1">
                    <Shield className="h-3 w-3" /> Verified
                  </Badge>
                )}
              </div>
            </div>
            <div className="relative w-full h-[400px] rounded-lg overflow-hidden mb-6">
              <Image src={campaign.image || "/placeholder.svg"} alt={campaign.title} fill className="object-cover" />
            </div>

            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="updates">Updates</TabsTrigger>
                <TabsTrigger value="solutions">Solutions ({campaign.solutions})</TabsTrigger>
                <TabsTrigger value="verification">Verification</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="mt-6">
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: campaign.description }} />
              </TabsContent>

              <TabsContent value="updates" className="mt-6">
                <div className="space-y-6">
                  {campaign.updates.map((update) => (
                    <Card key={update.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{update.title}</CardTitle>
                            <CardDescription>{update.date}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p>{update.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="solutions" className="mt-6">
                <CampaignSolutions campaignId={campaign.id} />
              </TabsContent>

              <TabsContent value="verification" className="mt-6" id="campaign-verification">
                <VerificationSystem data={campaign.verification} />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-lg">₹{campaign.raised.toLocaleString()}</span>
                    <span className="text-gray-500">raised of ₹{campaign.goal.toLocaleString()}</span>
                  </div>
                  <Progress value={(campaign.raised / campaign.goal) * 100} className="h-2" />
                </div>

                <div className="flex justify-between text-sm">
                  <div>
                    <span className="font-medium block">{campaign.backers}</span>
                    <span className="text-gray-500">Backers</span>
                  </div>
                  <div>
                    <span className="font-medium block">{campaign.daysLeft}</span>
                    <span className="text-gray-500">Days Left</span>
                  </div>
                  <div>
                    <span className="font-medium block">{campaign.solutions}</span>
                    <span className="text-gray-500">Solutions</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">Donate Now</Button>
                  <Button variant="outline" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>

                <DonationForm campaignId={campaign.id} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Campaign Creator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={campaign.creator.image || "/placeholder.svg"} alt={campaign.creator.name} />
                  <AvatarFallback>{campaign.creator.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{campaign.creator.name}</h3>
                  <p className="text-sm text-gray-500">{campaign.creator.role}</p>
                  <p className="text-sm text-gray-500">{campaign.creator.campaigns} campaigns created</p>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                Contact Creator
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Verification Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                Independent identity checks, document reviews, and site visits keep this campaign accountable.
              </p>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  document.getElementById("campaign-verification")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                View verification details
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Share This Campaign</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  Facebook
                </Button>
                <Button variant="outline" className="flex-1">
                  Twitter
                </Button>
                <Button variant="outline" className="flex-1">
                  WhatsApp
                </Button>
              </div>
              <div className="mt-4">
                <Input value={`https://bearebel.org/campaigns/${campaign.id}`} readOnly />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Report This Campaign</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" size="sm">
                <Flag className="h-4 w-4 mr-2" />
                Report a Concern
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
