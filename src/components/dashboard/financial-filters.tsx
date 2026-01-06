"use client";

import React, { useState } from "react";
import { CalendarIcon } from "lucide-react";

interface FinancialFiltersProps {
  onFiltersChange?: (filters: Record<string, string | number | boolean>) => void;
}

export function FinancialFilters({ onFiltersChange }: Readonly<FinancialFiltersProps>) {
  const [period, setPeriod] = useState("Last 7 Days");
  const [category, setCategory] = useState("All Categories");
  const [fromDate, setFromDate] = useState("01/01/2023");
  const [toDate, setToDate] = useState("12/31/2023");

  const periods = ["Last 7 Days", "Last 30 Days", "Last 3 Months", "Last 6 Months", "Last Year"];
  const categories = ["All Categories", "Certification", "Marketplace", "Service", "Subscription"];

  const handleApplyFilters = () => {
    onFiltersChange?.({
      period,
      category,
      fromDate,
      toDate
    });
  };

  const handleResetFilters = () => {
    setPeriod("Last 7 Days");
    setCategory("All Categories");
    setFromDate("01/01/2023");
    setToDate("12/31/2023");
  };

  return (
    <div className="bg-[#1D1D41] border-b border-[#2a2d4a]  rounded-xl">
      <div className="px-6 py-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:items-end">
          {/* Period */}
          <div>
            <label htmlFor="financialPeriod" className="mb-2 block text-sm font-medium text-gray-300">Period</label>
            <select
              id="financialPeriod"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="w-full rounded-lg border border-[#2a2d4a] bg-[#252850] px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            >
              {periods.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Product Category */}
          <div>
            <label htmlFor="financialCategory" className="mb-2 block text-sm font-medium text-gray-300">Product Category</label>
            <select
              id="financialCategory"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-[#2a2d4a] bg-[#252850] px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* From Date */}
          <div>
            <label htmlFor="financialFromDate" className="mb-2 block text-sm font-medium text-gray-300">From Date</label>
            <div className="relative">
              <input
                id="financialFromDate"
                type="text"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full rounded-lg border border-[#2a2d4a] bg-[#252850] px-4 py-2.5 pr-10 text-sm text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                placeholder="MM/DD/YYYY"
              />
              <CalendarIcon className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* To Date */}
          <div>
            <label htmlFor="financialToDate" className="mb-2 block text-sm font-medium text-gray-300">To Date</label>
            <div className="relative">
              <input
                id="financialToDate"
                type="text"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full rounded-lg border border-[#2a2d4a] bg-[#252850] px-4 py-2.5 pr-10 text-sm text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                placeholder="MM/DD/YYYY"
              />
              <CalendarIcon className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Apply Filters Button */}
          <div>
            <button
              onClick={handleApplyFilters}
              className="w-full rounded-lg bg-cyan-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-cyan-700"
            >
              Apply Filters
            </button>
          </div>

          {/* Reset Filter Button */}
          <div>
            <button
              onClick={handleResetFilters}
              className="w-full rounded-lg border border-[#2a2d4a] bg-[#252850] px-4 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-[#2a2d4a] hover:text-white"
            >
              Reset Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinancialFilters;