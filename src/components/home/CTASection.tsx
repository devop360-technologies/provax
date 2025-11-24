
// export default function CTASection() {
//   return (
//     <section className="relative  w-full  overflow-hidden px-4 py-20 md:px-8 flex items-center justify-center">
//       {/* Background with multiple gradients */}
//       <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F24] via-[#0A0F24] to-[#0a0f24e6]"></div>
      
//       {/* Animated background elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl animate-pulse"></div>
//         <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-green-500/10 blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl animate-pulse delay-500"></div>
//       </div>

//       {/* <div className="relative z-10 text-center max-w-9xl mx-auto border border-green-500/20 px-60 py-10 rounded-3xl  "> */}
//       <div 
//   className="relative z-10 text-center max-w-9xl mx-auto border border-green-500/20 px-60 py-10 rounded-3xl"
//   style={{
//     background: 'radial-gradient(circle at top left, ##00FF8866, transparent 30%), radial-gradient(triangle at center, #3b82f615, transparent 50%), radial-gradient(triangle at bottom right, ##00FF8866, transparent 20%)'
//   }}
// >
//         {/* Main text content */}
//         <div className="space-y-6">
//           <h1 className="text-2xl md:text-3xl lg:text-4xl  text-white leading-tight">
//             Join PROVAX today — bring AI transparency  
//             <span className="block mt-4">to your vehicle journey.</span>
//           </h1>

//           <h2 className="text-sm  lg:text-sm text-white/70 leading-relaxed max-w-4xl mx-auto">
//             Schedule a Consultation and Experience the Power of PROVAX AI Automation.
//           </h2>

//           {/* CTA Button with enhanced effects */}
//           <div className="">
//             <button className="group relative inline-flex items-center gap-4 rounded-full bg-[#35c57d] px-5 py-2 text-sm text-black shadow-2xl shadow-green-500/50 transition-all duration-500 hover:gap-6 hover:bg-[#00e370] hover:shadow-3xl hover:scale-110 overflow-hidden">
//               {/* Button glow effect */}
//               <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
//               Get Started
//               <span className="text-xl transition-all duration-500 group-hover:translate-x-2 group-hover:scale-110">→</span>
//             </button>
//           </div>
//         </div>
       
//       </div>

//       {/* Floating particles */}
//       <div className="absolute top-1/4 left-1/6 w-2 h-2 rounded-full bg-cyan-400/30 animate-bounce"></div>
//       <div className="absolute top-3/4 right-1/5 w-1 h-1 rounded-full bg-green-400/40 animate-bounce delay-300"></div>
//       <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 rounded-full bg-blue-400/30 animate-bounce delay-700"></div>
//     </section>
//   );
// }
export default function CTASection() {
  return (
    <section className="relative w-full overflow-hidden px-4 py-16 md:py-20 md:px-8 flex items-center justify-center min-h-[400px] sm:min-h-[500px]">
      {/* Background with multiple gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F24] via-[#0A0F24] to-[#0a0f24e6]"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 h-40 w-40 sm:h-60 sm:w-60 md:h-80 md:w-80 rounded-full bg-cyan-500/10 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 h-40 w-40 sm:h-60 sm:w-60 md:h-80 md:w-80 rounded-full bg-green-500/10 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-48 w-48 sm:h-64 sm:w-64 md:h-96 md:w-96 rounded-full bg-blue-500/5 blur-3xl animate-pulse delay-500"></div>
      </div>

      <div 
        className="relative z-10 text-center w-full max-w-7xl lg:max-w-9xl mx-auto border border-green-500/20 px-6 py-8 sm:px-8 sm:py-10 md:px-16 lg:px-60 lg:py-10 rounded-3xl"
        style={{
          background: 'radial-gradient(circle at top left, #00FF8866, transparent 30%), radial-gradient(circle at center, #3b82f615, transparent 50%), radial-gradient(circle at bottom right, #00FF8866, transparent 20%)'
        }}
      >
        {/* Main text content */}
        <div className="space-y-4 sm:space-y-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white leading-tight">
            Join PROVAX today — bring AI transparency  
            <span className="block mt-2 sm:mt-4">to your vehicle journey.</span>
          </h1>

          <h2 className="text-xs sm:text-sm lg:text-base text-white/70 leading-relaxed max-w-2xl lg:max-w-4xl mx-auto">
            Schedule a Consultation and Experience the Power of PROVAX AI Automation.
          </h2>

          {/* CTA Button with enhanced effects */}
          <div className="pt-2 sm:pt-4">
            <button className="group relative inline-flex items-center justify-center gap-3 sm:gap-4 rounded-full bg-[#35c57d] px-3 py-2 sm:px-8 sm:py-2 text-sm sm:text-base text-black font-semibold shadow-2xl shadow-green-500/50 transition-all duration-500 hover:gap-5 hover:bg-[#00e370] hover:shadow-3xl hover:scale-105 overflow-hidden w-full sm:w-auto">
              {/* Button glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              Get Started
              <span className="text-lg sm:text-xl transition-all duration-500 group-hover:translate-x-1 group-hover:scale-110">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute top-1/4 left-1/6 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400/30 animate-bounce"></div>
      <div className="absolute top-3/4 right-1/5 w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-green-400/40 animate-bounce delay-300"></div>
      <div className="absolute bottom-1/3 left-1/3 w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-blue-400/30 animate-bounce delay-700"></div>
    </section>
  );
}