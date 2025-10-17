import Link from "next/link"

import { Button } from "@barebel/ui/button"

export default function VolunteerHero() {
  return (
    <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white">
      <div className="container px-4 py-12 md:py-20">
        <div className="mx-auto max-w-3xl space-y-4 text-center md:space-y-6">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">Make a Difference with Your Skills</h1>
          <p className="text-base text-orange-100 md:text-lg lg:text-xl">
            Join our volunteer marketplace to contribute your time and skills to causes that matter. Connect with organizations making a
            real impact across India.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
            <Link href="/volunteer">
              <Button size="lg" className="w-full bg-white text-orange-600 hover:bg-orange-50 sm:w-auto">
                Find Opportunities
              </Button>
            </Link>
            <Link href="/volunteer/create">
              <Button size="lg" variant="outline" className="w-full border-white text-white hover:bg-orange-600/20 sm:w-auto">
                Post Opportunity
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
