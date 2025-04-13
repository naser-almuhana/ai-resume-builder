"use client"

import { useSearchParams } from "next/navigation"
import { useState } from "react"

import { Separator } from "@/components/ui/separator"

import { Breadcrumbs } from "@/features/editor/components/breadcrumbs"
import { Footer } from "@/features/editor/components/footer"
import { steps } from "@/features/editor/lib/steps"
import { type ResumeValues } from "@/features/editor/schemas/resume-values.schema"

export function ResumeEditor() {
  const searchParams = useSearchParams()

  const [resumeData, setResumeData] = useState<ResumeValues>({})

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
          <div className="w-full space-y-6 overflow-y-auto p-3 md:w-1/2">
            <Breadcrumbs currentStep={currentStep} setCurrentStep={setStep} />
            {FormComponent && (
              <FormComponent
                resumeData={resumeData}
                setResumeData={setResumeData}
              />
            )}
          </div>
          <Separator orientation="vertical" className="mr-2 max-md:hidden" />
          <div className="hidden w-1/2 md:flex">
            {JSON.stringify(resumeData, null, 2)}
          </div>
        </div>
      </main>
      <Footer currentStep={currentStep} setCurrentStep={setStep} />
    </>
  )
}
