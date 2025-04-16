"use client"

import { useState } from "react"

import { type ResumeValues } from "@/schemas/resume-values.schema"
import { WandSparklesIcon } from "lucide-react"
import { toast } from "sonner"

import { LoadingButton } from "@/components/shared/loading-button"

import { generateSummary } from "@/features/editor/actions/generate-summary.action"

interface GenerateSummaryButtonProps {
  resumeData: ResumeValues
  onSummaryGenerated: (summary: string) => void
}

export function GenerateSummaryButton({
  resumeData,
  onSummaryGenerated,
}: GenerateSummaryButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    try {
      setLoading(true)
      const aiResponse = await generateSummary(resumeData)
      onSummaryGenerated(aiResponse)
    } catch (error) {
      console.error("GenerateSummaryButton", error)
      toast.error("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <LoadingButton
      variant="outline"
      type="button"
      loading={loading}
      onClick={handleClick}
    >
      <WandSparklesIcon className="size-4" />
      Generate (AI)
    </LoadingButton>
  )
}
