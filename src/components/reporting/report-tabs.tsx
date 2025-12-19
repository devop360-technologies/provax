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
    <div className={cn("flex border-b border-[#404254]", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "px-6 py-4 text-sm font-medium transition-colors relative",
            activeTab === tab.id
              ? "text-white"
              : "text-gray-400 hover:text-gray-300"
          )}
        >
          {tab.label}
          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3B82F6]" />
          )}
        </button>
      ))}
    </div>
  );
}
