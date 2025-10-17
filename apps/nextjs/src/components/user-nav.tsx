"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@barebel/ui/avatar"
import { Button } from "@barebel/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@barebel/ui/dropdown-menu"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signOut, useSession } from "~/auth/client"

export function UserNav() {
  const { data: session } = useSession()
  const router = useRouter()

  const handleLogout = async () => {
    await signOut()
    router.push("/")
    router.refresh()
  }

  const user = session?.user

  if (!user) {
    return (
      <div className="flex items-center gap-4">
        <Link href="/login">
          <Button variant="ghost" size="sm" className="text-white">
            Log in
          </Button>
        </Link>
        <Link href="/signup">
          <Button size="sm" className="bg-white text-orange-600 hover:bg-orange-50">
            Sign up
          </Button>
        </Link>
      </div>
    )
  }

  const fallbackName = typeof user.email === "string" && user.email.trim().length > 0 ? user.email : "User"
  const displayName = typeof user.name === "string" && user.name.trim().length > 0 ? user.name : fallbackName
  const email = typeof user.email === "string" ? user.email : ""
  const avatarImage = typeof user.image === "string" ? user.image : ""
  const avatarInitial = displayName.charAt(0).toUpperCase()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatarImage} alt={displayName} />
            <AvatarFallback>{avatarInitial}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{displayName}</p>
            <p className="text-xs leading-none text-muted-foreground">{email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard">Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/campaigns/create">Create Campaign</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings">Settings</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
