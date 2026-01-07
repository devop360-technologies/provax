"use client";

import { DashboardTabs } from "@/components/ui/dashboard-tabs";

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
    <DashboardTabs
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={onTabChange}
      className={className}
      containerClassName="border-[#404254] mb-6"
    />
  );
}
