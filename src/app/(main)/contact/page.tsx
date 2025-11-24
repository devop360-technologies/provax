import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "Contact | PROVAX",
  description: "Get in touch with the PROVAX team. We're here to help.",
  canonicalUrlRelative: "/contact"
});

export default function ContactPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white">Contact</h1>
        <p className="text-white/60">Coming soon...</p>
      </div>
    </div>
  );
}
