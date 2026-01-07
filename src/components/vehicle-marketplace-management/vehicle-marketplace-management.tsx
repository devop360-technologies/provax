"use client";

import { useState } from "react";
import Image from "next/image";
import { User } from "@/types/user";
import { Edit, Trash } from "lucide-react";
import { ManagementTabs } from "@/components/ui/management-tabs";
import { inspectionData, getInspectionStatusClass, getIntegrityScoreClass, calculatePrice } from "@/data/inspections";
import { FilterSelect, SCORE_OPTIONS, COMBO_TYPE_OPTIONS, PRICE_RANGE_OPTIONS, LOCATION_OPTIONS, LISTING_STATUS_OPTIONS } from "@/components/ui/filter-select";
import { ReportsTab } from "@/components/shared/reports-tab";
import { MediaGallery, DEFAULT_MEDIA_ITEMS } from "@/components/shared/media-gallery";
import { AIModuleResults, DEFAULT_MODULE_RESULTS } from "@/components/shared/ai-module-results";

interface vehicleMarketplaceManagementProps {
  users: User[];
}

type Tab = "Catalog" | "detail" | "tools" | "moderation";

const MARKETPLACE_TABS = [
  { key: "Catalog" as const, label: "Catalog" },
  { key: "detail" as const, label: "Listing Detail" },
  { key: "tools" as const, label: "Promotional Tools" },
  { key: "moderation" as const, label: "Content Moderation" },
] as const;

export function VehicleMarketplaceManagement({ users }: vehicleMarketplaceManagementProps) {
  const [activeTab, setActiveTab] = useState<Tab>("Catalog");
  const [selectedListing, setSelectedListing] = useState<User | null>(
    users && users.length > 0 ? users[0] : null
  );

  const handleViewListing = (listing: User) => {
    setSelectedListing(listing);
    setActiveTab("detail");
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <ManagementTabs tabs={MARKETPLACE_TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab Content */}
      <div>
        {activeTab === "Catalog" && <CatalogTab users={users} onViewListing={handleViewListing} />}
        {activeTab === "detail" && <ListingDetailTab listing={selectedListing || users[0]} />}
        {activeTab === "tools" && <PromotionalToolsTab />}
        {activeTab === "moderation" && <ModerationGuidelinesTab />}
      </div>
    </div>
  );
}

