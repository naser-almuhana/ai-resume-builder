import { type Metadata } from "next"
import { Suspense } from "react"

import { auth } from "@clerk/nextjs/server"
import { Loader2 } from "lucide-react"

import prisma from "@/lib/prisma"
import { resumeDataInclude } from "@/lib/types"

import { ResumeEditor } from "@/features/editor/components/resume-editor"

interface EditorPageProps {
  searchParams: Promise<{ resumeId?: string }>
}

export const metadata: Metadata = {
  title: "Design your resumes",
}

export default async function EditorPage({ searchParams }: EditorPageProps) {
  const { userId } = await auth()
  if (!userId) return null

  const { resumeId } = await searchParams

  const resumeToEdit = resumeId
    ? await prisma.resume.findUnique({
        where: { id: resumeId, userId },
        include: resumeDataInclude,
      })
    : null

  return (
    <div className="flex grow flex-col">
      <Suspense fallback={<Loader2 className="mx-auto my-6 animate-spin" />}>
        <ResumeEditor resumeToEdit={resumeToEdit} />
      </Suspense>
    </div>
  )
}
