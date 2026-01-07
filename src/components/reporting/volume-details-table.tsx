"use client";

import { cn } from "@/lib/utils";

interface VolumeDetailsRow {
  period: string;
  certifications: number;
  marketplaceListings: number;
  serviceRequests: number;
  jobCompletions: number;
  growthRate: string;
}

interface VolumeDetailsTableProps {
  rows?: VolumeDetailsRow[];
  className?: string;
}

const defaultRows: VolumeDetailsRow[] = [
  {
    period: "October 2023",
    certifications: 1245,
    marketplaceListings: 892,
    serviceRequests: 756,
    jobCompletions: 642,
    growthRate: "+8.3%",
  },
  {
    period: "September 2023",
    certifications: 1147,
    marketplaceListings: 831,
    serviceRequests: 698,
    jobCompletions: 587,
    growthRate: "+5.2%",
  },
  {
    period: "August 2023",
    certifications: 1089,
    marketplaceListings: 789,
    serviceRequests: 663,
    jobCompletions: 558,
    growthRate: "+7.1%",
  },
  {
    period: "July 2023",
    certifications: 1017,
    marketplaceListings: 728,
    serviceRequests: 619,
    jobCompletions: 521,
    growthRate: "+8.3%",
  },
  {
    period: "June 2023",
    certifications: 958,
    marketplaceListings: 685,
    serviceRequests: 582,
    jobCompletions: 489,
    growthRate: "+4.8%",
  },
];

export function VolumeDetailsTable({
  rows = defaultRows,
  className,
}: VolumeDetailsTableProps) {
  return (
    <div className={cn("rounded-lg border border-[#404254] bg-[#1D1D41] p-6", className)}>
      {/* Header */}
      <h3 className="mb-4 text-base font-medium text-white">Volume Details</h3>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#404254]">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">
                Period
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">
                Certifications
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">
                Marketplace Listings
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">
                Service Requests
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">
                Job Completions
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">
                Growth Rate
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.period}
                className="border-b border-[#404254] transition-colors hover:bg-[#252850]"
              >
                <td className="px-4 py-3 text-sm text-white">{row.period}</td>
                <td className="px-4 py-3 text-sm text-white">{row.certifications.toLocaleString()}</td>
                <td className="px-4 py-3 text-sm text-white">
                  {row.marketplaceListings.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-sm text-white">
                  {row.serviceRequests.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-sm text-white">
                  {row.jobCompletions.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-sm font-medium text-[#10B981]">
                  {row.growthRate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
