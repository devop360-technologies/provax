"use client";

import { cn } from "@/lib/utils";

interface ActivityLogItemProps {
  userName: string;
  action: string;
  description?: string;
  timestamp: string;
  className?: string;
}

export function ActivityLogItem({
  userName,
  action,
  description,
  timestamp,
  className,
}: ActivityLogItemProps) {
  return (
    <div
      className={cn(
        "border-l-4 rounded-2xl border-l-[#00D9FF] bg-[#26244A] p-4 transition-all hover:bg-[#1a1d3a]",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-white">{userName}</h3>
          <p className="mt-1 text-sm text-gray-300">{action}</p>
          {description && (
            <p className="mt-1 text-xs text-gray-500">{description}</p>
          )}
        </div>
        <div className="ml-4 text-right">
          <p className="text-xs text-gray-400 whitespace-nowrap">{timestamp}</p>
        </div>
      </div>
    </div>
  );
}
