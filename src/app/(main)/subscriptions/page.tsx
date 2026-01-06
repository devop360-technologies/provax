import SubscriptionPlans from "@/components/subscriptions/subscription-plans";
import TrustedBy from "@/components/home/trusted-by";
import FAQSection from "@/components/home/faq";
import Hero from "@/components/subscriptions/hero";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import BusinessPlans from "@/components/subscriptions/business-plane";

export const metadata: Metadata = createMetadata({
  title: "Subscriptions | PROVAX",
  description: "Choose the perfect subscription plan for your business.",
  canonicalUrlRelative: "/subscriptions"
});

export default function SubscriptionsPage() {
  return (
    <div>
      <Hero />
      <SubscriptionPlans />
      <BusinessPlans />
      <TrustedBy />
      <FAQSection />
    </div>
  );
}
