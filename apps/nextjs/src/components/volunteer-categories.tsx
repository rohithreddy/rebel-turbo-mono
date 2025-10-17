import Link from "next/link"
import {
  BookOpen,
  Briefcase,
  Heart,
  Leaf,
  Users,
  Utensils,
  Palette,
  Laptop,
  Stethoscope,
  PawPrintIcon as Paw,
} from "lucide-react"

import { Button } from "@barebel/ui/button"
import { ScrollArea, ScrollBar } from "@barebel/ui/scroll-area"

const categories = [
  { name: "Education", icon: BookOpen, href: "/volunteer?category=Education" },
  { name: "Healthcare", icon: Stethoscope, href: "/volunteer?category=Healthcare" },
  { name: "Environment", icon: Leaf, href: "/volunteer?category=Environment" },
  { name: "Community", icon: Users, href: "/volunteer?category=Community" },
  { name: "Technology", icon: Laptop, href: "/volunteer?category=Technology" },
  { name: "Arts & Culture", icon: Palette, href: "/volunteer?category=Arts" },
  { name: "Animal Welfare", icon: Paw, href: "/volunteer?category=Animals" },
  { name: "Food Security", icon: Utensils, href: "/volunteer?category=Food" },
  { name: "Professional", icon: Briefcase, href: "/volunteer?category=Professional" },
  { name: "Elderly Care", icon: Heart, href: "/volunteer?category=Elderly" },
]

export default function VolunteerCategories() {
  return (
    <div className="py-6">
      <h2 className="text-xl font-semibold mb-4">Browse by Category</h2>
      <ScrollArea className="w-full whitespace-nowrap pb-4">
        <div className="flex w-max space-x-4 p-1">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link key={category.name} href={category.href} className="first:pl-0 last:pr-4">
                <Button
                  variant="outline"
                  className="flex h-auto flex-col gap-2 border-gray-200 px-4 py-3 text-xs font-medium hover:border-orange-500 hover:text-orange-600"
                >
                  <Icon className="h-5 w-5" />
                  <span>{category.name}</span>
                </Button>
              </Link>
            )
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
