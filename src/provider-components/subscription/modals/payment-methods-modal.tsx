"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { X, Shield } from "lucide-react";

interface PaymentMethod {
  id: string;
  type: "mastercard" | "visa";
  lastFour: string;
  expiry: string;
  billingAddress: string;
  isDefault: boolean;
}

interface PaymentMethodsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPaymentMethod?: (cardDetails: {
    cardNumber: string;
    expiry: string;
    cvc: string;
    cardholderName: string;
    setAsDefault: boolean;
  }) => void;
  currentPaymentMethod?: PaymentMethod;
}

const defaultPaymentMethod: PaymentMethod = {
  id: "1",
  type: "mastercard",
  lastFour: "8765",
  expiry: "12/2024",
  billingAddress: "123 Main St, New York",
  isDefault: true,
};

export function PaymentMethodsModal({
  isOpen,
  onClose,
  onAddPaymentMethod,
  currentPaymentMethod = defaultPaymentMethod,
}: PaymentMethodsModalProps) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [setAsDefault, setSetAsDefault] = useState(false);

  if (!isOpen) return null;

  const handleAddPaymentMethod = () => {
    onAddPaymentMethod?.({ cardNumber, expiry, cvc, cardholderName, setAsDefault });
    setCardNumber("");
    setExpiry("");
    setCvc("");
    setCardholderName("");
    setSetAsDefault(false);
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
          <h2 className="text-xl font-semibold text-white">Payment Methods</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-[#2a2d4a] hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Current Payment Method */}
          <div>
            <h4 className="text-sm font-medium text-gray-400 mb-3">Current Payment Method</h4>
            <div className="flex items-center justify-between rounded-xl border border-[#2a2d4a] bg-[#252850] p-4">
              <div className="flex items-center gap-4">
                {/* Card Icon */}
                <div className="w-14 h-10 rounded-lg bg-gradient-to-r from-[#EB001B] to-[#F79E1B] flex items-center justify-center">
                  {currentPaymentMethod.type === "mastercard" ? (
                    <div className="flex">
                      <div className="w-5 h-5 rounded-full bg-[#EB001B] opacity-80" />
                      <div className="w-5 h-5 rounded-full bg-[#F79E1B] -ml-2 opacity-80" />
                    </div>
                  ) : (
                    <span className="text-xs font-bold text-white">VISA</span>
                  )}
                </div>

                <div>
                  <p className="text-sm font-medium text-white">
                    {currentPaymentMethod.type === "mastercard" ? "Mastercard" : "Visa"} ending in{" "}
                    {currentPaymentMethod.lastFour}
                  </p>
                  <p className="text-xs text-gray-400">
                    Expires: {currentPaymentMethod.expiry} • Billing address: {currentPaymentMethod.billingAddress}
                  </p>
                </div>
              </div>

              {currentPaymentMethod.isDefault && (
                <span className="text-sm font-medium text-[#3B82F6]">Default</span>
              )}
            </div>
          </div>

          {/* Add New Payment Method */}
          <div>
            <h4 className="text-sm font-medium text-gray-400 mb-3">Add New Payment Method</h4>

            {/* Card Number */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-white mb-2">Card Number</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                maxLength={19}
                className="w-full rounded-xl border border-[#2a2d4a] bg-[#252850] px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                placeholder="4242 4242 4242 4242"
              />
            </div>

            {/* Expiry and CVC */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Expiration Date</label>
                <input
                  type="text"
                  value={expiry}
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                  maxLength={5}
                  className="w-full rounded-xl border border-[#2a2d4a] bg-[#252850] px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  placeholder="08/25"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">CVC</label>
                <input
                  type="text"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  maxLength={4}
                  className="w-full rounded-xl border border-[#2a2d4a] bg-[#252850] px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  placeholder="123"
                />
              </div>
            </div>

            {/* Cardholder Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-white mb-2">Cardholder Name</label>
              <input
                type="text"
                value={cardholderName}
                onChange={(e) => setCardholderName(e.target.value)}
                className="w-full rounded-xl border border-[#2a2d4a] bg-[#252850] px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                placeholder="John Doe"
              />
            </div>

            {/* Set as Default */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={setAsDefault}
                onChange={(e) => setSetAsDefault(e.target.checked)}
                className="w-5 h-5 rounded border-[#2a2d4a] bg-[#252850] text-[#3B82F6] focus:ring-[#3B82F6] focus:ring-offset-0"
              />
              <span className="text-sm text-gray-300">Set as default payment method</span>
            </label>
          </div>

          {/* Security Notice */}
          <div className="flex items-center gap-3 rounded-xl bg-[#252850] p-4">
            <Shield className="w-5 h-5 text-[#FBBF24] flex-shrink-0" />
            <p className="text-sm text-gray-400">
              Your payment information is encrypted and secure. We don&apos;t store your full card details.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-4 p-6 border-t border-[#2a2d4a]">
          <button
            onClick={handleAddPaymentMethod}
            className="px-6 py-2.5 rounded-lg bg-[#3B82F6] text-sm font-medium text-white hover:bg-[#2563EB] transition-colors"
          >
            Add Payment Method
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
