import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "@/app/globals.css"
import { Providers } from "@/providers"

import { APP_DESCRIPTION, APP_NAME } from "@/constants"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    template: `%s - ${APP_NAME}`,
    absolute: APP_NAME,
  },
  description: APP_DESCRIPTION,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
