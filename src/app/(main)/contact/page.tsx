import ContactHero from "@/components/contact/hero";
import ContactForm from "@/components/contact/form";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = createMetadata({
  title: "Contact | PROVAX",
  description: "Get in touch with the PROVAX team. We're here to help.",
  canonicalUrlRelative: "/contact"
});

export default function ContactPage() {
  return (
    <div>
     <ContactHero/>
     <ContactForm/>
     <Testimonials />
     <CTASection />
    </div>
  );
}