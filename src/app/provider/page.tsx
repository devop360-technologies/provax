import { Dashboard } from "@/provider-components/dashboard";
import { ProvidetStatCard } from "@/provider-components/provider-stat-card";

export default function ProviderDashboardPage() {
  return (
  <div className="mr-0 md:mr-10 bg-[#141332] space-y-6">
        {/* Stats Grid - 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <ProvidetStatCard
            title="Assigned certifications"
            value="12"
            change="Active"
            changeType="positive"
            iconSrc="/provax-dashboard/icons/users.png"
            iconBg="bg-[#64CFF6]"
          />
          <ProvidetStatCard
            title="Certifications awaiting media upload"
            value="8"
            change="100"
            changeType="positive"
            iconSrc="/provax-dashboard/icons/vehicle.png"
            iconBg="bg-[#64CFF6]"
          />
          <ProvidetStatCard
            title="Jobs in progress"
            value="5"
            change="2-Pending"
            changeType="positive"
            iconSrc="/provax-dashboard/icons/list.png"
            iconBg="bg-[#64CFF6]"
          />
          <ProvidetStatCard
            title="Completed jobs"
            value="7"
            change="3-Active"
            changeType="positive"
            iconSrc="/provax-dashboard/icons/services.png"
            iconBg="bg-[#64CFF6]"
          />
        </div>
  
        {/* Second Row Stats - 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <ProvidetStatCard
            title="Proposals sent"
            value="4"
            change="2-New"
            changeType="positive"
            iconSrc="/provax-dashboard/icons/sub.png"
            iconBg="bg-[#64CFF6]"
          />
          <ProvidetStatCard
            title="Total earnings"
            value="39"
            change="12"
            changeType="positive"
            iconSrc="/provax-dashboard/icons/renvenue.png"
            iconBg="bg-[#64CFF6]"
          />
          <ProvidetStatCard
            title="Earnings awaiting release (escrow)"
            value="$9,700"
            change="+3.6% from last month"
            changeType="positive"
            iconSrc="/provax-dashboard/icons/balance.png"
            iconBg="bg-[#64CFF6]"
          />
        </div>
        
    <Dashboard/>
  </div>
  );
}
