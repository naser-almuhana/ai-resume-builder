"use client"

import Link from "next/link"
import { useRef } from "react"

import { formatDate } from "date-fns"
import { useReactToPrint } from "react-to-print"

import { type ResumeServerData } from "@/lib/types"
import { mapToResumeValues } from "@/lib/utils"

import { ResumePreview } from "@/components/shared/resume-preview"

import { MoreMenu } from "./components/more-menu"

interface ResumeItemProps {
  resume: ResumeServerData
}

export function ResumeItem({ resume }: ResumeItemProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: resume.title || "Resume",
  })

  const wasUpdated = resume.updatedAt !== resume.createdAt

  return (
    <div className="group bg-secondary hover:border-border relative rounded-lg border border-transparent p-3 transition-colors">
      <div className="space-y-3">
        <Link
          href={`/editor?resumeId=${resume.id}`}
          className="flex w-full flex-col gap-2 text-center"
        >
          <p className="line-clamp-1 font-semibold">
            {resume.title || "No title"}
          </p>
          {resume.description && (
            <p className="text-muted-foreground line-clamp-2 text-sm">
              {resume.description}
            </p>
          )}
          <p className="text-muted-foreground text-xs">
            {wasUpdated ? "Updated" : "Created"} on{" "}
            {formatDate(resume.updatedAt, "MMM d, yyyy h:mm a")}
          </p>
        </Link>

        <Link
          href={`/editor?resumeId=${resume.id}`}
          className="relative inline-block w-full"
        >
          <ResumePreview
            resumeData={mapToResumeValues(resume)}
            contentRef={contentRef}
            className="overflow-hidden shadow-sm transition-shadow group-hover:shadow-lg"
          />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
        </Link>
      </div>
      <MoreMenu resumeId={resume.id} onPrintClick={reactToPrintFn} />
    </div>
  )
}
