"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@barebel/ui/button"
import { Input } from "@barebel/ui/input"
import { Label } from "@barebel/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@barebel/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@barebel/ui/avatar"
import { useRouter } from "next/navigation"
import { signOut, useSession } from "~/auth/client"
import { api } from "~/trpc/react"

interface SessionUser {
  id?: string | null
  name?: string | null
  email?: string | null
  image?: string | null
}

export default function ProfilePage() {
  const { data: session, isPending } = useSession()
  const sessionUser = session?.user as SessionUser | undefined
  const router = useRouter()
  const utils = api.useUtils()
  const { data: profile, isLoading } = api.users.getProfile.useQuery(undefined, {
    enabled: Boolean(sessionUser),
  })

  const [name, setName] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)

  const updateProfile = api.users.updateProfile.useMutation({
    onSuccess: () => {
      // Refetch profile data
      void utils.users.getProfile.invalidate()
    },
  })

  useEffect(() => {
    const nextName = profile?.name ?? sessionUser?.name ?? ""
    if (nextName) {
      setName(nextName)
    }
  }, [profile?.name, sessionUser?.name])

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsUpdating(true)

    try {
      await updateProfile.mutateAsync({ name })
    } finally {
      setIsUpdating(false)
    }
  }

  useEffect(() => {
    if (!isPending && !sessionUser) {
      router.replace("/login")
    }
  }, [isPending, sessionUser, router])

  const handleLogout = async () => {
    await signOut()
    router.push("/")
    router.refresh()
  }

  if (isPending || isLoading) {
    return <div className="container py-12 text-center">Loading profile...</div>
  }

  if (!sessionUser) return null

  const resolvedProfileName = profile?.name ?? sessionUser.name ?? "User"
  const displayName = name.trim().length > 0 ? name : resolvedProfileName
  const email = profile?.email ?? sessionUser.email ?? ""
  const avatarImage = profile?.image ?? sessionUser.image ?? undefined

  return (
    <div className="container py-12">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
            <CardDescription>Manage your account settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={avatarImage ?? ""} alt={displayName} />
                <AvatarFallback>{displayName.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-medium">{displayName}</h3>
                <p className="text-sm text-gray-500">{email}</p>
              </div>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Display Name</Label>
                <Input
                  id="name"
                  placeholder={profile?.name ?? sessionUser.name ?? "Your name"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <Button type="submit" className="bg-orange-600 hover:bg-orange-700" disabled={isUpdating}>
                {isUpdating ? "Updating..." : "Update Profile"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleLogout}>
              Sign Out
            </Button>
            <Button variant="destructive">Delete Account</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
