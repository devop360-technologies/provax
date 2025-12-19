"use client";

import { cn } from "@/lib/utils";

interface ReportingStatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  icon: React.ReactNode;
  iconBg: string;
}

export function ReportingStatCard({
  title,
  value,
  change,
  changeType,
  icon,
  iconBg,
}: ReportingStatCardProps) {
  return (
    <div className="rounded-lg border border-[#404254] bg-[#1D1D41] p-4">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs text-gray-400 font-medium mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-white">{value}</h3>
        </div>
        <div className={cn("rounded-lg p-2", iconBg)}>
          {icon}
        </div>
      </div>
      <p
        className={cn(
          "text-xs font-medium",
          changeType === "positive" ? "text-[#10B981]" : "text-[#FF6B6B]"
        )}
      >
        {changeType === "positive" ? "↑" : "↓"} {change}
      </p>
    </div>
  );
}
