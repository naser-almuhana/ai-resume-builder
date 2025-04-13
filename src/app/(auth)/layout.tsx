import { ThemeToggle } from "@/components/header/components"

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <ThemeToggle />
      {children}
    </div>
  )
}
