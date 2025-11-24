'use client'
import { useState } from "react";

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const faqItems = [
    {
      question: "How can AI automation transform and enhance my business operations?",
      answer: "AI automation revolutionizes business operations by streamlining repetitive tasks, reducing human error, and enabling 24/7 operations. It enhances decision-making through data analysis, improves customer experiences with personalized interactions, and significantly reduces operational costs while increasing productivity and scalability."
    },
    {
      question: "What industries can benefit from AI automation?",
      answer: "Virtually all industries can benefit from AI automation. Key sectors include manufacturing (predictive maintenance), healthcare (patient data management), finance (fraud detection), retail (personalized marketing), logistics (route optimization), and customer service (chatbots and support automation)."
    },
    {
      question: "What kind of support do you offer?",
      answer: "We provide comprehensive support including 24/7 technical assistance, dedicated account managers, regular software updates, training sessions for your team, detailed documentation, and a responsive customer success team to ensure you maximize the benefits of our AI automation solutions."
    },
    {
      question: "Do I need technical knowledge to use AI automation?",
      answer: "No technical knowledge is required. Our platform is designed with user-friendly interfaces, intuitive dashboards, and guided workflows. We provide comprehensive training and support to ensure users of all technical backgrounds can effectively implement and manage AI automation in their operations."
    }
  ];

  return (
    <section className="relative min-h-screen w-full overflow-hidden px-4 py-20 md:px-8">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F24] via-[#0A0F24] to-[#0A0F24]"></div>

      {/* Background Glow Effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl"></div>
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-cyan-500/5 blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto max-w-4xl">
        {/* Header Section */}
        <div className="mb-16 text-center">
          {/* Label */}
          <div className="mb-3 inline-flex items-center space-x-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
            <p className="text-xs font-light tracking-widest text-cyan-300/80 uppercase md:text-sm">
              FAQ
            </p>
          </div>

          {/* Main Heading */}
          <h2 className="mb-4 text-3xl leading-tight font-bold text-white md:text-4xl lg:text-5xl">
            Frequently Asked Question
          </h2>

          {/* Description */}
          <p className="mx-auto mb-8 max-w-3xl text-base leading-relaxed text-white/70 md:text-lg">
            We've Got the Answers You're Looking For
          </p>

          {/* Sub Description */}
          <p className="mx-auto max-w-3xl text-sm leading-relaxed text-white/60 md:text-base">
            Find clear, concise answers to your most common PROVAX AI automation questions. We're here to help you understand, optimize, and grow with confidence.
          </p>
        </div>

        {/* Divider Line */}
        <div className="mb-12 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>

        {/* FAQ Accordion */}
        <div className="space-y-6">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-white/5 to-white/[0.02] transition-all duration-300 hover:border-cyan-400/30"
            >
              <button
                onClick={() => toggleItem(index)}
                className="flex w-full items-center justify-between p-6 text-left transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-white md:text-xl pr-4">
                  {item.question}
                </h3>
                <div className="flex-shrink-0">
                  <svg
                    className={`h-6 w-6 text-cyan-400 transition-transform duration-300 ${
                      openItems.includes(index) ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>

              {/* Answer Content */}
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  openItems.includes(index)
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6">
                  <div className="w-12 h-px bg-cyan-400/50 mb-4"></div>
                  <p className="text-white/70 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Divider Line */}
        <div className="mt-12 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <p className="mb-6 text-white/60 text-sm md:text-base">
            Still have questions? We're here to help.
          </p>
          <button className="inline-flex items-center gap-3 rounded-full bg-[#00ff7f] px-8 py-3.5 text-base font-semibold text-black shadow-lg shadow-green-500/50 transition-all duration-300 hover:gap-4 hover:bg-[#00e370] hover:shadow-xl">
            Contact Support
            <span className="text-lg">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}