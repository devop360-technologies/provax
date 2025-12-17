"use client";

import { Button } from "@/components/ui/button";
import { ActivityLogItem } from "./activity-log-item";
import { cn } from "@/lib/utils";

interface Activity {
  id: string;
  userName: string;
  action: string;
  description?: string;
  timestamp: string;
}

interface ActivityLogsProps {
  activities?: Activity[];
  onViewAll?: () => void;
  className?: string;
}

export function ActivityLogs({
  activities = [
    {
      id: "1",
      userName: "Sarah Johnson",
      action: "Updated homepage banner 'Summer Sale'",
      description: "Changed banner image and schedule",
      timestamp: "2023-10-16 14:30",
    },
    {
      id: "2",
      userName: "Michael Brown",
      action: "Created new email campaign 'Black Friday Sale'",
      description: "Scheduled for 2023-11-20",
      timestamp: "2023-10-15 12:15",
    },
    {
      id: "3",
      userName: "John Smith",
      action: "Edited transactional template 'Welcome Email'",
      description: "Updated subject line and body content",
      timestamp: "2023-10-14 16:45",
    },
    {
      id: "4",
      userName: "Sarah Johnson",
      action: "Sarah Johnson",
      description: "Changed banner image and schedule",
      timestamp: "2023-10-14 12:20",
    },
    {
      id: "5",
      userName: "Emily Davis",
      action: "Added new highlight section 'Customer Testimonials'",
      description: "Changed banner image and schedule",
      timestamp: "2023-10-11 09:30",
    },
    {
      id: "6",
      userName: "Michael Brown",
      action: "Created campaign block 'New Year Promotion'",
      description: "Scheduled for 2023-12-26 to 2024-01-05",
      timestamp: "2023-10-10 17:15",
    },
  ],
  onViewAll,
  className,
}: ActivityLogsProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-white">Activity Log</h2>
        <Button
          onClick={onViewAll}
          className="h-8 rounded-lg border border-[#3B82F6] bg-transparent px-4 text-xs font-medium text-[#3B82F6] hover:bg-[#3B82F6]/10"
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
