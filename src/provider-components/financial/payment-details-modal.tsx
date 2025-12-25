"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreakdownItem {
  name: string;
  amount: string;
}

interface PaymentDetails {
  paymentId: string;
  date: string;
  amount: string;
  status: "Paid" | "Pending" | "Failed";
  method: string;
  breakdown: BreakdownItem[];
  total: string;
}

interface PaymentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  payment: PaymentDetails | null;
  onDownloadReceipt?: () => void;
}

export function PaymentDetailsModal({
  isOpen,
  onClose,
  payment,
  onDownloadReceipt,
}: PaymentDetailsModalProps) {
  if (!isOpen || !payment) return null;

  const statusColors = {
    Paid: "bg-[#22C55E] text-white",
    Pending: "bg-[#FBBF24] text-white",
    Failed: "bg-[#F87171] text-white",
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg">
        <div className="relative rounded-2xl border border-[#2a2d4a] bg-[#1D1D41] shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#2a2d4a] px-6 py-4">
            <h2 className="text-lg font-semibold text-white">Payment Details</h2>
            <button
              onClick={onClose}
              className="rounded-lg p-1 text-gray-400 hover:bg-[#2a2d4a] hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-5 space-y-6">
            {/* Payment ID */}
            <div>
              <h3 className="text-base font-semibold text-white mb-4">
                Payment ID: {payment.paymentId}
              </h3>
            </div>

            {/* Payment Info Grid */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-400 mb-1">Date:</p>
                <p className="text-sm text-white">{payment.date}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Amount:</p>
                <p className="text-sm font-medium text-white">{payment.amount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-2">Status:</p>
                <span
                  className={cn(
                    "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
                    statusColors[payment.status]
                  )}
                >
                  {payment.status}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Method:</p>
                <p className="text-sm text-white">{payment.method}</p>
              </div>
            </div>

            {/* Breakdown Section */}
            <div>
              <h4 className="text-base font-semibold text-white mb-4">Breakdown</h4>
              <div className="space-y-3">
                {payment.breakdown.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 border-b border-[#2a2d4a] last:border-b-0"
                  >
                    <span className="text-sm text-gray-300">{item.name}</span>
                    <span className="text-sm font-medium text-white">{item.amount}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between py-3 border-t-2 border-[#2a2d4a]">
                  <span className="text-sm font-semibold text-white">Total</span>
                  <span className="text-sm font-bold text-white">{payment.total}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 border-t border-[#2a2d4a] px-6 py-4">
            <button
              onClick={onDownloadReceipt}
              className="rounded-lg bg-[#3B82F6] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#2563EB] transition-colors"
            >
              Download Receipts
            </button>
            <button
              onClick={onClose}
              className="rounded-lg bg-[#2a2d4a] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#374151] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
