import type { ResumeSectionProps } from "@/lib/types"

import { BORDER_STYLES } from "@/constants"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export function SkillsSection({ resumeData }: ResumeSectionProps) {
  const { skills, colorHex, borderStyle } = resumeData

  if (!skills?.length) return null

  return (
    <>
      <Separator
        className="border-2"
        style={{
          borderColor: colorHex,
        }}
      />
      <div className="break-inside-avoid space-y-3">
        <p
          className="text-lg font-semibold"
          style={{
            color: colorHex,
          }}
        >
          Skills
        </p>
        <div className="flex break-inside-avoid flex-wrap gap-2">
          {skills.map((skill, index) => (
            <Badge
              key={index}
              className="rounded-md bg-black text-white hover:bg-black"
              style={{
                backgroundColor: colorHex,
                borderRadius:
                  borderStyle === BORDER_STYLES.SQUARE
                    ? "0px"
                    : borderStyle === BORDER_STYLES.CIRCLE
                      ? "9999px"
                      : "8px",
              }}
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </>
  )
}
