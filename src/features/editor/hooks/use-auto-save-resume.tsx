"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

import { type ResumeValues } from "@/schemas/resume-values.schema"
import { toast } from "sonner"

import { fileReplacer } from "@/lib/utils"

import { useDebounce } from "@/hooks/use-debounce"

import { saveResume } from "@/features/editor/actions/save-resume.action"

export function UseAutoSaveResume(resumeData: ResumeValues) {
  const searchParams = useSearchParams()

  const debouncedResumeData = useDebounce(resumeData, 1500)

  const [resumeId, setResumeId] = useState(resumeData.id)
  const [isSaving, setIsSaving] = useState(false)
  const [isError, setIsError] = useState(false)
  const [lastSavedData, setLastSavedData] = useState(
    structuredClone(debouncedResumeData),
  )

  useEffect(() => {
    setIsError(false)
  }, [debouncedResumeData])

  useEffect(() => {
    const save = async () => {
      try {
        setIsSaving(true)
        setIsError(false)

        const newData = structuredClone(debouncedResumeData)

        const updatedResume = await saveResume({
          ...newData,
          ...(JSON.stringify(lastSavedData.photo, fileReplacer) ===
            JSON.stringify(newData.photo, fileReplacer) && {
            photo: undefined,
          }),
          id: resumeId,
        })

        setResumeId(updatedResume?.id)
        setLastSavedData(newData)

        if (searchParams.get("resumeId") !== updatedResume?.id) {
          const newSearchParams = new URLSearchParams(searchParams)

          newSearchParams.set("resumeId", updatedResume.id.toString())

          window.history.replaceState(
            null,
            "",
            `?${newSearchParams.toString()}`,
          )
        }
      } catch (error) {
        setIsError(true)
        console.error("SAVE_RESUME_ACTION", error)
        toast.error("Could not save changes.", {
          action: {
            label: "Retry",
            onClick: save,
          },
        })
      } finally {
        setIsSaving(false)
      }
    }

    const hasUnsavedChanges =
      JSON.stringify(debouncedResumeData, fileReplacer) !==
      JSON.stringify(lastSavedData, fileReplacer)

    if (hasUnsavedChanges && debouncedResumeData && !isSaving && !isError) {
      save()
    }
  }, [
    debouncedResumeData,
    isSaving,
    lastSavedData,
    resumeId,
    searchParams,
    isError,
  ])

  return {
    isSaving,
    hasUnsavedChanges:
      JSON.stringify(resumeData) !== JSON.stringify(lastSavedData),
  }
}
