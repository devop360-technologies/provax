'use client'

import Image from 'next/image';

export default function ContactHero() {
  const contactMethods = [
    {
      id: 1,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Send us an email',
      description: 'For detailed inquiries or support, please email us. We\'ll respond shortly here.',
      contact: 'contact@provax.com',
      buttonText: 'Send Email'
    },
    {
      id: 2,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: 'Give us a call',
      description: 'Prefer to talk? Our customer service team is available by phone during business hours.',
      contact: '(123) 456 - 7890',
      buttonText: 'Call Now'
    },
    {
      id: 3,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: 'Live chat with us',
      description: 'For immediate assistance, connect with our support agents via the live chat option now.',
      contact: 'Chat Now',
      buttonText: 'Chat Now'
    }
  ];

  return (
    <section className="relative py-32 bg-[#0a0f24] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -top-60">
        <Image
          src="/provax-images/Contact/animation.gif"
          alt="Contact background"
          fill
          className="object-contain object-center"
        />
      </div>

      {/* Background gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#0a0f24]/60 to-[#0a0f24]" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0a0f24]/60 to-[#0a0f24]" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="text-sm text-white/60 mb-6 flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-white/60 rounded-full" />
            <span>Contact</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl text-white mb-2 leading-tight">
            Contact us today
          </h1>
          
          <p className="text-white/70 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            We're eager to hear from you. Whether you have questions, feedback, or need support, our team is ready to provide assistance now.
          </p>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {contactMethods.map((method) => (
            <div
              key={method.id}
              className="relative flex flex-col items-center text-center group"
            >
              {/* Icon container */}
              <div className=" relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00ff7f]/20 to-cyan-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative w-16 h-16  rounded-lg flex items-center justify-center text-[#00ff7f] hover:border-[#00ff7f]/60 transition-colors duration-300">
                  {method.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl  text-white mb-2">
                {method.title}
              </h3>
              
              <p className="text-white/60 font-light leading-relaxed min-h-[72px] max-w-70">
                {method.description}
              </p>

              {/* Contact info */}
              <p className="text-[#00ff7f] text-sm">
                {method.contact}
              </p>

              {/* Action button */}
              {/* <button className="bg-[#00ff7f] text-black font-semibold px-6 py-3 rounded-full hover:bg-[#00e370] transition-colors duration-300 flex items-center gap-2 group/btn">
                <span>{method.buttonText}</span>
                <span className="text-lg">→</span>
              </button> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
