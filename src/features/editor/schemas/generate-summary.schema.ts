import { z } from "zod"

import { optionalString } from "@/lib/validation"

import { educationSchema } from "./education.schema"
import { skillsSchema } from "./skills.schema"
import { workExperienceSchema } from "./work-experience.schema"

export const generateSummarySchema = z.object({
  jobTitle: optionalString,
  ...workExperienceSchema.shape,
  ...educationSchema.shape,
  ...skillsSchema.shape,
})

export type GenerateSummaryInput = z.infer<typeof generateSummarySchema>
