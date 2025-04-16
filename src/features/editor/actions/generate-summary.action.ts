"use server"

import { auth } from "@clerk/nextjs/server"

import openai from "@/lib/openai"

import {
  type GenerateSummaryInput,
  generateSummarySchema,
} from "@/features/editor/schemas/generate-summary.schema"

export async function generateSummary(input: GenerateSummaryInput) {
  // TODO: block for non-premium users

  const { userId } = await auth()
  if (!userId) throw new Error("Unauthorized")

  const { jobTitle, workExperiences, educations, skills } =
    generateSummarySchema.parse(input)

  const systemMessage = `
    You are a job resume generator AI. Your task is to write a professional introduction summary for a resume given the user's provided data.
    Only return the summary and do not include any other information in the response. Keep it concise and professional.
    `
  const userMessage = `
    Please generate a professional resume summary from this data:

    Job title: ${jobTitle || "N/A"}

    Work experience:
    ${workExperiences
      ?.map(
        (exp) => `
        Position: ${exp.position || "N/A"} at ${exp.company || "N/A"} from ${exp.startDate || "N/A"} to ${exp.endDate || "Present"}

        Description:
        ${exp.description || "N/A"}
        `,
      )
      .join("\n\n")}

      Education:
    ${educations
      ?.map(
        (edu) => `
        Degree: ${edu.degree || "N/A"} at ${edu.school || "N/A"} from ${edu.startDate || "N/A"} to ${edu.endDate || "N/A"}

        Description:
        ${edu.description || "N/A"}
        `,
      )
      .join("\n\n")}

      Skills:
      ${skills}
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

  return aiResponse
}
