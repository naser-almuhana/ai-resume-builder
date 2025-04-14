import Image from "next/image"
import { useEffect, useState } from "react"

import type { ResumeSectionProps } from "@/lib/types"

import { BORDER_STYLES } from "@/constants"

export function PersonalInfoSection({ resumeData }: ResumeSectionProps) {
  const {
    photo,
    firstName,
    lastName,
    jobTitle,
    city,
    country,
    phone,
    email,
    colorHex,
    borderStyle,
  } = resumeData

  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo)

  useEffect(() => {
    const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : ""
    if (objectUrl) setPhotoSrc(objectUrl)
    if (photo === null) setPhotoSrc("")

    return () => URL.revokeObjectURL(objectUrl)
  }, [photo])

  return (
    <div className="flex items-center gap-6">
      {photoSrc && (
        <Image
          src={photoSrc}
          width={100}
          height={100}
          alt="Author photo"
          className="aspect-square object-cover"
          style={{
            borderRadius:
              borderStyle === BORDER_STYLES.SQUARE
                ? "0px"
                : borderStyle === BORDER_STYLES.CIRCLE
                  ? "9999px"
                  : "10%",
          }}
        />
      )}
      <div className="space-y-2.5">
        <div className="space-y-1">
          <p
            className="text-3xl font-bold"
            style={{
              color: colorHex,
            }}
          >
            {firstName} {lastName}
          </p>
          <p
            className="font-medium"
            style={{
              color: colorHex,
            }}
          >
            {jobTitle}
          </p>
        </div>
        <p className="text-xs text-gray-500">
          {city}
          {city && country ? ", " : ""}
          {country}
          {(city || country) && (phone || email) ? " • " : ""}
          {[phone, email].filter(Boolean).join(" • ")}
        </p>
      </div>
    </div>
  )
}
