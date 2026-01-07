import { ProvidetStatCard } from "@/provider-components/provider-stat-card";

interface ProviderStatsGridProps {
  openRequests?: string;
  activeProposals?: string;
  activeJobs?: string;
  escrowValue?: string;
}

export function ProviderStatsGrid({
  openRequests = "12",
  activeProposals = "8",
  activeJobs = "5",
  escrowValue = "7",
}: Readonly<ProviderStatsGridProps>) {
  const stats = [
    {
      title: "Open Requests",
      value: openRequests,
      iconSrc: "/provax-dashboard/icons/users.png",
    },
    {
      title: "Active Proposals",
      value: activeProposals,
      iconSrc: "/provax-dashboard/icons/vehicle.png",
    },
    {
      title: "Active Jobs",
      value: activeJobs,
      iconSrc: "/provax-dashboard/icons/list.png",
    },
    {
      title: "Escrow Value",
      value: escrowValue,
      iconSrc: "/provax-dashboard/icons/services.png",
    },
  ];

  return (
    <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <ProvidetStatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          change=""
          changeType="positive"
          iconSrc={stat.iconSrc}
          iconBg="bg-[#64CFF6]"
        />
      ))}
    </div>
  );
}
