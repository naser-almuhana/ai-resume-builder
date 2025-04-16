import { PropsWithChildren, ReactNode } from "react"

import { cn } from "@/lib/utils"

import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
} from "@/components/ui/responsive-modal"

interface AppResponsiveModalProps extends PropsWithChildren {
  /** Controlled open state (use with onOpenChange) */
  open?: boolean
  /** Callback for controlled open state changes */
  onOpenChange?: (open: boolean) => void
  /** Modal title */
  title?: ReactNode
  /** Modal description */
  description?: ReactNode
  /** Trigger element that opens the modal (uncontrolled) */
  trigger?: ReactNode
  /** Additional class names for content */
  contentClassName?: string
  side?: "top" | "bottom" | "left" | "right"
}

export function AppResponsiveModal({
  open,
  onOpenChange,
  children,
  title,
  description,
  trigger,
  contentClassName,
  side = "bottom",
}: AppResponsiveModalProps) {
  // Determine if we're in controlled mode
  const isControlled = open !== undefined && onOpenChange !== undefined

  return (
    <ResponsiveModal
      open={isControlled ? open : undefined}
      onOpenChange={isControlled ? onOpenChange : undefined}
    >
      {/* Only render trigger if not in controlled mode or if explicitly provided */}
      {(!isControlled || trigger) && (
        <ResponsiveModalTrigger asChild>{trigger}</ResponsiveModalTrigger>
      )}

      <ResponsiveModalContent className={cn(contentClassName)} side={side}>
        <ResponsiveModalHeader>
          <ResponsiveModalTitle className={cn(!title && "hidden")}>
            {title}
          </ResponsiveModalTitle>
          <ResponsiveModalDescription className={cn(!description && "hidden")}>
            {description}
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>

        {children}
      </ResponsiveModalContent>
    </ResponsiveModal>
  )
}
