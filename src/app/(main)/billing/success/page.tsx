import { type Metadata } from "next"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Billing Success",
}

export default function SuccessPage() {
  return (
    <main className="mx-auto max-w-7xl space-y-6 px-3 py-6 text-center">
      <h1 className="text-3xl font-bold">Billing Success</h1>
      <p>
        The checkout was successful and your Pro account has been activated.
        Enjoy!
      </p>
      <Button asChild>
        <Link href="/resumes">Go to resumes</Link>
      </Button>
    </main>
  )
}
