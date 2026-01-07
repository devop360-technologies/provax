"use client";

import { cn } from "@/lib/utils";

interface EscrowStatCardProps {
  label: string;
  value: string;
  description: string;
}

function EscrowStatCard({ label, value, description }: EscrowStatCardProps) {
  return (
    <div className="rounded-xl border border-[#2a2d4a] bg-[#1D1D41]/50 p-5">
      <p className="text-xs text-gray-400 mb-2">{label}</p>
      <p className="text-2xl font-bold text-white mb-1">{value}</p>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  );
}

interface ReleaseScheduleItem {
  date: string;
  service: string;
  amount: string;
  status: "Pending Release" | "Approved";
}

interface EscrowBalancePanelProps {
  className?: string;
  blockedAmount?: string;
  releasedAmount?: string;
  upcomingReleases?: string;
  releaseSchedule?: ReleaseScheduleItem[];
}

const defaultSchedule: ReleaseScheduleItem[] = [
  {
    date: "Nov 15, 2023",
    service: "Auto Pro Repair",
    amount: "$1,250.00",
    status: "Pending Release",
  },
  {
    date: "Nov 22, 2023",
    service: "Auto Pro Repair",
    amount: "$2,500.00",
    status: "Approved",
  },
];

export function EscrowBalancePanel({
  className,
  blockedAmount = "$2,500.00",
  releasedAmount = "$1,250.00",
  upcomingReleases = "$3,750.00",
  releaseSchedule = defaultSchedule,
}: EscrowBalancePanelProps) {
  return (
    <div className={cn("rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6", className)}>
      {/* Header */}
      <h3 className="text-lg font-semibold text-white mb-6">Escrow Balance Panel</h3>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <EscrowStatCard
          label="Blocked Amount"
          value={blockedAmount}
          description="Held in escrow for active jobs"
        />
        <EscrowStatCard
          label="Released Amount"
          value={releasedAmount}
          description="Released this month"
        />
        <EscrowStatCard
          label="Upcoming Releases"
          value={upcomingReleases}
          description="Scheduled for next 30 days"
        />
      </div>

      {/* Release Schedule */}
      <div>
        <h4 className="text-base font-medium text-white mb-4">Release Schedule</h4>
        <div className="space-y-3">
          {releaseSchedule.map((item) => (
            <div
              key={`${item.date}-${item.service}`}
              className="flex items-center justify-between py-3 border-t border-[#2a2d4a] first:border-t-0"
            >
              <div className="flex-1">
                <p className="text-sm text-white">{item.date}</p>
                <p className="text-xs text-gray-500">{item.service}</p>
              </div>
              <div className="flex-1 text-center">
                <p className="text-sm font-medium text-white">{item.amount}</p>
              </div>
              <div className="flex-1 text-right">
                <span
                  className={cn(
                    "inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium",
                    item.status === "Approved"
                      ? "bg-[#22C55E]/20 text-[#22C55E]"
                      : "bg-[#FBBF24]/20 text-[#FBBF24]"
                  )}
                >
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
