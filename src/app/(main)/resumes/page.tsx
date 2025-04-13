import { type Metadata } from "next"

import { CreateResumeButton } from "@/features/resumes/components/create-resume-button"

export const metadata: Metadata = {
  title: "Your resumes",
}

export default function ResumesPage() {
  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
      <CreateResumeButton />
    </main>
  )
}
