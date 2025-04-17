"use client"

import { useTransition } from "react"

import { toast } from "sonner"

import { LoadingButton } from "@/components/shared/loading-button"

import { createCustomerPortalSession } from "@/features/billing/actions/create-customer-portal-session.action"

export function ManageSubscriptionButton() {
  const [isPending, startTransition] = useTransition()

  function handleClick() {
    startTransition(async () => {
      try {
        const redirectUrl = await createCustomerPortalSession()
        window.location.href = redirectUrl
      } catch (error) {
        console.log("ManageSubscriptionButton", error)
        toast.error("Something went wrong. Please try again.")
      }
    })
  }

  return (
    <LoadingButton onClick={handleClick} loading={isPending}>
      Manage subscription
    </LoadingButton>
  )
}
