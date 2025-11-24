"use client";

import Image from "next/image";

export default function HowItWorksHero() {
  return (
    <div className="relative h-screen min-h-screen w-full overflow-hidden bg-[#050609]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/provax-images/services/first.gif"
          alt="Engine"
          fill
          className="object-contain object-center z-2"
          priority
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f24]/15 via-[#0a0f24]/45 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center md:px-12">
        {/* Breadcrumb */}
        <div className="my-20 flex items-center justify-center gap-2 text-sm text-white/60">
          <span className="text-[#00ff7f]">•</span>
          <span>Services</span>
        </div>

        {/* Heading */}
        <h1 className="mb-2 text-4xl leading-tight text-white md:text-5xl lg:text-6xl">
          AI-Powered <br /> Automotive Services
        </h1>

        {/* Description */}
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/70">
          Access verified providers and AI-backed service options — repair, maintain, or certify
          your vehicle with full transparency and instant Vehicle Integrity Scores (VIS).{" "}
        </p>
        <div className="flex mt-10 flex-col justify-center gap-4 sm:flex-row lg:flex-row lg:items-start lg:justify-center lg:gap-4">
          <button className="group flex items-center justify-center gap-2 rounded-full bg-[#00ff7f] px-5 py-2 text-sm font-semibold text-black transition-all duration-300 hover:gap-3 hover:bg-[#00e370]">
            Star Inspection
            <span className="text-lg transition-all duration-300">→</span>
          </button>
          <button className="group flex items-center justify-center gap-2 rounded-full border-2 border-[#00ff7f] px-5 py-2 text-base font-semibold text-[#00ff7f] transition-all duration-300 hover:gap-3 hover:bg-[#00ff7f]/10">
            Find a Provider
            <span className="text-lg transition-all duration-300">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
