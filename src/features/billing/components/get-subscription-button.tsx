"use client"

import { Button } from "@/components/ui/button"

import { usePremiumModal } from "@/features/premium/hooks/use-premium-modal"

export function GetSubscriptionButton() {
  const premiumModal = usePremiumModal()

  return (
    <Button onClick={() => premiumModal.setOpen(true)} variant="premium">
      Get Premium subscription
    </Button>
  )
}
