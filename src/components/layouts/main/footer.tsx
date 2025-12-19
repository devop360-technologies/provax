// "use client";
// import React from "react";
// import Image from "next/image";
// import carfooter from "../../../asests/footerCar.png";
// import { Logs } from "lucide-react";
// import Logo from "@/components/logo";

// export default function Footer() {
//   return (
//     <section
//       className="relative min-h-[50vh] lg:min-h-[calc(100vh-200px)] w-full overflow-hidden bg-secondary"
//       style={{
//         backgroundImage: `url(${carfooter.src})`,
//         backgroundSize: "contain",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat"
//       }}
//     >
//       <footer className="relative w-full overflow-hidden bg-gradient-to-br from-[#0A0F24]/40 via-[#0A0F24]/30 to-[#0A0F24]/40">
//         {/* Background gradient effects */}
//         <div className="pointer-events-none absolute inset-0 overflow-hidden">
//           <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl"></div>
//           <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-cyan-500/5 blur-3xl"></div>
//         </div>

//         <div className="relative z-10">
//           {/* Main Footer Content */}
//           <div className="container mx-auto max-w-7xl px-4 py-8 lg:py-16 md:px-8 lg:py-20">
//             <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-12">
//               {/* Left Column - Brand & Social */}
//               <div className="flex flex-col items-center lg:items-start space-y-6 lg:space-y-8 lg:col-span-1">
//                 {/* Vertical "EXPERT AUTO" text - Hidden on mobile */}
//                 <div className="hidden lg:flex flex-col items-center">
//                   <p className="rotate-270 text-[10px] font-light tracking-[0.3em] text-white/50 uppercase whitespace-nowrap">
//                     EXPERT AUTO
//                   </p>
//                 </div>

//                 {/* Logo */}
//                 <div className="space-y-6 lg:space-y-10">
//                   <div className="flex items-center justify-center lg:justify-start space-x-2">
//                     <Logo />
//                   </div>

//                   {/* Social Links */}
//                   <div>
//                     <div className="space-y-3 lg:space-y-4">
//                       <a
//                         href="#"
//                         className="flex items-center justify-center lg:justify-start space-x-3 text-white/70 transition-colors hover:text-cyan-400"
//                       >
//                         <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
//                           <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
//                         </svg>
//                         <span className="text-[12px] tracking-widest uppercase">Facebook</span>
//                       </a>
//                       <a
//                         href="#"
//                         className="flex items-center justify-center lg:justify-start space-x-3 text-white/70 transition-colors hover:text-cyan-400"
//                       >
//                         <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
//                           <path d="M23.953 4.57a10 10 0 002.856-3.515 10 10 0 01-2.837.856c1.021-.609 1.802-1.574 2.165-2.724-.954.564-2.005.974-3.127 1.195-.9-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06c0 2.386 1.697 4.374 3.946 4.827a4.996 4.996 0 01-2.212.085c.627 1.956 2.444 3.379 4.6 3.419-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548z" />
//                         </svg>
//                         <span className="text-[12px] tracking-widest uppercase">Twitter</span>
//                       </a>
//                       <a
//                         href="#"
//                         className="flex items-center justify-center lg:justify-start space-x-3 text-white/70 transition-colors hover:text-cyan-400"
//                       >
//                         <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
//                           <rect
//                             x="2"
//                             y="2"
//                             width="20"
//                             height="20"
//                             rx="5"
//                             ry="5"
//                             fill="none"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                           />
//                           <circle
//                             cx="12"
//                             cy="12"
//                             r="3.5"
//                             fill="none"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                           />
//                           <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
//                         </svg>
//                         <span className="text-sm tracking-widest uppercase">Instagram</span>
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Column 2 - Find Us */}
//               <div className="space-y-4 lg:space-y-6 text-center lg:text-left">
//                 <h3 className="text-lg lg:text-xl font-bold text-white">Find Us</h3>
//                 <div className="space-y-3 lg:space-y-4">
//                   <div>
//                     <p className="mb-1 lg:mb-2 text-xs tracking-widest text-cyan-300/80 uppercase">
//                       Visit Us
//                     </p>
//                     <p className="text-sm leading-relaxed text-white/70">
//                       457 Nova Drive, Arcadia Heights, NY 11204
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Column 3 - Opening Hours */}
//               <div className="space-y-4 lg:space-y-6 text-center lg:text-left">
//                 <h3 className="text-xs font-light tracking-widest text-white/80 uppercase">
//                   Opening Hours
//                 </h3>
//                 <div className="space-y-2">
//                   <p className="text-sm text-white/70">Mon to Fri: 07 AM - 5 PM</p>
//                   <p className="text-sm text-white/70">Sat: 07 AM - 01 PM</p>
//                 </div>
//               </div>

