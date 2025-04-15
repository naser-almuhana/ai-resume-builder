import { ResumeFormProps } from "@/lib/types"
import { cn } from "@/lib/utils"

import { ResumePreview } from "@/components/shared/resume-preview"

import { BorderStyleButton } from "./border-style-button"
import { ColorPicker } from "./color-picker"

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
      <div className="absolute top-1 left-1 flex flex-none flex-col gap-3 opacity-50 transition-opacity group-hover:opacity-100 2xl:top-3 2xl:left-3 2xl:opacity-100 dark:opacity-75 group-hover:dark:opacity-100">
        <ColorPicker
          color={resumeData.colorHex}
          onChange={(color) =>
            setResumeData({ ...resumeData, colorHex: color.hex })
          }
        />
        <BorderStyleButton
          borderStyle={resumeData.borderStyle}
          onChange={(borderStyle) =>
            setResumeData({ ...resumeData, borderStyle })
          }
        />
      </div>
      <div className="bg-secondary flex w-full justify-center overflow-y-auto p-3">
        <ResumePreview
          resumeData={resumeData}
          className="max-w-2xl shadow-md"
        />
      </div>
    </div>
  )
}
