import { z } from "zod"

import { educationSchema } from "./education.schema"
import { generalInfoSchema } from "./general-info.schema"
import { personalInfoSchema } from "./personal-info.schema"
import { skillsSchema } from "./skills.schema"
import { summarySchema } from "./summary.schema"
import { workExperienceSchema } from "./work-experience.schema"

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
