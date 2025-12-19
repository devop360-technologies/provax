"use client";

import { cn } from "@/lib/utils";

interface ReportTabsProps {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export function ReportTabs({
  tabs,
  activeTab,
  onTabChange,
  className,
}: ReportTabsProps) {
  return (
    <div className={cn("flex  bg-[#1D1D41] rounded-2xl border border-[#2a2d4a] ", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "px-6 py-4 text-sm font-medium transition-colors relative",
            activeTab === tab.id
              ? "text-[#64CFF6]"
              : "text-gray-400 hover:text-gray-300"
          )}
        >
          {tab.label}
          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#64CFF6]" />
          )}
        </button>
      ))}
    </div>
  );
}
