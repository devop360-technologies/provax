"use client";

import Image from "next/image";

export default function HowItWorksHero() {
  return (
    <div className="relative h-screen min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/provax-images/Subscriptions/hero_car.gif"
          alt="Engine"
          fill
          className="object-fill object-center"
          priority
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f24]/95 via-[#0a0f24]/85 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center md:px-12">
        {/* Breadcrumb */}
        <div className="my-20 flex items-center justify-center gap-2 text-sm text-white/60">
          <span className="text-[#00ff7f]">•</span>
          <span>Subscriptions</span>
        </div>

        {/* Heading */}
        <h1 className="mb-2 text-4xl leading-tight text-white md:text-5xl lg:text-6xl">
          Choose Your Plan <br /> Start Bidding Smarter
        </h1>

        {/* Description */}
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
          Join the AI-powered automotive network that connects you with real-time service requests
          and verified customers.
        </p>
      </div>
    </div>
  );
}
