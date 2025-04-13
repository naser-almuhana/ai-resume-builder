import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "@/app/globals.css"
import { Providers } from "@/providers"
import { ClerkProvider } from "@clerk/nextjs"

import { APP_DESCRIPTION, APP_NAME, SERVER_URL } from "@/constants"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    template: `%s - ${APP_NAME}`,
    absolute: APP_NAME,
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(SERVER_URL),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}
