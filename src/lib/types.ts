import { ResumeValues } from "@/schemas/resume-values.schema"

import { Prisma } from "./_generated/prisma"

export interface ResumeSectionProps {
  resumeData: ResumeValues
}

export interface ResumeFormProps {
  resumeData: ResumeValues
  setResumeData: (data: ResumeValues) => void
}

export const resumeDataInclude = {
  workExperiences: true,
  educations: true,
} satisfies Prisma.ResumeInclude

export type ResumeServerData = Prisma.ResumeGetPayload<{
  include: typeof resumeDataInclude
}>
