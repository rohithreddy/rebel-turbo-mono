"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { Button } from "@barebel/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@barebel/ui/card"
import { Input } from "@barebel/ui/input"
import { Label } from "@barebel/ui/label"
import { Textarea } from "@barebel/ui/textarea"
import { Checkbox } from "@barebel/ui/checkbox"
import { Calendar } from "@barebel/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@barebel/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@barebel/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@barebel/ui/popover"
import { useToast } from "@barebel/ui/use-toast"
import { cn } from "@/lib/utils"
import { useSession } from "~/auth/client"
import { api } from "~/trpc/react"

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  organizationName: z.string().min(2, "Organization name is required"),
  organizationDescription: z.string().optional(),
  location: z.string().min(2, "Location is required"),
  remote: z.boolean().default(false),
  category: z.string().min(1, "Category is required"),
  skills: z.array(z.string()).optional(),
  commitment: z.string().min(2, "Time commitment is required"),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  slots: z.number().int().positive("Number of slots must be positive"),
  campaignId: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

const categories = [
  "Education",
  "Healthcare",
  "Environment",
  "Community Development",
  "Elderly Care",
  "Disability Support",
  "Technology",
  "Arts & Culture",
  "Sports & Recreation",
  "Animal Welfare",
  "Disaster Relief",
  "Human Rights",
]

const skillOptions = [
  "Teaching",
  "Mentoring",
  "Web Development",
  "Graphic Design",
  "Social Media",
  "Event Planning",
  "Photography",
  "Videography",
  "Writing",
  "Editing",
  "Translation",
  "Medical",
  "Legal",
  "Accounting",
  "Marketing",
  "Fundraising",
  "Leadership",
  "Project Management",
  "Research",
  "Public Speaking",
]

export function CreateVolunteerForm() {
  const { data: session, isPending } = useSession()
  const user = session?.user
  const router = useRouter()
  const { toast } = useToast()
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      organizationName: "",
      organizationDescription: "",
      location: "",
      remote: false,
      category: "",
      skills: [],
      commitment: "",
      slots: 1,
    },
  })

  const {
    mutate: createOpportunity,
    isLoading: isCreating,
  } = api.volunteers.createOpportunity.useMutation({
    onSuccess: (data) => {
      toast({
        title: "Opportunity created",
        description: "Your volunteer opportunity has been posted successfully.",
      })
      router.push(`/volunteer/${data.id}`)
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    },
  })

  const onSubmit = (values: FormValues) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to post a volunteer opportunity.",
        variant: "destructive",
      })
      router.push("/login?redirect=/volunteer/create")
      return
    }

    createOpportunity({
      ...values,
      skills: selectedSkills,
    })
  }

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prev) => {
      const next = prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
      form.setValue("skills", next)
      return next
    })
  }

  if (isPending) {
    return <div className="text-center py-8">Loading...</div>
  }

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Authentication Required</CardTitle>
          <CardDescription>You need to be logged in to post a volunteer opportunity.</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={() => router.push("/login?redirect=/volunteer/create")}>Log In</Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Volunteer Opportunity Details</CardTitle>
        <CardDescription>Fill out the form below to post a new volunteer opportunity.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Opportunity Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Teaching Assistant for Rural School" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="organizationName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Rural Education Foundation" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="organizationDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Share a brief overview about the organization..." className="min-h-[120px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the volunteer opportunity, responsibilities, and impact..."
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Mumbai, Maharashtra" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="remote"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Remote Opportunity</FormLabel>
                    <FormDescription>Check this if volunteers can contribute remotely.</FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <div>
              <Label>Required Skills (Optional)</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {skillOptions.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    className={cn(
                      "rounded-full px-3 py-1 text-sm transition-colors",
                      selectedSkills.includes(skill)
                        ? "bg-orange-600 text-white"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200",
                    )}
                    onClick={() => handleSkillToggle(skill)}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            <FormField
              control={form.control}
              name="commitment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time Commitment</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 5 hours per week, One-time event" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date (Optional)</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End Date (Optional)</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="slots"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Volunteer Slots</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      {...field}
                      onChange={(event) => {
                        const parsedValue = Number.parseInt(event.target.value, 10)
                        field.onChange(Number.isNaN(parsedValue) ? 1 : parsedValue)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isCreating}>
              {isCreating ? "Creating..." : "Post Opportunity"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
