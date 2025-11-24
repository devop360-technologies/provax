'use client'

import Image from 'next/image';

import icon1 from "../../asests/icons/icon-1.png";
import icon2 from "../../asests/icons/icon-2.png";
import icon3 from "../../asests/icons/icon-3.png";
import icon4 from "../../asests/icons/icon-4.png";

export default function ServicesHowItWorks() {
  const steps = [
    {
      id: 1,
      number: 'Step 01',
      icon: icon2,
      title: 'Upload Photos',
      description: 'Snap and upload clear photos of your vehicle to start the AI inspection. Our system analyzes every detail instantly to ensure accuracy and transparency.'
    },
    {
      id: 2,
      number: 'Step 02',
      icon: icon4,
      title: 'AI Inspection',
      description: 'AI quickly analyzes your data and delivers a clear, actionable report. Get insights instantly with intelligent, automated reporting.'
    },
    {
      id: 3,
      number: 'Step 03',
      icon: icon1,
      title: 'Receive VIS',
      description: 'Get your vehicle\'s integrity score instantly, providing a clear snapshot of its condition. Make informed decisions with ease.'
    },
    {
      id: 4,
      number: 'Step 04',
      icon: icon2,
      title: 'Sell or Service',
      description: 'Easily post jobs with the necessary certifications, ensuring you reach the right candidates. Streamline your hiring process and connect with qualified talent efficiently.'
    }
  ];

  return (
    <section className="relative py-20 bg-[#0a0f24] overflow-hidden min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/provax-images/Services/third.png"
          alt="Services background"
          fill
          className="object-cover object-center"
        />
      </div>

      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 via-[#0a0f24]/80 to-[#0a0f24]" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-40 flex items-start justify-between">
          <div>
            <div className="text-sm text-white/60 mb-4 flex items-center gap-2">
              <span className="text-[#00ff7f]">●</span>
              <span>Easy Steps</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl text-white mb-3">
              How It Works
            </h2>
            
            <p className="text-white/70 text-sm max-w-xl leading-relaxed">
              See how PROVAX simplifies vehicle certification with AI-driven automation. Every step — from photo upload to final report — is fast, transparent, and precise.
            </p>
          </div>

          {/* See Full Process Button */}
          <button className="bg-[#00ff7f] text-black text-sm font-semibold px-4 py-3 rounded-full hover:bg-[#00e370] transition-colors whitespace-nowrap">
            See Full Process →
          </button>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.id}
              className="bg-cyan/1 backdrop-blur-sm border-[1px] border-[#0b6884]  rounded-2xl p-4 hover:border-[#00ff7f]/50 transition-all duration-300 group"
            >
              {/* Step Number */}
              <div className="text-[12px] text-[#00C4FF] mb-4">
                {step.number}
              </div>

              {/* Icon */}
              <div className="mb-6">
                <div className="w-12 h-12 bg-gray-800 border border-[#00ff7f]/50 rounded-lg flex items-center justify-center group-hover:bg-[#00ff7f]/30 transition-colors">
                   <Image src={step.icon} alt="" width={24} height={24} />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg  text-white mb-4">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-white/70 text-[13px] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
