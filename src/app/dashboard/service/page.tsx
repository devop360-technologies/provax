import { redirect } from "next/navigation";

import { DashboardTitle } from "@/components/dashboard-title";
import { appConfig } from "@/config";
import { getCurrentUser } from "@/lib/auth";
import { StatCard } from "@/components/dashboard";
import { ServiceBidding } from "@/components/service-bidding/service-bidding";

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

      <ServiceBidding users={users} />
    </div>
  );
}