// Shared form components to reduce duplication
import { cn } from "@/lib/utils";

// Base input styles
const INPUT_BASE_STYLES = "w-full rounded-lg border border-[#404254] bg-[#252850] px-4 py-2.5 text-sm text-white placeholder-gray-600 transition-colors hover:border-[#505464] focus:border-[#4F46E5] focus:outline-none";

interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

export function FormInput({
  id,
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  className,
}: FormInputProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-gray-300">
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={name ?? id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={INPUT_BASE_STYLES}
      />
    </div>
  );
}

interface FormTextareaProps {
  id: string;
  label: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  hint?: string;
  className?: string;
}

export function FormTextarea({
  id,
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 4,
  hint,
  className,
}: FormTextareaProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-gray-300">
        {label}
      </label>
      <textarea
        id={id}
        name={name ?? id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={cn(INPUT_BASE_STYLES, "resize-none")}
      />
      {hint && <p className="mt-2 text-xs text-gray-500">{hint}</p>}
    </div>
  );
}

interface FormSelectOption {
  value: string;
  label: string;
}

interface FormSelectProps {
  id: string;
  label: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: FormSelectOption[];
  placeholder?: string;
  className?: string;
}

export function FormSelect({
  id,
  label,
  name,
  value,
  onChange,
  options,
  placeholder,
  className,
}: FormSelectProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-gray-300">
        {label}
      </label>
      <select
        id={id}
        name={name ?? id}
        value={value}
        onChange={onChange}
        className={INPUT_BASE_STYLES}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// Variable chips (for email templates)
interface VariableChipsProps {
  variables: string[];
  className?: string;
}

export function VariableChips({ variables, className }: VariableChipsProps) {
  return (
    <div className={className}>
      <p className="mb-2 text-xs font-medium text-gray-400">
        Available Variables
      </p>
      <div className="flex flex-wrap gap-2">
        {variables.map((variable) => (
          <button
            key={variable}
            type="button"
            className="rounded-full bg-gray-600 px-3 py-1 text-xs font-medium text-white hover:bg-gray-500 transition-colors cursor-pointer"
          >
            {variable}
          </button>
        ))}
      </div>
    </div>
  );
}
