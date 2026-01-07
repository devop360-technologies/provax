import { redirect } from "next/navigation";

import { DashboardTitle } from "@/components/dashboard-title";
import { appConfig } from "@/config";
import { getCurrentUser } from "@/lib/auth";
import { DashboardStatsGrid } from "@/components/dashboard/dashboard-stats-grid";
import { ServiceBidding } from "@/components/service-bidding/service-bidding";
import { users } from "@/data/users";

export default async function ServiceBiddingPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect(appConfig.auth.login);
  }

  return (
    <div className="space-y-6">
      <DashboardTitle
        heading="Vehicle Marketplace Management"
        text="Manage your AI marketplace listings and activities"
      />
      <DashboardStatsGrid />
      <ServiceBidding users={users} />
    </div>
  );
}