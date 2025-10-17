"use client"

import { useState } from "react"
import { Button } from "@barebel/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@barebel/ui/card"
import { Input } from "@barebel/ui/input"
import { Label } from "@barebel/ui/label"
import { Textarea } from "@barebel/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@barebel/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@barebel/ui/tabs"
import { Calendar } from "@barebel/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@barebel/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Upload } from "lucide-react"

export default function CreateCampaignPage() {
  const [date, setDate] = useState<Date>()

  return (
    <div className="container px-4 py-12 md:py-24">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Start Your Campaign</h1>
          <p className="text-gray-500 md:text-xl max-w-[700px] mx-auto">
            Create a campaign to raise funds and gather resourceful solutions for your social cause.
          </p>
        </div>

        <Tabs defaultValue="basics" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basics">Basics</TabsTrigger>
            <TabsTrigger value="story">Story</TabsTrigger>
            <TabsTrigger value="funding">Funding</TabsTrigger>
            <TabsTrigger value="review">Review</TabsTrigger>
          </TabsList>

          <TabsContent value="basics" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Basics</CardTitle>
                <CardDescription>Let's start with the fundamental details of your campaign.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Campaign Title</Label>
                  <Input id="title" placeholder="Give your campaign a clear, specific title" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="disability">Disability Support</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="women">Women Empowerment</SelectItem>
                      <SelectItem value="environment">Environment</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="elderly">Elderly Care</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Where will your campaign make an impact?" />
                </div>

                <div className="space-y-2">
                  <Label>Campaign Image</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-1">Drag and drop an image here, or click to browse</p>
                    <p className="text-xs text-gray-400">Recommended size: 1200 x 675 pixels</p>
                    <Button variant="outline" size="sm" className="mt-4">
                      Upload Image
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="summary">Brief Summary</Label>
                  <Textarea id="summary" placeholder="Provide a short summary of your campaign (100-150 words)" />
                  <p className="text-xs text-gray-500">This will appear in campaign listings and search results.</p>
                </div>

                <div className="flex justify-end">
                  <Button>Save & Continue</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="story" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Story</CardTitle>
                <CardDescription>Tell potential supporters about your cause and why it matters.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="problem">The Problem</Label>
                  <Textarea
                    id="problem"
                    placeholder="Describe the social issue you're addressing"
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="solution">Your Solution</Label>
                  <Textarea
                    id="solution"
                    placeholder="How will your campaign help solve this problem?"
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="impact">Expected Impact</Label>
                  <Textarea
                    id="impact"
                    placeholder="What specific outcomes do you expect? How many people will benefit?"
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="team">About Your Team</Label>
                  <Textarea
                    id="team"
                    placeholder="Who is involved in this initiative? What experience do you bring?"
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeline">Timeline</Label>
                  <Textarea
                    id="timeline"
                    placeholder="What are the key milestones for your project?"
                    className="min-h-[100px]"
                  />
                </div>

                <div className="flex justify-between">
                  <Button variant="outline">Back</Button>
                  <Button>Save & Continue</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="funding" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Funding Details</CardTitle>
                <CardDescription>Set your funding goals and explain how the money will be used.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="goal">Funding Goal (₹)</Label>
                  <Input id="goal" type="number" placeholder="Enter amount in INR" />
                  <p className="text-xs text-gray-500">Set a realistic goal that covers your project needs.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="end-date">Campaign End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Select a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                  <p className="text-xs text-gray-500">Campaigns can run for up to 60 days.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">Budget Breakdown</Label>
                  <Textarea
                    id="budget"
                    placeholder="Provide a detailed breakdown of how funds will be used"
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alternative">Alternative Resources</Label>
                  <Textarea
                    id="alternative"
                    placeholder="What non-monetary resources could help your campaign? (e.g., volunteer time, donated equipment, etc.)"
                    className="min-h-[100px]"
                  />
                  <p className="text-xs text-gray-500">This helps the community propose resourceful solutions.</p>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline">Back</Button>
                  <Button>Save & Continue</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="review" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Review & Submit</CardTitle>
                <CardDescription>Review your campaign details before submitting.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Campaign Preview</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      This is how your campaign will appear to potential supporters.
                    </p>
                    <div className="bg-gray-100 h-40 rounded-lg flex items-center justify-center text-gray-400">
                      Campaign Preview
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Terms & Conditions</h3>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <input type="checkbox" id="terms" className="mt-1 mr-2" />
                        <Label htmlFor="terms" className="text-sm">
                          I agree to the Be A Rebel{" "}
                          <a href="/terms" className="text-orange-600 hover:underline">
                            Terms of Service
                          </a>{" "}
                          and{" "}
                          <a href="/privacy" className="text-orange-600 hover:underline">
                            Privacy Policy
                          </a>
                          .
                        </Label>
                      </div>
                      <div className="flex items-start">
                        <input type="checkbox" id="guidelines" className="mt-1 mr-2" />
                        <Label htmlFor="guidelines" className="text-sm">
                          I confirm that my campaign complies with the{" "}
                          <a href="/guidelines" className="text-orange-600 hover:underline">
                            Community Guidelines
                          </a>
                          .
                        </Label>
                      </div>
                      <div className="flex items-start">
                        <input type="checkbox" id="updates" className="mt-1 mr-2" />
                        <Label htmlFor="updates" className="text-sm">
                          I commit to providing regular updates to my supporters about the progress of this campaign.
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline">Back</Button>
                  <Button className="bg-orange-600 hover:bg-orange-700">Submit Campaign</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
