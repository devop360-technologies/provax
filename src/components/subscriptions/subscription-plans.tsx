"use client";
import React from "react";
import bluesign from "../../asests/icons/bluesign.png";
import Image from "next/image";

export default function SubscriptionPlans() {
  const plans = [
    {
      name: "Basic",
      subtitle: "For small workshops",
      price: "19",
      period: "/ Month",
      features: ["Limited service listings", "Basic analytics", "Standard support"],
      highlighted: false
    },
    {
      name: "Plus Plan",
      subtitle: "For small workshops",
      price: "49",
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
      price: "99",
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
    <section className="relative  w-full overflow-hidden bg-[#0a0f24] px-4 py-10 md:py-20  md:px-8">
      {/* Background glow effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl"></div>
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-cyan-500/5 blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl">
      
        {/* Plans Grid */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
          {plans.map((plan, index) => (
            <div
            // bg-green-400/10
              key={index}
              className={`relative overflow-hidden rounded-2xl transition-all duration-300 ${
                plan.highlighted
                  ? "border-1 border-green-400/60 bg-gradient-to-br from-green-500/10 to-blue-500/5 shadow-2xl shadow-cyan-500/20 md:scale-105"
                  : "border-1 border-green-800/60  bg-gradient-to-br from-green-500/10 to-green-500/5  hover:border-green-900/40"
              }`}
            >
              {/* Plan Content */}
              <div className="space-y-6 md:space-y-8 p-5 md:p-10">
                {/* Plan Name */}
                <div className="space-y-2">
                  <h3 className="text-center text-2xl font-bold text-white md:text-3xl">
                    {plan.name}
                  </h3>
                  <p className="text-center text-sm text-white/60">{plan.subtitle}</p>
                </div>

                {/* Price */}
                <div className="align-center flex items-center justify-center space-y-1">
                  <div className="flex flex-col items-baseline text-center">
                    <div>
                      <span className="mb-30 text-3xl text-white">$</span>

                      <span className="text-4xl font-bold text-white md:text-5xl">
                        {plan.price}
                      </span>
                    </div>
                    <span className="ml-2 text-white/60">{plan.period}</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <Image src={bluesign} alt="Blue Tick" width={12} height={12} />
                      <span className="text-sm leading-relaxed text-white/80 md:text-base">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Subscribe Button */}
                <button
                  className={`flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-base transition-all duration-300 ${
                    plan.highlighted
                      ? "border-2 border-green-600 bg-green-400/10  hover:gap-3 hover:bg-green-400/5"
                      : "border-2 border-white/30 bg-transparent text-white hover:gap-3 hover:border-green-400/60"
                  }`}
                >
                  <span className=" flex justify-between w-full text-[12px] md:text-base">

                  <span>
                  Subscribe Now
                  </span>
                  <span>→</span>
                  </span>
                </button>
              </div>

              {/* Glow effect on highlighted plan */}
              {plan.highlighted && (
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/0 to-blue-500/0 transition-all duration-300 hover:from-cyan-500/5 hover:to-blue-500/5"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
