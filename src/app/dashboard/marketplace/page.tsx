import { redirect } from "next/navigation";

import { DashboardStatsGrid } from "@/components/dashboard/dashboard-stats-grid";
import { DashboardTitle } from "@/components/dashboard-title";
import { VehicleMarketplaceManagement } from "@/components/vehicle-marketplace-management/vehicle-marketplace-management";
import { appConfig } from "@/config";
import { users } from "@/data/users";
import { getCurrentUser } from "@/lib/auth";

export default async function MarketplacePage() {
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
      <VehicleMarketplaceManagement users={users} />
    </div>
  );
}
