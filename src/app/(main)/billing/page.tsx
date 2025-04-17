import { auth } from "@clerk/nextjs/server"
import { formatDate } from "date-fns"
import type Stripe from "stripe"

import prisma from "@/lib/prisma"
import stripe from "@/lib/stripe"

import { GetSubscriptionButton } from "@/features/billing/components/get-subscription-button"
import { ManageSubscriptionButton } from "@/features/billing/components/manage-subscription-button"

export default async function BillingPage() {
  const { userId } = await auth()
  if (!userId) return null

  const subscription = await prisma.userSubscription.findUnique({
    where: { userId },
  })

  const priceInfo = subscription
    ? await stripe.prices.retrieve(subscription.stripePriceId, {
        expand: ["product"],
      })
    : null

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
      <h1 className="text-3xl font-bold">Billing</h1>
      <p>
        Your current plan:{" "}
        <span className="font-bold">
          {priceInfo ? (priceInfo.product as Stripe.Product).name : "Free"}
        </span>
      </p>

      {subscription ? (
        <>
          {subscription.stripeCancelAtPeriodEnd && (
            <p className="text-destructive">
              Your subscription will be canceled on{" "}
              {formatDate(subscription.stripeCurrentPeriodEnd, "MMMM dd, yyyy")}
            </p>
          )}
          <ManageSubscriptionButton />
        </>
      ) : (
        <GetSubscriptionButton />
      )}
    </main>
  )
}
