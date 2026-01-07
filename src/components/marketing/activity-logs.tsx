"use client";

import { Button } from "@/components/ui/button";
import { ActivityLogItem } from "./activity-log-item";
import { cn } from "@/lib/utils";
import { Activity, DEFAULT_ACTIVITIES } from "@/data/marketing-data";

interface ActivityLogsProps {
  activities?: Activity[];
  onViewAll?: () => void;
  className?: string;
}

export function ActivityLogs({
  activities = DEFAULT_ACTIVITIES,
  onViewAll,
  className,
}: ActivityLogsProps) {
  return (
    <div className={cn("space-y-4 bg-[#1D1D41] p-6 border border-[#404254] rounded-2xl", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-white">Activity Log</h2>
        <Button
          onClick={onViewAll}
          className="h-8 rounded border border-[#3B82F6] bg-transparent px-4 text-xs font-medium text-[#3B82F6] hover:bg-[#3B82F6]/10"
        >
          View All Templates
        </Button>
      </div>

      {/* Activity Items */}
      <div className="space-y-2">
        {activities.map((activity) => (
          <ActivityLogItem
            key={activity.id}
            userName={activity.userName}
            action={activity.action}
            description={activity.description}
            timestamp={activity.timestamp}
          />
        ))}
      </div>
    </div>
  );
}
