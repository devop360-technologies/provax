'use client'

export default function ServicesHowItWorks() {
  const steps = [
    {
      id: 1,
      number: 'Step 01',
      icon: '📸',
      title: 'Upload Photos',
      description: 'Snap and upload clear photos of your vehicle to start the AI inspection. Our system analyzes every detail instantly to ensure accuracy and transparency.'
    },
    {
      id: 2,
      number: 'Step 02',
      icon: '🤖',
      title: 'AI Inspection',
      description: 'AI quickly analyzes your data and delivers a clear, actionable report. Get insights instantly with intelligent, automated reporting.'
    },
    {
      id: 3,
      number: 'Step 03',
      icon: '✓',
      title: 'Receive VIS',
      description: 'Get your vehicle\'s integrity score instantly, providing a clear snapshot of its condition. Make informed decisions with ease.'
    },
    {
      id: 4,
      number: 'Step 04',
      icon: '🎯',
      title: 'Sell or Service',
      description: 'Easily post jobs with the necessary certifications, ensuring you reach the right candidates. Streamline your hiring process and connect with qualified talent efficiently.'
    }
  ];

  return (
    <section className="relative py-20 bg-[#0a0f24] overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 via-[#0a0f24] to-[#0a0f24]" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 flex items-start justify-between">
          <div>
            <div className="text-sm text-white/60 mb-4 flex items-center gap-2">
              <span className="text-[#00ff7f]">●</span>
              <span>Easy Steps</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              How It Works
            </h2>
            
            <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
              See how PROVAX simplifies vehicle certification with AI-driven automation. Every step — from photo upload to final report — is fast, transparent, and precise.
            </p>
          </div>

          {/* See Full Process Button */}
          <button className="bg-[#00ff7f] text-black font-semibold px-6 py-3 rounded-full hover:bg-[#00e370] transition-colors whitespace-nowrap">
            See Full Process →
          </button>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.id}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-[#00ff7f]/50 transition-all duration-300 group"
            >
              {/* Step Number */}
              <div className="text-sm text-[#00ff7f] font-semibold mb-4">
                {step.number}
              </div>

              {/* Icon */}
              <div className="mb-6">
                <div className="w-16 h-16 bg-[#00ff7f]/20 border border-[#00ff7f]/50 rounded-lg flex items-center justify-center group-hover:bg-[#00ff7f]/30 transition-colors">
                  <span className="text-3xl">{step.icon}</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-white mb-4">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-white/70 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
