"use client"

import { Card, CardContent } from "@barebel/ui/card"
import { Badge } from "@barebel/ui/badge"
import { Trophy, Shield, Star, Award, LightbulbIcon, MapPin } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"

export default function GamificationFeatures() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section className="w-full py-16 bg-gradient-to-b from-white to-orange-50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-orange-600 text-white">New Features</Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            Gamified Verification System
          </h2>
          <p className="max-w-[800px] mx-auto text-gray-600 md:text-xl">
            Earn rewards while ensuring transparency and trust in every campaign through our innovative verification and
            gamification system.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          <motion.div variants={item}>
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 h-full overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-48 w-full">
                  <Image src="/community-solutions-vote.png" alt="Gamified voting system" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Trophy className="h-5 w-5 text-yellow-400" />
                      <h3 className="text-xl font-bold text-white">Gamified Voting</h3>
                    </div>
                    <p className="text-white/90 text-sm">
                      Vote on community solutions, earn points, and climb the leaderboard as you help identify the most
                      resourceful ideas.
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      <Trophy className="h-3 w-3 mr-1" /> Points System
                    </Badge>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      <Star className="h-3 w-3 mr-1" /> Reputation
                    </Badge>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <Award className="h-3 w-3 mr-1" /> Badges
                    </Badge>
                  </div>
                  <p className="text-gray-600">
                    Our gamified voting system rewards active participation. Propose solutions, vote on ideas, and earn
                    badges that showcase your expertise and commitment to social causes.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 h-full overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-48 w-full">
                  <Image src="/transparent-blockchain-verification.png" alt="Independent verification" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-5 w-5 text-green-400" />
                      <h3 className="text-xl font-bold text-white">Trusted Verification</h3>
                    </div>
                    <p className="text-white/90 text-sm">
                      Transparent, multi-layer verification ensures every campaign is legitimate and funds are used as
                      promised.
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <Shield className="h-3 w-3 mr-1" /> Verified Data
                    </Badge>
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                      <MapPin className="h-3 w-3 mr-1" /> Site Visits
                    </Badge>
                    <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                      <LightbulbIcon className="h-3 w-3 mr-1" /> Transparency
                    </Badge>
                  </div>
                  <p className="text-gray-600">
                    Our verification system combines document reviews, on-site visits, and audit trails to keep campaign
                    details, site visits, and impact assessments transparent and accountable.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 h-full overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-48 w-full">
                  <Image src="/vibrant-leaderboard.png" alt="Community leaderboard" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="h-5 w-5 text-purple-400" />
                      <h3 className="text-xl font-bold text-white">Community Leaderboard</h3>
                    </div>
                    <p className="text-white/90 text-sm">
                      Recognize top contributors and build a reputation as a trusted member of the Be A Rebel community.
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                      <Award className="h-3 w-3 mr-1" /> Recognition
                    </Badge>
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                      <Trophy className="h-3 w-3 mr-1" /> Competition
                    </Badge>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      <Star className="h-3 w-3 mr-1" /> Achievements
                    </Badge>
                  </div>
                  <p className="text-gray-600">
                    Our community leaderboard showcases top contributors across different categories. Earn badges for
                    your achievements and build a reputation that reflects your impact on social causes.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
