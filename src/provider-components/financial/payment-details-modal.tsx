"use client";

import { cn } from "@/lib/utils";
import { ModalWrapper, ModalButton } from "@/components/ui/modal-wrapper";

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

const statusColors = {
  Paid: "bg-[#22C55E] text-white",
  Pending: "bg-[#FBBF24] text-white",
  Failed: "bg-[#F87171] text-white",
};

export function PaymentDetailsModal({
  isOpen,
  onClose,
  payment,
  onDownloadReceipt,
}: PaymentDetailsModalProps) {
  if (!payment) return null;

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Payment Details"
      actions={
        <>
          <ModalButton onClick={onDownloadReceipt ?? onClose} variant="primary">
            Download Receipts
          </ModalButton>
          <ModalButton onClick={onClose} variant="secondary">
            Close
          </ModalButton>
        </>
      }
    >
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
      <div className="mt-6">
        <h4 className="text-base font-semibold text-white mb-4">Breakdown</h4>
        <div className="space-y-3">
          {payment.breakdown.map((item) => (
            <div
              key={item.name}
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
    </ModalWrapper>
  );
}
