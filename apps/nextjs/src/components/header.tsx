"use client"

import Link from "next/link"
import { Button } from "@barebel/ui/button"
import { Input } from "@barebel/ui/input"
import { Search, Menu, X } from "lucide-react"
// Add useEffect import
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import Logo from "./logo"
import { UserNav } from "./user-nav"
import { motion, AnimatePresence } from "framer-motion"

// Replace the Header component with this updated version that includes scroll detection
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const pathname = usePathname()

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [scrolled])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Campaigns", href: "/campaigns" },
    { name: "Volunteer", href: "/volunteer" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "About Us", href: "/about" },
  ]

  return (
    <header className={`sticky z-50 w-full transition-all duration-300 ${scrolled ? "top-4" : "top-0"}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`mx-auto max-w-7xl bg-gradient-to-r from-orange-600 to-orange-500 rounded-full px-4 sm:px-6 my-2 shadow-md flex h-14 items-center justify-between transition-all duration-300 ${scrolled ? "shadow-lg" : ""}`}
        >
          <div className="flex items-center gap-2">
            <Logo className="text-white" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-white relative group",
                  pathname === item.href ? "text-white" : "text-white/80",
                )}
              >
                {item.name}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full ${pathname === item.href ? "w-full" : ""}`}
                ></span>
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <div className={`relative w-full max-w-sm transition-all duration-300 ${searchFocused ? "scale-105" : ""}`}>
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search campaigns..."
                className="w-full bg-background pl-8 md:w-[200px] lg:w-[300px] focus:ring-2 focus:ring-orange-500 transition-all"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
            </div>
            <UserNav />
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden mt-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-7xl bg-gradient-to-r from-orange-600 to-orange-500 rounded-xl px-4 py-4 shadow-md">
                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-white py-2 border-b border-orange-400/30",
                        pathname === item.href ? "text-white" : "text-white/80",
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="relative w-full pt-2">
                    <Search className="absolute left-2.5 top-4.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search campaigns..." className="w-full bg-background pl-8" />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Link href="/login" className="w-full">
                      <Button
                        variant="outline"
                        className="w-full bg-white text-orange-600 hover:bg-orange-50"
                        size="sm"
                      >
                        Log in
                      </Button>
                    </Link>
                    <Link href="/signup" className="w-full">
                      <Button className="w-full bg-white text-orange-600 hover:bg-orange-50" size="sm">
                        Sign up
                      </Button>
                    </Link>
                  </div>
                </nav>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
