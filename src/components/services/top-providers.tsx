'use client'

import Image from 'next/image';

export default function TopVerifiedProviders() {
  const providers = [
    {
      id: 1,
      name: 'Verified Garage 1',
      location: '3.5 ★ • 250 reviews • New York',
      image: '/provax/garage-icon.png'
    },
    {
      id: 2,
      name: 'Verified Garage 2',
      location: '4.2 ★ • 180 reviews • New York',
      image: '/provax/garage-icon.png'
    },
    {
      id: 3,
      name: 'Verified Garage 3',
      location: '3.8 ★ • 320 reviews • New York',
      image: '/provax/garage-icon.png'
    },
    {
      id: 4,
      name: 'Verified Garage 4',
      location: '4.5 ★ • 420 reviews • New York',
      image: '/provax/garage-icon.png'
    },
    {
      id: 5,
      name: 'Verified Garage 5',
      location: '3.9 ★ • 280 reviews • New York',
      image: '/provax/garage-icon.png'
    },
    {
      id: 6,
      name: 'Verified Garage 6',
      location: '4.1 ★ • 350 reviews • New York',
      image: '/provax/garage-icon.png'
    }
  ];

  return (
    <section className="relative py-20 bg-[#0a0f24] overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 via-[#0a0f24] to-[#0a0f24]" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 flex items-start justify-between">
          <div>
            <div className="text-sm text-white/60 mb-4 flex items-center gap-2">
              <span className="text-[#00ff7f]">●</span>
              <span>Providers</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Top Verified Providers
            </h2>
            
            <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
              Easily find nearby providers, complete with transparent ratings and verified certifications, so you can choose trusted professionals with confidence.
            </p>
          </div>

          {/* View All Providers Button */}
          <button className="bg-[#00ff7f] text-black font-semibold px-6 py-3 rounded-full hover:bg-[#00e370] transition-colors whitespace-nowrap">
            View All Providers →
          </button>
        </div>

        {/* Providers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {providers.map((provider) => (
            <div
              key={provider.id}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 group"
            >
              {/* Icon and Name */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/30 to-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0 border border-blue-400/30">
                  <svg className="w-10 h-10 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {provider.name}
                  </h3>
                  <p className="text-white/60 text-sm">
                    {provider.location}
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 bg-[#00ff7f] text-black font-semibold py-2 px-4 rounded-full hover:bg-[#00e370] transition-colors text-sm">
                  View Profile
                </button>
                <button className="flex-1 border border-[#00ff7f] text-[#00ff7f] font-semibold py-2 px-4 rounded-full hover:bg-[#00ff7f]/10 transition-colors text-sm">
                  Request Quote
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
