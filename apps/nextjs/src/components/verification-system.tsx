"use client"

import { useState } from "react"
import { Button } from "@barebel/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@barebel/ui/card"
import { Badge } from "@barebel/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@barebel/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@barebel/ui/alert"
import { Shield, CheckCircle, AlertCircle, Clock, MapPin, Calendar, Camera, LinkIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface VerificationProps {
  campaignId: string
  status: "verified" | "pending" | "unverified"
  verifications: {
    id: string
    type: "document" | "location" | "identity" | "visit" | "impact"
    status: "verified" | "pending" | "rejected"
    verifier?: {
      name: string
      role: string
      image?: string
    }
    date: string
    evidence?: string
    evidenceUrl?: string
  }[]
  visitReports: {
    id: string
    visitor: {
      name: string
      role: string
      image?: string
    }
    date: string
    location: string
    summary: string
    images: string[]
    reportUrl?: string
  }[]
}

export default function VerificationSystem({ data }: { data: VerificationProps }) {
  const [activeTab, setActiveTab] = useState("overview")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-500"
      case "rejected":
        return "bg-red-500"
      case "pending":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "rejected":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <Card className="border-none shadow-lg">
      <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className={`h-5 w-5 ${data.status === "verified" ? "text-green-500" : "text-gray-400"}`} />
            <CardTitle>Campaign Verification</CardTitle>
          </div>
          <Badge className={`${getStatusColor(data.status)} text-white capitalize`}>{data.status}</Badge>
        </div>
        <CardDescription>Transparent verification backed by independent reviews and site visits.</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="visits">Site Visits</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="pt-4">
            <div className="space-y-4">
              <Alert className="bg-orange-50 border-orange-200">
                <AlertCircle className="h-4 w-4 text-orange-600" />
                <AlertTitle className="text-orange-600">Why Verification Matters</AlertTitle>
                <AlertDescription className="text-orange-700">
                  Our multi-step verification process ensures transparency and builds trust by providing independently
                  validated information about campaigns and their impact.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <h3 className="font-medium text-lg">Verification Status</h3>
                <div className="grid gap-2">
                  {data.verifications.map((verification) => (
                    <div key={verification.id} className="p-3 bg-gray-50 rounded-lg space-y-2">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(verification.status)}
                        <div>
                          <p className="font-medium">
                            {verification.type.charAt(0).toUpperCase() + verification.type.slice(1)} Verification
                          </p>
                          {verification.verifier && (
                            <p className="text-xs text-gray-500">
                              Verified by {verification.verifier.name} • {verification.date}
                            </p>
                          )}
                        </div>
                      </div>
                      {verification.evidence && (
                        <p className="text-xs text-gray-500 pl-8">{verification.evidence}</p>
                      )}
                      {verification.evidenceUrl && (
                        <Link
                          href={verification.evidenceUrl}
                          target="_blank"
                          className="text-xs text-orange-600 flex items-center gap-1 hover:underline pl-8"
                        >
                          <LinkIcon className="h-3 w-3" />
                          View supporting evidence
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="visits" className="pt-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-lg">Independent Site Visits</h3>
                <Button variant="outline" size="sm" className="text-orange-600 border-orange-200 hover:bg-orange-50">
                  Apply to Visit
                </Button>
              </div>

              {data.visitReports.length > 0 ? (
                <div className="space-y-4">
                  {data.visitReports.map((report) => (
                    <Card key={report.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <div className="flex items-center gap-2">
                            <div className="relative h-8 w-8 rounded-full overflow-hidden">
                              <Image src={report.visitor.image ?? "/placeholder.svg"} alt={report.visitor.name} fill className="object-cover" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{report.visitor.name}</p>
                              <p className="text-xs text-gray-500">{report.visitor.role}</p>
                            </div>
                          </div>
                          <Badge variant="outline" className="bg-green-50 text-green-700 flex items-center gap-1">
                            <CheckCircle className="h-3 w-3" /> Verified Visit
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-2">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{report.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>{report.location}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{report.summary}</p>

                        {report.images.length > 0 && (
                          <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
                            {report.images.map((image, index) => {
                              const src = image && image.length > 0 ? image : "/placeholder.svg"
                              return (
                                <div key={index} className="relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden">
                                  <Image src={src} alt={`Visit photo ${index + 1}`} fill className="object-cover" />
                                </div>
                              )
                            })}
                          </div>
                        )}
                      </CardContent>
                      {report.reportUrl && (
                        <CardFooter className="pt-2 text-xs">
                          <Link
                            href={report.reportUrl}
                            target="_blank"
                            className="text-orange-600 flex items-center gap-1 hover:underline"
                          >
                            <LinkIcon className="h-3 w-3" /> View full report
                          </Link>
                        </CardFooter>
                      )}
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Camera className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  <p>No site visits recorded yet</p>
                  <p className="text-sm">Be the first to visit and verify this campaign</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
