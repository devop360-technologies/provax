// "use client";
// import React from "react";
// import Image from "next/image";
// import carfooter from "../../../asests/footerCar.png";
// import { Logs } from "lucide-react";
// import Logo from "@/components/logo";

// export default function Footer() {
//   return (
//     <section
//       className="relative min-h-[calc(100vh-200px)] w-full overflow-hidden"
//       style={{
//         backgroundImage: `url(${carfooter.src})`,
//         backgroundSize: "contain",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat"
//       }}
//     >
//       {/* <footer className="relative w-full bg-gradient-to-b from-[#0a0f24] to-[#050810] overflow-hidden"> */}
//       {/* <footer className="relative w-full bg-gradient-to-br from-[#0A0F24]/80 via-[#0A0F24]/70 to-[#0A0F24]/80 overflow-hidden"> */}
//       <footer className="relative w-full overflow-hidden bg-gradient-to-br from-[#0A0F24]/40 via-[#0A0F24]/30 to-[#0A0F24]/40">
//         {/* Background gradient effects */}
//         <div className="pointer-events-none absolute inset-0 overflow-hidden">
//           <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl"></div>
//           <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-cyan-500/5 blur-3xl"></div>
//         </div>

//         <div className="relative z-10">
//           {/* Main Footer Content */}
//           <div className="container mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
//             <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
//               {/* Left Column - Brand & Social */}

//               <div className=" flex space-y-8 lg:col-span-1">
//                 {/* Vertical "EXPERT AUTO" text */}
//                 <div className=" flex-col items-center lg:flex">
//                   <p className="rotate-270 text-[10px] font-light tracking-[0.3em] text-white/50 uppercase whitespace-nowrap">
//                     EXPERT AUTO
//                   </p>
//                 </div>
//                 {/* Logo */}
//                 <div className="space-y-10">
//                   <div className="flex items-center space-x-2">
//                     <Logo />
//                   </div>

//                   {/* Social Links */}
//                   <div>
//                     <div className="space-y-4">
//                       <a
//                         href="#"
//                         className="flex items-center space-x-3 text-white/70 transition-colors hover:text-cyan-400"
//                       >
//                         <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
//                           <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
//                         </svg>
//                         <span className="text-[12px] tracking-widest uppercase">Facebook</span>
//                       </a>
//                       <div className="flex justify-between">
//                         <a
//                           href="#"
//                           className="flex items-center space-x-3 text-white/70 transition-colors hover:text-cyan-400"
//                         >
//                           <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
//                             <path d="M23.953 4.57a10 10 0 002.856-3.515 10 10 0 01-2.837.856c1.021-.609 1.802-1.574 2.165-2.724-.954.564-2.005.974-3.127 1.195-.9-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06c0 2.386 1.697 4.374 3.946 4.827a4.996 4.996 0 01-2.212.085c.627 1.956 2.444 3.379 4.6 3.419-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548z" />
//                           </svg>
//                           <span className="text-[12px] tracking-widest uppercase">Twitter</span>
//                         </a>
//                       </div>
//                       <div className="">
//                         <a
//                           href="#"
//                           className="flex items-center space-x-3 text-white/70 transition-colors hover:text-cyan-400"
//                         >
//                           <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
//                             <rect
//                               x="2"
//                               y="2"
//                               width="20"
//                               height="20"
//                               rx="5"
//                               ry="5"
//                               fill="none"
//                               stroke="currentColor"
//                               strokeWidth="2"
//                             />
//                             <circle
//                               cx="12"
//                               cy="12"
//                               r="3.5"
//                               fill="none"
//                               stroke="currentColor"
//                               strokeWidth="2"
//                             />
//                             <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
//                           </svg>
//                           <span className="text-sm tracking-widest uppercase">Instagram</span>
//                           <h3 className="pl-20 text-xl text-white">Navigate</h3>
//                         </a>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Column 2 - Find Us */}
//               <div className="space-y-6">
//                 <h3 className="text-xl font-bold text-white">Find Us</h3>
//                 <div className="space-y-4">
//                   <div>
//                     <p className="mb-2 text-xs tracking-widest text-cyan-300/80 uppercase">
//                       Visit Us
//                     </p>
//                     <p className="text-sm leading-relaxed text-white/70">
//                       457 Nova Drive, Arcadia Heights, NY 11204
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Column 3 - Opening Hours */}
//               <div className="space-y-6">
//                 <h3 className="text-xs font-light tracking-widest text-white/80 uppercase">
//                   Opening Hours
//                 </h3>
//                 <div className="space-y-2">
//                   <p className="text-sm text-white/70">Mon to Fri: 07 AM - 5 PM</p>
//                   <p className="text-sm text-white/70">Sat: 07 AM - 01 PM</p>
//                 </div>
//               </div>

