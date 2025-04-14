import { z } from "zod"

import { educationSchema } from "@/features/editor/schemas/education.schema"
import { generalInfoSchema } from "@/features/editor/schemas/general-info.schema"
import { personalInfoSchema } from "@/features/editor/schemas/personal-info.schema"
import { skillsSchema } from "@/features/editor/schemas/skills.schema"
import { summarySchema } from "@/features/editor/schemas/summary.schema"
import { workExperienceSchema } from "@/features/editor/schemas/work-experience.schema"

export const resumeSchema = z.object({
  ...generalInfoSchema.shape,
  ...personalInfoSchema.shape,
  ...workExperienceSchema.shape,
  ...educationSchema.shape,
  ...skillsSchema.shape,
  ...summarySchema.shape,
})

export type ResumeValues = Omit<z.infer<typeof resumeSchema>, "photo"> & {
  id?: string
  photo?: File | string | null
}