//               {/* Column 4 - Ratings & "For Every Need" */}
//               <div className="flex flex-col items-center lg:items-end space-y-6 lg:space-y-60">
//                 {/* Ratings */}
//                 <div className="space-y-2 lg:space-y-3 text-center lg:text-left">
//                   <div className="flex items-baseline justify-center lg:justify-start space-x-2">
//                     <span className="text-2xl lg:text-3xl font-bold text-white">4.8</span>
//                     <span className="text-white/60">/5</span>
//                   </div>
//                   <div className="flex justify-center lg:justify-start space-x-1">
//                     {[...Array(5)].map((_, i) => (
//                       <span key={i} className="text-lg lg:text-xl text-green-400">
//                         ★
//                       </span>
//                     ))}
//                   </div>
//                   <p className="text-sm text-white/60">+1,000 Reviews</p>
//                   <a
//                     href="#"
//                     className="inline-flex items-center justify-center lg:justify-start space-x-2 text-sm text-cyan-400 transition-colors hover:text-cyan-300"
//                   >
//                     <span>VIEW ON GOOGLE</span>
//                     <span>↗</span>
//                   </a>
//                 </div>

//                 {/* Vertical "FOR EVERY NEED" text - Hidden on mobile */}
//                 <div className="hidden lg:flex -translate-y-1/2 rotate-90">
//                   <p className="text-xs font-light tracking-[0.2em] text-white/40 uppercase">
//                     FOR EVERY NEED
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Column 5 - Navigate */}
//             <div className="py-4 lg:py-3 lg:pl-80 mt-6 lg:mt-0">
//               <div className="flex flex-wrap justify-center lg:justify-start gap-4 lg:gap-8">
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
//           <div className="container mx-auto max-w-7xl px-4 py-6 lg:py-8 md:px-8">
//             <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
//               <p className="text-xs text-white/50 text-center lg:text-left">© PROVAX 2025 · All rights reserved</p>
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
import Link from "next/link";
import carfooter from "../../../asests/footerCar.png";
import Logo from "@/components/logo";

