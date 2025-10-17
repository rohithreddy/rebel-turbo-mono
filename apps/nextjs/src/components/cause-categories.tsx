"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@barebel/ui/card"
import { motion } from "framer-motion"

export default function CauseCategories() {
  const categories = [
    {
      id: "disability",
      name: "Disability Support",
      image: "/inclusive-india-workshop.png",
      count: 42,
    },
    {
      id: "education",
      name: "Education",
      image: "/placeholder.svg?key=j0d0g",
      count: 78,
    },
    {
      id: "women",
      name: "Women Empowerment",
      image: "/rural-women-empowerment.png",
      count: 56,
    },
    {
      id: "environment",
      name: "Reforestation",
      image: "/placeholder.svg?height=200&width=400&query=reforestation project in India",
      count: 31,
    },
    {
      id: "healthcare",
      name: "Healthcare",
      image: "/placeholder.svg?height=200&width=400&query=rural healthcare clinic in India",
      count: 45,
    },
    {
      id: "elderly",
      name: "Elderly Care",
      image: "/placeholder.svg?height=200&width=400&query=elderly care center in India",
      count: 23,
    },
  ]

  return (
    <div className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
      {categories.map((category, index) => (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <Link href={`/campaigns?category=${category.id}`}>
            <Card className="overflow-hidden transition-all hover:shadow-lg border-none shadow-md group">
              <CardContent className="p-0">
                <div className="relative h-48 w-full">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4">
                    <h3 className="font-bold text-lg text-white">{category.name}</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-200">{category.count} campaigns</p>
                      <span className="text-orange-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Explore →
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
