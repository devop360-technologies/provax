'use client'
import React from "react";

export default function SubscriptionPlans() {
  const plans = [
    {
      name: "Basic",
      subtitle: "For small workshops",
      price: "$19",
      period: "/ Month",
      features: [
        "Limited service listings",
        "Basic analytics",
        "Standard support"
      ],
      highlighted: false
    },
    {
      name: "Plus Plan",
      subtitle: "For small workshops",
      price: "$49",
      period: "/ Month",
      features: [
        "Unlimited listings",
        "Advanced analytics dashboard",
        "Priority support",
        "AI bidding suggestions"
      ],
      highlighted: true
    },
    {
      name: "Professional Plan",
      subtitle: "For small workshops",
      price: "$99",
      period: "/ Month",
      features: [
        "Full real-time bidding access",
        "Dedicated account manager",
        "Split payment automation",
        "Early access to new AI tools"
      ],
      highlighted: false
    }
  ];

  return (
    <section className="relative w-full min-h-screen bg-[#0a0f24] py-20 px-4 md:px-8 overflow-hidden">
      {/* Background glow effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-cyan-500/5 blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          {/* Label */}
          <div className="inline-flex items-center space-x-2 mb-6">
            <span className="inline-block w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
            <p className="text-xs md:text-[10px] font-light tracking-widest text-cyan-300/80 uppercase">
              Subscription Plan
            </p>
          </div>

          {/* Main Heading */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl  text-white mb-6 leading-tight">
            Choose Your Plan - Start Bidding  Smarter
          </h2>

          {/* Description */}
          <p className="text-sm md:text-base text-white/70 max-w-3xl mx-auto leading-relaxed">
            Join the AI-powered automotive network that connects you with real-time service requests and verified customers.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
                plan.highlighted
                  ? "border-2 border-cyan-400/60 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 md:scale-105 shadow-2xl shadow-cyan-500/20"
                  : "border-2 border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] hover:border-cyan-400/40"
              }`}
            >
              {/* Plan Content */}
              <div className="p-8 md:p-10 space-y-8">
                {/* Plan Name */}
                <div className="space-y-2">
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-white/60">
                    {plan.subtitle}
                  </p>
                </div>

                {/* Price */}
                <div className="space-y-1">
                  <div className="flex items-baseline">
                    <span className="text-4xl md:text-5xl font-bold text-white">
                      {plan.price}
                    </span>
                    <span className="text-white/60 ml-2">
                      {plan.period}
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      <span className="inline-block w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-sm md:text-base text-white/80 leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Subscribe Button */}
                <button
                  className={`w-full py-3 px-6 rounded-full font-semibold text-base transition-all duration-300 flex items-center justify-center gap-2 ${
                    plan.highlighted
                      ? "bg-cyan-400/20 border-2 border-cyan-400 text-cyan-300 hover:bg-cyan-400/30 hover:gap-3"
                      : "bg-transparent border-2 border-white/30 text-white hover:border-cyan-400/60 hover:gap-3"
                  }`}
                >
                  Subscribe Now
                  <span>→</span>
                </button>
              </div>

              {/* Glow effect on highlighted plan */}
              {plan.highlighted && (
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 hover:from-cyan-500/5 hover:to-blue-500/5 transition-all duration-300 pointer-events-none rounded-2xl"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
