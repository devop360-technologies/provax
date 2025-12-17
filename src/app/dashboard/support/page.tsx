"use client";

import React, { useState } from "react";
import SupportTabs from "@/components/dashboard/support-tabs";
import SupportFilters from "@/components/dashboard/support-filters";
import SupportTicketsTable from "@/components/dashboard/support-tickets-table";
import ModerationPanel from "@/components/dashboard/moderation-panel";
import DisputeResolution from "@/components/dashboard/dispute-resolution";
import { StatCard } from "@/components/dashboard";

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState("Support Tickets");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="mr-0 space-y-6 md:mr-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Support</h1>
        <p className="mt-1 text-gray-400">Manage support tickets and customer inquiries</p>
      </div>

       {/* Stats Grid - 4 columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  title="Open Tickets"
                  value="12,458"
                  change="+2.5% from last month"
                  changeType="positive"
                  iconSrc="/provax-dashboard/icons/Vector (41).png"
                  iconBg="bg-[#64CFF6]"
                />
                <StatCard
                  title="Open Tickets"
                  value="3,742"
                  change="+0.5% from last month"
                  changeType="positive"
                  iconSrc="/provax-dashboard/icons/Vector (40).png"
                  iconBg="bg-[#64CFF6]"
                />
                <StatCard
                  title="Resolved Today"
                  value="8,921"
                  change="+12.4% from last month"
                  changeType="positive"
                  iconSrc="/provax-dashboard/icons/tw.png"
                  iconBg="bg-[#64CFF6]"
                />
                <StatCard
                  title="Avg. Response Time"
                  value="1,245"
                  change=""
                  changeType="positive"
                  iconSrc="/provax-dashboard/icons/clock.png"
                  iconBg="bg-[#64CFF6]"
                />
              </div>



      {/* Navigation Tabs */}
      <SupportTabs activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Conditional Content Based on Active Tab */}
      {activeTab === "Support Tickets" && (
        <>
          {/* Filters */}
          <SupportFilters />
          
          {/* Support Tickets Table */}
          <SupportTicketsTable />
        </>
      )}

      {/* Moderation Panel Tab Content */}
      {activeTab === "Moderation Panel" && <ModerationPanel />}

      {/* Dispute Resolution Tab Content */}
      {activeTab === "Dispute" && <DisputeResolution />}
    </div>
  );
}
