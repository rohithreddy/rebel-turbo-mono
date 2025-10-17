"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { RouterOutputs } from "@barebel/api"
import { Badge } from "@barebel/ui/badge"
import { Button } from "@barebel/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@barebel/ui/card"
import { Textarea } from "@barebel/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@barebel/ui/avatar"
import { useToast } from "@barebel/ui/use-toast"
import { Calendar, Clock, MapPin, Users, Briefcase, ChevronRight, Share2 } from "lucide-react"

import { useSession } from "~/auth/client"
import { api } from "~/trpc/react"

type VolunteerOpportunity = RouterOutputs["volunteers"]["getOpportunityById"]

const mockOpportunity: VolunteerOpportunity = {
  id: "mock-1",
  title: "Teaching Assistant for Rural School in Maharashtra",
  description:
    "We are looking for dedicated volunteers to assist teachers in our rural education program. Volunteers will help with classroom activities, provide one-on-one support to students, and assist in developing teaching materials. This is a great opportunity to make a direct impact on children's education in underserved communities.\n\nResponsibilities include:\n- Assisting teachers with daily classroom activities\n- Providing individual attention to students who need extra help\n- Helping prepare educational materials\n- Participating in extracurricular activities\n- Documenting student progress",
  organizationName: "Rural Education Foundation",
  organizationDescription:
    "Rural Education Foundation is dedicated to improving access to quality education in rural areas across India. We operate schools and educational programs in underserved communities.",
  category: "Education",
  location: "Pune, Maharashtra",
  remote: false,
  commitment: "10 hours per week",
  startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
  slots: 5,
  filledSlots: 2,
  skills: ["Teaching", "Mentoring", "Patience", "Creativity"],
  status: "active",
  createdAt: new Date(),
  updatedAt: new Date(),
  creatorId: "user-1",
  campaignId: null,
  applicationsCount: 0,
  creator: {
    id: "user-1",
    name: "Priya Sharma",
    email: "priya@example.com",
    image: "/diverse-avatars.png",
    role: "user",
    createdAt: new Date(),
  },
}

export default function VolunteerDetailClient({ id }: { id: string }) {
  const { data: session } = useSession()
  const user = session?.user
  const router = useRouter()
  const { toast } = useToast()
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const opportunityQuery = api.volunteers.getOpportunityById.useQuery(id, {
    retry: 1,
    onError: (err) => {
      console.error("Error fetching volunteer opportunity:", err)
    },
  })

  const { data: opportunity, status } = opportunityQuery

  const applyMutation = api.volunteers.applyForOpportunity.useMutation({
    onSuccess: () => {
      toast({
        title: "Application submitted",
        description: "Your application has been sent to the organization.",
      })
      setMessage("")
    },
    onError: (err) => {
      const errorMessage = err.message && err.message.length > 0 ? err.message : "Failed to submit application. Please try again."
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    },
    onSettled: () => {
      setIsSubmitting(false)
    },
  })

  const handleApply = () => {
    if (!user) {
      router.push(`/login?redirect=/volunteer/${id}`)
      return
    }

    setIsSubmitting(true)
    applyMutation.mutate({
      opportunityId: id,
      message,
    })
  }

  if (status === "pending") {
    return <div className="py-8 text-center">Loading opportunity details...</div>
  }

  if (status === "error") {
    if (opportunityQuery.error) {
      console.error("Error fetching volunteer opportunity:", opportunityQuery.error)
    }
    return (
      <OpportunityDetail
        opportunity={mockOpportunity}
        isSubmitting={isSubmitting}
        message={message}
        setMessage={setMessage}
        userEmail={user?.email ?? null}
        userName={user?.name ?? null}
        onApply={handleApply}
      />
    )
  }

  if (!opportunity) {
    return <div className="py-8 text-center">Opportunity not found.</div>
  }

  return (
    <OpportunityDetail
      opportunity={opportunity}
      isSubmitting={isSubmitting}
      message={message}
      setMessage={setMessage}
      userEmail={user?.email ?? null}
      userName={user?.name ?? null}
      onApply={handleApply}
    />
  )
}

interface OpportunityDetailProps {
  opportunity: VolunteerOpportunity
  userEmail: string | null
  userName: string | null
  message: string
  setMessage: (value: string) => void
  onApply: () => void
  isSubmitting: boolean
}

