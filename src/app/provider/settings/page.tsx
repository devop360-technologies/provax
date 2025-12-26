"use client";

import { useState } from "react";
import {
  SettingsTabs,
  PersonalInfo,
  ProfessionalInfo,
  Verification,
  type SettingsTabType,
} from "@/provider-components/settings";

export default function ProviderSettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTabType>("personal-info");

  return (
    <div className="mr-0 md:mr-6 space-y-6">
      {/* Tabs Navigation */}
      <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab Content */}
      {activeTab === "personal-info" && <PersonalInfo />}
      {activeTab === "professional-info" && <ProfessionalInfo />}
      {activeTab === "verification" && <Verification />}
    </div>
  );
}
