"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@barebel/ui/button"
import { Badge } from "@barebel/ui/badge"
import { motion } from "framer-motion"

export default function HeroSection() {
  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden">
      <div className="absolute inset-0 bg-[#f5f0ff] z-0"></div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-[20%] w-64 h-64 rounded-full bg-orange-200 opacity-20 blur-3xl"></div>
      <div className="absolute bottom-20 left-[10%] w-72 h-72 rounded-full bg-orange-300 opacity-20 blur-3xl"></div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-2"
            >
              <Badge className="inline-flex bg-orange-600 hover:bg-orange-700 text-white">Join the Movement</Badge>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Be A Rebel For <span className="text-orange-600">Social Change</span>
              </h1>
              <p className="max-w-[600px] text-gray-600 md:text-xl">
                Fund impactful social causes, collaborate on resourceful solutions, and earn rewards through our
                gamified verification system that ensures transparency and trust.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col gap-2 min-[400px]:flex-row"
            >
              <Link href="/campaigns">
                <Button className="bg-orange-600 hover:bg-orange-700 shadow-lg hover:shadow-xl transition-all">
                  Explore Campaigns
                </Button>
              </Link>
              <Link href="/create">
                <Button variant="outline" className="hover:bg-orange-50 transition-all">
                  Start a Campaign
                </Button>
              </Link>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative h-[300px] lg:h-[400px] xl:h-[500px] rounded-xl overflow-hidden shadow-2xl"
          >
            <Image
              src="/rural-empowerment-meeting.png"
              alt="Indian women empowerment initiative"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
