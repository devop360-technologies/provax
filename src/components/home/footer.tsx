'use client'
import React from "react";
import carfooter from "../../asests/footerCar.png"

export default function Footer() {
  return (
        <section
      className="relative min-h-screen w-full overflow-hidden px-4 py-20 md:px-8"
      style={{
        backgroundImage: `url(${carfooter.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
    {/* <footer className="relative w-full bg-gradient-to-b from-[#0a0f24] to-[#050810] overflow-hidden"> */}
    <footer className="relative w-full inset-100 bg-gradient-to-br from-[#0A0F24]/80 via-[#0A0F24]/70 to-[#0A0F24]/80 overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto max-w-7xl px-4 md:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 md:gap-8">
            {/* Left Column - Brand & Social */}
            <div className="lg:col-span-1 space-y-8">
              {/* Vertical "EXPERT AUTO" text */}
              <div className="hidden lg:flex flex-col items-center space-y-2">
                <p className="text-xs tracking-[0.3em] text-white/50 uppercase font-light vertical-text">
                  Ewww
                </p>
                <p className="text-xs tracking-[0.3em] text-white/50 uppercase font-light">
                  X
                </p>
                <p className="text-xs tracking-[0.3em] text-white/50 uppercase font-light">
                  P
                </p>
                <p className="text-xs tracking-[0.3em] text-white/50 uppercase font-light">
                  E
                </p>
                <p className="text-xs tracking-[0.3em] text-white/50 uppercase font-light">
                  R
                </p>
                <p className="text-xs tracking-[0.3em] text-white/50 uppercase font-light">
                  T
                </p>
                <p className="text-xs tracking-[0.3em] text-white/50 uppercase font-light">
                  A
                </p>
                <p className="text-xs tracking-[0.3em] text-white/50 uppercase font-light">
                  U
                </p>
                <p className="text-xs tracking-[0.3em] text-white/50 uppercase font-light">
                  T
                </p>
                <p className="text-xs tracking-[0.3em] text-white/50 uppercase font-light">
                  O
                </p>
              </div>

              {/* Logo */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 border-2 border-cyan-400 rounded"></div>
                  <span className="text-white font-bold text-lg">PROVAX</span>
                </div>

                {/* Social Links */}
                <div className="space-y-4">
                  <span
                    className="flex items-center space-x-3 text-white/70 hover:text-cyan-400 transition-colors cursor-pointer"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span className="text-sm tracking-widest uppercase">Facebook</span>
                  </span>
                  <span
                    className="flex items-center space-x-3 text-white/70 hover:text-cyan-400 transition-colors cursor-pointer"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 002.856-3.515 10 10 0 01-2.837.856c1.021-.609 1.802-1.574 2.165-2.724-.954.564-2.005.974-3.127 1.195-.9-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06c0 2.386 1.697 4.374 3.946 4.827a4.996 4.996 0 01-2.212.085c.627 1.956 2.444 3.379 4.6 3.419-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548z"/>
                    </svg>
                    <span className="text-sm tracking-widest uppercase">Twitter</span>
                  </span>
                  <span
                    className="flex items-center space-x-3 text-white/70 hover:text-cyan-400 transition-colors cursor-pointer"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
                    </svg>
                    <span className="text-sm tracking-widest uppercase">Instagram</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Column 2 - Find Us */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white">Find Us</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs tracking-widest text-cyan-300/80 uppercase mb-2">Visit Us</p>
                  <p className="text-sm text-white/70 leading-relaxed">
                    457 Nova Drive, Arcadia Heights, NY 11204
                  </p>
                </div>
              </div>
            </div>

            {/* Column 3 - Opening Hours */}
            <div className="space-y-6">
              <h3 className="text-white/80 text-xs tracking-widest uppercase font-light">Opening Hours</h3>
              <div className="space-y-2">
                <p className="text-sm text-white/70">Mon to Fri: 07 AM - 5 PM</p>
                <p className="text-sm text-white/70">Sat: 07 AM - 01 PM</p>
              </div>
            </div>

            {/* Column 4 - Navigate */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white">Navigate</h3>
              <div className="space-y-3">
                <Link href="/" className="block text-sm text-white/70 hover:text-cyan-400 transition-colors uppercase tracking-wider">
                  Home
                </Link>
                <Link href="/how-its-works" className="block text-sm text-white/70 hover:text-cyan-400 transition-colors uppercase tracking-wider">
                  How Its Works
                </Link>
                <Link href="/marketplace" className="block text-sm text-white/70 hover:text-cyan-400 transition-colors uppercase tracking-wider">
                  Marketplace
                </Link>
                <Link href="/services" className="block text-sm text-white/70 hover:text-cyan-400 transition-colors uppercase tracking-wider">
                  Service
                </Link>
                <Link href="/subscriptions" className="block text-sm text-white/70 hover:text-cyan-400 transition-colors uppercase tracking-wider">
                  Subscription
                </Link>
                <Link href="/contact" className="block text-sm text-white/70 hover:text-cyan-400 transition-colors uppercase tracking-wider">
                  Contact
                </Link>
              </div>
            </div>

            {/* Column 5 - Ratings & "For Every Need" */}
            <div className="space-y-8">
              {/* Ratings */}
              <div className="space-y-3">
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-white">4.8</span>
                  <span className="text-white/60">/5</span>
                </div>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={`star-${i}`} className="text-cyan-400">★</span>
                  ))}
                </div>
                <p className="text-sm text-white/60">+1,000 Reviews</p>
                <span className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm cursor-pointer">
                  <span>VIEW ON GOOGLE</span>
                  <span>↗</span>
                </span>
              </div>

              {/* Vertical "FOR EVERY NEED" text */}
              <div className="hidden lg:flex flex-col items-end space-y-2 pt-8">
                <p className="text-xs tracking-[0.2em] text-white/40 uppercase font-light">
                  F
                </p>
                <p className="text-xs tracking-[0.2em] text-white/40 uppercase font-light">
                  O
                </p>
                <p className="text-xs tracking-[0.2em] text-white/40 uppercase font-light">
                  R
                </p>
                <div className="h-4"></div>
                <p className="text-xs tracking-[0.2em] text-white/40 uppercase font-light">
                  E
                </p>
                <p className="text-xs tracking-[0.2em] text-white/40 uppercase font-light">
                  V
                </p>
                <p className="text-xs tracking-[0.2em] text-white/40 uppercase font-light">
                  E
                </p>
                <p className="text-xs tracking-[0.2em] text-white/40 uppercase font-light">
                  R
                </p>
                <p className="text-xs tracking-[0.2em] text-white/40 uppercase font-light">
                  Y
                </p>
                <div className="h-4"></div>
                <p className="text-xs tracking-[0.2em] text-white/40 uppercase font-light">
                  N
                </p>
                <p className="text-xs tracking-[0.2em] text-white/40 uppercase font-light">
                  E
                </p>
                <p className="text-xs tracking-[0.2em] text-white/40 uppercase font-light">
                  E
                </p>
                <p className="text-xs tracking-[0.2em] text-white/40 uppercase font-light">
                  D
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10"></div>

        {/* Bottom Footer */}
        <div className="container mx-auto max-w-7xl px-4 md:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-xs text-white/50">
              © PROVAX 2025 · All rights reserved
            </p>
            <div className="flex items-center space-x-6">
              <Link href="/privacy-policy" className="text-xs text-white/50 hover:text-white/80 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-xs text-white/50 hover:text-white/80 transition-colors">
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
    </section>
  );
}
