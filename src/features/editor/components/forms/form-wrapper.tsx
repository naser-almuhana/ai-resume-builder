import { PropsWithChildren } from "react"

interface FormWrapperProps extends PropsWithChildren {
  title: string
  description: string
}

export function FormWrapper({
  description,
  title,
  children,
}: FormWrapperProps) {
  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      {children}
    </div>
  )
}
