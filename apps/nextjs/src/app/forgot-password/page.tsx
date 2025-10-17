"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@barebel/ui/button"
import { Input } from "@barebel/ui/input"
import { Label } from "@barebel/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@barebel/ui/card"
import Link from "next/link"
import Logo from "@/components/logo"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    if (!email.trim()) {
      setError("Please provide an email address.")
      return
    }

    // TODO: wire up Better Auth password reset once available.
    setSuccess(true)
  }

  return (
    <div className="container flex items-center justify-center min-h-[80vh] py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <CardTitle className="text-2xl">Reset your password</CardTitle>
          <CardDescription>Enter your email to receive a password reset link</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {success ? (
            <div className="p-4 bg-green-50 text-green-700 rounded-md">
              <p>Password reset email sent! Check your inbox for further instructions.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
                Send Reset Link
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="text-center">
          <p className="text-sm text-muted-foreground">
            Remember your password?{" "}
            <Link href="/login" className="text-orange-600 hover:underline">
              Back to login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
