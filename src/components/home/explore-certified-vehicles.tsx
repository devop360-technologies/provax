// 'use client'
// import Image from "next/image";
// import { useState } from "react";
// import crystalCarImage from "../../asests/crystalCar.png";
// import car1  from "../../asests/card/car1.png"
// import car2  from "../../asests/card/car2.png"
// import car3  from "../../asests/card/car3.png"
// import car4  from "../../asests/card/car4.png"

// export default function ExploreCertifiedVehicles() {
//   const [selectedCategory, setSelectedCategory] = useState("All");

//   const vehicles = [
//     {
//       id: 1,
//       name: "2021 Tesla Model S",
//       price: "$48,000",
//       image: car1,
//       category: "All"
//     },
//     {
//       id: 2,
//       name: "2018 Lexus IS",
//       price: "$18,900",
//       image: car2,
//       category: "Exterior"
//     },
//     {
//       id: 3,
//       name: "2016 BMW 320i",
//       price: "$14,400",
//       image: car3,
//       category: "Safety"
//     },
//     {
//       id: 4,
//       name: "2020 Tesla Model 3",
//       price: "$29,900",
//       image: car4,
//       category: "Premium"
//     }
//   ];

//   const categories = ["All", "Exterior", "Safety", "Premium"];

//   // Filter vehicles based on selected category
//   const filteredVehicles = selectedCategory === "All" 
//     ? vehicles 
//     : vehicles.filter(vehicle => vehicle.category === selectedCategory);

//   return (
//     <section className="relative min-h-screen w-full overflow-hidden px-4 py-20 md:px-8">
//       {/* Background Image */}
//       <Image
//         src={crystalCarImage}
//         alt="Crystal Car Background"
//         fill
//         className="absolute inset-0 object-cover object-center"
//         priority
//       />

//       {/* Gradient Overlay - #05060700 to #0A0F24 with opacity */}
//       <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f24] via-[#0a0f2440] to-[#0a0f24]"></div>

//       {/* Additional gradient effects */}
//       <div className="pointer-events-none absolute inset-0 overflow-hidden">
//         <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl"></div>
//         <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-cyan-500/5 blur-3xl"></div>
//       </div>

//       <div className="relative z-10 container mx-auto max-w-7xl">
//         {/* Header Section */}
//         <div className="mb-16 text-center">
//           {/* Label */}
//           <div className="mb-3 inline-flex items-center space-x-2">
//             <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
//             <p className="text-[11px] font-light tracking-widest text-cyan-300/80 uppercase md:text-[12px">
//               Certified Vehicle Marketplace
//             </p>
//           </div>

//           {/* Main Heading */}
//           <h2 className="mb-2 text-2xl leading-tight  text-white md:text-3xl lg:text-4xl">
//             Explore Certified Vehicle
//           </h2>

//           {/* Description */}
//           <p className="mx-auto mb-6 max-w-3xl text-sm leading-relaxed text-white/70 md:text-base">
//             Experience the confidence of buying AI-certified vehicles, where every car is verified
//             for quality, safety, and performance.
//           </p>

//           {/* Category Filter Tabs */}
        //   <div className="w-full flex justify-center">
        //   <div className="flex flex-wrap justify-between gap-3 w-180 rounded-full border border-green-800 bg-white/10 backdrop-blur-md md:gap-4">
        //     {categories.map((category, index) => (
        //       <button
        //         key={index}
        //         onClick={() => setSelectedCategory(category)}
        //         className={`rounded-full px-6 py-2.5 text-sm  transition-all duration-300 md:px-13 md:py-4 md:text-base ${
        //           selectedCategory === category
        //             ? "border-2 border-[#0b723f] bg-transparent text-white"
        //             : "border-2 border-transparent text-white/70 hover:text-white"
        //         }`}
        //       >
        //         {category}
        //       </button>
        //     ))}
        //   </div>
        //   </div>
        // </div>

