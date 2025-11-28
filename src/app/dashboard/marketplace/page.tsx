import { Metadata } from "next";
import { redirect } from "next/navigation";

import { DashboardTitle } from "@/components/dashboard-title";
import { appConfig } from "@/config";
import { users } from "@/data/users";
import { getCurrentUser } from "@/lib/auth";
import { createMetadata } from "@/lib/metadata";
import { StatCard } from "@/components/dashboard";
import { VehicleMarketplaceManagement } from "@/components/vehicle-marketplace-management/vehicle-marketplace-management";

export default async function MarketplacePage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect(appConfig.auth.login);
  }

  // Only allow admin users to access this page
  //   if (!currentUser.isAdmin) {
  //     redirect("/dashboard");
  //   }

  // Fetch users from the database
  // const users = await getUsers();

  return (
    <div className="space-y-6">
      <DashboardTitle
        heading="Vehicle Marketplace Management"
        text="Manage your AI marketplace listings and activities"
      />

      
 {/* Stats Grid - 4 columns */}
      <div className="grid grid-cols-1 mr-0 md:mr-6 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Active Listings"
          value="12,458"
          change="+2.5% from last month"
          changeType="positive"
          iconSrc="/provax-dashboard/icons/front.png"
          iconBg="bg-[#64CFF6]"
        />
        <StatCard
          title="Total Views"
          value="3,742"
          change="+0.5% from last month"
          changeType="positive"
          iconSrc="/provax-dashboard/icons/tw.png"
          iconBg="bg-[#64CFF6]"
        />
        <StatCard
          title="Avg Processing Time"
          value="8,921"
          change="+12.4% from last month"
          changeType="positive"
          iconSrc="/provax-dashboard/icons/clock.png"
          iconBg="bg-[#64CFF6]"
        />
        <StatCard
          title="Total Posts"
          value="1,245"
          change=""
          changeType="positive"
          iconSrc="/provax-dashboard/icons/dollar.png"
          iconBg="bg-[#64CFF6]"
        />
      </div>

      <VehicleMarketplaceManagement users={users} />
    </div>
  );
}