//               {/* Column 5 - Ratings & "For Every Need" */}
//               <div className="flex items-center space-y-60 lg:items-end">
//                 {/* Ratings */}
//                 <div className="space-y-3">
//                   <div className="flex items-baseline space-x-2">
//                     <span className="text-3xl font-bold text-white">4.8</span>
//                     <span className="text-white/60">/5</span>
//                   </div>
//                   <div className="flex space-x-1">
//                     {[...Array(5)].map((_, i) => (
//                       <span key={i} className="text-xl text-green-400">
//                         ★
//                       </span>
//                     ))}
//                   </div>
//                   <p className="text-sm text-white/60">+1,000 Reviews</p>
//                   <a
//                     href="#"
//                     className="inline-flex items-center space-x-2 text-sm text-cyan-400 transition-colors hover:text-cyan-300"
//                   >
//                     <span>VIEW ON GOOGLE</span>
//                     <span>↗</span>
//                   </a>
//                 </div>

//                 {/* Vertical "FOR EVERY NEED" text */}
//                 <div className="-translate-y-1/2 rotate-90 lg:flex">
//                   <p className="text-xs font-light tracking-[0.2em] text-white/40 uppercase">
//                     FOR EVERY NEED
//                   </p>
//                 </div>
//               </div>
//             </div>
//             {/* Column 4 - Navigate */}
//             <div className="py-3 pl-80">
//               {/* <*/}
//               <div className="flex space-x-8">
//                 <a
//                   href="#"
//                   className="block text-[12px] font-semibold tracking-wider text-white/70 uppercase transition-colors hover:text-cyan-400"
//                 >
//                   Home
//                 </a>
//                 <a
//                   href="#"
//                   className="block text-[12px] font-semibold tracking-wider text-white/70 uppercase transition-colors hover:text-cyan-400"
//                 >
//                   How Its Works
//                 </a>
//                 <a
//                   href="#"
//                   className="block text-[12px] font-semibold tracking-wider text-white/70 uppercase transition-colors hover:text-cyan-400"
//                 >
//                   Marketplace
//                 </a>
//                 <a
//                   href="#"
//                   className="block text-[12px] font-semibold tracking-wider text-white/70 uppercase transition-colors hover:text-cyan-400"
//                 >
//                   Service
//                 </a>
//                 <a
//                   href="#"
//                   className="block text-[12px] font-semibold tracking-wider text-white/70 uppercase transition-colors hover:text-cyan-400"
//                 >
//                   Subscription
//                 </a>
//                 <a
//                   href="#"
//                   className="block text-[12px] font-semibold tracking-wider text-white/70 uppercase transition-colors hover:text-cyan-400"
//                 >
//                   Contact
//                 </a>
//               </div>
//             </div>
//           </div>

//           {/* Divider */}
//           <div className="border-t border-white/10"></div>

//           {/* Bottom Footer */}
//           <div className="container mx-auto max-w-7xl px-4 py-8 md:px-8">
//             <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
//               <p className="text-xs text-white/50">© PROVAX 2025 · All rights reserved</p>
//               <div className="flex items-center space-x-6">
//                 <a href="#" className="text-xs text-white/50 transition-colors hover:text-white/80">
//                   Privacy Policy
//                 </a>
//                 <a href="#" className="text-xs text-white/50 transition-colors hover:text-white/80">
//                   Terms of Use
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </section>
//   );
// }
"use client";
import React from "react";
import Image from "next/image";
import carfooter from "../../../asests/footerCar.png";
import { Logs } from "lucide-react";
import Logo from "@/components/logo";

