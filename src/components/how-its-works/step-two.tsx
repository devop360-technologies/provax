'use client'

import Image from "next/image";

export default function StepTwo() {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0f24]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/provax-images/How-Its-Works/third.png"
          alt="Upload Photos"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f24]/95 via-[#0a0f24]/85 to-[#0a0f24]/70" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left Side - Image Space (handled by background) */}
          <div className="space-y-8">
            {/* Step Counter */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-white/60 font-medium">●</span>
              <span className="text-sm text-white/60 font-medium">Step 02</span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-base text-white leading-tight">
              AI Inspection
            </h2>

            {/* Description */}
            <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-lg">
            Our AI analyzes every photo and video to detect structural issues, paint defects, and interior wear. Each inspection generates a precise digital report with your Vehicle Integrity Score (VIS).
            </p>

            {/* CTA Button */}
            {/* <button className="inline-block bg-[#00ff7f] text-black px-8 py-3 rounded-full font-semibold hover:bg-[#00e370] transition-all duration-300 shadow-lg shadow-green-500/30 hover:scale-105">
              Get Started
            </button> */}
          </div>

            {/* Right Side - Content */}          
            <div className="hidden md:block" />
        </div>
      </div>
    </div>
  );
}
