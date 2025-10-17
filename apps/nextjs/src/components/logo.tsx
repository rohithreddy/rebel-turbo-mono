"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <motion.span
        className="text-xl font-bold"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        Be a{" "}
        <span className="text-white font-extrabold relative">
          REBEL
          <span className="absolute inset-0 blur-[2px] text-orange-200 z-[-1]">REBEL</span>
          <span className="absolute inset-0 blur-[4px] text-orange-300 z-[-2]">REBEL</span>
        </span>{" "}
        <span className="animate-pulse">🔥</span>
      </motion.span>
    </Link>
  )
}
