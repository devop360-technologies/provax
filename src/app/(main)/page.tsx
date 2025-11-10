import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import { Fragment } from "react";

import BentoGrid from "@/components/sections/bento-grid";
import CTA from "@/components/sections/cta";
import FAQ from "@/components/sections/faq";
import Features from "@/components/sections/features";
import FeaturesGrid from "@/components/sections/features-grid";
import Hero from "@/components/carSections/hero";
import Pricing from "@/components/sections/pricing";
import Problem from "@/components/sections/problem";
import Stats from "@/components/sections/stats";
import TrustedBy from "@/components/sections/trusted-by";
import WallOfLove from "@/components/sections/wall-of-love";
import HowItWorks from "@/components/carSections/how-it-works";
import AICertificationModules from "@/components/carSections/ai-certification-modules";
import ExploreCertifiedVehicles from "@/components/carSections/explore-certified-vehicles";
import ServiceBidding from "@/components/carSections/service-bidding";
import SubscriptionPlans from "@/components/carSections/subscription-plans";

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
      <TrustedBy />
      <FeaturesGrid />
      <Problem />
      <BentoGrid />
      <Features />
      <WallOfLove />
      <Pricing />
      <Stats />
      <FAQ />
      <CTA />
    </Fragment>
  );
}
