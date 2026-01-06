"use client";

import { Button } from "@/components/ui/button";
import { Plus, Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmailFiltersProps {
  onApplyFilters?: (filters: {
    status: string;
    category: string;
    fromDate: string;
    toDate: string;
  }) => void;
  onCreateTemplate?: () => void;
  onCreateCampaign?: () => void;
  className?: string;
}

export function EmailFilters({
  onApplyFilters,
  onCreateTemplate,
  onCreateCampaign,
  className,
}: EmailFiltersProps) {
  const handleApplyFilters = () => {
    onApplyFilters?.({
      status: "All Status",
      category: "All Categories",
      fromDate: "01/01/2023",
      toDate: "12/31/2023",
    });
  };

  return (
    <div>
    <div>
      {/* Filter Row */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5 lg:grid-cols-6 border p-4 rounded-2xl my-3 bg-[#1D1D41]  border-[#404254]">
        {/* Status Filter */}
        <div>
          <label htmlFor="filter-status" className="mb-2 block text-xs font-medium text-gray-300">
            Status
          </label>
          <select id="filter-status" className="w-full rounded-lg border border-[#404254] bg-[#252850] px-3 py-2 text-sm text-white transition-colors hover:border-[#505464] focus:border-[#4F46E5] focus:outline-none">
            <option>All Status</option>
            <option>Draft</option>
            <option>Scheduled</option>
            <option>Sent</option>
            <option>Failed</option>
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <label htmlFor="filter-category" className="mb-2 block text-xs font-medium text-gray-300">
            Category
          </label>
          <select id="filter-category" className="w-full rounded-lg border border-[#404254] bg-[#252850] px-3 py-2 text-sm text-white transition-colors hover:border-[#505464] focus:border-[#4F46E5] focus:outline-none">
            <option>All Categories</option>
            <option>Promotional</option>
            <option>Transactional</option>
            <option>Newsletter</option>
            <option>Alerts</option>
          </select>
        </div>

        {/* From Date */}
        <div>
          <label htmlFor="filter-from-date" className="mb-2 block text-xs font-medium text-gray-300">
            From Date
          </label>
          <input
            id="filter-from-date"
            type="date"
            defaultValue="2023-01-01"
            className="w-full rounded-lg border border-[#404254] bg-[#252850] px-3 py-2 text-sm text-white transition-colors hover:border-[#505464] focus:border-[#4F46E5] focus:outline-none"
          />
        </div>

        {/* To Date */}
        <div>
          <label htmlFor="filter-to-date" className="mb-2 block text-xs font-medium text-gray-300">
            To Date
          </label>
          <input
            id="filter-to-date"
            type="date"
            defaultValue="2023-12-31"
            className="w-full rounded-lg border border-[#404254] bg-[#252850] px-3 py-2 text-sm text-white transition-colors hover:border-[#505464] focus:border-[#4F46E5] focus:outline-none"
          />
        </div>

        {/* Apply Filters Button */}
        <div className="flex items-end">
          <Button
            onClick={handleApplyFilters}
            className="w-full rounded-lg bg-[#3B82F6] px-4 py-2 text-xs font-medium text-white hover:bg-[#2563EB]"
          >
            Apply Filters
          </Button>
        </div>
      </div>

    <div className={cn("space-y-4 rounded-lg bg-[#1D1D41] p-6 border border-[#404254]", className)}>
      {/* Action Buttons Row */}
      <div className="flex items-center justify-between ">
        <div className="flex gap-3">
          <Button
            onClick={onCreateTemplate}
            className="h-9 gap-2 rounded-lg bg-[#3B82F6] px-4 text-xs font-medium text-white hover:bg-[#2563EB]"
          >
            <Plus className="size-4" />
            Create Template
          </Button>
          <Button
            onClick={onCreateCampaign}
            className="h-9 gap-2 rounded-lg bg-[#10B981] px-4 text-xs font-medium text-white hover:bg-[#059669]"
          >
            <Plus className="size-4" />
            Create Campaign
          </Button>
        </div>
        <Button
          variant="outline"
          className="h-9 gap-2 rounded-lg border border-[#404254] bg-transparent px-4 text-xs font-medium text-gray-300 hover:bg-[#252850] hover:text-white"
        >
          <Download className="size-4" />
          Export Data
        </Button>
      </div>

      </div>
    </div>
    </div>
  );
}
