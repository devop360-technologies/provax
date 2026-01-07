'use client'
import Image from "next/image";
import carRepairImage from "../../asests/carRepair.png";
import curent from "../../asests/icons/current.png"
import lock from "../../asests/icons/lock.svg"
import sign from "../../asests/icons/sign.png"

export default function ServiceBidding() {
  const features = [
    {
      icon: sign,
      title: "Verified Mechanics Only",
      description: ""
    },
    {
      icon: lock,
      title: "Secure Split Payments",
      description: ""
    },
    {
      icon: curent,
      title: "Real - Time Bidding",
      description: ""
    }
  ];

  return (
    <section className="relative min-h-screen  w-full overflow-hidden px-4 py-20 md:px-8">
      {/* Blue and black gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/1 via-blue-900/10 to-blue-600/12 pointer-events-none z-10"></div>
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
        <div className="absolute top-1/3 left-1/4 h-80 w-80 rounded-full bg-indigo-600/20 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 h-96 w-96 rounded-full bg-cyan-500/5 blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Content */}
          <div className="space-y-7 md:space-y-8">
            {/* Label */}
            <div className="inline-flex items-center space-x-2">
              <span className="inline-block w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
              <p className="text-[10px] md:text-[10px] font-light tracking-widest text-cyan-300/80 uppercase">
                Service Bidding
              </p>
            </div>

            {/* Main Heading */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl text-white leading-tight">
              Need Repairs? Post Your
              <br />
              Request And Let Verified
              <br />
              Provider Bid Instantly.
            </h2>

            {/* Description */}
            <p className=" text-white/70 leading-relaxed max-w-lg text-sm md:text:base">
              Smart, transparent, and powered by AI — get instant, real-time offers from verified mechanics. Experience hassle-free repairs with complete trust and efficiency.
            </p>

            {/* Features List */}
            <div className="space-y-1 md:space-y-2">
              {features.map((feature) => (
                <div key={feature.title} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                    <Image
                      src={feature.icon}
                      alt={feature.title}
                      width={10}
                      height={10}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-white">
                      {feature.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-1">
              <button className="inline-flex items-center gap-3 px-3 py-2 md:px-6 md:py-3 rounded-full bg-[#00ff7f] hover:bg-[#00e370] text-gray-800 font-semibold text-[12px] md:text-base transition-all duration-300 hover:gap-4 shadow-lg hover:shadow-sm shadow-green-500/50">
                Post a Service Request
                <span className="">→</span>
              </button>
            </div>

            {/* Bottom Text */}
            <p className="text-[10px] md:text-sm text-white/60 leading-relaxed">
              Instantly connect you with the best local provider
            </p>
          </div>

          {/* Right Side - Empty Space (for image visibility) */}
          <div className="hidden lg:block relative h-96">
            {/* Decorative element - vertical dotted line */}
            {/* <div className="absolute left-0 top-1/2 w-1 h-64 -translate-y-1/2 border-l border-cyan-400/30 border-dashed"></div> */}
          </div>
        </div>
      </div>
    </section>
  );
}