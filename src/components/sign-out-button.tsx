"use client"

import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"

interface SignOutButtonProps {
  children?: React.ReactNode
  className?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}

export function SignOutButton({ 
  children = "Sign Out", 
  className,
  variant = "outline",
  ...props 
}: SignOutButtonProps) {
  const handleSignOut = async () => {
    try {
      await signOut({
        callbackUrl: "/",
        redirect: true
      })
    } catch {
      // Sign out error handled silently in production
    }
  }

  return (
    <Button
      variant={variant}
      className={className}
      onClick={handleSignOut}
      {...props}
    >
      {children}
    </Button>
  )
}