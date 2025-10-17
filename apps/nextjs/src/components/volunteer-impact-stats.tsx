import { Clock, Users, Award, MapPin } from "lucide-react"

import { Card, CardContent } from "@barebel/ui/card"

interface VolunteerImpactStatsProps {
  className?: string
}

export default function VolunteerImpactStats({ className }: VolunteerImpactStatsProps) {
  return (
    <div className={className}>
      <h2 className="mb-6 text-center text-2xl font-bold">Our Volunteer Impact</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <div className="mb-4 rounded-full bg-orange-100 p-3">
              <Users className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-3xl font-bold">5,000+</h3>
            <p className="mt-1 text-sm text-gray-500">Active Volunteers</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <div className="mb-4 rounded-full bg-orange-100 p-3">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-3xl font-bold">25,000+</h3>
            <p className="mt-1 text-sm text-gray-500">Hours Contributed</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <div className="mb-4 rounded-full bg-orange-100 p-3">
              <Award className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-3xl font-bold">350+</h3>
            <p className="mt-1 text-sm text-gray-500">Organizations Supported</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <div className="mb-4 rounded-full bg-orange-100 p-3">
              <MapPin className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-3xl font-bold">120+</h3>
            <p className="mt-1 text-sm text-gray-500">Cities Reached</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
