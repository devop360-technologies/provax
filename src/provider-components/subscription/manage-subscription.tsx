"use client";

import { ArrowUp, ArrowDown, X, CreditCard, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaymentMethod {
  type: "mastercard" | "visa";
  lastFour: string;
  expiry: string;
  billingAddress: string;
}

interface FailedPayment {
  date: string;
  message: string;
}

interface ManageSubscriptionProps {
  className?: string;
  paymentMethod?: PaymentMethod;
  failedPayment?: FailedPayment | null;
  onUpgradePlan?: () => void;
  onDowngradePlan?: () => void;
  onCancelSubscription?: () => void;
  onChangePaymentMethod?: () => void;
  onRetryPayment?: () => void;
}

const defaultPaymentMethod: PaymentMethod = {
  type: "mastercard",
  lastFour: "8765",
  expiry: "12/2024",
  billingAddress: "123 Main St, New York",
};

const defaultFailedPayment: FailedPayment = {
  date: "15 May 2023",
  message: "Your card was declined. Please update your payment method to avoid service interruption.",
};

export function ManageSubscription({
  className,
  paymentMethod = defaultPaymentMethod,
  failedPayment = defaultFailedPayment,
  onUpgradePlan,
  onDowngradePlan,
  onCancelSubscription,
  onChangePaymentMethod,
  onRetryPayment,
}: ManageSubscriptionProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-1">Manage Your Subscription</h2>
        <p className="text-sm text-gray-400">
          Make changes to your subscription plan, payment method, or cancel your subscription.
        </p>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Upgrade Plan */}
        <div className="rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6 text-center">
          <h3 className="text-lg font-semibold text-white mb-4">Upgrade Plan</h3>
          <div className="flex justify-center mb-4">
            <ArrowUp className="w-10 h-10 text-[#3B82F6]" />
          </div>
          <p className="text-sm text-gray-400 mb-6">
            Upgrade to a higher plan with more features and benefits.
          </p>
          <button
            onClick={onUpgradePlan}
            className="w-full py-2.5 rounded-lg bg-[#3B82F6] text-sm font-medium text-white hover:bg-[#2563EB] transition-colors"
          >
            Upgrade Plan
          </button>
        </div>

        {/* Downgrade Plan */}
        <div className="rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6 text-center">
          <h3 className="text-lg font-semibold text-white mb-4">Downgrade Plan</h3>
          <div className="flex justify-center mb-4">
            <ArrowDown className="w-10 h-10 text-[#F59E0B]" />
          </div>
          <p className="text-sm text-gray-400 mb-6">
            Downgrade to a lower plan with fewer features.
          </p>
          <button
            onClick={onDowngradePlan}
            className="w-full py-2.5 rounded-lg bg-[#F59E0B] text-sm font-medium text-white hover:bg-[#D97706] transition-colors"
          >
            Downgrade Plan
          </button>
        </div>

        {/* Cancel Subscription */}
        <div className="rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6 text-center">
          <h3 className="text-lg font-semibold text-white mb-4">Cancel Subscription</h3>
          <div className="flex justify-center mb-4">
            <X className="w-10 h-10 text-[#F87171]" />
          </div>
          <p className="text-sm text-gray-400 mb-6">
            Cancel your subscription. Your access will continue until the end of your billing period.
          </p>
          <button
            onClick={onCancelSubscription}
            className="w-full py-2.5 rounded-lg bg-[#F87171] text-sm font-medium text-white hover:bg-[#EF4444] transition-colors"
          >
            Cancel Subscription
          </button>
        </div>
      </div>

      {/* Payment Method Section */}
      <div className="rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Payment Method</h3>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Card Icon */}
            <div className="w-14 h-10 rounded-lg bg-gradient-to-r from-[#EB001B] to-[#F79E1B] flex items-center justify-center">
              {paymentMethod.type === "mastercard" ? (
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
                {paymentMethod.type === "mastercard" ? "Mastercard" : "Visa"} ending in {paymentMethod.lastFour}
              </p>
              <p className="text-xs text-gray-400">
                Expires: {paymentMethod.expiry} • Billing address: {paymentMethod.billingAddress}
              </p>
            </div>
          </div>

          <button
            onClick={onChangePaymentMethod}
            className="rounded-lg bg-[#F59E0B] px-4 py-2 text-sm font-medium text-white hover:bg-[#D97706] transition-colors"
          >
            Change Payment Method
          </button>
        </div>
      </div>

      {/* Failed Payment Alert */}
      {failedPayment && (
        <div className="rounded-xl border border-[#F87171] bg-[#F87171]/10 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Failed Payment</h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#F87171] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-white">
                  Payment failed on {failedPayment.date}
                </p>
                <p className="text-sm text-gray-400">{failedPayment.message}</p>
              </div>
            </div>

            <button
              onClick={onRetryPayment}
              className="rounded-lg bg-[#F87171] px-4 py-2 text-sm font-medium text-white hover:bg-[#EF4444] transition-colors"
            >
              Retry Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
