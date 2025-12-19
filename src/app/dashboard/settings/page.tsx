"use client";

import { useState } from "react";
import {
  SettingsTabs,
  CertificationFeesSection,
  MarketplaceCommissionsSection,
  ServiceCommissionsSection,
  ProviderPayoutsSection,
  SettingsActions,
  APIKeysManagement,
  AIModuleConfiguration,
  SecurityAuditLog,
} from "@/components/settings";

const SETTINGS_TABS = [
  { id: "fees-commissions", label: "Fee & Commissions" },
  { id: "api-keys", label: "API Keys Management" },
  { id: "ai-module", label: "AI Module Configuration" },
  { id: "security-audit", label: "Security & Audit Log" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("fees-commissions");

  // Fee & Commissions state
  const [fees, setFees] = useState({
    certificationFee: "45.00",
    taxRate: "8.5",
    listingCommission: "5.0",
    saleCommission: "2.5",
    serviceCommission: "15.0",
    serviceFee: "2.99",
    payoutPercentage: "80.0",
    payoutThreshold: "50.00",
  });

  const handleResetToDefault = () => {
    setFees({
      certificationFee: "45.00",
      taxRate: "8.5",
      listingCommission: "5.0",
      saleCommission: "2.5",
      serviceCommission: "15.0",
      serviceFee: "2.99",
      payoutPercentage: "80.0",
      payoutThreshold: "50.00",
    });
  };

  const handleSaveChanges = () => {
    console.log("Saving changes:", fees);
    // Add your save logic here
  };

  return (
    <div className="min-h-screen ">
      <div className="mx-auto max-w-7xl mr-0 md:mr-7 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="mt-2 text-gray-400">
            Manage platform fees, API keys, and security settings
          </p>
        </div>

        {/* Tabs */}
        <SettingsTabs
          tabs={SETTINGS_TABS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Tab Content */}
        {activeTab === "fees-commissions" && (
          <div className="bg-[#1D1D41] rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-8">
              Fee & Commissions Configuration
            </h2>

            <CertificationFeesSection
              certificationFee={fees.certificationFee}
              onCertificationFeeChange={(value) =>
                setFees({ ...fees, certificationFee: value })
              }
              taxRate={fees.taxRate}
              onTaxRateChange={(value) => setFees({ ...fees, taxRate: value })}
            />

            <MarketplaceCommissionsSection
              listingCommission={fees.listingCommission}
              onListingCommissionChange={(value) =>
                setFees({ ...fees, listingCommission: value })
              }
              saleCommission={fees.saleCommission}
              onSaleCommissionChange={(value) =>
                setFees({ ...fees, saleCommission: value })
              }
            />

            <ServiceCommissionsSection
              serviceCommission={fees.serviceCommission}
              onServiceCommissionChange={(value) =>
                setFees({ ...fees, serviceCommission: value })
              }
              serviceFee={fees.serviceFee}
              onServiceFeeChange={(value) =>
                setFees({ ...fees, serviceFee: value })
              }
            />

            <ProviderPayoutsSection
              payoutPercentage={fees.payoutPercentage}
              onPayoutPercentageChange={(value) =>
                setFees({ ...fees, payoutPercentage: value })
              }
              payoutThreshold={fees.payoutThreshold}
              onPayoutThresholdChange={(value) =>
                setFees({ ...fees, payoutThreshold: value })
              }
            />

            <SettingsActions
              onResetToDefault={handleResetToDefault}
              onSaveChanges={handleSaveChanges}
            />
          </div>
        )}

        {/* API Keys Management Tab */}
        {activeTab === "api-keys" && (
          <div className="bg-[#1D1D41] rounded-lg p-8">
            <h2 className="text-xl font-semibold text-white mb-8">
              API Keys Management
            </h2>
            <APIKeysManagement
              onGenerateKey={(service) =>
                console.log("Generate new key for:", service)
              }
              onDeactivateKey={(service) =>
                console.log("Deactivate key for:", service)
              }
            />
          </div>
        )}

        {/* AI Module Configuration Tab */}
        {activeTab === "ai-module" && (
          <div className="bg-[#1D1D41] rounded-lg p-8">
            <h2 className="text-xl font-semibold text-white mb-8">
              AI Module Configuration
            </h2>
            <AIModuleConfiguration
              onConfigChange={(module, config) =>
                console.log("Config changed for:", module, config)
              }
            />
          </div>
        )}

        {/* Security & Audit Log Tab */}
        {activeTab === "security-audit" && (
          <div className="bg-[#1D1D41] rounded-lg p-8">
            <h2 className="text-xl font-semibold text-white mb-8">
              Security & Audit Log
            </h2>
            <SecurityAuditLog
              onExportCSV={() => console.log("Export CSV")}
              onExportPDF={() => console.log("Export PDF")}
            />
          </div>
        )}
      </div>
    </div>
  );
}