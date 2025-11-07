// import Image from "next/image";

// export default function Hero() {
//   return (
//     <div className="relative w-full min-h-screen flex items-center justify-center">
//       {/* ✅ Correct image path — starts from `/`, not `../../../public` */}
//       <Image
//         src="/provax/car.png"
//         alt="Car Image"
//         fill
//         className="object-cover"
//         priority
//       />

//       {/* ✅ Text overlay */}
//       <div className="absolute inset-0 flex">
//       <p className="pt-20 pl-70"><span className="h-2 w-100"><div></div></span>Artificial Intelligence</p>

//       <div className=" flex flex-col items-center justify-center text-center text-white px-1">
//         <h1 className="text-5xl font-bold text-white flex align-center ">AI-Powered Vehicle <br/> Certification & Service <br/> Bidding</h1>
//       </div>
//     </div>
//       </div>
//   );
// }

import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center">
      {/* Background Image */}
      <Image src="/provax/car.png" alt="Car Image" fill className="object-cover" priority />

      <div className="absolute top-12 left-12 z-10 mb-4 flex items-center space-x-4">
        <div className="h-px w-30 bg-white"></div> {/* Line */}
        <p className="text-sm tracking-widest text-white uppercase">Artificial Intelligence</p>
      </div>

      {/* Main Content Overlay (centered) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
        {/* "Artificial Intelligence" text with line */}

        {/* Main Heading */}
        <h1 className="text-center text-5xl leading-tight font-bold text-white">
          AI-Powered Vehicle <br /> Certification & Service <br /> Bidding
        </h1>

        <div className="flex">
          {/* Paragraph Text */}
          <p className="mt-6 max-w-2xl px-4 text-center text-lg text-white">
            Certify, sell, and service vehicles with transparency and trust. Automated AI
            inspections, instant reports with QR codes, and a verified bidding network for repairs.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <button className="flex items-center justify-center rounded-full bg-[#00e370] px-5 py-1 text-lg font-semibold text-black transition-colors duration-300 hover:bg-[#00c260]">
              Get Certified <span className="ml-3 text-xl">→</span>
            </button>
            <button className="border-primary text-primary flex items-center justify-center rounded-full border-2 px-5 py-1 text-lg font-semibold transition-colors duration-300 hover:border-[#00c260] hover:text-[#00c260]">
              Explore Marketplace <span className="ml-3 text-xl">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Vertical PROVAX text on the left */}
      <div className="absolute bottom-1/2 left-4 origin-left translate-y-1/2 -rotate-90 transform">
        <div className="flex flex-row items-center justify-center">
          <div className="h-px w-30 bg-white"></div> {/* Line */}
        <p className="text-lg tracking-widest text-white uppercase">PROVAX</p>
        </div>
      </div>

      {/* Vertical FOR EVERY NEED text on the right */}
      <div className="absolute top-1/2 right-4 origin-right -translate-y-1/2 rotate-90 transform">
        <p className="text-sm tracking-widest text-white uppercase">FOR EVERY NEED</p>
      </div>
    </div>
  );
}
