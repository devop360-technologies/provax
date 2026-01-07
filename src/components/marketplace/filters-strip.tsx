'use client'

import { useState } from 'react';

type SectionKey = 'city' | 'province' | 'make' | 'priceRange' | 'year' | 'mileage' | 'search' | 'registeredIn' | 'transmission' | 'color' | 'engineType' | 'engineCapacity' | 'assembly';

const ChevronIcon = ({ isExpanded }: { isExpanded: boolean }) => (
  <svg className={`w-4 h-4 text-white/60 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
  </svg>
);

const FilterSection = ({ title, isExpanded, onToggle, children, showBorder = true }: {
  title: string; isExpanded: boolean; onToggle: () => void; children: React.ReactNode; showBorder?: boolean;
}) => (
  <div className={showBorder ? "mb-6 border-b border-white/10 pb-6" : ""}>
    <button type="button" onClick={onToggle} className="flex items-center justify-between w-full mb-4">
      <h3 className="text-white font-semibold text-sm">{title}</h3>
      <ChevronIcon isExpanded={isExpanded} />
    </button>
    {isExpanded && children}
  </div>
);

const CheckboxGroup = ({ items }: { items: string[] }) => (
  <div className="space-y-3">
    {items.map((item) => (
      <label key={item} className="flex items-center gap-3 cursor-pointer group">
        <input type="checkbox" className="w-4 h-4 rounded bg-white/10 border border-white/20 cursor-pointer accent-[#00ff7f]" />
        <span className="text-white/70 text-sm group-hover:text-white transition-colors">{item}</span>
      </label>
    ))}
  </div>
);

const RangeFilter = ({ fromId, toId, fromValue, toValue, fromLabel = "From", toLabel = "To" }: {
  fromId: string; toId: string; fromValue: string; toValue: string; fromLabel?: string; toLabel?: string;
}) => (
  <div className="space-y-4">
    <div className="flex gap-2">
      <div className="flex-1">
        <label htmlFor={fromId} className="text-white/60 text-xs mb-2 block">{fromLabel}</label>
        <input id={fromId} type="text" value={fromValue} className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm" readOnly />
      </div>
      <div className="flex-1">
        <label htmlFor={toId} className="text-white/60 text-xs mb-2 block">{toLabel}</label>
        <input id={toId} type="text" value={toValue} className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm" readOnly />
      </div>
      <div className="flex items-end">
        <button type="button" title="Apply filter" className="bg-[#00ff7f] text-black w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#00e370] transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  </div>
);

const FILTER_OPTIONS = {
  cities: ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Peshawar'],
  provinces: ['Punjab', 'Sindh', 'KPK', 'Balochistan', 'AJK', 'Gilgit-Baltistan'],
  makes: ['Suzuki', 'Toyota', 'Honda', 'Daihatsu', 'Nissan'],
  registeredAreas: ['Punjab', 'Sindh', 'KPK', 'Balochistan', 'Islamabad'],
  transmissions: ['Automatic', 'Manual'],
  colors: ['White', 'Black', 'Silver', 'Grey', 'Unlisted'],
  engineTypes: ['Petrol', 'Hybrid', 'Diesel', 'Electric'],
  assemblies: ['Local', 'Imported'],
};

export default function FilterStrip() {
  const [expandedSections, setExpandedSections] = useState<Record<SectionKey, boolean>>({
    city: true, province: true, make: true, priceRange: true, year: true, mileage: true,
    search: true, registeredIn: true, transmission: true, color: true, engineType: true, engineCapacity: true, assembly: true,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [filters] = useState({ priceFrom: 40000, priceTo: 240000, yearFrom: 2023, yearTo: 2024, mileageFrom: 20000, mileageTo: 40000 });

  const toggle = (section: SectionKey) => setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));

  return (
    <div className="min-h-screen bg-[#0a0f24] pt-8 md:pr-12 pb-12">
      <div className="lg:col-span-1 rounded-3xl bg-gradient-to-br from-green-500/5 to-green-500/5 hover:border-green-900/40">
        <div className="backdrop-blur-sm border-1 border-green-800/60 rounded-lg p-6 sticky top-24">
          {/* Search */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4"><h3 className="text-white font-semibold">Show Results By:</h3></div>
            <button type="button" onClick={() => toggle('search')} className="w-full flex items-center justify-between mb-4">
              <span className="text-white/70 text-sm">Search By Keywords</span>
              <ChevronIcon isExpanded={expandedSections.search} />
            </button>
            {expandedSections.search && (
              <form onSubmit={(e) => e.preventDefault()} className="relative">
                <input type="text" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border-1 border-green-800/90 rounded-full px-5 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#00ff7f]/50 transition-colors" />
                <button type="submit" title="Search" className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </form>
            )}
          </div>

          {/* Checkbox Filters */}
          <FilterSection title="City" isExpanded={expandedSections.city} onToggle={() => toggle('city')}>
            <CheckboxGroup items={FILTER_OPTIONS.cities} />
          </FilterSection>
          <FilterSection title="Province" isExpanded={expandedSections.province} onToggle={() => toggle('province')}>
            <CheckboxGroup items={FILTER_OPTIONS.provinces} />
          </FilterSection>
          <FilterSection title="Make" isExpanded={expandedSections.make} onToggle={() => toggle('make')}>
            <CheckboxGroup items={FILTER_OPTIONS.makes} />
          </FilterSection>

          {/* Range Filters */}
          <FilterSection title="Price Range" isExpanded={expandedSections.priceRange} onToggle={() => toggle('priceRange')}>
            <RangeFilter fromId="price-from" toId="price-to" fromValue={`$${filters.priceFrom.toLocaleString()}`} toValue={`$${filters.priceTo.toLocaleString()}`} />
          </FilterSection>
          <FilterSection title="Year" isExpanded={expandedSections.year} onToggle={() => toggle('year')}>
            <RangeFilter fromId="year-from" toId="year-to" fromValue={String(filters.yearFrom)} toValue={String(filters.yearTo)} />
          </FilterSection>
          <FilterSection title="Mileage (KM)" isExpanded={expandedSections.mileage} onToggle={() => toggle('mileage')}>
            <RangeFilter fromId="mileage-from" toId="mileage-to" fromValue={String(filters.mileageFrom)} toValue={String(filters.mileageTo)} />
          </FilterSection>

          {/* More Checkbox Filters */}
          <FilterSection title="Registered In" isExpanded={expandedSections.registeredIn} onToggle={() => toggle('registeredIn')}>
            <CheckboxGroup items={FILTER_OPTIONS.registeredAreas} />
          </FilterSection>
          <FilterSection title="Transmission" isExpanded={expandedSections.transmission} onToggle={() => toggle('transmission')}>
            <CheckboxGroup items={FILTER_OPTIONS.transmissions} />
          </FilterSection>
          <FilterSection title="Color" isExpanded={expandedSections.color} onToggle={() => toggle('color')}>
            <CheckboxGroup items={FILTER_OPTIONS.colors} />
          </FilterSection>
          <FilterSection title="Engine Type" isExpanded={expandedSections.engineType} onToggle={() => toggle('engineType')}>
            <CheckboxGroup items={FILTER_OPTIONS.engineTypes} />
          </FilterSection>
          <FilterSection title="Engine Capacity (cc)" isExpanded={expandedSections.engineCapacity} onToggle={() => toggle('engineCapacity')}>
            <RangeFilter fromId="engine-from" toId="engine-to" fromValue="1400" toValue="2000" />
          </FilterSection>
          <FilterSection title="Assembly" isExpanded={expandedSections.assembly} onToggle={() => toggle('assembly')} showBorder={false}>
            <CheckboxGroup items={FILTER_OPTIONS.assemblies} />
          </FilterSection>
        </div>
      </div>
    </div>
  );
}
