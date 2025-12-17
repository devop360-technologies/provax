"use client";

import { Button } from "@/components/ui/button";
import { Eye, Edit2, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

type CampaignStatus = "Active" | "Scheduled" | "Draft";

interface MarketingCampaign {
  id: string;
  name: string;
  audience: string;
  status: CampaignStatus;
  sent: number | string;
  openRate: number | string;
  clickRate: number | string;
}

interface MarketingCampaignsTableProps {
  campaigns?: MarketingCampaign[];
  onViewAll?: () => void;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  className?: string;
}

const statusStyles: Record<CampaignStatus, string> = {
  Active: "bg-[#10B981] text-white",
  Scheduled: "bg-[#3B82F6] text-white",
  Draft: "bg-gray-600 text-white",
};

export function MarketingCampaignsTable({
  campaigns = [
    {
      id: "1",
      name: "Black Friday Sale",
      audience: "All Users",
      status: "Active",
      sent: "12,458",
      openRate: "28.5%",
      clickRate: "9.8%",
    },
    {
      id: "2",
      name: "New Feature Announcement",
      audience: "Active User",
      status: "Scheduled",
      sent: "-",
      openRate: "-",
      clickRate: "-",
    },
    {
      id: "3",
      name: "Weekly Newsletter",
      audience: "Subscription",
      status: "Active",
      sent: "8,745",
      openRate: "22.3%",
      clickRate: "7.2%",
    },
    {
      id: "4",
      name: "Holiday Promotion",
      audience: "Premium User",
      status: "Draft",
      sent: "-",
      openRate: "-",
      clickRate: "-",
    },
  ],
  onViewAll,
  onView,
  onEdit,
  onDelete,
  className,
}: MarketingCampaignsTableProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-white">Marketing Campaigns</h2>
        <Button
          onClick={onViewAll}
          className="h-8 rounded-lg border border-[#3B82F6] bg-transparent px-4 text-xs font-medium text-[#3B82F6] hover:bg-[#3B82F6]/10"
        >
          View All Templates
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-[#404254] bg-[#0f1123]">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#404254]">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">
                Campaign Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">
                Audience
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">
                Sent
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">
                Open Rate
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">
                Click Rate
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <tr
                key={campaign.id}
                className="border-b border-[#404254] hover:bg-[#1a1d3a]/50 transition-colors"
              >
                <td className="px-4 py-3 text-sm text-white">
                  {campaign.name}
                </td>
                <td className="px-4 py-3 text-sm text-gray-400">
                  {campaign.audience}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "inline-block rounded-full px-2.5 py-0.5 text-[9px] font-medium",
                      statusStyles[campaign.status]
                    )}
                  >
                    {campaign.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-400">
                  {campaign.sent}
                </td>
                <td className="px-4 py-3 text-sm text-[#FF6B6B] font-medium">
                  {campaign.openRate}
                </td>
                <td className="px-4 py-3 text-sm text-[#FFB84D] font-medium">
                  {campaign.clickRate}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onView?.(campaign.id)}
                      className="rounded-md bg-[#3B82F6] p-1.5 text-white transition-colors hover:bg-[#2563EB]"
                      title="View"
                    >
                      <Eye className="size-3" />
                    </button>
                    <button
                      onClick={() => onEdit?.(campaign.id)}
                      className="rounded-md bg-[#4F46E5] p-1.5 text-white transition-colors hover:bg-[#4338CA]"
                      title="Edit"
                    >
                      <Edit2 className="size-3" />
                    </button>
                    <button
                      onClick={() => onDelete?.(campaign.id)}
                      className="rounded-md bg-[#EF4444] p-1.5 text-white transition-colors hover:bg-[#DC2626]"
                      title="Delete"
                    >
                      <Trash2 className="size-3" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
