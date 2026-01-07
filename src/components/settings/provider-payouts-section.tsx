"use client";

import { FeeInputField } from "./fee-input-field";

interface ProviderPayoutsProps {
  payoutPercentage?: string;
  onPayoutPercentageChange?: (value: string) => void;
  payoutThreshold?: string;
  onPayoutThresholdChange?: (value: string) => void;
}

export function ProviderPayoutsSection({
  payoutPercentage = "80.0",
  onPayoutPercentageChange,
  payoutThreshold = "50.00",
  onPayoutThresholdChange,
}: ProviderPayoutsProps) {
  return (
    <div className="rounded-lg border border-[#404254] bg-[#252850] p-6 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-8 w-8 rounded-full bg-[#F59E0B] flex items-center justify-center">
          <span className="text-white font-bold">💳</span>
        </div>
        <h3 className="text-base font-medium text-white">Provider Payouts</h3>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <FeeInputField
          label="Provider Payout Percentage"
          value={payoutPercentage}
          onChange={onPayoutPercentageChange || (() => {})}
          unit="%"
          description="Percentage of revenue paid to providers"
        />
        <FeeInputField
          label="Payout Threshold"
          value={payoutThreshold}
          onChange={onPayoutThresholdChange || (() => {})}
          unit="USD"
          description="Minimum amount for provider payouts"
        />
      </div>
    </div>
  );
}
