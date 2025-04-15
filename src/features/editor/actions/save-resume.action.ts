"use server"

import { type ResumeValues, resumeSchema } from "@/schemas/resume-values.schema"
import { auth } from "@clerk/nextjs/server"
import { del, put } from "@vercel/blob"

import prisma from "@/lib/prisma"
import { generateUniquePhotoName } from "@/lib/utils"

export async function saveResume(values: ResumeValues) {
  const { id } = values

  console.log("received values", values)

  const { photo, workExperiences, educations, ...resumeValues } =
    resumeSchema.parse(values)

  const { userId } = await auth()
  if (!userId) throw new Error("User not authenticated")

  // TODO: check resume count for non-premium users

  const existingResume = id
    ? await prisma.resume.findUnique({ where: { id, userId } })
    : null
  if (id && !existingResume) throw new Error("Resume not found!")

  // null means we wanna delete the existing photo
  let newPhotoUrl: string | undefined | null = undefined

  if (photo instanceof File) {
    if (existingResume?.photoUrl) {
      await del(existingResume.photoUrl)
    }
    const uniquePhotoName = generateUniquePhotoName(photo.name)

    const blob = await put(uniquePhotoName, photo, {
      access: "public",
    })

    newPhotoUrl = blob.url
  } else if (photo === null) {
    if (existingResume?.photoUrl) {
      await del(existingResume.photoUrl)
    }
    newPhotoUrl = null
  }

  if (id) {
    // update
    return prisma.resume.update({
      where: { id },
      data: {
        ...resumeValues,
        photoUrl: newPhotoUrl,
        workExperiences: {
          deleteMany: {}, // Remove all old experiences, ensures there's no duplication, no stale data
          create: workExperiences?.map((exp) => ({
            ...exp,
            startDate: exp.startDate ? new Date(exp.startDate) : undefined,
            endDate: exp.endDate ? new Date(exp.endDate) : undefined,
          })),
        },
        educations: {
          deleteMany: {},
          create: educations?.map((edu) => ({
            ...edu,
            startDate: edu.startDate ? new Date(edu.startDate) : undefined,
            endDate: edu.endDate ? new Date(edu.endDate) : undefined,
          })),
        },
      },
    })
  } else {
    // create
    const newResume = prisma.resume.create({
      data: {
        ...resumeValues,
        userId,
        photoUrl: newPhotoUrl,
        workExperiences: {
          create: workExperiences?.map((exp) => ({
            ...exp,
            startDate: exp.startDate ? new Date(exp.startDate) : undefined,
            endDate: exp.endDate ? new Date(exp.endDate) : undefined,
          })),
        },
        educations: {
          create: educations?.map((edu) => ({
            ...edu,
            startDate: edu.startDate ? new Date(edu.startDate) : undefined,
            endDate: edu.endDate ? new Date(edu.endDate) : undefined,
          })),
        },
      },
    })

    return newResume
  }
}