export default function Footer() {
  return (
    <footer
      className="relative  overflow-hidden min-h-[50vh] lg:min-h-[calc(100vh-200px)]  bg-[#0A102B]"
      style={{
        backgroundImage: `url(${carfooter.src})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-[#0a1628]/30"></div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="flex">
          {/* Left Vertical Text - EXPERT AUTO */}
          <div className="hidden w-12 items-center justify-center border-r border-white/10 lg:flex">
            <div className="-rotate-180 transform" style={{ writingMode: "vertical-rl" }}>
              <span className="text-[10px] font-light tracking-[0.35em] text-white/40 uppercase">
                Expert Auto
              </span>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            <div className="container mx-auto px-6 py-12 lg:px-12 lg:py-16">
              {/* Top Section - 4 Columns */}
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
                {/* Column 1 - Logo & Social */}
                <div className="space-y-8">
                  {/* Logo */}
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Link href="/" className="flex items-center gap-2">
                        <Image
                          src="/provax/logo.svg"
                          alt="Provax Logo"
                          // fill
                          width={100}
                          height={64}
                        />
                      </Link>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="space-y-4 pt-8">
                    <a
                      href="#"
                      className="group flex items-center space-x-4 text-white/60 transition-colors hover:text-emerald-400"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      <span className="text-[11px] tracking-[0.3em] uppercase">Facebook</span>
                    </a>
                    <a
                      href="#"
                      className="group flex items-center space-x-4 text-white/60 transition-colors hover:text-emerald-400"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                      <span className="text-[11px] tracking-[0.3em] uppercase">Twitter</span>
                    </a>
                    <a
                      href="#"
                      className="group flex items-center space-x-4 text-white/60 transition-colors hover:text-emerald-400"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      </svg>
                      <span className="text-[11px] tracking-[0.3em] uppercase">Instagram</span>
                    </a>
                  </div>
                </div>

                {/* Column 2 - Find Us */}
                <div className="space-y-6">
                  <h3 className="text-xl font-normal text-white">Find Us</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="mb-2 text-[10px] tracking-[0.25em] text-white/40 uppercase">
                        Visit Us
                      </p>
                      <p className="text-sm leading-relaxed text-white/60">
                        457 Nova Drive, Arcadia Heights, NY 11204
                      </p>
                    </div>
                  </div>
                </div>

                {/* Column 3 - Opening Hours */}
                <div className="space-y-6">
                  <h3 className="text-[10px] tracking-[0.25em] text-white/40 uppercase">
                    Opening Hours
                  </h3>
                  <div className="space-y-2">
                    <p className="text-sm text-white/60">Mon to Fri: 07 AM - 5 PM</p>
                    <p className="text-sm text-white/60">Sat: 07 AM - 01 PM</p>
                  </div>
                </div>

                {/* Column 4 - Rating */}
                <div className="space-y-3">
                  <div className="flex items-center gap-1">
                    <span className="text-2xl font-semibold text-white">4.8</span>
                    <span className="text-lg text-white/40">/5</span>
                    <div className="ml-2 flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="h-4 w-4 text-emerald-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-white/40">+1,000 Reviews</p>
                  <a
                    href="#"
                    className="group mt-2 inline-flex items-center gap-2 text-xs tracking-wider text-white/60 uppercase transition-colors hover:text-white"
                  >
                    <span className="font-medium">View on Google</span>
                    <svg
                      className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 17L17 7M17 7H7M17 7v10"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Navigate Section */}
              <div className="mt-12 lg:mt-16">
                <h3 className="mb-6 text-lg font-normal text-white">Navigate</h3>
                <div className="flex flex-wrap gap-6 lg:gap-10">
                  <Link
                    href="/"
                    className="text-[11px] font-medium tracking-[0.2em] text-white/60 uppercase transition-colors hover:text-emerald-400"
                  >
                    Home
                  </Link>
                  <Link
                    href="/how-its-works"
                    className="text-[11px] font-medium tracking-[0.2em] text-white/60 uppercase transition-colors hover:text-emerald-400"
                  >
                    How Its Works
                  </Link>
                  <Link
                    href="/marketplace"
                    className="text-[11px] font-medium tracking-[0.2em] text-white/60 uppercase transition-colors hover:text-emerald-400"
                  >
                    Marketplace
                  </Link>
                  <Link
                    href="/services"
                    className="text-[11px] font-medium tracking-[0.2em] text-white/60 uppercase transition-colors hover:text-emerald-400"
                  >
                    Service
                  </Link>
                  <Link
                    href="/subscriptions"
                    className="text-[11px] font-medium tracking-[0.2em] text-white/60 uppercase transition-colors hover:text-emerald-400"
                  >
                    Subscription
                  </Link>
                  <Link
                    href="/contact"
                    className="text-[11px] font-medium tracking-[0.2em] text-white/60 uppercase transition-colors hover:text-emerald-400"
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom Divider */}
            <div className="border-t border-white/10"></div>

            {/* Bottom Footer */}
            <div className="container mx-auto px-6 py-6 lg:px-12">
              <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <p className="text-xs text-white/40">© PROVAX 2025 · All rights reserved</p>
                <div className="flex items-center gap-6">
                  <Link
                    href="/privacy-policy"
                    className="text-xs text-white/40 underline underline-offset-2 transition-colors hover:text-white/60"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="/terms"
                    className="text-xs text-white/40 underline underline-offset-2 transition-colors hover:text-white/60"
                  >
                    Terms of Use
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Vertical Text - FOR EVERY NEED */}
          <div className="hidden w-12 items-center justify-center border-l border-white/10 lg:flex">
            <div className="rotate-180 transform" style={{ writingMode: "vertical-rl" }}>
              <span className="text-[10px] font-light tracking-[0.35em] text-white/40 uppercase">
                For Every Need
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
