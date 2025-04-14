import { ResumeValues } from "@/schemas/resume-values.schema"

export interface ResumeSectionProps {
  resumeData: ResumeValues
}

export interface ResumeFormProps {
  resumeData: ResumeValues
  setResumeData: (data: ResumeValues) => void
}
