"use client";

import { createPortal } from "react-dom";
import { X, CheckCircle, Info } from "lucide-react";

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
  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl rounded-2xl border border-[#2a2d4a] bg-[#1D1D41] shadow-2xl mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#2a2d4a]">
          <h2 className="text-xl font-semibold text-white">Subscription Details</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-[#2a2d4a] hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
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
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
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

        {/* Footer */}
        <div className="flex items-center justify-center gap-4 p-6 border-t border-[#2a2d4a]">
          <button
            onClick={onRenew}
            className="px-6 py-2.5 rounded-lg bg-[#F87171] text-sm font-medium text-white hover:bg-[#EF4444] transition-colors"
          >
            Renew Now
          </button>
          <button
            onClick={onUpgrade}
            className="px-6 py-2.5 rounded-lg bg-[#22C55E] text-sm font-medium text-white hover:bg-[#16A34A] transition-colors"
          >
            Upgrade Plan
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg bg-[#3B82F6] text-sm font-medium text-white hover:bg-[#2563EB] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  if (typeof window === "undefined") return null;

  return createPortal(modalContent, document.body);
}
