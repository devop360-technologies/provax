import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import { appConfig } from "@/config";
import { prisma } from "@/lib/prisma";
import { stripeClient } from "@/lib/stripe";
import { User } from "@/types/user";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature")!;
  const webhookSecret = appConfig.stripe.webhookSecret;

  if (!webhookSecret) {
    const message =
      "Stripe webhook secret (STRIPE_WEBHOOK_SECRET) is missing from environment variables. Cannot verify incoming Stripe webhooks.";
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.error(message);
    }
    return NextResponse.json({ error: { message } }, { status: 500 });
  }

  let event: Stripe.Event;

  // Validate the Stripe webhook signature and parse the incoming event payload
  try {
    event = stripeClient.webhooks.constructEvent(body, signature, webhookSecret);
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.log(`Stripe event: ${event.type}`);
    }
  } catch (err) {
    const error = err as Error;
    const message = `Webhook signature verification failed: ${error.message}`;

    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.log(message);
    }
    return NextResponse.json({ error: { message } }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        // Handles both initial subscription payments and one-time purchases.
        if (process.env.NODE_ENV === "development") {
          // eslint-disable-next-line no-console
          console.log(`Handling "${event.type}" event...`);
        }

        const stripeObject = event.data.object;
        const checkoutSession = await stripeClient.checkout.sessions.retrieve(stripeObject.id, {
          expand: ["line_items"]
        });

        // collect necessary info from the checkout session
        const userId = checkoutSession?.client_reference_id;
        const stripeCustomerId = checkoutSession?.customer as string;
        const customerEmail = checkoutSession?.customer_details?.email;
        const priceId = checkoutSession?.line_items?.data[0]?.price?.id;
        if (process.env.NODE_ENV === "development") {
          // eslint-disable-next-line no-console
          console.log(
            ` UserID: ${userId}, CustomerID: ${stripeCustomerId}, Email: ${customerEmail}, PriceID: ${priceId}`
          );
        }

        let user: User | null = null;

        // Find the user associated with the order.
        if (userId) {
          user = await prisma.user.findUnique({ where: { id: userId } });
        } else if (customerEmail) {
          user = await prisma.user.findUnique({ where: { email: customerEmail } });
        }

        if (!user) {
          if (process.env.NODE_ENV === "development") {
            // eslint-disable-next-line no-console
            console.error(
              `Stripe Webhook Error: Unable to associate checkout session with userId: ${userId}, email: ${customerEmail}`
            );
          }

          return NextResponse.json(
            {
              message:
                "No matching user found for this Stripe event. Webhook processed and acknowledged."
            },
            { status: 200 }
          );
        }

        // Verify the purchased plan/price exists in app config
        const plan = appConfig.stripe.plans.find((p) => p.priceId === priceId);
        if (!plan) {
          const message = `Plan configuration missing for priceId: ${priceId}`;
          if (process.env.NODE_ENV === "development") {
            // eslint-disable-next-line no-console
            console.error(message);
          }
          throw new Error(message);
        }

        await prisma.user.update({
          where: { id: user.id },
          data: {
            priceId, // Store purchased price ID
            hasAccess: true, // Grant access
            customerId: stripeCustomerId, // Store Stripe customer ID,
            subscribedAt: new Date() // Store subscription start date
          }
        });

        break;
      }

      case "customer.subscription.updated": {
        // Handles subscription updates, such as plan changes (upgrades/downgrades) and renewals.
        if (process.env.NODE_ENV === "development") {
          // eslint-disable-next-line no-console
          console.log(`Handling "${event.type}" event...`);
        }
        const subscription = event.data.object;

        const status = subscription.status;
        const customerId = subscription.customer as string;
        const priceId = subscription.items.data[0]?.price.id;

        const user = await prisma.user.findFirst({
          where: { customerId },
          select: { id: true }
        });

        if (!user) {
          if (process.env.NODE_ENV === "development") {
            // eslint-disable-next-line no-console
            console.error(
              `Stripe Webhook Error: User not found for subscription update. customerId: ${customerId}`
            );
          }

          return NextResponse.json(
            {
              message:
                "No matching user found for this Stripe event. Webhook processed and acknowledged."
            },
            { status: 200 }
          );
        }

        // Update user access based on subscription status
        const hasAccess = status === "active";

        await prisma.user.update({
          where: { id: user.id },
          data: {
            priceId, // Update price ID
            hasAccess
          }
        });

        break;
      }

      case "customer.subscription.deleted": {
        // Handles subscription cancellations or expirations by revoking user access.
        if (process.env.NODE_ENV === "development") {
          // eslint-disable-next-line no-console
          console.log(`Handling "${event.type}" event...`);
        }
        const stripeObject = event.data.object;

        const customerId = stripeObject.customer as string;

        const user = await prisma.user.findFirst({
          where: { customerId }, // Find by Stripe Customer ID
          select: { id: true }
        });

        if (!user) {
          if (process.env.NODE_ENV === "development") {
            // eslint-disable-next-line no-console
            console.error(
              `Stripe Webhook Error: User not found for subscription deletion. customerId: ${customerId}`
            );
          }

          return NextResponse.json(
            {
              message:
                "No matching user found for this Stripe event. Webhook processed and acknowledged."
            },
            { status: 200 }
          );
        }

        await prisma.user.update({
          where: { id: user.id },
          data: {
            hasAccess: false, // Revoke access
            priceId: null // Optionally clear price ID
          }
        });

        break;
      }

      default:
        if (process.env.NODE_ENV === "development") {
          // eslint-disable-next-line no-console
          console.warn(
            `Received unhandled Stripe event type: "${event.type}". Event ID: ${event.id}.`
          );
        }
    }

    return NextResponse.json({ message: "Stripe webhook event handled successfully." });
  } catch (err) {
    const error = err as Error;
    const message = `Failed to process Stripe webhook: ${error.message}`;
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.error(message);
    }

    return NextResponse.json({ error: { message } }, { status: 500 });
  }
}
