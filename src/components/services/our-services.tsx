'use client'

import Image from 'next/image';

const services = [
  {
    id: 1,
    badge: 'Popular',
    badgeColor: 'bg-blue-600',
    title: 'Mechanical Repair',
    price: 'From $50',
    estimateTime: 'Estimate Time: 1 - 2 Days',
    description: 'Engine, transmission, brakes and suspension - verified repairs with warranty.',
    buttonText: 'View Provider',
    requestText: 'Request Services',
    rating: 54
  },
  {
    id: 2,
    badge: 'Certified',
    badgeColor: 'bg-teal-600',
    title: 'Paint & Bodywork',
    price: 'From $150',
    estimateTime: 'Estimate Time: 2 - 3 Days',
    description: 'Repaint, dent removal and color correction - precise paint analysis included.',
    buttonText: 'View Provider',
    requestText: 'Request Services',
    rating: 54
  },
  {
    id: 3,
    badge: 'Advanced',
    badgeColor: 'bg-emerald-600',
    title: 'Glass & Windshield',
    price: 'From $80',
    estimateTime: 'Estimate Time: 1 Day',
    description: 'Armored glass inspection and replacement with optical integrity checks.',
    buttonText: 'View Provider',
    requestText: 'Request Services',
    rating: 54
  },
  {
    id: 4,
    badge: 'Basic',
    badgeColor: 'bg-cyan-600',
    title: 'Detailing & Interior',
    price: 'From $40',
    estimateTime: 'Estimate Time: 1 - 3 Days',
    description: 'Deep cleaning, upholstery repair and functional inspections.',
    buttonText: 'View Provider',
    requestText: 'Request Services',
    rating: 54
  },
  {
    id: 5,
    badge: 'AI-Powered',
    badgeColor: 'bg-purple-600',
    title: 'AI Inspection & Certification',
    price: 'From $25',
    estimateTime: 'Estimate Time: 1 - 3 Days',
    description: 'Full AI inspection modules producing a Vehicle Integrity Score (VIS) and QR verified report.',
    buttonText: 'View Provider',
    requestText: 'Request Services',
    rating: 54
  }
];

export default function OurServices() {
  return (
    <section className="relative py-20 bg-[#0a1544] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/provax-images/Services/second.png"
          alt="Background"
          fill
          className="object-cover"
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f24]/95 via-[#0a0f24]/90 to-[#0a0f24]/85" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <div className="text-sm text-white/60 mb-4 flex items-center gap-2">
            <span className="text-[#00ff7f]">●</span>
            <span>Service Bidding</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl text-white mb-6">
            Our Services
          </h2>
          
          <p className="text-white/70  max-w-2xl">
            Certified, transparent and AI-assisted services — choose what your vehicle needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-10 hover:border-white/20 transition-all duration-300 group"
            >
              {/* Badge and Price */}
              <div className="flex items-center justify-between mb-6">
                <span className={`bg-gray-700 border border-green-900 text-[#87FFC7] text-xs  px-3 py-1`}>
                  {service.badge}
                </span>
                <div className="text-right">
                  <div className="text-[#87FFC7] text-lg">{service.price}</div>
                  <div className="text-[#87FFC7] text-xs">{service.estimateTime}</div>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-4xl font-bold text-white mb-4">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-white/70 text-sm mb-8 leading-relaxed">
                {service.description}
              </p>

           

              {/* Buttons */}
              <div className="flex gap-2">
                   {/* Rating */}
              <div className=" gap-2   text-[11px]">
                {/* <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg> */}
                <p className=' text-white/60'>Providers: </p>
                <span>{service.rating}</span>
              </div>

                <button className="flex-1 bg-[#00ff7f] text-black font-semibold py-2 text-[12px] rounded-full hover:bg-[#00e370] transition-colors">
                  {service.buttonText}
                </button>
                <button className="flex-1 border border-[#00ff7f] text-[#00ff7f] font-semibold py-2 text-[12px] rounded-full hover:bg-[#00ff7f]/10 transition-colors">
                  {service.requestText}
                </button>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
