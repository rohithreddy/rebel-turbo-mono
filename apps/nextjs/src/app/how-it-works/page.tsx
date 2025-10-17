import Image from "next/image"
import Link from "next/link"
import { Button } from "@barebel/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@barebel/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@barebel/ui/tabs"
import { Heart, LightbulbIcon, Users, ArrowRight, CheckCircle2, Shield, Trophy } from "lucide-react"

export default function HowItWorksPage() {
  return (
    <div className="container px-4 py-12 md:py-24">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How Be A Rebel Works</h1>
          <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed">
            Our unique approach combines crowdfunding with collaborative problem-solving to maximize impact.
          </p>
        </div>
      </div>

      <Tabs defaultValue="backers" className="w-full max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="backers">For Backers</TabsTrigger>
          <TabsTrigger value="creators">For Campaign Creators</TabsTrigger>
          <TabsTrigger value="solutions">Solution Contributors</TabsTrigger>
        </TabsList>

        <TabsContent value="backers" className="mt-8">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Support Causes That Matter</h2>
              <p className="text-gray-500 mb-6">
                As a backer on Be A Rebel, you're not just donating money – you're joining a community of changemakers
                who believe in resourceful solutions to social challenges.
              </p>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Discover Impactful Campaigns</h3>
                    <p className="text-sm text-gray-500">
                      Browse campaigns across various social causes throughout India.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Contribute Funds</h3>
                    <p className="text-sm text-gray-500">
                      Make secure donations of any amount to campaigns you believe in.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Propose Solutions</h3>
                    <p className="text-sm text-gray-500">Share your ideas to help campaigns achieve more with less.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Track Impact</h3>
                    <p className="text-sm text-gray-500">
                      Receive updates on how your contribution is making a difference.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Link href="/campaigns">
                  <Button className="bg-orange-600 hover:bg-orange-700">Explore Campaigns</Button>
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden">
              <Image
                src="/unity-in-diversity.png"
                alt="Backers supporting social causes"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="creators" className="mt-8">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="relative h-[400px] rounded-xl overflow-hidden md:order-first">
              <Image
                src="/community-project-presentation.png"
                alt="Campaign creator presenting project"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Launch Your Social Impact Campaign</h2>
              <p className="text-gray-500 mb-6">
                Be A Rebel provides a platform for changemakers to raise funds and gather innovative solutions for
                social causes across India.
              </p>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Create Your Campaign</h3>
                    <p className="text-sm text-gray-500">
                      Our simple process guides you through setting up an effective campaign.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Receive Funding</h3>
                    <p className="text-sm text-gray-500">Collect donations from supporters across India and beyond.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Gather Resourceful Solutions</h3>
                    <p className="text-sm text-gray-500">
                      Benefit from community ideas that help maximize your impact.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Share Your Progress</h3>
                    <p className="text-sm text-gray-500">
                      Keep supporters engaged with regular updates on your impact.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Link href="/create">
                  <Button className="bg-orange-600 hover:bg-orange-700">Start a Campaign</Button>
                </Link>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="solutions" className="mt-8">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Contribute Resourceful Solutions</h2>
              <p className="text-gray-500 mb-6">
                What makes Be A Rebel unique is our focus on resourcefulness. We believe that the best solutions often
                come from creative thinking, not just more funding.
              </p>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Browse Campaign Needs</h3>
                    <p className="text-sm text-gray-500">Explore campaigns and understand their resource challenges.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Propose Creative Solutions</h3>
                    <p className="text-sm text-gray-500">
                      Share ideas that help campaigns achieve more with less resources.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Collaborate with Others</h3>
                    <p className="text-sm text-gray-500">
                      Build on community ideas to develop the most effective solutions.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">See Your Impact</h3>
                    <p className="text-sm text-gray-500">Watch as campaigns implement your ideas and create change.</p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Link href="/campaigns">
                  <Button className="bg-orange-600 hover:bg-orange-700">Find Campaigns to Help</Button>
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=500&query=Indian people brainstorming solutions in community meeting"
                alt="Community members proposing solutions"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">The Be A Rebel Process</h2>
          <p className="max-w-[700px] mx-auto text-gray-500 mt-2">
            Our unique approach combines crowdfunding with collaborative problem-solving.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle>1. Find a Cause</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">
                Discover campaigns for disabled persons, education, women empowerment, reforestation, and more across
                India.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                <LightbulbIcon className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle>2. Propose Solutions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">
                Join our unique solution forums to discuss and develop resourceful approaches that maximize impact with
                minimal funding. Earn points and badges for your contributions.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle>3. Fund & Implement</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">
                Contribute funds securely and track how your support helps implement the most effective community-vetted
                solutions. Verify impact through our transparency dashboard.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Trust & Transparency</h2>
          <p className="max-w-[700px] mx-auto text-gray-500 mt-2">
            Our innovative verification and gamification systems ensure transparency and reward community participation.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="bg-green-50 border-none shadow-md">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle>Trusted Verification</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Our verification system combines independent reviewers with tamper-evident audit trails to ensure
                complete transparency and accountability in every campaign.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Independent site visits verify campaign details and impact</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Tamper-evident audit logs ensure data cannot be altered</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Transparent verification process builds trust in campaigns</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Secure archives store site visit reports and supporting evidence</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-yellow-50 border-none shadow-md">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
                <Trophy className="w-6 h-6 text-yellow-600" />
              </div>
              <CardTitle>Gamified Participation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Our gamification system rewards active participation and contribution to social causes.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <span>Earn points for proposing solutions, voting, and verifying campaigns</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <span>Collect badges that showcase your expertise and commitment</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <span>Climb the community leaderboard and build your reputation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <span>Unlock special privileges as you reach higher levels</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-24 bg-orange-50 p-8 rounded-xl">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">Ready to Make a Difference?</h2>
            <p className="text-gray-600 mb-6">
              Join our community of rebels making positive change across India. Start a campaign or support an existing
              cause today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/create">
                <Button className="bg-orange-600 hover:bg-orange-700">Start a Campaign</Button>
              </Link>
              <Link href="/campaigns">
                <Button variant="outline">Explore Campaigns</Button>
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <ArrowRight className="h-12 w-12 text-orange-600" />
          </div>
        </div>
      </div>
    </div>
  )
}
