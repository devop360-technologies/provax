'use client'

import Image from "next/image";

export default function HowItWorksHero() {
  return (
    <div className="relative w-full h-screen min-h-screen  overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/provax-images/services/first.gif"
          alt="Engine"
          fill
          className="object-fill object-center"
          priority
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f24]/95 via-[#0a0f24]/85 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
        {/* Breadcrumb */}
        <div className="my-20 flex items-center justify-center gap-2 text-sm text-white/60">
          <span className="text-[#00ff7f]">•</span>
          <span>Services</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-2 leading-tight">
          AI-Powered <br/> Automotive Services
        </h1>

        {/* Description */}
        <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
Access verified providers and AI-backed service options — repair, maintain, or certify your vehicle with full transparency and instant Vehicle Integrity Scores (VIS).        </p>
      </div>
    </div>
  );
}