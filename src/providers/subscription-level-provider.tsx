"use client"

import { ReactNode, createContext, useContext } from "react"

import { type SubscriptionLevel } from "@/features/premium/data/get-user-subscription-level"

const SubscriptionLevelContext = createContext<SubscriptionLevel | undefined>(
  undefined,
)

interface SubscriptionLevelProviderProps {
  children: ReactNode
  userSubscriptionLevel: SubscriptionLevel
}

export function SubscriptionLevelProvider({
  children,
  userSubscriptionLevel,
}: SubscriptionLevelProviderProps) {
  return (
    <SubscriptionLevelContext.Provider value={userSubscriptionLevel}>
      {children}
    </SubscriptionLevelContext.Provider>
  )
}

export function useSubscriptionLevel() {
  const context = useContext(SubscriptionLevelContext)
  if (context === undefined) {
    throw new Error(
      "useSubscriptionLevel must be used within a SubscriptionLevelProvider",
    )
  }
  return context
}
