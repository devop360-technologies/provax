import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

import FAQSection from "@/components/home/faq";
import Hero from "@/components/home/hero";
import TrustedBy from "@/components/home/trusted-by";
import HowItWorks from "@/components/home/how-it-works";
import AICertificationModules from "@/components/home/ai-certification-modules";
import ExploreCertifiedVehicles from "@/components/home/explore-certified-vehicles";
import ServiceBidding from "@/components/home/service-bidding";
import SubscriptionPlans from "@/components/home/subscription-plans";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = createMetadata({
  title: "SaasPilot | Next.js SaaS Starter Kit Boilerplate",
  canonicalUrlRelative: "/"
});

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks/>
      <AICertificationModules/>
      <ExploreCertifiedVehicles/>
      <ServiceBidding/>
      <SubscriptionPlans/>
      <Testimonials/>
      <TrustedBy /> 
      <FAQSection />
      <CTASection/>
    </>
  );
