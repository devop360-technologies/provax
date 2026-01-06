"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { X, AlertTriangle } from "lucide-react";

interface FailedPaymentDetails {
  date: string;
  amount: string;
  status: string;
}

interface RetryPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRetry?: (cardDetails: { cardNumber: string; expiry: string; cvc: string }) => void;
  failedPayment?: FailedPaymentDetails;
}

const defaultFailedPayment: FailedPaymentDetails = {
  date: "15 May 2023",
  amount: "$4,999",
  status: "Failed - Card Decline",
};

export function RetryPaymentModal({
  isOpen,
  onClose,
  onRetry,
  failedPayment = defaultFailedPayment,
}: RetryPaymentModalProps) {
  const [cardNumber, setCardNumber] = useState("4242 4242 4242 4242");
  const [expiry, setExpiry] = useState("08/25");
  const [cvc, setCvc] = useState("123");

  if (!isOpen) return null;

  const handleRetry = () => {
    onRetry?.({ cardNumber, expiry, cvc });
    onClose();
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
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
          <h2 className="text-xl font-semibold text-white">Retry Failed Payment</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-[#2a2d4a] hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Failed Payment Details */}
          <div>
            <h4 className="text-sm font-medium text-gray-400 mb-3">Failed Payment Details</h4>
            <div className="rounded-xl bg-[#F87171] p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-[#7F1D1D]">Date:</span>
                <span className="text-sm font-medium text-[#7F1D1D]">{failedPayment.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#7F1D1D]">Amount:</span>
                <span className="text-sm font-medium text-[#7F1D1D]">{failedPayment.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#7F1D1D]">Status:</span>
                <span className="text-sm font-medium text-[#7F1D1D]">{failedPayment.status}</span>
              </div>
            </div>
          </div>

          {/* Update Payment Method */}
          <div>
            <h4 className="text-sm font-medium text-gray-400 mb-3">Update Payment Method</h4>
            
            {/* Card Number */}
            <div className="mb-4">
              <label htmlFor="retry-card-number" className="block text-sm font-medium text-white mb-2">Card Number</label>
              <input
                type="text"
                id="retry-card-number"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                maxLength={19}
                className="w-full rounded-xl border border-[#2a2d4a] bg-[#252850] px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                placeholder="1234 5678 9012 3456"
              />
            </div>

            {/* Expiry and CVC */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="retry-expiry" className="block text-sm font-medium text-white mb-2">Expiration Date</label>
                <input
                  type="text"
                  id="retry-expiry"
                  value={expiry}
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                  maxLength={5}
                  className="w-full rounded-xl border border-[#2a2d4a] bg-[#252850] px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <label htmlFor="retry-cvc" className="block text-sm font-medium text-white mb-2">CVC</label>
                <input
                  type="text"
                  id="retry-cvc"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  maxLength={4}
                  className="w-full rounded-xl border border-[#2a2d4a] bg-[#252850] px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  placeholder="123"
                />
              </div>
            </div>
          </div>

          {/* Warning Notice */}
          <div className="flex items-center gap-3 rounded-xl bg-[#FBBF24]/20 border border-[#FBBF24] p-4">
            <AlertTriangle className="w-5 h-5 text-[#FBBF24] flex-shrink-0" />
            <p className="text-sm text-[#FBBF24]">
              Your account features are currently restricted due to this failed payment. They will be restored immediately after successful payment.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-4 p-6 border-t border-[#2a2d4a]">
          <button
            onClick={handleRetry}
            className="px-6 py-2.5 rounded-lg bg-[#F87171] text-sm font-medium text-white hover:bg-[#EF4444] transition-colors"
          >
            Retry Payment
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
