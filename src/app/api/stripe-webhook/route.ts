import { env } from "@/env";
import stripe from "@/lib/stripe";
import { clerkClient } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    const playload = await req.text();
    const signature = req.headers.get("Stripe-Signature");

    if (!signature) {
      return new Response("Invalid signature", { status: 400 });
    }

    const event = stripe.webhooks.constructEvent(
      playload,
      signature,
      env.STRIPE_WEBHOOK_SECRET,
    );

    console.log(`received event ${event.type}`, event.data.object);

    switch (event.type) {
      case "checkout.session.completed":
        await handleSessionCompleted(event.data.object);
        break;
      case "customer.subscription.created":
      case "customer.subscription.updated":
        await handleSubscriptionCreatedOrUpdated(event.data.object.id);
        break;
      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event.data.object);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return new Response("Success", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

// TODO: handle session events
async function handleSessionCompleted(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId;
  if (!userId) {
    throw new Error("User Id is missing in session metadata");
  }

  (await clerkClient()).users.updateUserMetadata(userId, {
    privateMetadata: {
      stripeCustomerId: session.customer as string,
    },
  });
}
async function handleSubscriptionCreatedOrUpdated(subscriptionId: string) {
  console.log("handleSubscriptionCreatedOrUpdated");
}
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log("handleSubscriptionDeleted");
}
