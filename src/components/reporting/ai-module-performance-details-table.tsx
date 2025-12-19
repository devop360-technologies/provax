"use client";

import { cn } from "@/lib/utils";

interface AIModulePerformanceRow {
  moduleName: string;
  successRate: string;
  errorRate: string;
  avgProcessingTime: string;
  volumeProcessed: string;
  availability: string;
}

interface AIModulePerformanceDetailsTableProps {
  rows?: AIModulePerformanceRow[];
  className?: string;
}

const defaultRows: AIModulePerformanceRow[] = [
  {
    moduleName: "Structure Analysis",
    successRate: "98.2%",
    errorRate: "3.8%",
    avgProcessingTime: "2.4s",
    volumeProcessed: "12,458",
    availability: "99.8%",
  },
  {
    moduleName: "Text Extraction",
    successRate: "96.1%",
    errorRate: "5.9%",
    avgProcessingTime: "1.8s",
    volumeProcessed: "10,678",
    availability: "99.5%",
  },
  {
    moduleName: "Insight Generation",
    successRate: "92.8%",
    errorRate: "7.2%",
    avgProcessingTime: "3.2s",
    volumeProcessed: "8,342",
    availability: "98.3%",
  },
  {
    moduleName: "Glass Inspection",
    successRate: "98.8%",
    errorRate: "1.2%",
    avgProcessingTime: "2.1s",
    volumeProcessed: "6,745",
    availability: "99.7%",
  },
  {
    moduleName: "Functionality Check",
    successRate: "91.3%",
    errorRate: "8.7%",
    avgProcessingTime: "4.5s",
    volumeProcessed: "7,858",
    availability: "98.5%",
  },
];

export function AIModulePerformanceDetailsTable({
  rows = defaultRows,
  className,
}: AIModulePerformanceDetailsTableProps) {
  return (
    <div className={cn("rounded-lg border border-[#404254] bg-[#1D1D41] p-6", className)}>
      {/* Header */}
      <h3 className="mb-4 text-base font-medium text-white">
        AI Module Performance Details
      </h3>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#404254]">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">
                AI Module
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">
                Success Rate
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">
                Error Rate
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">
                Average Processing Time
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">
                Volume Processed
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">
                Availability
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={index}
                className="border-b border-[#404254] transition-colors hover:bg-[#252850]"
              >
                <td className="px-4 py-3 text-sm text-white">{row.moduleName}</td>
                <td className="px-4 py-3 text-sm font-medium text-[#22C55E]">
                  {row.successRate}
                </td>
                <td className="px-4 py-3 text-sm font-medium text-[#FF6B6B]">
                  {row.errorRate}
                </td>
                <td className="px-4 py-3 text-sm text-white">
                  {row.avgProcessingTime}
                </td>
                <td className="px-4 py-3 text-sm text-white">
                  {row.volumeProcessed}
                </td>
                <td className="px-4 py-3 text-sm text-[#10B981]">
                  {row.availability}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
