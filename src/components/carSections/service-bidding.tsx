'use client'
import Image from "next/image";
import carRepairImage from "../../asests/carRepair.png";

export default function ServiceBidding() {
  const features = [
    {
      icon: "●",
      title: "Verified Mechanics Only",
      description: ""
    },
    {
      icon: "🔒",
      title: "Secure Split Payments",
      description: ""
    },
    {
      icon: "⚡",
      title: "Real - Time Bidding",
      description: ""
    }
  ];

  return (
    <section className="relative min-h-screen w-full overflow-hidden px-4 py-20 md:px-8">
      {/* Background Image */}
      <Image
        src={carRepairImage}
        alt="Car Repair Background"
        fill
        className="absolute inset-0 object-cover object-center"
        priority
      />

      {/* Gradient Overlay - #0A0F24 with varying opacity */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f24] via-[#0a0f2480] to-[#0a0f2420]"></div>

      {/* Additional overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0f24]/60"></div>

      {/* Background glow effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 h-96 w-96 rounded-full bg-cyan-500/5 blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Content */}
          <div className="space-y-8">
            {/* Label */}
            <div className="inline-flex items-center space-x-2">
              <span className="inline-block w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
              <p className="text-xs md:text-sm font-light tracking-widest text-cyan-300/80 uppercase">
                Service Bidding
              </p>
            </div>

            {/* Main Heading */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
              Need Repairs? Post Your
              <br />
              Request And Let Verified
              <br />
              Provider Bid Instantly.
            </h2>

            {/* Description */}
            <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-xl">
              Smart, transparent, and powered by AI — get instant, real-time offers from verified mechanics. Experience hassle-free repairs with complete trust and efficiency.
            </p>

            {/* Features List */}
            <div className="space-y-4 pt-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    {feature.icon === "●" ? (
                      <span className="inline-block w-3 h-3 bg-cyan-400 rounded-full"></span>
                    ) : (
                      <span className="text-xl text-cyan-400">{feature.icon}</span>
                    )}
                  </div>
                  <div>
                    <p className="text-sm md:text-base font-semibold text-white">
                      {feature.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-6">
              <button className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#00ff7f] hover:bg-[#00e370] text-black font-semibold text-base transition-all duration-300 hover:gap-4 shadow-lg hover:shadow-xl shadow-green-500/50">
                Post a Service Request
                <span className="text-lg">→</span>
              </button>
            </div>

            {/* Bottom Text */}
            <p className="text-xs md:text-sm text-white/60 leading-relaxed">
              Instantly connect you with the best local provider
            </p>
          </div>

          {/* Right Side - Empty Space (for image visibility) */}
          <div className="hidden lg:block relative h-96">
            {/* Decorative element - vertical dotted line */}
            <div className="absolute left-0 top-1/2 w-1 h-64 -translate-y-1/2 border-l border-cyan-400/30 border-dashed"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
