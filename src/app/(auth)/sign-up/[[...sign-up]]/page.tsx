"use client"

import { SignUp } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import { useTheme } from "next-themes"

export default function SignUpPage() {
  const { theme } = useTheme()
  return (
    <main className="flex h-screen items-center justify-center p-3">
      <SignUp
        appearance={{
          baseTheme: theme === "dark" ? dark : undefined,
        }}
      />
    </main>
  )
}
