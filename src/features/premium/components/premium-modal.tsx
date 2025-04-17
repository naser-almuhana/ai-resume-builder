"use client"

import { useTransition } from "react"

import { CheckIcon } from "lucide-react"
import { toast } from "sonner"

import { env } from "@/lib/env"

import { AppResponsiveModal } from "@/components/shared/app-responsive-modal"
import { Button } from "@/components/ui/button"

import { createCheckoutSession } from "@/features/premium/actions/create-checkout-session.action"
import { usePremiumModal } from "@/features/premium/hooks/use-premium-modal"

const premiumFeatures = ["AI tools", "Up to 3 resumes"]
const premiumPlusFeatures = ["Infinite resumes", "Design customizations"]

export function PremiumModal() {
  const { open, setOpen } = usePremiumModal()

  const [isPending, startTransition] = useTransition()

  function handlePremiumClick(priceId: string) {
    startTransition(async () => {
      try {
        const redirectUrl = await createCheckoutSession(priceId)
        window.location.href = redirectUrl
      } catch (error) {
        console.error(error)
        toast.error("Something went wrong. Please try again.")
      }
    })
  }
  return (
    <AppResponsiveModal
      open={open}
      title="Resume Builder AI Premium"
      onOpenChange={(open) => {
        if (!isPending) {
          setOpen(open)
        }
      }}
    >
      <div className="space-y-6">
        <p>Get a premium subscription to unlock more features.</p>
        <div className="flex">
          {/* Left */}
          <div className="flex w-1/2 flex-col space-y-5">
            <h3 className="text-center text-lg font-bold">Premium</h3>
            <ul className="list-inside space-y-2">
              {premiumFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <CheckIcon className="size-4 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              onClick={() =>
                handlePremiumClick(env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY)
              }
              disabled={isPending}
            >
              Get Premium
            </Button>
          </div>

          <div className="bg-border mx-6 w-[1px]" />
          {/* Right */}
          <div className="flex w-1/2 flex-col space-y-5">
            <h3 className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-center text-lg font-bold text-transparent">
              Premium Plus
            </h3>
            <ul className="list-inside space-y-2">
              {premiumPlusFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <CheckIcon className="size-4 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              variant="premium"
              onClick={() =>
                handlePremiumClick(
                  env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_PLUS_MONTHLY,
                )
              }
              disabled={isPending}
            >
              Get Premium Plus
            </Button>
          </div>
        </div>
      </div>
    </AppResponsiveModal>
  )
}
