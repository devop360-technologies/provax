"use client";

import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  name: string;
  price: string;
  period: string;
  subtext: string;
  features: PlanFeature[];
  isCurrent?: boolean;
  isPopular?: boolean;
}

interface ComparisonFeature {
  name: string;
  basic: string | boolean;
  professional: string | boolean;
  enterprise: string | boolean;
}

interface PlansPricingProps {
  className?: string;
  plans?: Plan[];
  comparisonFeatures?: ComparisonFeature[];
  onSelectPlan?: (planName: string) => void;
}

const defaultPlans: Plan[] = [
  {
    name: "Basic Plan",
    price: "$29",
    period: "/ Month",
    subtext: "One-time payment",
    features: [
      { text: "10 certifications", included: true },
      { text: "Basic marketplace access", included: true },
      { text: "Email support", included: true },
      { text: "Priority support", included: false },
      { text: "Analytics dashboard", included: false },
    ],
    isCurrent: false,
  },
  {
    name: "Professional Plan",
    price: "$79",
    period: "/ Month",
    subtext: "One-time payment",
    features: [
      { text: "50 certifications", included: true },
      { text: "Full marketplace access", included: true },
      { text: "Priority email & chat support", included: true },
      { text: "Analytics dashboard", included: true },
      { text: "Custom reporting", included: false },
    ],
    isCurrent: true,
    isPopular: true,
  },
  {
    name: "Enterprise Plan",
    price: "$199",
    period: "/ Month",
    subtext: "One-time payment",
    features: [
      { text: "Unlimited certifications", included: true },
      { text: "Full marketplace access", included: true },
      { text: "24/7 phone support", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Custom reporting", included: true },
    ],
    isCurrent: false,
  },
];

const defaultComparisonFeatures: ComparisonFeature[] = [
  { name: "Certification Limit", basic: "10", professional: "50", enterprise: "Unlimited" },
  { name: "Marketplace Access", basic: true, professional: true, enterprise: true },
  { name: "Priority Support", basic: false, professional: true, enterprise: true },
  { name: "Analytics Dashboard", basic: false, professional: true, enterprise: true },
  { name: "Custom Reporting", basic: false, professional: false, enterprise: true },
  { name: "API Access", basic: "Limited", professional: "Standard", enterprise: "Full" },
];

export function PlansPricing({
  className,
  plans = defaultPlans,
  comparisonFeatures = defaultComparisonFeatures,
  onSelectPlan,
}: PlansPricingProps) {
  return (
    <div className={cn("space-y-8", className)}>
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-1">Available Subscription Plans</h2>
        <p className="text-sm text-gray-400">
          Choose the plan that best fits your needs. Upgrade or downgrade at any time.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={cn(
              "rounded-xl border bg-[#1D1D41] p-6 relative",
              plan.isCurrent ? "border-[#00D1FF]" : "border-[#2a2d4a]"
            )}
          >
            {plan.isCurrent && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center rounded-full bg-[#00D1FF] px-3 py-1 text-xs font-medium text-white">
                  Current Plan
                </span>
              </div>
            )}

            <h3 className="text-xl font-bold text-white text-center mb-6 mt-2">{plan.name}</h3>

            <div className="text-center mb-2">
              <span className="text-4xl font-bold text-white">{plan.price}</span>
              <span className="text-sm text-gray-400">{plan.period}</span>
            </div>
            <p className="text-xs text-gray-500 text-center mb-6">{plan.subtext}</p>

            <div className="space-y-3 mb-8">
              {plan.features.map((feature, featureIndex) => (
                <div key={featureIndex} className="flex items-center gap-2">
                  {feature.included ? (
                    <Check className="w-4 h-4 text-[#00D1FF]" />
                  ) : (
                    <X className="w-4 h-4 text-gray-500" />
                  )}
                  <span
                    className={cn(
                      "text-sm",
                      feature.included ? "text-gray-300" : "text-gray-500"
                    )}
                  >
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => onSelectPlan?.(plan.name)}
              className={cn(
                "w-full py-2.5 rounded-lg text-sm font-medium transition-colors",
                plan.isCurrent
                  ? "bg-[#00D1FF] text-white hover:bg-[#00B8E0]"
                  : "bg-transparent border border-[#2a2d4a] text-gray-300 hover:bg-[#2a2d4a]"
              )}
            >
              {plan.isCurrent ? "Current Plan" : `Select ${plan.name.split(" ")[0]} Plan`}
            </button>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Compare Plan Benefits</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2a2d4a]">
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-400 w-1/4">
                  Feature
                </th>
                <th className="text-center py-4 px-4 text-sm font-medium text-gray-400 w-1/4">
                  Basic
                </th>
                <th className="text-center py-4 px-4 text-sm font-medium text-gray-400 w-1/4">
                  Professional
                </th>
                <th className="text-center py-4 px-4 text-sm font-medium text-gray-400 w-1/4">
                  Enterprise
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.map((feature, index) => (
                <tr key={index} className="border-b border-[#2a2d4a] last:border-b-0">
                  <td className="py-4 px-4 text-sm text-gray-300">{feature.name}</td>
                  <td className="py-4 px-4 text-center">
                    {typeof feature.basic === "boolean" ? (
                      feature.basic ? (
                        <Check className="w-5 h-5 text-[#22C55E] mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-[#F87171] mx-auto" />
                      )
                    ) : (
                      <span className="text-sm text-gray-300">{feature.basic}</span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {typeof feature.professional === "boolean" ? (
                      feature.professional ? (
                        <Check className="w-5 h-5 text-[#22C55E] mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-[#F87171] mx-auto" />
                      )
                    ) : (
                      <span className="text-sm text-gray-300">{feature.professional}</span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {typeof feature.enterprise === "boolean" ? (
                      feature.enterprise ? (
                        <Check className="w-5 h-5 text-[#22C55E] mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-[#F87171] mx-auto" />
                      )
                    ) : (
                      <span className="text-sm text-gray-300">{feature.enterprise}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
