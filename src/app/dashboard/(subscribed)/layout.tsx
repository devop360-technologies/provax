import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";

import { appConfig } from "@/config";
import { getCurrentUser } from "@/lib/auth";

export default async function DashboardPaidLayout({ children }: Readonly<PropsWithChildren>) {
  const currentUser = await getCurrentUser();
  if (currentUser && !currentUser?.hasAccess) {
    redirect(appConfig.stripe.billingRoute);
  }

  return children;
}
