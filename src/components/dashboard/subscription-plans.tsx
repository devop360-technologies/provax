"use client";

import React from "react";
import { Check } from "lucide-react";

export function SubscriptionPlans() {
  const plans = [
    {
      name: "Basic Plan",
      price: 29,
      period: "Month",
      features: [
        "Up to 10 transactions/month",
        "Basic analytics", 
        "Email support"
      ],
      subscribers: "12 Active Subscribers",
      isPopular: false
    },
    {
      name: "Professional Plan", 
      price: 79,
      period: "Month",
      features: [
        "Up to 100 transactions/month",
        "Advanced analytics",
        "Priority support", 
        "API access"
      ],
      subscribers: "34 Active Subscribers",
      isPopular: true
    },
    {
      name: "Enterprise Plan",
      price: 199,
      period: "Month", 
      features: [
        "Unlimited transactions",
        "Custom analytics",
        "24/7 dedicated support",
        "Full API access",
        "Custom integrations"
      ],
      subscribers: "8 Active Subscribers",
      isPopular: false
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-2">Provider Subscription Management</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, idx) => (
          <div 
            key={plan.name}
            className={`rounded-2xl border p-8 ${
              plan.isPopular 
                ? 'border-cyan-500 bg-[#1D1D41]' 
                : 'border-[#2a2d4a] bg-[#1D1D41]'
            }`}
          >
            {plan.isPopular && (
              <div className="mb-4">
                <span className="bg-cyan-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  Most Popular
                </span>
              </div>
            )}
            
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">{plan.name}</h3>
              <div className="mb-2">
                <span className="text-4xl font-bold text-white">${plan.price}</span>
                <span className="text-gray-400 ml-1">/ {plan.period}</span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <span className="text-sm text-gray-300">{feature}</span>
                </div>
              ))}
            </div>

            <div className="text-center text-sm text-gray-400 mb-6">
              {plan.subscribers}
            </div>

            <button className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
              plan.isPopular
                ? 'bg-cyan-600 hover:bg-cyan-700 text-white'
                : 'bg-[#252850] hover:bg-[#2a2d4a] text-gray-300 border border-[#2a2d4a]'
            }`}>
              {plan.isPopular ? 'Upgrade Plan' : 'Select Plan'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubscriptionPlans;