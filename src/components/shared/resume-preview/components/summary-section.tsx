import type { ResumeSectionProps } from "@/lib/types"

import { Separator } from "@/components/ui/separator"

export function SummarySection({ resumeData }: ResumeSectionProps) {
  const { summary } = resumeData

  if (!summary) return null

  return (
    <>
      <Separator
        className="border-2"
        // style={{
        //   borderColor: colorHex,
        // }}
      />
      <div className="break-inside-avoid space-y-3">
        <p
          className="text-lg font-semibold"
          //   style={{
          //     color: colorHex,
          //   }}
        >
          Professional profile
        </p>
        <div className="text-sm whitespace-pre-line">{summary}</div>
      </div>
    </>
  )
}
