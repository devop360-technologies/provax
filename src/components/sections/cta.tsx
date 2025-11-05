import { SectionHeader } from "@/components/section-headers";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";

export default function CTA() {
  return (
    <SectionHeader className="md:py-24">
      <SectionHeader.HeaderContent className="pb-0">
        <SectionHeader.Heading className="font-mono font-extrabold md:text-6xl/none">
          Build, Launch & Scale Your Business Today
        </SectionHeader.Heading>

        <SectionHeader.Text className="md:text-lg">
          SaasPilot takes care of the complex technical aspects like authentication, payment
          processing, search engine optimization, user interface design, and third-party
          integrations, allowing you to concentrate on developing your core product and generating
          revenue.
        </SectionHeader.Text>

        <div className="mt-6 flex w-full items-center justify-center md:mt-10">
          <Button className="h-auto !px-12 !py-4">
            <Rocket /> Get SaasPilot
          </Button>
        </div>
      </SectionHeader.HeaderContent>
    </SectionHeader>
  );
}
