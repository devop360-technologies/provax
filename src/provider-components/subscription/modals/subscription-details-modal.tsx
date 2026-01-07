"use client";

import { CheckCircle, Info } from "lucide-react";
import { ModalWrapper, ModalButton } from "@/components/ui/modal-wrapper";

interface SubscriptionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRenew?: () => void;
  onUpgrade?: () => void;
  planName?: string;
  planDescription?: string;
  startedOn?: string;
  renewalDate?: string;
  monthlyCost?: string;
  paymentMethod?: string;
  benefits?: { name: string; included: boolean }[];
}

const defaultBenefits = [
  { name: "25 Certifications/month", included: true },
  { name: "Advanced AI Tools", included: true },
  { name: "15 Vehicle Listings", included: true },
  { name: "Priority Placement", included: true },
  { name: "2.5% Platform Fee", included: true },
  { name: "Priority Support", included: true },
];

export function SubscriptionDetailsModal({
  isOpen,
  onClose,
  onRenew,
  onUpgrade,
  planName = "Premium Report Bundle",
  planDescription = "5 Vehicle Reports + AI Analysis",
  startedOn = "15 Apr 2023",
  renewalDate = "15 Sep 2023",
  monthlyCost = "$4,999",
  paymentMethod = "Visa ending in 4242",
  benefits = defaultBenefits,
}: SubscriptionDetailsModalProps) {
  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Subscription Details"
      maxWidth="max-w-2xl"
      actions={
        <>
          <ModalButton onClick={onRenew ?? onClose} variant="danger">
            Renew Now
          </ModalButton>
          <ModalButton onClick={onUpgrade ?? onClose} variant="primary" className="!bg-[#22C55E] hover:!bg-[#16A34A]">
            Upgrade Plan
          </ModalButton>
          <ModalButton onClick={onClose} variant="primary">
            Close
          </ModalButton>
        </>
      }
    >
      <div className="space-y-6">
        {/* Plan Header */}
        <div className="rounded-xl bg-[#252850] p-4">
          <h3 className="text-lg font-bold text-white">{planName}</h3>
          <p className="text-sm text-gray-400">{planDescription}</p>
        </div>

        {/* Plan Info Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-[#252850] p-4">
            <p className="text-sm text-gray-400 mb-1">Started On</p>
            <p className="text-white font-medium">{startedOn}</p>
          </div>
          <div className="rounded-xl bg-[#252850] p-4">
            <p className="text-sm text-gray-400 mb-1">Renewal Date</p>
            <p className="text-white font-medium">{renewalDate}</p>
          </div>
          <div className="rounded-xl bg-[#252850] p-4">
            <p className="text-sm text-gray-400 mb-1">Monthly Cost</p>
            <p className="text-white font-medium">{monthlyCost}</p>
          </div>
          <div className="rounded-xl bg-[#252850] p-4">
            <p className="text-sm text-gray-400 mb-1">Payment Method</p>
            <p className="text-white font-medium">{paymentMethod}</p>
          </div>
        </div>

        {/* Plan Benefits */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Plan Benefits:</h4>
          <div className="grid grid-cols-2 gap-3">
            {benefits.map((benefit) => (
              <div key={benefit.name} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-[#00D1FF] flex-shrink-0" />
                <span className="text-sm text-white">{benefit.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Auto-renewal Notice */}
        <div className="flex items-center gap-3 rounded-xl bg-[#036D3B]/20 border border-[#036D3B]/30 p-4 mt-4">
          <Info className="w-5 h-5 text-[#036D3B] flex-shrink-0" />
          <p className="text-sm text-[#036D3B]">
            Your subscription will automatically renew on {renewalDate}. You can cancel auto-renewal at any time.
          </p>
        </div>
      </div>
    </ModalWrapper>
  );
}
