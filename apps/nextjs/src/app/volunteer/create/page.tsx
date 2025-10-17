import { CreateVolunteerForm } from "@/components/create-volunteer-form"

export default function CreateVolunteerPage() {
  return (
    <div className="container px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Post a Volunteer Opportunity</h1>
          <p className="mt-4 text-gray-500 md:text-xl/relaxed">Connect with passionate volunteers who want to support your cause.</p>
        </div>
        <CreateVolunteerForm />
      </div>
    </div>
  )
}
