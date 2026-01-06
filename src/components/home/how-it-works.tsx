"use client";
import Image from "next/image";
import carImage from "../../asests/car-top-view.png";
import icon1 from "../../asests/icons/icon-1.png";
import icon2 from "../../asests/icons/icon-2.png";
import icon3 from "../../asests/icons/icon-3.png";
import icon4 from "../../asests/icons/icon-4.png";

export default function HowItWorks() {
  return (
    <section className="relative w-full min-h-[calc(100vh-100px)] overflow-hidden bg-[#0a0e27] px-4 py-20 sm:px-8">
      {/* Gradient glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"></div>
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* ---------- MOBILE LAYOUT (stacked) ---------- */}
        <div className="flex flex-col-reverse lg:flex-row lg:items-center lg:gap-16">
          {/* ---- CAR (bottom on mobile) ---- */}
          <div className="relative mt-12 lg:mt-0 lg:w-1/2">
            {/* Car + glow */}
            <div className="relative z-10">
              <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-3xl"></div>
              <Image
                src={carImage}
                alt="Car Top View"
                width={900}
                height={600}
                className="relative z-10 mx-auto w-full max-w-4xl "
                priority
              />
            </div>
          </div>

          {/* ---- CONTENT (top on mobile) ---- */}
          <div className="lg:w-1/2">
            <div className="space-y-8">
              {/* Label */}
              <div className="flex items-center space-x-3">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-500"></div>
                <p className="text-[8px] md:text-sm lg:text:sm font-light tracking-[0.3em] text-cyan-400 uppercase">
                  Artificial Intelligence
                </p>
              </div>

              {/* Heading */}
              <h2 className="text-3xl leading-tight text-white sm:text-3xl lg:text-4xl">
                How It Works
              </h2>

              {/* Feature grid */}
              <div className="grid grid-cols-1 gap-1 md:gap-6  sm:grid-cols-2">
                {/* Feature 1 */}
                <div className="flex items-start space-x-4 rounded-xl p-2 transition-all hover:bg-white/5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gray-800 to-gray-700">
                    <Image src={icon2} alt="" width={24} height={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Upload Photos</h3>
                    <p className="text-[11px] leading-relaxed text-white/90">
                      Add photos & videos of your vehicle
                    </p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex items-start space-x-4 rounded-xl p-2 transition-all hover:bg-white/5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gray-800 to-gray-700">
                    <Image src={icon1} alt="" width={24} height={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Receive VIS</h3>
                    <p className="text-[11px] leading-relaxed text-white/90">
                      Get Vehicle Integrity Score instantly
                    </p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex items-start space-x-4 rounded-xl p-2 transition-all hover:bg-white/5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gray-800 to-gray-700">
                    <Image src={icon4} alt="" width={24} height={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">AI Inspection</h3>
                    <p className="text-[11px] leading-relaxed text-white/90">
                      AI analyzes and generates report
                    </p>
                  </div>
                </div>

                {/* Feature 4 */}
                <div className="flex items-start space-x-4 rounded-xl p-2 transition-all hover:bg-white/5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gray-800 to-gray-700">
                    <Image src={icon3} alt="" width={24} height={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Sell or Service</h3>
                    <p className="text-[11px] leading-relaxed text-white/90">
                      List or post jobs with certification
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <button className="group flex items-center gap-3 rounded-full bg-[#00ff7f] px-3 py-1 md:px-5 md:py-2 text-[10px] md:text-sm font-semibold text-black transition-all hover:gap-4 hover:bg-[#00e370]">
                Start Your Certification Now
                <span className="text-sm md:text-xl transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}