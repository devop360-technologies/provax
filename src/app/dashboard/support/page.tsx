"use client";

import React, { useState } from "react";
import SupportTabs from "@/components/dashboard/support-tabs";
import SupportFilters from "@/components/dashboard/support-filters";
import SupportTicketsTable from "@/components/dashboard/support-tickets-table";
import ModerationPanel from "@/components/dashboard/moderation-panel";
import DisputeResolution from "@/components/dashboard/dispute-resolution";

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
