"use client";

import { cn } from "@/lib/utils";

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

interface MarketplaceCommissionsProps {
  listingCommission?: string;
  onListingCommissionChange?: (value: string) => void;
  saleCommission?: string;
  onSaleCommissionChange?: (value: string) => void;
}

export function MarketplaceCommissionsSection({
  listingCommission = "5.0",
  onListingCommissionChange,
  saleCommission = "2.5",
  onSaleCommissionChange,
}: MarketplaceCommissionsProps) {
  return (
    <div className="rounded-lg border border-[#404254] bg-[#252850] p-6 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-8 w-8 rounded-full bg-[#10B981] flex items-center justify-center">
          <span className="text-white font-bold">📦</span>
        </div>
        <h3 className="text-base font-medium text-white">Marketplace Commissions</h3>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <FeeInputField
          label="Listing Commission"
          value={listingCommission}
          onChange={onListingCommissionChange || (() => {})}
          unit="%"
          description="Commission on marketplace listings"
        />
        <FeeInputField
          label="Sale Commission"
          value={saleCommission}
          onChange={onSaleCommissionChange || (() => {})}
          unit="%"
          description="Commission on marketplace sales"
        />
      </div>
    </div>
  );
}
