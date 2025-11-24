import { createMetadata } from "@/lib/metadata";
import FilterStrip from "@/components/marketplace/filters-strip";
import type { Metadata } from "next";
import Marketplace from "@/components/marketplace/marketplace";
import Hero from "@/components/marketplace/hero";
import CTASection from "@/components/home/CTASection";
import TrustedBy from "@/components/home/trusted-by";


export const metadata: Metadata = createMetadata({
  title: "Marketplace | PROVAX",
  description: "Explore certified vehicles on the PROVAX marketplace.",
  canonicalUrlRelative: "/marketplace"
});

export default function MarketplacePage() {
  return (
    <div>
        <Hero/>
      <div className=" bg-[#0a0f24] pb-12">

        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            {/* Sidebar Filters */}
            <FilterStrip />
            {/* Main Content Area */}
            <div className="lg:col-span-3">
              <div className="">
                <Marketplace />
              </div>
            </div>
          </div>
        </div>
      </div>
       <CTASection />
       <TrustedBy />
    </div>
  );
}
