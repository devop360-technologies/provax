"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { X, ChevronDown, AlertCircle } from "lucide-react";

interface PaymentMethod {
  id: string;
  type: "mastercard" | "visa";
  lastFour: string;
  expiry: string;
}

interface UpgradeSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: (paymentMethodId: string, agreedToTerms: boolean) => void;
  currentPlan?: string;
  targetPlan?: string;
  paymentMethods?: PaymentMethod[];
}

const defaultPaymentMethods: PaymentMethod[] = [
  { id: "1", type: "mastercard", lastFour: "8765", expiry: "12/2024" },
  { id: "2", type: "visa", lastFour: "4242", expiry: "06/2025" },
];

export function UpgradeSubscriptionModal({
  isOpen,
  onClose,
  onConfirm,
  currentPlan = "Professional",
  targetPlan = "Enterprise",
  paymentMethods = defaultPaymentMethods,
}: UpgradeSubscriptionModalProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (agreedToTerms) {
      onConfirm?.(selectedPaymentMethod, agreedToTerms);
      onClose();
    }
  };

  const selectedMethod = paymentMethods.find(pm => pm.id === selectedPaymentMethod);

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-xl rounded-2xl border border-[#2a2d4a] bg-[#1D1D41] shadow-2xl mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#2a2d4a]">
          <h2 className="text-xl font-semibold text-white">Upgrade Subscription Plan</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-[#2a2d4a] hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Upgrade Message */}
          <p className="text-gray-300">
            You are about to upgrade from {currentPlan} to {targetPlan} plan.
          </p>

          {/* Notice */}
          <div className="rounded-xl bg-[#252850] p-4">
            <p className="text-sm">
              <span className="font-semibold text-white">Changes will take effect immediately.</span>{" "}
              <span className="text-gray-400">
                You will be charged a prorated amount for the remainder of your billing cycle.
              </span>
            </p>
          </div>

          {/* Payment Method Selection */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Select Payment Method</h4>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between rounded-xl border border-[#2a2d4a] bg-[#252850] px-4 py-3 text-sm text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              >
                <span>
                  {selectedMethod
                    ? `${selectedMethod.type === "mastercard" ? "Mastercard" : "Visa"} ending in ${selectedMethod.lastFour}`
                    : "Add New Payment method"}
                </span>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 rounded-xl border border-[#2a2d4a] bg-[#252850] shadow-lg z-10">
                  <button
                    onClick={() => {
                      setSelectedPaymentMethod("");
                      setIsDropdownOpen(false);
                    }}
                    className="w-full px-4 py-3 text-left text-sm text-white hover:bg-[#2a2d4a] first:rounded-t-xl"
                  >
                    Add New Payment method
                  </button>
                  {paymentMethods.map((pm) => (
                    <button
                      key={pm.id}
                      onClick={() => {
                        setSelectedPaymentMethod(pm.id);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full px-4 py-3 text-left text-sm text-white hover:bg-[#2a2d4a] last:rounded-b-xl flex items-center gap-3"
                    >
                      <div className="w-8 h-5 rounded bg-gradient-to-r from-[#EB001B] to-[#F79E1B] flex items-center justify-center">
                        {pm.type === "mastercard" ? (
                          <div className="flex">
                            <div className="w-3 h-3 rounded-full bg-[#EB001B] opacity-80" />
                            <div className="w-3 h-3 rounded-full bg-[#F79E1B] -ml-1 opacity-80" />
                          </div>
                        ) : (
                          <span className="text-[8px] font-bold text-white">VISA</span>
                        )}
                      </div>
                      {pm.type === "mastercard" ? "Mastercard" : "Visa"} ending in {pm.lastFour}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Terms Agreement */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="w-5 h-5 rounded border-[#2a2d4a] bg-[#252850] text-[#3B82F6] focus:ring-[#3B82F6] focus:ring-offset-0"
            />
            <span className="text-sm text-gray-300">
              I agree to the{" "}
              <a href="#" className="text-[#00D1FF] hover:underline">
                terms and conditions
              </a>
            </span>
          </label>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-4 p-6 border-t border-[#2a2d4a]">
          <button
            onClick={handleConfirm}
            disabled={!agreedToTerms}
            className="px-6 py-2.5 rounded-lg bg-[#3B82F6] text-sm font-medium text-white hover:bg-[#2563EB] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm Upgrade
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg bg-[#4B5563] text-sm font-medium text-white hover:bg-[#374151] transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  if (typeof window === "undefined") return null;

  return createPortal(modalContent, document.body);
}
