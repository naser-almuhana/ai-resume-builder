"use client"

import { useTransition } from "react"

import { useSubscriptionLevel } from "@/providers/subscription-level-provider"
import { type ResumeValues } from "@/schemas/resume-values.schema"
import { WandSparklesIcon } from "lucide-react"
import { toast } from "sonner"

import { LoadingButton } from "@/components/shared/loading-button"

import { generateSummary } from "@/features/editor/actions/generate-summary.action"
import { usePremiumModal } from "@/features/premium/hooks/use-premium-modal"
import { canUseAITools } from "@/features/premium/lib/permissions"

interface GenerateSummaryButtonProps {
  resumeData: ResumeValues
  onSummaryGenerated: (summary: string) => void
}

export function GenerateSummaryButton({
  resumeData,
  onSummaryGenerated,
}: GenerateSummaryButtonProps) {
  const [isPending, startTransition] = useTransition()
  const premiumModal = usePremiumModal()
  const subscriptionLevel = useSubscriptionLevel()

  const handleClick = () => {
    if (!canUseAITools(subscriptionLevel)) {
      premiumModal.setOpen(true)
      return
    }
    startTransition(async () => {
      try {
        const aiResponse = await generateSummary(resumeData)
        onSummaryGenerated(aiResponse)
      } catch (error) {
        console.error("GenerateSummaryButton", error)
        toast.error("Something went wrong. Please try again.")
      }
    })
  }
  return (
    <LoadingButton
      variant="outline"
      type="button"
      loading={isPending}
      onClick={handleClick}
    >
      <WandSparklesIcon className="size-4" />
      {isPending ? "Generating..." : "Generate (AI)"}
    </LoadingButton>
  )
}
