"use client"

import Link from "next/link"

import { PlusSquareIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

import { usePremiumModal } from "@/features/premium/hooks/use-premium-modal"

interface CreateResumeButtonProps {
  canCreate: boolean
}

export function CreateResumeButton({ canCreate }: CreateResumeButtonProps) {
  const premiumModal = usePremiumModal()

  if (canCreate) {
    return (
      <Button asChild className="mx-auto flex w-fit gap-2">
        <Link href="/editor">
          <PlusSquareIcon className="size-5" />
          New resume
        </Link>
      </Button>
    )
  }

  return (
    <Button
      className="mx-auto flex w-fit gap-2"
      onClick={() => {
        premiumModal.setOpen(true)
      }}
    >
      <PlusSquareIcon className="size-5" />
      New resume
    </Button>
  )
}
