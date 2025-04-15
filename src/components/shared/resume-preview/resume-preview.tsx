import { useRef } from "react"

import { ResumeValues } from "@/schemas/resume-values.schema"

import { cn } from "@/lib/utils"

import { useDimensions } from "@/hooks/use-dimensions"

import { EducationSection } from "./components/educations-section"
import { PersonalInfoSection } from "./components/personal-info-section"
import { SkillsSection } from "./components/skills-section"
import { SummarySection } from "./components/summary-section"
import { WorkExperienceSection } from "./components/work-experience-section"

interface ResumePreviewProps {
  resumeData: ResumeValues
  contentRef?: React.Ref<HTMLDivElement>
  className?: string
}

export function ResumePreview({
  resumeData,
  className,
  contentRef,
}: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { width } = useDimensions(containerRef)

  return (
    <div
      className={cn(
        "aspect-[210/297] h-fit w-full bg-white text-black", //210/297 for A4
        className,
      )}
      ref={containerRef}
    >
      <div
        className={cn("space-y-6 p-6", !width && "invisible")}
        style={{
          zoom: (1 / 794) * width, // Dynamically scale content to match A4 width (794px = 210mm) based on container width
        }}
        ref={contentRef}
        id="resumePreviewContent"
      >
        <PersonalInfoSection resumeData={resumeData} />
        <SummarySection resumeData={resumeData} />
        <WorkExperienceSection resumeData={resumeData} />
        <EducationSection resumeData={resumeData} />
        <SkillsSection resumeData={resumeData} />
      </div>
    </div>
  )
}
