import { formatDate } from "date-fns"

import { ResumeSectionProps } from "@/lib/types"

import { Separator } from "@/components/ui/separator"

export function EducationSection({ resumeData }: ResumeSectionProps) {
  const { educations } = resumeData

  const educationsNotEmpty = educations?.filter(
    (edu) => Object.values(edu).filter(Boolean).length > 0,
  )

  if (!educationsNotEmpty?.length) return null

  return (
    <>
      <hr
        className="border-2"
        // style={{
        //   borderColor: colorHex,
        // }}
      />
      <div className="space-y-3">
        <p
          className="text-lg font-semibold"
          // style={{
          //   color: colorHex,
          // }}
        >
          Education
        </p>
        {educationsNotEmpty.map((edu, index) => (
          <div key={index} className="break-inside-avoid space-y-1">
            <div
              className="flex items-center justify-between text-sm font-semibold"
              // style={{
              //   color: colorHex,
              // }}
            >
              <span>{edu.degree}</span>
              {edu.startDate && (
                <span>
                  {edu.startDate &&
                    `${formatDate(edu.startDate, "MM/yyyy")} ${edu.endDate ? `- ${formatDate(edu.endDate, "MM/yyyy")}` : ""}`}
                </span>
              )}
            </div>
            <p className="text-xs font-semibold">{edu.school}</p>
          </div>
        ))}
      </div>
    </>
  )
}
