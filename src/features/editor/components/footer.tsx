"use client"

import Link from "next/link"

import { FileUserIcon, Loader2, PenLineIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"

import { steps } from "@/features/editor/lib/steps"

interface FooterProps {
  currentStep: string
  setCurrentStep: (step: string) => void
  showSmResumePreview: boolean
  setShowSmResumePreview: (show: boolean) => void
  isSaving: boolean
}

export function Footer({
  currentStep,
  setCurrentStep,
  showSmResumePreview,
  setShowSmResumePreview,
  isSaving,
}: FooterProps) {
  const previousStep = steps.find(
    (_, index) => steps[index + 1]?.key === currentStep,
  )?.key

  const nextStep = steps.find(
    (_, index) => steps[index - 1]?.key === currentStep,
  )?.key

  return (
    <footer className="w-full border-t px-3 py-5">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            className="cursor-pointer"
            onClick={
              previousStep ? () => setCurrentStep(previousStep) : undefined
            }
            disabled={!previousStep}
          >
            Previous step
          </Button>
          <Button
            onClick={nextStep ? () => setCurrentStep(nextStep) : undefined}
            disabled={!nextStep}
            className="cursor-pointer"
          >
            Next step
          </Button>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowSmResumePreview(!showSmResumePreview)}
          className="md:hidden"
          title={
            showSmResumePreview ? "Show input form" : "Show resume preview"
          }
        >
          {showSmResumePreview ? <PenLineIcon /> : <FileUserIcon />}
        </Button>
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            className={cn(isSaving && "pointer-events-none")}
            asChild
            disabled={isSaving}
          >
            <Link href="/resumes">Close</Link>
          </Button>
          <p
            className={cn(
              "text-muted-foreground flex items-center gap-1 opacity-0",
              isSaving && "opacity-100",
            )}
          >
            {isSaving && <Loader2 className="size-5 animate-spin" />}
            Saving
          </p>
        </div>
      </div>
    </footer>
  )
}
