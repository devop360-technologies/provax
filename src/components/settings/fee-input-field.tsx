"use client";

import { cn } from "@/lib/utils";

export interface FeeInputFieldProps {
  readonly label: string;
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly unit: string;
  readonly description: string;
  readonly className?: string;
}

export function FeeInputField({
  label,
  value,
  onChange,
  unit,
  description,
  className,
}: FeeInputFieldProps) {
  const inputId = `fee-input-${label.toLowerCase().replaceAll(/\s+/g, '-')}`;
  return (
    <div className={cn("flex flex-col", className)}>
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
