import { z } from "zod"

import { optionalString } from "@/lib/validation"

export const generalInfoSchema = z.object({
  title: optionalString,
  description: optionalString,
})

export type GeneralInfoValues = z.infer<typeof generalInfoSchema>
