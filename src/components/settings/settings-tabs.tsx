"use client";

import { cn } from "@/lib/utils";

interface SettingsTabsProps {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export function SettingsTabs({
  tabs,
  activeTab,
  onTabChange,
  className,
}: SettingsTabsProps) {
  return (
    <div className={cn("flex border rounded-2xl bg-[#1D1D41] border-[#404254] mb-6", className)}>
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