export default function Footer() {
  return (
    <section
      className="relative min-h-[50vh] lg:min-h-[calc(100vh-200px)] w-full overflow-hidden bg-secondary"
      style={{
        backgroundImage: `url(${carfooter.src})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <footer className="relative w-full overflow-hidden bg-gradient-to-br from-[#0A0F24]/40 via-[#0A0F24]/30 to-[#0A0F24]/40">
        {/* Background gradient effects */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl"></div>
          <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-cyan-500/5 blur-3xl"></div>
        </div>

        <div className="relative z-10">
          {/* Main Footer Content */}
          <div className="container mx-auto max-w-7xl px-4 py-8 lg:py-16 md:px-8 lg:py-20">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-12">
              {/* Left Column - Brand & Social */}
              <div className="flex flex-col items-center lg:items-start space-y-6 lg:space-y-8 lg:col-span-1">
                {/* Vertical "EXPERT AUTO" text - Hidden on mobile */}
                <div className="hidden lg:flex flex-col items-center">
                  <p className="rotate-270 text-[10px] font-light tracking-[0.3em] text-white/50 uppercase whitespace-nowrap">
                    EXPERT AUTO
                  </p>
                </div>
                
                {/* Logo */}
                <div className="space-y-6 lg:space-y-10">
                  <div className="flex items-center justify-center lg:justify-start space-x-2">
                    <Logo />
                  </div>

                  {/* Social Links */}
                  <div>
                    <div className="space-y-3 lg:space-y-4">
                      <a
                        href="#"
                        className="flex items-center justify-center lg:justify-start space-x-3 text-white/70 transition-colors hover:text-cyan-400"
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        <span className="text-[12px] tracking-widest uppercase">Facebook</span>
                      </a>
                      <a
                        href="#"
                        className="flex items-center justify-center lg:justify-start space-x-3 text-white/70 transition-colors hover:text-cyan-400"
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 002.856-3.515 10 10 0 01-2.837.856c1.021-.609 1.802-1.574 2.165-2.724-.954.564-2.005.974-3.127 1.195-.9-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06c0 2.386 1.697 4.374 3.946 4.827a4.996 4.996 0 01-2.212.085c.627 1.956 2.444 3.379 4.6 3.419-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548z" />
                        </svg>
                        <span className="text-[12px] tracking-widest uppercase">Twitter</span>
                      </a>
                      <a
                        href="#"
                        className="flex items-center justify-center lg:justify-start space-x-3 text-white/70 transition-colors hover:text-cyan-400"
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <rect
                            x="2"
                            y="2"
                            width="20"
                            height="20"
                            rx="5"
                            ry="5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <circle
                            cx="12"
                            cy="12"
                            r="3.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
                        </svg>
                        <span className="text-sm tracking-widest uppercase">Instagram</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 2 - Find Us */}
              <div className="space-y-4 lg:space-y-6 text-center lg:text-left">
                <h3 className="text-lg lg:text-xl font-bold text-white">Find Us</h3>
                <div className="space-y-3 lg:space-y-4">
                  <div>
                    <p className="mb-1 lg:mb-2 text-xs tracking-widest text-cyan-300/80 uppercase">
                      Visit Us
                    </p>
                    <p className="text-sm leading-relaxed text-white/70">
                      457 Nova Drive, Arcadia Heights, NY 11204
                    </p>
                  </div>
                </div>
              </div>

              {/* Column 3 - Opening Hours */}
              <div className="space-y-4 lg:space-y-6 text-center lg:text-left">
                <h3 className="text-xs font-light tracking-widest text-white/80 uppercase">
                  Opening Hours
                </h3>
                <div className="space-y-2">
                  <p className="text-sm text-white/70">Mon to Fri: 07 AM - 5 PM</p>
                  <p className="text-sm text-white/70">Sat: 07 AM - 01 PM</p>
                </div>
              </div>

              {/* Column 4 - Ratings & "For Every Need" */}
              <div className="flex flex-col items-center lg:items-end space-y-6 lg:space-y-60">
                {/* Ratings */}
                <div className="space-y-2 lg:space-y-3 text-center lg:text-left">
                  <div className="flex items-baseline justify-center lg:justify-start space-x-2">
                    <span className="text-2xl lg:text-3xl font-bold text-white">4.8</span>
                    <span className="text-white/60">/5</span>
                  </div>
                  <div className="flex justify-center lg:justify-start space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-lg lg:text-xl text-green-400">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-white/60">+1,000 Reviews</p>
                  <a
                    href="#"
                    className="inline-flex items-center justify-center lg:justify-start space-x-2 text-sm text-cyan-400 transition-colors hover:text-cyan-300"
                  >
                    <span>VIEW ON GOOGLE</span>
                    <span>↗</span>
                  </a>
                </div>

                {/* Vertical "FOR EVERY NEED" text - Hidden on mobile */}
                <div className="hidden lg:flex -translate-y-1/2 rotate-90">
                  <p className="text-xs font-light tracking-[0.2em] text-white/40 uppercase">
                    FOR EVERY NEED
                  </p>
                </div>
              </div>
            </div>

            {/* Column 5 - Navigate */}
            <div className="py-4 lg:py-3 lg:pl-80 mt-6 lg:mt-0">
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 lg:gap-8">
                <a
                  href="#"
                  className="block text-[12px] font-semibold tracking-wider text-white/70 uppercase transition-colors hover:text-cyan-400"
                >
                  Home
                </a>
                <a
                  href="#"
                  className="block text-[12px] font-semibold tracking-wider text-white/70 uppercase transition-colors hover:text-cyan-400"
                >
                  How Its Works
                </a>
                <a
                  href="#"
                  className="block text-[12px] font-semibold tracking-wider text-white/70 uppercase transition-colors hover:text-cyan-400"
                >
                  Marketplace
                </a>
                <a
                  href="#"
                  className="block text-[12px] font-semibold tracking-wider text-white/70 uppercase transition-colors hover:text-cyan-400"
                >
                  Service
                </a>
                <a
                  href="#"
                  className="block text-[12px] font-semibold tracking-wider text-white/70 uppercase transition-colors hover:text-cyan-400"
                >
                  Subscription
                </a>
                <a
                  href="#"
                  className="block text-[12px] font-semibold tracking-wider text-white/70 uppercase transition-colors hover:text-cyan-400"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10"></div>

          {/* Bottom Footer */}
          <div className="container mx-auto max-w-7xl px-4 py-6 lg:py-8 md:px-8">
            <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
              <p className="text-xs text-white/50 text-center lg:text-left">© PROVAX 2025 · All rights reserved</p>
              <div className="flex items-center space-x-6">
                <a href="#" className="text-xs text-white/50 transition-colors hover:text-white/80">
                  Privacy Policy
                </a>
                <a href="#" className="text-xs text-white/50 transition-colors hover:text-white/80">
                  Terms of Use
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}