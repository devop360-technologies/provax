"use client"; // REQUIRED for client-side interactivity (next/image, Tailwind animations, etc.)

import Image from "next/image";
import { useState } from "react";

export default function HowItWorksHero() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search logic with searchQuery
  };

  return (
    <div className="relative w-full min-h-[66vh] overflow-hidden flex justify-center items-center">

      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/provax-images/Markeetplace/first.png"
          alt="Engine"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f24]/99 via-[#0a0f24]/95 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
        
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center justify-center gap-2 text-sm text-white/60">
          <span className="text-[#00ff7f]">•</span>
          <span>Marketplace</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-4xl lg:text-6xl text-white mb-2 leading-tight">
         Explore Certified Vehicle
        </h1>

        {/* Description */}
        <p className="text-white/70 font-light md:text-sm max-w-lg mx-auto leading-relaxed">
          Explore our advanced range of electric vehicles, each engineered to match different lifestyles and performance needs. Discover full specifications, innovative features, and AI-powered insights.
        </p>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mt-8 max-w-sm mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full font-light bg-white/5 border border-green-900 rounded-full px-6 py-4 text-gray-200 text-sm placeholder-white/30 focus:outline-none focus:border-[#00ff7f]/50 transition-colors"
            />
            <button
              type="submit"
              className="absolute    right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}