-- CreateTable
CREATE TABLE "user_subscriptions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "stripe_customer_id" TEXT NOT NULL,
    "stripe_subscription_id" TEXT NOT NULL,
    "stripe_price_id" TEXT NOT NULL,
    "stripe_current_period_end" TIMESTAMP(3) NOT NULL,
    "stripe_cancel_at_period_end" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_subscriptions_stripe_customer_id_key" ON "user_subscriptions"("stripe_customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_subscriptions_stripe_subscription_id_key" ON "user_subscriptions"("stripe_subscription_id");
