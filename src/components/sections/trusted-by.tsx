import Image from "next/image";

import { Marquee } from "@/components/marquee";
import { SectionHeader } from "@/components/section-headers";

const sponsors = [
  "/clients/client-logo-1.svg",
  "/clients/client-logo-2.svg",
  "/clients/client-logo-3.svg",
  "/clients/client-logo-4.svg",
  "/clients/client-logo-5.svg",
  "/clients/client-logo-6.svg"
];

export default function TrustedBy() {
  return (
    <SectionHeader>
      <SectionHeader.HeaderContent className="pb-12">
        <SectionHeader.Heading>Trusted by</SectionHeader.Heading>
        <SectionHeader.Text>We are trusted by the world's best companies</SectionHeader.Text>
      </SectionHeader.HeaderContent>

      <SectionHeader.Content>
        <div className="bg-background relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg">
          <Marquee duration="40s" className="ms-2 flex shrink-0 flex-row justify-around gap-2">
            {sponsors.map((sponsor, index) => (
              <div key={index} className="flex h-16 w-40 items-center justify-center">
                <Image
                  width={0}
                  alt="logo"
                  height={64}
                  src={sponsor}
                  className="h-full w-auto object-contain px-5 dark:invert"
                  sizes="(max-width: 640px) 100vw, 200px"
                />
              </div>
            ))}
          </Marquee>

          <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-linear-to-r" />
          <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-linear-to-l" />
        </div>
      </SectionHeader.Content>
    </SectionHeader>
  );
}
