import { z } from "zod"

export const skillsSchema = z.object({
  skills: z.array(z.string().trim()).optional(),
})

export type SkillsValues = z.infer<typeof skillsSchema>
