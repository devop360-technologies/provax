// import Image from "next/image";
// import lightCarImage from "../../asests/carGif.gif";

// export default function AICertificationModules() {
//   const modules = [
//     {
//       title: "Structure",
//       description:
//         "Powered by advanced AI, it precisely detects structural and collision damage. Ensure your vehicle's integrity with real-time, intelligent analysis."
//     },
//     {
//       title: "Paint",
//       description:
//         "Utilizes AI to analyze paint quality, texture, and surface consistency. Reveal hidden imperfections with precision work with precise detection."
//     },
//     {
//       title: "Armored Glass",
//       description:
//         "Inspects glass surfaces for cracks, oxidation, and structural weakness. Ensure optimal clarity and safety through intelligent AI analysis."
//     },
//     {
//       title: "Interior",
//       description:
//         "Examines interior components including seats, dashboard, and lighting systems. Delivers a detailed assessment to ensure comfort, safety, and flawless condition."
//     }
//   ];

//   return (
//     <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#0a0e27] via-[#0f1535] to-[#0a0e27] px-4 py-16 md:px-8">
//       {/* Background Image */}
//       <Image
//         src={lightCarImage}
//         alt="AI Certification Background"
//         fill
//         className="absolute inset-0 object-cover object-center"
//         priority
//       />

//       {/* Dark overlay for better text contrast */}
//       <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent bg-blend-multiply"></div>

//       {/* Cyan overlay with low opacity */}
//       <div className="absolute inset-0 bg-gradient-to-br from-indeo-500/20 via-blue-500/20 to-blue-600/10 pointer-events-none"></div>

//       {/* Animated background elements */}
//       <div className="pointer-events-none absolute inset-0 overflow-hidden">
//         {/* Top left glow */}
//         <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-600/20 opacity-60 blur-3xl"></div>
//         {/* Top right glow */}
//         <div className="absolute -top-20 right-1/4 h-80 w-80 rounded-full bg-cyan-500/15 opacity-40 blur-3xl"></div>
//         {/* Center glow */}
//         <div className="absolute top-1/3 left-1/2 h-96 w-96 -translate-x-1/2 transform rounded-full bg-purple-600/5 opacity-30 blur-3xl"></div>
//       </div>

//       <div className="relative z-10 container mx-auto max-w-7xl">
//         {/* Top Section - Header & Car Visualization */}

//           {/* Right Side - Header Content */}
//           <div className="order-1 flex flex-col justify-start space-y-6 lg:order-2">
//             {/* Label */}
//             <div className="flex justify-between ">

//               <div>
//                 <div className="inline-flex items-center space-x-2">
//                   <span className="inline-block h-2 w-2 rounded-full bg-cyan-400"></span>
//                   <p className="text-xs font-light tracking-widest text-cyan-300/80 uppercase md:text-sm">
//                     AI Inspection.
//                   </p>
//                 </div>

//                 {/* Main Heading */}
//                 <h2 className="text-3xl py-2 leading-tight  text-white md:text-3xl lg:text-4xl">
//                   AI Certification
//                   <br />
//                   Modules Preview
//                 </h2>

//                 {/* Description */}
//                 <p className="max-w-md text-sm leading-relaxed text-white/60 md:text-base">
//                   Showcase the power of AI Inspection.
//                 </p>
//               </div>

//               {/* View Demo Button */}
//               <div className="pt-8 ">
//                 <button className=" items-center flex flex-none rounded-full bg-[#00ff7f] px-5 py-2 font-semibold text-black transition-all duration-300 hover:gap-4 hover:bg-[#00e370]">
//                   View Demo
//                   <span className="text-lg ml-3.5">→</span>
//                 </button>
//               </div>
//             </div>
//           </div>

//         {/* Bottom Section - Inspection Modules Grid */}
//         <div className="mt-[300px] grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-4">
//           {modules.map((module, index) => (
//             <div
//               key={index}
//               className="group relative overflow-hidden rounded-2xl  md:p-7"
//             >

