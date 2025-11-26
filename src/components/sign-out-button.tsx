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
    } catch (error) {
      console.error("Sign out error:", error)
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