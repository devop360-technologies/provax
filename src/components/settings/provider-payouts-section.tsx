"use client";

interface FeeInputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  unit: string;
  description: string;
}

function FeeInputField({
  label,
  value,
  onChange,
  unit,
  description,
}: FeeInputFieldProps) {
  return (
    <div className="flex flex-col">
      <label className="mb-2 text-sm font-medium text-gray-300">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-[#404254] bg-[#1D1D41] px-3 py-2 text-white placeholder-gray-600 transition-colors hover:border-[#505464] focus:border-[#4F46E5] focus:outline-none"
          step="0.01"
        />
        <span className="text-sm text-gray-400 font-medium">{unit}</span>
      </div>
      <p className="mt-1 text-xs text-gray-500">{description}</p>
    </div>
  );
}

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
