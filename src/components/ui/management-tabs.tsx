"use client";

interface ManagementTabsProps<T extends string> {
  tabs: readonly { key: T; label: string }[];
  activeTab: T;
  onTabChange: (tab: T) => void;
}

export function ManagementTabs<T extends string>({ tabs, activeTab, onTabChange }: ManagementTabsProps<T>) {
  return (
    <div className="mr-0 flex items-center justify-between rounded-xl border border-[#2a2d4a] bg-[#1D1D41] px-6 pt-4 md:mr-7">
      <div className="flex gap-8">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`px-2 pb-3 font-medium transition-colors ${
              activeTab === tab.key
                ? "border-b-2 border-cyan-400 text-cyan-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
