"use client"

import { Card, CardContent } from "@barebel/ui/card"
import { Users, Lightbulb, IndianRupee, Sprout, Trophy } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function ImpactStats() {
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
    <section className="w-full py-12 md:py-16 bg-white">
      <div className="container px-4 md:px-6">
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid gap-4 md:gap-8 grid-cols-2 lg:grid-cols-4"
        >
          <motion.div variants={item}>
            <Card className="bg-orange-50 border-none shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-orange-100 p-3">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-3xl font-bold text-orange-600">12,500+</h3>
                  <p className="text-sm text-gray-500">Lives Impacted</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="bg-green-50 border-none shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-green-100 p-3">
                  <Lightbulb className="h-6 w-6 text-green-600" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-3xl font-bold text-green-600">850+</h3>
                  <p className="text-sm text-gray-500">Solutions Proposed</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="bg-purple-50 border-none shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-purple-100 p-3">
                  <IndianRupee className="h-6 w-6 text-purple-600" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-3xl font-bold text-purple-600">₹1.2 Cr+</h3>
                  <p className="text-sm text-gray-500">Funds Raised</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="bg-blue-50 border-none shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-blue-100 p-3">
                  <Sprout className="h-6 w-6 text-blue-600" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-3xl font-bold text-blue-600">320+</h3>
                  <p className="text-sm text-gray-500">Campaigns Funded</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={item}>
            <Card className="bg-teal-50 border-none shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-teal-100 p-3">
                  <Trophy className="h-6 w-6 text-teal-600" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-3xl font-bold text-teal-600">5,200+</h3>
                  <p className="text-sm text-gray-500">Verification Points</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
