import { Card, CardContent, CardHeader, CardTitle } from "@barebel/ui/card"
import { Shield, CheckCircle, Camera, FileText, LinkIcon, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function VerificationExplainer() {
  return (
    <div className="bg-white py-16">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Transparent Verification System</h2>
          <p className="max-w-[800px] mx-auto text-gray-500 mt-2">
            Our multi-layer verification process ensures transparency and builds trust in every campaign.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
            <Image src="/transparent-blockchain-verification.png" alt="Verification system" fill className="object-cover" />
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold">How It Works</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium">Identity & Document Verification</h4>
                  <p className="text-sm text-gray-500">
                    Campaign creators undergo a thorough verification process to confirm their identity and organization
                    details.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Camera className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium">Independent Site Visits</h4>
                  <p className="text-sm text-gray-500">
                    Community members conduct site visits to verify campaign details and document progress with photos
                    and reports.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium">Secure Document Archive</h4>
                  <p className="text-sm text-gray-500">
                    All verification data is stored in tamper-evident audit logs, ensuring it cannot be altered or
                    deleted.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                <LinkIcon className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <h4 className="font-medium">Transparency Dashboard</h4>
                <p className="text-sm text-gray-500">
                  Verification records are published to a public transparency dashboard, creating an immutable history
                  of each campaign.
                  </p>
                </div>
              </div>
            </div>

            <Link href="/how-it-works">
              <div className="inline-flex items-center text-orange-600 hover:text-orange-700">
                Learn more about our verification system <ExternalLink className="ml-1 h-4 w-4" />
              </div>
            </Link>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <Card className="border-green-100 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Verified Campaigns</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Look for the verified badge on campaigns to ensure they've undergone our rigorous verification process.
              </p>
            </CardContent>
          </Card>

          <Card className="border-blue-100 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-blue-600" />
                <span>Become a Verifier</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Apply to become a community verifier and earn points and badges by conducting site visits.
              </p>
            </CardContent>
          </Card>

          <Card className="border-purple-100 bg-purple-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-purple-600" />
                <span>Transparent Records</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Access verification records through our transparency dashboard for complete accountability.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
