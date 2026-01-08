"use client";

import { Loader } from "lucide-react";
import { useCallback, useTransition } from "react";
import { toast } from "sonner";

import { getErrorMessage } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CustomerPortalButton({ className = "" }: Readonly<{ className?: string }>) {
  const [isPending, startTransition] = useTransition();

  const handlePortalClick = useCallback(() => {
    // Handle the customer portal process
    startTransition(async () => {
      
    });
  }, []);

  return (
    <Button className={cn("px-4 py-2", className)} disabled={isPending} onClick={handlePortalClick}>
      {isPending && <Loader className="me-2 size-4 animate-spin" />}
      Manage Subscription
    </Button>
  );
}
