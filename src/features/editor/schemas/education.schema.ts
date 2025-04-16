import { z } from "zod"

import { optionalString } from "@/lib/validation"

export const educationSchema = z.object({
  educations: z
    .array(
      z.object({
        degree: optionalString,
        school: optionalString,
        startDate: optionalString,
        endDate: optionalString,
        description: optionalString,
      }),
    )
    .optional(),
})

export type EducationValues = z.infer<typeof educationSchema>

export type Education = NonNullable<
  z.infer<typeof educationSchema>["educations"]
>[number]
