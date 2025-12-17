"use client";

import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

type CampaignStatus = "Active" | "Scheduled" | "Draft" | "Inactive";

interface CampaignBlock {
  id: string;
  title: string;
  description: string;
  status: CampaignStatus;
  schedule: string;
  displayOrder: number;
}

interface CampaignBlocksProps {
  campaigns?: CampaignBlock[];
  onAdd?: () => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  className?: string;
}

const statusStyles: Record<CampaignStatus, string> = {
  Active: "bg-[#10B981] text-white",
  Scheduled: "bg-[#3B82F6] text-white",
  Draft: "bg-gray-600 text-white",
  Inactive: "bg-gray-500 text-white",
};

export function CampaignBlocks({
  campaigns = [
    {
      id: "1",
      title: "Black Friday Sale",
      description: "Special discounts on all services for Black Friday. Limited time offer!",
      status: "Active",
      schedule: "2023-11-20 to 2023-11-27",
      displayOrder: 1,
    },
    {
      id: "2",
      title: "New Year Promotion",
      description: "Start the new year with special offers on our premium services.",
      status: "Scheduled",
      schedule: "2023-12-26 to 2024-01-05",
      displayOrder: 2,
    },
  ],
  onAdd,
  onEdit,
  onDelete,
  className,
}: CampaignBlocksProps) {
  return (
    <div
      className={cn(
        "space-y-4 rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-white">Campaign Blocks</h2>
        <Button
          onClick={onAdd}
          className="h-8 gap-2 rounded-lg bg-[#3B82F6] px-3 text-xs font-medium text-white hover:bg-[#2563EB]"
        >
          <Plus className="size-3.5" />
          Create Campaign Block
        </Button>
      </div>

      {/* Campaign Items */}
      <div className="space-y-3">
        {campaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="rounded-lg border-l-4 border-l-[#4F46E5] border border-[#2a2d4a] bg-[#262656] p-4 transition-all hover:border-[#3a3d5a]"
          >
            {/* Header Row */}
            <div className="mb-2 flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-white">{campaign.title}</h3>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[9px] font-medium",
                    statusStyles[campaign.status]
                  )}
                >
                  {campaign.status}
                </span>
                <button
                  onClick={() => onEdit?.(campaign.id)}
                  className="rounded-md bg-[#4F46E5] p-1 text-white transition-colors hover:bg-[#4338CA]"
                >
                  <Edit2 className="size-3" />
                </button>
                <button
                  onClick={() => onDelete?.(campaign.id)}
                  className="rounded-md bg-[#EF4444] p-1 text-white transition-colors hover:bg-[#DC2626]"
                >
                  <Trash2 className="size-3" />
                </button>
              </div>
            </div>

            {/* Description */}
            <p className="mb-3 text-xs text-gray-300">{campaign.description}</p>

            {/* Footer Row */}
            <div className="flex items-center justify-between text-[10px] text-gray-400">
              <span>Schedule: {campaign.schedule}</span>
              <span>Display Order: {campaign.displayOrder}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
