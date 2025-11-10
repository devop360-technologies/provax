import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-[#0a0e27]">
      {/* Background Image */}
      <Image src="/provax/car.png" alt="Car Image" fill className="object-cover" priority />

      {/* Top "Artificial Intelligence" label */}
      <div className="absolute top-20 left-1/4 z-10 flex -translate-x-1/2 items-center space-x-3">
        {/* <div className="h-px w-30 bg-white/60"></div> */}
        <div className="h-[0.5px] w-30 bg-white/60"></div>
        <p className="text-[8px] font-light tracking-[0.3em] text-white/80 uppercase">
          Artificial Intelligence
        </p>
        {/* <div className="h-px w-24 bg-white/60"></div> */}
      </div>

      {/* Main Content Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto flex max-w-7xl flex-col justify-between px-8 text-center">
          {/* Main Heading */}
          <h1 className="items-center text-center text-3xl leading-tight font-bold text-white lg:text-4xl xl:text-5xl">
            AI-Powered Vehicle
            <br />
            Certification & Service
            <br />
            Bidding
          </h1>
        </div>
      </div>

      {/* Vertical text on the right */}
      <div className="flex items-center justify-center">
        <div className="h-24 w-px bg-white/60"></div>
        <div className="absolute top-1/3 right-[-35px] flex origin-center -translate-x-1/2 -translate-y-1/2 rotate-90 transform items-center space-x-3">
          <div className="h-[0.5px] w-20 bg-white/60"></div>
          <p className="text-[9px] font-light tracking-[0.3em] whitespace-nowrap text-white/60 uppercase">
            FOR EVERY NEED
          </p>
          {/* <div className="h-[0.5px] w-8 bg-white/60"></div> */}
        </div>
      </div>

      <div className="z-10 mt-130">
        <div className="grid grid-cols-2 items-center gap-12 lg:grid-cols-2">
          {/* Left Side - Content */}
          <div className="space-y-8 text-left">
            {/* Vertical PROVAX text */}
            <div className="mb-8 flex items-center space-x-4">
              {/* <p className="text-sm font-light tracking-[0.3em] text-white uppercase">PROVAX</p> */}

              <div className="relative flex items-center">
                <div className="h-24 w-px bg-white/60"></div>
                <div className="absolute top-[-50px] left-[-30px] origin-center -translate-y-1/2 rotate-270 transform">
                  <p className="text-sm font-bold tracking-[0.1em] whitespace-nowrap text-white uppercase">
                    PROVAX
                  </p>
                </div>
              </div>
              {/* Description */}
              <p className="flex max-w-xl text-base leading-relaxed text-white/80 lg:text-lg">
                Certify, sell, and service vehicles with transparency and trust. Automated AI
                inspections, instant reports with QR codes, and a verified bidding network for
                repairs.
              </p>
            </div>

            {/* Right Side - Reserved for car image (covered by background) */}
            <div className="hidden lg:block"></div>
          </div>
          {/* Buttons */}
          <div className="flex flex-col gap-3 pt-4 pl-50 sm:flex-row">
            <button className="group flex items-center justify-center gap-2 rounded-full bg-[#00ff7f] px-6 py-2.5 text-sm font-semibold text-black transition-all duration-300 hover:gap-3 hover:bg-[#00e370]">
              Get Certified
              <span className="text-lg transition-all duration-300">→</span>
            </button>
            <button className="group flex items-center justify-center gap-2 rounded-full border-2 border-[#00ff7f] px-6 py-2.5 text-sm font-semibold text-[#00ff7f] transition-all duration-300 hover:gap-3 hover:bg-[#00ff7f]/10">
              Explore Marketplace
              <span className="text-lg transition-all duration-300">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
