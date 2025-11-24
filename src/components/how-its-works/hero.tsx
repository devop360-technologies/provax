'use client'

import Image from "next/image";

export default function HowItWorksHero() {
  return (
    <div className="relative w-full h-screen min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/provax-images/How-Its-Works/first.gif"
          alt="Engine"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f24]/95 via-[#0a0f24]/85 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center justify-center gap-2 text-sm text-white/60">
          <span className="text-[#00ff7f]">•</span>
          <span>How It Works</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 leading-tight">
          How <span className="text-[#00ff7f]">PROVAX</span> Works
        </h1>

        {/* Description */}
        <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Our AI-powered platform streamlines vehicle certification with precision. From instant photo upload to final inspection - a seamless process designed for accuracy and transparency
        </p>
      </div>
    </div>
  );
}