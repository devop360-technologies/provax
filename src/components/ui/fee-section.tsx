"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export interface FeeField {
  label: string;
  value: string;
  onChange: (value: string) => void;
  unit: string;
  description: string;
}

interface FeeSectionProps {
  icon: ReactNode;
  iconBg: string;
  title: string;
  fields: FeeField[];
  className?: string;
}

export function FeeSection({
  icon,
  iconBg,
  title,
  fields,
  className,
}: Readonly<FeeSectionProps>) {
  return (
    <div className={cn("rounded-lg border border-[#404254] bg-[#252850] p-5 md:p-6 mb-5 md:mb-6", className)}>
      <div className="flex items-center gap-3 mb-6">
        <div className={cn("h-8 w-8 rounded-full flex items-center justify-center", iconBg)}>
          {icon}
        </div>
        <h3 className="text-base font-medium text-white">{title}</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {fields.map((field) => (
          <FeeInputFieldDisplay
            key={field.label}
            label={field.label}
            value={field.value}
            onChange={field.onChange}
            unit={field.unit}
            description={field.description}
          />
        ))}
      </div>
    </div>
  );
}

// Inline fee input field to avoid circular imports
interface FeeInputFieldDisplayProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  unit: string;
  description: string;
}

function FeeInputFieldDisplay({
  label,
  value,
  onChange,
  unit,
  description,
}: Readonly<FeeInputFieldDisplayProps>) {
  return (
    <div>
      <label className="block text-sm text-gray-400 mb-2">{label}</label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-[#1a1d3a] border border-[#404254] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
          {unit}
        </span>
      </div>
      <p className="text-xs text-gray-500 mt-2">{description}</p>
    </div>
  );
}

// Pre-built section variants
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
    <FeeSection
      icon={<span className="text-white font-bold">●</span>}
      iconBg="bg-[#3B82F6]"
      title="Certification Fees"
      fields={[
        {
          label: "Certification Fees",
          value: certificationFee,
          onChange: onCertificationFeeChange || (() => {}),
          unit: "USD",
          description: "Fee charged for each certification",
        },
        {
          label: "Tax Rate",
          value: taxRate,
          onChange: onTaxRateChange || (() => {}),
          unit: "%",
          description: "Tax applied to certification fees",
        },
      ]}
    />
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
    <FeeSection
      icon={<span className="text-white font-bold">📦</span>}
      iconBg="bg-[#10B981]"
      title="Marketplace Commissions"
      fields={[
        {
          label: "Listing Commission",
          value: listingCommission,
          onChange: onListingCommissionChange || (() => {}),
          unit: "%",
          description: "Commission on marketplace listings",
        },
        {
          label: "Sale Commission",
          value: saleCommission,
          onChange: onSaleCommissionChange || (() => {}),
          unit: "%",
          description: "Commission on marketplace sales",
        },
      ]}
    />
  );
}

interface ServiceCommissionsProps {
  serviceCommission?: string;
  onServiceCommissionChange?: (value: string) => void;
  serviceFee?: string;
  onServiceFeeChange?: (value: string) => void;
}

export function ServiceCommissionsSection({
  serviceCommission = "15.0",
  onServiceCommissionChange,
  serviceFee = "2.99",
  onServiceFeeChange,
}: ServiceCommissionsProps) {
  return (
    <FeeSection
      icon={<span className="text-white font-bold">⚙</span>}
      iconBg="bg-[#00D9FF]"
      title="Service Commissions"
      fields={[
        {
          label: "Service Commission",
          value: serviceCommission,
          onChange: onServiceCommissionChange || (() => {}),
          unit: "%",
          description: "Commission on service requests",
        },
        {
          label: "Service Fee",
          value: serviceFee,
          onChange: onServiceFeeChange || (() => {}),
          unit: "USD",
          description: "Fixed fee per service request",
        },
      ]}
    />
  );
}
