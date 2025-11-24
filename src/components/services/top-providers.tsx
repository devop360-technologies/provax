"use client";

import Image from "next/image";

export default function TopVerifiedProviders() {
  const providers = [
    {
      id: 1,
      name: "Verified Garage 1",
      location: "3.5 ★ • 250 reviews • New York",
      image: "/provax/garage-icon.png"
    },
    {
      id: 2,
      name: "Verified Garage 2",
      location: "4.2 ★ • 180 reviews • New York",
      image: "/provax/garage-icon.png"
    },
    {
      id: 3,
      name: "Verified Garage 3",
      location: "3.8 ★ • 320 reviews • New York",
      image: "/provax/garage-icon.png"
    },
    {
      id: 4,
      name: "Verified Garage 4",
      location: "4.5 ★ • 420 reviews • New York",
      image: "/provax/garage-icon.png"
    },
    {
      id: 5,
      name: "Verified Garage 5",
      location: "3.9 ★ • 280 reviews • New York",
      image: "/provax/garage-icon.png"
    },
    {
      id: 6,
      name: "Verified Garage 6",
      location: "4.1 ★ • 350 reviews • New York",
      image: "/provax/garage-icon.png"
    }
  ];

  return (
    <section className="relative overflow-hidden bg-[#0a0f24] py-20">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/provax-images/Services/four.png"
          alt="Services background"
          fill
          className="object-cover object-center scale-x-[-1]"
        />
      </div>

      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-[#0a0f24]/80 to-[#0a0f24]" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 flex items-start justify-between">
          <div>
            <div className="mb-4 flex items-center gap-2 text-sm text-white/60">
              <span className="text-[#00ff7f]">●</span>
              <span>Providers</span>
            </div>

            <h2 className="mb-4 text-3xl text-white md:text-4xl">Top Verified Providers</h2>

            <p className="max-w-xl text-sm leading-relaxed text-white/70">
              Easily find nearby providers, complete with transparent ratings and verified
              certifications, so you can choose trusted professionals with confidence.
            </p>
          </div>

          {/* View All Providers Button */}
          <button className="rounded-full bg-[#00ff7f] px-3 py-3 text-sm font-semibold whitespace-nowrap text-black transition-colors hover:bg-[#00e370]">
            View All Providers →
          </button>
        </div>

        {/* Providers Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {providers.map((provider) => (
            <div
              key={provider.id}
              className="group rounded-2xl border border-green-900 bg-[#141C3F66] p-8 backdrop-blur-sm transition-all duration-300 hover:border-cyan-900"
            >
              {/* Icon and Name */}
              <div className="mb-6 flex items-start gap-4">
                <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-lg border border-blue-400/30 bg-gradient-to-br from-blue-500/30 to-cyan-500/20">
                  <Image
                    src="/provax-images/Services/AI.png"
                    alt="Garage Icon"
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 text-xl font-semibold text-white">{provider.name}</h3>
                  <p className="text-sm font-light text-white/20">{provider.location}</p>
                </div>
              </div>

              <div className="mr-20">
                {/* Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 rounded-full bg-[#00ff7f] text-[10px] font-semibold text-black transition-colors hover:bg-[#00e370]">
                    View Profile
                    <span className="ml-2">→</span>
                  </button>
                  <button className="flex-1 rounded-full border border-[#00ff7f] px-4 py-2 text-[10px] font-semibold text-[#00ff7f] transition-colors hover:bg-[#00ff7f]/10">
                    Request Quote
                    <span className="ml-2">→</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