//               {/* Content */}
//               <div className="relative z-10 space-y-2">
//                 {/* Title with accent */}
//                 <div className="flex items-start justify-between">
//                   <h3 className="text-lg leading-tight font-semibold text-white md:text-xl">
//                     {module.title}
//                   </h3>
//                 </div>

//                 {/* Description */}
//                 <p className="text-sm leading-relaxed text-white/60">{module.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
import Image from "next/image";
import lightCarImage from "../../asests/carGif.gif";

export default function AICertificationModules() {
  const modules = [
    {
      title: "Structure",
      description:
        "Powered by advanced AI, it precisely detects structural and collision damage. Ensure your vehicle's integrity with real-time, intelligent analysis."
    },
    {
      title: "Paint",
      description:
        "Utilizes AI to analyze paint quality, texture, and surface consistency. Reveal hidden imperfections with precision work with precise detection."
    },
    {
      title: "Armored Glass",
      description:
        "Inspects glass surfaces for cracks, oxidation, and structural weakness. Ensure optimal clarity and safety through intelligent AI analysis."
    },
    {
      title: "Interior",
      description:
        "Examines interior components including seats, dashboard, and lighting systems. Delivers a detailed assessment to ensure comfort, safety, and flawless condition."
    }
  ];

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#686d8e] via-[#0d1231] to-[#0a0e27] px-4 py-8 sm:py-16 md:px-8">
      {/* Background Image */}
      <Image
        src={lightCarImage}
        alt="AI Certification Background"
        fill
        className="absolute inset-0 object-cover object-center"
        priority
      />

      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent bg-blend-multiply"></div>

      {/* Cyan overlay with low opacity */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/12 via-blue-500/12 to-blue-600/13 pointer-events-none"></div>

      {/* Animated background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Top left glow */}
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-600/20 opacity-60 blur-3xl"></div>
        {/* Top right glow */}
        <div className="absolute -top-20 right-1/4 h-80 w-80 rounded-full bg-cyan-500/15 opacity-40 blur-3xl"></div>
        {/* Center glow */}
        <div className="absolute top-1/3 left-1/2 h-96 w-96 -translate-x-1/2 transform rounded-full bg-purple-600/5 opacity-30 blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl">
        {/* Top Section - Header & Car Visualization */}
        <div className="flex flex-col justify-center">
          {/* Header Content */}
          <div className="flex flex-col md:flex-row justify-between text-center lg:items-start lg:text-left">
            {/* Label */}
            <div className="w-full">
              <div className="inline-flex items-center space-x-2 justify-center lg:justify-start">
                <span className="inline-block h-2 w-2 rounded-full bg-cyan-400"></span>
                <p className="text-xs font-light tracking-widest text-cyan-300/80 uppercase md:text-sm">
                  AI Inspection.
                </p>
              </div>

              {/* Main Heading */}
              <h2 className="text-2xl sm:text-3xl py-2 leading-tight text-white md:text-3xl lg:text-4xl">
                AI Certification
                <br />
                Modules Preview
              </h2>

              {/* Description */}
              <p className="max-w-md text-sm leading-relaxed text-white/60 md:text-base mx-auto lg:mx-0">
                Showcase the power of AI Inspection.
              </p>
            </div>

            {/* View Demo Button */}
            <div className="pt-6 lg:pt-8 flex justify-center lg:justify-end w-full">
              <button className="items-center flex rounded-full bg-[#00ff7f] px-5 py-2 text-sm md:text-base font-semibold text-black transition-all duration-300 hover:gap-4 hover:bg-[#00e370]">
                View Demo
                <span className="text-lg ml-3.5">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section - Inspection Modules Grid */}
        <div className="mt-8 sm:mt-1 lg:mt-[300px] grid grid-cols-1 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
          {modules.map((module, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl p-4 sm:p-6 md:p-7"
            >
              {/* Content */}
              <div className="relative z-10 space-y-3 text-center lg:text-left">
                {/* Title with accent */}
                <div className="flex items-center justify-center lg:justify-start">
                  <h3 className="text-lg font-semibold text-white md:text-xl">
                    {module.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm leading-relaxed text-white/60">
                  {module.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}