import { type Metadata } from "next"

import { auth } from "@clerk/nextjs/server"

import prisma from "@/lib/prisma"
import { resumeDataInclude } from "@/lib/types"

import { getUserSubscriptionLevel } from "@/features/premium/data/get-user-subscription-level"
import { canCreateResume } from "@/features/premium/lib/permissions"
import { CreateResumeButton } from "@/features/resumes/components/create-resume-button"
import { ResumeItem } from "@/features/resumes/components/resume-item"

export const metadata: Metadata = {
  title: "Your resumes",
}

export default async function ResumesPage() {
  const { userId } = await auth()

  if (!userId) return null

  const [resumes, totalCount, subscriptionLevel] = await Promise.all([
    prisma.resume.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      include: resumeDataInclude,
    }),
    prisma.resume.count({
      where: { userId },
    }),
    getUserSubscriptionLevel(userId),
  ])

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
      <CreateResumeButton
        canCreate={canCreateResume(subscriptionLevel, totalCount)}
      />
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Your resumes</h1>
        <p>Total: {totalCount}</p>
      </div>
      <div className="flex w-full grid-cols-2 flex-col gap-3 sm:grid md:grid-cols-3 lg:grid-cols-4">
        {resumes.map((resume) => (
          <ResumeItem key={resume.id} resume={resume} />
        ))}
      </div>
    </main>
  )
}
