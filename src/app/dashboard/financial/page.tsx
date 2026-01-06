"use client";

import React, { useState } from "react";
import FinancialOverview from '@/components/dashboard/financial-overview';
import FinancialTabs from "@/components/dashboard/financial-tabs";
import FinancialFilters from "@/components/dashboard/financial-filters";
import TransactionsTable from "@/components/dashboard/transactions-table";
import SubscriptionPlans from "@/components/dashboard/subscription-plans";
import SubscriptionManagementTable from "@/components/dashboard/subscription-management-table";

export default function FinancialPage() {
  const [activeTab, setActiveTab] = useState("Financial Dashboard");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="mr-0 space-y-6 md:mr-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Financial Dashboard</h1>
        <p className="mt-1 text-gray-400">Manage revenue, expenses, and financial reports</p>
      </div>

      {/* Navigation Tabs */}
      <FinancialTabs activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Conditional Content Based on Active Tab */}
      {activeTab === "Financial Dashboard" && (
        <>
          {/* Filters */}
          <FinancialFilters />
          
          {/* buttons */}
          <div>
            <div className="flex flex-col space-y-6 rounded-lg bg-[#1D1D41] p-6 md:flex-row md:justify-end md:space-x-6">
              <button className="m-2 rounded-2xl bg-[#02B15A] px-6 py-3 text-base">Export CSV</button>
              <button className="m-2 rounded-2xl bg-[#BF4A4A] px-6 py-3 text-base">Export PDF</button>
            </div>
          </div>

          {/* Financial overview charts */}
          <FinancialOverview />
        </>
      )}

      {activeTab === "Transactions" && (
        <div className="space-y-6">
          <TransactionsTable />
        </div>
      )}

      {activeTab === "Subscription Management" && (
        <div className="space-y-6">
          <SubscriptionPlans />
          <SubscriptionManagementTable />
        </div>
      )}
    </div>
  );
}