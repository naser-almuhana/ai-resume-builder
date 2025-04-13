import { Logo, ThemeToggle, UserButton } from "./components"

export function Navbar() {
  return (
    <nav className="shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 p-3">
        <Logo />
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <UserButton />
        </div>
      </div>
    </nav>
  )
}
