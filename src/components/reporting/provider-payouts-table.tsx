"use client";

import { Download, FileText, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProviderPayoutRow {
  period: string;
  totalPayouts: string;
  completed: string;
  pending: string;
  failed: string;
  avgProcessingTime: string;
}

interface ProviderPayoutsTableProps {
  rows?: ProviderPayoutRow[];
  className?: string;
  onExportCSV?: () => void;
  onExportPDF?: () => void;
  onShowDetails?: () => void;
}

const defaultRows: ProviderPayoutRow[] = [
  {
    period: "October 2023",
    totalPayouts: "$88,804",
    completed: "$82,544",
    pending: "$4,176",
    failed: "$1,341",
    avgProcessingTime: "2.4 days",
  },
  {
    period: "September 2023",
    totalPayouts: "$78,521",
    completed: "$70,156",
    pending: "$5,840",
    failed: "$1,281",
    avgProcessingTime: "3.1 days",
  },
  {
    period: "August 2023",
    totalPayouts: "$78,454",
    completed: "$74,214",
    pending: "$3,178",
    failed: "$1,223",
    avgProcessingTime: "2.7 days",
  },
  {
    period: "July 2023",
    totalPayouts: "$71,488",
    completed: "$66,341",
    pending: "$4,016",
    failed: "$993",
    avgProcessingTime: "3.3 days",
  },
  {
    period: "June 2023",
    totalPayouts: "$83,874",
    completed: "$82,419",
    pending: "$1,520",
    failed: "$970",
    avgProcessingTime: "2.9 days",
  },
];

export function ProviderPayoutsTable({
  rows = defaultRows,
  className,
  onExportCSV,
  onExportPDF,
  onShowDetails,
}: ProviderPayoutsTableProps) {
  return (
    <div className={cn("rounded-lg border border-[#404254] bg-[#1D1D41] p-6", className)}>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-medium text-white">Provider Payouts</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={onExportCSV}
            className="flex items-center gap-1 rounded bg-[#10B981] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#059669] transition-colors"
          >
            <Download size={14} />
            Export CSV
          </button>
          <button
            onClick={onExportPDF}
            className="flex items-center gap-1 rounded bg-[#FF6B6B] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#EF4444] transition-colors"
          >
            <FileText size={14} />
            Export PDF
          </button>
          <button
            onClick={onShowDetails}
            className="flex items-center gap-1 rounded border border-[#00D9FF] px-3 py-1.5 text-xs font-medium text-[#00D9FF] hover:bg-[#1D1D41] transition-colors"
          >
            <Eye size={14} />
            Show Details
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#404254]">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">
                Period
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">
                Total Payouts
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">
                Completed
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">
                Pending
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">
                Failed
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">
                Average Processing Time
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={index}
                className="border-b border-[#404254] transition-colors hover:bg-[#252850]"
              >
                <td className="px-4 py-3 text-sm text-white">{row.period}</td>
                <td className="px-4 py-3 text-sm font-medium text-white">
                  {row.totalPayouts}
                </td>
                <td className="px-4 py-3 text-sm text-white">{row.completed}</td>
                <td className="px-4 py-3 text-sm text-white">{row.pending}</td>
                <td className="px-4 py-3 text-sm text-white">{row.failed}</td>
                <td className="px-4 py-3 text-sm text-gray-300">
                  {row.avgProcessingTime}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
