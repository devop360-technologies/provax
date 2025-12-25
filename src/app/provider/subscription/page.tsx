"use client";

import { useState } from "react";
import {
  SubscriptionTabs,
  PlansOverview,
  PlansPricing,
  ManageSubscription,
  UsageHistory,
  BillingHistory,
  type TabType,
} from "@/provider-components/subscription";

export default function ProviderSubscriptionPage() {
  const [activeTab, setActiveTab] = useState<TabType>("plans-overview");

  return (
    <div className="mr-0 md:mr-6 space-y-6">
      {/* Tabs Navigation */}
      <SubscriptionTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab Content */}
      {activeTab === "plans-overview" && (
        <>
          <PlansOverview />
          <BillingHistory />
        </>
      )}

      {activeTab === "plans-pricing" && <PlansPricing />}

      {activeTab === "manage-subscription" && <ManageSubscription />}

      {activeTab === "usage-history" && <UsageHistory />}
    </div>
  );
}
