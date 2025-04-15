"use client"

import { useSearchParams } from "next/navigation"
import { useState } from "react"

import { type ResumeValues } from "@/schemas/resume-values.schema"

import { ResumeServerData } from "@/lib/types"
import { cn, mapToResumeValues } from "@/lib/utils"

import { useUnloadWarning } from "@/hooks/use-unload-warning"

import { Separator } from "@/components/ui/separator"

import { Breadcrumbs } from "@/features/editor/components/breadcrumbs"
import { Footer } from "@/features/editor/components/footer"
import { ResumePreviewSection } from "@/features/editor/components/resume-preview-section"
import { UseAutoSaveResume } from "@/features/editor/hooks/use-auto-save-resume"
import { steps } from "@/features/editor/lib/steps"

interface ResumeEditorProps {
  resumeToEdit: ResumeServerData | null
}

export function ResumeEditor({ resumeToEdit }: ResumeEditorProps) {
  const searchParams = useSearchParams()

  const [resumeData, setResumeData] = useState<ResumeValues>(
    resumeToEdit ? mapToResumeValues(resumeToEdit) : {},
  )
  const [showSmResumePreview, setShowSmResumePreview] = useState(false)

  const { isSaving, hasUnsavedChanges } = UseAutoSaveResume(resumeData)
  useUnloadWarning(hasUnsavedChanges)

  const currentStep = searchParams.get("step") || steps[0].key
  const setStep = (key: string) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set("step", key)
    // using this instated of router bc router sent a request to server but this push immediately
    window.history.pushState(null, "", `?${newSearchParams.toString()}`)
  }

  const FormComponent = steps.find(
    (step) => step.key === currentStep,
  )?.component

  return (
    <>
      <main className="relative grow">
        <div className="absolute top-0 bottom-0 flex w-full">
          <div
            className={cn(
              "w-full space-y-6 overflow-y-auto p-3 md:block md:w-1/2",
              showSmResumePreview && "hidden",
            )}
          >
            <Breadcrumbs currentStep={currentStep} setCurrentStep={setStep} />
            {FormComponent && (
              <FormComponent
                resumeData={resumeData}
                setResumeData={setResumeData}
              />
            )}
          </div>
          <Separator orientation="vertical" className="max-md:hidden" />
          <ResumePreviewSection
            resumeData={resumeData}
            setResumeData={setResumeData}
            className={cn(showSmResumePreview && "flex")}
          />
        </div>
      </main>
      <Footer
        currentStep={currentStep}
        setCurrentStep={setStep}
        showSmResumePreview={showSmResumePreview}
        setShowSmResumePreview={setShowSmResumePreview}
        isSaving={isSaving}
      />
    </>
  )
}
