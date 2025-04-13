import Link from "next/link"

import { PlusSquareIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export function CreateResumeButton() {
  return (
    <Button asChild className="mx-auto flex w-fit gap-2">
      <Link href="/editor">
        <PlusSquareIcon className="size-5" />
        New resume
      </Link>
    </Button>
  )
}
