import Image from "next/image";
import { Marquee } from "@/components/marquee";
import { SectionHeader } from "@/components/section-headers";

const sponsors = [
  "/clients/BMW.png",
  "/clients/Daihatsu.png",
  "/clients/w.png",
  "/clients/toyota.png",
  "/clients/Vector.png",
  "/clients/Shape.png",
  "/clients/volvo.png",
  "/clients/tesla.png"
];

export default function TrustedBy() {
  return (
    <section className="w-full py-20 bg-gradient-to-br from-[#0A0F24]/100 via-[#0A0F24]/80 to-[#0A0F24]/100 bg-secondary" >
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        {/* Header Content */}
        <div className="pb-12 text-center">
          <p className= "text-[10px] md:text-[12px] font-light tracking-widest text-cyan-300/80 uppercase mb-3">
            Our Partners
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
            Powered by Industry Leaders
          </h2>
        </div>

        {/* Marquee Section */}
        <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg">
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

          {/* Gradient fade effects on sides */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#0A0F24] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#0A0F24] to-transparent" />
        </div>
      </div>
    </section>
  );
}