"use client"

import { useSubscriptionLevel } from "@/providers/subscription-level-provider"
import { CircleIcon, SquareIcon, SquircleIcon } from "lucide-react"

import { BORDER_STYLES } from "@/constants"

import { Button } from "@/components/ui/button"

import { usePremiumModal } from "@/features/premium/hooks/use-premium-modal"
import { canUseCustomizations } from "@/features/premium/lib/permissions"

const borderStyles = Object.values(BORDER_STYLES)

interface BorderStyleButtonProps {
  borderStyle: string | undefined
  onChange: (borderStyle: string) => void
}

export function BorderStyleButton({
  borderStyle,
  onChange,
}: BorderStyleButtonProps) {
  const premiumModal = usePremiumModal()
  const subscriptionLevel = useSubscriptionLevel()

  function handleClick() {
    if (!canUseCustomizations(subscriptionLevel)) {
      premiumModal.setOpen(true)
      return
    }

    const currentIndex = borderStyle ? borderStyles.indexOf(borderStyle) : 0
    // Get the next index in the borderStyles array, wrapping around to 0 if at the end (used for cycling styles)
    const nextIndex = (currentIndex + 1) % borderStyles.length
    onChange(borderStyles[nextIndex])
  }

  const Icon =
    borderStyle === "square"
      ? SquareIcon
      : borderStyle === "circle"
        ? CircleIcon
        : SquircleIcon

  return (
    <Button
      variant="outline"
      size="icon"
      title="Change border style"
      className="max-2xl:dark:bg-muted max-2xl:dark:hover:bg-muted/80"
      onClick={handleClick}
    >
      <Icon className="size-5" />
    </Button>
  )
}
