"use client";

import { cn } from "@/lib/utils";

type StatusBadgeType = "COMPLETED" | "PENDING" | "VERIFIED" | "APPROVED";

interface RevenueAnalyticsRow {
  id: string;
  amount: string;
  description: string;
  status: StatusBadgeType;
  daysOpen?: string;
  notes?: string;
  resolutions?: string;
}

interface RevenueAnalyticsTableProps {
  rows?: RevenueAnalyticsRow[];
  className?: string;
}

const defaultRows: RevenueAnalyticsRow[] = [
  {
    id: "ASOP-9541",
    amount: "$1,200",
    description: "John Swan on Tech Startups",
    status: "COMPLETED",
    daysOpen: "5",
    notes: "-",
    resolutions: "-",
  },
  {
    id: "ASOP-8331",
    amount: "$309",
    description: "Sarah Johnson on Global Certifications",
    status: "PENDING",
    daysOpen: "2",
    notes: "-",
    resolutions: "-",
  },
  {
    id: "ASOP-4342",
    amount: "$455",
    description: "Michael Brown on Service Pro",
    status: "VERIFIED",
    daysOpen: "7",
    notes: "Split refund",
    resolutions: "-",
  },
  {
    id: "ASOP-9321",
    amount: "$342",
    description: "Emily Davis on Sushi Master",
    status: "APPROVED",
    daysOpen: "3",
    notes: "-",
    resolutions: "Returned to Processor",
  },
  {
    id: "ASOP-6128",
    amount: "$1,600",
    description: "Robert Miller on AI Experts",
    status: "VERIFIED",
    daysOpen: "8",
    notes: "-",
    resolutions: "Returned to Card",
  },
];

const statusColorMap: Record<StatusBadgeType, { bg: string; text: string }> = {
  COMPLETED: { bg: "bg-[#F59E0B]/20", text: "text-[#F59E0B]" },
  PENDING: { bg: "bg-[#3B82F6]/20", text: "text-[#3B82F6]" },
  VERIFIED: { bg: "bg-[#10B981]/20", text: "text-[#10B981]" },
  APPROVED: { bg: "bg-[#8B5CF6]/20", text: "text-[#8B5CF6]" },
};

export function RevenueAnalyticsTable({
  rows = defaultRows,
  className,
}: RevenueAnalyticsTableProps) {
  return (
    <div className={cn("rounded-lg border border-[#404254] bg-[#1D1D41] p-6", className)}>
      {/* Header */}
      <h3 className="mb-4 text-base font-medium text-white">Revenue Analytics</h3>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#404254]">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">
                Source ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">
                Amount
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">
                Details
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">
                Days Open
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">
                Notes
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">
                Resolutions
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => {
              const statusStyle = statusColorMap[row.status];
              return (
                <tr
                  key={index}
                  className="border-b border-[#404254] transition-colors hover:bg-[#252850]"
                >
                  <td className="px-4 py-3 text-sm font-medium text-white">
                    {row.id}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-white">
                    {row.amount}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-300">
                    {row.description}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "inline-block px-2.5 py-1 rounded text-xs font-medium",
                        statusStyle.bg,
                        statusStyle.text
                      )}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-300">
                    {row.daysOpen}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{row.notes}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {row.resolutions}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
