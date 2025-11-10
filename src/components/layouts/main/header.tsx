'use client'
import { useState } from "react";
import Logo from "@/components/logo";

const headerMenu = [
  { id: 1, name: "Home", href: "#pricing" },
  { id: 2, name: "How its Works", href: "#features" },
  { id: 3, name: "Marketplace", href: "#faq" },
  { id: 4, name: "Services", href: "#wall-of-love" },
  { id: 5, name: "Subscriptions", href: "#wall-of-love" },
  { id: 6, name: "Contact", href: "#wall-of-love" }
];

export default function Navbar() {
  const [activeLink, setActiveLink] = useState("#pricing");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-[#0f0f0f]">
      <div className="container mx-auto px-10">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Left Side - Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center space-x-8">
            {headerMenu.slice(0, 6).map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setActiveLink(item.href)}
                className={`text-[12px] font-medium transition-colors duration-300 ${
                  activeLink === item.href
                    ? "text-[#00ff7f]"
                    : "text-white hover:text-[#00ff7f]"
                }`}
              >
                {item.name}
              </a>
            ))}

             <div className="flex-1 flex justify-center lg:flex-none px-15">
            <Logo />
          </div>
          </div>

          {/* Center - Logo */}
         

          {/* Right Side - Navigation Links + Auth Buttons (Desktop) */}
          <div className="hidden lg:flex items-center space-x-8">

            {/* Auth Links */}
            <div className="flex items-center space-x-3">
              <a
                href="#login"
                className="text-[12px] font-medium text-white hover:text-[#00ff7f] transition-colors duration-300"
              >
                Log in
              </a>
              <span className="text-white">|</span>
              <a
                href="#register"
                className="text-[12px] font-medium text-white hover:text-[#00ff7f] transition-colors duration-300"
              >
                Register
              </a>
              <button className="bg-[#00ff7f] text-gray-700 px-6 py-2 rounded-full text-[12px] font-semibold hover:bg-[#00e370] transition-colors duration-300 shadow-lg shadow-green-500/30">
                Get certified
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white/10 backdrop-blur-md border-t border-white/20 mt-2 rounded-lg">
            <div className="py-4 space-y-4">
              {/* Navigation Links */}
              {headerMenu.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => {
                    setActiveLink(item.href);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block px-4 py-2 text-base font-medium transition-colors duration-300 ${
                    activeLink === item.href
                      ? "text-[#00ff7f] bg-black/30"
                      : "text-white hover:text-[#00ff7f] hover:bg-black/20"
                  }`}
                >
                  {item.name}
                </a>
              ))}

              {/* Mobile Auth Links */}
              <div className="px-4 pt-4 border-t border-white/20 space-y-3">
                <a
                  href="#login"
                  className="block text-base font-medium text-white hover:text-[#00ff7f] transition-colors duration-300"
                >
                  Log in
                </a>
                <a
                  href="#register"
                  className="block text-base font-medium text-white hover:text-[#00ff7f] transition-colors duration-300"
                >
                  Register
                </a>
                <button className="w-full bg-[#00ff7f] text-black px-6 py-3 rounded-full text-base font-semibold hover:bg-[#00e370] transition-colors duration-300 shadow-lg shadow-green-500/30">
                  Get certified
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}