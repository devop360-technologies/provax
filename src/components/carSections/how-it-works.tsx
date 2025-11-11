import Image from "next/image";
import carImage from '../../asests/car-top-view.png';
import icon1 from '../../asests/icons/icon-1.png'
import icon2 from '../../asests/icons/icon-2.png'
import icon3 from '../../asests/icons/icon-3.png'
import icon4 from '../../asests/icons/icon-4.png'

export default function HowItWorks() {
  return (
    <section className="relative w-ful min-h-[calc(100vh-100px)]  bg-[#0a0e27] py-35 px-8 overflow-hidden">
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
              {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative w-32 h-32">
                  <div className="absolute inset-0 bg-cyan-400 rounded-full opacity-40 animate-ping"></div>
                  <div className="absolute inset-4 bg-cyan-400 rounded-full opacity-60 animate-ping animation-delay-150"></div>
                  <div className="absolute inset-8 bg-cyan-400 rounded-full opacity-80 animate-ping animation-delay-300"></div>
                  <div className="absolute inset-12 bg-cyan-400 rounded-full"></div>
                </div>
              </div> */}
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
            <h2 className="text-2xl lg:text-3xl xl:text-4xl  text-white leading-tight">
              How Its Works
            </h2>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
              {/* Feature 1 */}
              <div className="flex items-start space-x-4 p-1  hover:border-cyan-500/40 transition-all duration-300">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center">
                  <Image src={icon2} alt="icon" width={24} height={24} />
                </div>
                <div>
                  <h3 className=" font-semibold text-white ">Upload Photos</h3>
                  <p className="text-[11px] text-white/90 leading-relaxed">
                    Add photos & videos of your vehicle
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start space-x-4 p-1   hover:border-cyan-500/40 transition-all duration-300">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center">
                  <Image src={icon1} alt="icon" width={24} height={24} />
                </div>
                <div>
                  <h3 className=" font-semibold text-white">Receive VIS</h3>
                  <p className="text-[11px] text-white/90 leading-relaxed">
                    Get Vehicle Integrity Score instantly
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start space-x-4 p-1  hover:border-cyan-500/40 transition-all duration-300">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center">
                   <Image src={icon4} alt="icon" width={24} height={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-white ">AI Inspection</h3>
                  <p className="text-[11px] text-white/90 leading-relaxed">
                    AI analyzes and generates report
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex items-start space-x-4 p-1 rounded-2xl  hover:border-cyan-500/40 transition-all duration-300">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center">
                 <Image src={icon3} alt="icon" width={24} height={24} />
                </div>
                <div>
                  <h3 className=" font-semibold text-white">Sell or Service</h3>
                  <p className="text-[11px] text-white/90 leading-relaxed">
                    List or post jobs with certification
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="">
              <button className="group flex items-center justify-center gap-3 rounded-full bg-[#00ff7f] px-5 py-1.5 text-[12px] font-semibold text-black transition-all duration-300 hover:bg-[#00e370] hover:gap-4">
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
