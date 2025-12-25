"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type TabType = "plans-overview" | "plans-pricing" | "manage-subscription" | "usage-history";

interface SubscriptionTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs: { id: TabType; label: string }[] = [
  { id: "plans-overview", label: "Plans Overview" },
  { id: "plans-pricing", label: "Plans & Pricing" },
  { id: "manage-subscription", label: "Manage Subscription" },
  { id: "usage-history", label: "Usage History" },
];

export function SubscriptionTabs({ activeTab, onTabChange }: SubscriptionTabsProps) {
  return (
    <div className="border-b border-[#2a2d4a] mb-6">
      <div className="flex gap-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "pb-3 text-sm font-medium transition-colors relative",
              activeTab === tab.id
                ? "text-[#00D1FF]"
                : "text-gray-400 hover:text-white"
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00D1FF]" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export type { TabType };
