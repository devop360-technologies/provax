import Image from "next/image";
import carImage from '../../asests/car-top-view.png';

export default function HowItWorks() {
  return (
    <section className="relative w-full min-h-screen bg-[#0a0e27] py-20 px-8 overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Car Visualization */}
          <div className="relative">
            {/* Glowing circles background */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[500px] h-[500px] rounded-full border border-cyan-500/20"></div>
              <div className="absolute w-[400px] h-[400px] rounded-full border border-cyan-500/30"></div>
              <div className="absolute w-[300px] h-[300px] rounded-full border border-cyan-500/40"></div>
            </div>

            {/* Car Image with glow effect */}
            <div className="relative z-10">
              <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full"></div>
              <Image
                 src={carImage}
  alt="Car Top View"
                width={800}
                height={500}
                className="relative z-10 w-full h-auto"
              />
              
              {/* Scanning dots animation */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative w-32 h-32">
                  <div className="absolute inset-0 bg-cyan-400 rounded-full opacity-40 animate-ping"></div>
                  <div className="absolute inset-4 bg-cyan-400 rounded-full opacity-60 animate-ping animation-delay-150"></div>
                  <div className="absolute inset-8 bg-cyan-400 rounded-full opacity-80 animate-ping animation-delay-300"></div>
                  <div className="absolute inset-12 bg-cyan-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-8">
            {/* Section Label */}
            <div className="flex items-center space-x-3">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-500"></div>
              <p className="text-xs tracking-[0.3em] text-cyan-400 uppercase font-light">
                Artificial Intelligence
              </p>
            </div>

            {/* Main Heading */}
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
              How Its Works
            </h2>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
              {/* Feature 1 */}
              <div className="flex items-start space-x-4 p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Upload Photos</h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    Add photos & videos of your vehicle
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start space-x-4 p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-600 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Receive VIS</h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    Get Vehicle Integrity Score instantly
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start space-x-4 p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">AI Inspection</h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    AI analyzes and generates report
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex items-start space-x-4 p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Sell or Service</h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    List or post jobs with certification
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button className="group flex items-center justify-center gap-3 rounded-full bg-[#00ff7f] px-8 py-3.5 text-base font-semibold text-black transition-all duration-300 hover:bg-[#00e370] hover:gap-4">
                Start Your Certification Now
                <span className="text-xl transition-all duration-300">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
