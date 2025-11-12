import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import { Fragment } from "react";

import FAQ from "@/components/carSections/faq";
import Hero from "@/components/carSections/hero";
import TrustedBy from "@/components/carSections/trusted-by";
import HowItWorks from "@/components/carSections/how-it-works";
import AICertificationModules from "@/components/carSections/ai-certification-modules";
import ExploreCertifiedVehicles from "@/components/carSections/explore-certified-vehicles";
import ServiceBidding from "@/components/carSections/service-bidding";
import SubscriptionPlans from "@/components/carSections/subscription-plans";
import Testimonials from "@/components/carSections/Testimonials";
import CTASection from "@/components/carSections/CTASection";

export const metadata: Metadata = createMetadata({
  title: "SaasPilot | Next.js SaaS Starter Kit Boilerplate",
  canonicalUrlRelative: "/"
});

export default function Home() {
  return (
    <Fragment>
      <Hero />
      <HowItWorks/>
      <AICertificationModules/>
      <ExploreCertifiedVehicles/>
      <ServiceBidding/>
      <SubscriptionPlans/>
      <Testimonials/>
      <TrustedBy /> 
      <FAQ />
      <CTASection/>
      {/* <Footer/> */}
    </Fragment>
  );
}
