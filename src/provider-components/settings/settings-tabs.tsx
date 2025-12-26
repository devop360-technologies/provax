"use client";

import { cn } from "@/lib/utils";

type SettingsTabType = "personal-info" | "professional-info" | "verification";

interface SettingsTabsProps {
  activeTab: SettingsTabType;
  onTabChange: (tab: SettingsTabType) => void;
}

const tabs: { id: SettingsTabType; label: string }[] = [
  { id: "personal-info", label: "Personal Info" },
  { id: "professional-info", label: "Professional Info" },
  { id: "verification", label: "Verification" },
];

export function SettingsTabs({ activeTab, onTabChange }: SettingsTabsProps) {
  return (
    <div className="border-b pt-4 px-2 md:px-6 rounded-xl bg-[#1D1D41] border-[#2a2d4a] mb-6">
      <div className="flex gap-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "pb-3 text-base font-medium transition-colors relative",
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

export type { SettingsTabType };
