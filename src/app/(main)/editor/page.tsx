import { type Metadata } from "next"
import { Suspense } from "react"

import { ResumeEditor } from "@/features/editor/components/resume-editor"

export const metadata: Metadata = {
  title: "Design your resumes",
}

export default function EditorPage() {
  return (
    <div className="flex grow flex-col">
      <header className="space-y-1.5 border-b px-3 py-5 text-center">
        <h1 className="text-2xl font-bold">Design your resume</h1>
        <p className="text-muted-foreground text-sm">
          Follow the steps below to create your resume. Your progress will be
          saved automatically.
        </p>
      </header>
      <Suspense fallback={<div>Loading...</div>}>
        <ResumeEditor />
      </Suspense>
    </div>
  )
}
