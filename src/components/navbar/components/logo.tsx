import Image from "next/image"
import Link from "next/link"

import logoImg from "@/assets/logo.png"

export function Logo() {
  return (
    <Link href="/resumes" className="flex items-center gap-2">
      <Image
        src={logoImg}
        alt="Logo"
        width={35}
        height={35}
        className="rounded-full"
      />
      <span className="hidden text-base font-bold tracking-tight sm:block md:text-lg">
        AI Resume Builder
      </span>
    </Link>
  )
}
