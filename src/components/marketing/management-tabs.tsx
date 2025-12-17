"use client";

import { cn } from "@/lib/utils";

interface ManagementTab {
  id: string;
  label: string;
}

interface ManagementTabsProps {
  tabs: ManagementTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export function ManagementTabs({
  tabs,
  activeTab,
  onTabChange,
  className,
}: ManagementTabsProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-8 bg-transparent px-6 py-0",
        className
      )}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "relative pb-3 pt-4 text-sm font-medium transition-colors",
            activeTab === tab.id
              ? "text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-cyan-400"
              : "text-gray-400 hover:text-gray-300"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