//         {/* Vehicles Grid */}
//         <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
//           {filteredVehicles.map((vehicle) => (
//             <div
//               key={vehicle.id}
//               className="group relative overflow-hidden rounded-2xl border border-green-800 bg-gradient-to-br from-white/5 to-white/[0.02] transition-all duration-300 hover:border-green-900 hover:shadow-lg hover:shadow-green-500/20"
//             >
//               {/* Vehicle Image Container */}
//               <div className="relative h-64 overflow-hidden bg-gradient-to-br from-slate-900 to-black md:h-56">
//                 <Image
//                   src={vehicle.image}
//                   alt={vehicle.name}
//                   fill
//                   className="object-cover transition-transform duration-500 group-hover:scale-110"
//                 />
//                 {/* Gradient overlay */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
//               </div>

//               {/* Vehicle Info */}
//               <div className="space-y-3 p-3 md:p-5">
//                 {/* Vehicle Name */}
//                 <h3 className="line-clamp-2 text-center text-base font-semibold text-white md:text-lg">
//                   {vehicle.name}
//                 </h3>

//                 {/* Price */}
//                 <div className="text-center text-xl font-bold text-[#00ff7f] md:text-2xl">
//                   {vehicle.price}
//                 </div>

//                 {/* Certified Badge Button */}
//                 <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#00ff7f] bg-[#00ff7f]/20 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#00ff7f]/30 md:text-base">
//                   <span className="inline-block h-2 w-2 rounded bg-[#00ff7f]"></span>
//                   Certified By AI
//                 </button>
//               </div>

//               {/* Hover glow effect */}
//               <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/0 to-blue-500/0 transition-all duration-300 group-hover:from-cyan-500/10 group-hover:to-blue-500/5"></div>
//             </div>
//           ))}
//         </div>

//         {/* CTA Button */}
//         <div className="flex justify-center">
//           <button className="inline-flex items-center gap-3 rounded-full bg-[#00ff7f] px-5 py-2 text-base font-semibold text-black shadow-sm shadow-green-500/50 transition-all duration-300 hover:gap-4 hover:bg-[#00e370] hover:shadow-xl">
//             Visit Marketplace
//             <span className="text-lg">→</span>
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }

'use client'
import Image from "next/image";
import { useState } from "react";
import crystalCarImage from "../../asests/crystalCar.png";
import car1  from "../../asests/card/car1.png"
import car2  from "../../asests/card/car2.png"
import car3  from "../../asests/card/car3.png"
import car4  from "../../asests/card/car4.png"

