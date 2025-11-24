import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "Subscriptions | PROVAX",
  description: "Choose the perfect subscription plan for your business.",
  canonicalUrlRelative: "/subscriptions"
});

export default function SubscriptionsPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white">Subscriptions</h1>
        <p className="text-white/60">Coming soon...</p>
      </div>
    </div>
  );
}
