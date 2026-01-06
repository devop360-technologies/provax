"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ReportFiltersProps {
  onApplyFilters?: (filters: {
    status: string;
    category: string;
    fromDate: string;
    toDate: string;
  }) => void;
  onResetFilter?: () => void;
  className?: string;
}

export function ReportFilters({ onApplyFilters, onResetFilter, className }: ReportFiltersProps) {
  const handleApplyFilters = () => {
    onApplyFilters?.({
      status: "Last 7 Days",
      category: "All Categories",
      fromDate: "01/01/2023",
      toDate: "12/31/2023"
    });
  };

  return (
    <div className={cn("space-y-4 rounded-lg bg-[#1D1D41] p-6", className)}>
      {/* Filter Row */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5 lg:grid-cols-5">
        {/* Status Filter */}
        <div>
          <label htmlFor="report-status-filter" className="mb-2 block text-xs font-medium text-gray-300">Status</label>
          <select id="report-status-filter" className="w-full rounded-lg border border-[#404254] bg-[#252850] px-3 py-2 text-sm text-white transition-colors hover:border-[#505464] focus:border-[#4F46E5] focus:outline-none">
            <option>Last 7 Days</option>
            <option>Last 14 Days</option>
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <label htmlFor="report-category-filter" className="mb-2 block text-xs font-medium text-gray-300">Category</label>
          <select id="report-category-filter" className="w-full rounded-lg border border-[#404254] bg-[#252850] px-3 py-2 text-sm text-white transition-colors hover:border-[#505464] focus:border-[#4F46E5] focus:outline-none">
            <option>All Categories</option>
            <option>Certifications</option>
            <option>Marketplace</option>
            <option>Services</option>
          </select>
        </div>

        {/* From Date */}
        <div>
          <label htmlFor="report-from-date" className="mb-2 block text-xs font-medium text-gray-300">From Date</label>
          <input
            id="report-from-date"
            type="date"
            defaultValue="2023-01-01"
            className="w-full rounded-lg border border-[#404254] bg-[#252850] px-3 py-2 text-sm text-white transition-colors hover:border-[#505464] focus:border-[#4F46E5] focus:outline-none"
          />
        </div>

        {/* To Date */}
        <div>
          <label htmlFor="report-to-date" className="mb-2 block text-xs font-medium text-gray-300">To Date</label>
          <input
            id="report-to-date"
            type="date"
            defaultValue="2023-12-31"
            className="w-full rounded-lg border border-[#404254] bg-[#252850] px-3 py-2 text-sm text-white transition-colors hover:border-[#505464] focus:border-[#4F46E5] focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 pt-5 pl-5">
          {/* Apply Filters Button */}
          <div className="flex ">
            <Button
              onClick={handleApplyFilters}
              className="w-full rounded-lg bg-[#3B82F6] px-4 py-2 text-xs font-medium text-white hover:bg-[#2563EB]"
            >
              Apply Filters
            </Button>
          </div>

          {/* Reset Filter Button */}
          <div className="flex ">
            <Button
              onClick={onResetFilter}
              className="rounded-lg border border-[#404254] bg-transparent px-4 py-2 text-xs font-medium text-gray-400 hover:bg-[#252850]"
            >
              Reset Filter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
