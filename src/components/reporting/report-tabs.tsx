"use client";

import { DashboardTabs } from "@/components/ui/dashboard-tabs";

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
    <DashboardTabs
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={onTabChange}
      className={className}
    />
  );
}
