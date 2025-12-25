import { ProvidetStatCard } from "@/provider-components/provider-stat-card";
import { AllReviews } from "@/provider-components/reviews";

export default function ProviderReviewsPage() {
  return (
    <div className="mr-0 md:mr-6 space-y-6">
      {/* Stats Grid - 4 columns */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <ProvidetStatCard
          title="Open Requests"
          value="12"
          change=""
          changeType="positive"
          iconSrc="/provax-dashboard/icons/users.png"
          iconBg="bg-[#64CFF6]"
        />
        <ProvidetStatCard
          title="Active Proposals"
          value="8"
          change=""
          changeType="positive"
          iconSrc="/provax-dashboard/icons/vehicle.png"
          iconBg="bg-[#64CFF6]"
        />
        <ProvidetStatCard
          title="Active Jobs"
          value="5"
          change=""
          changeType="positive"
          iconSrc="/provax-dashboard/icons/list.png"
          iconBg="bg-[#64CFF6]"
        />
        <ProvidetStatCard
          title="Escrow Value"
          value="7"
          change=""
          changeType="positive"
          iconSrc="/provax-dashboard/icons/services.png"
          iconBg="bg-[#64CFF6]"
        />
      </div>

      {/* All Reviews */}
      <AllReviews />
    </div>
  );
}
