import { z } from "zod"

export const generateEducationSchema = z.object({
  description: z
    .string()
    .trim()
    .min(1, "Required")
    .min(20, "Must be at least 20 characters"),
})

export type GenerateEducationInput = z.infer<typeof generateEducationSchema>
