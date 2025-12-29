"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface CertificationPackage {
  id: string;
  quantity: number;
  price: string;
  priceValue: number;
  savings?: string;
}

interface PurchaseCertificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchase?: (packageId: string) => void;
  currentPlanCertifications?: number;
  usedCertifications?: number;
  packages?: CertificationPackage[];
}

const defaultPackages: CertificationPackage[] = [
  { id: "1", quantity: 5, price: "$999", priceValue: 999 },
  { id: "2", quantity: 10, price: "$1,799", priceValue: 1799, savings: "Save 10%" },
  { id: "3", quantity: 25, price: "$3,799", priceValue: 3799, savings: "Save 20%" },
];

export function PurchaseCertificationsModal({
  isOpen,
  onClose,
  onPurchase,
  currentPlanCertifications = 25,
  usedCertifications = 12,
  packages = defaultPackages,
}: PurchaseCertificationsModalProps) {
  const [selectedPackage, setSelectedPackage] = useState<string>(packages[1]?.id || "");

  if (!isOpen) return null;

  const selectedPkg = packages.find((pkg) => pkg.id === selectedPackage);

  const handlePurchase = () => {
    if (selectedPackage) {
      onPurchase?.(selectedPackage);
      onClose();
    }
  };

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg rounded-2xl border border-[#2a2d4a] bg-[#1D1D41] shadow-2xl mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#2a2d4a]">
          <h2 className="text-xl font-semibold text-white">Purchase Additional Certifications</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-[#2a2d4a] hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Current Usage Info */}
          <p className="text-sm text-gray-400">
            Your current plan includes {currentPlanCertifications} certifications per month. You have used{" "}
            {usedCertifications} certifications this month.
          </p>

          {/* Certification Packages */}
          <div className="space-y-3">
            {packages.map((pkg) => (
              <button
                key={pkg.id}
                onClick={() => setSelectedPackage(pkg.id)}
                className={cn(
                  "w-full flex items-center justify-between rounded-xl border p-4 transition-all",
                  selectedPackage === pkg.id
                    ? "border-[#00D1FF] bg-[#00D1FF]/10"
                    : "border-[#2a2d4a] bg-[#252850] hover:border-[#3B82F6]"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#00D1FF] flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-white">
                      {pkg.quantity} Additional Certifications
                    </p>
                    <p className="text-xs text-gray-400">
                      One-time purchase{pkg.savings ? ` (${pkg.savings})` : ""}
                    </p>
                  </div>
                </div>
                <span className="text-lg font-bold text-white">{pkg.price}</span>
              </button>
            ))}
          </div>

          {/* Total Amount */}
          <div className="flex items-center justify-between pt-4 border-t border-[#2a2d4a]">
            <span className="text-lg font-semibold text-white">Total Amount:</span>
            <span className="text-lg font-bold text-white">{selectedPkg?.price || "$0"}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-4 p-6 border-t border-[#2a2d4a]">
          <button
            onClick={handlePurchase}
            disabled={!selectedPackage}
            className="px-6 py-2.5 rounded-lg bg-[#3B82F6] text-sm font-medium text-white hover:bg-[#2563EB] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Purchase Now
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
