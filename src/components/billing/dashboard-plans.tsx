"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";

import { createCheckoutSessionAction } from "@/actions/payment-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { appConfig } from "@/config";

const planFeatures: Record<string, string[]> = {
  Starter: [
    "Basic AI vehicle inspections",
    "Up to 10 certifications/month",
    "Standard reporting",
    "Email support"
  ],
  Pro: [
    "Advanced AI vehicle inspections",
    "Up to 50 certifications/month",
    "Detailed analytics dashboard",
    "Priority support",
    "Service bidding access"
  ],
  Lifetime: [
    "Unlimited AI vehicle inspections",
    "Unlimited certifications",
    "Full analytics suite",
    "24/7 dedicated support",
    "Full service bidding access",
    "API access",
    "One-time payment"
  ]
};

export function DashboardPlans() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleCheckout = async (priceId: string) => {
    setLoadingPlan(priceId);
    try {
      const result = await createCheckoutSessionAction(priceId);
      if (result.status === "success" && result.url) {
        globalThis.location.href = result.url;
      }
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {appConfig.stripe.plans.map((plan) => (
        <Card key={plan.priceId} className="relative flex flex-col">
          {plan.title === "Pro" && (
            <div className="bg-primary text-primary-foreground absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs font-medium">
              Popular
            </div>
          )}

          <CardHeader>
            <CardTitle>{plan.title}</CardTitle>
            <CardDescription>
              <span className="text-3xl font-bold">${plan.price}</span>
              {plan.mode === "subscription" ? (
                <span className="text-muted-foreground">/month</span>
              ) : (
                <span className="text-muted-foreground"> one-time</span>
              )}
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-1 flex-col">
            <ul className="mb-6 flex-1 space-y-2">
              {(planFeatures[plan.title] ?? []).map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <Check className="text-primary h-4 w-4" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              className="w-full"
              onClick={() => handleCheckout(plan.priceId)}
              disabled={loadingPlan !== null}
            >
              {loadingPlan === plan.priceId ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                `Get ${plan.title}`
              )}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
