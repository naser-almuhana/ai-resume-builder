import { formatDate } from "date-fns"

import { ResumeSectionProps } from "@/lib/types"

import { Separator } from "@/components/ui/separator"

export function WorkExperienceSection({ resumeData }: ResumeSectionProps) {
  const { workExperiences } = resumeData

  const workExperiencesNotEmpty = workExperiences?.filter(
    (exp) => Object.values(exp).filter(Boolean).length > 0,
  )

  if (!workExperiencesNotEmpty?.length) return null

  return (
    <>
      <Separator
        className="border-2"
        // style={{
        //   borderColor: colorHex,
        // }}
      />

      <div className="space-y-3">
        <p
          className="text-lg font-semibold"
          //   style={{
          //     color: colorHex,
          //   }}
        >
          Work experience
        </p>
        {workExperiencesNotEmpty.map((exp, index) => (
          <div key={index} className="break-inside-avoid space-y-1">
            <div
              className="flex items-center justify-between text-sm font-semibold"
              //   style={{
              //     color: colorHex,
              //   }}
            >
              <span>{exp.position}</span>
              {exp.startDate && (
                <span>
                  {formatDate(exp.startDate, "MM/yyyy")} -{" "}
                  {exp.endDate ? formatDate(exp.endDate, "MM/yyyy") : "Present"}
                </span>
              )}
            </div>
            <p className="text-xs font-semibold">{exp.company}</p>
            <div className="text-xs whitespace-pre-line">{exp.description}</div>
          </div>
        ))}
      </div>
    </>
  )
}
