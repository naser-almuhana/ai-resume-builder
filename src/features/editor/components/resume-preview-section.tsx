import { ResumeValues } from "@/schemas/resume-values.schema"

import { ResumeFormProps } from "@/lib/types"
import { cn } from "@/lib/utils"

import { ResumePreview } from "@/components/shared/resume-preview"

interface ResumePreviewSectionProps extends ResumeFormProps {
  className?: string
}

export function ResumePreviewSection({
  resumeData,
  setResumeData,
  className,
}: ResumePreviewSectionProps) {
  return (
    <div
      className={cn("group relative hidden w-full md:flex md:w-1/2", className)}
    >
      <div className="bg-secondary flex w-full justify-center overflow-y-auto p-3">
        <ResumePreview
          resumeData={resumeData}
          className="max-w-2xl shadow-md"
        />
      </div>
    </div>
  )
}
