/**
 * Shared auth form utilities and components
 */

import { Eye, EyeOff } from "lucide-react";

export interface PasswordInputProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  showPassword: boolean;
  onToggle: () => void;
  required?: boolean;
}

export function PasswordInput({
  id,
  label,
  placeholder,
  value,
  onChange,
  showPassword,
  onToggle,
  required = true,
}: Readonly<PasswordInputProps>) {
  return (
    <div>
      <label htmlFor={id} className="block text-white text-sm font-medium mb-3">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 pr-12 bg-transparent border border-gray-500 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
          required={required}
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
        >
          {showPassword ? (
            <Eye className="w-5 h-5" />
          ) : (
            <EyeOff className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
}

/**
 * Password validation utility
 */
export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("Be at least 8 characters long");
  }
  if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
    errors.push("Contain both uppercase and lowercase letters");
  }
  if (!/\d/.test(password)) {
    errors.push("Include at least one number");
  }
  if (!/[!@#$%^&*]/.test(password)) {
    errors.push("Have at least one special character");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Common auth form styles
 */
export const AUTH_FORM_CLASSES = {
  container: "min-h-screen flex",
  imageSection: "hidden lg:flex lg:w-1/2 relative",
  formSection: "w-full lg:w-1/2 bg-[#141332] flex items-center justify-center p-8",
  formWrapper: "max-w-md w-full space-y-8",
  headerTitle: "text-3xl font-bold text-white mb-2",
  headerSubtitle: "text-gray-300",
  headerHighlight: "text-blue-400 font-medium",
  form: "space-y-6",
  errorMessage: "text-red-400 text-sm text-center",
  successMessage: "text-green-400 text-sm text-center",
  submitButton: "w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center",
} as const;

/**
 * Password requirements component
 */
export function PasswordRequirements({ requirements }: { requirements: string[] }) {
  return (
    <div className="text-gray-400 text-xs space-y-1">
      <p>Password must:</p>
      <ul className="list-disc list-inside space-y-1 ml-2">
        {requirements.map((req, idx) => (
          <li key={idx}>{req}</li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Loading spinner for buttons
 */
export function LoadingSpinner() {
  return (
    <svg
      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