export default function ExploreCertifiedVehicles() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const vehicles = [
    {
      id: 1,
      name: "2021 Tesla Model S",
      price: "$48,000",
      image: car1,
      category: "All"
    },
    {
      id: 2,
      name: "2018 Lexus IS",
      price: "$18,900",
      image: car2,
      category: "Exterior"
    },
    {
      id: 3,
      name: "2016 BMW 320i",
      price: "$14,400",
      image: car3,
      category: "Safety"
    },
    {
      id: 4,
      name: "2020 Tesla Model 3",
      price: "$29,900",
      image: car4,
      category: "Premium"
    }
  ];

  const categories = ["All", "Exterior", "Safety", "Premium"];

  // Filter vehicles based on selected category
  const filteredVehicles = selectedCategory === "All" 
    ? vehicles 
    : vehicles.filter(vehicle => vehicle.category === selectedCategory);

  return (
    <section className="relative min-h-screen w-full overflow-hidden px-4 py-12 sm:py-20 md:px-8">
      {/* Background Image */}
      <Image
        src={crystalCarImage}
        alt="Crystal Car Background"
        fill
        className="absolute inset-0 object-cover object-center"
        priority
      />

      {/* Gradient Overlay - #05060700 to #0A0F24 with opacity */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f24] via-[#0a0f2440] to-[#0a0f24]"></div>

      {/* Additional gradient effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl"></div>
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-cyan-500/5 blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-8 sm:mb-16 text-center">
          {/* Label */}
          <div className="mb-3 inline-flex items-center space-x-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
            <p className="text-[11px] font-light tracking-widest text-cyan-300/80 uppercase md:text-[12px]">
              Certified Vehicle Marketplace
            </p>
          </div>

          {/* Main Heading */}
          <h2 className="mb-2 text-xl sm:text-2xl leading-tight text-white md:text-3xl lg:text-4xl">
            Explore Certified Vehicle
          </h2>

          {/* Description */}
          <p className="mx-auto mb-6 max-w-3xl text-xs sm:text-sm leading-relaxed text-white/70 md:text-base">
            Experience the confidence of buying AI-certified vehicles, where every car is verified
            for quality, safety, and performance.
          </p>

          {/* Category Filter Tabs */}
          {/* <div className="w-full flex justify-center">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 w-full max-w-md sm:max-w-none sm:w-180 rounded-full border border-green-800 bg-white/10 backdrop-blur-md md:gap-4">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-4 py-2 text-[10px] sm:text-sm transition-all duration-300 md:px-13 md:py-4 md:text-base ${
                    selectedCategory === category
                      ? "border-2 border-[#0b723f] bg-transparent text-white"
                      : "border-2 border-transparent text-white/70 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div> */}
          <div className="w-full flex justify-center">
            
          <div className="flex  bg-gradient-to-br from-green-500/10 to-green-500/5 bg-transparent justify-between gap-2 w-180 rounded-full border border-green-800 transparent backdrop-blur-sm md:gap-4">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-4 py-2.5 text-[12px]  transition-all duration-300 md:px-13 md:py-4 md:text-sm ${
                  selectedCategory === category
                    ? "border-2 border-[#0b723f] bg-transparent text-white"
                    : "border-2 border-transparent text-white/70 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          </div>
        </div>

        {/* Vehicles Grid - Horizontal scroll on mobile, grid on desktop */}
        <div className="mb-8 sm:mb-12">
          {/* Mobile: Horizontal Scroll */}
          <div className="lg:hidden">
            <div className="flex space-x-4 overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide">
              {filteredVehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="flex-shrink-0 w-64 rounded-2xl border border-green-800 bg-gradient-to-br from-white/5 to-white/[0.02] transition-all duration-300 hover:border-green-900 hover:shadow-lg hover:shadow-green-500/20"
                >
                  {/* Vehicle Image Container */}
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-900 to-black rounded-t-2xl">
                    <Image
                      src={vehicle.image}
                      alt={vehicle.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  </div>

                  {/* Vehicle Info */}
                  <div className="space-y-3 p-4 ">
                    {/* Vehicle Name */}
                    <h3 className="line-clamp-2 text-center text-sm font-semibold text-white">
                      {vehicle.name}
                    </h3>

                    {/* Price */}
                    <div className="text-center text-lg font-bold text-[#00ff7f]">
                      {vehicle.price}
                    </div>

                    {/* Certified Badge Button */}
                    <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#00ff7f] bg-[#00ff7f]/20 px-3 py-2 text-xs font-semibold text-white transition-all duration-300 hover:bg-[#00ff7f]/30">
                      <span className="inline-block h-2 w-2 rounded bg-[#00ff7f]"></span>
                      Certified By AI
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: Grid Layout */}
          <div className="hidden lg:grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {filteredVehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="group relative overflow-hidden rounded-2xl border border-green-800 bg-gradient-to-br from-white/5 to-white/[0.02] transition-all duration-300 hover:border-green-900 hover:shadow-lg hover:shadow-green-500/20"
              >
                {/* Vehicle Image Container */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-slate-900 to-black md:h-56">
                  <Image
                    src={vehicle.image}
                    alt={vehicle.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>

                {/* Vehicle Info */}
                <div className="space-y-3 p-3 md:p-5">
                  {/* Vehicle Name */}
                  <h3 className="line-clamp-2 text-center text-base font-semibold text-white md:text-lg">
                    {vehicle.name}
                  </h3>

                  {/* Price */}
                  <div className="text-center text-xl font-bold text-[#00ff7f] md:text-2xl">
                    {vehicle.price}
                  </div>

                  {/* Certified Badge Button */}
                  <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#00ff7f] bg-[#00ff7f]/20 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#00ff7f]/30 md:text-base">
                    <span className="inline-block h-2 w-2 rounded bg-[#00ff7f]"></span>
                    Certified By AI
                  </button>
                </div>

                {/* Hover glow effect */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/0 to-blue-500/0 transition-all duration-300 group-hover:from-cyan-500/10 group-hover:to-blue-500/5"></div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <button className="inline-flex items-center gap-3 rounded-full bg-[#00ff7f] px-5 py-2 text-sm sm:text-base font-semibold text-black shadow-sm shadow-green-500/50 transition-all duration-300 hover:gap-4 hover:bg-[#00e370] hover:shadow-xl">
            Visit Marketplace
            <span className="text-lg">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}