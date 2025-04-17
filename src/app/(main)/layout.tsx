import { SubscriptionLevelProvider } from "@/providers/subscription-level-provider"
import { auth } from "@clerk/nextjs/server"

import { Navbar } from "@/components/navbar"

import { PremiumModal } from "@/features/premium/components/premium-modal"
import { getUserSubscriptionLevel } from "@/features/premium/data/get-user-subscription-level"

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { userId } = await auth()

  if (!userId) return null

  const userSubscriptionLevel = await getUserSubscriptionLevel(userId)
  return (
    <SubscriptionLevelProvider userSubscriptionLevel={userSubscriptionLevel}>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        {children}
        <PremiumModal />
      </div>
    </SubscriptionLevelProvider>
  )
}
