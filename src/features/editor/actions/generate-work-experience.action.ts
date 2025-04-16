"use server"

import { auth } from "@clerk/nextjs/server"

import openai from "@/lib/openai"

import {
  type GenerateWorkExperienceInput,
  generateWorkExperienceSchema,
} from "@/features/editor/schemas/generate-work-experience.schema"
import { type WorkExperience } from "@/features/editor/schemas/work-experience.schema"

export async function generateWorkExperience(
  input: GenerateWorkExperienceInput,
) {
  const { userId } = await auth()
  if (!userId) throw new Error("Unauthorized")

  const { description } = generateWorkExperienceSchema.parse(input)

  const systemMessage = `
  You are a job resume generator AI. Your task is to generate a single work experience entry based on the user input.
  Your response must adhere to the following structure. You can omit fields if they can't be inferred from the provided data, but don't add any new ones.

  Job title: <job title>
  Company: <company name>
  Start date: <format: YYYY-MM-DD> (only if provided)
  End date: <format: YYYY-MM-DD> (only if provided)
  Description: <an optimized description in bullet format, might be inferred from the job title>
  `

  const userMessage = `
  Please provide a work experience entry from this description:
  ${description}
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
    position: aiResponse.match(/Job title: (.*)/)?.[1] || "",
    company: aiResponse.match(/Company: (.*)/)?.[1] || "",
    description: (aiResponse.match(/Description:([\s\S]*)/)?.[1] || "").trim(),
    startDate: aiResponse.match(/Start date: (\d{4}-\d{2}-\d{2})/)?.[1],
    endDate: aiResponse.match(/End date: (\d{4}-\d{2}-\d{2})/)?.[1],
  } satisfies WorkExperience
}
