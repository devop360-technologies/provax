import Hero from "@/components/services/hero";
import OurServices from "@/components/services/our-services";
import ServicesHowItWorks from "@/components/services/how-it-works";
import TopVerifiedProviders from "@/components/services/top-providers";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import SubscriptionPlans from "@/components/home/subscription-plans";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = createMetadata({
  title: "Services | PROVAX",
  description: "Post your service requests and connect with verified mechanics.",
  canonicalUrlRelative: "/services"
});

export default function ServicesPage() {
  return (
    <div>
      <Hero />
      <OurServices />
      <ServicesHowItWorks />
      <TopVerifiedProviders />
      <SubscriptionPlans />
      <CTASection />
    </div>
  );
}
