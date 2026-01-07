"use client";

import { ArrowRight, Loader } from "lucide-react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useCallback, useTransition } from "react";
import { toast } from "sonner";

import { paymentApi, getErrorMessage } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { appConfig } from "@/config";
import { browserConsoleError, cn } from "@/lib/utils";

export function PurchaseButton({
  priceId,
  className = ""
}: Readonly<{
  priceId: string;
  className?: string;
}>) {
  const [isPending, startTransition] = useTransition();
  const session = useSession();

  const handlePurchaseClick = useCallback(() => {
    if (!session.data) {
      redirect(appConfig.auth.login);
    }

    // Handle the checkout process
    startTransition(async () => {
      try {
        const result = await paymentApi.createCheckoutSession(priceId);

        if (result.success && result.data?.url) {
          globalThis.location.href = result.data.url; // Redirect to the stripe checkout page
        } else {
          const message = result.message || "Failed to create checkout session";
          toast.error(message);
          browserConsoleError(message);
        }
      } catch (error) {
        const message = getErrorMessage(error);
        toast.error(message);
        browserConsoleError(message);
      }
    });
  }, [session.data, priceId]);

  return (
    <Button
      size="lg"
      className={cn("w-full rounded-lg px-12 py-6", className)}
      disabled={isPending}
      onClick={handlePurchaseClick}
    >
      {isPending && <Loader className="animate-spin" />}
      {isPending ? "Loading..." : "Get Started"}
      {!isPending && <ArrowRight className="opacity-80" size={18} />}
    </Button>
  );
}
