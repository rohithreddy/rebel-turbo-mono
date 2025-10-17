import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import { Button } from "@barebel/ui/button"
import { Input } from "@barebel/ui/input"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="container px-4 py-12 md:py-16">
        {/* Newsletter Section */}
        <div className="max-w-3xl mx-auto mb-12 bg-gray-800 rounded-xl p-6 md:p-8">
          <h3 className="text-xl font-bold mb-2 text-white">Join Our Newsletter</h3>
          <p className="text-gray-400 mb-4">
            Stay updated with the latest campaigns and impact stories from across India.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              type="email"
              placeholder="Your email address"
              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-orange-500"
            />
            <Button className="bg-orange-600 hover:bg-orange-700">Subscribe</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Be A Rebel</h3>
            <p className="text-gray-400 mb-4">
              Empowering social change through collaborative solutions and resourceful funding.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/campaigns" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Browse Campaigns
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-gray-400 hover:text-orange-500 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/success-stories" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link href="/create" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Start a Campaign
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-orange-500 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/guidelines" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Community Guidelines
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Be A Rebel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
