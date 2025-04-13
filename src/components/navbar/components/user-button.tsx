"use client"

import { UserButton as ClerkUserButton } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import { CreditCardIcon } from "lucide-react"
import { useTheme } from "next-themes"

export function UserButton() {
  const { theme } = useTheme()
  return (
    <ClerkUserButton
      appearance={{
        baseTheme: theme === "dark" ? dark : undefined,
        elements: {
          avatarBox: {
            width: 35,
            height: 35,
          },
        },
      }}
    >
      <ClerkUserButton.MenuItems>
        <ClerkUserButton.Link
          label="Billing"
          labelIcon={<CreditCardIcon className="size-4" />}
          href="/billing"
        />
      </ClerkUserButton.MenuItems>
    </ClerkUserButton>
  )
}
