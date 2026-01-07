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
  const inputId = `fee-input-${label.toLowerCase().replaceAll(/\s+/g, '-')}`;
  return (
    <div className="flex flex-col">
      <label htmlFor={inputId} className="mb-2 text-sm font-medium text-gray-300">{label}</label>
      <div className="flex items-center gap-2">
        <input
          id={inputId}
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
    <div className="rounded-lg border border-[#404254] bg-[#252850] p-6 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-8 w-8 rounded-full bg-[#00D9FF] flex items-center justify-center">
          <span className="text-white font-bold">⚙</span>
        </div>
        <h3 className="text-base font-medium text-white">Service Commissions</h3>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <FeeInputField
          label="Service Commission"
          value={serviceCommission}
          onChange={onServiceCommissionChange || (() => {})}
          unit="%"
          description="Commission on service requests"
        />
        <FeeInputField
          label="Service Fee"
          value={serviceFee}
          onChange={onServiceFeeChange || (() => {})}
          unit="USD"
          description="Fixed fee per service request"
        />
      </div>
    </div>
  );
}
