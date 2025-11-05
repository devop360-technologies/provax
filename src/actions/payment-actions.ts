"use server";

import { appConfig } from "@/config";
import { getCurrentUser } from "@/lib/auth";
import { createStripeCheckoutSession, createStripeCustomerPortal } from "@/lib/stripe";

/** ========================================================================
 * Creates a checkout session with Stripe and returns the checkout URL
 * =========================================================================
 */
export async function createCheckoutSessionAction(priceId: string) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      throw new Error("Unauthorized Access!");
    }

    const plan = appConfig.stripe.plans.find((p) => p.priceId === priceId);
    if (!plan) {
      throw new Error("Plan not found");
    }

    const redirectBaseUrl = `${appConfig.domainUrl}/dashboard`;

    const checkoutUrl = await createStripeCheckoutSession({
      priceId,
      mode: plan.mode,
      email: currentUser.email!,
      userId: currentUser.id, // Link checkout to internal user ID
      customerId: currentUser?.customerId ? currentUser.customerId : undefined, // Pass existing customer ID if available
      redirectUrl: redirectBaseUrl // Base URL for redirection
    });

    if (!checkoutUrl) {
      throw new Error("Failed to create Stripe checkout session");
    }

    // Return the checkout URL so the client can redirect
    return {
      status: "success",
      url: checkoutUrl
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error creating Stripe checkout session:", error);
    return { status: "error", message };
  }
}

/** ========================================================================
 * Creates a Stripe customer portal session for the user to manage their subscription
 * =========================================================================
 */
export async function createCustomerPortalAction() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      throw new Error("Unauthorized Access!");
    }

    if (!currentUser.customerId) {
      throw new Error("Stripe Customer ID not found for this user.");
    }

    // Define the return URL after the portal session
    const returnUrl = `${appConfig.domainUrl}/dashboard`; // Example return URL

    // Create a customer portal session with the customer ID
    const portalUrl = await createStripeCustomerPortal({
      customerId: currentUser.customerId,
      returnUrl: returnUrl
    });

    if (!portalUrl) {
      throw new Error("Failed to create Stripe customer portal session");
    }

    // Return the portal URL so the client can redirect
    return {
      status: "success",
      url: portalUrl
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error creating Stripe customer portal session:", message);
    return { status: "error", message };
  }
}
