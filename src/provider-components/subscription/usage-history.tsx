"use client";

import { Award, Car, Bot, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface UsageStat {
  name: string;
  current: number | string;
  max?: number;
  percentage?: number;
  description: string;
  color: string;
  icon: "certifications" | "vehicle" | "ai";
  buttonText?: string;
  onButtonClick?: () => void;
}

interface UsageHistoryItem {
  month: string;
  certifications: string;
  listings: string;
  totalListings: number;
  status: "Active" | "Near Limit" | "Limit Reached" | "Paid";
}

interface UsageHistoryProps {
  className?: string;
  stats?: UsageStat[];
  history?: UsageHistoryItem[];
  onPurchaseMore?: () => void;
}

const defaultStats: UsageStat[] = [
  {
    name: "Certifications",
    current: 12,
    max: 25,
    percentage: 48,
    description: "48% of monthly limit used",
    color: "#64CFF6",
    icon: "certifications",
    buttonText: "Purchase More"
  },
  {
    name: "Vehicle Listings",
    current: 12,
    max: 25,
    percentage: 53,
    description: "53% of monthly limit used",
    color: "#22C55E",
    icon: "vehicle",
    buttonText: "Request Increase"
  },
  {
    name: "AI Reports",
    current: "24",
    max: 25,
    percentage: 53,
    description: "Generated this month",
    color: "#FF8104",
    icon: "ai",
    // buttonText: "Request Increase"
  }
];

const defaultHistory: UsageHistoryItem[] = [
  {
    month: "August 2023",
    certifications: "12/25",
    listings: "8/15",
    totalListings: 24,
    status: "Active"
  },
  {
    month: "July 2023",
    certifications: "22/25",
    listings: "12/15",
    totalListings: 42,
    status: "Near Limit"
  },
  {
    month: "June 2023",
    certifications: "25/25",
    listings: "15/15",
    totalListings: 38,
    status: "Limit Reached"
  },
  {
    month: "May 2023",
    certifications: "18/25",
    listings: "10/15",
    totalListings: 31,
    status: "Paid"
  }
];

const IconComponent = ({ icon }: { icon: UsageStat["icon"] }) => {
  const iconMap = {
    certifications: Award,
    vehicle: Car,
    ai: Bot
  };
  const Icon = iconMap[icon];
  return <Icon className="h-6 w-6 text-white" />;
};

const statusStyles: Record<UsageHistoryItem["status"], string> = {
  Active: "bg-[#22C55E]/20 text-[#22C55E]",
  "Near Limit": "bg-[#FBBF24]/20 text-[#FBBF24]",
  "Limit Reached": "bg-[#F87171]/20 text-[#F87171]",
  Paid: "bg-[#22C55E]/20 text-[#22C55E]"
};

export function UsageHistory({
  className,
  stats = defaultStats,
  history = defaultHistory,
  onPurchaseMore
}: UsageHistoryProps) {
  // Add click handlers to stats
  const statsWithHandlers = stats.map((stat) => ({
    ...stat,
    onButtonClick: stat.buttonText === "Purchase More" ? onPurchaseMore : stat.onButtonClick
  }));

  return (
    <div className={cn("space-y-6", className)}>
      {/* Usage Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {statsWithHandlers.map((stat) => (
          <div key={stat.name} className="relative rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6">
            <div className="mb-4 flex items-start justify-between">
              <h3 className="text-sm font-medium text-gray-400">{stat.name}</h3>
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ backgroundColor: stat.color }}
              >
                <IconComponent icon={stat.icon} />
              </div>
            </div>

            <div className="mb-2">
              <span className="text-3xl font-bold text-white">
                {typeof stat.current === "number" && stat.max
                  ? `${stat.current}/${stat.max}`
                  : stat.current}
              </span>
            </div>

            <p className="mb-4 text-sm text-gray-400">{stat.description}</p>

            {stat.percentage !== undefined && (
              <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-[#2a2d4a]">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${stat.percentage}%`,
                    backgroundColor: stat.color
                  }}
                />
              </div>
            )}

            {stat.buttonText && (
              <button
                onClick={stat.onButtonClick}
                className="flex items-center gap-2 rounded-lg bg-[#3B82F6] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#2563EB]"
              >
                <Plus size={16} />
                {stat.buttonText}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Usage History Table */}
      <div className="rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6">
        <h3 className="mb-6 text-lg font-semibold text-white">Usage History</h3>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2a2d4a]">
                <th className="px-4 py-4 text-left text-sm font-medium text-gray-400">Mont</th>
                <th className="px-4 py-4 text-left text-sm font-medium text-gray-400">
                  Certifications
                </th>
                <th className="px-4 py-4 text-left text-sm font-medium text-gray-400">Listings</th>
                <th className="px-4 py-4 text-left text-sm font-medium text-gray-400">Listings</th>
                <th className="px-4 py-4 text-left text-sm font-medium text-gray-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => (
                <tr key={item.month} className="border-b border-[#2a2d4a] last:border-b-0">
                  <td className="px-4 py-4 text-sm text-gray-300">{item.month}</td>
                  <td className="px-4 py-4 text-sm text-gray-300">{item.certifications}</td>
                  <td className="px-4 py-4 text-sm text-gray-300">{item.listings}</td>
                  <td className="px-4 py-4 text-sm text-gray-300">{item.totalListings}</td>
                  <td className="px-4 py-4">
                    <span
                      className={cn(
                        "inline-flex items-center rounded px-3 py-1 text-xs font-medium",
                        statusStyles[item.status]
                      )}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
