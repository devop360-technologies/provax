export interface StripeCheckoutSessionParams {
  priceId: string; // Equivalent to Lemon Squeezy's variantId
  redirectUrl?: string; // Base URL for success/cancel
  // discountCode: string; // Stripe handles discounts via Promotion Codes applied on the session
  email: string;
  userId?: string;
  // You might need a 'mode' (payment, subscription) depending on your pricing
  mode: "payment" | "subscription";
  // couponId: These will be used if you want to prefill the coupon code.
  // couponId?: string;
  customerId?: string;
}

export interface StripeCustomerPortalParams {
  customerId: string;
  returnUrl: string; // URL to return to after portal session
}
