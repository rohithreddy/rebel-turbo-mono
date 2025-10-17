import { Suspense } from "react"
import CampaignListClient from "@/components/campaign-list-client"
import { Input } from "@barebel/ui/input"
import { Button } from "@barebel/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@barebel/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@barebel/ui/tabs"

export default async function CampaignsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string }>
}) {
  const params = await searchParams
  const category = params.category
  const sort = params.sort as "newest" | "ending-soon" | "most-funded" | "most-solutions" | undefined

  return (
    <div className="container px-4 py-12 md:py-24">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Explore Campaigns</h1>
          <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed">
            Discover and support social causes across India that need your help.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[250px_1fr]">
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">Search</h3>
            <Input placeholder="Search campaigns..." />
          </div>

          <div>
            <h3 className="font-medium mb-2">Categories</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                All Categories
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Disability Support
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Education
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Women Empowerment
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Environment
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Healthcare
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Elderly Care
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Sort By</h3>
            <Select defaultValue={sort ?? "newest"}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="ending-soon">Ending Soon</SelectItem>
                <SelectItem value="most-funded">Most Funded</SelectItem>
                <SelectItem value="most-solutions">Most Solutions</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <h3 className="font-medium mb-2">Funding Status</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                All Campaigns
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Recently Launched
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Ending Soon
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Fully Funded
              </Button>
            </div>
          </div>
        </div>

        <div>
          <Tabs defaultValue="grid" className="mb-6">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">Showing campaigns</p>
              <TabsList>
                <TabsTrigger value="grid">Grid</TabsTrigger>
                <TabsTrigger value="list">List</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="grid" className="mt-6">
              <Suspense fallback={<div className="text-center py-8">Loading campaigns...</div>}>
                <CampaignListClient category={category} sort={sort} />
              </Suspense>
            </TabsContent>

            <TabsContent value="list" className="mt-6">
              <div className="text-center py-8">List view coming soon...</div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
