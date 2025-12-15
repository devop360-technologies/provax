import React from "react";

interface SupportTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function SupportTabs({ activeTab, onTabChange }: SupportTabsProps) {
  const tabs = [
    "Support Tickets",
    "Dispute",
    "Moderation Panel",
  ];

  return (
    <div className="border border-gray-700 rounded-xl pt-1 px-2  bg-[#1E1B44]">
      <nav className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === tab
                ? "border-cyan-400 text-cyan-400"
                : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
}