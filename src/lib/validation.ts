import { z } from "zod"

export const optionalString = z.string().trim().optional().or(z.literal(""))