function OpportunityDetail({ opportunity, userEmail, userName, message, setMessage, onApply, isSubmitting }: OpportunityDetailProps) {
  const formattedStartDate = opportunity.startDate
    ? new Date(opportunity.startDate).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Flexible start"

  const formattedEndDate = opportunity.endDate
    ? new Date(opportunity.endDate).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : ""

  const availableSlots = Math.max(0, opportunity.slots - opportunity.filledSlots)
  const applicantName = userName && userName.trim().length > 0 ? userName : "Guest"
  const applicantEmail = userEmail && userEmail.trim().length > 0 ? userEmail : "Sign in to apply"
  const creatorName = opportunity.creator?.name && opportunity.creator.name.length > 0 ? opportunity.creator.name : "Organizer"
  const creatorEmail =
    opportunity.creator?.email && opportunity.creator.email.length > 0 ? opportunity.creator.email : "Not available"
  const creatorImage =
    opportunity.creator?.image && opportunity.creator.image.length > 0 ? opportunity.creator.image : undefined

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
            <Link href="/volunteer" className="hover:text-orange-600">
              Volunteer
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={`/volunteer?category=${opportunity.category}`} className="hover:text-orange-600">
              {opportunity.category}
            </Link>
          </div>
          <h1 className="text-2xl font-bold sm:text-3xl">{opportunity.title}</h1>
          <div className="mt-2 flex items-center gap-2">
            <Badge className="bg-orange-600">{opportunity.category}</Badge>
            {opportunity.remote ? <Badge className="bg-blue-600">Remote</Badge> : null}
          </div>
        </div>
        <Button className="flex items-center gap-2" variant="outline">
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About This Opportunity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p className="whitespace-pre-line">{opportunity.description}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>About {opportunity.organizationName}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-r from-orange-600 to-orange-400 text-xl font-bold text-white">
                  {opportunity.organizationName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{opportunity.organizationName}</h3>
                  <Link href="#" className="text-sm text-orange-600 hover:underline">
                    View Profile
                  </Link>
                </div>
              </div>
              <p className="text-gray-700">
                {opportunity.organizationDescription ?? "No organization description available."}
              </p>
            </CardContent>
          </Card>

          {opportunity.skills?.length ? (
            <Card>
              <CardHeader>
                <CardTitle>Preferred Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {opportunity.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="border-dashed">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : null}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Opportunity Details</CardTitle>
              <CardDescription>Key information for volunteers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-gray-600">
              <DetailRow icon={<MapPin className="h-4 w-4 text-orange-600" />} label="Location">
                {opportunity.location}
              </DetailRow>
              <DetailRow icon={<Clock className="h-4 w-4 text-orange-600" />} label="Time Commitment">
                {opportunity.commitment}
              </DetailRow>
              <DetailRow icon={<Calendar className="h-4 w-4 text-orange-600" />} label="Start Date">
                {formattedStartDate}
              </DetailRow>
              {formattedEndDate ? (
                <DetailRow icon={<Calendar className="h-4 w-4 text-orange-600" />} label="End Date">
                  {formattedEndDate}
                </DetailRow>
              ) : null}
              <DetailRow icon={<Users className="h-4 w-4 text-orange-600" />} label="Slots Available">
                {availableSlots} of {opportunity.slots}
              </DetailRow>
              <DetailRow icon={<Briefcase className="h-4 w-4 text-orange-600" />} label="Applications Received">
                {opportunity.applicationsCount}
              </DetailRow>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Apply to Volunteer</CardTitle>
              <CardDescription>Share a brief message about your interest.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <LabelAndValue label="Your Name" value={applicantName} />
                <LabelAndValue label="Email" value={applicantEmail} />
              </div>
              <Textarea
                placeholder="Tell the organization why you're interested and how you can help..."
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className="min-h-[120px]"
              />
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={onApply} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </CardFooter>
          </Card>

          {opportunity.creator ? (
            <Card>
              <CardHeader>
                <CardTitle>Opportunity Organizer</CardTitle>
                <CardDescription>Reach out for more details.</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={creatorImage} alt={creatorName} />
                  <AvatarFallback>{creatorName.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{creatorName}</p>
                  <p className="text-sm text-gray-500">
                    Contact via email: <span className="font-medium">{creatorEmail}</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : null}
        </div>
      </div>
    </div>
  )
}

function DetailRow({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-dashed border-orange-200/60 p-3">
      <div className="flex items-center justify-center">{icon}</div>
      <div>
        <p className="text-xs uppercase tracking-wide text-gray-400">{label}</p>
        <p className="text-sm font-medium text-gray-700">{children}</p>
      </div>
    </div>
  )
}

function LabelAndValue({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-3">
      <p className="text-xs uppercase tracking-wide text-gray-400">{label}</p>
      <p className="text-sm font-medium text-gray-700">{value}</p>
    </div>
  )
}
