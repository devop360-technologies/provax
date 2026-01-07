"use client";

import { ArrowUp, ArrowDown, X, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ActionCardStyled } from "@/components/ui/action-card";

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
        <ActionCardStyled
          title="Upgrade Plan"
          description="Upgrade to a higher plan with more features and benefits."
          icon={ArrowUp}
          iconColor="text-[#3B82F6]"
          buttonText="Upgrade Plan"
          buttonColor="#3B82F6"
          buttonHoverColor="#2563EB"
          onClick={onUpgradePlan}
        />

        <ActionCardStyled
          title="Downgrade Plan"
          description="Downgrade to a lower plan with fewer features."
          icon={ArrowDown}
          iconColor="text-[#F59E0B]"
          buttonText="Downgrade Plan"
          buttonColor="#F59E0B"
          buttonHoverColor="#D97706"
          onClick={onDowngradePlan}
        />

        <ActionCardStyled
          title="Cancel Subscription"
          description="Cancel your subscription. Your access will continue until the end of your billing period."
          icon={X}
          iconColor="text-[#F87171]"
          buttonText="Cancel Subscription"
          buttonColor="#F87171"
          buttonHoverColor="#EF4444"
          onClick={onCancelSubscription}
        />
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
        <div className="bg-[#1D1D41] p-4 md:p-8 rounded-xl border border-[#424242] ">
          <div>
            <h1 className="text-white font-base text-xl ">Failed Payment</h1>
            <hr className="my-3 bg-pink-300"/>
          </div>
        <div className="rounded-xl border border-[#F87171] bg-[#F87171]/10 p-6">
          {/* <h3 className="text-lg font-semibold text-white mb-4">Failed Payment</h3> */}
          
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

        </div>
      )}
    </div>
  );
}
