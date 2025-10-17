import Image from "next/image"
import { Card, CardContent } from "@barebel/ui/card"
import { QuoteIcon } from "lucide-react"

export default function TestimonialSection() {
  const testimonials = [
    {
      quote:
        "Be A Rebel helped us raise funds for our rural education project in just 3 weeks. The community solutions were even more valuable than the money!",
      author: "Priya Sharma",
      role: "Founder, Rural Education Initiative",
      avatar: "/compassionate-community-builder.png",
    },
    {
      quote:
        "The platform's focus on resourcefulness helped us implement our water conservation project at half the originally estimated cost.",
      author: "Rajesh Kumar",
      role: "Environmental Activist",
      avatar: "/indian-activist-protest.png",
    },
    {
      quote:
        "The gamified verification system makes contributing so engaging! I love earning badges while helping verify campaigns and propose solutions.",
      author: "Ananya Patel",
      role: "Regular Contributor",
      avatar: "/confident-indian-professional.png",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 bg-orange-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Community Says</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Hear from the changemakers and supporters who are part of our movement.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-lg bg-white overflow-hidden">
              <CardContent className="p-6 pt-10 relative">
                <QuoteIcon className="absolute top-6 left-6 h-8 w-8 text-orange-200" />
                <p className="text-gray-600 mb-6 relative z-10">{testimonial.quote}</p>
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
