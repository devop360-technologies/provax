"use client";

export default function BusinessPlans() {
  const plans = [
    {
      name: "Business",
      subtitle: "Lorem ipsum",
      billingOptions: ["Annual Billing", "Monthly Billing"],
      price: "19",
      period: "/ user / month billed annually",
      features: [
        "Limited service listings",
        "Basic analytics",
        "Standard support",
        "Limited service listings",
        "Basic analytics",
        "Standard support"
      ],
      highlighted: true
    },
    {
      name: "Enterprise",
      subtitle: "Lorem ipsum",
      billingOptions: ["Annual Billing", "Monthly Billing"],
      price: "19",
      period: "/ user / month billed annually",
      features: [
        "Limited service listings",
        "Basic analytics",
        "Standard support",
        "Limited service listings",
        "Basic analytics",
        "Standard support"
      ],
      highlighted: true
    }
  ];

  return (
    <section className="relative  w-full overflow-hidden bg-[#0a0f24] px-4 py-[-100px] md:px-8 ">
      {/* Background glow effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl"></div>
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-cyan-500/5 blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl">

        {/* Plans Grid */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="border-1 border-green-800/60 rounded-2xl  bg-gradient-to-br from-green-500/10 to-green-500/5  hover:border-green-900/40"
            //   className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-white/20"
            >
              {/* Plan Content */}
              <div className="space-y-3 p-5 md:space-y-4 md:p-8">
                {/* Plan Name */}
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white md:text-3xl">
                    {plan.name}
                  </h3>
                  <p className="text-sm ">{plan.subtitle}</p>
                </div>

                {/* Billing Options */}
                <div className="flex gap-2">
                  {plan.billingOptions.map((option) => (
                    <button
                      key={option}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                        plan.billingOptions.indexOf(option) === 0
                          ? "bg-white/80 text-black hover:bg-white"
                          : "bg-white/20 text-white border border-white/30 hover:bg-white/30"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {/* Price */}
                <div className="space-y-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl text-white/80">$</span>
                    <span className="text-4xl font-bold text-white">
                      {plan.price}
                    </span>
                  <span className="">{plan.period}</span>
                  </div>
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

                {/* Features List */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={`${plan.name}-feature-${featureIndex}`} className="flex items-center gap-3">
                      <svg className="w-6 h-6 text-[#0697cc] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-white/80">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