// Catalog Tab - Vehicle Listings
function CatalogTab({
  users,
  onViewListing
}: {
  users: User[];
  onViewListing: (listing: User) => void;
}) {
  const [scoreFilter, setScoreFilter] = useState("All Score");
  const [comboTypeFilter, setComboTypeFilter] = useState("All Types");
  const [priceRangeFilter, setPriceRangeFilter] = useState("All Price");
  const [locationFilter, setLocationFilter] = useState("All Locations");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const handleViewListing = (_vehicle: { id?: string; vehicle?: string }) => {
    const listing = users[0];
    if (listing) {
      onViewListing(listing);
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="mr-0 flex items-center justify-between rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6 md:mr-7">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-5 md:items-end">
          <FilterSelect id="vehicle-integrity-score-filter" label="Integrity Score" value={scoreFilter} onChange={setScoreFilter} options={SCORE_OPTIONS} />
          <FilterSelect id="vehicle-combo-type-filter" label="Combo Type" value={comboTypeFilter} onChange={setComboTypeFilter} options={COMBO_TYPE_OPTIONS} />
          <FilterSelect id="vehicle-price-range-filter" label="Price Range" value={priceRangeFilter} onChange={setPriceRangeFilter} options={PRICE_RANGE_OPTIONS} />
          <FilterSelect id="vehicle-location-filter" label="Location" value={locationFilter} onChange={setLocationFilter} options={LOCATION_OPTIONS} />
          <FilterSelect id="vehicle-status-filter" label="Status" value={statusFilter} onChange={setStatusFilter} options={LISTING_STATUS_OPTIONS} />
        </div>
        <div>
          <button className="mt-4 w-full rounded-lg border border-cyan-500/50 bg-cyan-500/20 px-4 py-3 text-sm font-medium text-cyan-400 transition-colors hover:bg-cyan-500/30">
            Apply Filters
          </button>
        </div>
      </div>

      {/* Vehicle Catalog Cards */}
      <div className="mr-0 grid grid-cols-1 gap-6 md:mr-7 md:grid-cols-2 lg:grid-cols-3">
        {inspectionData.map((inspection) => (
          <div
            key={inspection.vehicle}
            className="overflow-hidden rounded-xl border border-[#2a2d4a] bg-[#1D1D41] transition-colors hover:border-cyan-500/50"
          >
            {/* Vehicle Image */}
            <div className="relative flex h-48 w-full items-center justify-center overflow-hidden bg-[#252850]">
              <div className="absolute inset-0 bg-gradient-to-b from-[#2a2d4a]/20 to-transparent"></div>
              <div className="text-center">
                <div className="mb-2 text-4xl">🚗</div>
                <p className="text-xs text-gray-400">{inspection.vehicle}</p>
              </div>
              {/* Status Badge */}
              <div className="absolute top-3 right-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${getInspectionStatusClass(inspection.status)}`}
                >
                  {inspection.status}
                </span>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-4">
              {/* Vehicle Title */}
              <h3 className="mb-1 text-base font-semibold text-white">{inspection.vehicle}</h3>

              {/* Location */}
              <p className="mb-3 text-xs text-gray-400">{inspection.owner.name}</p>

              {/* Price and Integrity Score */}
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-cyan-400">
                    ${calculatePrice(inspection.integrityScore).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="mb-1 text-xs text-gray-400">Integrity Score:</p>
                  <span
                    className={`rounded px-2 py-1 text-sm font-semibold ${getIntegrityScoreClass(inspection.integrityScore)}`}
                  >
                    {inspection.integrityScore}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-4 gap-3 md:grid">
                <div className="flex justify-between gap-2 rounded-lg ">
                  <button
                    onClick={() => handleViewListing(inspection)}
                    className="flex flex-1 items-center justify-center gap-2 bg-[#3083FF4D] p-2 rounded text-gray-400 transition-colors hover:text-cyan-400"
                    title="View Listing"
                  >
                    <span className="text-lg">👁️</span>
                  </button>

                  <button
                    onClick={() => handleViewListing(inspection)}
                    className="flex flex-1 items-center justify-center gap-2 bg-[#3083FF] p-2 rounded text-gray-400 transition-colors hover:text-cyan-400"
                    title="View Listing"
                  >
                   < span className="text-lg "><Edit size={26} /></span>
                  </button>
                </div>
                <div className="flex items-center justify-center gap-2 rounded-lg col-span-3   bg-gradient-to-r from-purple-600/30 to-pink-600/30 p-3">
                  <div className="h-6 w-px bg-[#2a2d4a]"></div>
                  <button className="flex-1 text-center text-sm font-medium text-white transition-colors hover:text-cyan-400">
                    Promote
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Listing Detail Tab
function ListingDetailTab({ listing }: { listing: User }) {
  const [activeDetailTab, setActiveDetailTab] = useState("Overview");

  const detailTabs = ["Overview", "Certification", "Seller Information", "Image"];

  return (
    <div className="mr-0 space-y-2 rounded-2xl border border-[#2a2d4a] bg-[#1D1D41] md:mr-7">
      {/* Header Section */}
      <div className="rounded-xl p-6">
        <div className="align-center flex items-center justify-center gap-6">
          {/* Vehicle Image Thumbnail */}
          <div className="flex h-24 w-32 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#2a2d4a] bg-[#252850]">
            <div className="text-4xl">🚗</div>
          </div>

          {/* Vehicle Info */}
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-white">
              Toyota Camry 2022 - Premium Package
            </h2>
            <p className="mt-1 text-[12px] text-gray-400">
              Listed by John Smith • New York, NY • Listed on 2023-10-15
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button className="rounded-lg bg-cyan-500/20 px-6 py-2 text-sm font-medium whitespace-nowrap text-cyan-400 transition-colors hover:bg-cyan-500/30">
              Promote
            </button>
            <button className="rounded-lg bg-green-500/20 px-6 py-2 text-sm font-medium whitespace-nowrap text-green-400 transition-colors hover:bg-green-500/30">
              Activate
            </button>
            <button className="rounded-lg bg-red-500/20 px-6 py-2 text-sm font-medium whitespace-nowrap text-red-400 transition-colors hover:bg-red-500/30">
              Remove
            </button>
          </div>
        </div>
      </div>
      <hr className="border-[#2a2d4a]" />

      {/* Sub-Tabs */}
      <div className="rounded-xl border-b border-[#2a2d4a] bg-[#1D1D41]">
        <div className="flex gap-8 overflow-x-auto px-6">
          {detailTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveDetailTab(tab)}
              className={`border-b-2 px-2 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                activeDetailTab === tab
                  ? "border-cyan-400 text-cyan-400"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeDetailTab === "Overview" && (
          <div className="space-y-2">
            {/* AI Module Results Header */}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white">AI Module Results</h3>
            </div>

            {/* Two Column Layout */}
            <div className="mx-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Vehicle Details */}
              <div className="border border-[#2a2d4a] rounded-xl overflow-hidden bg-[#1D1D41]">
                <div className="bg-[#252850] px-6 py-4 border-b border-[#2a2d4a]">
                  <h4 className="text-base font-semibold text-white">Vehicle Details</h4>
                </div>
                <div className="divide-y divide-[#2a2d4a]">
                  <div className="flex items-center justify-between px-6 py-4 bg-[#1D1D41]">
                    <span className="text-sm text-gray-400">Make & Model:</span>
                    <span className="text-sm font-medium text-white">Toyota Camry 2022</span>
                  </div>
                  <div className="flex items-center justify-between px-6 py-4 bg-[#252850]">
                    <span className="text-sm text-gray-400">Price:</span>
                    <span className="text-sm font-medium text-cyan-400">$24,500</span>
                  </div>
                  <div className="flex items-center justify-between px-6 py-4 bg-[#1D1D41]">
                    <span className="text-sm text-gray-400">Integrity Score:</span>
                    <span className="inline-block rounded bg-green-500/20 px-3 py-1 text-sm font-semibold text-green-400">
                      92%
                    </span>
                  </div>
                  <div className="flex items-center justify-between px-6 py-4 bg-[#252850]">
                    <span className="text-sm text-gray-400">Combo Type:</span>
                    <span className="text-sm font-medium text-white">Premium Package</span>
                  </div>
                  <div className="flex items-center justify-between px-6 py-4 bg-[#1D1D41]">
                    <span className="text-sm text-gray-400">Mileage:</span>
                    <span className="text-sm font-medium text-white">18,450 miles</span>
                  </div>
                  <div className="flex items-center justify-between px-6 py-4 bg-[#252850]">
                    <span className="text-sm text-gray-400">Location:</span>
                    <span className="text-sm font-medium text-white">New York, NY</span>
                  </div>
                  <div className="flex items-center justify-between px-6 py-4 bg-[#1D1D41]">
                    <span className="text-sm text-gray-400">Status:</span>
                    <span className="inline-block rounded bg-green-500/20 px-3 py-1 text-sm font-semibold text-green-400">
                      Active
                    </span>
                  </div>
                </div>
              </div>

              {/* Listing Information */}
              <div className="border border-[#2a2d4a] rounded-xl overflow-hidden bg-[#1D1D41]">
                <div className="bg-[#252850] px-6 py-4 border-b border-[#2a2d4a]">
                  <h4 className="text-base font-semibold text-white">Listing Information</h4>
                </div>
                <div className="divide-y divide-[#2a2d4a]">
                  <div className="flex items-center justify-between px-6 py-4 bg-[#1D1D41]">
                    <span className="text-sm text-gray-400">Listing ID:</span>
                    <span className="text-sm font-medium text-white">#LIST-4582</span>
                  </div>
                  <div className="flex items-center justify-between px-6 py-4 bg-[#252850]">
                    <span className="text-sm text-gray-400">Created Date:</span>
                    <span className="text-sm font-medium text-white">2023-10-15</span>
                  </div>
                  <div className="flex items-center justify-between px-6 py-4 bg-[#1D1D41]">
                    <span className="text-sm text-gray-400">Last Updated:</span>
                    <span className="text-sm font-medium text-white">2023-10-20</span>
                  </div>
                  <div className="flex items-center justify-between px-6 py-4 bg-[#252850]">
                    <span className="text-sm text-gray-400">Views:</span>
                    <span className="text-sm font-medium text-white">1,248</span>
                  </div>
                  <div className="flex items-center justify-between px-6 py-4 bg-[#1D1D41]">
                    <span className="text-sm text-gray-400">Inquiries:</span>
                    <span className="text-sm font-medium text-white">42</span>
                  </div>
                  <div className="flex items-center justify-between px-6 py-4 bg-[#252850]">
                    <span className="text-sm text-gray-400">Promotion Status:</span>
                    <span className="text-sm font-medium text-white">Featured</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="m-6 gap-3 rounded-2xl bg-[#23234B] p-6">
              <h3 className="py-2 text-white text-lg font-semibold">Description</h3>
              <hr className="border-[#2a2d4a] py-2" />
              <p className="text-sm text-gray-400">
                This 2022 Toyota Camry comes equipped with the Premium Package and has been
                exceptionally cared for since day one. It offers a refined driving experience with
                leather seats, a sunroof, and a full suite of advanced safety and driver-assistance
                features. The vehicle has undergone a comprehensive AI inspection and achieved an
                impressive 92% integrity score, confirming its overall quality and condition. It has
                a completely clean accident history, and all service and maintenance records are
                fully documented and available for review.
              </p>
            </div>

            <div className="m-6 gap-3 rounded-2xl bg-[#23234B] p-6">
              <h3 className="py-2 text-white text-lg font-semibold">Status Control</h3>
              <hr className="border-[#2a2d4a] py-2" />
              <div className="flex w-1/2 gap-2.5 text-white">
                <button className="rounded-lg border border-[#262656] bg-[#262656] px-8 py-3 text-sm">
                  Active
                </button>
                <button className="rounded-lg border border-[#262656] bg-[#262656] px-8 py-3 text-sm">
                  Pasused
                </button>
                <button className="rounded-lg border border-[#262656] bg-[#262656] px-8 py-3 text-sm">
                  Mark as Sold
                </button>
                <button className="rounded-lg border border-[#262656] bg-[#262656] px-8 py-3 text-sm">
                  Removed
                </button>
              </div>
            </div>
          </div>
        )}
        {activeDetailTab === "Certification" && (
          <div className="space-y-6 p-6">
            {/* AI Module Results Header */}
            <h3 className="text-lg font-semibold text-white">AI Module Results</h3>
            
            {/* Three Column Layout */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Certification Details */}
              <div className="border border-[#2a2d4a] rounded-xl overflow-hidden bg-[#1D1D41]">
                <div className="bg-[#252850] px-6 py-4 border-b border-[#2a2d4a]">
                  <h4 className="text-base font-semibold text-white">Certification Details</h4>
                </div>
                <div className="divide-y divide-[#2a2d4a]">
                  <div className="flex items-center justify-between px-6 py-4 bg-[#1D1D41]">
                    <span className="text-sm text-gray-400">Certification ID:</span>
                    <span className="text-sm font-medium text-white">#CERT-4582</span>
                  </div>
                  <div className="flex items-center justify-between px-6 py-4 bg-[#252850]">
                    <span className="text-sm text-gray-400">Inspection Date:</span>
                    <span className="text-sm font-medium text-white">2023-10-15</span>
                  </div>
                  <div className="flex items-center justify-between px-6 py-4 bg-[#1D1D41]">
                    <span className="text-sm text-gray-400">Inspector:</span>
                    <span className="text-sm font-medium text-white">John Smith</span>
                  </div>
                  <div className="flex items-center justify-between px-6 py-4 bg-[#252850]">
                    <span className="text-sm text-gray-400">Combo Type:</span>
                    <span className="text-sm font-medium text-white">Premium Package</span>
                  </div>
                  <div className="flex items-center justify-between px-6 py-4 bg-[#1D1D41]">
                    <span className="text-sm text-gray-400">Integrity Score:</span>
                    <span className="inline-block rounded bg-green-500/20 px-3 py-1 text-sm font-medium text-green-400">
                      92%
                    </span>
                  </div>
                </div>
              </div>

              {/* Certification Report */}
              <div className="rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6">
                <h4 className="mb-6 text-base font-semibold text-white">Certification Report</h4>
                <div className="space-y-4">
                  <p className="text-sm text-gray-300">
                    Complete AI certification report with detailed analysis of vehicle condition.
                  </p>
                  
                  <div className="space-y-3">
                    <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-500/20 px-4 py-3 text-sm font-medium text-blue-400 transition-colors hover:bg-blue-500/30">
                      <span>📄</span>
                      View Full Report
                    </button>
                    
                    <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-500/20 px-4 py-3 text-sm font-medium text-green-400 transition-colors hover:bg-green-500/30">
                      <span>📥</span>
                      Download PDF
                    </button>
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <div className="rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6">
                <h4 className="mb-6 text-base font-semibold text-white">QR Code</h4>
                <div className="space-y-4 text-center">
                  <p className="text-sm text-gray-300">
                    Scan to verify certification
                  </p>
                  
                  {/* QR Code Display */}
                  <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-lg bg-white p-2">
                    <Image
                      src="/provax-dashboard/file-icons/code.png"
                      alt="QR Code"
                      width={112}
                      height={112}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  
                  <button className="w-full rounded-lg bg-cyan-500/20 px-4 py-2 text-sm font-medium text-cyan-400 transition-colors hover:bg-cyan-500/30">
                    Generate New QR Code
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        
        {activeDetailTab === "Seller Information" && (
          <div className="space-y-6 p-6 border rounded m-2 border-[#2a2d4a]">
            {/* Information Header */}
            <h3 className="text-lg font-semibold text-white">Information</h3>
            
            {/* Seller Profile Section */}
            <div className="space-y-6 border-t border-[#2a2d4a] pt-6">
              {/* Seller Avatar and Basic Info */}
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-gray-300">
                  <Image  
                    src="/avatars/john-smith.jpg"
                    alt="John Smith"
                    width={64}
                    height={64}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const nextEl = e.currentTarget.nextElementSibling as HTMLElement | null;
                      if (nextEl) nextEl.style.display = 'flex';
                    }}
                  />
                  <div className="hidden h-full w-full items-center justify-center bg-gray-500 text-white text-xl font-semibold">
                    JS
                  </div>
                </div>
                
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-white">John Smith</h4>
                  
                  {/* Rating Stars */}
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`text-lg ${
                            star <= 4 ? 'text-yellow-400' : 'text-gray-400'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-300">4.5/5.0</span>
                  </div>
                  
                  <p className="text-sm text-gray-400 mt-1">
                    Certified Seller • Member since 2022
                  </p>
                </div>
              </div>
              
              {/* Contact Information and Seller Statistics Grid */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Contact Information */}
                <div className="border border-[#2a2d4a] rounded-xl overflow-hidden bg-[#1D1D41]">
                  <div className="bg-[#252850] px-6 py-4 border-b border-[#2a2d4a]">
                    <h5 className="text-lg font-semibold text-white">Contact Information</h5>
                  </div>
                  
                  <div className="divide-y divide-[#2a2d4a]">
                    <div className="flex items-center justify-between px-6 py-4 bg-[#1D1D41]">
                      <span className="text-sm text-gray-400">Email:</span>
                      <span className="text-sm font-medium text-white">john.smith@example.com</span>
                    </div>
                    
                    <div className="flex items-center justify-between px-6 py-4 bg-[#252850]">
                      <span className="text-sm text-gray-400">Phone:</span>
                      <span className="text-sm font-medium text-white">+1 (555) 123-4567</span>
                    </div>
                    
                    <div className="flex items-center justify-between px-6 py-4 bg-[#1D1D41]">
                      <span className="text-sm text-gray-400">Location:</span>
                      <span className="text-sm font-medium text-white">New York, NY</span>
                    </div>
                  </div>
                </div>
                
                {/* Seller Statistics */}
                <div className="border border-[#2a2d4a] rounded-xl overflow-hidden bg-[#1D1D41]">
                  <div className="bg-[#252850] px-6 py-4 border-b border-[#2a2d4a]">
                    <h5 className="text-lg font-semibold text-white">Seller Statistics</h5>
                  </div>
                  
                  <div className="divide-y divide-[#2a2d4a]">
                    <div className="flex items-center justify-between px-6 py-4 bg-[#1D1D41]">
                      <span className="text-sm text-gray-400">Total Listings:</span>
                      <span className="text-sm font-medium text-white">#LIST-4582</span>
                    </div>
                    
                    <div className="flex items-center justify-between px-6 py-4 bg-[#252850]">
                      <span className="text-sm text-gray-400">Sold Vehicles:</span>
                      <span className="text-sm font-medium text-white">2023-10-15</span>
                    </div>
                    
                    <div className="flex items-center justify-between px-6 py-4 bg-[#1D1D41]">
                      <span className="text-sm text-gray-400">Response Rate:</span>
                      <span className="text-sm font-medium text-white">2023-10-20</span>
                    </div>
                    
                    <div className="flex items-center justify-between px-6 py-4 bg-[#252850]">
                      <span className="text-sm text-gray-400">Average Response Time:</span>
                      <span className="text-sm font-medium text-white">1,248</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}


        {activeDetailTab === "Image" && (
          <div className="rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6 space-y-4  text-gray-400">
            
              {/* Uploaded Photos */}
                <div className="rounded-xl border border-[#2a2d4a] bg-[#23234B] p-6">
                  <h4 className="mb-4 text-base font-semibold text-white">Vehicle Images</h4>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                    <div className="relative overflow-hidden rounded-lg">
                      <img 
                        src="/provax/seat.png"
                        alt="Engine Bay" 
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-[#191840] p-2">
                        <span className="text-xs font-medium text-white">Engine Bay</span>
                      </div>
                    </div>
                    <div className="relative overflow-hidden rounded-lg">
                      <img 
                        src="/provax/car-top-view.png"
                        alt="Dashboard Warning" 
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-[#191840] p-2">
                        <span className="text-xs font-medium text-white">Dashboard Warning</span>
                      </div>
                    </div>
                    <div className="relative overflow-hidden rounded-lg">
                      <img 
                        src="/provax/lightCar.png"
                        alt="Engine Overall" 
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-[#191840] p-2">
                        <span className="text-xs font-medium text-white">Engine Overall</span>
                      </div>
                    </div>
                      <div className="relative overflow-hidden rounded-lg">
                      <img 
                        src="/provax/seat.png"
                        alt="Engine Bay" 
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-[#191840] p-2">
                        <span className="text-xs font-medium text-white">Engine Bay</span>
                      </div>
                    </div>
                    <div className="relative overflow-hidden rounded-lg">
                      <img 
                        src="/provax/car-top-view.png"
                        alt="Dashboard Warning" 
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-[#191840] p-2">
                        <span className="text-xs font-medium text-white">Dashboard Warning</span>
                      </div>
                    </div>
                    <div className="relative overflow-hidden rounded-lg">
                      <img 
                        src="/provax/lightCar.png"
                        alt="Engine Overall" 
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-[#191840] p-2">
                        <span className="text-xs font-medium text-white">Engine Overall</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Control */}
                <div className="rounded-xl border border-[#2a2d4a] bg-[#23234B] p-6">
                  <h4 className="mb-4 text-base font-semibold text-white">Image Moderation</h4>
                  <div className="flex gap-3">
                    <button className="rounded-lg bg-green-500/20 px-5 py-3 text-sm font-medium text-green-400 transition-colors hover:bg-green-500/30">
                    <span className="pr-2">✓</span>
                      Approve All Images
                    </button>
                    
                    <button className="rounded-lg bg-red-500/20 px-5 py-3 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/30">
                      <span  className="pr-2" >✗</span>
                      Reject Selected
                    </button>
                  </div>
                </div>
          </div>
        )}
      </div>
    </div>
  );
}

// --------------------------------------------------------------- other Detail Tab Components ---------------------------------------------------------------------------------

// Vehicle Metrics Tab
function VehicleMetricsTab() {
  return (
    <div className="space-y-6 rounded-2xl bg-[#23234B] p-5">
      <h3 className="mb-6 text-lg font-semibold text-white">Vehicle Metrics</h3>

      <hr className="border-[#4d506a]" />

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="flex flex-col items-center rounded-xl border border-[#2a2d4a] bg-[#1a1d3a] p-6">
          <svg width="80" height="80" viewBox="0 0 80 80" className="mb-4">
            <circle cx="40" cy="40" r="35" fill="none" stroke="#10b981" strokeWidth="6" />
            <circle
              cx="40"
              cy="40"
              r="35"
              fill="none"
              stroke="#06b6d4"
              strokeWidth="4"
              strokeDasharray="219.8 351.9"
              strokeLinecap="round"
              transform="rotate(-90 40 40)"
            />
            <text x="40" y="48" fontSize="20" fontWeight="bold" fill="#10b981" textAnchor="middle">
              92%
            </text>
          </svg>
          <p className="text-center text-sm font-medium text-gray-400">Vehicle Integrity Score</p>
          <p className="mt-1 text-center text-xs text-gray-500">
            Overall vehicle condition assessment
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-xl border border-[#2a2d4a] bg-[#252850] p-6">
          <p className="text-center text-4xl font-bold text-white">142</p>
          <p className="mt-2 text-center text-sm text-gray-400">Components Checked</p>
        </div>

        <div className="flex flex-col justify-center rounded-xl border border-[#2a2d4a] bg-[#1a1d3a] p-6">
          <p className="text-center text-4xl font-bold text-white">98%</p>
          <p className="mt-2 text-center text-sm text-gray-400">AI Confidence Score</p>
        </div>

        <div className="flex flex-col justify-center rounded-xl border border-[#2a2d4a] bg-[#252850] p-6">
          <p className="text-center text-4xl font-bold text-white">3</p>
          <p className="mt-2 text-center text-sm text-gray-400">Previous Certifications</p>
        </div>
      </div>

      {/* Certification Summary */}
      <div className="overflow-hidden rounded-xl border border-[#2a2d4a] bg-[#1a1d3a]">
        <div className="border-b border-[#2a2d4a] bg-[#252850] px-6 py-4">
          <h4 className="text-lg font-semibold text-white">Certification Summary</h4>
        </div>
        <div className="divide-y divide-[#2a2d4a]">
          <div className="flex items-center justify-between p-4">
            <div>
              <p className="font-medium text-white">2023-10-15</p>
              <p className="text-xs text-gray-400">Current Inspection</p>
            </div>
            <span className="rounded bg-green-500/20 px-3 py-1 text-xs font-medium text-green-400">
              92%
            </span>
          </div>
          <div className="flex items-center justify-between bg-[#252850] p-4">
            <div>
              <p className="font-medium text-white">2023-04-10</p>
              <p className="text-xs text-gray-400">Routine Inspection</p>
            </div>
            <span className="rounded bg-green-500/20 px-3 py-1 text-xs font-medium text-green-400">
              89%
            </span>
          </div>
          <div className="flex items-center justify-between p-4">
            <div>
              <p className="font-medium text-white">2022-11-05</p>
              <p className="text-xs text-gray-400">Post-Repair Inspection</p>
            </div>
            <span className="rounded bg-orange-500/20 px-3 py-1 text-xs font-medium text-orange-400">
              84%
            </span>
          </div>
          <div className="flex items-center justify-between bg-[#252850] p-4">
            <div>
              <p className="font-medium text-white">2022-05-20</p>
              <p className="text-xs text-gray-400">Initial Certification</p>
            </div>
            <span className="rounded bg-green-500/20 px-3 py-1 text-xs font-medium text-green-400">
              91%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Admin Comments Tab
function AdminCommentsTab() {
  const comments = [
    {
      id: 1,
      author: "Admin User",
      badge: "Safety Issue",
      badgeColor: "bg-red-500/20 text-red-400",
      date: "2023-10-15 14:30",
      module: "AI Module: Structure Analysis",
      text: "Found minor frame misalignment in rear section that AI missed. Requires manual verification.",
      hasActions: true
    },
    {
      id: 2,
      author: "Technical Team",
      badge: "In Progress",
      badgeColor: "bg-blue-500/20 text-blue-400",
      date: "2023-10-15 11:15",
      module: "AI Module: Paint Analysis",
      text: "Found minor frame misalignment in rear section that AI missed. Requires manual verification.",
      hasActions: true
    },
    {
      id: 3,
      author: "Admin User",
      badge: "Safety Issue",
      badgeColor: "bg-red-500/20 text-red-400",
      date: "2023-10-15 14:30",
      module: "AI Module: Structure Analysis",
      text: "Found minor frame misalignment in rear section that AI missed. Requires manual verification.",
      hasActions: true
    }
  ];

  // Admin Comments Tab
  return (
    <div className="space-y-6 rounded-2xl bg-[#23234B] p-5">
      <h3 className="mb-6 text-lg font-semibold text-white">Technical Comments & Overrides</h3>

      <div className="space-y-4">
        {comments.map((comment, idx) => (
          <div
            key={comment.id}
            className={`rounded-xl border border-l-8 border-[#2a2d4a] border-l-[#00FF88] p-4 ${
              idx % 2 === 0 ? "bg-[#1a1d3a]" : "bg-[#252850]"
            }`}
          >
            <div className="mb-3 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-white">{comment.author}</span>
                <span
                  className={`rounded-full px-2 py-1 text-xs font-medium ${comment.badgeColor}`}
                >
                  {comment.badge}
                </span>
              </div>
              <span className="text-xs text-gray-400">• {comment.date}</span>
            </div>

            <p className="mb-2 text-xs font-medium text-gray-400">{comment.module}</p>
            <p className="mb-4 text-sm text-gray-300">{comment.text}</p>

            {comment.hasActions && (
              <div className="flex gap-2">
                {/* Action Buttons */}
                {/* Edit */}
                <button className="rounded-lg border border-[#2a2d4a] bg-[#1a1d3a] p-2 transition-colors hover:border-cyan-400/50">
                  <Edit className="h-4 w-4 text-cyan-400" />
                </button>

                {/* Delete */}
                <button className="rounded-lg border border-red-500/30 bg-red-500/20 p-2 transition-colors hover:border-red-500/50">
                  <Trash className="h-4 w-4 text-red-400" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add New Comment Button */}
      <div className="mt- flex w-full justify-center">
        <button className="align-center flex items-center justify-center gap-2 rounded-xl bg-[#3083FF] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700">
          <span>+</span> Add New Comment
        </button>
      </div>
    </div>
  );
}

const serviceRequestData = [35, 48, 52, 58, 62, 70, 72, 68, 71, 75, 78, 80];
const completedJobsData = [
  { month: "Jan", value: 45 },
  { month: "Feb", value: 52 },
  { month: "Mar", value: 48 },
  { month: "Apr", value: 61 },
  { month: "May", value: 55 },
  { month: "Jun", value: 67 },
  { month: "Jul", value: 72 },
  { month: "Aug", value: 68 },
  { month: "Sep", value: 74 },
  { month: "Oct", value: 71 },
  { month: "Nov", value: 69 },
  { month: "Dec", value: 75 }
];

// Promotional Tools Tab
function PromotionalToolsTab() {
  const [appliedPromotions, setAppliedPromotions] = useState<{ [key: number]: boolean }>({});

  const promotionPackages = [
    {
      name: "Basic Promotion",
      price: "$49",
      period: "/ Month",
      icon: "/provax-dashboard/big-icons/speaker.png",
      features: ["Limited service listings", "Basic analytics", "Standard support"]
    },
    {
      name: "Premium Promotion",
      price: "$99",
      period: "/ Month",
      icon: "/provax-dashboard/big-icons/Star 11.png",
      features: [
        "Unlimited listings",
        "Advanced analytics dashboard",
        "Priority support",
        "AI bidding suggestions"
      ]
    },
    {
      name: "Maximum Promotion",
      price: "$199",
      period: "/ Month",
      icon: "/provax-dashboard/big-icons/crown.png",
      features: [
        "Full real-time bidding access",
        "Dedicated account manager",
        "Split payment automation",
        "Early access to new AI tools"
      ]
    }
  ];

  const handleApplyPromotion = (index: number) => {
    setAppliedPromotions((prev) => ({
      ...prev,
      [index]: true
    }));
  };

  const handleCancelPromotion = (index: number) => {
    setAppliedPromotions((prev) => ({
      ...prev,
      [index]: false
    }));
  };

  const activePromotions = promotionPackages.filter((_, idx) => appliedPromotions[idx]);

  return (
    <div className="space-y-6">
      {/* Promotion Packages Tab */}
      <div className="mr-0 space-y-6 rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6 md:mr-7">
        {/* Header */}
        <div>
          <h2 className="mb-1 text-xl font-semibold text-white">Listing Promotion Packages</h2>
          <hr className="border-[#2a2d4a] py-2" />
          <p className="text-[12px] text-gray-400">
            Boost your listing visibility with our promotion packages. Select a package to apply to
            the current listing.
          </p>
        </div>

        {/* Promotion Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {promotionPackages.map((pkg, pkgIndex) => (
            <div
              key={pkg.name}
              className="flex flex-col rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6"
            >
              {/* Icon */}
              <div className="mb-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center">
                  <Image
                    src={pkg.icon}
                    alt={pkg.name}
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Package Name */}
              <h3 className="mb-3 text-center text-lg font-semibold text-white">{pkg.name}</h3>

              {/* Price */}
              <div className="mb-6 text-center">
                <span className="text-4xl font-bold text-white">{pkg.price}</span>
                <p className="text-sm text-gray-400">{pkg.period}</p>
              </div>

              {/* Features */}
              <div className="mb-6 flex-1 space-y-3">
                {pkg.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <span className="mt-1 text-cyan-400">✓</span>
                    <span className="text-sm text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Apply Button */}
              <button
                onClick={() => handleApplyPromotion(pkgIndex)}
                disabled={appliedPromotions[pkgIndex]}
                className={`w-full rounded-lg px-4 py-3 text-sm font-semibold text-white transition-colors ${
                  appliedPromotions[pkgIndex]
                    ? "cursor-not-allowed bg-gray-600/50 text-gray-400"
                    : "bg-[#3083FF] hover:bg-blue-700"
                }`}
              >
                {appliedPromotions[pkgIndex] ? "Applied" : "Apply Promotion"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Current Promotions Tab */}
      {activePromotions.length > 0 && (
        <div className="mr-0 space-y-6 rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6 md:mr-7">
          {/* Header */}
          <div>
            <h2 className="mb-2 text-xl font-semibold text-white">Current Promotions</h2>
            <hr className="border-[#2a2d4a]" />
          </div>

          {/* Promotion Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {activePromotions.map((pkg, idx) => {
              const originalIdx = promotionPackages.findIndex((p) => p.name === pkg.name);
              return (
                <div
                  key={originalIdx}
                  className="flex flex-col rounded-xl border border-green-500/30 bg-green-500/10 p-6"
                >
                  {/* Icon */}
                  <div className="mb-6 flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center">
                      <Image
                        src={pkg.icon}
                        alt={pkg.name}
                        width={64}
                        height={64}
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* Package Name */}
                  <h3 className="mb-3 text-center text-lg font-semibold text-white">{pkg.name}</h3>

                  {/* Price */}
                  <div className="mb-6 text-center">
                    <span className="text-4xl font-bold text-white">{pkg.price}</span>
                    <p className="text-sm text-gray-400">{pkg.period}</p>
                  </div>

                  {/* Features */}
                  <div className="mb-6 flex-1 space-y-3">
                    {pkg.features.map((feature) => (
                      <div key={`${pkg.name}-${feature}`} className="flex items-start gap-3">
                        <span className="mt-1 text-green-400">✓</span>
                        <span className="text-sm text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Cancel Button */}
                  <button
                    onClick={() => handleCancelPromotion(originalIdx)}
                    className="w-full rounded-lg bg-red-500/20 px-4 py-3 text-sm font-semibold text-red-400 transition-colors hover:bg-red-500/30"
                  >
                    Cancel Promotion
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// Moderation Guidelines Tab
function ModerationGuidelinesTab() {
  const guidelines = [
    {
      title: "Text Content",
      rules: [
        "No misleading or exaggerated claims",
        "No offensive or inappropriate language",
        "Accurate vehicle information",
        "No contact information in public descriptions"
      ]
    },
    {
      title: "Images",
      rules: [
        "High quality, clear images",
        "No watermarks or logos",
        "Appropriate content only",
        "Minimum 5 images required"
      ]
    },
    {
      title: "Pricing & Information",
      rules: [
        "Accurate pricing information",
        "Consistent data with certification",
        "No hidden fees or conditions",
        "Clear listing status"
      ]
    }
  ];

  return (
    <div className="mr-0 space-y-6 rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6 md:mr-7">
      {/* Header */}
      <div className="">
        <h2 className="mb-2 text-xl font-semibold text-white">Moderation Guidelines</h2>
        <p className="text-sm text-gray-400">
          Review listing content compliance with marketplace guidelines across all categories.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#2a2d4a] bg-[#1a1d3a]">
        <div className="border-b border-[#2a2d4a] bg-[#252850] px-6 py-4">
          <h3 className="font-semibold text-white">Content Moderation Queue</h3>
          <p className="mt-1 text-sm text-gray-300">
            Review and moderate listing content for compliance with marketplace guidelines.
          </p>
        </div>
        <div className="space-y-4 p-4">
          {/* Inappropriate Description */}
          <div className="rounded-lg border-l-4 border-[#FF6060] bg-[#252850] p-4 pl-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-white">Inappropriate Description</p>
                <p className="mt-1 text-sm text-gray-300">
                  "This car is absolutely perfect and has no issues whatsoever. Best deal you'll
                  ever find!"
                </p>
                <p className="mt-2 text-xs text-gray-400">
                  Reason: Potential exaggeration and misleading claims
                </p>
              </div>
              <div className="flex space-x-2">
                <button className="rounded border border-red-500/30 bg-red-500/20 px-2 py-1 text-xs text-red-400">
                  Reject
                </button>
                <button className="rounded border border-green-500/30 bg-green-500/20 px-2 py-1 text-xs text-green-400">
                  Approve
                </button>
              </div>
            </div>
          </div>

          {/* Low Quality Images */}
          <div className="rounded-lg border-l-4 border-[#FF6060] bg-[#252850] p-4 pl-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-white">Low Quality Images</p>
                <p className="mt-1 text-sm text-gray-300">
                  3 images flagged for poor quality, blurriness, or inappropriate content
                </p>
                <p className="mt-2 text-xs text-gray-400">
                  Reason: Images do not meet marketplace quality standards
                </p>
              </div>
              <div className="flex space-x-2">
                <button className="rounded border border-red-500/30 bg-red-500/20 px-2 py-1 text-xs text-red-400">
                  Reject
                </button>
                <button className="rounded border border-green-500/30 bg-green-500/20 px-2 py-1 text-xs text-green-400">
                  Approve
                </button>
              </div>
            </div>
          </div>

          {/* Inconsistent Information */}
          <div className="rounded-lg border-l-4 border-[#FF6060] bg-[#252850] p-4 pl-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-white">Inconsistent Information</p>
                <p className="mt-1 text-sm text-gray-300">
                  Mileage in description (45,000 miles) doesn't match certification report (52,000
                  miles)
                </p>
                <p className="mt-2 text-xs text-gray-400">
                  Reason: Data inconsistency between listing and certification
                </p>
              </div>
              <div className="flex space-x-2">
                <button className="rounded border border-red-500/30 bg-red-500/20 px-2 py-1 text-xs text-red-400">
                  Reject
                </button>
                <button className="rounded border border-green-500/30 bg-green-500/20 px-2 py-1 text-xs text-green-400">
                  Approve
                </button>
              </div>
            </div>
          </div>

          {/* Contact Information in Description */}
          <div className="rounded-lg border-l-4 border-[#FF6060] bg-[#252850] p-4 pl-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-white">Contact Information in Description</p>
                <p className="mt-1 text-sm text-gray-300">
                  "Contact me directly at 555-1234 for the best price!"
                </p>
                <p className="mt-2 text-xs text-gray-400">
                  Reason: Direct contact information should not be in public description
                </p>
              </div>
              <div className="flex space-x-2">
                <button className="rounded border border-red-500/30 bg-red-500/20 px-2 py-1 text-xs text-red-400">
                  Reject
                </button>
                <button className="rounded border border-green-500/30 bg-green-500/20 px-2 py-1 text-xs text-green-400">
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#2a2d4a] bg-[#1a1d3a]">
        <div className="border-b border-[#2a2d4a] bg-[#252850] px-6 py-4">
          <h3 className="font-semibold text-white">Moderation Guidelines</h3>
        </div>
        {/* Guidelines Grid - 3 Columns */}
        <div className="grid grid-cols-1 gap-6 p-7 md:grid-cols-3">
          {guidelines.map((guideline) => (
            <div
              key={guideline.title}
              className="overflow-hidden rounded-xl border border-[#2a2d4a] bg-[#1D1D41]"
            >
              {/* Header */}
              <div className="border-b border-[#2a2d4a] bg-[#252850] px-6 py-4">
                <h3 className="text-base font-semibold text-white">{guideline.title}</h3>
              </div>

              {/* Rules List */}
              <div className="divide-y divide-[#2a2d4a]">
                {guideline.rules.map((rule, ruleIdx) => (
                  <div
                    key={`${guideline.title}-rule-${ruleIdx}`}
                    className={`px-6 py-4 ${ruleIdx % 2 === 0 ? "bg-[#1D1D41]" : "bg-[#252850]"}`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-1 flex-shrink-0 text-cyan-400">•</span>
                      <span className="text-sm text-gray-300">{rule}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    // </div>
  );
}
