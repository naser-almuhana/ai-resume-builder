import { ResumeValues } from "@/features/editor/schemas/resume-values.schema"

export interface EditorFormProps {
  resumeData: ResumeValues
  setResumeData: (data: ResumeValues) => void
}
