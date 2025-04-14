import type { ResumeSectionProps } from "@/lib/types"

import { Badge } from "@/components/ui/badge"

export function SkillsSection({ resumeData }: ResumeSectionProps) {
  const { skills } = resumeData

  if (!skills?.length) return null

  return (
    <>
      <hr
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
          Skills
        </p>
        <div className="flex break-inside-avoid flex-wrap gap-2">
          {skills.map((skill, index) => (
            <Badge
              key={index}
              className="rounded-md bg-black text-white hover:bg-black"
              //   style={{
              //     backgroundColor: colorHex,
              //     borderRadius:
              //       borderStyle === BorderStyles.SQUARE
              //         ? "0px"
              //         : borderStyle === BorderStyles.CIRCLE
              //           ? "9999px"
              //           : "8px",
              //   }}
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </>
  )
}
