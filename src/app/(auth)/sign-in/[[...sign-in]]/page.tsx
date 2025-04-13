"use client"

import { SignIn } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import { useTheme } from "next-themes"

export default function SignInPage() {
  const { theme } = useTheme()
  return (
    <main className="flex h-screen items-center justify-center p-3">
      <SignIn
        appearance={{
          baseTheme: theme === "dark" ? dark : undefined,
        }}
      />
    </main>
  )
}
