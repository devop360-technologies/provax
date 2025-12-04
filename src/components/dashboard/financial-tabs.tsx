"use client";

import React, { useState } from "react";

interface FinancialTabsProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function FinancialTabs({ activeTab = "Financial Dashboard", onTabChange }: FinancialTabsProps) {
  const tabs = [
    "Financial Dashboard",
    "Transactions", 
    "Subscription Management"
  ];

  return (
    <div className="border-b border-[#2a2d4a] bg-[#1D1D41] rounded-xl">
      <div className="flex gap-8 px-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange?.(tab)}
            className={`px-2 py-4 text-sm font-medium transition-colors border-b-2 ${
              activeTab === tab
                ? "border-cyan-400 text-cyan-400"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FinancialTabs;