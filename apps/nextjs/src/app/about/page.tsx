import Image from "next/image"
import Link from "next/link"
import { Button } from "@barebel/ui/button"
import { Card, CardContent } from "@barebel/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@barebel/ui/avatar"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Arjun Mehta",
      role: "Founder & CEO",
      image: "/placeholder.svg?height=200&width=200&query=Indian man in business casual attire",
      bio: "Former social worker with 10+ years of experience in grassroots initiatives across rural India.",
    },
    {
      name: "Priya Sharma",
      role: "Head of Campaigns",
      image: "/placeholder.svg?height=200&width=200&query=Indian woman professional with glasses",
      bio: "Experienced nonprofit leader who has managed development projects in education and healthcare sectors.",
    },
    {
      name: "Vikram Singh",
      role: "Technology Director",
      image: "/placeholder.svg?height=200&width=200&query=Indian tech professional man",
      bio: "Tech entrepreneur who believes in using technology to solve social challenges at scale.",
    },
    {
      name: "Ananya Patel",
      role: "Community Manager",
      image: "/placeholder.svg?height=200&width=200&query=Young Indian woman smiling",
      bio: "Community organizer with a passion for connecting people and resources to create meaningful change.",
    },
  ]

  const partners = [
    {
      name: "Tata Trusts",
      logo: "/placeholder.svg?height=100&width=200&query=Tata Trusts logo",
    },
    {
      name: "Infosys Foundation",
      logo: "/placeholder.svg?height=100&width=200&query=Infosys Foundation logo",
    },
    {
      name: "Azim Premji Foundation",
      logo: "/placeholder.svg?height=100&width=200&query=Azim Premji Foundation logo",
    },
    {
      name: "NASSCOM Foundation",
      logo: "/placeholder.svg?height=100&width=200&query=NASSCOM Foundation logo",
    },
  ]

  return (
    <div className="container px-4 py-12 md:py-24">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Be A Rebel</h1>
          <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed">
            We're on a mission to revolutionize how social causes are funded and implemented across India.
          </p>
        </div>
      </div>

      <div className="grid gap-12 md:grid-cols-2 items-center mb-24">
        <div className="relative h-[400px] rounded-xl overflow-hidden">
          <Image
            src="/placeholder.svg?height=400&width=500&query=diverse group of Indian social entrepreneurs in meeting"
            alt="Be A Rebel team"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              Be A Rebel was born from a simple observation: while there's no shortage of compassion and willingness to
              help in India, traditional funding models often fall short in maximizing impact.
            </p>
            <p>
              Founded in 2021 by Arjun Mehta, a social worker with over a decade of experience in rural development, Be
              A Rebel aims to bridge the gap between those who want to help and those who need it—with a unique twist.
            </p>
            <p>
              What sets us apart is our focus on resourcefulness. We believe that the most effective solutions often
              come not just from more funding, but from creative thinking and community collaboration.
            </p>
            <p>
              Our platform doesn't just connect campaigns with donors—it creates a space where people can propose and
              discuss innovative, cost-effective solutions to maximize impact with minimal resources.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-24">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Our Mission & Values</h2>
          <p className="max-w-[700px] mx-auto text-gray-500 mt-2">
            The principles that guide everything we do at Be A Rebel.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="bg-orange-50 border-none">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Resourcefulness</h3>
              <p className="text-gray-600">
                We believe in maximizing impact with minimal resources through creative thinking and collaboration.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-green-50 border-none">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Community-Driven</h3>
              <p className="text-gray-600">
                We trust in the collective wisdom of communities to develop the most effective solutions to local
                challenges.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-purple-50 border-none">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Transparency</h3>
              <p className="text-gray-600">
                We're committed to full transparency in how funds are raised, allocated, and the impact they create.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-blue-50 border-none">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Inclusivity</h3>
              <p className="text-gray-600">
                We ensure our platform is accessible to all, regardless of background, ability, or technical expertise.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-yellow-50 border-none">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Empowerment</h3>
              <p className="text-gray-600">
                We focus on sustainable solutions that empower individuals and communities for long-term change.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-red-50 border-none">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-gray-600">
                We constantly seek new approaches to social challenges, leveraging technology and creative thinking.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-teal-50 border-none">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Verification</h3>
              <p className="text-gray-600">
                We believe in building trust through our decentralized verification system that ensures transparency and
                accountability in every campaign.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-amber-50 border-none">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Gamification</h3>
              <p className="text-gray-600">
                We reward active participation through our gamified system that recognizes and celebrates community
                contributions.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-24">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Our Team</h2>
          <p className="max-w-[700px] mx-auto text-gray-500 mt-2">Meet the passionate individuals behind Be A Rebel.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <div key={member.name} className="text-center">
              <Avatar className="h-32 w-32 mx-auto mb-4">
                <AvatarImage src={member.image || "/placeholder.svg"} alt={member.name} />
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h3 className="font-bold text-lg">{member.name}</h3>
              <p className="text-orange-600 mb-2">{member.role}</p>
              <p className="text-sm text-gray-500">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-24">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Our Partners</h2>
          <p className="max-w-[700px] mx-auto text-gray-500 mt-2">
            Organizations that support our mission and help us create impact.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {partners.map((partner) => (
            <div key={partner.name} className="flex flex-col items-center">
              <div className="h-24 w-48 relative mb-4">
                <Image src={partner.logo || "/placeholder.svg"} alt={partner.name} fill className="object-contain" />
              </div>
              <p className="font-medium">{partner.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-orange-50 p-8 rounded-xl">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Join Our Movement</h2>
          <p className="text-gray-600 mb-6 max-w-[700px] mx-auto">
            Whether you want to start a campaign, support a cause, or contribute your ideas, there's a place for you in
            our community of rebels.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/create">
              <Button className="bg-orange-600 hover:bg-orange-700">Start a Campaign</Button>
            </Link>
            <Link href="/campaigns">
              <Button variant="outline">Explore Campaigns</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline">Contact Us</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
