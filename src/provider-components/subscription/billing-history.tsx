"use client";

import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface BillingHistoryItem {
  date: string;
  description: string;
  amount: string;
  status: "Paid" | "Pending" | "Failed";
}

interface BillingHistoryProps {
  className?: string;
  data?: BillingHistoryItem[];
  onDownloadAll?: () => void;
  onDownloadInvoice?: (item: BillingHistoryItem) => void;
}

const defaultData: BillingHistoryItem[] = [
  { date: "Sep 15, 2023", description: "Professional Plan - Monthly", amount: "$49.00", status: "Paid" },
  { date: "Aug 15, 2023", description: "Professional Plan - Monthly", amount: "$49.00", status: "Paid" },
  { date: "Jul 15, 2023", description: "Professional Plan - Monthly", amount: "$49.00", status: "Paid" },
  { date: "Jun 15, 2023", description: "Basic to Professional Upgrade", amount: "$30.00", status: "Paid" },
  { date: "Jun 15, 2023", description: "Basic Plan - Monthly", amount: "$19.00", status: "Paid" },
  { date: "May 15, 2023", description: "Basic Plan - Monthly", amount: "$19.00", status: "Paid" },
];

const statusStyles: Record<BillingHistoryItem["status"], string> = {
  Paid: "bg-[#22C55E]/20 text-[#22C55E]",
  Pending: "bg-[#FBBF24]/20 text-[#FBBF24]",
  Failed: "bg-[#F87171]/20 text-[#F87171]",
};

export function BillingHistory({
  className,
  data = defaultData,
  onDownloadAll,
  onDownloadInvoice,
}: BillingHistoryProps) {
  return (
    <div className={cn("rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Billing & Payment History</h3>
        <button
          onClick={onDownloadAll}
          className="flex items-center gap-2 rounded-lg bg-[#3083FF] px-4 py-2 text-sm font-medium text-white hover:bg-[#00B8E0] transition-colors"
        >
          Download All Invoices
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#2a2d4a]">
              <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">
                Date
              </th>
              <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">
                Description
              </th>
              <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">
                Amount
              </th>
              <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">
                Status
              </th>
              <th className="text-right py-4 px-4 text-sm font-medium text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={`${item.date}-${item.description}`}
                className="border-b border-[#2a2d4a] last:border-b-0"
              >
                <td className="py-4 px-4 text-sm text-gray-300">{item.date}</td>
                <td className="py-4 px-4 text-sm text-gray-300">
                  {item.description}
                </td>
                <td className="py-4 px-4 text-sm text-white">{item.amount}</td>
                <td className="py-4 px-4">
                  <span
                    className={cn(
                      "inline-flex items-center rounded px-3 py-1 text-xs font-medium",
                      statusStyles[item.status]
                    )}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex justify-end">
                    <button
                      onClick={() => onDownloadInvoice?.(item)}
                      className="flex items-center gap-1.5 rounded-lg border border-[#2a2d4a] bg-transparent px-3 py-1.5 text-xs font-medium text-gray-300 hover:bg-[#2a2d4a] transition-colors"
                    >
                      <Download size={14} />
                      Download
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
