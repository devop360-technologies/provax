"use client";

import { Calendar, ChevronDown } from "lucide-react";

interface AuditLogFiltersProps {
  eventType?: string;
  onEventTypeChange?: (value: string) => void;
  user?: string;
  onUserChange?: (value: string) => void;
  fromDate?: string;
  onFromDateChange?: (value: string) => void;
  toDate?: string;
  onToDateChange?: (value: string) => void;
  onApplyFilters?: () => void;
}

export function AuditLogFilters({
  eventType = "All Events",
  onEventTypeChange,
  user = "All User",
  onUserChange,
  fromDate = "01/01/2023",
  onFromDateChange,
  toDate = "12/31/2023",
  onToDateChange,
  onApplyFilters,
}: AuditLogFiltersProps) {
  const eventTypes = [
    "All Events",
    "Setting Change",
    "User Login",
    "API Key Generated",
    "Security Event",
    "Payment Processed",
  ];

  const users = [
    "All User",
    "Admin User",
    "Support Agent",
    "System",
  ];

  return (
    <div className="rounded-lg border border-[#404254] bg-[#252850] p-6 mb-6">
      <div className="flex items-end gap-4">
        {/* Event Type */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Event Type
          </label>
          <div className="relative">
            <select
              value={eventType}
              onChange={(e) => onEventTypeChange?.(e.target.value)}
              className="w-full appearance-none rounded-lg border border-[#404254] bg-[#1D1D41] px-4 py-2 text-gray-400 hover:border-[#505464] focus:border-[#4F46E5] focus:outline-none text-sm"
            >
              {eventTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <ChevronDown
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>
        </div>

        {/* User */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            User
          </label>
          <div className="relative">
            <select
              value={user}
              onChange={(e) => onUserChange?.(e.target.value)}
              className="w-full appearance-none rounded-lg border border-[#404254] bg-[#1D1D41] px-4 py-2 text-gray-400 hover:border-[#505464] focus:border-[#4F46E5] focus:outline-none text-sm"
            >
              {users.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
            <ChevronDown
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>
        </div>

        {/* From Date */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            From Date
          </label>
          <div className="relative">
            <input
              type="date"
              value={fromDate.split("/").reverse().join("-")}
              onChange={(e) => {
                const [year, month, day] = e.target.value.split("-");
                onFromDateChange?.(`${month}/${day}/${year}`);
              }}
              className="w-full rounded-lg border border-[#404254] bg-[#1D1D41] px-4 py-2 text-gray-400 hover:border-[#505464] focus:border-[#4F46E5] focus:outline-none text-sm"
            />
            <Calendar
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>
        </div>

        {/* To Date */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            To Date
          </label>
          <div className="relative">
            <input
              type="date"
              value={toDate.split("/").reverse().join("-")}
              onChange={(e) => {
                const [year, month, day] = e.target.value.split("-");
                onToDateChange?.(`${month}/${day}/${year}`);
              }}
              className="w-full rounded-lg border border-[#404254] bg-[#1D1D41] px-4 py-2 text-gray-400 hover:border-[#505464] focus:border-[#4F46E5] focus:outline-none text-sm"
            />
            <Calendar
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>
        </div>

        {/* Apply Filters Button */}
        <button
          onClick={onApplyFilters}
          className="h-10 rounded-lg border border-[#404254] bg-[#1D1D41] px-6 text-sm font-medium text-gray-400 hover:bg-[#252850] transition-colors whitespace-nowrap"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}
