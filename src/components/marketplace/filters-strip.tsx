'use client'

import { useState } from 'react';

interface ExpandedSections {
  city: boolean;
  province: boolean;
  make: boolean;
  priceRange: boolean;
  year: boolean;
  mileage: boolean;
  search: boolean;
  registeredIn: boolean;
  transmission: boolean;
  color: boolean;
  engineType: boolean;
  engineCapacity: boolean;
  assembly: boolean;
}

export default function FilterStrip() {
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
    city: true,
    province: true,
    make: true,
    priceRange: true,
    year: true,
    mileage: true,
    search: true,
    registeredIn: true,
    transmission: true,
    color: true,
    engineType: true,
    engineCapacity: true,
    assembly: true,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [filters] = useState({
    priceFrom: 40000,
    priceTo: 240000,
    yearFrom: 2023,
    yearTo: 2024,
    mileageFrom: 20000,
    mileageTo: 40000,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search implementation placeholder - use searchQuery
  };    

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const cities = ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Peshawar'];
  const provinces = ['Punjab', 'Sindh', 'KPK', 'Balochistan', 'AJK', 'Gilgit-Baltistan'];
  const makes = ['Suzuki', 'Toyota', 'Honda', 'Daihatsu', 'Nissan'];
  const registeredAreas = ['Punjab', 'Sindh', 'KPK', 'Balochistan', 'Islamabad'];
  const transmissions = ['Automatic', 'Manual'];
  const colors = ['White', 'Black', 'Silver', 'Grey', 'Unlisted'];
  const engineTypes = ['Petrol', 'Hybrid', 'Diesel', 'Electric'];
  const assemblies = ['Local', 'Imported'];

  return (
    <div className="min-h-screen bg-[#0a0f24] pt-8 md:pr-12 pb-12">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1 rounded-3xl bg-gradient-to-br from-green-500/5 to-green-500/5  hover:border-green-900/40">
            <div className="backdrop-blur-sm  border-1 border-green-800/60  rounded-lg p-6 sticky top-24">
              {/* Show Results By */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4 ">
                  <h3 className="text-white font-semibold">Show Results By:</h3>
                </div>
                <button
                  onClick={() => toggleSection('search')}
                  className="w-full flex items-center justify-between mb-4"
                >
                  <span className="text-white/70 text-sm">Search By Keywords</span>
                  <svg className={`w-4 h-4 text-white/60 transition-transform ${expandedSections.search ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
                
                {expandedSections.search && (
                  <form onSubmit={handleSearch} className="relative">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/5 border-1 border-green-800/90 rounded-full px-5 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#00ff7f]/50 transition-colors"
                      />
                      <button
                        type="submit"
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* City Filter */}
              <div className="mb-6 border-b border-white/10 pb-6">
                <button
                  onClick={() => toggleSection('city')}
                  className="flex items-center justify-between w-full mb-4 group"
                >
                  <h3 className="text-white font-semibold text-sm">City</h3>
                  <svg className={`w-4 h-4 text-white/60 transition-transform ${expandedSections.city ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
                {expandedSections.city && (
                  <div className="space-y-3">
                    {cities.map((city) => (
                      <label key={city} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="w-4 h-4 rounded bg-white/10 border border-white/20 cursor-pointer accent-[#00ff7f]" />
                        <span className="text-white/70 text-sm group-hover:text-white transition-colors">{city}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Province Filter */}
              <div className="mb-6 border-b border-white/10 pb-6">
                <button
                  onClick={() => toggleSection('province')}
                  className="flex items-center justify-between w-full mb-4"
                >
                  <h3 className="text-white font-semibold text-sm">Province</h3>
                  <svg className={`w-4 h-4 text-white/60 transition-transform ${expandedSections.province ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
                {expandedSections.province && (
                  <div className="space-y-3">
                    {provinces.map((province) => (
                      <label key={province} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="w-4 h-4 rounded bg-white/10 border border-white/20 cursor-pointer accent-[#00ff7f]" />
                        <span className="text-white/70 text-sm group-hover:text-white transition-colors">{province}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Make Filter */}
              <div className="mb-6 border-b border-white/10 pb-6">
                <button
                  onClick={() => toggleSection('make')}
                  className="flex items-center justify-between w-full mb-4"
                >
                  <h3 className="text-white font-semibold text-sm">Make</h3>
                  <svg className={`w-4 h-4 text-white/60 transition-transform ${expandedSections.make ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
                {expandedSections.make && (
                  <div className="space-y-3">
                    {makes.map((make) => (
                      <label key={make} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="w-4 h-4 rounded bg-white/10 border border-white/20 cursor-pointer accent-[#00ff7f]" />
                        <span className="text-white/70 text-sm group-hover:text-white transition-colors">{make}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Range Filter */}
              <div className="mb-6 border-b border-white/10 pb-6">
                <button
                  onClick={() => toggleSection('priceRange')}
                  className="flex items-center justify-between w-full mb-4"
                >
                  <h3 className="text-white font-semibold text-sm">Price Range</h3>
                  <svg className={`w-4 h-4 text-white/60 transition-transform ${expandedSections.priceRange ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
                {expandedSections.priceRange && (
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label htmlFor="price-from-filter" className="text-white/60 text-xs mb-2 block">From</label>
                        <input 
                          id="price-from-filter"
                          type="text" 
                          value={`$${filters.priceFrom.toLocaleString()}`}
                          className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm"
                          readOnly
                        />
                      </div>
                      <div className="flex-1">
                        <label htmlFor="price-to-filter" className="text-white/60 text-xs mb-2 block">To</label>
                        <input 
                          id="price-to-filter"
                          type="text" 
                          value={`$${filters.priceTo.toLocaleString()}`}
                          className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm"
                          readOnly
                        />
                      </div>
                      <div className="flex items-end">
                        <button className="bg-[#00ff7f] text-black w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#00e370] transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Year Filter */}
              <div className="mb-6 border-b border-white/10 pb-6">
                <button
                  onClick={() => toggleSection('year')}
                  className="flex items-center justify-between w-full mb-4"
                >
                  <h3 className="text-white font-semibold text-sm">Year</h3>
                  <svg className={`w-4 h-4 text-white/60 transition-transform ${expandedSections.year ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
                {expandedSections.year && (
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label htmlFor="year-from-filter" className="text-white/60 text-xs mb-2 block">From</label>
                        <input 
                          id="year-from-filter"
                          type="text" 
                          value={filters.yearFrom}
                          className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm"
                          readOnly
                        />
                      </div>
                      <div className="flex-1">
                        <label htmlFor="year-to-filter" className="text-white/60 text-xs mb-2 block">To</label>
                        <input 
                          id="year-to-filter"
                          type="text" 
                          value={filters.yearTo}
                          className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm"
                          readOnly
                        />
                      </div>
                      <div className="flex items-end">
                        <button className="bg-[#00ff7f] text-black w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#00e370] transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Mileage Filter */}
              <div className="mb-6 border-b border-white/10 pb-6">
                <button
                  onClick={() => toggleSection('mileage')}
                  className="flex items-center justify-between w-full mb-4"
                >
                  <h3 className="text-white font-semibold text-sm">Mileage (KM)</h3>
                  <svg className={`w-4 h-4 text-white/60 transition-transform ${expandedSections.mileage ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
                {expandedSections.mileage && (
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label htmlFor="mileage-from-filter" className="text-white/60 text-xs mb-2 block">From</label>
                        <input 
                          id="mileage-from-filter"
                          type="text" 
                          value={filters.mileageFrom}
                          className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm"
                          readOnly
                        />
                      </div>
                      <div className="flex-1">
                        <label htmlFor="mileage-to-filter" className="text-white/60 text-xs mb-2 block">To</label>
                        <input 
                          id="mileage-to-filter"
                          type="text" 
                          value={filters.mileageTo}
                          className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm"
                          readOnly
                        />
                      </div>
                      <div className="flex items-end">
                        <button className="bg-[#00ff7f] text-black w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#00e370] transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Registered In Filter */}
              <div className="mb-6 border-b border-white/10 pb-6">
                <button
                  onClick={() => toggleSection('registeredIn')}
                  className="flex items-center justify-between w-full mb-4"
                >
                  <h3 className="text-white font-semibold text-sm">Registered In</h3>
                  <svg className={`w-4 h-4 text-white/60 transition-transform ${expandedSections.registeredIn ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
                {expandedSections.registeredIn && (
                  <div className="space-y-3">
                    {registeredAreas.map((area) => (
                      <label key={area} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="w-4 h-4 rounded bg-white/10 border border-white/20 cursor-pointer accent-[#00ff7f]" />
                        <span className="text-white/70 text-sm group-hover:text-white transition-colors">{area}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Transmission Filter */}
              <div className="mb-6 border-b border-white/10 pb-6">
                <button
                  onClick={() => toggleSection('transmission')}
                  className="flex items-center justify-between w-full mb-4"
                >
                  <h3 className="text-white font-semibold text-sm">Transmission</h3>
                  <svg className={`w-4 h-4 text-white/60 transition-transform ${expandedSections.transmission ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
                {expandedSections.transmission && (
                  <div className="space-y-3">
                    {transmissions.map((transmission) => (
                      <label key={transmission} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="w-4 h-4 rounded bg-white/10 border border-white/20 cursor-pointer accent-[#00ff7f]" />
                        <span className="text-white/70 text-sm group-hover:text-white transition-colors">{transmission}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Color Filter */}
              <div className="mb-6 border-b border-white/10 pb-6">
                <button
                  onClick={() => toggleSection('color')}
                  className="flex items-center justify-between w-full mb-4"
                >
                  <h3 className="text-white font-semibold text-sm">Color</h3>
                  <svg className={`w-4 h-4 text-white/60 transition-transform ${expandedSections.color ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
                {expandedSections.color && (
                  <div className="space-y-3">
                    {colors.map((color) => (
                      <label key={color} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="w-4 h-4 rounded bg-white/10 border border-white/20 cursor-pointer accent-[#00ff7f]" />
                        <span className="text-white/70 text-sm group-hover:text-white transition-colors">{color}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Engine Type Filter */}
              <div className="mb-6 border-b border-white/10 pb-6">
                <button
                  onClick={() => toggleSection('engineType')}
                  className="flex items-center justify-between w-full mb-4"
                >
                  <h3 className="text-white font-semibold text-sm">Engine Type</h3>
                  <svg className={`w-4 h-4 text-white/60 transition-transform ${expandedSections.engineType ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
                {expandedSections.engineType && (
                  <div className="space-y-3">
                    {engineTypes.map((engineType) => (
                      <label key={engineType} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="w-4 h-4 rounded bg-white/10 border border-white/20 cursor-pointer accent-[#00ff7f]" />
                        <span className="text-white/70 text-sm group-hover:text-white transition-colors">{engineType}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Engine Capacity Filter */}
              <div className="mb-6 border-b border-white/10 pb-6">
                <button
                  onClick={() => toggleSection('engineCapacity')}
                  className="flex items-center justify-between w-full mb-4"
                >
                  <h3 className="text-white font-semibold text-sm">Engine Capacity (cc)</h3>
                  <svg className={`w-4 h-4 text-white/60 transition-transform ${expandedSections.engineCapacity ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
                {expandedSections.engineCapacity && (
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label htmlFor="engine-capacity-from-filter" className="text-white/60 text-xs mb-2 block">From</label>
                        <input 
                          id="engine-capacity-from-filter"
                          type="text" 
                          defaultValue="1400"
                          className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm"
                        />
                      </div>
                      <div className="flex-1">
                        <label htmlFor="engine-capacity-to-filter" className="text-white/60 text-xs mb-2 block">To</label>
                        <input 
                          id="engine-capacity-to-filter"
                          type="text" 
                          defaultValue="2000"
                          className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm"
                        />
                      </div>
                      <div className="flex items-end">
                        <button className="bg-[#00ff7f] text-black w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#00e370] transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Assembly Filter */}
              <div>
                <button
                  onClick={() => toggleSection('assembly')}
                  className="flex items-center justify-between w-full mb-4"
                >
                  <h3 className="text-white font-semibold text-sm">Assembly</h3>
                  <svg className={`w-4 h-4 text-white/60 transition-transform ${expandedSections.assembly ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
                {expandedSections.assembly && (
                  <div className="space-y-3">
                    {assemblies.map((assembly) => (
                      <label key={assembly} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="w-4 h-4 rounded bg-white/10 border border-white/20 cursor-pointer accent-[#00ff7f]" />
                        <span className="text-white/70 text-sm group-hover:text-white transition-colors">{assembly}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
  );
}
