interface FilterSelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
}

export function FilterSelect({ id, label, value, onChange, options }: FilterSelectProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-white">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-[#2a2d4a] bg-[#252850] px-4 py-3 text-sm text-white focus:outline-none"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export const DATE_RANGE_OPTIONS = ["All Dates", "Today", "Last 7 Days", "Last 30 Days", "Last 90 Days"] as const;
export const AI_MODULE_OPTIONS = ["AI Modules", "Structure Analysis", "Paint Analysis", "Ballistic Glass", "Interior Inspection", "Functionality Test"] as const;
export const COMBO_TYPE_OPTIONS = ["All Types", "Basic Inspection", "Premium Package", "Comprehensive"] as const;
export const STATUS_OPTIONS = ["All Status", "Approved", "Processing", "Pending", "Rejected"] as const;
export const SCORE_OPTIONS = ["All Score", "90% and above", "80% - 89%", "70% - 79%", "Below 70%"] as const;
export const PRICE_RANGE_OPTIONS = ["All Price", "$0 - $10,000", "$10,000 - $25,000", "$25,000 - $50,000", "$50,000+"] as const;
export const LOCATION_OPTIONS = ["All Locations", "New York", "California", "Texas", "Florida", "Illinois"] as const;
export const LISTING_STATUS_OPTIONS = ["All Status", "Active", "Pending", "Paused", "Sold", "Removed"] as const;
