"use client";

import { Eye, Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface VersionHistoryRow {
  id: string;
  version: string;
  date: string;
  author: string;
  changes: string | number;
}

interface VersionHistoryTableProps {
  versions?: VersionHistoryRow[];
  onView?: (id: string) => void;
  onDownload?: (id: string) => void;
  className?: string;
}

export function VersionHistoryTable({
  versions = [
    {
      id: "1",
      version: "v2.3",
      date: "2023-10-15",
      author: "Updated banners, homepage text",
      changes: "12,458",
    },
    {
      id: "2",
      version: "v2.2",
      date: "2023-10-10",
      author: "Added highlight sections",
      changes: "-",
    },
    {
      id: "3",
      version: "v2.1",
      date: "2023-10-05",
      author: "Updated campaign blocks",
      changes: "8,745",
    },
    {
      id: "4",
      version: "v2.0",
      date: "2023-09-01",
      author: "Major homepage redesign",
      changes: "-",
    },
  ],
  onView,
  onDownload,
  className,
}: VersionHistoryTableProps) {
  return (
    <div className={cn("space-y-4 bg-[#1D1D41] p-4 border border-[#404254] rounded-2xl  ", className)}>
      {/* Header */}
      <h2 className="text-sm font-medium text-white">Version History</h2>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-[#404254] bg-[#1D1D41]">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#404254]">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">
                Version
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">
                Author
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">
                Changes
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {versions.map((version) => (
              <tr
                key={version.id}
                className="border-b border-[#404254] hover:bg-[#1a1d3a]/50 transition-colors"
              >
                <td className="px-4 py-3 text-sm font-medium text-white">
                  {version.version}
                </td>
                <td className="px-4 py-3 text-sm text-gray-400">
                  {version.date}
                </td>
                <td className="px-4 py-3 text-sm text-gray-400">
                  {version.author}
                </td>
                <td className="px-4 py-3 text-sm text-gray-400">
                  {version.changes}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onView?.(version.id)}
                      className="rounded-md bg-[#3B82F6] p-1.5 text-white transition-colors hover:bg-[#2563EB]"
                      title="View"
                    >
                      <Eye className="size-3" />
                    </button>
                    <button
                      onClick={() => onDownload?.(version.id)}
                      className="rounded-md bg-[#4F46E5] p-1.5 text-white transition-colors hover:bg-[#4338CA]"
                      title="Download"
                    >
                      <Download className="size-3" />
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
