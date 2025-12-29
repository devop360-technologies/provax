

import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-[#0a0e17]">
      {/* Background Image */}
      <Image src="/provax/car.png" alt="Car Image" fill className="object-cover object-center" priority />

      {/* Dark Background Overlay */}
      <div className="absolute inset-0 bg-blue-600/17 lg:bg-blue-600/12"></div>

      {/* Top "Artificial Intelligence" label */}
      <div className="absolute top-6 md:top-16 lg:top-20 left-1/2 lg:left-1/4 z-10 flex -translate-x-1/2 items-center space-x-2 sm:space-x-3">
        <div className=" lg:block h-[0.5px] w-50 md:w-25 bg-white/60"></div>
        <p className="text-[9px] md:text-[8px] font-light tracking-[0.25em] w-full text-white/70 lg:text-white/80 uppercase">
          Artificial Intelligence
        </p>
      </div>

      {/* PROVAX Vertical Text - Left Side (Mobile Only) */}
      <div className="absolute left-3 md:left-6 top-[55%] -translate-y-1/2 z-10 flex items-center lg:hidden">
        <div className="flex flex-col items-center">
          <p className="mt-4 text-[10px] md:text-xs font-medium tracking-[0.12em] text-white/80 uppercase writing-vertical">
            PROVAX
          </p>
          <div className="h-40 md:h-20 w-px m-2 bg-white/40"></div>
        </div>
      </div>

      {/* FOR EVERY NEED Vertical Text - Right Side (Mobile Only) */}
      <div className="absolute right-3 md:right-6 top-[45%] -translate-y-1/2 z-10 flex items-center lg:hidden">
        <div className="flex flex-col items-center">
          <p className="mb-4 text-[10px] md:text-xs font-light tracking-[0.12em] text-white/60 uppercase writing-vertical-reverse">
            FOR EVERY NEED
          </p>
          <div className="h-20 md:h-20 w-px bg-white/40"></div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl px-10 md:px-12 lg:px-8">
        <div className="flex flex-col justify-center lg:items-center lg:text-left">
          {/* Main Heading */}
          <h1 className="mb-28 md:mb-40 text-[28px] leading-[1.25] md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white text-center lg:text-left">
            <span className="lg:hidden">
              AI-Powered
              <br />
              Vehicle
              <br />
              Certification &
              <br />
              Service Bidding
            </span>
            <span className="hidden lg:inline">
              AI-Powered Vehicle
              <br />
              Certification & Service
              <br />
              Bidding
            </span>
          </h1>

          {/* Content Section - Desktop Grid Layout */}
          <div className="w-full lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            {/* Left Side - Content */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:gap-6">
              {/* Vertical PROVAX text - Desktop Only */}
              <div className="hidden lg:flex items-center relative">
                <div className="h-24 w-px bg-white/60"></div>
                <div className="absolute top-[-50px] left-[-30px] origin-center -translate-y-1/2 rotate-270 transform">
                  <p className="text-sm font-bold tracking-[0.1em] whitespace-nowrap text-white uppercase">
                    PROVAX
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-[13px] leading-[1.7] md:text-sm lg:text-lg text-white/75 lg:text-white/80 max-w-[280px] md:max-w-md lg:max-w-xl mb-8 md:mb-10 lg:mb-0 lg:leading-relaxed">
                Certify, sell, and service vehicles with transparency and trust. Automated AI
                inspections, instant reports with QR codes, and a verified bidding network for
                repairs.
              </p>
            </div>

            {/* Right Side - Buttons */}
            <div className="flex flex-row gap-3 lg:gap-3 lg:pl-8 lg:justify-start">
              <button className="group flex items-center justify-center gap-2 rounded-full bg-[#00ff7f] px-3 py-2.5 md:px-6 md:py-3 lg:py-2.5 text-[11px] md:text-sm font-semibold text-black transition-all duration-300 hover:gap-3 hover:bg-[#00e370] lg:w-full lg:max-w-xs">
                Get Certified
                <span className="text-sm md:text-lg transition-all duration-300">→</span>
              </button>
              <button className="group flex items-center justify-center gap-2 rounded-full border border-[#00ff7f] lg:border-2 px-3 py-2.5 md:px-6 md:py-3 lg:py-2.5 text-[10px] md:text-sm font-semibold text-[#00ff7f] transition-all duration-300 hover:gap-3 hover:bg-[#00ff7f]/10 lg:w-full lg:max-w-xs">
                Explore Marketplace
                <span className="text-sm md:text-lg transition-all duration-300">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Vertical text on the right - Desktop Only */}
      <div className="hidden lg:flex items-center justify-center absolute top-1/3 right-8 xl:right-12">
        <div className="absolute right-[-35px] flex origin-center -translate-x-1/2 -translate-y-1/2 rotate-90 transform items-center space-x-3">
          <div className="h-[0.5px] w-20 bg-white/60"></div>
          <p className="text-[9px] font-light tracking-[0.3em] whitespace-nowrap text-white/60 uppercase">
            FOR EVERY NEED
          </p>
        </div>
      </div>
    </div>
  );
}