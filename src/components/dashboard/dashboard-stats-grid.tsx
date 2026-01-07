import { StatCard } from "@/components/dashboard/stat-card";

interface DashboardStatsGridProps {
  stats?: {
    title: string;
    value: string;
    change: string;
    iconSrc: string;
  }[];
}

const defaultStats = [
  {
    title: "Total Active Listings",
    value: "12,458",
    change: "+2.5% from last month",
    iconSrc: "/provax-dashboard/icons/front.png",
  },
  {
    title: "Total Views",
    value: "3,742",
    change: "+0.5% from last month",
    iconSrc: "/provax-dashboard/icons/tw.png",
  },
  {
    title: "Avg Processing Time",
    value: "8,921",
    change: "+12.4% from last month",
    iconSrc: "/provax-dashboard/icons/clock.png",
  },
  {
    title: "Total Posts",
    value: "1,245",
    change: "",
    iconSrc: "/provax-dashboard/icons/dollar.png",
  },
];

export function DashboardStatsGrid({
  stats = defaultStats,
}: Readonly<DashboardStatsGridProps>) {
  return (
    <div className="grid grid-cols-1 mr-0 md:mr-6 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          changeType="positive"
          iconSrc={stat.iconSrc}
          iconBg="bg-[#64CFF6]"
        />
      ))}
    </div>
  );
}
