"use client"

import * as React from "react"

import * as DialogPrimitive from "@radix-ui/react-dialog"
import { type VariantProps, cva } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const ResponsiveModal = DialogPrimitive.Root

const ResponsiveModalTrigger = DialogPrimitive.Trigger

const ResponsiveModalClose = DialogPrimitive.Close

const ResponsiveModalPortal = DialogPrimitive.Portal

const ResponsiveModalOverlay = ({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) => (
  <DialogPrimitive.Overlay
    className={cn(
      "bg-background/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 backdrop-blur-sm",
      className,
    )}
    {...props}
  />
)

const ResponsiveModalVariants = cva(
  cn(
    "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500 overflow-y-auto",
    "lg:left-[50%] lg:top-[50%] lg:w-full lg:max-w-lg lg:translate-x-[-50%] lg:translate-y-[-50%] lg:border lg:duration-200 lg:data-[state=open]:animate-in lg:data-[state=closed]:animate-out lg:data-[state=closed]:fade-out-0 lg:data-[state=open]:fade-in-0 lg:data-[state=closed]:zoom-out-95 lg:data-[state=open]:zoom-in-95 lg:data-[state=closed]:slide-out-to-left-1/2 lg:data-[state=closed]:slide-out-to-top-[48%] lg:data-[state=open]:slide-in-from-left-1/2 lg:data-[state=open]:slide-in-from-top-[48%] lg:rounded-xl",
  ),
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b rounded-b-xl max-h-[80dvh] lg:h-fit data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t lg:h-fit max-h-[80dvh] rounded-t-xl data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full lg:h-fit w-3/4 border-r rounded-r-xl data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full lg:h-fit w-3/4 border-l rounded-l-xl data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "bottom",
    },
  },
)

interface ResponsiveModalContentProps
  extends React.ComponentProps<typeof DialogPrimitive.Content>,
    VariantProps<typeof ResponsiveModalVariants> {}

const ResponsiveModalContent = ({
  side = "bottom",
  className,
  children,
  ...props
}: ResponsiveModalContentProps) => (
  <ResponsiveModalPortal>
    <ResponsiveModalOverlay />
    <DialogPrimitive.Content
      className={cn(ResponsiveModalVariants({ side }), className)}
      {...props}
    >
      {children}
      <ResponsiveModalClose className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </ResponsiveModalClose>
    </DialogPrimitive.Content>
  </ResponsiveModalPortal>
)

const ResponsiveModalHeader = ({
  className,
  ...props
}: React.ComponentProps<"div">) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className,
    )}
    {...props}
  />
)

const ResponsiveModalFooter = ({
  className,
  ...props
}: React.ComponentProps<"div">) => (
  <div
    className={cn(
      "mt-2 flex flex-col space-y-2 sm:mt-0 sm:flex-row sm:justify-end sm:space-y-0 sm:space-x-2",
      className,
    )}
    {...props}
  />
)

const ResponsiveModalTitle = ({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) => (
  <DialogPrimitive.Title
    className={cn("text-foreground text-lg font-semibold", className)}
    {...props}
  />
)

const ResponsiveModalDescription = ({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) => (
  <DialogPrimitive.Description
    className={cn("text-muted-foreground text-sm", className)}
    {...props}
  />
)

export {
  ResponsiveModal,
  ResponsiveModalPortal,
  ResponsiveModalOverlay,
  ResponsiveModalTrigger,
  ResponsiveModalClose,
  ResponsiveModalContent,
  ResponsiveModalHeader,
  ResponsiveModalFooter,
  ResponsiveModalTitle,
  ResponsiveModalDescription,
}
