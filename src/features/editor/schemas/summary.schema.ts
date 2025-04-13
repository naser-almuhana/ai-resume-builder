import { z } from "zod"

import { optionalString } from "@/lib/validation"

export const summarySchema = z.object({
  summary: optionalString,
})

export type SummaryValues = z.infer<typeof summarySchema>
