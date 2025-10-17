import Link from "next/link"
import { Button } from "@barebel/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@barebel/ui/card"
import { ArrowRight, Heart, LightbulbIcon, Users } from "lucide-react"
import FeaturedCampaigns from "@/components/featured-campaigns"
import ImpactStats from "@/components/impact-stats"
import CauseCategories from "@/components/cause-categories"
import HeroSection from "@/components/hero-section"
import TestimonialSection from "@/components/testimonial-section"
// Import the new GamificationFeatures component
import GamificationFeatures from "@/components/gamification-features"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Impact Stats */}
      <ImpactStats />

      {/* Featured Campaigns */}
      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Campaigns</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join these impactful initiatives and help create meaningful change across India.
              </p>
            </div>
          </div>
          <FeaturedCampaigns />
          <div className="flex justify-center mt-8">
            <Link href="/campaigns">
              <Button variant="outline" className="gap-1 group transition-all duration-300 hover:pl-4 hover:pr-6">
                View All Campaigns <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Gamification Features */}
      <GamificationFeatures />

      {/* Testimonials Section */}
      <TestimonialSection />

      {/* How It Works */}
      <section className="w-full py-12 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How Be A Rebel Works</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our unique approach combines crowdfunding with collaborative problem-solving.
              </p>
            </div>
          </div>
          <div className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
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
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                  <LightbulbIcon className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>2. Propose Solutions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Join our unique solution forums to discuss and develop resourceful approaches that maximize impact
                  with minimal funding.
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>3. Fund & Implement</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Contribute funds securely and track how your support helps implement the most effective
                  community-vetted solutions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Explore Causes</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover campaigns across various social causes throughout India.
              </p>
            </div>
          </div>
          <CauseCategories />
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-12 md:py-24 bg-gradient-to-r from-orange-600 to-orange-500">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
                Ready to Make a Difference?
              </h2>
              <p className="text-orange-100 md:text-xl">
                Start a campaign or join our community of rebels making positive change across India.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center lg:justify-end">
              <Link href="/create">
                <Button className="bg-white text-orange-600 hover:bg-orange-50 shadow-lg hover:shadow-xl transition-all">
                  Start a Campaign
                </Button>
              </Link>
              <Link href="/campaigns">
                <Button variant="outline" className="text-white border-white hover:bg-orange-700">
                  Explore Campaigns
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
