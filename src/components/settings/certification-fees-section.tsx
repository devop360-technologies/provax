"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface FeeInputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  unit: string;
  description: string;
  className?: string;
}

function FeeInputField({
  label,
  value,
  onChange,
  unit,
  description,
  className,
}: FeeInputFieldProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <label className="mb-2 text-sm font-medium text-gray-300">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-24 rounded-lg border border-[#404254] bg-[#252850] px-3 py-2 text-white placeholder-gray-600 transition-colors hover:border-[#505464] focus:border-[#4F46E5] focus:outline-none"
          step="0.01"
        />
        <span className="text-sm text-gray-400 font-medium">{unit}</span>
      </div>
      <p className="mt-1 text-xs text-gray-500">{description}</p>
    </div>
  );
}

interface CertificationFeesProps {
  certificationFee?: string;
  onCertificationFeeChange?: (value: string) => void;
  taxRate?: string;
  onTaxRateChange?: (value: string) => void;
}

export function CertificationFeesSection({
  certificationFee = "45.00",
  onCertificationFeeChange,
  taxRate = "8.5",
  onTaxRateChange,
}: CertificationFeesProps) {
  return (
    <div className="rounded-lg border border-[#404254] bg-[#252850] p-6 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-8 w-8 rounded-full bg-[#3B82F6] flex items-center justify-center">
          <span className="text-white font-bold">●</span>
        </div>
        <h3 className="text-base font-medium text-white">Certification Fees</h3>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <FeeInputField
          label="Certification Fees"
          value={certificationFee}
          onChange={onCertificationFeeChange || (() => {})}
          unit="USD"
          description="Fee charged for each certification"
        />
        <FeeInputField
          label="Tax Rate"
          value={taxRate}
          onChange={onTaxRateChange || (() => {})}
          unit="%"
          description="Tax applied to certification fees"
        />
      </div>
    </div>
  );
}
