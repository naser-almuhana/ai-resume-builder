import { NextRequest } from "next/server"

import { clerkClient } from "@clerk/nextjs/server"
import Stripe from "stripe"

import { env } from "@/lib/env"
import prisma from "@/lib/prisma"
import stripe from "@/lib/stripe"

export async function POST(req: NextRequest) {
  try {
    const payload = await req.text()
    const signature = req.headers.get("stripe-signature")

    if (!signature) {
      return new Response("Signature is missing", { status: 400 })
    }

    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      env.STRIPE_WEBHOOK_SECRET,
    )

    switch (event.type) {
      case "checkout.session.completed":
        await handleSessionCompleted(event.data.object)
        break
      case "customer.subscription.created":
      case "customer.subscription.updated":
        await handleSubscriptionCreatedOrUpdated(event.data.object.id)
        break
      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event.data.object)
        break
      default:
        console.log(`Unhandled event type: ${event.type}`)
        break
    }

    // console.log(`Received event: ${event.type}`, event.data.object)
    return new Response("Webhook received", { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response("Internal server error", { status: 500 })
  }
}

async function handleSessionCompleted(session: Stripe.Checkout.Session) {
  console.log("handleSessionCompleted")
  const userId = session.metadata?.userId

  if (!userId) throw new Error("User ID is missing in session metadata")

  await (
    await clerkClient()
  ).users.updateUserMetadata(userId, {
    privateMetadata: {
      stripeCustomerId: session.customer as string,
    },
  })
}

async function handleSubscriptionCreatedOrUpdated(subscriptionId: string) {
  console.log("handleSubscriptionCreatedOrUpdated")
  const subscription = await stripe.subscriptions.retrieve(subscriptionId)

  if (
    subscription.status === "active" ||
    subscription.status === "trialing" ||
    subscription.status === "past_due"
  ) {
    await prisma.userSubscription.upsert({
      where: {
        userId: subscription.metadata.userId,
      },
      create: {
        userId: subscription.metadata.userId,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.items.data[0].current_period_end * 1000,
        ),
        stripeCancelAtPeriodEnd: subscription.cancel_at_period_end,
      },
      update: {
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.items.data[0].current_period_end * 1000,
        ),
        stripeCancelAtPeriodEnd: subscription.cancel_at_period_end,
      },
    })
  } else {
    await prisma.userSubscription.deleteMany({
      where: {
        stripeCustomerId: subscription.customer as string,
      },
    })
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log("handleSubscriptionDeleted")
  await prisma.userSubscription.deleteMany({
    where: {
      stripeCustomerId: subscription.customer as string,
    },
  })
}
