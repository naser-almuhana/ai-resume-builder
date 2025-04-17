"use server"

import { auth } from "@clerk/nextjs/server"

import openai from "@/lib/openai"

import { type Education } from "@/features/editor/schemas/education.schema"
import {
  type GenerateEducationInput,
  generateEducationSchema,
} from "@/features/editor/schemas/generate-education.schema"
import { getUserSubscriptionLevel } from "@/features/premium/data/get-user-subscription-level"
import { canUseAITools } from "@/features/premium/lib/permissions"

export async function generateEducation(input: GenerateEducationInput) {
  const { userId } = await auth()
  if (!userId) throw new Error("Unauthorized")

  const subscriptionLevel = await getUserSubscriptionLevel(userId)
  if (!canUseAITools(subscriptionLevel))
    throw new Error("Upgrade your subscription to use this feature")

  const { description } = generateEducationSchema.parse(input)

  const systemMessage = `
  You are a job resume generator AI. Your task is to generate a single eduction entry based on the user input.
  Your response must adhere to the following structure. You can omit fields if they can't be inferred from the provided data, but don't add any new ones.

  Degree: <Degree>
  School: <school>
  Start date: <format: YYYY-MM-DD> (only if provided)
  End date: <format: YYYY-MM-DD> (only if provided)
  Description: <an optimized description in bullet format, might be inferred from the Degree>
  `

  const userMessage = `
  Please provide a eduction entry from this description:
  ${description}

  and if i give you the date of graduated you can cal and sit the start date based if university or high school
  `

  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: systemMessage },
      { role: "user", content: userMessage },
    ],
    model: "gpt-4.1-mini",
  })

  const aiResponse = completion.choices[0].message.content

  if (!aiResponse) throw new Error("Failed to generate AI response")

  return {
    degree: aiResponse.match(/Degree: (.*)/)?.[1] || "",
    school: aiResponse.match(/School: (.*)/)?.[1] || "",
    description: (aiResponse.match(/Description:([\s\S]*)/)?.[1] || "").trim(),
    startDate: aiResponse.match(/Start date: (\d{4}-\d{2}-\d{2})/)?.[1],
    endDate: aiResponse.match(/End date: (\d{4}-\d{2}-\d{2})/)?.[1],
  } satisfies Education
}
