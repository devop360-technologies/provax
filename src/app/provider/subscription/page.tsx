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
import {
  SubscriptionDetailsModal,
  UpgradeSubscriptionModal,
  RetryPaymentModal,
  PaymentMethodsModal,
  PurchaseCertificationsModal,
} from "@/provider-components/subscription/modals";

export default function ProviderSubscriptionPage() {
  const [activeTab, setActiveTab] = useState<TabType>("plans-overview");
  
  // Modal states
  const [isSubscriptionDetailsOpen, setIsSubscriptionDetailsOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [isRetryPaymentModalOpen, setIsRetryPaymentModalOpen] = useState(false);
  const [isPaymentMethodsModalOpen, setIsPaymentMethodsModalOpen] = useState(false);
  const [isPurchaseCertificationsModalOpen, setIsPurchaseCertificationsModalOpen] = useState(false);

  return (
    <div className="mr-0 md:mr-6 space-y-6">
      {/* Tabs Navigation */}
      <SubscriptionTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab Content */}
      {activeTab === "plans-overview" && (
        <>
          <PlansOverview 
            onViewDetail={() => setIsSubscriptionDetailsOpen(true)}
            onViewFullUsage={() => setIsPurchaseCertificationsModalOpen(true)}
            onManage={() => setIsPaymentMethodsModalOpen(true)}
          />
          <BillingHistory />
        </>
      )}

      {activeTab === "plans-pricing" && <PlansPricing />}

      {activeTab === "manage-subscription" && (
        <ManageSubscription
          onUpgradePlan={() => setIsUpgradeModalOpen(true)}
          onDowngradePlan={() => setIsUpgradeModalOpen(true)}
          onCancelSubscription={() => {}}
          onChangePaymentMethod={() => setIsPaymentMethodsModalOpen(true)}
          onRetryPayment={() => setIsRetryPaymentModalOpen(true)}
        />
      )}

      {activeTab === "usage-history" && (
        <UsageHistory onPurchaseMore={() => setIsPurchaseCertificationsModalOpen(true)} />
      )}

      {/* Modals */}
      <SubscriptionDetailsModal
        isOpen={isSubscriptionDetailsOpen}
        onClose={() => setIsSubscriptionDetailsOpen(false)}
        onRenew={() => {
          setIsSubscriptionDetailsOpen(false);
          // Handle renew logic
        }}
        onUpgrade={() => {
          setIsSubscriptionDetailsOpen(false);
          setIsUpgradeModalOpen(true);
        }}
      />

      <UpgradeSubscriptionModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        onConfirm={(paymentMethodId, agreedToTerms) => {
          console.log("Upgrading with:", { paymentMethodId, agreedToTerms });
          // Handle upgrade logic
        }}
      />

      <RetryPaymentModal
        isOpen={isRetryPaymentModalOpen}
        onClose={() => setIsRetryPaymentModalOpen(false)}
        onRetry={(cardDetails) => {
          console.log("Retrying payment with:", cardDetails);
          // Handle retry payment logic
        }}
      />

      <PaymentMethodsModal
        isOpen={isPaymentMethodsModalOpen}
        onClose={() => setIsPaymentMethodsModalOpen(false)}
        onAddPaymentMethod={(cardDetails) => {
          console.log("Adding payment method:", cardDetails);
          // Handle add payment method logic
        }}
      />

      <PurchaseCertificationsModal
        isOpen={isPurchaseCertificationsModalOpen}
        onClose={() => setIsPurchaseCertificationsModalOpen(false)}
        onPurchase={(packageId) => {
          console.log("Purchasing package:", packageId);
          // Handle purchase logic
        }}
      />
    </div>
  );
}
