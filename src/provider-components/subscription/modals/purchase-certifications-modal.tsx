"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { ModalWrapper, ModalButton } from "@/components/ui/modal-wrapper";

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

  const selectedPkg = packages.find((pkg) => pkg.id === selectedPackage);

  const handlePurchase = () => {
    if (selectedPackage) {
      onPurchase?.(selectedPackage);
      onClose();
    }
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Purchase Additional Certifications"
      actions={
        <>
          <ModalButton onClick={handlePurchase} disabled={!selectedPackage} variant="primary">
            Purchase Now
          </ModalButton>
          <ModalButton onClick={onClose} variant="secondary">
            Cancel
          </ModalButton>
        </>
      }
    >
      <div className="space-y-6">
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
    </ModalWrapper>
  );
}
